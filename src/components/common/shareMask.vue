<template>
  <div class="share_mask" v-client-height @click="$parent.showShare = false">
    <img src="../../images/share-arrow.png" class="right" height="12%">
    <p class="text right">点击 <span>...</span> 分享给好友</p>
  </div>
</template>
<script>
  export default {
    name: 'shareMask',
    data () {
      return {
      }
    },
    props: ['showShare'],
    watch: {
    },
    mounted() {
      
    },
    created() {
      
    },
    methods: {

    },
    components: {
    },
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';
  .share_mask {
    background-color: rgba(0,0,0,.9);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    padding: 0.1rem .28rem;
    .text {
      @include sc(.18rem, $fc);
      width: 100%;
      text-align: right;
      span {
        font-weight: bold;
        font-size: .35rem;
        position: relative;
        top: -2px;
      }
    }
  }
</style>
