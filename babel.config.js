function isBabelNode(caller) {
  return !!(caller && caller.name === '@babel/node')
}

/**
 * Returns true if server's bundle is being built
 */
function isServerBuild(caller) {
  return !!(caller && caller.name === 'server-build')
}

module.exports = function(api) {
  const isBN = api.caller(isBabelNode)
  const isSB = api.caller(isServerBuild)

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', {
      'root': ['./src/client'],
      'alias': {
      }
    }],
    'inline-react-svg'
  ]

  if(isBN || isSB){
    // ignore scss & svg imports
    plugins.push([
      './external/babel-plugin-ignore-imports',
      {
        'extensions': ['.scss', '.svg']
      }
    ])
  }

  return {
    presets,
    plugins
  }
}
