# Site da XPRO Projetos e Levantamentos

Site estático em **Astro 5**, publicado na **Vercel** (https://sitexpro.vercel.app/) a partir do GitHub
`joaofelipejg/SITEXPRO` (branch `main`). Empresa de topografia e projetos de engenharia em Varginha/MG.
O dono do site fala português; responda em português.

## Como trabalhar
- Pedidos grandes: **mostre o plano antes de editar** e espere aprovação. Pedidos pequenos: aplique direto.
- **Não faça commit nem push sem o usuário pedir** ("pode enviar" = commit + push). O push publica na Vercel.
- **Não invente dados** (nomes, números, datas, clientes, equipamentos, certificações). Campo sem dado ou
  marcado [CONFIRMAR] vira comentário `TODO` no código e não aparece no site.
- Textos: escreva sempre **"XPRO"** (nunca "X Pro"), **sem travessão** (use vírgula, dois-pontos ou parênteses),
  frases curtas, sem autoelogio ("excelência", "soluções", "precisão milimétrica", "tecnologia de ponta").
- Mudanças só para celular: `@media (max-width: 767px)`; o computador (1440px) não deve mudar.
- Ao terminar: `npm run build` sem erros e sem rolagem horizontal em 390px e 1440px.
- Para economizar tokens: prints, Lighthouse e comparações pixel a pixel só quando o usuário pedir.

## Comandos
```
npm run build          # gera dist/ (precisa passar sem erros)
npm run dev            # http://localhost:4321
```
Pré-visualização no painel do app: `.claude/launch.json` em C:\Users\joaof (nome `xpro-site`, porta 4322, serve `xpro-redesign/dist`).

## Onde fica cada coisa
- `src/data/empresa.ts`: **fonte única** de dados da empresa: telefone/WhatsApp, e-mail, endereço,
  coordenadas, razão social, CNPJ, responsável técnico (formação, registro CRT-MG, código INCRA/SIGEF),
  equipamentos com modelo, cidades atendidas, redes. Helpers `registroProfissional`, `credenciamentoIncra`,
  `linkWhatsApp()`. Nunca repita esses textos fixos nas páginas.
- `src/data/autoridade.ts`: NRs, norma ABNT, regularização do drone, `listaNrsCurta`, `mensagemDocumentacao`.
- `src/data/duvidas.ts`: perguntas frequentes. `src/data/schema.ts`: JSON-LD auxiliar.
- `src/content/servicos/*.md` e `src/content/obras/*.md`: serviços e obras (coleções Astro).
  Obras modelo antigas ficam fora do site em `obras-guardadas/`.
- `src/layouts/Base.astro`: `<head>` e JSON-LD da empresa (LocalBusiness com legalName, taxID, employee).
- `src/styles/global.css`: todo o CSS (tokens em `:root`).
- Componentes: `SecaoCab` (rótulo numerado + título opcional; sem título o rótulo vira o h2),
  `Contornos` (curvas de nível do hero; cotas via `<use>` de um SVG oculto), `MapaAtuacao` (mapa completo no
  computador e simplificado no celular), `GradeClientes`, `Indicadores`, `Conformidade`, `Foto`, `Rodape`.

## Sistema visual
Azul-marinho `--azul #1a244d` e amarelo `--amarelo #ffcc57`; títulos em **Zilla Slab**, texto em
**IBM Plex Sans**, rótulos em **IBM Plex Mono** (maiúsculas, mín. 12px; rótulos em 12,5px). Cantos retos, sem
sombra, cantoneiras nas fotos (`foto-canto`), padrão de "ficha técnica" em linhas (`.sobre-fatos`, `.ficha`).
Amarelo nunca como texto sobre fundo claro. Contraste mínimo 4,5:1. Áreas de toque com 44px.

## Pendências (TODO no código)
- Formação do responsável técnico: confirmar se inclui "e engenheiro civil" (`empresa.ts`).
- Página Sobre: nomes dos fundadores (pai e filho), motivo da fundação e "para onde vamos" (`sobre.astro`).
- Coordenadas exatas do escritório (`empresa.ts`).
- Decidir se "ART"/"CREA-MG" viram "TRT"/"CRT" (indicador da home e a pergunta "O que é ART?").
- Obra BRZ (Portal Campo das Ararinhas) sem desafio/etapas/entregáveis.
- Foto da obra Alvorada é do Google Street View (tem "© Google"); trocar se houver foto própria.
