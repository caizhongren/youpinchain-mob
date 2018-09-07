<template>
    <div class="growth">
      <div class="header part">
        <img src="../../../images/store/growth_01.png" width="100%">
        <div class="text">猪场位于淮安市现代农业科技示范园内，是一所占地约3500平方米的智慧型现代化猪场。猪场运用现代化的设施设备不断优化猪舍环境，确保猪生长环境的可控性。</div>
      </div>
      <div class="part part2">
        <p class="title">现代化智能示范级养殖基地</p>
        <div class="text">超声波雾化消毒，高度自动化，智能单向消毒，雾滴立体全面包裹被消毒对象，实现立体无死角消毒，保证猪舍安全放心</div>
        <img src="../../../images/store/growth_02.png" width="22%">
      </div>
      <div class="part part3">
        <div class="text left">自动刮粪系统及保温型粪尿异位发酵处理系统等设施设备，利用生态发酵床养殖，猪的排泄物通过微生物分解，可以实现无异味、无污染，给猪营造一个舒适的生活环境，避免猪易生病</div>
      </div>
      <div class="part part4">
        <img class="left" src="../../../images/store/growth_03.png" width="56%">
        <div class="text right">生猪饲养于南京农业大学淮安研究院试验猪场，猪场采用异位发酵床与原位发酵床两种饲养模式，完全符合要求。</div>
      </div>
      <div class="part part5">
        <div class="text left">猪场引进了种猪性能测定系统、空气源热泵地暖工程系统、新型节水型自动饮水系统、全自动超声雾化消毒系统、手机APP实时监控系统、全自动刮粪系统及保温型粪尿异位发酵处理系统等设施设备，使苏淮猪过着“贵族”般的生活。</div>
        <img class="right" src="../../../images/store/growth_04.png" width="36%">
      </div>
      <div class="part part6">
        <img class="left" src="../../../images/store/growth_05.png" width="56%">
        <div class="text right">生长性能测定站</div>
      </div>
      <div class="part part7">
        <div class="text left">空气源热泵地暖</div>
        <img class="right" src="../../../images/store/growth_06.png" width="56%">
      </div>
      <div class="part part8">
        <img class="left" src="../../../images/store/growth_07.png" width="56%">
        <div class="text right">监控系统</div>
      </div>
    </div>
</template>
<script>
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
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
    @import '../../../style/mixin';
    .growth {
      background: #fcfbfc;
      padding-bottom: .85rem;
      .text {
        @include sc(.13rem,$g6);
        line-height: 1.38;
        text-align: justify;
        margin: 0 auto;
      }
      .part:nth-child(odd) {
        background: $fc;
      }
      .part:nth-child(even) {
        background: $bc;
      }
      .header {
        padding: .3rem 0 .25rem;
        position: relative;
        .text {
          width: 85%;
          line-height: 1.54;
        }
        img {
          position: relative;
          z-index: 1;
          margin-bottom: .4rem;
        }
        &:before {
          content: '';
          display: block;
          border-width: 5px;
          position: absolute;
          top: .2rem;
          right: 48%;
          border-style: solid dashed dashed;
          border-color: transparent transparent $gd;
          z-index: 0;
        }
        &:after {
          content: '';
          display: block;
          border-width: 5px;
          position: absolute;
          top: .21rem;
          right: 48%;
          border-style: solid dashed dashed;
          border-color: transparent transparent $fc;
          font-size: 0;
          line-height: 0;
          z-index: 0;
        }
      }
      .part2 {
        position: relative;
        padding: .25rem 0 .5rem;
        .title {
          @include sc(.2rem,$g3);
          text-align: center;
          padding-bottom: .25rem;
        }
        .text {
          width: 85%;
        }
        img {
          position: absolute;
          bottom: -.9rem;
          right: .2rem;
        }
      }
      .part3 {
        padding: .2rem 0.25rem .35rem;
        overflow: hidden;
        .text {
          width: 60%;
        }
      }
      .part4, .part5 {
        overflow: hidden;
        padding: .35rem .25rem 0.2rem;
        .text {
          width: 45%;
        }
      }
      .part4 {
        img {
          margin: -.1rem 0 0 -.12rem;
        }
        .text {
          margin: .05rem 0 0 .15rem;
          width: 38%;
        }
      }
      .part5 {
        img {
          margin: -.2rem .1rem 0 -.12rem;
        }
        .text {
          margin: .05rem 0 0 .15rem;
        }
      }
      .part6, .part7, .part8 {
        overflow: hidden;
        background: #f7f7f7 !important;
        .text {
          width: 44%;
          margin-top: .63rem;
          text-align: center
        }
      }
      .part7 {
        background: #fcfbfc !important;
      }
    }
</style>

