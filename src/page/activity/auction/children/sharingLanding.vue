<template>
    <div class="sharingLanding">
        <img src="https://heizhu360.datbc.com/pic/storage/storage/fetch?key=wjq1mvxvnidhm6sdid0s" width="100%">
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
            document.title = '苏淮猪腿肉速来抢'
        },
        methods: {
            help (auctionId,vipId) {
                var that = this
                help(auctionId,vipId).then(function (res) {
                    console.log(res.errmsg)
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
        padding-bottom: .49rem;
        img {
            display: block;
        }
        .text {
            @include sc(.11rem,$g3);
            opacity: 0.8;
            line-height: 1.54;
            letter-spacing: 0.4px;
            text-align: justify;
            width: 80%;
            margin: 0 auto;
            position: absolute;
            font-weight: bold;
            left: 10%;
            bottom: 8.3%;
            transform: scale(.94) translateX(-.08rem);
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
