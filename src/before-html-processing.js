import option from './option'

const REGEX_SCRIPT = /(<head>[\s\S]*?)(<script\b[\s\S]*?<\/head>)/
const REGEX_HEAD = /<\/head>/
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

const insert = (source, script) => {
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

export default (htmlPluginData, next) => {
  htmlPluginData.html = insert(htmlPluginData.html, script)
  next();
}
