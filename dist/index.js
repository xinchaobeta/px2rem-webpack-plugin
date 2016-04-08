'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _afterResolve = require('./after-resolve');

var _afterResolve2 = _interopRequireDefault(_afterResolve);

var _beforeHtmlProcessing = require('./before-html-processing');

var _beforeHtmlProcessing2 = _interopRequireDefault(_beforeHtmlProcessing);

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
  function _class(options) {
    (0, _classCallCheck3.default)(this, _class);

    (0, _assign2.default)(_option2.default, options);
  }

  (0, _createClass3.default)(_class, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.plugin("normal-module-factory", function (nmf) {
        nmf.plugin("after-resolve", _afterResolve2.default);
      });
      compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', _beforeHtmlProcessing2.default);
      });
    }
  }]);
  return _class;
}();

exports.default = _class;
module.exports = exports['default'];