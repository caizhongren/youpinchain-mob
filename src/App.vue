<template>
<div>
    <transition name="router-fade" mode="out-in">
        <router-view :addCartFn="addCartFn" :showErrMsg="showErrMsg"></router-view>
    </transition>
    <div id="err" v-show="showErr" v-bind:style="styleObject">{{errMsg}}</div>
    <div class="mask-common mask1" v-show="showLongErr">
      <div class="alert-wrap" v-show="showLongErr">
        <div class="text">
          {{errMsg}}
        </div>
        <div class="i-know" @click="showLongErr = false">
          知道啦
        </div>
      </div>
    </div>
    <svg-icon></svg-icon>
</div>
</template>

<script>
import Vue from 'vue'
import * as custom from './plugins/custom'
import svgIcon from './components/common/svg';
import { ModalHelper } from './service/Utils'
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
            showLongErr: false,
            timer: null,
            styleObject: {},
            userInfo: {}
        }
    },
    watch: {
        // '$route': 'login_oa'
        showLongErr: function(val) {
            val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
        }
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
        showErrMsg (msg, isLong, setErrStyle) {
            clearTimeout(this.timer)
            this.showErr = false
            var that = this
            setErrStyle ? this.styleObject = setErrStyle : null
            if (isLong) {
                that.showLongErr = true
                that.errMsg = msg
            } else {
                that.showErr = true
                that.errMsg = msg
                that.timer = setTimeout(function () {
                    that.showErr = false
                    that.errMsg = ''
                }, 2000)
            }
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
.mask-common {
  position: fixed;
  top: 0;
  z-index: 999999;
  bottom: -5px;
  left: 0;
  right: 0;
  /* max-width: 7.2rem; */
  margin: 0 auto;
  background-color: rgba(0,0,0,0.9);
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden !important;
}
.mask-common.mask1 {
    background-color: rgba(0,0,0, .8);
}
.mask1 .alert-wrap {
    background: #fff;
    width: 2.8rem;
    margin: 0 auto;
    padding: .2rem .4rem .15rem;
    border-radius: .1rem;
    margin-top: 2rem;
    text-align: center;
}
.mask1 .alert-wrap .text {
    height: .35rem;
    line-height: 1.67;
    font-size: 0.18rem;
    color: #333333;
}
.mask1 .alert-wrap .i-know {
    background: #fc5340;
    font-size: 0.15rem;
    color: #fff;
    line-height: .4rem;
    height: .4rem;
    margin-top: .18rem;
    border-radius: .05rem;
}
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
