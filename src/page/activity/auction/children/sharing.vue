<template>
    <div class="sharing">
        <div class="header">
            <img src="../../../../images/bounty-plan/starry_sky_bg0.png" alt="" width="100%">
            <ul class="statistics">
                <li>
                    <p>{{data.helpBullion}}</p>
                    <p>金条奖励</p>
                </li>
                <li>
                    <p>{{data.helpNum}}</p>
                    <p>好友助力人数</p>
                </li>
                <li>
                    <p>{{data.helpBidNum}}</p>
                    <p>出价次数奖励</p>
                </li>
            </ul>
        </div>
        <div class="content">
            <div class="aid_progress">
                <div class="title">助力进度</div>
                <ul class="gift_icon">
                    <li><img src="../../../../images/auction/step_04.png" width="16%"></li>
                    <li><img src="../../../../images/auction/step_04.png" width="18%"></li>
                    <li><img src="../../../../images/auction/step_04.png" width="22%"></li>
                </ul>
                <div class="progress_box">
                    <div class="progress_bar" :style="{width:data.helpNum >= 9 ? '100%' : (data.helpNum/9*100) +'%'}"></div>
                    <div class="invite_count"></div>
                </div>
                <ul class="gift_count">
                    <li>3人</li>
                    <li>6人</li>
                    <li>9人</li>
                </ul>
            </div>
            <div class="aid_friend">
                <div class="title">助力好友</div>
                <ul class="friend_list">
                    <li v-for="item in data.helpList"><img :src="item.headImgUrl" alt=""></li>
                </ul>
            </div>
            <div class="rules">
                <div class="title">规则说明</div>
                <div class="text">
                    <p>1.<span>每场竞拍活动开始前1天至拍卖结束，用户可将活动信息分享到朋友圈、微信群邀请好友助力。</span></p>
                    <p>2.<span>每位好友可助力一次，每获得三次助力增加一次出价机会。每人最多可增加三次出价机会。</span></p>
                </div>
            </div>
        </div>
        <div class="invite_btn">邀请好友助力</div>
    </div>
</template>
<script>
    import { helpDetail } from '../../../../service/getData'
    export default {
        data () {
            return {
                data: {
                    helpBullion: 0,
                    helpNum: 1,
                    helpBidNum: 1,
                    helpList: [
                        {
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        },{
                            headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIaY0B8q5Z9bQOXNJEEXBuI5Dl6hGH5FDOAbQPicxpibpbebMr5HuzfsJkzHfaTCVGfSQzP0DKiaLLEA/132'
                        }
                    ]
                }
            }
        },  
        watch: {
        },
        mounted() {
        },
        created() {
            this.getHelpDetail(11)
        },
        methods: {
            getHelpDetail (auctionId) {
                var that = this
                helpDetail(auctionId).then(function (respones) {
                    if (respones && respones.errno === 0) {
                        // that.data = respones.data
                    } else {

                    }
                })
            }
        },
        components: {
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../../style/mixin';
    .sharing {
        background: $bc;
        padding-bottom: .49rem;
        margin-bottom: .35rem;
        .header {
            background: $fc;
            .statistics {
                @include wh(3.45rem,.745rem);
                margin: -.5rem auto 0;
                padding: .1rem 0;
                line-height: 1.7;
                position: relative;
                z-index: 1;
                overflow: hidden;
                border-radius: .373rem;
                background-color: $fc;
                box-shadow: 0px 1px 5px 0 rgba(185, 210, 249, 0.67);
                li {
                    float: left;
                    width: 33.33%;
                    text-align: center;
                    position: relative;
                    p:first-child {
                        @include sc(.183rem,$g3);
                    }
                    p:last-child {
                        @include sc(.12rem,$g9);
                        border: none;
                    }
                    &:after {
                        display: block;
                        content: '';
                        @include wh(.01rem, .295rem);
                        background: $gd;
                        position: absolute;
                        top: .16rem;
                    }
                }
            }
        }
        .content {
            border-top-left-radius: .1rem;
            border-top-right-radius: .1rem;
            margin-top: -.4rem;
            padding: .45rem 0rem .2rem;
            z-index: 0;
            position: relative;
            background: $fc;
            .title {
                @include sc(.15rem,$g6);
                margin: .25rem 0 .15rem .15rem;
            }
            .aid_progress {
                padding-bottom: .18rem;
                .gift_icon, .gift_count {
                    width: 85%;
                    margin: 0 auto;
                    padding: .04rem 0;
                    overflow: hidden;
                    li {
                        float: left;
                        width: 33.33%;
                        text-align: right;
                        @include sc(.12rem,$g9);
                        img {
                            vertical-align: text-bottom;
                        }
                    }
                    li:last-child {
                        img {
                            position: relative;
                            top: -.015rem;
                        }
                    }
                }
                .progress_box {
                    @include wh(88%,.18rem);
                    margin: 0 auto;
                    border-top-right-radius: .5rem;
                    border-bottom-right-radius: .5rem;
                    position: relative;
                    background-color: #f5f4f5;
                    .progress_bar {
                        height: 100%;
                        border-top-right-radius: .5rem;
                        border-bottom-right-radius: .5rem;
                        background-image: linear-gradient(to bottom, #fc5b46, #fa424f);
                    }
                    .invite_count {
                        @include wh(.38rem,.385rem);
                        position: absolute;
                        top: -.27rem;
                        left: -6%;
                        background: url('../../../../images/auction/sharing_bullion.png') no-repeat;
                        background-size: 100%;
                    }
                }
            }
            .aid_friend {
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                .friend_list {
                    overflow: hidden;
                    width: 96%;
                    margin: 0 auto .12rem;
                    li {
                        float: left;
                        width: 20%;
                        text-align: center;
                        img {
                            @include wh(.52rem,.52rem);
                            border-radius: .05rem;
                            background-color: #000000;
                            margin-bottom: .15rem;
                        }
                    }
                }
            }
            .rules {
                .text {
                    padding: .1rem .25rem .0rem .15rem;
                    line-height: 1.54;
                    letter-spacing: 0.4px;
                    text-align: justify;
                    p {overflow: hidden;
                        @include sc(.13rem,$g6);}
                    span {
                        float: right;
                        width: 96%;
                        @include sc(.13rem,$g6);
                    }
                }
            }
        }
        .invite_btn {
            position: fixed;
            bottom: 0;
            @include wh(100%,.49rem);
            @include sc(.15rem,$fc);
            text-align: center;
            line-height: .5rem;
            background-image: linear-gradient(133deg, #fc5b46, #fa424f);
        }
    }
</style>
