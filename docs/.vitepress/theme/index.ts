import 'virtual:uno.css'

import {
  InjectionKey,
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import {
  NolebaseHighlightTargetedHeading,
} from '@nolebase/vitepress-plugin-highlight-targeted-heading/client'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'

import '@shikijs/vitepress-twoslash/style.css'
import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import '@nolebase/vitepress-plugin-highlight-targeted-heading/client/style.css'
import 'virtual:group-icons.css'
import './style.scss'


export default {
  'extends': DefaultTheme,
  Layout: () => h(Layout, null, {
    'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
    'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    'layout-top': () => h(NolebaseHighlightTargetedHeading),
  }),
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
    app.provide(InjectionKey, {
      layoutSwitch: {
        disableAnimation: true,
      },
    })
  },
} satisfies Theme
