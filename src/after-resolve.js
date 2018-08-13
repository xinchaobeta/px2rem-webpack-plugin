import {findIndex} from 'lodash'
const REGEX = /\/node_modules\/(?:[\.\w]+@)?css-loader\//
const px2remLoaderFile = require.resolve('./px2rem-loader')

const handleLoaders = (resource, loaders) => {
  const idx = findIndex(loaders, path => REGEX.test(path.loader.replace(/\\/g, '/')))
  const isInNodeModules = resource.includes('/node_modules/')
  if(idx === -1 || isInNodeModules) return;
  loaders.splice(idx + 1, 0, px2remLoaderFile)
}

export default (data, next) => {
  try {
    handleLoaders(data.resource, data.loaders)
    next(null, data)
  } catch(err) {
    next(err, data)
  }
}
