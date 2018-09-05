<template>
    <div class="sharingLanding" v-client-height>
        <p class="text">关注公众号“链上臻品”，点击底部菜单【限时竞拍】即可参与竞拍活动</p>
        <div class="btn" @click="partIn">我也要参与</div>
    </div>
</template>
<script>
    import { help } from '../../../../service/getData'
    export default {
        data () {
            return {
            }
        },  
        watch: {
        },
        mounted() {
        },
        created() {
            this.help(this.$route.params.auctionId, this.$route.params.vipId)
        },
        methods: {
            help (auctionId,vipId) {
                var that = this
                help(auctionId,vipId).then(function (res) {
                    if (res && res.errno === 0) {
                        alert(res.errmsg)
                    } else {
                        alert(res.errmsg)
                    }
                })
            },
            partIn () {
                window.location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3ODY4MTc3Mw==#wechat_redirect'
            }
        },
        components: {
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../../style/mixin';
    .sharingLanding {
        @include bis('../../../../images/auction/sharing-landing-bg.png');
        background-size: 100%;
        background-position-y: -0.6rem;
        padding-bottom: .49rem;
        .text {
            @include sc(.13rem,$fc);
            line-height: 1.54;
            letter-spacing: 0.4px;
            text-align: justify;
            width: 80%;
            margin: 0 auto;
            position: absolute;
            left: 10%;
            bottom: 21%;
        }
        .btn {
            @include sc(.15rem,$fc);
            @include wh(100%,.49rem);
            line-height: .5rem;
            text-align: center;
            background-image: linear-gradient(133deg, #fc5b46, #fa424f);
            position: fixed;
            bottom: 0;
        }
    }
</style>
