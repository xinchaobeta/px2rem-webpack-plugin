'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var px2remLoaderFile = require.resolve('./px2rem-loader');

var handleLoaders = function handleLoaders(loaders) {
  var idx = (0, _lodash.findIndex)(loaders, function (path) {
    return path.includes('/node_modules/css-loader/');
  });
  if (idx === -1) return;
  loaders.splice(idx + 1, 0, px2remLoaderFile);
};

exports.default = function (data, next) {
  try {
    handleLoaders(data.loaders);
    next(null, data);
  } catch (err) {
    next(err, data);
  }
};

module.exports = exports['default'];