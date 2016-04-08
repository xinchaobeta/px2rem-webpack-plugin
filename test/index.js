import expect from 'expect'
import webpack from 'webpack'
import fs from 'fs'
import webpackConfig from './sample/webpack.config'

const REGEX = /\/\*\*2w351r5q1rq2ekok\*\*\/([\s\S]*?)\/\*\*aiij34jri2rj24iji/

webpack(webpackConfig, (err, stats) => {
  expect(err).toNotExist()
  const jsSource = fs.readFileSync('./sample/dist/app.js', 'utf-8')
  const cssSource = jsSource.match(REGEX)[1]
  console.log('cssSource = ', cssSource)
  //TODO
})
