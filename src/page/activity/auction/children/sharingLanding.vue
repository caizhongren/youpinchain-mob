<template>
    <div class="sharingLanding">
        分享落地页
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
                        that.partIn()
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
    .sharingLanding {}
</style>
