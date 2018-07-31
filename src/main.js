import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import wx from 'weixin-js-sdk'
import './config/rem'
import FastClick from 'fastclick'
import {baseUrl,domainUrl,appid,redirect} from './config/env'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter, wx)
const router = new VueRouter({
    routes,
    hashbang: true, // 将路径格式化为#!开头
    history: true, // use history=false when testing
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})
router.beforeEach((to, from, next) => {
    if (to.meta.title === undefined) {
        document.title = '链上优品'
    } else {
        document.title = to.meta.title
    }

    if ( localStorage.getItem('X-youpinchain-Token') == undefined ){
        let token = to.query.T;
        if(token){
            localStorage.setItem("X-youpinchain-Token",token);
            next(to.path);
        }else{
            let url = encodeURIComponent(domainUrl + to.path);
            let redirect_uri = encodeURIComponent(redirect);
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=" +appid+
                "&redirect_uri=" +redirect_uri+
                "&response_type=code&scope=snsapi_userinfo" +
                "&state=" +url+
                "&connect_redirect=1#wechat_redirect"
        }
    }
    next()
})

new Vue({
    router,
    store,
}).$mount('#app')
