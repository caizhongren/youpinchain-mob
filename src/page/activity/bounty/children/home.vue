<template>
    <div class="bounty_home" v-if="showDocument">
        <div class="top_header">
            <div class="clear">
                <router-link tag="div" class="user_icon left" :to="'/bountyPlan/userCenter'"></router-link>
                <div class="gold_box right">
                    <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/0'"><img src="../../../../images/bounty-plan/money_reward_icon1.png" width="30">金钻 {{calculate(data.balance.goldDrill)}}</router-link>
                    <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/1'"><img src="../../../../images/bounty-plan/money_reward_icon2.png" width="33%">金条 {{calculate(data.balance.bullion)}}</router-link>
                </div>
            </div>
            <div v-show="canTakeCount <= 0" class="text">精彩功能 敬请期待</div>
            <div v-show="canTakeCount > 0" class="circle animate" :id="index" :key="index" v-for="(item, index) in rewardList" v-bind:style="{ top: item.top + '%', left: item.left + '%' }" @click="takeReward(index, item.rewardMoney)">
                {{item.rewardMoney}}
                <span :class="'icon' + item.type"></span>
            </div>
        </div>
        <div class="task_box">
            <p class="task_title">领金任务</p>
            <ul class="task_list">
                <li @click="showMask = !showMask">
                    <p class="task_name">每日登录</p>
                    <img src="../../../../images/bounty-plan/login_icon.png" class="icon">
                    <p class="desr">今日登录+{{data.dictionarydata_SIR[data.signInNow.day - 1].dictdataValue}}金条</p>
                    <p class="status_finish"><img src="../../../../images/bounty-plan/finished.png" width="10%"> 已完成</p>
                </li>
                <router-link tag="li" :to="'/bountyPlan/invite/'+ data.invitationsSum">
                    <p class="task_name">邀请好友</p>
                    <img src="../../../../images/bounty-plan/invite_icon.png" class="icon">
                    <p class="desr">邀请1位好友+10金条</p>
                    <p class="reward">最多+500<img src="../../../../images/bounty-plan/money_reward_icon2.png" width="10%"></p>
                </router-link>
                <router-link tag="li" :to="{ path:'/bountyPlan/waiter', query:{ 'waiter': data.waiter}}">
                    <p class="task_name">添加客服微信</p>
                    <img src="../../../../images/bounty-plan/wx_icon.png" class="icon">
                    <p class="desr"> 添加成功获得</p>
                    <p class="status_finish" v-if="data.waiter"><img src="../../../../images/bounty-plan/finished.png" width="10%"> 已完成</p>
                    <p class="reward" v-if="!data.waiter"><img src="../../../../images/bounty-plan/money_reward_icon2.png" width="10%">+20</p>
                </router-link>
            </ul>
        </div>
        <div class="task_box marg-t-15">
            <p class="task_title">拣金任务</p>
            <ul class="task_jian_list">
                <li :class="{'active': index === activeTab}" v-for="(item, index) in data.pickGolds" :key="index" @click="toggleTab(index, 1)">
                    <p>{{item.startTime.substr(-8,5)}}</p>
                    <p>{{item.state === 1 ? '即将开始' : item.state === 2 ? '正在疯抢' : item.state === 3 ? '今日已结束' : ''}}</p>
                </li>
            </ul>
            <div class="task_jian_content">
                <div class="left">
                    <p class="bullion" v-show="pickGolds.state !== 3">{{pickGolds.amount}}</p>
                </div>
                <div class="right">
                    <p class="reward" v-show="pickGolds.state !== 3">{{pickGolds.amount}}金条</p>
                    <p class="btn" @click="toTaskDeatil(pickGolds)" :class="{'active': pickGolds.state === 2, 'marg-t-15': pickGolds.state === 3}">{{pickGolds.state === 1 ? '即将开始' : pickGolds.state === 2 && pickGolds.amount > 0 ? '立即参与' : pickGolds.state === 3 ? '本场已结束' : pickGolds.state === 2 && pickGolds.amount <= 0 ? '已抢光' : ''}}</p>
                    <div class="time" v-show="pickGolds.state === 1 || pickGolds.state === 2">
                        距{{pickGolds.state === 1 ? '开始' : '结束'}} &nbsp;&nbsp;
                        <span>{{pickGolds.countDown | timeArry(0)}}</span> :
                        <span>{{pickGolds.countDown | timeArry(1)}}</span> :
                        <span>{{pickGolds.countDown | timeArry(2)}}</span> 
                    </div>
                </div>
            </div>
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
                    <li v-for="(item,index) in data.dictionarydata_SIR" :class="{ 'margin_left_5' : index === 4 }" :key="index">
                        <p :class="{ 'font_color' : index >= 4 }">{{item.dictdataName}}</p>
                        <div :class="{ 'sign_in_success' : index < data.signInNow.day }">
                            <img src="../../../../images/bounty-plan/money_reward_icon2.png" width="30" alt="">
                            <p>金条+{{item.dictdataValue}}</p>
                        </div>
                    </li>
                </ul>
                <p class="tips">连续登录可领取更多金条哦～</p>
                <button class="i_know" @click="showMask = !showMask">知道了</button>
            </div>
        </div>
    </div>
