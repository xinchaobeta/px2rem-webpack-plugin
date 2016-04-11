import option from './option'

const REGEX_SCRIPT = /(<head>[\s\S]*?)(<script\b[\s\S]*?<\/head>)/
const REGEX_HEAD = /<\/head>/
const REGEX_STYLE = /<head>/
const script = `
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
`
const style = (originScreenWidth) => `
  <style> body { font-size: ${16/originScreenWidth * 3.2}rem; } </style>
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
  const html = insertScript(htmlPluginData.html, script)
  htmlPluginData.html = insertStyle(html, style(option.originScreenWidth))
  next();
}
