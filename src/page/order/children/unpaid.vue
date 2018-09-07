<template>
<div class="unpaid">
    <ul class="order_list_ul">
        <div v-if="orderList.length <= 0" class="no_list">暂无订单记录</div>
        <li v-else class="order_list_li" v-for="item in orderList" :key="item.id">
            <section class="order_item_top">
                <section>
                    <header class="order_item_top_header">
                        <p class="order_time">{{item.addTime | timeformat}}</p>
                        <p class="order_status">
                            {{item.orderStatusText}}
                        </p>
                    </header>
                    <router-link :to="{path:'/orderDetail/' + item.id}" tag="div">
                        <section class="goods_img">
                            <div class="goods_box">
                                <img class="restaurant_image" v-for="(goods,index) in item.productList" :src="goods.picUrl" v-if="index < 4" :key="index">
                                <!-- <p class="" v-if="item.productList.length == 1">{{item.productList[0].productName}}</p> -->
                            </div>
                            <p>共{{item.productList.length}}件</p>
                            <svg fill="#bbb" style="width: 0.15rem;margin-left: 0rem;height: .64rem;"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
                        </section>
                    </router-link>
                </section>
                <div class="order_item_bottom">
                    <span class="order_text">实际支付<b class="red"><span class="RMB">￥</span><strong style="font-size:.2rem;font-weight:bold;">{{item.actualPrice}}</strong></b></span>
                    <div class="order_button_border_grey" @click="showAlertTip = !showAlertTip">联系客服</div>
                    <div class="order_again">
                        <compute-time v-if="item.handleOption.pay" :time="item.expiryTime" @click.native="toPay(item.id)"></compute-time>
                        <!--<span class="order_button_border_red" @click="cancelOrder(item.id)" v-if="item.handleOption.cancel">取消订单</span>-->
                        <router-link :to="{path:'/orderTrack',query:{expNo:item.expNo}}" tag="span" class="order_button_border_red"
                                     v-if="item.handleOption.confirm" >查看物流</router-link>
                        <span class="order_button_border_red" @click="confirmOrder(item.id)" v-if="item.handleOption.confirm">确认收货</span>
                        <router-link tag="span" to="/home" class="order_button_red" v-if="item.handleOption.rebuy" >再次购买</router-link>
                    </div>
                </div>
            </section>
        </li>
    </ul>
    <alert-tip :showAlertTip="showAlertTip" :type="2" v-show="showAlertTip" :alertText="`<p>确定拨打客服电话 <br> 400-990-7626</p>`"></alert-tip>
    <transition name="loading">
        <loading v-show="showLoading"></loading>
    </transition>
</div>
</template>

<script>
import computeTime from 'src/components/common/computeTime'
import loading from 'src/components/common/loading'
import {
    loadMore
} from 'src/components/common/mixin'
import alertTip from 'src/components/common/alertTip'
import {
    getOrderList,
    cancelOrder,
    confirmOrder,
    prepayOrder
} from "../../../service/getData";

export default {
    data() {
        return {
            showAlertTip: false,
            status_title: ['待支付', '待发货', '已发货', '已完成', '已取消'],
            showLoading: true, //显示加载动画
            orderList: []
        }
    },
    props: ['sendData'],
    mounted() {
        getOrderList(this.page, this.pageSize, 1).then(res => {
            if (res.errno !== 0) {
                return;
            }
            this.orderList = res.data.orderVoList;
            this.showLoading = false;
        })
    },
    created() {},
    mixins: [loadMore],
    components: {
        loading,
        computeTime,
        alertTip
    },
    computed: {},
    methods: {
        // 取消订单
        cancelOrder(orderId){
            cancelOrder(orderId).then(res =>{
                if(res.errno !== 0) {
                    alert("失败");
                    return;
                }
                alert("成功");
            })
        },
        // 确认收货
        confirmOrder(orderId){
            confirmOrder(orderId).then(res =>{
                if(res.errno !== 0) {
                    alert("失败");
                    return;
                }
                alert("成功");
            })
        },
        toPay(orderId) {
            var that = this;
            prepayOrder(orderId).then(resp => {
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
        }
    },
    watch: {}
}
</script>

  

<style lang="scss" scoped>
    @import '../../../style/order';
</style>