</template>
<script>
    import { bountyHome } from '../../../../service/getData'
    import { ModalHelper } from '../../../../service/Utils'
    export default {
        data () {
            return {
                showDocument: false,
                showMask: false,
                data: {},
                activeTab: -1,
                pickGolds: {},
                rewardList: [],
                unTakeRewardsList: [
                    // {
                    //     reward: 0.02,
                    //     type: 1
                    // },
                    // {
                    //     reward: 0.1,
                    //     type: 0
                    // },
                    // {
                    //     reward: 1,
                    //     type: 1
                    // },
                    // {
                    //     reward: 6,
                    //     type: 1
                    // },
                    // {
                    //     reward: 6,
                    //     type: 0
                    // },
                    // {
                    //     reward: 6,
                    //     type: 0
                    // }
                ],
                canTakeCount: 0,
                timer: null
            }
        },
        watch: {
            showMask: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
            },
        },
        mounted() {
            this.getActInfo()
        },
        created() {
            // this.canTakeCount = this.unTakeRewardsList.length
            // this.setProportion(this.canTakeCount,this.unTakeRewardsList)
            // this.circleAnimate(this.canTakeCount)
        },
        methods: {
            getActInfo () {
                //获取首页信息
                var that = this
                bountyHome().then(res => {
                    that.data = res.data
                    that.data.waiter = res.data.waiter
                    that.data.signInNow = {
                        day: res.data.signInNow ? res.data.signInNow.day : 1
                    }
                    that.showDocument = true
                    if (res.data.pickGolds[0].state === 3 && res.data.pickGolds[1].state === 3) {
                        that.setPickGolds(2, res.data.pickGolds)
                    } else if (res.data.pickGolds[0].state !== 3) {
                        that.setPickGolds(0, res.data.pickGolds)
                    } else {
                        that.setPickGolds(1, res.data.pickGolds)
                    }
                })
            },
            setPickGolds (index, pickGolds) {
                this.toggleTab(index)
                this.pickGolds = pickGolds[index]
                this.pickGolds.state !== 3 ? this.countDown() : null
            },
            countDown () {
                var that = this
                var time = that.pickGolds.countDown
                var start_time = new Date();
                var start_time = start_time.getTime(); //获取开始时间的毫秒数
                if(that.pickGolds.countDown){
                    that.timer = setInterval(function () {
                        //倒计时实时结束时间
                        var end_time = new Date();
                        end_time = end_time.getTime();
                        var diff_time = Math.floor((end_time - start_time) / 1000);
                        //拿到时间差作为时间标记（行走时间）
                        document.addEventListener('visibilitychange',function() {
                            if(document.visibilityState=='visible') {
                                that.pickGolds.countDown = time - diff_time
                            } else {
                            }
                        })
                        if(that.pickGolds.countDown > 0){
                            that.pickGolds.countDown -= 1
                        } else {
                            that.getActInfo()
                            clearInterval(that.timer)
                            return
                        }
                    },1000)
                }
            },
            calculate: function (val) {
                val > 10000 ? val = Math.round(val / 10000 * 100) / 100 + '万' : val = val
                return val
            },
            toggleTab (index, update) {
                var that = this
                if (that.activeTab === index) {
                    return;
                }
                that.activeTab = index;
                clearInterval(that.timer)
                update ? 
                bountyHome().then(res => {
                    that.data.pickGolds = res.data.pickGolds
                    that.pickGolds = res.data.pickGolds[index]
                    that.pickGolds.state !== 3 ? that.countDown() : null
                }) : null
            },
            toTaskDeatil (pickGolds) {
                if (pickGolds.state === 1 || pickGolds.state === 3) {
                    return
                }
                this.$router.push({name: 'PickGoldTask', params: {id: pickGolds.id}, query: {lastScene: this.activeTab === 2 ? true : false}})
            },
            circleAnimate (canTakeCount) { // 金币上下跳动动画
                if (canTakeCount <= 0 || this.canTakeCount <= 0) {
                return
                }
                var a = 0
                this.timer = setInterval(function () {
                if (a % 2 === 0) {
                    for (let i = 0; i < canTakeCount; i++) {
                    document.getElementById(i) ? document.getElementById(i).style.webkitTransform = 'translateY(' + 0.1 * Math.random(1,5) +'rem)' : null
                    }
                } else {
                    for (let i = 0; i < canTakeCount; i++) {
                    document.getElementById(i) ? document.getElementById(i).style.webkitTransform = 'translateY(' + -0.1 * Math.random(1,5) + 'rem)' : null
                    }
                }
                a += 1
                }, 1000)
            },
            takeReward (index, reward) {
                document.getElementById(index).remove()
                this.canTakeCount -= 1
             },
            setProportion (canTakeCount, unTakeRewardsList) {
                // 初始化布局数组
                var position = []
                var treeId = 0
                for (let i = 0; i < 100; i++) {
                    position[i] = []
                    for (let j = 0; j < 100; j++) {
                        position[i][j] = {radius: 0, isPlanted: 0}
                    }
                }
                // 随机种植树木
                while (this.rewardList.length < canTakeCount) {
                    // 随机选择一个位置来种植一棵树
                    let minTreeX = 3
                    let minTreeY = 18
                    let maxTreeX = 86
                    let maxTreeY = 80
                    let treeX = Math.floor(Math.random() * (maxTreeX - minTreeX)) + minTreeX
                    let treeY = Math.floor(Math.random() * (maxTreeY - minTreeY)) + minTreeY
                    if (position[treeX][treeY].isPlanted === 1) {
                        // 如果该位置已经植入树木则跳过后续操作
                        continue
                    }
                    // 树木直径随机
                    // let treeRadius = 7.8
                    let maxTreeRadius = 10
                    // 初始设定为可以种植
                    position[treeX][treeY].isPlanted = 1
                    // 计算检测框范围
                    let checkStartX = Math.max(treeX - 2 * maxTreeRadius, minTreeX)
                    let checkStartY = Math.max(treeY - 2 * maxTreeRadius, minTreeY)
                    let checkEndX = Math.min(treeX + 2 * maxTreeRadius, maxTreeX)
                    let checkEndY = Math.min(treeY + 2 * maxTreeRadius, maxTreeX)
                    for (let x = checkStartX; x <= checkEndX; x++) {
                        for (let y = checkStartY; y <= checkEndY; y++) {
                        // 除了当前位置 和框定范围内已经植入的树木比较距离
                        if (!(treeX === x && treeY === y) && (position[x][y].isPlanted === 1)) {
                            // 比较两点间距离和两点半径和的大小 判断是否重叠
                            let treeDistanceSquared = (treeX - x) * (treeX - x) + (treeY - y) * (treeY - y)
                            let radiusSumSquared = (2 * maxTreeRadius) * (2 * maxTreeRadius)
                            if (treeDistanceSquared < radiusSumSquared) {
                            // 发生碰撞则标记不可种
                            position[treeX][treeY].radius = 0
                            position[treeX][treeY].isPlanted = 0
                            }
                        }
                        }
                    }
                    if (position[treeX][treeY].isPlanted === 1) {
                        // 显示结果图形
                        this.rewardList.push({id: treeId, left: treeX, top: treeY, rewardMoney: unTakeRewardsList[treeId].reward, type: unTakeRewardsList[treeId].type})
                        treeId += 1
                    }
                }
            }
        },
        computed: {
        },
        destroyed() {
            clearInterval(this.timer)
        },
    }
