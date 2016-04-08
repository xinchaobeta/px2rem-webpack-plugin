import cssParser from 'css'
import option from './option'
const REGEX = /(\d*?\.?\d+)\s*px\b/g

const px2remByRule = (rule) => {
  rule.declarations.forEach(declaration => {
    const {property, value} = declaration
    const {screenWidth} = option
    switch (true) {
      case property.startsWith('border'):
        return;
      default:
        declaration.value = value.replace(REGEX, (whole, px) => {
          return px/screenWidth*3.2 + 'rem'
        })
    }
  })
}

const px2remByKeyframe = px2remByRule
const px2remByMedia = (media) => media.rules.forEach(dispatch)


const dispatch = (item) => {
  switch (item.type) {
    case 'rule':
      return px2remByRule(item)
    case 'media':
      return px2remByMedia(item)
    case 'keyframes':
      return item.keyframes.forEach(px2remByKeyframe)
  }
}

const px2remBySource = (source) => {
  const astTree = cssParser.parse(source)
  const {stylesheet: {rules}} = astTree
  rules.forEach(dispatch)
  return cssParser.stringify(astTree, {compress: false})
}

export default function(source, map) {
  try {
    this.callback(null, px2remBySource(source), map)
  } catch(err) {
    this.callback(err, source, map)
  }
}
