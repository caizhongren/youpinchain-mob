 <template>
  <div class="order_detail_page">
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
                <div class="page-top-red"></div>
                <section class="order_titel border_radius">
                    <div class="status-img" :class="'status_' + orderData.order_status"></div>
                    <div>
                        <p>{{status_text[orderData.order_status].title}}</p>
                        <p>{{status_text[orderData.order_status].text}}</p>
                    </div>
                    <router-link to="/order/orderTrack" tag="svg" fill="#333" class="arrow_right" v-show="orderData.order_status === 1 || orderData.order_status === 2 || orderData.order_status === 3">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </router-link>
                </section>
                <section class="distribution-information border_radius" v-if="orderData.order_status === 2 || orderData.order_status === 3">
                    <img src="../../../images/ddxq-ps.png" alt="">
                    <div>
                        <p>配送员：{{orderData.distribute.name}}</p>
                        <p>联系电话：{{orderData.distribute.mobile}}</p>
                    </div>
                </section>
                <section class="address border_radius">
                    <div class="address-detail">
                        <p>{{orderData.adress.position}}</p>
                        <p><span>{{orderData.adress.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{orderData.adress.mobile}}</span></p>
                    </div>
                </section>
                <section class="food_list border_radius">
                    <div class="food_list_header">
                        <div class="shop_name">
                            <span>商品清单</span>
                        </div>
                        <span class="food_number">共{{orderData.shopList.length}}件</span>
                    </div>
                    <ul class="goods">
                        <li v-for="item in orderData.shopList" :key="item.id">
                            <img src="" alt="" class="img">
                            <div class="goods_info">
                                <p class="name">{{item.name}}</p>
                                <p class="price"><span>¥</span>{{item.price}}</p>
                            </div>
                            <div class="cart_btns">
                                <span class="num">x{{item.num}}</span>
                            </div>
                        </li>
                    </ul>
                </section>
                <section class="order_detail_style border_radius">
                    <header>订单价格</header>
                    <section class="item_style">
                        <p class="item_left">商品总价</p>
                        <div class="item_right">
                            <p>￥{{orderData.deliver_time}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">优惠价格</p>
                        <div class="item_right">
                            <p>-￥{{orderData.consignee}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">运费</p>
                        <div class="item_right">
                            <p>+￥{{orderData.freight}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">包装费</p>
                        <div class="item_right">
                            <p>+￥{{orderData.packing_fee}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">包装费减免</p>
                        <div class="item_right">
                            <p>-￥{{orderData.package_fee_reduction}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">实际支付</p>
                        <div class="item_right">
                            <p>￥{{orderData.actual_payment}}</p>
                        </div>
                    </section>
                </section>
                <section class="order_detail_style border_radius">
                    <header>订单信息</header>
                    <section class="item_style">
                        <p class="item_left">订单编号</p>
                        <div class="item_right">
                            <p>{{orderData.orderDetail.id}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">支付方式</p>
                        <div class="item_right">
                            <p>在线支付</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">下单时间</p>
                        <div class="item_right">
                            <p>{{orderData.orderDetail.formatted_created_at}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">预计送达时间</p>
                        <div class="item_right">
                            <p>{{orderData.orderDetail.expected_delivery_time}}</p>
                        </div>
                    </section>
                </section>
                <section class="sale_after">
                    <span class="red" @click="showAlertTip = !showAlertTip">联系客服</span>
                    <span class="grey">取消订单</span>
                </section>
            </section>
        </section>
        <alert-tip :showAlertTip="showAlertTip" :type="2" v-show="showAlertTip"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import footGuide from 'src/components/footer/footGuide'
    import alertTip from 'src/components/common/alertTip'

    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                showAlertTip: false,
                status_text:[{
                    title: '未发货',
                    text: '您的订单还未发货～'
                },{
                    title: '已发货',
                    text: '您的订单已经发货啦～'
                },{
                    title: '配送中',
                    text: '您的订单正在配送中～'
                },{
                    title: '已完成',
                    text: '您的订单已完成～'
                },{
                    title: '待支付',
                    text: '您的订单待支付～'
                }],
                orderData:{
                    order_status: 3,// 未发货 0 已发货 1  配送中 2 已完成 3 待支付 4
                    deliver_time: '88.88',
                    consignee: '28.88',
                    freight: '8.88',
                    packing_fee: '8.88',
                    package_fee_reduction: '8.88',
                    actual_payment: '88.88',
                    shopList: [
                      { 
                        id: 0,
                        name: '猪耳朵500g*1份',
                        price: 23.99,
                        num: 1,
                        choose: false
                      },
                      { 
                        id: 1,
                        name: '猪耳朵500g*2份',
                        price: 23.99,
                        num: 2,
                        choose: true
                      }
                    ],
                    orderDetail:{
                        id: 4567852,
                        formatted_created_at: '1028.06.10 12:29',
                        expected_delivery_time: '2018.6.13'
                    },
                    distribute: {
                        name: '张三',
                        mobile: '15210288888'
                    },
                    adress: {
                        position: '北京市海淀区中国科学院国家空间科学中心九章大厦B座',
                        name: '张三',
                        mobile: '15210288888'
                    }
                }
            }
        },
        created () {
            this.showLoading = false
        },
        mounted(){
        },
        components: {
            loading, footGuide, alertTip
        },
        computed: {
        },
        methods: {
        },
        watch: {
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .order_detail_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .scroll_insert{
        padding-bottom: 1.2rem;
    }
    .page-top-red{
        width: 100%;
        height: .83rem;
        background-image: linear-gradient(to bottom, #fc5b46 44%, #fa424f);
    }
    .border_radius{
        box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.51);
        border-radius: .1rem;
        @include wh(3.5rem, auto);
        background-color: #fff;
        margin: 0 auto;
        margin-bottom: .16rem;
    }
    .order_titel{
        margin-top: -.48rem;
        padding: .14rem .3rem;
        display: flex;
        @include fj;
        .status_0{
            @include bis('../../../images/status1.png')
        }
        .status_1{
            @include bis('../../../images/status2.png')
        }
        .status_2{
            @include bis('../../../images/status3.png')
        }
        .status_3{
            @include bis('../../../images/status4.png')
        }
        .status_4{
            @include bis('../../../images/status5.png')
        }
        .status-img{
            border-radius: 50%;
            @include wh(1rem, 1rem);
        }
        svg{
            @include wh(.18rem,1rem);
        }
        .no-width {
            width: 0;
            height: 0;
        }
        div{
            p:nth-of-type(1){
                @include sc(.15rem, #333);
                font-weight: bold;
                margin-top: .28rem;
            }
            p:nth-of-type(2){
                @include sc(.13rem, #666666);
                margin-top: .12rem;
                max-width: 1.8rem;
            }
        }
        .order_again{
            @include sc(.12rem, $blue);
            margin-top: .1rem;
            border: 0.005rem solid $blue;
            padding: .03rem .08rem;
            border-radius: .02rem;
        }
    }
    .address{
        margin: .16rem .12rem;
        padding: .21rem .17rem .2rem .57rem;
        @include fj(space-between);
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0px 1px 13.9px 0.6px rgba(110, 194, 46, 0.24);
        position: relative;
        .address-detail{
            position: relative;
            width: 2.3rem;
            p{
                line-height: 1.6;
                @include sc(.15rem,#333333);
                span{
                    display:inline-block;
                    @include sc(.15rem,#333333);
                }
            }
            p:nth-of-type(1){
                margin-bottom: .24rem;
            }
        }
        .address-detail:before{
            content: '';
            position: absolute;
            left: -.28rem;
            top: 0rem;
            @include bis('../../../images/gwc-icon-add.png');
            @include wh(.16rem,.22rem);
        }
    }
    .distribution-information{
        display:flex;
        padding: .15rem;
        align-items: center;
        img{
            @include wh(.3rem,.25rem);
            margin-right: .2rem;
        }
        div{
            p{
                @include sc(.15rem,#666666);
                line-height: .28rem;
            }
        }
    }
    .food_list{
        background-color: #fff;
        .food_list_header{
            @include fj;
            align-items: center;
            padding: .1rem;
            border-bottom: 1px solid #f5f5f5;
            .shop_name{
                img{
                    @include wh(.24rem, .24rem);
                    vertical-align: middle;
                    margin-right: .04rem;
                }
                span{
                    @include sc(.15rem, #333);
                }
            }
            .food_number{
                color:#999999;
            }
        }
        .goods {
            padding: .3rem .15rem .1rem;
            li {
                position: relative;
                margin-bottom: .26rem;
            }
            .img {
                display: inline-block;
                border-radius: 5px;
                @include wh (.95rem, .945rem);
                background-color: #000;
                vertical-align: middle;
                margin-left: .05rem;
            }
            .goods_info {
                display: inline-block;
                .name {
                    @include sc(.15rem, $g3);
                    top: -.1rem;
                    position: relative;
                }
                .price {
                    @include sc(.18rem, $red);
                    font-weight: bold;
                    position: relative;
                top: .38rem;
                    span { 
                        display: inline-block;
                        @include sc(.12rem, $red);
                        font-weight: normal; 
                        transform: scale(.8) translateY(1px);
                    }
                }
            }
            .cart_btns {
                position: absolute;
                right: .2rem;
                bottom: .25rem;
                .num {
                    display: inline-block;
                    text-align: center;
                    @include wh(.245rem, .245rem);
                    @include sc(.18rem, $red);
                    vertical-align: top;
                    font-weight: bold;
                }
            }
        }
        .pay_ment{
            @include sc(.12rem, #fb6b23);
            border-top: 1px solid #f5f5f5;
            font-weight: bold;
            line-height: .4rem;
            text-align: right;
            padding-right: .1rem;
        }
    }
    .order_detail_style{
        background-color: #fff;
        margin-top: 0.1rem;
        header{
            @include sc(.15rem, #333);
            padding: .1rem;
            border-bottom: 1px solid #f5f5f5;
        }
        .item_style{
            display: flex;
            padding: .1rem;
            @include fj;
            p{
                @include sc(.15rem, #666);
                line-height: .2rem;
            }
        }
    }
    .sale_after{
        display: flex;
        text-align: right;
        float: right;
        padding: 0 .18rem;
        margin: 0 auto;
        span{
            height: .33rem;
            border-radius: .16rem;
            line-height: .33rem;
            padding: 0 .14rem;
            margin-left: .1rem;
        }
        .red{
            border: solid 1px #e4372e;
            color: #e4372e;
        }
        .grey{
            border: solid 1px #999999;
            color: #666666;
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0;
    }
    
</style>
