// Perguntas da página Dúvidas (/perguntas-frequentes/).
// Para acrescentar uma pergunta, adicione { pergunta, resposta } no grupo certo.
// O link direto (#id) e o schema FAQPage são gerados a partir daqui.
import { empresa, listaCidades } from './empresa';

export interface Pergunta { pergunta: string; resposta: string }
export interface GrupoDuvidas { titulo: string; itens: Pergunta[] }

export const gruposDuvidas: GrupoDuvidas[] = [
  {
    titulo: 'Orçamento e atendimento',
    itens: [
      { pergunta: 'Quais cidades a XPRO atende?', resposta: `Estamos em Varginha e atendemos ${listaCidades}, num raio usual de ${empresa.raioKm} km. Para outras cidades, consulte: o deslocamento entra no orçamento.` },
      { pergunta: 'Como pedir um orçamento?', resposta: 'Pelo WhatsApp, telefone ou pelo formulário do site, que abre o WhatsApp. Informe o tipo de serviço, a localização e, se tiver, a matrícula ou o projeto do imóvel.' },
      { pergunta: 'Como é calculado o preço de um levantamento?', resposta: 'O valor depende do tipo de serviço, do tamanho da área, do relevo, da vegetação, do acesso e da distância até o local. Por isso cada orçamento é feito sob medida.' },
    ],
  },
  {
    titulo: 'Topografia',
    itens: [
      { pergunta: 'O que é um levantamento topográfico?', resposta: 'É a medição precisa de um terreno: limites, construções, relevo e demais elementos. O resultado é uma planta usada em projetos, obras, aprovações e regularizações.' },
      { pergunta: 'Qual a diferença entre topografia com GNSS, estação total e drone?', resposta: 'O GNSS mede posições por satélite e é ótimo em áreas abertas. A estação total mede ângulos e distâncias com laser e funciona bem em áreas urbanas e com obstáculos. O drone fotografa a área de cima e é indicado para áreas grandes. Muitas vezes combinamos as três.' },
      { pergunta: 'Chuva atrapalha o levantamento?', resposta: 'Chuva forte impede o trabalho de campo e o voo de drone. Nesses casos, remarcamos para o primeiro dia com condições adequadas.' },
    ],
  },
  {
    titulo: 'Regularização de imóveis',
    itens: [
      { pergunta: 'Meu imóvel rural precisa de georreferenciamento?', resposta: 'O georreferenciamento certificado no INCRA é exigido para imóveis rurais em casos como venda, desmembramento, remembramento e outras alterações na matrícula. Avaliamos o seu caso e informamos se é necessário.' },
      { pergunta: 'A área da minha escritura é diferente da real. O que fazer?', resposta: 'O caminho costuma ser a retificação de área, que em muitos casos é feita diretamente no cartório de registro de imóveis, com levantamento, planta, memorial e anuência dos vizinhos.' },
      { pergunta: 'O que é ART?', resposta: 'A Anotação de Responsabilidade Técnica é o registro, no CREA, de que um profissional habilitado é responsável pelo serviço. Ela é exigida por prefeituras, cartórios e órgãos públicos.' },
    ],
  },
];

// "O que é ART?" -> "o-que-e-art"
export function slug(texto: string) {
  return texto
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
