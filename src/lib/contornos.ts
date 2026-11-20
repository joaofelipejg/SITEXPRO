// Gera curvas de nível de um relevo sintético, no momento do build.
// Relevo = soma de colinas gaussianas; as curvas saem por "marching squares"
// e os segmentos são encadeados em linhas contínuas (para a animação de desenho).

export interface Curva {
  d: string;          // caminho SVG
  nivel: number;      // índice do nível (0 = mais baixo)
  mestra: boolean;    // curva mestra (mais grossa, com cota)
  cota: number;       // valor exibido no rótulo
  rotulo?: { x: number; y: number; angulo: number };
}

interface Opcoes {
  largura: number;
  altura: number;
  passo?: number;      // resolução da malha em px
  niveis?: number;
  semente?: number;
  cotaBase?: number;   // cota do nível mais baixo (só para o rótulo)
  equidistancia?: number;
}

function aleatorio(semente: number) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function gerarContornos(o: Opcoes): Curva[] {
  const { largura, altura, passo = 10, niveis = 18, semente = 7, cotaBase = 880, equidistancia = 5 } = o;
  const rnd = aleatorio(semente);

  // Colinas e vales
  const colinas = Array.from({ length: 16 }, () => ({
    x: rnd() * largura * 1.2 - largura * 0.1,
    y: rnd() * altura * 1.2 - altura * 0.1,
    h: (rnd() * 0.8 + 0.3) * (rnd() < 0.3 ? -0.7 : 1),
    s: (rnd() * 0.13 + 0.07) * Math.max(largura, altura),
  }));
  // Ondulações menores espalhadas em grade, para não sobrar área plana (sem curvas)
  const ondulacoes = Array.from({ length: 24 }, (_, k) => ({
    x: ((k % 6) + 0.2 + rnd() * 0.6) * (largura / 6),
    y: (Math.floor(k / 6) + 0.2 + rnd() * 0.6) * (altura / 4),
    h: (rnd() * 0.25 + 0.12) * (rnd() < 0.5 ? -1 : 1),
    s: (rnd() * 0.03 + 0.045) * Math.max(largura, altura),
  }));
  const relevo = (x: number, y: number) => {
    let z = 0.15 * (x / largura) + 0.1 * (y / altura); // leve inclinação geral
    for (const c of [...colinas, ...ondulacoes]) {
      const dx = x - c.x, dy = y - c.y;
      z += c.h * Math.exp(-(dx * dx + dy * dy) / (2 * c.s * c.s));
    }
    return z;
  };

  const cols = Math.ceil(largura / passo) + 1;
  const lins = Math.ceil(altura / passo) + 1;
  const z: number[][] = [];
  let min = Infinity, max = -Infinity;
  for (let j = 0; j < lins; j++) {
    z[j] = [];
    for (let i = 0; i < cols; i++) {
      const v = relevo(i * passo, j * passo);
      z[j][i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const curvas: Curva[] = [];
  for (let n = 0; n < niveis; n++) {
    const nivel = min + ((max - min) * (n + 0.5)) / niveis;
    const segmentos: [number, number, number, number][] = [];

    for (let j = 0; j < lins - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const tl = z[j][i], tr = z[j][i + 1], br = z[j + 1][i + 1], bl = z[j + 1][i];
        const caso = (tl > nivel ? 8 : 0) | (tr > nivel ? 4 : 0) | (br > nivel ? 2 : 0) | (bl > nivel ? 1 : 0);
        if (caso === 0 || caso === 15) continue;
        const x = i * passo, y = j * passo;
        const t = (a: number, b: number) => (nivel - a) / (b - a);
        const topo = (): [number, number] => [x + t(tl, tr) * passo, y];
        const dir = (): [number, number] => [x + passo, y + t(tr, br) * passo];
        const base = (): [number, number] => [x + t(bl, br) * passo, y + passo];
        const esq = (): [number, number] => [x, y + t(tl, bl) * passo];
        const add = (a: [number, number], b: [number, number]) => segmentos.push([a[0], a[1], b[0], b[1]]);
        switch (caso) {
          case 1: case 14: add(esq(), base()); break;
          case 2: case 13: add(base(), dir()); break;
          case 3: case 12: add(esq(), dir()); break;
          case 4: case 11: add(topo(), dir()); break;
          case 6: case 9: add(topo(), base()); break;
          case 7: case 8: add(esq(), topo()); break;
          case 5: add(esq(), topo()); add(base(), dir()); break;
          case 10: add(topo(), dir()); add(esq(), base()); break;
        }
      }
    }

    // Encadeia segmentos que compartilham pontas
    const chave = (x: number, y: number) => `${x.toFixed(2)},${y.toFixed(2)}`;
    const porPonta = new Map<string, number[]>();
    segmentos.forEach((s, k) => {
      for (const p of [chave(s[0], s[1]), chave(s[2], s[3])]) {
        if (!porPonta.has(p)) porPonta.set(p, []);
        porPonta.get(p)!.push(k);
      }
    });
    const usado = new Uint8Array(segmentos.length);
    const linhas: [number, number][][] = [];
    for (let k = 0; k < segmentos.length; k++) {
      if (usado[k]) continue;
      usado[k] = 1;
      const s = segmentos[k];
      const linha: [number, number][] = [[s[0], s[1]], [s[2], s[3]]];
      for (const sentido of [1, -1]) {
        while (true) {
          const ponta = sentido === 1 ? linha[linha.length - 1] : linha[0];
          const prox = (porPonta.get(chave(ponta[0], ponta[1])) ?? []).find((q) => !usado[q]);
          if (prox === undefined) break;
          usado[prox] = 1;
          const q = segmentos[prox];
          const outra: [number, number] =
            chave(q[0], q[1]) === chave(ponta[0], ponta[1]) ? [q[2], q[3]] : [q[0], q[1]];
          if (sentido === 1) linha.push(outra); else linha.unshift(outra);
        }
      }
      if (linha.length > 4) linhas.push(linha);
    }

    const mestra = n % 5 === 2;
    const cota = cotaBase + n * equidistancia;
    for (const linha of linhas) {
      const d = 'M' + linha.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L');
      const curva: Curva = { d, nivel: n, mestra, cota };
      if (mestra && linha.length > 40) {
        const meio = Math.floor(linha.length / 2);
        const a = linha[meio - 2], b = linha[meio + 2];
        let angulo = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
        if (angulo > 90) angulo -= 180;
        if (angulo < -90) angulo += 180;
        curva.rotulo = { x: linha[meio][0], y: linha[meio][1], angulo };
      }
      curvas.push(curva);
    }
  }
  return curvas;
}
