 <template>
  <div class="order_detail_page">
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
                <section class="order_titel">
                    <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
                    <p>{{orderDetail.status_bar.title}}</p>
                    <p>{{orderDetail.timeline_node.description}}</p>
                </section>
                <section class="food_list">
                    <router-link class="food_list_header" :to="{path: '/shop', query: {geohash, id: orderDetail.restaurant_id}}">
                        <div class="shop_name">
                            <img :src="imgBaseUrl + orderDetail.restaurant_image_url">
                            <span>{{orderDetail.restaurant_name}}</span>
                        </div>
                        <svg fill="#333" class="arrow_right">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </router-link>
                    <ul class="food_list_ul">
                        <li v-for="item in orderDetail.basket.group[0]">
                            <p class="food_name ellipsis">{{item.name}}</p>
                            <div class="quantity_price">
                                <span>X{{item.quantity}}</span>
                                <span>¥{{item.price}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="deliver_fee">
                        <span>配送费</span>
                        <span>{{orderDetail.basket.deliver_fee&&orderDetail.basket.deliver_fee.price || 0}}</span>   
                    </div>
                    <div class="pay_ment">实付{{orderDetail.total_amount.toFixed(2)}}</div>
                </section>
                <section class="order_detail_style">
                    <header>配送信息</header>
                    <section class="item_style">
                        <p class="item_left">送达时间：</p>
                        <div class="item_right">
                            <p>{{orderData.deliver_time}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">送货地址：</p>
                        <div class="item_right">
                            <p>{{orderData.consignee}}</p>
                            <p>{{orderData.phone}}</p>
                            <p>{{orderData.address}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">配送方式：</p>
                        <div class="item_right">
                            <p>蜂鸟专送</p>
                        </div>
                    </section>
                </section>
                <section class="order_detail_style">
                    <header>订单信息</header>
                    <section class="item_style">
                        <p class="item_left">订单号：</p>
                        <div class="item_right">
                            <p>{{orderDetail.id}}</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">支付方式：</p>
                        <div class="item_right">
                            <p>在线支付</p>
                        </div>
                    </section>
                    <section class="item_style">
                        <p class="item_left">下单时间：</p>
                        <div class="item_right">
                            <p>{{orderDetail.formatted_created_at}}</p>
                        </div>
                    </section>
                </section>
            </section>
        </section>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {getOrderDetail} from 'src/service/getData'
    import loading from 'src/components/common/loading'
    import BScroll from 'better-scroll'
    import {imgBaseUrl} from 'src/config/env'


    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                orderData: {"$__":{"strictMode":true,"selected":{"_id":0},"getters":{},"wasPopulated":false,"activePaths":{"paths":{"__v":"init","basket.abandoned_extra":"init","basket.deliver_fee.category_id":"init","basket.deliver_fee.name":"init","basket.deliver_fee.price":"init","basket.deliver_fee.quantity":"init","basket.extra":"init","basket.group":"init","basket.packing_fee.category_id":"init","basket.packing_fee.name":"init","basket.packing_fee.quantity":"init","basket.packing_fee.price":"init","basket.pindan_map":"init","is_brand":"init","is_deletable":"init","is_new_pay":"init","is_pindan":"init","operation_confirm":"init","operation_pay":"init","operation_rate":"init","operation_rebuy":"init","operation_upload_photo":"init","pay_remain_seconds":"init","rated_point":"init","remind_reply_count":"init","restaurant_type":"init","status_bar.title":"init","status_bar.sub_title":"init","status_bar.image_type":"init","status_bar.color":"init","status_code":"init","timeline_node.actions":"init","timeline_node.in_processing":"init","top_show":"init","address_id":"init","user_id":"init","id":"init","unique_id":"init","total_quantity":"init","total_amount":"init","time_pass":"init","order_time":"init","formatted_created_at":"init","restaurant_name":"init","restaurant_image_url":"init","restaurant_id":"init"},"states":{"ignore":{},"default":{},"init":{"__v":true,"basket.abandoned_extra":true,"basket.deliver_fee.category_id":true,"basket.deliver_fee.name":true,"basket.deliver_fee.price":true,"basket.deliver_fee.quantity":true,"basket.extra":true,"basket.group":true,"basket.packing_fee.category_id":true,"basket.packing_fee.name":true,"basket.packing_fee.quantity":true,"basket.packing_fee.price":true,"basket.pindan_map":true,"is_brand":true,"is_deletable":true,"is_new_pay":true,"is_pindan":true,"operation_confirm":true,"operation_pay":true,"operation_rate":true,"operation_rebuy":true,"operation_upload_photo":true,"pay_remain_seconds":true,"rated_point":true,"remind_reply_count":true,"restaurant_type":true,"status_bar.title":true,"status_bar.sub_title":true,"status_bar.image_type":true,"status_bar.color":true,"status_code":true,"timeline_node.actions":true,"timeline_node.in_processing":true,"top_show":true,"address_id":true,"user_id":true,"id":true,"unique_id":true,"total_quantity":true,"total_amount":true,"time_pass":true,"order_time":true,"formatted_created_at":true,"restaurant_name":true,"restaurant_image_url":true,"restaurant_id":true},"modify":{},"require":{}},"stateNames":["require","modify","init","default","ignore"]},"pathsToScopes":{},"emitter":{"domain":null,"_events":{"save":[null,null],"isNew":[null,null]},"_eventsCount":2,"_maxListeners":0},"$options":true},"isNew":false,"_doc":{"__v":0,"basket":{"abandoned_extra":[],"deliver_fee":{"category_id":2,"name":"配送费","price":4,"quantity":1},"extra":[],"group":[[{"name":"1-ok","price":21,"quantity":1,"_id":"5b4edfc274c2a223149ff73d","specs":["ok"],"new_specs":[],"attrs":[]},{"name":"1-dse","price":20,"quantity":1,"_id":"5b4edfc274c2a223149ff73c","specs":["dse"],"new_specs":[],"attrs":[]},{"name":"食品名称","price":20,"quantity":1,"_id":"5b4edfc274c2a223149ff73b","specs":[""],"new_specs":[],"attrs":[]}]],"packing_fee":{"category_id":1,"name":"餐盒","quantity":1,"price":3367},"pindan_map":[]},"is_brand":0,"is_deletable":1,"is_new_pay":1,"is_pindan":0,"operation_confirm":0,"operation_pay":0,"operation_rate":0,"operation_rebuy":2,"operation_upload_photo":0,"pay_remain_seconds":0,"rated_point":0,"remind_reply_count":0,"restaurant_type":0,"status_bar":{"title":"支付超时","sub_title":"15分钟内支付","image_type":"","color":"f60"},"status_code":0,"timeline_node":{"actions":[],"in_processing":0},"top_show":0,"address_id":3660,"user_id":12672,"id":4906,"unique_id":4906,"total_quantity":3,"total_amount":3432,"time_pass":528655,"order_time":1531895748263,"formatted_created_at":"2018-07-18 14:35","restaurant_name":"效果演示","restaurant_image_url":"16018a5c08533.jpeg","restaurant_id":1},"$init":true,"addressDetail":"九章大厦","consignee":"厄齐尔","deliver_time":"尽快送达","pay_method":"在线支付","phone":"1231332"},
                imgBaseUrl,
                orderDetail:{"$__":{"strictMode":true,"selected":{"_id":0},"getters":{},"wasPopulated":false,"activePaths":{"paths":{"__v":"init","basket.abandoned_extra":"init","basket.deliver_fee.category_id":"init","basket.deliver_fee.name":"init","basket.deliver_fee.price":"init","basket.deliver_fee.quantity":"init","basket.extra":"init","basket.group":"init","basket.packing_fee.category_id":"init","basket.packing_fee.name":"init","basket.packing_fee.quantity":"init","basket.packing_fee.price":"init","basket.pindan_map":"init","is_brand":"init","is_deletable":"init","is_new_pay":"init","is_pindan":"init","operation_confirm":"init","operation_pay":"init","operation_rate":"init","operation_rebuy":"init","operation_upload_photo":"init","pay_remain_seconds":"init","rated_point":"init","remind_reply_count":"init","restaurant_type":"init","status_bar.title":"init","status_bar.sub_title":"init","status_bar.image_type":"init","status_bar.color":"init","status_code":"init","timeline_node.actions":"init","timeline_node.in_processing":"init","top_show":"init","address_id":"init","user_id":"init","id":"init","unique_id":"init","total_quantity":"init","total_amount":"init","time_pass":"init","order_time":"init","formatted_created_at":"init","restaurant_name":"init","restaurant_image_url":"init","restaurant_id":"init"},"states":{"ignore":{},"default":{},"init":{"__v":true,"basket.abandoned_extra":true,"basket.deliver_fee.category_id":true,"basket.deliver_fee.name":true,"basket.deliver_fee.price":true,"basket.deliver_fee.quantity":true,"basket.extra":true,"basket.group":true,"basket.packing_fee.category_id":true,"basket.packing_fee.name":true,"basket.packing_fee.quantity":true,"basket.packing_fee.price":true,"basket.pindan_map":true,"is_brand":true,"is_deletable":true,"is_new_pay":true,"is_pindan":true,"operation_confirm":true,"operation_pay":true,"operation_rate":true,"operation_rebuy":true,"operation_upload_photo":true,"pay_remain_seconds":true,"rated_point":true,"remind_reply_count":true,"restaurant_type":true,"status_bar.title":true,"status_bar.sub_title":true,"status_bar.image_type":true,"status_bar.color":true,"status_code":true,"timeline_node.actions":true,"timeline_node.in_processing":true,"top_show":true,"address_id":true,"user_id":true,"id":true,"unique_id":true,"total_quantity":true,"total_amount":true,"time_pass":true,"order_time":true,"formatted_created_at":true,"restaurant_name":true,"restaurant_image_url":true,"restaurant_id":true},"modify":{},"require":{}},"stateNames":["require","modify","init","default","ignore"]},"pathsToScopes":{},"emitter":{"domain":null,"_events":{"save":[null,null],"isNew":[null,null]},"_eventsCount":2,"_maxListeners":0},"$options":true},"isNew":false,"_doc":{"__v":0,"basket":{"abandoned_extra":[],"deliver_fee":{"category_id":2,"name":"配送费","price":4,"quantity":1},"extra":[],"group":[[{"name":"1-ok","price":21,"quantity":1,"_id":"5b4edfc274c2a223149ff73d","specs":["ok"],"new_specs":[],"attrs":[]},{"name":"1-dse","price":20,"quantity":1,"_id":"5b4edfc274c2a223149ff73c","specs":["dse"],"new_specs":[],"attrs":[]},{"name":"食品名称","price":20,"quantity":1,"_id":"5b4edfc274c2a223149ff73b","specs":[""],"new_specs":[],"attrs":[]}]],"packing_fee":{"category_id":1,"name":"餐盒","quantity":1,"price":3367},"pindan_map":[]},"is_brand":0,"is_deletable":1,"is_new_pay":1,"is_pindan":0,"operation_confirm":0,"operation_pay":0,"operation_rate":0,"operation_rebuy":2,"operation_upload_photo":0,"pay_remain_seconds":0,"rated_point":0,"remind_reply_count":0,"restaurant_type":0,"status_bar":{"title":"支付超时","sub_title":"15分钟内支付","image_type":"","color":"f60"},"status_code":0,"timeline_node":{"actions":[],"in_processing":0},"top_show":0,"address_id":3660,"user_id":12672,"id":4906,"unique_id":4906,"total_quantity":3,"total_amount":3432,"time_pass":528655,"order_time":1531895748263,"formatted_created_at":"2018-07-18 14:35","restaurant_name":"效果演示","restaurant_image_url":"16018a5c08533.jpeg","restaurant_id":1},"$init":true,"addressDetail":"九章大厦","consignee":"厄齐尔","deliver_time":"尽快送达","pay_method":"在线支付","phone":"1231332"}
            }
        },
        created () {
            this.showLoading = false
            this.orderDetail = this.orderDetail._doc
            console.log(this.orderDetail)
        },
        mounted(){
        },
        mixins: [getImgPath],
        components: {
            loading,
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
        position: fixed;
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
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .scroll_insert{
        padding-bottom: .6rem;
    }
    .order_titel{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .14rem;
        background-color: #fff;
        margin-bottom: 0.1rem;
        img{
            border: 0.01rem solid $blue;
            border-radius: 50%;
            @include wh(.6rem, .6rem);
        }
        p:nth-of-type(1){
            @include sc(.18rem, #333);
            font-weight: bold;
            margin-top: .08rem;
        }
        p:nth-of-type(2){
            @include sc(.11rem, #999);
            width: 10rem;
            margin-top: .06rem;
            text-align: center;
        }
        .order_again{
            @include sc(.12rem, $blue);
            margin-top: .1rem;
            border: 0.005rem solid $blue;
            padding: .03rem .08rem;
            border-radius: .02rem;
        }
    }
    .food_list{
        background-color: #fff;
        .food_list_header{
            @include fj;
            align-items: center;
            padding: .04rem .1rem;
            border-bottom: 1px solid #f5f5f5;
            .shop_name{
                img{
                    @include wh(.24rem, .24rem);
                    vertical-align: middle;
                    margin-right: .04rem;
                }
                span{
                    @include sc(.15rem, #333);
                    font-weight: bold;
                }
            }
            svg{
                @include wh(.12rem, .12rem);
                fill: #666;
            }
        }
        .food_list_ul{
            li{
                @include fj;
                align-items: center;
                padding: 0 .1rem;
                line-height: .4rem;
                .food_name{
                    @include sc(.12rem, #666);
                    flex: 4;
                }
                .quantity_price{
                    flex: 1;
                    @include fj;
                    align-items: center;
                    span:nth-of-type(1){
                        @include sc(.12rem, #ccc);
                    }
                    span:nth-of-type(2){
                        @include sc(.12rem, #666);
                    }
                }
            }
        }
        .deliver_fee{
            @include fj;
            align-items: center;
            padding: 0 .1rem;
            line-height: .4rem;
            border-top: 1px solid #f5f5f5;
            span{
                @include sc(.12rem, #666);
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
            p{
                @include sc(.13rem, #666);
                line-height: .2rem;
            }
        }
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0
    }
    
</style>
