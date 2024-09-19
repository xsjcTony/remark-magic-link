import { fileURLToPath } from 'node:url'
import { defaultExclude, defineConfig } from 'vitest/config'


export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '~': fileURLToPath(new URL('test', import.meta.url)),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'text'],
      include: ['src'],
      exclude: [...defaultExclude, '**/types.ts'],
    },
  },
})
