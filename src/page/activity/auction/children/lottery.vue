<template>
    <div class="lottery">
        <div class="lucky-wheel">
            <div class="wheel-main">
                <div class="wheel-arraw"></div>
                <div class="wheel-pointer-box">
                    <div class="wheel-pointer" :class="{'wheel-grey-pointer': data.partake}" @click="rotate_handle()"></div>
                </div>               
                <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div>
                            <div class="prize-type">
                                <p v-if="item.count">金<br>条</p>
                                <p v-if="!item.count">谢<br>谢</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="luck-time-box">
                <div class="lucky-time">
                    距本轮结束 &nbsp; &nbsp; &nbsp;
                    <span>{{data.luckDrawTime | timeArry(0)}}</span> ：
                    <span>{{data.luckDrawTime | timeArry(1)}}</span> ：
                    <span>{{data.luckDrawTime | timeArry(2)}}</span>
                </div>
            </div>
        </div>
        <div class="description">
            <p class="title">活动规则</p>
            <div class="content">
                <p>1.<span>参与过本场竞拍即有过出价记录的用户可以参与限时抽奖。</span></p>
                <p>2.<span>每场抽奖活动持续时间5分钟，用户在活动期间内随机抽取1-100金条。</span></p>
                <p>3.<span>获得的金条即刻到账，可参与本场竞拍。</span></p>
                <p>4.<span>每场竞拍共设三次抽奖，抽奖开始时间为：19:30、20:00、20:30</span></p>
            </div>
        </div>
        <div class="record_detail">
            <p class="title">获奖用户</p>
            <div class="lucky_box">
                <ul class="lucky-users-box">
                    <li class="no_record" v-if="data.luckDrawRecords && data.luckDrawRecords.length <= 0">暂无记录</li>
                    <li v-for="(item,index) in data.luckDrawRecords" :key="index">
                        <div><span>{{item.userName}}</span>
                        </div>
                        <div>+{{item.amount}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-show="showMask" v-client-height>
            <div class="tip" v-if="!modalEnd">
                <p><img src="../../../../images/bounty-plan/money_reward_icon2.png" alt="" width="23%">恭喜您！</p>
                <p>成功抢到{{randomNumber}}个金条！</p>
                <p @click="showMask = false">知道啦</p>
            </div>
            <div v-else class="activityEnd">本轮已结束
                <p v-if="data.luckDrawTime > 0">距离下轮开始： 
                    <span>{{data.luckDrawTime | timeArry(0)}}:{{data.luckDrawTime | timeArry(1)}}:{{data.luckDrawTime | timeArry(2)}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { ModalHelper } from '../../../../service/Utils'
    import { luckDrawDetail, luckDraw } from '../../../../service/getData'
    export default {
        data() {
            return {
                timer: null,
                timer2: null,
                boxHeight: 2.7, // 滚动区域高度(li高度0.45rem,倍数)
                showMask: false,
                modalEnd: false,
                randomNumber: 0,
                data: {},
                prize_list: [
                    {
                        count: '1-20', // 奖品数量
                        name: '金条' // 奖品名称
                    },
                    {
                        count: '21-40',
                        name: '金条'
                    },
                    {
                        count: '41-60',
                        name: '金条'
                    },
                    {
                        count: '61-80',
                        name: '金条'
                    },
                    {
                        count: '81-100',
                        name: '金条'
                    },
                    {
                        count: 0,
                        name: '谢谢'
                    }
                ], //奖品列表
                toast_control: false, //抽奖结果弹出框控制器
                start_rotating_degree: 0, //初始旋转角度
                rotate_angle: 0, //将要旋转的角度
                rotate_transition: "transform 6s ease-out", //初始化选中的过度属性控制
                click_flag: true, //是否可以旋转抽奖
                auctionId: Number(this.$route.params.auctionId),
                luckDrawId: Number(this.$route.params.luckDrawId)
            }
        },
        watch: {
            showMask: function (newVal, oldVal) {
                newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
            },
            'data.luckDrawState': function (newVal) {
                newVal !== 1 ?  (this.showMask = true, this.modalEnd = true) : null
            }
        },
        props: ['showErrMsg'],
        mounted() {
        },
        created() {
            this.getLuckDrawDetail()
        },
        computed: {
        },
        methods: {
            getLuckDrawDetail () {
                var that = this
                if (that.data.luckDrawTime < 0) {
                    clearInterval(that.timer)
                    return
                }
                luckDrawDetail(that.auctionId, that.luckDrawId).then(function(response) {
                    if (response && response.errno === 0) {
                        that.data = response.data
                        that.data.luckDrawRecords.length > 6 ? that.luckyTimer(-that.boxHeight) : null
                        that.countDown()
                    } else {
                        console.log(response.errmsg)
                    }
                })
            },
            rotate_handle() {
                var that = this
                if (that.data.partake || !that.click_flag) {
                    return
                }
                that.click_flag = false
                luckDraw(that.auctionId,that.luckDrawId).then(function(response) {
                    if (response && response.errno === 0) {
                        that.randomNumber = response.data
                        that.rotating(that.computeIndex(that.randomNumber))
                    } else {
                        that.$parent.showErrMsg(response.errmsg)
                        that.click_flag = true;
                    }
                })
            },
            computeIndex (randomNumber) {
                if (randomNumber >= 1 && randomNumber <= 20) {
                    return 0
                } else if (randomNumber >= 21 && randomNumber <= 40) {
                    return 1
                } else if (randomNumber >= 41 && randomNumber <= 60) {
                    return 2
                } else if (randomNumber >= 61 && randomNumber <= 80) {
                    return 3
                } else if (randomNumber >= 81 && randomNumber <= 100) {
                    return 4
                } else {
                    return 5
                }
            },
            rotating(index) {
                var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
                var during_time = 5; // 默认为1s
                var random = Math.floor(Math.random() * 7);
                this.result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
                var result_angle = [0, -60, -120, -180, 120, 60]; //最终会旋转到下标的位置所需要的度数
                var rand_circle = 6; // 附加多转几圈，2-3
                // this.click_flag = false; // 旋转结束前，不允许再次触发
                if (type == 0) {
                    // 转动盘子
                    var rotate_angle =
                    this.start_rotating_degree +
                    rand_circle * 360 +
                    result_angle[this.result_index] -
                    this.start_rotating_degree % 360;
                    this.start_rotating_degree = rotate_angle;
                    this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                    var that = this;
                    // 旋转结束后，允许再次触发
                    setTimeout(function() {
                        that.click_flag = true;
                        that.showMask = true;
                        that.getLuckDrawDetail()
                    }, during_time * 1000 + 1500); // 延时，保证转盘转完
                } else {
                }
            },
            countDown () {
                var that = this
                this.timer = setInterval(function () {
                    if (that.data.luckDrawTime <= 0) {
                        that.showMask = true
                        that.modalEnd = true
                        clearInterval(that.timer2)
                        clearInterval(that.timer)
                        // that.getLuckDrawDetail()
                    } else {
                        that.data.luckDrawTime -= 1
                    }
                },1000)
            },
            luckyTimer: function (val) {
                var that = this
                var count = 0
                var $luckyUsersList = document.querySelector('.lucky-users-box')
                var totalHeight = -0.45 * that.data.luckDrawRecords.length
                if(totalHeight < -that.boxHeight){
                    that.timer2 = setInterval(function () {
                        if (totalHeight >= (count + 1) * -that.boxHeight && val !== 0) {
                            count = 0
                            val = 0
                            $luckyUsersList.classList.remove('animate')
                            $luckyUsersList.style.webkitTransform = 'translateY(0rem)'
                            } else {
                            count += 1
                            $luckyUsersList.className += ' animate'
                            if(totalHeight >= (count + 1) * -that.boxHeight){
                                $luckyUsersList.style.webkitTransform = 'translateY(' + (totalHeight + that.boxHeight) + 'rem)'
                            } else{
                                $luckyUsersList.style.webkitTransform = 'translateY(' + val + 'rem)'
                            }
                        }
                        val -= that.boxHeight
                    }, 5000)
                }
            }
        },
        destroyed () {
            clearInterval(this.timer)
            clearInterval(this.timer2)
            ModalHelper.beforeClose()
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../../style/mixin';
    .lottery {
        background: $bc;
        overflow-x: hidden;
        .lucky-wheel {
            @include wh(100%,4.45rem);
            background: url('../../../../images/bounty-plan/starry_sky_bg1.png') no-repeat;
            background-size: 100% 88%;
            padding-top: .45rem;
            .wheel-main {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .wheel-bg {
                    @include wh(3.065rem,3.065rem);
                    background: url("../../../../images/lottery/draw_wheel.png") no-repeat center top;
                    background-size: 100%;
                    color: $fc;
                    font-weight: 500;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-content: center;
                    transition: transform 3s ease;
                    .prize-list {
                        width: 100%;
                        height: 100%;
                        position: relative;
                        .prize-item {
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 2;
                            text-align: center;
                            width: .5rem;
                            .prize-type, .prize-count {
                                @include sc(.14rem,#6e3ba2);
                                font-weight: bold;
                                // writing-mode: vertical-rl;
                                p {
                                    line-height: 1;
                                    font-weight: bold;
                                }
                            }
                        }
                        .prize-item:first-child {
                            top: .4rem;
                            left: 1.3rem;
                            transform: rotate(0deg);
                        }
                        .prize-item:nth-child(2) {
                            top: .85rem;
                            left: 2.1rem;
                            transform: rotate(60deg);
                        }
                        .prize-item:nth-child(3) {
                            top: 1.72rem;
                            left: 2.05rem;
                            transform: rotate(120deg);
                        }
                        .prize-item:nth-child(4) {
                            top: 2.2rem;
                            left: 1.29rem;
                            transform: rotate(180deg);
                        }
                        .prize-item:nth-child(5) {
                            top: 1.7rem;
                            left: 0.5rem;
                            transform: rotate(-120deg);
                        }
                        .prize-item:nth-child(6) {
                            top: .94rem;
                            left: 0.45rem;
                            transform: rotate(-60deg);
                        }
                    }
                    
                }
                .wheel-arraw {
                    @include wh(.435rem,.58rem);
                    background: url("../../../../images/lottery/draw_icon.png") no-repeat center top;
                    background-size: 100%;
                    position: absolute;
                    top: -.15rem;
                    z-index: 111;
                }
                .wheel-pointer-box {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 100;
                    transform: translate(-50%, -60%);
                    @include wh(.95rem,.95rem);
                    .wheel-pointer, .wheel-grey-pointer {
                        @include wh(100%,100%);
                        background: url("../../../../images/lottery/draw_btn.png") no-repeat center top;
                        background-size: 100%;
                        transform-origin: center 60%;
                    }
                    .wheel-grey-pointer {
                        background: url("../../../../images/lottery/draw_grey_btn.png") no-repeat center top;
                        background-size: 100%;
                    }
                }
            }
            .luck-time-box {
                background: #06020a;
                height: 0.8rem;
                padding-top: .15rem;
                .lucky-time {
                    @include wh(3.29rem,.575rem);
                    background: url('../../../../images/lottery/countdown_bg.png') no-repeat;
                    background-size: 100% 88%;
                    margin: 0rem auto;
                    line-height: .5rem;
                    @include sc(.15rem, $fc);
                    text-align: center;
                    span {
                        display: inline-block;
                        @include wh(.305rem,.305rem);
                        background: #ffe236;
                        border-radius: .02rem;
                        @include sc(.213rem, #6b399e);
                        line-height: 1.5;
                    }
                }
            }
        }
        .description {
            margin-top: -.2rem;
            .content {
                padding: .15rem .12rem .2rem .12rem;
                line-height: 1.54;
                letter-spacing: 0.3px;
                text-align: justify;
                p {overflow: hidden;
                    @include sc(.13rem,$g6);}
                span {
                    float: right;
                    width: 96%;
                    @include sc(.13rem,$g6);
                }
            }
            .title {
                line-height: .45rem;
                font-size: .15rem;
                border-bottom: 0.01rem solid #eee;
                padding: 0;
                padding-left: .12rem;
            }
        }
        .description,.record_detail {
            border-radius: .1rem;
            background: $fc;
            color: #666666;
        }
        .record_detail {
            margin-top: .16rem;
            .title {
                line-height: .45rem;
                @include sc(.15rem, $g6);
                border-bottom: 0.01rem solid #eee;
                padding: 0;
                padding-left: .12rem;
            }
            .lucky_box {
                height: 2.7rem;
                overflow-y: hidden;
                position: relative;
                .lucky-users-box {
                    background: #efeff4;
                    li {
                        padding: 0 .12rem;
                        height: .45rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: $fc;
                        p{
                            margin-bottom: .06rem;
                            font-size: .125rem;
                        }
                        p:last-child{
                            font-size: .12rem;
                            color: $g9;
                        }
                        div:last-child{
                            color: #fc4c42;
                            font-size: .15rem;
                        }
                    }
                    li:nth-child(even){
                        background: #f6f5f5;
                    }
                    li.no_record {
                        justify-content: center;
                        height: 1.6rem;
                        background: $fc;
                    }
                }
                .lucky-users-box.animate{
                    transition: 1s all ease-in-out;
                }
            }
        }
        
        .mask{
            width: 100%;
            background: rgba(0, 0, 0, .9);
            position: fixed;
            top: 0;
            left: 0;
            padding-top: 2rem;
            z-index: 999;
            .tip{
                background: #fff;
                width: 2.8rem;
                margin: 0 auto;
                padding: .2rem .4rem .15rem;
                border-radius: .1rem;
                p{
                    height: .3rem;
                    line-height: 1.67;
                    text-align: center;
                    @include sc(.18rem, #333333);
                    img{
                        vertical-align: middle;
                    }
                }
                p:last-child{
                    background: #fc5340;
                    @include sc(.15rem, #fff);
                    line-height: .4rem;
                    height: .4rem;
                    margin-top: .18rem;
                    border-radius: .05rem;
                }
            }
        }
    }
    .activityEnd{
        @include sc(.15rem, #fff);
        line-height: 1.6;
        text-align: center;
        span {
            display: inline-block;
            width: .5rem;
            text-align: left;
        }
    }
</style>