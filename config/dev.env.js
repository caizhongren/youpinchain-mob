var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseFileUrl: '"http://test321.hongcai.com/uploads/"',
  domain: '"http://m.test321.hongcai.com"',
  WEB_DEFAULT_DOMAIN: '"/hongcai/api/v1"',
  vue_domain: '"http://vue.test321.hongcai.com"',
  wechatAppid: '"wx02dfe579709d2d95"',
  wechat_redirect_url: '"http://m.test321.hongcai.com/views/get-weixin-code.html"'
})
