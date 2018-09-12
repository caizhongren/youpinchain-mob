<template>
<div class="home">
    <div class="mescroll" ref="mescroll">
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
        <div v-show="!showLoading">
            <router-link tag="div" class="header_image" :to="{path:'/introduce'}">
                <img :src="brand.pictureUrl" alt="" width="100%" class="show">
            </router-link>
            <!-- <ul class="product_nav">
            <li v-for="(tab, index) in product_nav" :key="index" :class="{'active': index === activeTab}" v-if="tab.name !== 'brand'"
                @click="toggleTab(tab.id,index)">{{tab.name}}</li>
          </ul> -->
            <section id="hot_goods">
                <h4 class="goods_title">热卖商品</h4>
                <ul class="goodslistul clear">
                    <li v-for="item in hotgoodslist" :key="item.id">
                        <router-link tag="div" :to="'/goods/' + item.id">
                            <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
                            <div class="left goods_info">
                                <p class="name">{{item.name + ' ' + item.netContent}}*1{{item.packing}}</p>
                                <p class="desr">{{item.describe}}</p>
                                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                                <p class="price"><span class="RMB">￥</span>{{item.presentPrice}} <s>￥{{item.originalPrice}}</s></p>
                            </div>
                        </router-link>
                        <div class="shopping_cart" @touchstart="addToCart(item.id, $event)"></div>
                    </li>
                </ul>
                <transition appear @after-appear='afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
                    <span class="move_dot" v-if="item"></span>
                </transition>
            </section>
        </div>
    </div>
    <foot-guide></foot-guide>
</div>
</template>

