<template>
<div>
    <transition name="router-fade" mode="out-in">
        <router-view :addCartFn="addCartFn" :showErrMsg="showErrMsg"></router-view>
    </transition>
    <div id="err" v-show="showErr" v-bind:style="styleObject">{{errMsg}}</div>
    <svg-icon></svg-icon>
</div>
</template>

<script>
import Vue from 'vue'
import * as custom from './plugins/custom'
import svgIcon from './components/common/svg';
import {
    login_oa,
    cartProductCount
} from './service/getData'
import {
    Utils
} from './service/Utils'
export default {
    data() {
        return {
            showErr: false,
            errMsg: '',
            timer: null,
            styleObject: {},
            userInfo: {}
        }
    },
    watch: {
        // '$route': 'login_oa'
    },
    components: {
        svgIcon,
    },
    mounted() {
        var vue = this
        window.addEventListener('touchmove', function (event) {
            event.stopPropagation()
            vue.showErr ? vue.showErr = false : null
        }, false)
        // this.getCartNum();
    },
    methods: {
        addCartFn(youpinCart, productId, number) { // 添加购物车
            addCart(youpinCar, productId, number).then(function (res) {
                console.log(res)
            })
        },
        getCartNum() {
            cartProductCount().then(res => {
                if (res.errno == 0) {
                    this.$store.state.cart_num = res.data;
                }
            })
        },
        showErrMsg(msg, setErrStyle) {
            var that = this
            setErrStyle ? that.styleObject = setErrStyle : null
            that.showErr = true
            that.errMsg = msg
            that.timer = setTimeout(function () {
                that.showErr = false
                that.errMsg = ''
            }, 2000)
        }
    }
}
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
Vue.directive('client-height', function (el, binding) {
    function setHeight() {
        el.style.height = document.documentElement.clientHeight + 'px'
    }
    setHeight()
    window.addEventListener('load', function () {
        setHeight()
    }, window.addEventListener('resize', function () {
        setHeight()
    }))
})
</script>

<style lang="scss">
@import './style/common';
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}

body {
    font-size: .14rem;
}

/* 错误提示 */

#err {
    position: fixed;
    top: 2.8rem;
    left: .8rem;
    right: .8rem;
    padding: .08rem 0;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: .2rem;
    text-align: center;
    @include sc(.14rem, $fc);
    z-index: 10000000;
}
</style>
