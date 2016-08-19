import expect from 'expect'
import webpack from 'webpack'
import fs from 'fs'
import path from 'path'
import webpackConfig from './sample/webpack.config'
import px2remWebpackPlugin from '../dist'

const REGEX_CSS = /\/\*\*2w351r5q1rq2ekok\*\*\/([\s\S]*?)\/\*\*aiij34jri2rj24iji/
const REGEX_CSS_IN_NODE_MODULES = /\/\*\*w3a9jaqj3irirn3\*\*\/([\s\S]*?)\/\*\*w3a9jaqj3irirn3/
const distAppFile = path.resolve(__dirname, './sample/dist/app.js')

describe('compile ./sample with my plugin', () => {
  let cssSource, cssSourceInNodeModules

  before((done) => {
    webpack(webpackConfig, (err, stats) => {
      expect(err).toNotExist()
      const jsSource = fs.readFileSync(distAppFile, 'utf-8')
      cssSource = jsSource.match(REGEX_CSS)[1]
      cssSourceInNodeModules = jsSource.match(REGEX_CSS_IN_NODE_MODULES)[1]
      done()
    })
  })

  it('should compile px to rem in normal rule', () => {
    expect(cssSource).toInclude('width: 15rem;')
  })

  it('should not compile border-* property', () => {
    expect(cssSource).toInclude('border-radius: 15px;')
  })

  it('should not compile px in MediaQuery condtion', () => {
    expect(cssSource).toInclude('@media (min-width: 480px)')
  })

  it('should compile px to rem in keyframe rule', () => {
    expect(cssSource).toInclude('top: 7.5rem;')
  })

  it('should not compile 0, which do not have unit', () => {
    expect(cssSource).toInclude('top: 0;')
  })

  it('should compile px to rem both under MediaQuery and keframe', () => {
    expect(cssSource).toMatch(/left:\s+3.25rem;/)
  })

  it('css file in node_modules should not be compiled', () => {
    expect(cssSourceInNodeModules).toMatch(/height:\s*750px;/)
  })

})

describe('compile ./sample with my plugin using option border', () => {

  let cssSource

  before((done) => {
    webpackConfig.plugins[1] = new px2remWebpackPlugin({
      originScreenWidth: 750, border: true
    })

    webpack(webpackConfig, (err, stats) => {
      expect(err).toNotExist()
      const jsSource = fs.readFileSync(distAppFile, 'utf-8')
      cssSource = jsSource.match(REGEX_CSS)[1]
      done()
    })
  })

  it('should compile border-* property with border option true', () => {
    expect(cssSource).toInclude('border-radius: 0.15rem;')
    expect(cssSource).toInclude('border: 0.3rem soild white;')
  })
})
