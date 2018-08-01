<template>
<div class="confirmOrderContainer">
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
                                    <input type="text" placeholder="请填写你的姓名" :class="{verifies:verify}" v-model="message" @input="inputThing">
                                </div>
                                <div class="add-detail">
                                    <div class="input-new">
                                        <span>联系电话</span>
                                        <input type="text" placeholder="请填写收货人手机号" v-model="addAddress" />
                                    </div>
                                </div>
                                <div class="input-new">
                                    <span>所在地区</span>
                                    <input type="text" id="address-input" readonly="readonly" style="width:2.5rem;" placeholder="请选择" :class="{verifies:verifythree}" @input="inputThingthree" v-model="mesthree" />
                                    <svg fill="#bbb" style="width: 0.18rem;margin-left: .1rem;">		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>		</svg>
                                </div>
                                <div class="input-new">
                                    <span>地址</span>
                                    <textarea placeholder="请填写详细地址" id="adinfo" value="" rows="2"></textarea>
                                </div>
                            </section>
                            <div id="container"></div>
                        </form>
                    </section>
                    <section class="addbutton">
                        <button :class="{butopacity:butpart}" @click.prevent="submitThing">保存</button>
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

    </nav>
    <ul class="settlement">
        <li @click="submitOrder()">去付款</li>
        <li>付款 <span class="red">¥{{totalPrice}}</span></li>
    </ul>
</div>
</template>

<script>
import AjaxPicker from "ajax-picker";
import {
    mapState,
    mapMutations
} from "vuex";
import {
    submitOrder,
    getDefaultAddress
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
            no_address: true,
            message: "", // 信息
            verify: false, // 姓名
            mesthree: "", // 送餐地址
            verifythree: false, // 地址
            butpart: false, //  新增地址按钮的透明度
            addAddress: "",
            choosedAddress: undefined,
        };
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
    mounted() {
        this.choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
        if (!this.choosedAddress) {
            // 默认用户地址
            getDefaultAddress().then(res => {
                let address = res.data;
                let index = -1;
                this.choosedAddress = address;
                localStorage.setItem('choosedAddress', JSON.stringify(address));
            });
        }
        if (!this.choosedAddress) {
            var that = this;
            var picker = new AjaxPicker({
                title: "配送至",
                tipText: ["省份", "城市", "区/县"],
                input: "address-input",
                container: "container",
                renderArr: [
                    function () {
                        picker.render(that.addressList[0]);
                    },
                    function () {
                        console.log("用户在列表1选择了 " + picker.result1);
                        picker.render(that.addressList[1]);
                    },
                    function () {
                        console.log("用户在列表2选择了 " + picker.result2);
                        picker.render(that.addressList[2]);
                    }
                ],
                success: function (arr) {
                    console.log(arr);
                    var address = "";
                    for (var i = 0; i < arr.length; i++) {
                        address += " " + arr[i].value;
                    }
                    document.getElementById("address-input").value = address.substring(1);
                }
            });
        }

    },
    components: {},
    computed: {},
    methods: {
        // ...mapMutations(["CHOOSE_ADDRESS"]),

        loadAllProducts() {

        },
        paymentCall() {
            let cartIds = [];
            this.productList.forEach(cart => {
                cartIds.push(cart.cartId);
            });
            let addressId = this.choosedAddress.id;
            console.info(cartIds + "和" + addressId)
            submitOrder(cartIds, addressId).then(res => {
                if(res.errno !== 0) {
                    alert(res.message);
                    return;
                }
                let orderId = res.data.orderId;
                prepayOrder(orderId).then(resp => {
                    console.info(resp)
                    alert(resp.errno)
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
                                    alert("付款成功")
                                }
                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }
                })
            })
        },

        //确认订单
        async confrimOrder() {
            //用户未登录时弹出提示框
            if (!(this.userInfo && this.userInfo.user_id)) {
                this.showAlert = true;
                this.alertText = "请登录";
                return;
                //未选择地址则提示
            } else if (!this.choosedAddress) {
                this.showAlert = true;
                this.alertText = "请添加一个收获地址";
                return;
            }
            //保存订单
            this.SAVE_ORDER_PARAM({
                user_id: this.userInfo.user_id,
                cart_id: this.checkoutData.cart.id,
                address_id: this.choosedAddress.id,
                description: this.remarklist,
                entities: this.checkoutData.cart.groups,
                geohash: this.geohash,
                sig: this.checkoutData.sig
            });
            //发送订单信息
            let orderRes = await placeOrders(
                this.userInfo.user_id,
                this.checkoutData.cart.id,
                this.choosedAddress.id,
                this.remarklist,
                this.checkoutData.cart.groups,
                this.geohash,
                this.checkoutData.sig
            );
            //第一次下单的手机号需要进行验证，否则直接下单成功
            if (orderRes.need_validation) {
                this.NEED_VALIDATION(orderRes);
                this.$router.push("/confirmOrder/userValidation");
            } else {
                this.ORDER_SUCCESS(orderRes);
                this.$router.push("/confirmOrder/payment");
            }
        },
        inputThing() {
            !this.message ? (this.verify = true) : (this.verify = false);
            this.bindThing();
        },
        //输入地址
        inputThingthree() {
            this.verifythree = true;
            if (this.mesthree.length == 0) {
                this.sendaddress = "请详细填写送餐地址";
            } else if (this.mesthree.length > 0 && this.mesthree.length <= 2) {
                this.sendaddress = "送餐地址太短了，不能辨识";
            } else {
                this.sendaddress = "";
                this.verifythree = false;
            }
            this.bindThing();
        },
        //输入手机号
        inputThingfour() {
            this.verifyfour = true;
            if (/^[1][358][0-9]{9}$/.test(this.telenum)) {
                this.verifyfour = false;
            } else if (this.telenum == "") {
                this.telephone = "手机号不能为空";
            } else {
                this.telephone = "请输入正确的手机号";
            }
            this.bindThing();
        },
        //输入备注手机号
        inputThingfive() {
            this.verifyfive = true;
            if (
                /^[1][358][0-9]{9}$/.test(this.standbytelenum) ||
                this.standbytelenum == ""
            ) {
                this.verifyfive = false;
            } else {
                this.standbytele = "请输入正确的手机号";
            }
            this.bindThing();
        },
        bindThing() {
            if (this.message && this.mesthree && !this.verifyfour) {
                this.butpart = true;
            } else {
                this.butpart = false;
            }
        },
        //保存地址
        async submitThing() {
            // let res = await postAddAddress(this.userInfo.user_id, this.mesthree, this.addAddress, this.geohash, this.message, this.telenum, this.standbytelenum, 0, 1, '公司', 4);
            // if (res.message) {
            // 		this.showAlert = true;
            // 		this.alertText = res.message;
            // }else if(this.butpart){
            // 	//保存的地址存入vuex
            // 	this.ADD_ADDRESS({
            // 		name: this.message,
            // 		address: this.mesthree,
            // 		address_detail: this.addAddress,
            // 		geohash: 'wtw37r7cxep4',
            // 		phone: this.telenum,
            // 		phone_bk: this.standbytelenum,
            // 		poi: this.addAddress,
            // 		poi_type: 0,
            // 	});
            // 	this.$router.go(-1);
            // }
        }
    },
    watch: {}
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
