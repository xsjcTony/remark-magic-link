import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import unocss from 'unocss/vite'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
  localIconLoader,
} from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'


export default defineConfig({
  srcDir: './src',

  vite: {
    plugins: [
      // @ts-expect-error - VitePress doesn't support Vite v6 yet.
      unocss(),
      // @ts-expect-error - VitePress doesn't support Vite v6 yet.
      groupIconVitePlugin({
        customIcon: {
          'esm.sh': localIconLoader(import.meta.url, './assets/icons/esm.sh.svg'),
        },
      }),
    ],
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
      ],
    },
    css: {
      postcss: {
        plugins: [
          postcssIsolateStyles({
            prefix: ':not(:where(.vp-style-raw, .vp-style-raw *, .vp-raw, .vp-raw *))',
            includeFiles: [/base\.css/, /vp-doc\.css/],
          }),
        ],
      },
    },
  },

  lastUpdated: true,
  lang: 'en-US',
  appearance: 'dark',
  title: 'remark-magic-link',
  titleTemplate: ':title | remark-magic-link',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  description: '💅 An adaptation of the tailwindcss-animate Tailwind plugin for UnoCSS',
  markdown: {
    theme: {
      dark: 'material-theme-palenight',
      light: 'vitesse-light',
    },
    config: (md) => {
      md.use(groupIconMdPlugin)
    },
    codeTransformers: [
      transformerTwoslash(),
    ],
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Remark Magic Link',
    externalLinkIcon: true,
    outline: 'deep',

    editLink: {
      pattern: 'https://github.com/xsjcTony/remark-magic-link/edit/main/docs/src/:path',
      text: 'Suggest changes to this page',
    },

    search: {
      provider: 'local',
      options: {
        detailedView: 'auto',
      },
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Aelita (Tony Jiang)',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
      { text: 'API reference', link: '/api/', activeMatch: '^/api/' },
      {
        text: `v${version}`,
        items: [
          { text: 'Release Notes', link: 'https://github.com/xsjcTony/remark-magic-link/releases' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/' },
        ],
      },
      {
        text: 'API Reference',
        base: '/api',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Handler', link: '/handler' },
          { text: 'Postprocessor', link: '/postprocessor' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xsjcTony/remark-magic-link' },
    ],
  },
})
