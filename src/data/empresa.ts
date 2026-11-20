// Dados da empresa usados em todo o site (cabeçalho, rodapé, contato e schema.org).
// Altere aqui e a mudança vale para todas as páginas.

export const empresa = {
  nome: 'XPRO Projetos e Levantamentos',
  nomeCurto: 'XPRO',
  url: 'https://xpro.eng.br',
  fundacao: '2023',
  telefones: [
    { exibicao: '(35) 99969-3267', e164: '+5535999693267' },
  ],
  whatsapp: '5535999693267',
  email: 'xprolevantamentos@outlook.com',
  endereco: {
    rua: 'Praça Melo Viana, 168 C',
    bairro: 'Centro',
    cidade: 'Varginha',
    uf: 'MG',
    // Deixe vazio se não quiser exibir. Vazio = não entra no schema.org.
    cep: '37018-010',
  },
  // TODO: informar as coordenadas corretas do escritório (graus decimais, ex.: lat -21.55, lon -45.43).
  // Hoje é um valor APROXIMADO do centro de Varginha. Esta é a única fonte de coordenadas do site:
  // hero (texto fixo e mira do mouse), rodapé, mapa da Área de atuação e dados para o Google (schema).
  coordenadas: { lat: -21.5513, lon: -45.4302 },
  horario: {
    texto: 'Segunda a sexta, das 7h às 17h',
    curto: 'Seg–Sex · 07h–17h',
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    abre: '07:00',
    fecha: '17:00',
  },
  areaAtendida: ['Varginha', 'Sul de Minas'],
  raioKm: 150, // raio usual de atendimento a partir de Varginha
  cidadesAtendidas: ['Varginha', 'Pouso Alegre', 'Elói Mendes', 'Três Pontas', 'Três Corações', 'Campanha', 'Alfenas'],
  redes: {
    instagram: 'https://www.instagram.com/xpro.eng/',
    facebook: 'https://www.facebook.com/profile.php?id=61550524894635',
    linkedin: 'https://br.linkedin.com/company/x-pro-projetos-e-levantamentos/',
  },
};

// "Varginha, Pouso Alegre, ... e Alfenas"
export const listaCidades = (() => {
  const c = empresa.cidadesAtendidas;
  return c.length > 1 ? `${c.slice(0, -1).join(', ')} e ${c[c.length - 1]}` : c.join('');
})();

export function linkWhatsApp(mensagem = 'Olá! Gostaria de um orçamento.') {
  return `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export const menu = [
  { href: '/sobre/', texto: 'Sobre' },
  { href: '/servicos/', texto: 'Serviços' },
  { href: '/obras/', texto: 'Obras' },
  { href: '/perguntas-frequentes/', texto: 'Dúvidas' },
  { href: '/contato/', texto: 'Contato' },
];

// Converte coordenada decimal em graus/minutos, no formato de carta: 21°33′S
export function grausMinutos(valor: number, eixo: 'lat' | 'lon') {
  const hemisferio = eixo === 'lat' ? (valor < 0 ? 'S' : 'N') : (valor < 0 ? 'W' : 'E');
  const abs = Math.abs(valor);
  const graus = Math.floor(abs);
  const minutos = Math.round((abs - graus) * 60);
  return `${graus}°${String(minutos).padStart(2, '0')}′${hemisferio}`;
}
