// Ajudantes para montar dados estruturados (schema.org) das páginas.
import { empresa } from './empresa';

export function breadcrumb(itens: { nome: string; href: string }[]) {
  const lista = [{ nome: 'Início', href: '/' }, ...itens];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: lista.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.nome,
      item: new URL(item.href, empresa.url).href,
    })),
  };
}

export function faqPage(itens: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: itens.map((i) => ({
      '@type': 'Question',
      name: i.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: i.resposta },
    })),
  };
}

// Itens com [PREENCHER] não devem ir para o Google.
export const semPlaceholder = <T extends { pergunta: string; resposta: string }>(itens: T[]) =>
  itens.filter((i) => !`${i.pergunta} ${i.resposta}`.includes('[PREENCHER'));
