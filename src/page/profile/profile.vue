<template>
    <div class="profile_page">
        <section>
            <div class="profile-top-red"></div>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
                    <div class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </div>
                    <p class="user-name">Petite mignonne😉</p>
                </router-link>
            </section>
            <section class="info-data">
                <router-link to='/order' class="my-order" tag="div">
                    <span>我的订单</span>
                    <span class="to-all-order">
                        全部订单
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
                <ul class="clear">
                    <router-link to="/order/unpaid" tag="li" class="info-data-link">
                        <span class="info-data-top"></span>
                        <span class="info-data-bottom">待支付</span>
                    </router-link>
                    <router-link to="/order/undelivery" tag="li" class="info-data-link">
                       <span class="info-data-top"><b data-v-4675cad9="" class="red-points">1</b></span>
                       <span class="info-data-bottom">待发货</span>
                    </router-link>
                    <router-link to="/order/delivered" tag="li" class="info-data-link">
                        <span class="info-data-top"></span>
                        <span class="info-data-bottom">已发货</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的优惠券 -->
                <router-link to='/coupon' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>我的优惠券</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 地址管理 -->
                <router-link to='/profile/info/address' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>地址管理</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 联系客服 -->
                <div class="myorder" @click="showAlertTip = !showAlertTip">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>联系客服</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <!-- 关于我们 -->
                <router-link to='/vipcard' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>关于我们</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            
        </section>
        <alert-tip :showAlertTip="showAlertTip" :type="2" v-show="showAlertTip"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import alertTip from 'src/components/common/alertTip'
import footGuide from 'src/components/footer/footGuide'
import {mapState, mapMutations} from 'vuex'
import {imgBaseUrl} from 'src/config/env'
import {getImgPath} from 'src/components/common/mixin'

export default {
    data(){
        return{
            profiletitle: '我的',
            username: '登录/注册',           //用户名
            resetname: '',
            mobile: '暂无绑定手机号',             //电话号码
            balance: 0,            //我的余额
            count : 0,             //优惠券个数
            pointNumber : 0,       //积分数
            avatar: '',             //头像地址
            imgBaseUrl,
            showAlertTip: false
        }
    },
    mounted(){
        this.initData();
    },
    mixins: [getImgPath],
    components:{
        footGuide,
        alertTip
    },

    computed:{
        ...mapState([
            'userInfo',
        ]),
        //后台会返回两种头像地址格式，分别处理
        imgpath:function () {
            let path;
            if(this.avatar.indexOf('/') !==-1){
                path = imgBaseUrl +　this.avatar;
            }else{
                path = this.getImgPath(this.avatar)
            }
            this.SAVE_AVANDER(path);
            return path;
        }
    },

    methods:{
        ...mapMutations([
            'SAVE_AVANDER'
        ]),
        initData(){
            if (this.userInfo && this.userInfo.user_id) {
                this.avatar = this.userInfo.avatar;
                this.username = this.userInfo.username;
                this.mobile = this.userInfo.mobile || '暂无绑定手机号';
                this.balance = this.userInfo.balance;
                this.count = this.userInfo.gift_amount;
                this.pointNumber = this.userInfo.point;
            }else{
                this.username = '登录/注册';
                this.mobile = '暂无绑定手机号';
            }
        },
    },
    watch: {
        userInfo: function (value){
            this.initData()
        }
    }
}

</script>

<style lang="scss" scoped>
   @import 'src/style/mixin';

    .profile_page{
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
        padding-bottom: .6rem;
    }
    .profile-top-red{
        height: .83rem;
        width: 100%;
        background-image: linear-gradient(to bottom, #fc5b46, #fa424f);
    }
    .profile-number{
        height: 1.2rem;
        width: 3.5rem;
        margin: 0 auto;
        margin-top: -.5rem;
        margin-bottom: .15rem;
        background: rgba(255, 255, 255, 0.85);
        border-radius: 10px;
        .profile-link{
            padding: .05rem 0;
            text-alig: center;
            display:block;
            box-align: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            .privateImage{
                @include wh(.75rem,.75rem);
                border-radius:50%;
                vertical-align:middle;
                margin: 0 auto;
                .privateImage-svg{
                    border-radius:50%;
                    @include wh(.75rem,.75rem);
                    display: block;
                }
            }
            .user-name{
                font-size: .15rem;
                font-weight: bold;
                color: #333333;
                text-align: center;
            }
        }
   }
   .info-data{
        width: 3.5rem;
        margin: 0 auto;
        border-radius: 10px;
        background:$fc;
        box-sizing: border-box;
        .my-order{
            height: .44rem;
            border-bottom: 1px solid #f1f1f1;
            span{
                line-height: .44rem;
                color: #333333;
                font-size: .15rem;
                padding-left: .12rem;
                float: left;
            }
            .to-all-order{
                color: #999999;
                font-size: .13rem;
                float: right;
                svg{
                    width: .1rem;
                    height: .1rem;
                    margin: 0 .12rem 0 .1rem;
                }
            }
        }
        ul{
            .info-data-link{
                float:left;
                width:33.33%;
                display:inline-block;
                span{
                    display:block;
                    width:100%;
                    text-align:center;
                }
                .info-data-top{
                    margin: .17rem auto .09rem;
                    position: relative;
                    @include wh(.29rem,.275rem);
                    @include bis('../../images/mine-icon-dzf.png')
                }
                .info-data-bottom{
                    @include sc(.114rem,#666);
                    font-weight:400;
                    padding-bottom:.09rem;

                }
            }
            .info-data-link:nth-of-type(2) .info-data-top{
                @include bis('../../images/mine-icon-dfh.png')
            }
            .info-data-link:nth-of-type(3) .info-data-top{
                @include bis('../../images/mine-icon-yfh.png')
            }
        }
   }
   .profile-1reTe{
        margin-top:.15rem;
        background:$fc;
        border-radius: 10px;
        .myorder{
            padding-left:.32rem;
            display:flex;
            align-items: center;
            @include wh(100%,.55rem);
            border-bottom:1px solid #f1f1f1;
            aside{
                @include wh(.28rem,.26rem);
                margin-left:-.172rem;
                margin-right: .18rem;
                display:flex;
                align-items: center;
                @include bis('../../images/mine-wdyhq.png')
            }
            .myorder-div{
                width:100%;
                padding:.086rem .053rem .086rem 0;
                @include sc(.028rem,#333);
                display:flex;
                justify-content:space-between;
                span{
                    display:block;
                    font-size: .15rem;
                }
                .myorder-divsvg{
                    @include wh(.1rem,.175rem);
                    width: 0.1rem;
                    margin-right: .12rem;
                    svg{
                        @include wh(180%,180%);
                        margin-top: -.05rem;
                    }
                }
            }
        }
        .myorder:nth-of-type(2) aside{
            @include bis('../../images/mine-dzgl.png')
        }
        .myorder:nth-of-type(3) aside{
            @include bis('../../images/mine-lxkf.png')
        }
        .myorder:nth-of-type(4) aside{
            @include bis('../../images/mine-gywm.png')
        }
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(.4rem, 0, 0);
        opacity: 0;
    }
</style>
