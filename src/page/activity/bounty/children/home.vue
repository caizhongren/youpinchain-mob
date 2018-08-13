<template>
    <div class="bounty_home">
        <div class="top_header">
            <div class="clear">
                <router-link tag="div" class="user_icon left" :to="'/bountyPlan/userCenter'"></router-link>
                <div class="gold_box right">
                    <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/0'"><img src="../../../../images/bounty-plan/money_reward_icon1.png" width="30">金钻 {{calculate(data.balance.goldDrill)}}</router-link>
                    <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/1'"><img src="../../../../images/bounty-plan/money_reward_icon2.png" width="33%">金条 {{calculate(data.balance.bullion)}}</router-link>
                </div>
            </div>
            <p class="text">精彩功能 敬请期待</p>
        </div>
        <div class="task_box">
            <p class="task_title">领金任务</p>
            <ul class="task_list">
                <li @click="showMask = !showMask">
                    <p class="task_name">每日登录</p>
                    <img src="../../../../images/bounty-plan/login_icon.png" class="icon">
                    <p class="desr">今日登录+15金条</p>
                    <p class="status_finish"><img src="../../../../images/bounty-plan/finished.png" width="10%"> 已完成</p>
                </li>
                <router-link tag="li" :to="'/bountyPlan/invite/'+ data.invitationsSum">
                    <p class="task_name">邀请好友</p>
                    <img src="../../../../images/bounty-plan/invite_icon.png" class="icon">
                    <p class="desr">邀请1位好友+10金条</p>
                    <p class="reward">最多+150<img src="../../../../images/bounty-plan/money_reward_icon2.png" width="10%"></p>
                </router-link>
                <router-link tag="li" :to="{ path:'/bountyPlan/waiter', query:{ 'waiter': data.waiter}}">
                    <p class="task_name">添加客服微信</p>
                    <img src="../../../../images/bounty-plan/wx_icon.png" class="icon">
                    <p class="desr"> 添加成功获得</p>
                    <p class="status_finish" v-if="data.waiter"><img src="../../../../images/bounty-plan/finished.png" width="10%"> 已完成</p>
                    <p class="reward" v-if="!data.waiter"><img src="../../../../images/bounty-plan/money_reward_icon2.png" width="10%">+500</p>
                </router-link>
            </ul>
        </div>
        <div class="task_box marg-t-15">
            <p class="task_title">淘金任务</p>
            <ul class="task_list">
                <router-link tag="li" :to="'/bountyPlan/task'" v-for="(task,index) in data.task" :key="index" class="position-re">
                    <img src="../../../../images/bounty-plan/new_activity.png" class="new_icon">
                    <img :src="task.themePic" class="task_icon">
                    <p class="task_name">{{task.name}}</p>
                    <p class="status_finish" v-if="data.taskUser !== null && data.taskUser[index].taskStatus === 1"><img src="../../../../images/bounty-plan/finished.png" width="10%"> 已完成</p>
                    <p class="reward task_reward" v-if="data.taskUser === null || data.taskUser[index].taskStatus === 0"><img src="../../../../images/bounty-plan/money_reward_icon1.png" width="10%"> +{{task.rewardPrice}}</p>
                </router-link>
                <li v-if="data.task.length < 3"> 
                    <img src="../../../../images/bounty-plan/coming_soon.png" class="coming_soon">
                    <p class="task_name">敬请期待</p>
                </li>
            </ul>
        </div>
        <div class="showMask" v-if="showMask">
            <div class="sign_in">
                <img src="../../../../images/bounty-plan/sign_in.png" alt="" class="success_img">
                <ul>
                    <li v-for="(item,index) in data.dictionarydata_SIR" :class="{ 'margin_left_5' : index === 4 }">
                        <p :class="{ 'font_color' : index >= 4 }">{{item.dictdataName}}</p>
                        <div :class="{ 'sign_in_success' : index < data.signInNow.days }">
                            <img src="../../../../images/bounty-plan/money_reward_icon2.png" width="30" alt="">
                            <p>金条+{{item.dictdataValue}}</p>
                        </div>
                    </li>
                </ul>
                <p class="tips">连续登录可领取更多金条哦～</p>
                <button class="i_know" @click="showMask = !showMask">知道了</button>
                <img @click="showMask = !showMask" src="../../../../images/bounty-plan/close_model.png" alt="" width="30" class="close_btn">
            </div>
        </div>
    </div>
</template>
<script>
    import { bountyHome } from '../../../../service/getData'
    export default {
        data () {
            return {
                data: {
                    balance: {
                        goldDrill: 0,
                        bullion: 0,
                    },
                    taskUser: null,
                    task: [],
                    invitationsSum: 0,
                    waiter: false,
                    dictionarydata_SIR: {},
                    signInNow: {
                        days: 1
                    }
                },
                showMask: false,
            }
        },
        watch: {

        },
        mounted() {
            //获取首页信息
            var that = this
            bountyHome().then(res => {
                that.data = res.data
                that.data.waiter = res.data.waiter
                that.data.signInNow = {days : 1}
                that.data.showMask = false
            })
        },
        created() {
            
        },
        methods: {
            calculate: function (val) {
                val > 10000 ? val = Math.round(val / 10000 * 100) / 100 + '万' : val = val;
                return val
            }
        },
        computed: {
        },
    }
