function isBabelNode(caller) {
  return !!(caller && caller.name === '@babel/node')
}

module.exports = function(api) {
  const isBN = api.caller(isBabelNode)

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

  if(isBN){
    // ignore scss files in development mode
    plugins.push([
      './external/babel-plugin-ignore-imports',
      {
        'extensions': ['.scss']
      }
    ])
  }

  return {
    presets,
    plugins
  }
}
