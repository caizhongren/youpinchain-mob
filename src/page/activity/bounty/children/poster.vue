<template>
    <div class="invite" v-client-height>
        <div class="top_head">
            <p class="title">品质商城 &nbsp; 放心臻品</p>
            <div class="box">
                <p>您的邀请二维码</p>
                <div class="qrcode" id="qrcode"></div>
                <div class="invitationsSum">
                    <p><img src="../../../../images/bounty-plan/invite_num_icon.png" width="11%">您已邀请好友{{invitationsSum}}人</p>
                    <p><img src="../../../../images/bounty-plan/invite_amount_icon.png" width="10%">累计获得金条{{invitationsSum > 50 ? 500 : invitationsSum * 10}}</p>
                </div>
            </div>
        </div>
        <div class="invite_btn" @click="showPoster = true">立即邀请好友</div>
        <div class="poster">
            <div class="share_poster">
                <span>宣传语</span>
                <div class="qrCode"><img src="" alt=""></div>
                <span>宣传语宣传语宣传语</span>
            </div>
        </div>
        <!-- <div class="invite_landing" ref="test">
        <img :src="output" width="100%" v-if="showImages" ref="output"/>
            <div class="box" v-if="!showImages">
              <div class="bg"></div>
              <div class="container" >
                <div class="title">宣传语</div>
                <div class="qrcode" id="qrcode"></div>
                <div class="content">宣传语宣传语宣传语</div>
              </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import {QRCode} from '../../../../plugins/qrcode.js'
import { inviteCode } from '../../../../service/getData'
export default {
    data () {
        return {
            invitationsSum: Number(this.$route.params.invitationsSum),
            showPoster: false,
            qrcode: Object,
            url: '',
            output: null,
            showImages: false
        }
    },
    watch: {

    },
    mounted() {
        //获取我的分享码
        var that = this
        inviteCode().then(res => {
            that.url = res.data
            that.qrcode = new QRCode(document.getElementById('qrcode'), {
                text: that.url,
                width: 150,
                height: 150,
                colorDark: '#000000',
                colorLight: '#ffffff'
            })
            setTimeout(function (){
                if (that.url) {
                  that.print()
                }
            }, 100)
        })
    },
    created() {

    },
    methods: {
        // print() {
        //     const el = this.$refs.test;
        //     const options = {
        //       type: 'dataURL'
        //     }
        //     console.log(this.output)
        //     var that = this
        //     that.$html2canvas(el, options).then(function(result) {
        //       that.showImages = true
        //       that.output = result;
        //     });
        // }
    },
}
</script>
<style lang="scss" scoped>
    @import '../../../../style/mixin';
    .invite {
        background-color: #06020a;
        position: relative;
        .top_head {
            @include wh(100%,3.8rem);
            @include bis('../../../../images/bounty-plan/starry_sky_bg1.png');
            .title {
                @include sc(.185rem, $fc);
                text-align: center;
                padding: .35rem 0 .2rem;
            }
            .box {
                @include sc(.15rem, $g3);
                @include wh(2.79rem,3rem);
                background: $fc;
                box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.51);
                margin: 0 auto;
                border-radius: .1rem;
                padding: .15rem .5rem;
                text-align: center;
                .qrcode {
                    @include wh(1.41rem,1.41rem);
                    border-radius: .05rem;
                    background: #000;
                    margin: 0.32rem auto .18rem;
                }
                .invitationsSum {
                    text-align: left;
                    margin-left: .2rem;
                    p {
                        margin-bottom: .1rem;
                    }
                    img {
                        vertical-align: middle;
                        margin-right: .1rem;
                    }
                }
            }
        }
        .invite_btn {
            @include sc(.15rem, $fc);
            @include wh(2.735rem,.45rem);
            background: #fc5340;
            line-height: .46rem;
            text-align: center;
            margin: .8rem auto 0;
            border-radius: .05rem;
        }
        .poster{
            position: absolute;
            top: 0;
            @include wh(100vw,100vh);
            background: rgba(0, 0, 0, .5);
            .share_poster{
                position: relative;
                top: 0.8rem;
                left: 0;
                @include wh(80%,5rem);
                margin: 0 auto;
                @include bis('../../../../images/bounty-plan/share_poster.png');
                span:first-child{
                    @include sc(.18rem, #333333);
                    position: absolute;
                    top: 1.52rem;
                    left: 1.2rem;
                }
                span:last-child{
                    position: absolute;
                    @include sc(.15rem, #333333);
                    top: 4rem;
                    width: 100%;
                    text-align: center;
                }
                .qrCode{
                    @include wh(1.8rem, 1.8rem);
                    background: #333;
                    position: absolute;
                    top: 2.1rem;
                    left: .62rem;
                }
            }
        }
    }
    .invite_landing {
        overflow: hidden;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        img {
          display: block;
        }
        .box {
          position: relative;
          .bg {
            position: absolute;
            width: 100%;
            @include bis('../../../../images/bounty-plan/share_poster.png');
          }
          .container {
            position: relative;
            z-index: 111;
            margin: 0 auto;
            padding-top: 1.83rem;
            width: 80%;
            text-align: center;
            .title {
              @include sc(.18rem, $g3);
              height: .6rem;
            }
            .content {
              @include sc(.15rem, $g3);
            }
            .qrcode {
              @include wh(2.26rem,2.26rem);
              border-radius: .05rem;
              background: #000;
              margin: 0.12rem auto .05rem;
            }
          }
        }
    }
</style>
