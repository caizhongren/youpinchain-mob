<template>
	<div>
		<ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li">
                <section class="order_item_right">
                    <section>
                        <header class="order_item_right_header">
                            <section class="order_header">
                                <!-- <h4 >
                                    <span class="ellipsis">{item.restaurant_name}} </span>
                                    <svg fill="#333" class="arrow_right">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                    </svg>
                                </h4> -->
                                <p class="order_time">2018.6.20 12:34</p>
                            </section>
                            <p class="order_status">
                                待支付
                            </p>
                        </header>
                        <section class="goods_img">
                        	<div class="goods_box">
                        		<img class="restaurant_image">
		                        <img class="restaurant_image">
		                        <img class="restaurant_image">
                        	</div>
	                        <p>共3件</p>
	                        <svg fill="#333" class="arrow_right" style="height:.64rem;width:.1rem;">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </section>
                        
                        <!-- <section class="order_basket">
                            <p class="order_name ellipsis">item.basket.group[0].</p>
                            <p class="order_amount">¥{ite}}</p>
                        </section> -->
                    </section>
                    <div class="order_again">
                    	<span class="order_text">实际支付￥<b>88.88</b></span>
                    	<div class="order_button"><span>联系客服</span></div>
                        <compute-time></compute-time>
                        <!-- <router-link :to="{path: '/shop', query: {geohash, id: item.restaurant_id}}" tag="span" class="buy_again" v-else>再来一单</router-link> -->
                    </div>
                </section>
            </li>
        </ul>
	</div>
</template>


<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import computeTime from 'src/components/common/computeTime'
    import loading from 'src/components/common/loading'
    import {getImgPath} from 'src/components/common/mixin'
    import footGuide from 'src/components/footer/footGuide'
    import {getOrderList} from 'src/service/getData'
    import {loadMore} from 'src/components/common/mixin'
    import {imgBaseUrl} from 'src/config/env'


    export default {
      data(){
            return{
                orderList: null, //订单列表
                offset: 0, 
                preventRepeat: false,  //防止重复获取
                showLoading: true, //显示加载动画
                imgBaseUrl
            }
        },
        props:['sendData'],
        mounted(){
            this.initData();
            this.$emit(['findOrder',{'activeTab':2}])
        },
        mixins: [loadMore],
        components: {
            headTop,
            footGuide,
            loading,
            computeTime,
        },
        computed: {
            ...mapState([
                'userInfo', 'geohash'
            ]),
        },
        methods: {
             ...mapMutations([
               'SAVE_ORDER'
            ]),
            //初始化获取信息
            async initData(){
                if (this.userInfo && this.userInfo.user_id) {
                    let res = await getOrderList(this.userInfo.user_id, this.offset);
                    this.orderList = [...res];
                    this.hideLoading();
                }else{
                    this.hideLoading();
                }
            },
            //加载更多
            async loaderMore(){
                if (this.preventRepeat) {
                    return
                }
                this.preventRepeat = true;
                this.showLoading = true;
                this.offset += 10;
                //获取信息
                let res = await getOrderList(this.userInfo.user_id, this.offset);
                this.orderList = [...this.orderList, ...res];
                this.hideLoading();
                if (res.length < 10) {
                    return
                }
                this.preventRepeat = false;
            },
            //显示详情页
            showDetail(item){
                this.SAVE_ORDER(item);
                this.preventRepeat = false;
                this.$router.push('/order/orderDetail');
            },
            //生产环境与发布环境隐藏loading方式不同
            hideLoading(){
                this.showLoading = false;
            },
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id && !this.orderList) {
                    this.initData();
                }
            }
        }
    }
</script>
  

<style lang="scss" scoped>
    @import 'src/style/mixin';
    
    .order_page{
        background-color: #f1f1f1;
        margin-bottom: .39rem;
        p, span, h4{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .nav_tab{
        @include wh(100%,.45rem);
        background: #fff;
        line-height: .45rem;
        display: flex;
        li{
        	@include sc(.15rem,#666666);
            flex: 1;
            text-align: center;
        }
        .active{
            color: #e4372e;
            border-bottom: .02rem solid #e4372e; 
        }
    }
    .order_list_ul{
        .order_list_li{
            background-color: #fff;
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
            .order_item_right{
                flex: 5;
                .order_item_right_header{
                    border-bottom: 0.005rem solid #f5f5f5;
                    padding-bottom: .06rem;
                    @include fj;
                    height: .4rem;
                    line-height: .4rem;
                    @include sc(.15rem,#666666);
                    .order_header{
                        h4{
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            line-height: .2rem;
                            width: 1.8rem;
                            .arrow_right{
                                @include wh(.08rem, .08rem);
                                fill: #ccc;
                                margin-right: .04rem;
                            }
                        }
                        .order_time{
                            
                        }
                    }
                    .order_status{
                        margin-right:.1rem;
                    }
                }
                .goods_img{
                	display: flex;
                	padding: .1rem 0;
                	border-bottom: 0.005rem solid #f5f5f5;
                	.goods_box{
                		width: 3rem;
                	}
                	p{
                		line-height: .64rem;
                	}
                }
                .order_basket{
                    @include fj;
                    line-height: .4rem;
                    border-bottom: 0.005rem solid #f5f5f5;
                    .order_name{
                        @include sc(.12rem, #666);
                        width: 2rem;
                    }
                    .order_amount{
                        @include sc(.12rem, #f60);
                        font-weight: bold;
                    }
                }
                .order_again{
                    line-height: .32rem;
                    padding: .115rem 0;
                    display: flex;
                    .buy_again{
                        @include sc(.11rem, #3190e8);
                        border: 0.005rem solid #3190e8;
                        padding: .02rem .04rem;
                        border-radius: .03rem;
                    }
                    .order_button{
                    	display: inline-block;
					    height: .32rem;
					    border-radius: .16rem;
					    background: #fff;
					    border: 1px solid #999999;
					    padding: 0 .1rem;
					    font-size: .15rem;
					    color: #666666 !important;
					    margin: 0 .1rem 0 .2rem;
                    }
                    .order_text{
						width: 1.6rem;
						text-align: right;
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
