<template>
    <div class="feeding">
      <div class="header">
        <p class="line"></p>
        <p class="text">饲料可控，由国内专业化饲料企业定制无抗、低矿、高纤维生物发酵饲料喂养，保证了苏淮猪“舌尖上的安全”。</p>
        <ul>
          <li class="left"><img src="../../../images/store/feeding_01.png" width="98%"></li>
          <li class="right text-right"><img src="../../../images/store/feeding_02.png" width="98%" class="right"></li>
        </ul>
      </div>
      <div class="part1">
        <p class="title">黑猪日常</p>
        <p class="text">松、舒适、愉悦的生活状态，保障猪的健康生长发育。</p>
        <ul>
          <li><img src="../../../images/store/feeding_03.png" width="75%"></li>
          <li><p class="bg"></p><img src="../../../images/store/feeding_04.png" width="75%"></li>
        </ul>
      </div>
      <div class="part1 part1_2">
        <p class="title">屠宰设备安全</p>
        <p class="text">委托大型屠宰企业进行专业化屠宰加工、排酸处理。排酸后，通过冷链物流运到位于智慧谷的规范化的分割包装加工间。聘请专业小刀手进行细分割，并采用先进的密封小包装，确保肉嫩、多汁，成为老百姓餐桌上的佳肴。</p>
        <ul>
          <li class="padding-t-7"><p class="bg"></p><img src="../../../images/store/feeding_05.png" width="75%"></li>
          <li><img src="../../../images/store/feeding_06.png" width="75%"></li>
        </ul>
      </div>
      <div class="part1 part1_3">
        <ul>
          <li><img src="../../../images/store/feeding_07.png" width="95%"></li>
          <li><img src="../../../images/store/feeding_08.png" width="95%"></li>
        </ul>
        <p class="text">规范、干净、整洁的加工操作</p>
      </div>
      <div class="part2">
        <p class="title">权威认证</p>
        <img src="../../../images/store/feeding_09.png" width="90%">
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
    .text-right {
      text-align: right;
    }
    .padding-t-7 {
      padding-top: .7rem;
    }
    .feeding {
      .title {
        @include sc(.2rem,$g3);
        text-align: center;
        padding-top: .15rem;
      }
      .text {
        @include sc(.13rem, $g6);
        line-height: 1.38;
        text-align: justify;
        width: 86%;
        margin: 0.2rem auto;
      }
       .header {
         padding-top: .25rem;
         background: $fc;
         .text {
           line-height: 1.54;
         }
         .line {
           width: 75%;
           margin: 0 auto;
           position: relative;
           border: solid 1px #dddddd;
           &:before {
            content: '';
            display: block;
            border-width: 5px;
            position: absolute;
            top: -.1rem;
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
            top: -.08rem;
            right: 48%;
            border-style: solid dashed dashed;
            border-color: transparent transparent $fc;
            font-size: 0;
            line-height: 0;
            z-index: 0;
          }
         }
         ul {
           overflow: hidden;
           li {
             width: 50%;
             img {
               display: block;
             }
           }
         }
       }
       .part1 {
         background: $bc;
         ul {
           margin: 0 auto;
           text-align: center;
           li {
              position: relative;
              z-index: 1;
              padding-bottom: .12rem;
              img {
                position: relative;
                z-index: 1;
              }
           }
         }
         .bg {
           @include wh(100%,1.29rem);
           background-color: #babdc2;
           position: absolute;
           z-index: 0;
           top: .4rem;
         }
       }
       .part1_2 {
         .bg {
           top: 0;
         }
       }
       .part1_3 {
         padding-bottom: .3rem;
         ul {
           overflow: hidden;
            width: 77%;
            padding-top: .5rem;
            li {
              width: 50%;
              float: left;
            }
         }
         .text {
           width: 100%;
           text-align: center;
         }
       }
       .part2 {
         background: $fc;
         margin: 0 auto;
         text-align: center;
         img {
           margin: .25rem auto .35rem;
         }
       }
    }
</style>

