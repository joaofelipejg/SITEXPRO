# Informações a preencher (redesign)

No site, cada item aparece destacado em amarelo como `[PREENCHER: ...]` ou `[FOTO REAL: ...]`.

## Empresa — `src/data/empresa.ts`
- [x] Cidades atendidas (lista em `cidadesAtendidas`; aparecem no hero, no mapa e nas dúvidas)
- [x] CREA e INCRA retirados do site, a pedido
- [x] CEP (37018-010)

## Contato, "Como chegar" — `src/pages/contato.astro` (topo do arquivo, marcados com TODO)
- [x] Ponto de referência ("Ao lado da Igreja do Rosário.")
- [x] Estacionamento e coordenadas: campos removidos a pedido

## Home — `src/pages/index.astro`
- [x] Equipamentos: ficha técnica agora mostra diretrizes técnicas, sem marca/modelo

## Obras — `src/content/obras/*.md`
Três obras modelo. Para cada obra real: preencha os campos, renomeie o arquivo
(ex.: `loteamento-jardim-x.md`, que vira /obras/loteamento-jardim-x/) e troque `modelo: true` por `false`.
- [ ] Nome, cliente, cidade, ano, área
- [ ] Desafio, o que foi feito, entregáveis
- [ ] 3 fotos reais por obra

## Sobre — `src/pages/sobre.astro`
- [ ] Nome, formação e foto do responsável técnico
- [ ] Demais integrantes da equipe
- [ ] Parágrafo sobre a origem da empresa

## Dúvidas — `src/pages/perguntas-frequentes.astro`

## Serviços — `src/content/servicos/*.md`
- [x] Prazos retirados: o site informa que o prazo é definido no orçamento
- [x] Entregáveis extras: itens provisórios retirados do site
