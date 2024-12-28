const MINOR_PACKAGES = new Set([
  '@types/node',
  'eslint',
])


const PATCH_PACKAGES = new Set([])


module.exports = {
  format: 'group',
  interactive: true,
  peer: true,
  dep: ['prod', 'dev', 'optional', 'packageManager', 'peer'],
  target: (packageName) => {
    if (MINOR_PACKAGES.has(packageName))
      return 'minor'

    if (PATCH_PACKAGES.has(packageName))
      return 'patch'

    return 'latest'
  },
}
