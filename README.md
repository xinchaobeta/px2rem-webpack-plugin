## Installation

``` bash
npm install px2rem-webpack-plugin --save-dev
```

## Usage

The plugin should be used with [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
``` javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Px2remWebpackPlugin = require('px2rem-webpack-plugin');

var webpackConfig = {
  entry: 'app.js',
  output: {
    path: 'dist',
    filename: '[hash].app.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new Px2remWebpackPlugin({originSreenWidth: 750}),
  ]
};
```

This will generate a file dist/index.html containing the following:

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>

  <script>
  document.documentElement.style.fontSize = 100 * innerWidth / 320 + 'px'
  addEventListener('load', function() {
    setTimeout(function(){
       document.documentElement.style.fontSize = 100 * innerWidth / 320 + 'px'
       window.unit = 100 * innerWidth / 320;
       var e = document.createEvent('Event');
       e.initEvent('adjustReady', true, true);
       window.dispatchEvent(e);
    }, 480);
  })
  addEventListener('orientationchange', function() {
      setTimeout(function(){
        document.documentElement.style.fontSize = 100 * innerWidth / 320 + 'px'
      }, 480)

  });
  </script>
</head>
  <body>
  <script src="6062412d2f3140cc3dd0.app.js"></script></body>
</html>
```

And translate the `px` to `rem` in all css files, before webpack [css-loader](https://github.com/webpack/css-loader) handle the css source.
> The plugin can also be used together with [sass-loader](https://github.com/jtangelder/sass-loader), [less-loader](https://github.com/webpack/less-loader) or [stylus-loader](https://github.com/shama/stylus-loader).
<br>It will auto handle properly after `sass/less/stylus` compilation but before the `css-loader`

**For example** the css below

``` css
.abc { width: 750px; }
```
will be automatically compiled to
``` css
.abc { width: 3.2rem; }
```



## Contribution Guide

``` bash
# dev plugin
make dev  ## in one bash
make debug ## in another bash

# build for publish
make build

# run tests
make test
```
