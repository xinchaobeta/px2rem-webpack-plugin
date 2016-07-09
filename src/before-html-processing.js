import option from './option'

const REGEX_SCRIPT = /(<head>[\s\S]*?)(<script\b[\s\S]*?<\/head>)/
const REGEX_HEAD = /<\/head>/
const REGEX_STYLE = /<head>/
const script = (originScreenWidth) => `
  <script>
  document.documentElement.style.fontSize = 100 * innerWidth / ${originScreenWidth} + 'px'
  addEventListener('load', function() {
    setTimeout(function(){
       document.documentElement.style.fontSize = 100 * innerWidth / ${originScreenWidth} + 'px'
       window.unit = 100 * innerWidth / ${originScreenWidth};
       var e = document.createEvent('Event');
       e.initEvent('adjustReady', true, true);
       window.dispatchEvent(e);
    }, 480);
  })
  addEventListener('orientationchange', function() {
      setTimeout(function(){
        document.documentElement.style.fontSize = 100 * innerWidth / ${originScreenWidth} + 'px'
      }, 480)

  });
  </script>
`
const style = `
  <style> body { font-size: .16rem; } </style>
`

const insertScript = (source, script) => {
  switch(true) {
    case REGEX_SCRIPT.test(source):
      return source.replace(REGEX_SCRIPT, (whole, before, after) => {
        return before + script + after
      })
    case REGEX_HEAD.test(source):
      return source.replace(REGEX_HEAD, script + '</head>')
    default:
      return script + source
  }
}

const insertStyle = (source, style) => {
  if(REGEX_STYLE.test(source)) {
    return source.replace(REGEX_STYLE, '<head>' + style)
  } else {
    return style + source
  }
}

export default (htmlPluginData, next) => {
  const {originScreenWidth} = option
  const html = insertScript(htmlPluginData.html, script(originScreenWidth))
  htmlPluginData.html = insertStyle(html, style)
  next();
}
