import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xpro.eng.br',
  trailingSlash: 'always',
  // Obras modelo (arquivos "obra-modelo-*") ficam fora do sitemap até receberem dados reais.
  integrations: [sitemap({ filter: (page) => !page.includes('/obras/obra-modelo-') })],
});
