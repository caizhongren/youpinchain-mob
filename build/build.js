// https://github.com/shelljs/shelljs
require('shelljs/global')
var env = process.argv[2];
if(!env) {
  env = 'production'
}
// env.NODE_ENV = 'production'
process.env.NODE_ENV = env

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

if (env == 'test') {
webpackConfig = require('./webpack.test.conf')
}

var spinner = ora('building for ' + env + '...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})