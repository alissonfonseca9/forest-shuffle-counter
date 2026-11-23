# Bosque

Calculadora de pontuação para Forest Shuffle. Monte a floresta de até cinco jogadores e revele o placar ao finalizar a partida. O seletor de idioma fica no cabeçalho.

## Rodar e gerar a versão para publicação

Use Node.js 22. Na pasta do projeto, rode:

```sh
npm ci
npm run dev
npm run build
```

A saída de produção fica em `dist/`. A página em português usa `/` e a página em inglês usa `/en/`. O build também gera `robots.txt` e `sitemap.xml`, com links canônicos e alternativos nos arquivos HTML.

## GitHub, Netlify e Google

Envie o código deste repositório ao GitHub e conecte o repositório ao site no Netlify. O arquivo `netlify.toml` já configura `npm run build` e a pasta `dist`. Para uma publicação manual, envie o conteúdo de `dist/` ao Netlify.

O build usa `https://forestshufflecounter.netlify.app/` como endereço público. Se publicar em outro domínio, defina `SITE_URL` com a nova origem HTTPS nas variáveis do Netlify antes de gerar o site.

Após publicar, abra `/sitemap.xml` no domínio final. No Google Search Console, verifique a propriedade desse endereço e envie o sitemap. Use a inspeção de URL para solicitar a indexação de `/` e `/en/`.

[Bosque no Netlify](https://forestshufflecounter.netlify.app/) · [Central da Pesquisa Google sobre sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
