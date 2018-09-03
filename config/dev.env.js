var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DOMAIN: '"http://youpinlian.datbc.com"',
  WEB_DEFAULT_DOMAIN: '"/youpin/wx"',
  WECHAT_APPID: '"wx39e1a9f3d6c8cdc5"'
})
