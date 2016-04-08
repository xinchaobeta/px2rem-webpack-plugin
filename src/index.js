import afterResolve from './after-resolve'
import beforeHtmlProcessing from './before-html-processing'
import option from './option'

export default class {
  constructor(options) {
    Object.assign(option, options)
  }

  apply(compiler) {
    compiler.plugin("normal-module-factory", (nmf) => {
      nmf.plugin("after-resolve", afterResolve)
    })
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin(
        'html-webpack-plugin-before-html-processing',
        beforeHtmlProcessing
      )
    })
  }
}
