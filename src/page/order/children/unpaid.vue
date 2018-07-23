<template>
	<div class="unpaid">
		<ul class="order_list_ul" v-load-more="loaderMore">
            <li class="order_list_li">
                <section class="order_item_top">
                    <section>
                        <header class="order_item_top_header">
                            <p class="order_time">2018.6.20 12:34</p>
                            <p class="order_status">
                                待支付
                            </p>
                        </header>
                        <router-link to="/order/orderDetail" tag="div">
	                        <section class="goods_img">
	                        	<div class="goods_box">
	                        		<img class="restaurant_image">
			                        <img class="restaurant_image">
			                        <img class="restaurant_image">
	                        	</div>
		                        <p>共3件</p>
		                        <svg fill="#999" class="arrow_right" style="height:.64rem;width:.14rem;">
	                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
	                            </svg>
	                        </section>
                        </router-link>	
                    </section>
                    <div class="order_item_bottom">
                    	<span class="order_text">实际支付<b style="color:#e4372e;">￥<strong style="font-size:.2rem;font-weight:bold;">88.88</strong></b></span>
                    	<div class="order_button_grey">联系客服</div>
                    	<!-- <div class="order_button_red">再次购买</div> -->
                        <compute-time></compute-time>
                    </div>
                </section>
            </li>
        </ul>
        <transition name="loading">
            <loading v-show="showLoading"></loading>
        </transition>
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
            .order_item_top{
                flex: 5;
                .order_item_top_header{
                    border-bottom: 0.005rem solid #f5f5f5;
                    padding-bottom: .06rem;
                    @include fj;
                    height: .4rem;
                    line-height: .4rem;
                    @include sc(.15rem,#666666);
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
                		@include sc(.15rem,#666666);
                	}
                }
                .order_item_bottom{
                    line-height: .32rem;
                    padding: .115rem 0;
                    display: flex;
                    float: right;
                    .order_button_grey{
                    	display: inline-block;
					    height: .32rem;
					    border-radius: .16rem;
					    background: #fff;
					    border: 1px solid #999999;
					    padding: 0 .1rem;
					    font-size: .15rem;
					    color: #666666;
					    margin: 0 0rem 0 .2rem;
                    }
                    .order_button_red{
                    	display: inline-block;
					    height: .32rem;
					    border-radius: .16rem;
					    background: #e4372e;
					    padding: 0 .1rem;
					    font-size: .15rem;
					    color: #fff;
					    margin: 0 0rem 0 .2rem;
                    }
                    .order_text{
						text-align: right;
						@include sc(.15rem,#666666);
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
