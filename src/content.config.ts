import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada arquivo em src/content/servicos/ vira uma página em /servicos/<nome-do-arquivo>/
const servicos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/servicos' }),
  schema: z.object({
    titulo: z.string(),
    grupo: z.enum(['topografia', 'projetos']),
    ordem: z.number(),
    destaque: z.boolean().default(false),
    resumo: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    oQueE: z.string(),
    quandoPrecisa: z.array(z.string()),
    comoFunciona: z.array(z.string()),
    prazo: z.string(),
    entregaveis: z.array(z.string()),
    faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })),
  }),
});

// Cada arquivo em src/content/obras/ vira uma página em /obras/<nome-do-arquivo>/
const obras = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/obras' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    tipo: z.string(),
    cliente: z.string(),
    cidade: z.string(),
    ano: z.string().optional(),      // opcional: só aparece na página se for preenchido
    area: z.string().optional(),
    // Fotos reais da obra (caminho relativo a este arquivo). Aparecem antes das "fotos" de exemplo.
    // foco (opcional): ponto da foto que deve ficar visível quando ela é cortada, ex.: "50% 60%"
    imagens: z.array(z.object({ src: image(), alt: z.string(), foco: z.string().optional() })).default([]),
    servicos: z.array(z.string()),   // nomes dos arquivos de serviço relacionados
    // opcional: nome exibido do serviço nesta obra, ex.: { "levantamento-planialtimetrico": "Levantamento planialtimétrico cadastral" }
    nomesServicos: z.record(z.string(), z.string()).optional(),
    ordem: z.number(),
    destaque: z.boolean().default(false),
    // true enquanto a obra tiver dados de exemplo: a página fica fora do Google.
    modelo: z.boolean().default(false),
    resumo: z.string(),
    desafio: z.string(),
    solucao: z.array(z.string()),
    entregaveis: z.array(z.string()),
    fotos: z.array(z.string()).default([]), // descrição de foto que ainda falta (vira espaço reservado)
  }),
});

export const collections = { servicos, obras };
