<template>
<div class="goods">
    <head-top class="header" go-back='true' is-share="true" :showShare="showShare" :headTitle="headTitle"></head-top>
    <div class="top_main">
        <carousel :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="5" :paginationSize="8" :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color">
            <slide v-for="item in goods.headPic" :key="item.id">
                <img :src="item" alt="" class="show">
            </slide>
        </carousel>
        <div class="presell_box" v-if="goods.preSale">
            <div class="left_price left">
                <p class="price"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
                <p class="tip">商品预计{{(goods.preSaleDelivery.split('T')[0]) | dateCharacter}}发货</p>
            </div>
            <div class="right_tip right">
                <p>预售</p>
                <p>江浙沪北京地区专供</p>
            </div>
        </div>
        <div class="title">
            <p class="price" v-if="!goods.preSale"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
            <p class="name"><span class="presell_text" v-if="goods.preSale">【预售】</span>{{goods.name}}</p>
            <p class="desr">{{goods.describe}}</p>
        </div>
    </div>
    <div class="goods_info">
        <div class="info_title">商品详情</div>
        <!--<div class="info_content" v-html="goods.Desc"></div>-->
        <div class="info_content">
            <p>品名：{{goods.name}}</p>
            <p>净含量：{{goods.netContent}}</p>
            <p>包装形式：{{goods.packing}}</p>
            <p>保存状态：{{goods.storage}}</p>
            <p>保存期限：{{goods.qualityGuaranteePeriod}}</p>
            <p>温馨提示：打开包装后尽快食用，未使用部分冷冻保存。</p>
        </div>
        <!-- <div>
        <img v-for="item in goods.footPic" :src="item" alt="" width="100%" class="show">
      </div> -->
    </div>
    <div class="certificates">
        <p class="abstract">证件资质</p>
        <ul>
            <li @click="toCredential(0)"><img src="../../images/store/credentials_1.png" alt="">
                <p>检疫证</p>
            </li>
            <li @click="toCredential(1)"><img src="../../images/store/credentials_2.png" alt="">
                <p>合格证</p>
            </li>
            <li @click="toCredential(2)"><img src="../../images/store/credentials_3.png" alt="">
                <p>经营许可证</p>
            </li>
        </ul>
    </div>
    <div class="description_detail">
        <img class="abstractImg" src="../../images/store/Impression_bg.png" alt="">
        <ul>
            <li>
                <p>{{goods.name}}</p>
                <p>{{goods.describe}}</p>
            </li>
            <li v-if="goods.preSale">
                <p class="abstract">预售说明</p>
                <p align="center" style="text-align:center">为保证新鲜，生猪屠宰排酸后即发货。
                    <br/>9月18日屠宰，即日其可下单购买。
                    <br/>数量有限、售完为止。
                </p>
            </li>
            <li>
                <p class="abstract">物流说明</p>
                <div class="tip">（以下时效是以快递发出后计算）</div>
                <p>覆盖区域：仲秋活动仅限北京和江浙沪地区<br> 物流费用：消费不满199元，快递费15元；消费>199元，包邮。
                    <br/> 快递公司：默认顺丰或者申通。
                    <br/> 特别提示：北京订单为淮安至北京冷链车统一运送，北京同城快递达至客户手中。
                </p>
            </li>
            <li>
                <p class="abstract">售后说明</p>
                <p>若因外箱破损或快递延误发现腐烂变质情况，请在收获后3小时联系客服，我们来为您处理，保证您购物无忧。 <br/> 温馨提示：因生鲜产品特殊性，物流签收超过24小时后，不支持退换货，敬请谅解。
                </p>
            </li>
        </ul>
    </div>
    <div class="add_cart_container">
        <router-link class="cart_icon_num left" :to="'/cart'">
            <div class="icon"><span class="red-points" v-if="cart_num">{{cart_num}}</span></div>
        </router-link>
        <div class="cart_btn right" @click="addCartList(goods)">加入购物车</div>
    </div>
    <share-mask v-if="showShare" :showShare="showShare"></share-mask>
</div>
</template>

