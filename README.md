# Site XPRO (Astro)

## Comandos
```
npm install        # primeira vez
npm run dev        # ver o site enquanto edita: http://localhost:4321
npm run build      # gera a pasta dist/ (o site pronto)
```

## Onde editar
- Telefones, endereço, horário, redes: `src/data/empresa.ts`
- Textos de cada serviço: `src/content/servicos/<servico>.md`
  (um arquivo novo nessa pasta = uma página nova de serviço)
- Portfólio e depoimentos: `src/data/portfolio.ts`
- Páginas: `src/pages/`
- Cores e estilo: `src/styles/global.css`
- Imagens: `src/assets/` (o build converte para WebP sozinho)

## Publicar (Vercel)
Veja o arquivo HOSPEDAR-NA-VERCEL.md.
As regras em vercel.json mantêm os links antigos do WordPress funcionando.
