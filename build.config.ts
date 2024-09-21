import { rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'


export default defineBuildConfig({
  entries: [
    'src/index',
    { input: 'src', outDir: '.', pattern: ['**/*.css'], builder: 'mkdist', loaders: ['postcss'] },
  ],
  clean: true,
  externals: ['mdast'],
  declaration: true,
  alias: {
    '@': fileURLToPath(new URL('src', import.meta.url)),
  },
  failOnWarn: false,
  hooks: {
    'build:before': async () => {
      // eslint-disable-next-line no-console
      console.log('ℹ Cleaning styles: "./style.css"')
      await rm(new URL('style.css', import.meta.url), { force: true })
    },
  },
})