</script>
<style lang="scss" scoped>
  @import '../../../../style/mixin';
   .bounty_home {
        .marg-t-15 {
           margin-top: .15rem;
        }
       background: $bc;
        .top_header {
           padding: .22rem .2rem;
            @include wh(100%, 1.73rem);
           @include bis('../../../../images/bounty-plan/starry_sky_bg3.png');
           .user_icon {
               @include wh(.27rem, .27rem);
               @include bis('../../../../images/bounty-plan/user_icon.png');
           }
           .gold_box {
               display: flex;
               align-items: center;
               text-align: center;
               border-radius: .163rem;
               padding: 0 .05rem;
               margin-right: -.1rem;
               @include wh(2.25rem, .325rem);
               background: rgba(255, 255, 255, 0.4);
               color: $fc;
               p {
                   display: inline-block;
                   letter-spacing: 0.1px;
                   font-size: .11rem;
                   text-align: left;
                   width: 50%;
                   margin-top: .03rem;
                   img {
                       vertical-align: middle;;
                   }
               }
           }
            .text {
                text-align: center;
                @include sc(.3rem, $fc);
                margin-top: .28rem;
            }
        }
        .task_box {
            background: $fc;
            border-radius: .1rem;
            padding: .1rem .15rem 0;
            .task_title {
                @include sc(.15rem, $g3);
                border-bottom: 1px solid $gd;
                padding-bottom: .1rem;
            }
            .task_list {
                overflow: hidden;
                width: 100%;
                li {
                    float: left;
                    width: 36%;
                    text-align: center;
                    border-right: 1px solid $gd;
                    padding: .1rem 0 .1rem;
                    .icon {
                        @include wh(.345rem, .345rem);
                        vertical-align: middle;
                        margin: .05rem auto;
                    }
                    .task_icon {
                        @include wh(.62rem, .62rem);
                        vertical-align: middle;
                        border-radius: 50%;
                    }
                    .task_name {
                        @include sc(.14rem, $g3);
                        margin-top: .08rem;
                    }
                    .desr {
                        letter-spacing: 0.5px;
                        @include sc(.1rem, $g6);
                        transform: scale(0.95) translateX(-7%);
                        width: 114%;
                    }
                    .status_finish {
                        @include sc(.13rem, $g6);
                        @include wh(1.065rem, .23rem);
                        margin: 0.06rem auto 0;
                        img {
                            width: 13%;
                            vertical-align: middle;
                        }
                    }
                    .reward {
                        @include sc(.14rem, $g6);
                        @include wh(1.02rem, .25rem);
                        line-height: .26rem;
                        border-radius: .025rem;
                        margin: 0.04rem auto 0;
                        background-color: #ffeeec;
                        text-align: center;
                        img {
                            width: 28%;
                            vertical-align: middle;
                        }
                    }
                    .task_reward {
                        text-align: left;
                        padding-left: .1rem;
                    }
                    .coming_soon {
                        width: 45%;
                        margin: .45rem auto .26rem;
                    }
                    .new_icon {
                        position: absolute;
                        width: 21%;
                        right: 14%;
                        top: 0;
                    }
                }
                li:first-child {
                    padding-right: .1rem;
                    width: 32%;
                }
                li:last-child {
                    border: none;
                    padding-left: .1rem;
                    width: 32%;
                }
            }
        }
        .showMask{
            position: absolute;
            top: 0;
            @include wh(100%, 100vh);
            background: rgba(0, 0, 0, .8);
            .sign_in{
                @include wh(3.3rem, auto);
                @include bis('../../../../images/bounty-plan/sign_in_bg.png');
                background-size: 100% 100%;
                margin: 0 auto;
                margin-top: 1.4rem;
                text-align: center;
                position: relative;
                padding-bottom: .1rem;
                .success_img{
                    width: 1.05rem;
                    margin-top: .16rem;
                }
                ul {
                    overflow: hidden;
                    .margin_left_5{
                        margin-left: .5rem;
                    }
                    li{
                        width: .7rem;
                        @include sc(.15rem, #ffffff);
                        margin: .1rem .06rem .1rem .064rem;;
                        float: left;
                        div{
                            border-radius: 5px;
                            padding: .1rem 0 .07rem 0;
                            text-align: center;
                            margin-top: .08rem;
                            background: #f1eef4;
                            p{
                                @include sc(.13rem, #666666);
                            }
                        }
                        .sign_in_success{
                            background-image: linear-gradient(313deg, #ffd807, #ffe55a);
                        }
                        .font_color{
                            color: #a4170f;
                        }
                    }
                }
                .tips{
                    @include sc(.12rem, #feb33c);
                    margin-bottom: .1rem;
                }
                .i_know{
                    @include sc(.15rem, #fff);
                    background: #fc5340;
                    line-height: .4rem;
                    display: block;
                    margin: 0 auto;
                    @include wh(1.92rem, .4rem);
                    border-radius: .05rem;
                    margin-bottom: .1rem;
                }
                .close_btn{
                    position: absolute;
                    bottom: -.4rem;
                    left: 45.8%;
                }
            }
        }
   }
</style>
