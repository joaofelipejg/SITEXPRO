# Hospedar o site da XPRO na Vercel

O site já está configurado para a Vercel (arquivo `vercel.json`):
- framework Astro, build `npm run build`, pasta publicada `dist/`;
- endereços sempre com barra no final (`/sobre/`);
- os links antigos do WordPress (`/dustra-service/...`, `/portfolio/`, `/wp-admin/...`)
  redirecionam para as páginas novas, para não perder o que o Google já indexou.

Escolha UM dos dois caminhos abaixo. A conta na Vercel é criada por você (é grátis no plano Hobby).

## Caminho A — pelo GitHub (recomendado: cada alteração publica sozinha)
1. Crie uma conta em github.com e um repositório novo, por exemplo `site-xpro` (pode ser privado).
2. Envie esta pasta (`xpro-redesign`) para esse repositório.
3. Em vercel.com, entre com a conta do GitHub → **Add New… → Project** → escolha `site-xpro` → **Deploy**.
   A Vercel lê o `vercel.json` sozinha; não precisa mudar nenhuma opção.
4. Pronto: você recebe um link `https://site-xpro.vercel.app`.
   A partir daí, toda alteração enviada ao GitHub vira uma nova versão do site.

## Caminho B — direto do computador (sem GitHub)
1. Abra o terminal nesta pasta (`xpro-redesign`).
2. Rode `npx vercel` e faça login quando ele pedir (abre o navegador).
3. Responda às perguntas aceitando o padrão (Enter). No fim aparece o link de teste.
4. Para publicar a versão oficial: `npx vercel --prod`.
   Depois de cada alteração no site, rode `npx vercel --prod` de novo.

## Ligar o domínio xpro.eng.br
1. Na Vercel: projeto → **Settings → Domains** → adicione `xpro.eng.br` e `www.xpro.eng.br`.
2. A Vercel mostra os registros de DNS a criar (um registro **A** para `xpro.eng.br`
   e um **CNAME** para `www`). Copie exatamente os valores que ela mostrar.
3. No registro.br: **Domínios → xpro.eng.br → DNS → Editar zona** e crie esses registros.
   (Se o DNS ainda estiver apontando para a hospedagem antiga, troque para "servidores do registro.br" antes.)
4. Em algumas horas o site novo passa a abrir em xpro.eng.br, com HTTPS automático.

Atenção: quando o domínio apontar para a Vercel, o site antigo em WordPress deixa de abrir.
Faça isso só quando o site novo estiver aprovado.

## Comandos úteis
```
npm install        # primeira vez neste computador
npm run dev        # ver o site enquanto edita: http://localhost:4321
npm run build      # gerar o site pronto em dist/
```
