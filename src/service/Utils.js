let Utils = {
  isWeixin: function () {
    var ua = navigator.userAgent.toLowerCase()
    return /MicroMessenger/i.test(ua)
  },
  isWindowsWechat: function () {
    var ua = navigator.userAgent.toLowerCase()
    return /WindowsWechat/i.test(ua)
  },
  isAndroid: function () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /android/i.test(userAgent) && !/windows phone/i.test(userAgent)
  },
  isIos: function () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
  },
  isWinPhone: function () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /windows phone/i.test(userAgent)
  },
  removeParam: function (key, sourceURL) {
    var rtn = sourceURL.split('?')[0]
    var param
    var paramsArr = []
    var queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : ''
    if (queryString !== '') {
      paramsArr = queryString.split('&')
      for (var i = paramsArr.length - 1; i >= 0; i -= 1) {
        param = paramsArr[i].split('=')[0]
        if (param === key) {
          paramsArr.splice(i, 1)
        }
      }
      rtn = rtn + '?' + paramsArr.join('&')
    }
    return rtn
  },
  /**
   * 跳转去微信授权
   */
  redirectToWechatAuth: function (redirectUrl) {
    redirectUrl = Utils.removeParam('code', redirectUrl)
    redirectUrl = encodeURIComponent(Utils.removeParam('state', redirectUrl))
    var wechatRedirectUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize??appid=' + process.env.wechatAppid +
              '&redirect_uri=' + redirectUrl + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
    console.log(wechatRedirectUrl)
    window.location.href = wechatRedirectUrl
  },
  deviceCode: function () {
    var deviceCode = 0
    if (Utils.isAndroid()) {
      deviceCode = 2
    }
    if (this.isWeixin() && Utils.isAndroid()) {
      deviceCode = 3
    }
    if (Utils.isIos()) {
      deviceCode = 5
    }
    if (this.isWeixin() && Utils.isIos()) {
      deviceCode = 6
    }
    console.log(deviceCode)
    return deviceCode
  },
  guestId: function (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []
    var i
    radix = radix || chars.length
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }
}
let InviteShareUtils = {
  share: function (inviteCode) {
    var title = this.shareTitle()
    var subTitle = this.shareSubtitle()
    var linkUrl = this.shareLink(inviteCode)
    var imageUrl = this.shareImageUrl()
    var shareItem = {
      title: title,
      subTitle: subTitle,
      linkUrl: linkUrl,
      imageUrl: imageUrl
    }
    return shareItem
  },
  shareTitle: function () {
    // var titleArray = []
    // titleArray.push('加入“宏财合伙人计划” ，一起发宏财！')
    // titleArray.push('朋友！收下这份大礼，你就是我的人了！')
    // titleArray.push('这四海八荒的财运，我都攒到一起送给你啦！')
    // titleArray.push('一个好汉三个帮，投资就上宏财网！')
    // return titleArray[Math.floor(Math.random() * titleArray.length)]
    var title = '这等好事，我第一个就想到你！'
    return title
  },
  shareSubtitle: function () {
    var subTitle = '既然都是老朋友，当然要享受特殊待遇咯！请先收下这18888元专属福利吧！'
    return subTitle
  },
  shareLink: function (inviteCode) {
    var shareLink = process.env.vue_domain + '/activity/invite-sharing'
    if (inviteCode) {
      shareLink = shareLink + '/' + inviteCode
    }
    shareLink = shareLink + '?act=44&f=officeweb'
    return shareLink
  },
  shareImageUrl: function () {
    var imageUrl = 'https://www.hongcai.com/uploads/png/original/2018-05-04/image/fb877197d1f54f52922186bda181f8b4-original.png'
    return imageUrl
  }
}
/**
 * 滚动穿透问题
 */
let ModalHelper = (function (bodyCls) {
  return {
    scrollTop: document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop,
    afterOpen: function () {
      ModalHelper.scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.body.scrollTop
      document.body.classList.add(bodyCls)
      document.body.style.top = -ModalHelper.scrollTop + 'px'
    },
    beforeClose: function () {
      document.body.classList.remove(bodyCls)
      document.body.removeAttribute('style')
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = ModalHelper.scrollTop
      } else {
        document.body.scrollTop = ModalHelper.scrollTop
      }
    }
  }
})('modal-open')
export {Utils}
export {InviteShareUtils}
export {ModalHelper}