</script>
<style lang="scss" scoped>
  @import '../../../../style/mixin';
   .bounty_home {
       overflow: hidden;
       width: 100%;
        .marg-t-15 {
           margin-top: .15rem;
        }
        background: $bc;
        .top_header {
           padding: .22rem .2rem;
           // @include wh(100%, 3.717rem);
           @include wh(100%, 1.73rem);
           background-position-y: -1px;
           position: relative;
           // @include bis('../../../../images/bounty-plan/starry_sky_bg3.png');
           @include bis('../../../../images/bounty-plan/starry_sky_bg0.png');
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
                margin-top: .25rem;
                // margin-top: 1.2rem;
            }
            .animate {
                -webkit-transition:all 1s ease-in-out;
                -moz-transition:all 1s ease-in-out;
                -o-transition:all 1s ease-in-out;
                -ms-transition:all 1s ease-in-out;    
                transition:all 1s ease-in-out;
            }
            .circle {
                position: absolute;
                top: 20%;
                left: 30%;
                @include wh(.46rem, .45rem);
                @include sc(.12rem,$fc);
                @include bis('../../../../images/bounty-plan/water-drop.png');
                font-weight: bold;
                padding-top: .05rem;
                text-align: center;
                letter-spacing: -1px;
                .icon0 {
                    display: block;
                    margin: 0 auto;
                    @include wh(.22rem, .17rem);
                    @include bis('../../../../images/bounty-plan/icon1.png');
                }
                .icon1 {
                    display: block;
                    margin: 0 auto;
                    @include wh(.27rem, .17rem);
                    @include bis('../../../../images/bounty-plan/icon2.png');
                }
            }
        }
        .task_box {
            background: $fc;
            border-radius: .05rem;
            padding: .1rem .15rem 0;
            .task_title {
                @include sc(.15rem, $g3);
                border-bottom: 1px solid #eee;
                padding-bottom: .1rem;
            }
            .task_list {
                overflow: hidden;
                width: 100%;
                li {
                    float: left;
                    width: 36%;
                    text-align: center;
                    border-right: 1px solid #eee;
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
            position: fixed;
            z-index: 999;
            top: 0;
            bottom: 0;
            @include wh(100%, 100vh);
            background: rgba(0, 0, 0, .8);
            .sign_in{
                @include wh(3.3rem, auto);
                @include bis('../../../../images/bounty-plan/sign_in_bg.png');
                background-size: 100% 100%;
                margin: 0 auto;
                margin-top: .8rem;
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
        .task_jian_list {
            overflow-x: hidden;
            width: 110%;
            margin-left: -5%;
            height: .8rem;
            li {
                float: left;
                @include wh(33.33%, .5rem);
                padding-top: .06rem;
                text-align: center;
                background: #2a2a33;
                color: rgba(255, 255, 255, 0.4);
                p:nth-child(1) {
                    font-size: .18rem;
                }
                p:nth-child(2) {
                    font-size: .12rem;
                }
            }
            .active {
                background-image: linear-gradient(to right, #fc5b46, #fa424f);
                color: $fc;
                position: relative;
            }
            .active:after {
                display: block;
                content: "";
                border-width: .08rem;
                position: absolute;
                bottom: -.15rem;
                z-index: 999;
                right: 40%;
                border-style: solid dashed dashed;
                border-color: #fa454e transparent transparent;
                font-size: 0;
                line-height: 0;
            }
        }
        .task_jian_content {
            overflow: hidden;
            @include wh(100%,1.16rem);
            background: $fc;
            padding: 0 .3rem 0 .15rem;
            .left {
                @include wh(1.23rem,.97rem);
                @include bis('../../../../images/bounty-plan/jian-tu.png');
                .bullion {
                    @include wh(.74rem,.38rem);
                    @include sc(.21rem,$fc);
                    line-height: .35rem;
                    border-radius: .2rem;
                    background-color: #2d1063;
                    border: solid 2px #ffee59;
                    text-align: center;
                    margin: 0.5rem auto 0;
                }
            }
            .right {
                text-align: center;
                .reward {
                    @include sc(.18rem,$g3);
                }
                .btn {
                    @include wh(1.22rem,.4rem);
                    @include sc(.15rem,$fc);
                    border-radius: .05rem;
                    font-weight: 600;
                    text-align: center;
                    line-height: .42rem;
                    background: $g9;
                    margin: .08rem auto .1rem;
                }
                .btn.active {
                    background: #ffe236;
                    color: #2a2a33;
                }
                .btn.marg-t-15 {
                    margin-top: .35rem;
                }
                .time {
                    @include sc(.12rem,$g3);
                    span {
                        border-radius: 2px;
                        background-color: #2d1063;
                        @include wh(.18rem,.175rem);
                        display: inline-block;
                        line-height: .18rem;
                        @include sc(.12rem,$fc);
                    }
                }
            }
        }
   }
</style>
