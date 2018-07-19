var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"test"',
  baseFileUrl: '"http://test321.hongcai.com/uploads/"',
  domain: '"http://m.test321.hongcai.com"',
  WEB_DEFAULT_DOMAIN: '"/hongcai/api/v1"',
  vue_domain: '"http://vue.test321.hongcai.com"',
  wechatAppid: '"wx02dfe579709d2d95"',
  wechat_redirect_url: '"http://m.test321.hongcai.com/views/get-weixin-code.html"'
})
