<template>
	<div class="poster">
		<div class="share_poster">
            <span>宣传语</span>
            <div class="qrCode"><img src="" alt=""></div>
            <span>宣传语宣传语宣传语</span>
        </div>
	</div>
</template>

<script>
	import { inviteCode } from '../../../../service/getData'
	export default {
	    data () {
	        return {
	            
	        }
	    },
	    watch: {

	    },
	    mounted() {
	        //获取我的分享码
	        var that = this
	        inviteCode().then(res => {
	            // that.data = res.data
	        })
	    },
	    created() {

	    },
	    methods: {

	    },
	}
</script>

<style lang="scss" scoped>
	@import '../../../../style/mixin';
	.share_poster{
        position: absolute;
        top: 0;
        left: 0;
        @include wh(100%,6.67rem);
        @include bis('../../../../images/bounty-plan/share_poster.png');
        span:first-child{
            @include sc(.18rem, #333333);
            position: absolute;
            top: 2.04rem;
            left: 1.4rem;
        }
        span:last-child{
            @include sc(.15rem, #333333);
            position: absolute;
            top: 5.3rem;
            width: 100%;
            text-align: center;
        }
        .qrCode{
            @include wh(2.26rem, 2.26rem);
            background: #333;
            position: absolute;
            top: 2.8rem;
            left: .8rem;
        }
    }
</style>