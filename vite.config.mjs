import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const site = new URL(process.env.SITE_URL || 'https://forestshufflecounter.netlify.app/');
if (site.protocol !== 'https:' || site.href !== site.origin + '/') {
  throw new Error('SITE_URL must be the public HTTPS origin, without a subdirectory.');
}
const pt = new URL('/', site).href;
const en = new URL('/en/', site).href;

function searchMetadata() {
  return {
    name: 'bosque-search-metadata',
    transformIndexHtml(html) {
      const isEnglish = html.includes('<html lang="en">');
      const url = isEnglish ? en : pt;
      const link = (rel, href, hreflang) => ({
        tag: 'link',
        attrs: hreflang ? { rel, href, hreflang } : { rel, href },
        injectTo: 'head',
      });
      return [
        link('canonical', url),
        link('alternate', pt, 'pt-BR'),
        link('alternate', en, 'en'),
        link('alternate', pt, 'x-default'),
      ];
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: 'User-agent: *\nAllow: /\n\nSitemap: ' + new URL('/sitemap.xml', site).href + '\n',
      });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          [pt, en].map(url => '  <url><loc>' + url + '</loc></url>').join('\n') +
          '\n</urlset>\n',
      });
    },
  };
}

export default defineConfig({
  plugins: [searchMetadata()],
  build: {
    rollupOptions: {
      input: {
        pt: fileURLToPath(new URL('./index.html', import.meta.url)),
        en: fileURLToPath(new URL('./en/index.html', import.meta.url)),
      },
    },
  },
});