<script>
import footGuide from '../../components/footer/footGuide'
import {
    homeIndex,
    addToCart,
    productList
} from '../../service/getData'
import {
    WechatShareUtils
} from '../../service/WechatShareUtils'
import loading from "../../components/common/loading";
import wx from 'weixin-js-sdk'
import MeScroll from '../../static/mescroll/mescroll.min.js'
export default {
    data() {
        return {
            brand: {},
            goodsList: [],
            product_nav: [],
            activeTab: 0,
            hotgoodslist: [],
            showLoading: true,
            showMoveDot: [], //控制下落的小圆点显示隐藏
            elLeft: 0, //当前点击加按钮在网页中的绝对top值
            elBottom: 0, //当前点击加按钮在网页中的绝对left值
            page: 1,
            pageSize: 4,
            datasBrandId: "",
            mescroll: null
        }
    },
    mounted() {
        //获取商品列表
        homeIndex().then(res => {
            this.product_nav = res.data.brandDatas
            this.brand = res.data.brand
            this.showLoading = false;
            this.getDatasBrandId(res.data.brandDatas)
        })
        var that = this
        that.mescroll = new MeScroll(that.$refs.mescroll, { 
            down: {
                use: true,
            },
            up: {
              callback: that.upCallback,
              page: {
                num: 0, 
                size: 4,
              }
            }
        });
        that.$refs.mescroll.style.maxHeight = document.body.offsetHeight - parseInt(document.getElementsByTagName('html')[0].style.fontSize) * 0.49 + 'px';
        wx.ready(function () {
            var shareLink = window.location.href
            WechatShareUtils.onMenuShareAppMessage('区块苏淮猪，不含抗生素，农业大学的优质猪肉，限量预售！', '仲秋钜惠，全场6.8折！', shareLink, 'https://mmbiz.qpic.cn/mmbiz_png/puDuBHDXJkwPdHoIeZJneedu9tqjA7cVVbZpCOfEtor98FNCibhzZBqE0fbY9IVMLepDaxnVM3q3RvZ8apibiaFicA/0?wx_fmt=png')
        })

    },
    components: {
        footGuide,
        loading
    },
    computed: {},
    methods: {
        toggleTab(dataId, index) {
            this.$router.push("/growing-environment?dataId=" + dataId);
            this.activeTab = index
        },
        addToCart(productId, event) { // 加入购物车，计算按钮位置。
            let elLeft = event.target.getBoundingClientRect().left;
            let elBottom = event.target.getBoundingClientRect().bottom;
            this.showMoveDot.push(true);
            let that = this;
            this.showMoveDotFun(this.showMoveDot, elLeft, elBottom);
            addToCart(productId, 1).then(res => {
                that.$parent.getCartNum();
            })
        },
        showMoveDotFun(showMoveDot, elLeft, elBottom) { // 显示下落圆球
            this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
            this.elLeft = elLeft;
            this.elBottom = elBottom;
        },
        beforeEnter(el) {
            console.log(this.elBottom)
            el.style.transform = `translate3d(${this.elLeft - 230}px,${20 +this.elBottom - window.innerHeight}px,0px)`;
            el.style.opacity = 0;
        },
        afterEnter(el) {
            el.style.transform = `translate3d(0,0,0px)`;
            el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
            this.showMoveDot = this.showMoveDot.map(item => false);
            el.style.opacity = 1;
        },
        getDatasBrandId(nav) {
            nav.forEach(key => {
                if (key.name === 'brand') {
                    this.datasBrandId = key.id
                }
            })
        },
        upCallback(page) {
          productList(page.num, page.size).then(res => {
            this.showLoading = false;
            let arr = res.data.productList;
            if (page.num == 1) this.hotgoodslist = [];
            var that = this
            setTimeout(function () {
              that.hotgoodslist = that.hotgoodslist.concat(arr);
              that.$nextTick(() => {
                that.mescroll.endSuccess(arr.length);
              })
            },300)
          }).catch((e)=> {
            this.mescroll.endErr();
          })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../static/mescroll/mescroll.min.css';
@import '../../style/mixin';
.header_image {
    height: 4.2rem;
}

.move_dot {
    position: fixed;
    bottom: .32rem;
    left: 52.7%;
    background: $red;
    display: block;
    border-radius: 50%;
    @include wh(.15rem, .15rem);
}
.home {
    padding-bottom: .5rem;
}

.product_nav {
    overflow: hidden;
    clear: both;
    text-align: center;
    background-color: $fc;
    @include wh(100%, .575rem);
    line-height: .575rem;
    li {
        float: left;
        @include wh(33.333%, .575rem);
        @include sc(.15rem, $g6);
    }
    li.active {
        background-color: $red;
        color: $fc;
    }
}

#hot_goods {
    background-color: $fc; // margin-top: .15rem;
    padding: .2rem 0 0;
    .goods_title {
        text-align: center;
        margin: 0 auto;
        display: block;
        line-height: .41rem;
        text-shadow: 0px 1px 5px rgba(118, 176, 252, 0.67);
        @include wh(42%, .41rem);
        @include sc(.15rem, $fc);
        @include bis('../../images/home-bg-rmsp-normol.png');
    }
    .goodslistul {
        padding: .25rem .15rem 0rem;
        img {
            margin-right: .12rem;
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 5px;
        }
        img.noImage {
            background-color: #000;
        }
        li {
            width: 100%;
            clear: both;
            overflow: hidden;
            margin-bottom: .12rem;
            position: relative;
            border-bottom: 1px solid #f8f8f8;
            padding-bottom: .15rem;
        }
        li:last-child {
          margin-bottom: 0;
        }
        .goods_info {
            width: 55%;
            .name {
                @include sc(.15rem, $g3);
                padding: .05rem 0 .03rem;
            }
            .desr {
                @include sc(.12rem, $g6);
                height: .75rem;
            }
            .coupon {
                border-radius: 10px;
                display: inline-block;
                transform: scale(0.82) translateX(-8px);
                margin: .2rem 0 .1rem;
                padding: 0 .05rem;
            }
            .useCoupon {
                @include sc(.12rem, $red);
                border: 1px solid $red;
            }
            .unuseCoupon {
                @include sc(.12rem, $g9);
                border: 1px solid $g9;
            }
            .price {
                // margin-top: .6rem;
                @include sc(.18rem, $red);
                font-weight: bold;
                s {
                    @include sc(.12rem, $g9);
                    font-weight: normal;
                }
            }
        }
        .shopping_cart {
            position: absolute;
            right: 0;
            bottom: .25rem;
            @include wh(.315rem, .315rem);
            @include bis('../../images/shopping_cart.png');
        }
    }
}
</style>
