<template>
  <div class="waiter">
    <div class="waiter_top">
      <div class="container">
        <div v-if="waiter === 'false'">
          <p>客服微信二维码</p>
          <img src="../../../../images/bounty-plan/waiter_qrCode.png" alt="" style="display: block; margin: 0px auto; width: 47%;border-radius:.05rem;">
        </div>
        <div v-if="waiter === 'true'">
          <p>客服微信二维码</p>
          <img src="../../../../images/bounty-plan/already_added.png" alt="" class="added">
          <p><span></span>任务完成！</p>
          <p>您已经成功领取了奖励～</p>
        </div>
      </div>
    </div>
    <div class="rule">
      <div>
        <p style="margin-bottom:.1rem;">按照以下步骤添加微信客服，即可获得20个金条，每人最多可获取一次：</p>
        <p>(1)长按屏幕中的二维码，弹出菜单后，选择“识别图中二维码”；</p>
        <p>(2)将客服加为好友；</p>
        <p>(3)在客服聊天页面输入个人的会员ID；</p>
        <p style="margin-top:.16rem;">温馨提示：</p>
        <p>个人的会员ID可在赏金计划首页，点击左上方<img src="../../../../images/bounty-plan/user_icon_1.png" alt="" style="width: .2rem;margin: 0 .04rem;">进入个人中心页面，找到个人ID复制即可。</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        waiter: ''
      }
    },
    watch: {

    },
    mounted() {
      
    },
    created() {
      this.waiter = (this.$route.query.waiter).toString()
    },
    methods: {

    },
  }
</script>
<style lang="scss" scoped>
  @import '../../../../style/mixin';
  .waiter{
    background-color: #06020a;
    min-height: 100vh;
  }
  .waiter_top{
    height: 3.1rem;
    background: url(../../../../images/bounty-plan/starry_sky_bg1.png) no-repeat;
    background-size: 100%;
    background-position-y: -.4rem;
  }
  .container{
    width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-bottom: .3rem; 
    padding-top: .4rem;
  }
  .container div{
    background: $fc;
    border-radius: .1rem;
    padding: .05rem 0 .3rem 0;
  }
  .added{
    width: .665rem;
    margin-bottom: .08rem;
  }
  .container div p:first-child{
    font-size: .15rem;
    color: $g3;
    line-height: .4rem;
    border-bottom: 1px solid $gd;
    margin-bottom: .14rem;
  }
  .container div p{
    font-size: .15rem;
    color: $g3;
    line-height: 1.6;
  }
  .container div p span{
    display: inline-block;
    width: .14rem;
    height: .14rem;
    background: url(../../../../images/bounty-plan/finished.png);
    background-size: cover;
    margin-bottom: -.02rem;
    margin-right: .04rem;
  }
  .rule{
    padding-bottom: .2rem;
  }
  .rule div{
    border-radius: .1rem;
    background: $fc;
    padding: .315rem .325rem .3rem .21rem;
    text-align: justify;
    color: $g6;
    line-height: 1.38;
  }
  .rule div p{
    margin-bottom: .06rem;
    font-size: .13rem;
  }
</style>
