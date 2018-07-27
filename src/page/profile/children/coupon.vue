<template>
  <div class="coupon" v-client-height>
    <head-top head-title="我的优惠券" go-back='true'></head-top>
    <span class="use_rule" @click="showRule()">使用说明</span>
    <div class="no_coupon">暂无可使用的优惠券哦～</div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
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
      
    },
    methods: {
      showRule () {
        alert('暂无优惠信息');
      }
    },
    components: {
      headTop,
      footGuide
    },
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';
  .coupon {
    background-color: $fc;
    display: flex;
    .no_coupon {
      text-align: center;
      margin-top: 2.615rem;
      flex: 1;
      @include sc(.15rem, $g6)
    }
    .use_rule{
      position: absolute;
      z-index: 100;
      right: 0.1rem;
      top: .12rem;
      @include sc(.13rem,#333333);
    }
  }
</style>
