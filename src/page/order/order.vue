 <template>
    <div class="order_page">
        <!-- <head-top head-title="订单列表" go-back='true'></head-top> -->
        <ul class="nav_tab">
            <li v-for="(item,index) in tabList" :class="{active: activeTab == index }" @click="findOrder(index)">{{item.tab}}</li>
        </ul> 
        <transition name="router-slid" mode="out-in">
            <router-view @findOrder="updateOrder()" :sendData="activeTab"></router-view>
        </transition>
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
                imgBaseUrl,
                activeTab: 0,
                tabList: [
                  {
                    tab: '全部',
                    name: 'all'
                  },
                  {
                    tab: '待支付',
                    name: 'unpaid'
                  },
                  {
                    tab: '待发货',
                    name: 'undelivery'
                  },
                  {
                    tab: '已发货',
                    name: 'delivered'
                  },
                  {
                    tab: '已完成',
                    name: 'completed'
                  }
                ]
            }
        },
        mounted(){
            this.initData();
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
            findOrder (index) {
                console.log(index)
                if (this.activeTab !== index) {
                  this.activeTab = index
                  // console.log(this.tabList[index].name)
                  this.$router.replace({name: this.tabList[index].name})
                  window.scrollTo(0, 0)
                }
            },
            updateOrder (data) {
                console.log(data)
                this.activeTab = data.activeTab
            }
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
        @include sc(.15rem,#666666);
        background: #fff;
        line-height: .45rem;
        display: flex;
        margin-bottom: .16rem;
        li{
            flex: 1;
            text-align: center;
        }
        .active{
            color: #e4372e;
            border-bottom: .02rem solid #e4372e; 
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