<script>
import {
    Carousel,
    Slide
} from "vue-carousel";
import shareMask from "src/components/common/shareMask";
import headTop from "src/components/header/head";
import {
    ModalHelper
} from "../../service/Utils";
import {
    showBack
} from "src/config/mUtils";
import {
    addToCart,
    getProductDetail,
    cartProductCount
} from "../../service/getData";
import {
    WechatShareUtils
} from '../../service/WechatShareUtils'
import wx from 'weixin-js-sdk'
export default {
    data() {
        return {
            showShare: false,
            headTitle: "",
            goodsid: "",
            goods: {},
            cart_num: 0,
            number: [1, 2, 3, 4, 5],
            pagination: {
                activeColor: "#e4372e",
                color: "#fff"
            }
        };
    },
    watch: {
        showShare: function (newVal, oldVal) {
            newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose();
        }
    },
    mounted() {
        this.goodsid = this.$route.params.goodsid;
        this.initData();
        this.initCartCount();
    },
    components: {
        Carousel,
        Slide,
        shareMask,
        headTop
    },
    computed: {},
    props: ["showErrMsg"],
    methods: {
        toCredential(index) {
            this.$router.push("/credentials/#w_anchor" + index);
        },
        initData() {
            var that = this;
            getProductDetail(that.goodsid).then(res => {
                if (res.errno !== 0) {
                    return;
                }
                that.goods = res.data;
                !res.data.preSaleDelivery ?
                    (that.goods.preSaleDelivery = "2018-09-18T00:58:28") :
                    null;
                wx.ready(function () {
                    var shareLink = window.location.href
                    WechatShareUtils.onMenuShareAppMessage('区块苏淮猪 ' + that.goods.name + that.goods.netContent + '*1' + that.goods.packing, that.goods.describe, shareLink, that.goods.thumbnailPic)
                })
            });

            //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
            showBack(status => {
                that.headTitle = status ? that.goods.name : "";
            });
        },
        initCartCount() {
            cartProductCount().then(res => {
                if (res.errno == 0) {
                    this.cart_num = res.data;
                }
            });
        },
        addCartList(goods) {
            addToCart(this.goodsid, 1).then(res => {
                if (res.errno === 0) {
                    this.showErrMsg("添加成功");
                    this.initCartCount();
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.goods {
    padding: 0.45rem 0 0.5rem;
    .top_main {
        .show {
            @include wh(100%, 3.75rem);
        }
    }
    .presell_box {
        overflow: hidden;
        padding: 0.08rem 0 0.12rem 0.12rem;
        background-image: linear-gradient(133deg, #fc5b46, #fa424f);
        @include wh(100%, 0.64rem);
        .left_price {
            .price {
                @include sc(0.238rem, $fc);
                font-weight: bold;
                span {
                    @include sc(0.15rem, $fc);
                    font-weight: bold;
                }
                s {
                    @include sc(0.12rem, $fc);
                    font-weight: normal;
                }
            }
            .tip {
                @include sc(0.12rem, $fc);
                margin-top: -0.05rem;
            }
        }
        .right_tip {
            position: relative;
            width: 1.35rem;
            text-align: center;
            p:first-child {
                @include sc(0.18rem, $fc);
                padding-top: 0.04rem;
            }
            p:last-child {
                @include sc(0.13rem, rgba(255, 255, 255, 0.6));
            }
            &:before {
                content: "";
                position: absolute;
                top: 0.1rem;
                left: 0;
                @include wh(0.01rem, 0.33rem);
                background-color: $fc;
            }
        }
    }
    .title {
        background-color: $fc;
        padding: 0.02rem 0.15rem 0.1rem;
        border-radius: 0.12rem 0.12rem 0 0;
        .price {
            @include sc(0.238rem, $red);
            font-weight: bold;
            span {
                @include sc(0.12rem, $red);
                font-weight: normal;
            }
            s {
                @include sc(0.12rem, $g9);
                font-weight: normal;
            }
        }
        .name {
            @include sc(0.18rem, $g3);
            padding: 0.01rem 0 0.02rem;
            .presell_text {
                @include sc(0.18rem, $g3);
                margin: 0.08rem 0 0 -0.1rem;
                display: inline-block;
            }
        }
        .desr {
            @include sc(0.12rem, $g6);
        }
    }
    .goods_info {
        margin-top: 0.15rem;
        background-color: $fc;
        .info_title {
            padding-left: 0.16rem;
            border-left: 7px solid $red;
            line-height: 0.45rem;
            border-bottom: 1px solid #f7f7fa;
            @include wh(100%, 0.45rem);
            @include sc(0.15rem, $g6);
        }
        .info_content {
            p {
                @include sc(0.13rem, $g6);
                line-height: 0.35rem;
                border-bottom: 1px solid #f7f7fa;
                padding: 0rem 0.21rem;
            }
        }
    }
    .certificates {
        text-align: center;
        background-color: $bc;
        padding: 0.3rem 0.08rem;
        .abstract {
            @include sc(0.2rem, $g3);
            margin-bottom: 0.27rem;
        }
        ul {
            display: flex;
            li {
                flex: 1;
                background-color: #fcfbfc;
                margin: 0 0.04rem;
                padding: 0.1rem 0;
                border-radius: 0.05rem;
                img {
                    width: 0.34rem;
                }
                p {
                    @include sc(0.13rem, $g6);
                }
            }
        }
    }
    .description_detail {
        .abstractImg {
            width: 100%;
            display: block;
        }
        ul {
            li {
                padding: 0.3rem;
                background-color: #fcfbfc;
                .abstract {
                    @include sc(0.2rem, $g3);
                    text-align: center;
                }
                p {
                    @include sc(0.13rem, $g6);
                    text-align: justify;
                }
                p:last-child {
                    margin-top: 0.25rem;
                }
                .tip {
                    @include sc(0.13rem, $g6);
                    text-align: center;
                }
            }
            li:nth-child(even) {
                background-color: $bc;
            }
            li:first-child {
                position: relative;
                p:first-child {
                    padding: 0 0.06rem;
                    line-height: 0.205rem;
                    height: 0.205rem;
                    background-color: #c51215;
                    @include sc(0.15rem, $fc);
                    position: absolute;
                    border-radius: 0.05rem;
                }
                p:last-child {
                    @include sc(0.15rem, $g3);
                }
            }
        }
    }
    .add_cart_container {
        position: fixed;
        bottom: 0;
        overflow: hidden;
        clear: both;
        @include wh(100%, 0.49rem);
        .cart_icon_num {
            @include wh(1.06rem, 0.49rem);
            background-color: $fc;
            .icon {
                position: relative;
                margin: 0.13rem auto;
                @include wh(0.245rem, 0.225rem);
                @include bis("../../images/tab-buy-normal.png");
            }
        }
        .cart_btn {
            line-height: 0.49rem;
            text-align: center;
            background-color: $red;
            width: 71.73%;
            @include sc(0.15rem, $fc);
        }
    }
}
</style>
