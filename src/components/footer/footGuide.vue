<template>
    <section id='foot_guide'>
        <section @click = "gotoAddress({path: '/home'})" class="guide_item" :class="[$route.path.indexOf('home') !== -1 ? 'icon1_style' : 'icon1_style2']">
        	<a></a>
          <span>首页</span>
        </section>
        <section @click = "gotoAddress({path: '/cart'})" class="guide_item" :class="[$route.path.indexOf('cart') !== -1 ? 'icon2_style' : 'icon2_style2']">
        	<a class="position-re"><b class="red-points">{{cart_num}}</b></a>
          <span>购物车</span>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item" :class="[$route.path.indexOf('profile') !== -1 ? 'icon3_style' : 'icon3_style2']">
        	<a></a>
          <span>我的</span>
        </section>
    </section>
</template>

<script>
  export default {
    data(){
      return{
        cart_num: 8
      }
    },
    created(){
        
    },
    mounted(){
        
    },
    computed: {
    },
    methods: {
      gotoAddress(path){
        this.$router.push(path)
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #foot_guide{
    background-color: #f7f7fa;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, .49rem);
    display: flex;
    border-top: 2px solid #efeff4;
  }
  .guide_item{
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    span{
      @include sc(.1rem, #e4372e);
    }
  }
  .icon1_style, .icon2_style, .icon3_style, .icon1_style2, .icon2_style2, .icon3_style2 {
    a {
      margin-top: .06rem;
      @include wh(.22rem, .22rem);
      display: inline-block;
      @include bis('../../images/tab-home-highlight.png')
    }
  }
  .icon2_style a {
    @include bis('../../images/tab-buy-highlight.png')
  }
  .icon3_style a {
    @include bis('../../images/tab-mine-highlight.png')
  }
  .icon1_style2 a {
    @include bis('../../images/tab-home-normol.png')
  }
  .icon2_style2 a {
    @include bis('../../images/tab-buy-normal.png')
  }
  .icon3_style2 a {
    @include bis('../../images/tab-mine-normal.png')
  }
  .icon1_style2, .icon2_style2, .icon3_style2 {
    span {
      color: #7f8389;
    }
  }
</style>
