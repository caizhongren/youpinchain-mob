var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  DOMAIN: '"http://youpinlian.datbc.com"',
  WEB_DEFAULT_DOMAIN: '"/youpin/wx"',
  WECHAT_APPID: '"wx39e1a9f3d6c8cdc5"'
})
