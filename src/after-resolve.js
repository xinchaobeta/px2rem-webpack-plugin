import {findIndex} from 'lodash'

const px2remLoaderFile = require.resolve('./px2rem-loader')

const handleLoaders = (loaders) => {
  const idx = findIndex(loaders, path => path.includes('/node_modules/css-loader/'))
  if(idx === -1) return;
  loaders.splice(idx + 1, 0, px2remLoaderFile)
}

export default (data, next) => {
  try {
    handleLoaders(data.loaders)
    next(null, data)
  } catch(err) {
    next(err, data)
  }
}
