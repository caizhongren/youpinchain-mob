<template>
  <header id='head_top'>
    <section class="head_goback" v-if="goBack" @click="$parent.showShare = false,$router.go(-1)">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:#999;stroke-width:2"/>
      </svg>
    </section>
    <section v-if='isShare' class="head_share" @click="$parent.showShare = true">
      <img src="../../images/share-icon.png" alt="" width="100%">
    </section>
    <section class="title_head ellipsis">
      <span class="title_text">{{headTitle}}</span>
    </section>
  </header>
</template>

<script>
  export default {
    data(){
      return{
        showShare: false
      }
    },
    mounted(){
    },
    props: ['isShare', 'headTitle', 'goBack'],
    computed: {
    },
    methods: {
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  #head_top{
    background-color: $fc;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, .45rem);
    border-bottom: 1px solid $bc;
  }
  .head_goback{
    @include wh(0.12rem, .2rem);
    line-height: .56rem;
    margin-left: .08rem;
  }
  .head_share{
    right: 0.11rem;
    @include ct;
    @include wh(.205rem, .195rem);
  }
  .title_head{
    @include center;
    width: 50%;
    color: $g3;
    text-align: center;
    .title_text{
      @include sc(0.16rem, $g3);
      text-align: center;
    }
  }
</style>
