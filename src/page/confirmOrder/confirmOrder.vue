<template>
<div class="confirmOrderContainer header-top">
    <head-top head-title="订单确认" go-back='true'></head-top>
    <nav class="shop_list_container">
        <div class="swiper-container" v-if="productList.length">
            <div class="topBG" v-if="choosedAddress"></div>
            <div class="address">
                <div class="no_address" v-if="!choosedAddress">
                    <section class="adddetail">
                        <form action="" v-on:submit.prevent>
                            <section class="ui-padding-block">
                                <div class="input-new">
                                    <span>姓名</span>
                                    <input type="text" placeholder="请填写你的姓名" v-model="address.name">
                                </div>
                                <div class="add-detail">
                                    <div class="input-new">
                                        <span>联系电话</span>
                                        <input type="tel" maxlength="11" placeholder="请填写收货人手机号" v-model="address.mobile" v-on:input="address.mobile = address.mobile.replace(/\D/g, '')" />
                                    </div>
                                </div>
                                <div class="input-new">
                                    <span>所在地区</span>
                                    <input type="text" id="address-input" readonly="readonly" style="width:2.5rem;" placeholder="请选择" v-model="address.tipText" />
                                    <svg fill="#bbb" style="width: 0.18rem;margin-left: .1rem;">		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>		</svg>
                                </div>
                                <div class="input-new">
                                    <span>地址</span>
                                    <textarea placeholder="请填写详细地址" id="adinfo" value="" rows="2" v-model="address.address"></textarea>
                                </div>
                            </section>
                            <div id="container"></div>
                        </form>
                    </section>
                    <section class="addbutton">
                        <button :class="{butopacity:butpart}" @click.prevent="submitAddress(address)">保存</button>
                    </section>
                </div>
                <router-link :to="{name: 'addressList', query:{path: 'confirmOrder'}}" class="address_info" v-else>
                    <div class="address-detail">
                        <p>{{choosedAddress.provinceName + choosedAddress.cityName + choosedAddress.areaName + choosedAddress.address}}</p>
                        <p><span>{{choosedAddress.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{choosedAddress.mobile}}</span></p>
                    </div>
                    <div class="deletesite">
                        <span></span>
                    </div>
                </router-link>
            </div>
            <div class="shop_info">
                <ul class="goods">
                    <li v-for="item in productList" :key="item.id">
                        <img :src="item.thumbnailPic" alt="" class="img">
                        <div class="goods_info">
                            <p class="name">{{item.productName}}</p>
                            <p class="price"><span>¥</span>{{item.presentPrice}}</p>
                        </div>
                        <div class="cart_btns">
                            <span class="num">x{{item.number}}</span>
                        </div>
                    </li>
                    <transition name="fade">
                        <div v-if="showTotal" class="load_more" @click="loadAllProducts();">共{{productList.length}}件 <img src="../../images/path-2.png" width="4%"> </div>
                    </transition>
                </ul>
                <ul class="payment_info">
                    <li>
                        <p>商品总价</p>
                        <p>¥{{goodsPrice}}</p>
                    </li>
                    <li>
                        <p>优惠价格</p>
                        <p class="coupon">- ¥0.00</p>
                    </li>
                    <li>
                        <p>运费</p>
                        <p>¥{{fare}}</p>
                    </li>
                    <li>
                        <p>包装费</p>
                        <p>¥{{packingFee}}</p>
                    </li>
                    <li>
                        <p>包装费减免</p>
                        <p>¥{{packingFeeReduction}}</p>
                    </li>
                </ul>
                <div class="right totalPrice">
                    实际支付
                    <p><span>¥</span>{{totalPrice}}</p>
                </div>
            </div>
        </div>
    </nav>
    <ul class="settlement">
        <li @click="paymentCall()">去付款</li>
        <li>付款 &nbsp;<span class="red">¥{{totalPrice}}</span></li>
    </ul>
</div>
</template>

<script>
import headTop from '../../components/header/head'
import AjaxPicker from "ajax-picker";
import {
    mapState,
    mapMutations
} from "vuex";
import {
    submitOrder,
    getDefaultAddress,
    getAddressList,
    getRegionsList,
    prepayOrder,
    addAddress
} from "../../service/getData";
export default {
    data() {
        return {
            showTotal: false,
            shopCart: null, // 购物车数据
            totalPrice: 0,
            goodsPrice: 0,
            packingFee: 0,
            packingFeeReduction: 0,
            fare: 0,
            productList: [],
            butpart: false, //  新增地址按钮的透明度
            choosedAddress: undefined,
            address: {
				name: '', // 姓名
				mobile: '', // 手机号
				tipText: '', // 送餐地址
            	address: '', // 地址
			},
        }
    },
    props: ['showErrMsg'],
    watch: {},
    computed: {},
    mounted() {
        this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
        if (!this.choosedAddress) {
			this.setRegions();
			this.getDefaultAddress()
        }
    },
    created() {
        this.productList = JSON.parse(
            sessionStorage.getItem(this.$route.query.cartsKey)
        );

        this.showTotal = this.productList.length > 2;
        this.productList.forEach(product => {
            this.totalPrice += product.presentPrice * product.number;
            this.goodsPrice += product.presentPrice * product.number;
        });
    },
    methods: {
        // ...mapMutations(["CHOOSE_ADDRESS"]),

        loadAllProducts() {

        },
        paymentCall() {
            if (!this.choosedAddress) {
                this.showErrMsg('请填写正确收货地址！')
                return
            }
            let cartIds = [];
            this.productList.forEach(cart => {
                cartIds.push(cart.cartId);
            });
            let addressId = this.choosedAddress.id;
            submitOrder(cartIds, addressId).then(res => {
                if(res.errno !== 0) {
                    return;
                }
                let orderId = res.data.orderId;
                prepayOrder(orderId).then(resp => {
                    var that = this;
                    if (resp.errno === 403) {
                        alert("订单不可支付")
                    } else {
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": resp.data.appId, //公众号名称，由商户传入
                                "timeStamp": resp.data.timeStamp, //时间戳，自1970年以来的秒数
                                "nonceStr": resp.data.nonceStr, //随机串
                                "package": resp.data.packageValue,
                                "signType": resp.data.signType, //微信签名方式：
                                "paySign": resp.data.paySign //微信签名
                            },
                            function (res) {
                                if (res.err_msg == "get_brand_wcpay_request:ok") {
                                    that.$router.push('/order/undelivery');
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
            })
        },
        //保存地址
        async submitAddress(address) {
            if (!address.name) {
               this.showErrMsg('请填写你的姓名')
               return
		    }
		    if (!address.mobile) {
               this.showErrMsg('请填写收货人手机号')
               return
			}
			if (address.mobile.length < 11) {
               this.showErrMsg('请填写正确的收货人手机号')
               return
            }
			if (!address.tipText) {
				this.showErrMsg('请选择您的所在地区')
            	return
			}
			if (!address.address) {
				this.showErrMsg('请填写详细地址')
            	return
			}
            addAddress(
                address.name,
                address.provinceId,
                address.cityId,
                address.areaId,
                address.mobile,
                address.address
            ).then(res => {
                address.id = res.data;
                if (res.errno == 0) {
					localStorage.setItem('choosedAddress', JSON.stringify(address));
					this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
                }
            });
		},
		// 设置地址插件
		setRegions () {
            var that = this;
            getRegionsList(0).then(res => {
                that.provinces = res.data;
                var provinces = this.provinces;
                var picker = new AjaxPicker({
                    title: "配送至",
                    tipText: ["省份", "城市", "区/县"],
                    input: "address-input",
                    container: "container",
                    renderArr: [
                        function () {
                            picker.render(provinces);
                        },
                        function () {
                            getRegionsList(picker.result1.id).then(res => {
                                picker.render(res.data);
                            });
                        },
                        function () {
                            getRegionsList(picker.result2.id).then(res => {
                                picker.render(res.data);
                            });
                        }
                    ],
                    success: function (arr) {
                        console.log(arr)
                        var addressD = "";
                        for (var i = 0; i < arr.length; i++) {
                            addressD += " " + arr[i].value;
                        }
						document.getElementById("address-input").value = addressD.substring(1);
                        that.address.provinceId = picker.result1.id;
                        that.address.provinceName = picker.result1.value;
                        that.address.cityId = picker.result2.id;
                        that.address.cityName = picker.result1.value;
                        that.address.areaId = picker.result3.id;
                        that.address.areaName = picker.result3.value;
                        that.address.tipText = addressD.substring(1);
                    }
                });
            });
		},
		// 获取默认地址信息
		getDefaultAddress () {
			// 默认用户地址
			getDefaultAddress().then(res => {
				if (res.errno == 0 && res.data) {
					let address = res.data;
					let index = -1;
					this.choosedAddress = address;
					localStorage.setItem('choosedAddress', JSON.stringify(address));
				} else {
                    getAddressList({
                        page: 1,
                        pageSize: 1
                    }).then(res => {
                        if (res.errno == 0 && res.data.size() > 0) {
                            this.choosedAddress = res.data[0];
                            localStorage.setItem('choosedAddress', JSON.stringify(this.choosedAddress));
                        }
                    })
                }
			});
		}
    },
    components: {
        headTop
    },
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

    {
    opacity: 0;
}

.confirmOrderContainer {
    padding-bottom: 0.5rem;
}

.shop_list_container {
    background-color: $bc;
    .swiper-container {
        padding-bottom: 0.15rem;
        .topBG {
            @include wh(100%, 0.83rem);
            @include bis("../../images/gwc-bg.png");
        }
        .address_info {
            background-color: $fc;
            width: 95%;
            margin: -0.48rem auto 0;
            padding: 0.2rem 0.15rem 0.2rem 0.57rem;
            @include fj(space-between);
            border-radius: 10px;
            box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.51);
            .address-detail {
                position: relative;
                width: 2.3rem;
                p {
                    line-height: 1.6;
                    @include sc(0.15rem, $g3);
                    span {
                        display: inline-block;
                        @include sc(0.15rem, $g3);
                    }
                }
                p:nth-of-type(1) {
                    margin-bottom: 0.15rem;
                }
            }
            .address-detail:before {
                content: "";
                position: absolute;
                left: -0.28rem;
                top: 0rem;
                @include bis("../../images/gwc-icon-add.png");
                @include wh(0.16rem, 0.22rem);
            }
            .deletesite {
                display: flex;
                margin-top: 0.1rem;
                span {
                    display: block;
                    @include wh(0.1rem, 0.175rem);
                    @include bis("../../images/path.png");
                }
            }
        }
        .no_address {
            .adddetail {
                margin-top: 0.11rem;
                @include borderRadius(10px);
                background: $fc;
            }
            .ui-padding-block {
                .add-detail {
                    display: block;
                }
                .input-new {
                    @include wh(100%, 0.45rem);
                    padding: 0 0 0 0.12rem;
                    display: flex;
                    @include sc(0.15rem, $g6);
                    border-bottom: 1px solid $bc;
                    span {
                        width: 0.7rem;
                        line-height: 0.45rem;
                        margin-right: 0.14rem;
                    }
                    input {
                        display: flex;
                        width: 2.7rem;
                        font-size: 0.15rem;
                    }
                    .verifies {
                        border-color: #ea3106;
                    }
                    p {
                        @include sc(0.08rem, #ea3106);
                        padding-left: 0.1rem;
                        margin-top: 0.04rem;
                    }
                }
                .input-new:nth-of-type(4) {
                    height: 0.9rem;
                    textarea {
                        padding: 0.15rem 0 0 0;
                        width: 2.7rem;
                        font-size: 0.15rem;
                    }
                }
            }
            .addbutton {
                margin: 0.15rem auto;
                width: 3.5rem;
                button {
                    width: 100%;
                    @include sc(0.15rem, $fc);
                    line-height: 0.45rem;
                    background: $red;
                    font-weight: 700;
                    @include borderRadius(0.23rem);
                }
                .butopacity {
                    transition: all 0.4s;
                    opacity: 1;
                }
            }
        }
    }
    .shop_info {
        margin: 0.15rem auto 0;
        width: 95%;
        background-color: $fc;
        padding: 0.2rem 0.15rem;
        border-radius: 10px;
        overflow: hidden;
        .goods {
            li {
                position: relative;
                margin-bottom: 0.26rem;
            }
            .img {
                display: inline-block;
                border-radius: 5px;
                @include wh(0.95rem, 0.945rem);
                background-color: #000;
                vertical-align: middle;
                margin-left: 0.05rem;
            }
            .goods_info {
                display: inline-block;
                .name {
                    @include sc(0.15rem, $g3);
                    top: -0.1rem;
                    position: relative;
                }
                .price {
                    @include sc(0.18rem, $red);
                    font-weight: bold;
                    position: relative;
                    top: 0.38rem;
                    span {
                        display: inline-block;
                        @include sc(0.12rem, $red);
                        font-weight: normal;
                        transform: scale(0.8) translateY(1px);
                    }
                }
            }
            .cart_btns {
                position: absolute;
                right: 0.2rem;
                bottom: 0.25rem;
                .num {
                    display: inline-block;
                    text-align: center;
                    @include wh(0.245rem, 0.245rem);
                    @include sc(0.18rem, $red);
                    vertical-align: top;
                    font-weight: bold;
                }
            }
        }
        .payment_info {
            overflow: hidden;
            padding: 0.15rem 0;
            border-bottom: 1px solid $gd;
            li {
                @include wh(100%, 0.35rem);
                line-height: 0.35rem;
                p {
                    @include sc(0.15rem, $g6);
                }
                p:nth-child(odd) {
                    float: left;
                }
                p:nth-child(even) {
                    float: right;
                }
                p.coupon {
                    color: $g9;
                }
            }
        }
        .totalPrice {
            margin-top: 0.12rem;
            p {
                display: inline-block;
                @include sc(0.2rem, $g3);
                font-weight: bold;
                span {
                    @include sc(0.13rem, $g3);
                    font-weight: normal;
                }
            }
        }
    }
}

.settlement {
    position: fixed;
    bottom: 0;
    line-height: 0.49rem;
    background-color: $fc;
    border: solid 0.5px #cccccc;
    @include wh(100%, 0.49rem);
    overflow: hidden;
    li {
        float: right;
        text-align: center;
    }
    li:nth-child(2) {
        text-align: left;
        padding-right: 0.12rem;
        @include sc(0.15rem, $g6);
        .red {
            @include sc(0.18rem, $red);
            font-weight: 600;
        }
    }
    li:nth-child(1) {
        width: 30.33%;
        @include sc(0.15rem, $fc);
        background-color: $red;
    }
    .unselected {
        border-radius: 50%;
        display: inline-block;
        border: 1.5px solid $g9;
        @include wh(0.19rem, 0.19rem);
        vertical-align: text-bottom;
    }
    .selectAll {
        @include bis("../../images/selected.png");
        display: inline-block;
        @include wh(0.19rem, 0.19rem);
        vertical-align: text-bottom;
    }
}

.load_more {
    @include wh(100%, 0.36rem);
    @include sc(0.15rem, $g6);
    background-color: #f7f7f7;
    text-align: center;
    line-height: 0.36rem;
}
</style>
