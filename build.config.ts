import { fileURLToPath } from 'node:url'
import { defineBuildConfig } from 'unbuild'


export default defineBuildConfig({
  entries: [
    'src/index',
    { input: 'src', pattern: ['**/*.css'], builder: 'mkdist', loaders: ['postcss'] },
  ],
  clean: true,
  externals: ['mdast'],
  declaration: true,
  alias: {
    '@': fileURLToPath(new URL('src', import.meta.url)),
  },
  rollup: {
    inlineDependencies: true,
  },
  failOnWarn: false,
})
