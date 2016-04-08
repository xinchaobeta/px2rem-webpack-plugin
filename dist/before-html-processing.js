'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _option = require('./option');

var _option2 = _interopRequireDefault(_option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REGEX_SCRIPT = /(<head>[\s\S]*?)(<script\b[\s\S]*?<\/head>)/;
var REGEX_HEAD = /<\/head>/;
var script = '\n  <script>\n  document.documentElement.style.fontSize = 100 * innerWidth / 320 + \'px\'\n  addEventListener(\'load\', function() {\n    setTimeout(function(){\n       document.documentElement.style.fontSize = 100 * innerWidth / 320 + \'px\'\n       window.unit = 100 * innerWidth / 320;\n       var e = document.createEvent(\'Event\');\n       e.initEvent(\'adjustReady\', true, true);\n       window.dispatchEvent(e);\n    }, 480);\n  })\n  addEventListener(\'orientationchange\', function() {\n      setTimeout(function(){\n        document.documentElement.style.fontSize = 100 * innerWidth / 320 + \'px\'\n      }, 480)\n\n  });\n  </script>\n';

var insert = function insert(source, script) {
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

exports.default = function (htmlPluginData, next) {
  htmlPluginData.html = insert(htmlPluginData.html, script);
  next();
};

module.exports = exports['default'];