import presetRemToPx from '@unocss/preset-rem-to-px'
import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { PresetUnoTheme } from 'unocss'


export default defineConfig<PresetUnoTheme>({
  presets: [
    presetUno(),
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4,
    }),
  ],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--vp-c-brand-1)',
      },
    },
  },
})
