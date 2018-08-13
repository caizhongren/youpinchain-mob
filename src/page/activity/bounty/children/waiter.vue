<template>
  <div class="waiter">
    <div class="waiter_top">
      <div class="container">
        <div v-if="waiter === 'false'">
          <p>客服微信二维码</p>
          <img src="data:image/png;base64,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" alt="" style="display: block; margin: 0px auto; width: 47%;border-radius:.05rem;">
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
        <p style="margin-bottom:.1rem;">按照以下步骤添加微信客服，即可获得500个金条，每人最多可获取一次：</p>
        <p>(1)长按屏幕中的二维码，弹出菜单后，选择“识别图中二维码”；</p>
        <p>(2)将客服加为好友；</p>
        <p>(3)在客服聊天页面输入个人的会员ID；</p>
        <p style="margin-top:.16rem;">温馨提示：</p>
        <p>个人的会员ID可在赏金计划首页，点击左上方<img src="../../../../images/bounty-plan/user_icon_1.png" alt="" style="width: .2rem;
    vertical-align: middle;">进入个人中心页面，找到个人ID复制即可。</p>
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
    background: #fff;
    border-radius: .1rem;
    padding: .05rem 0 .3rem 0;
  }
  .added{
    width: .665rem;
    margin-bottom: .08rem;
  }
  .container div p:first-child{
    font-size: .15rem;
    color: #333333;
    line-height: .4rem;
    border-bottom: 1px solid #dddddd;
    margin-bottom: .14rem;
  }
  .container div p{
    font-size: .15rem;
    color: #333333;
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
  .rule div{
    border-radius: .1rem;
    background: #fff;
    padding: .315rem .325rem .4rem .21rem;
    text-align: justify;
    font-size: .13rem;
    color: #666666;
    line-height: 1.38;
  }
  .rule div p{
    margin-bottom: .06rem;
  }
</style>
