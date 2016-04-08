'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source, map) {
  try {
    this.callback(null, px2remBySource(source), map);
  } catch (err) {
    this.callback(err, source, map);
  }
};

var _css = require('css');

var _css2 = _interopRequireDefault(_css);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEX = /(\d*?\.?\d+)\s*px\b/g;

var px2remByRule = function px2remByRule(rule) {
  rule.declarations.forEach(function (declaration) {
    var property = declaration.property;
    var value = declaration.value;
    var screenWidth = _option2.default.screenWidth;

    switch (true) {
      case property.startsWith('border'):
        return;
      default:
        declaration.value = value.replace(REGEX, function (whole, px) {
          return px / screenWidth * 3.2 + 'rem';
        });
    }
  });
};

var px2remByKeyframe = px2remByRule;
var px2remByMedia = function px2remByMedia(media) {
  return media.rules.forEach(dispatch);
};

var dispatch = function dispatch(item) {
  switch (item.type) {
    case 'rule':
      return px2remByRule(item);
    case 'media':
      return px2remByMedia(item);
    case 'keyframes':
      return item.keyframes.forEach(px2remByKeyframe);
  }
};

var px2remBySource = function px2remBySource(source) {
  var astTree = _css2.default.parse(source);
  var rules = astTree.stylesheet.rules;

  rules.forEach(dispatch);
  return _css2.default.stringify(astTree, { compress: false });
};

module.exports = exports['default'];