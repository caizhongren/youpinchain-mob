<template>
    <div class="unpaid">
        <ul class="order_list_ul">
            <div v-if="orderList.length <= 0" class="no_list">暂无订单记录</div>
            <li v-else class="order_list_li" v-for="item in orderList">
                <section class="order_item_top">
                    <section>
                        <header class="order_item_top_header">
                            <p class="order_time">{{item.addTime | timeformat}}</p>
                            <p class="order_status">
                                {{item.orderStatusText}}
                            </p>
                        </header>
                        <router-link to="/orderDetail" tag="div">
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
                        <span class="order_text">实际支付<b style="color:#e4372e;">￥<strong style="font-size:.2rem;font-weight:bold;">{{item.actualPrice}}</strong></b></span>
                        <div class="order_button_border_grey" @click="showAlertTip = !showAlertTip">联系客服</div>
                        <div class="order_again">
                            <compute-time v-if="item.handleOption.pay" :time="item.expiryTime"></compute-time>
                            <span class="order_button_border_red" @click="cancelOrder(item.id)" v-if="item.handleOption.refund">取消订单</span>
                            <router-link :to="{path:'/orderTrack',query:{expNo:item.expNo}}" tag="span" class="order_button_border_red"
                                         v-if="item.handleOption.confirm" >查看物流</router-link>
                            <span class="order_button_border_red" @click="confirmOrder(item.id)" v-if="item.handleOption.confirm">确认收货</span>
                            <router-link tag="span" to="/home" class="order_button_red" v-if="item.handleOption.rebuy" >再次购买</router-link>
                        </div>
                    </div>
                </section>
            </li>
        </ul>
        <alert-tip :showAlertTip="showAlertTip" :type="2" :alertText='`<p>确定拨打客服电话 <br> 400-990-7626</p>`' v-show="showAlertTip"></alert-tip>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import computeTime from 'src/components/common/computeTime'
    import loading from 'src/components/common/loading'
    import {loadMore} from 'src/components/common/mixin'
    import alertTip from 'src/components/common/alertTip'
    import {getOrderList,cancelOrder,confirmOrder} from "../../../service/getData";

    export default {
      data(){
            return{
                showAlertTip: false,
                status_title:['待支付', '待发货', '已发货', '已完成', '已取消'],
                showLoading: true, //显示加载动画
                orderList: []
            }
        },
        props:['sendData'],
        mounted(){
            getOrderList(this.page, this.pageSize, 2).then(res => {
                if (res.errno !== 0){
                    return;
                }
                this.orderList = res.data.orderVoList;
                this.showLoading = false;
            })            
        },
        created () {
        },
        mixins: [loadMore],
        components: {
            loading,
            computeTime,
            alertTip
        },
        computed: {
        },
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
        },
        watch: {
        }
    }
</script>
  

<style lang="scss" scoped>
    @import 'src/style/mixin';
    
    .order_list_ul{
        padding-bottom: .5rem;
        .no_list {
            padding: 2.615rem 0;
            text-align: center;
            background-color: $f5;
            @include sc(.15rem, $g6);
        }
        .order_list_li{
            background-color: $fc;
            display: flex;
            margin-bottom: 0.1rem;
            padding: 0 .04rem 0 .1rem;
            border-radius: .06rem;
            .restaurant_image{
                @include wh(.64rem, .64rem);
                margin-right: 0.1rem;
                border-radius: .06rem;
                background: #000;
            }
            .order_item_top{
                flex: 5;
                .order_item_top_header{
                    border-bottom: 0.005rem solid $f5;
                    padding-bottom: .06rem;
                    @include fj;
                    height: .4rem;
                    line-height: .4rem;
                    @include sc(.15rem,$g6);
                    .order_status{
                        margin-right:.1rem;
                    }
                }
                .goods_img{
                    display: flex;
                    padding: .1rem 0;
                    border-bottom: 0.005rem solid $f5;
                    .goods_box{
                        width: 3rem;
                    }
                    p{
                        line-height: .64rem;
                        @include sc(.15rem,$g6);
                    }
                }
                .order_item_bottom{
                    line-height: .32rem;
                    padding: .115rem 0;
                    display: flex;
                    float: right;
                    .order_button_border_grey{
                        display: inline-block;
                        height: .32rem;
                        border-radius: .16rem;
                        background: $fc;
                        border: 1px solid $g9;
                        padding: 0 .1rem;
                        font-size: .15rem;
                        color: $g6;
                        margin: 0 0rem 0 .1rem;
                    }
                    .order_button_border_red{
                        display: inline-block;
                        height: .32rem;
                        border-radius: .16rem;
                        background: $fc;
                        border: 1px solid $red;
                        padding: 0 .1rem;
                        font-size: .15rem;
                        color: $red;
                        margin: 0 0rem 0 .1rem;
                    }
                    .order_button_red{
                        display: inline-block;
                        height: .32rem;
                        border-radius: .16rem;
                        background: $red;
                        padding: 0 .1rem;
                        font-size: .15rem;
                        color: $fc;
                        margin: 0 0rem 0 .1rem;
                    }
                    .order_text{
                        text-align: right;
                        @include sc(.15rem,$g6);
                    }
                }
            }
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(.4rem, 0, 0);
        opacity: 0;
    }
</style>
