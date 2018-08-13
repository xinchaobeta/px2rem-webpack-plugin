'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEX_SCRIPT = /(<head>[\s\S]*?)(<script\b[\s\S]*?<\/head>)/;
var REGEX_HEAD = /<\/head>/;
var REGEX_STYLE = /<head>/;
var script = function script(originScreenWidth, maxWidth) {
  return '\n  <script>\n  document.documentElement.style.fontSize = 100 * (' + maxWidth + ' ? Math.min(' + maxWidth + ', innerWidth) : innerWidth) / ' + originScreenWidth + ' + \'px\'\n  addEventListener(\'load\', function() {\n    setTimeout(function(){\n       document.documentElement.style.fontSize = 100 * (' + maxWidth + ' ? Math.min(' + maxWidth + ', innerWidth) : innerWidth) / ' + originScreenWidth + ' + \'px\'\n       window.unit = 100 * (' + maxWidth + ' ? Math.min(' + maxWidth + ', innerWidth) : innerWidth) / ' + originScreenWidth + ';\n       var e = document.createEvent(\'Event\');\n       e.initEvent(\'adjustReady\', true, true);\n       window.dispatchEvent(e);\n    }, 480);\n  })\n  addEventListener(\'orientationchange\', function() {\n      setTimeout(function(){\n        document.documentElement.style.fontSize = 100 * (' + maxWidth + ' ? Math.min(' + maxWidth + ', innerWidth) : innerWidth) / ' + originScreenWidth + ' + \'px\'\n      }, 480)\n\n  });\n  </script>\n';
};
var style = function style(maxWidth) {
  return maxWidth ? '\n  <style> body { font-size: .16rem; max-width: ' + maxWidth + 'px; margin: 0 auto; } </style>\n' : '\n  <style> body { font-size: .16rem; } </style>\n';
};

var insertScript = function insertScript(source, script) {
  switch (true) {
    case REGEX_SCRIPT.test(source):
      return source.replace(REGEX_SCRIPT, function (whole, before, after) {
        return before + script + after;
      });
    case REGEX_HEAD.test(source):
      return source.replace(REGEX_HEAD, script + '</head>');
    default:
      return script + source;
  }
};

var insertStyle = function insertStyle(source, style) {
  if (REGEX_STYLE.test(source)) {
    return source.replace(REGEX_STYLE, '<head>' + style);
  } else {
    return style + source;
  }
};

exports.default = function (htmlPluginData, next) {
  var originScreenWidth = _option2.default.originScreenWidth,
      _option$maxWidth = _option2.default.maxWidth,
      maxWidth = _option$maxWidth === undefined ? originScreenWidth : _option$maxWidth;

  var html = insertScript(htmlPluginData.html, script(originScreenWidth, maxWidth));
  htmlPluginData.html = insertStyle(html, style(maxWidth));
  return next ? next(null, htmlPluginData) : htmlPluginData;
};

module.exports = exports['default'];