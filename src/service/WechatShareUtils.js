import wx from 'weixin-js-sdk'
import Vue from 'vue'
import { congigJsApi } from './getData'
let WechatShareUtils = {
  configJsApi: function () {
    var url = location.href.split('#')[0];
    congigJsApi(encodeURIComponent(url)).then(function(apiConfig) {
      console.log('apiConfig: ' + process.env.wechatAppid)
      wx.config({
        debug: false,
        appId: process.env.wechatAppid, // 必填，公众号的唯一标识
        timestamp: apiConfig.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: apiConfig.data.nonceStr, // 必填，生成签名的随机串
        signature: apiConfig.data.signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage',
          'hideMenuItems',
          'onMenuShareTimeline'
        ]
      })
    })
  },
  onMenuShareAppMessage: function (title, subTitle, shareLink, imgUrl) {
    wx.onMenuShareAppMessage({
      title: title,
      desc: subTitle,
      link: shareLink,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    })
    wx.onMenuShareTimeline({
      title: title,
      link: shareLink,
      imgUrl: imgUrl,
      trigger: function (res) {
      },
      success: function (res) {
      },
      cancel: function (res) {
      },
      fail: function (res) {
      }
    })
  }
}
export {WechatShareUtils}
