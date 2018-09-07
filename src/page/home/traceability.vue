<template>
  <div class="traceability">
    <div class="top">
      黑猪界的贵族&nbsp;•&nbsp;舌尖上的美味！
    </div>
    <div class="part_1">
      <ul>
        <li class="border_bg">南京农业大学黄瑞华教授30年精心培育，科学养殖打造“一家杀猪百家香”的优质猪种。</li>
        <li class="border_bg">养殖环境全程可控，先进的养殖环境与设施既确了保猪生长环境的可控性，也可以不断优化猪舍环境。</li>
        <li class="border_bg">饲料无抗生物发酵，不添加激素、抗生素等。添加微生物菌剂，增强生猪的抵抗力，对于疫苗严格按照免疫程序进行接种。根据不同日龄猪实行标准化、程序化添加，以改善肉质。</li>
        <li class="border_bg">由专业屠宰企业进行规范化屠宰、冷链排酸后，通过冷链物流运到位于智慧谷的规范化分割包装加工间，由专业小刀手进行细分割，并采用先进的密封小包装。 </li>
      </ul>
    </div>
    <div class="growth">
      <div class="header part part1">
        <img src="../../images/store/growth_01.png" width="100%">
        <p class="title">生长环境</p>
        <div class="text">猪场位于淮安市现代农业科技示范园内，是一所占地约3500平方米的智慧型现代化猪场。猪场运用现代化的设施设备不断优化猪舍环境，确保猪生长环境的可控性。</div>
      </div>
      <div class="part part6">
        <img class="left" src="../../images/store/growth_05.png" width="56%">
        <div class="text right">生长性能测定站</div>
      </div>
      <div class="part part7">
        <div class="text left">空气源热泵地暖</div>
        <img class="right" src="../../images/store/growth_06.png" width="56%">
      </div>
      <div class="part part8">
        <img class="left" src="../../images/store/growth_07.png" width="56%">
        <div class="text right">监控系统</div>
      </div>
      <div class="part part7">
        <div class="text left multiline">自动刮粪系统及保温型粪尿异位发酵处理系统等设施设备</div>
        <img class="right" src="../../images/store/growth_08.png" width="56%">
      </div>
      <div class="part part6">
        <img class="left" src="../../images/store/growth_09.png" width="56%">
        <div class="text right">环境监测</div>
      </div>
    </div>
    <div class="source">
      <p class="title">成长溯源</p>
      <ul>
        <li v-for="item in pigMsgList">
          <img :src="item.imgUrl" alt="">
          <div>
            <p>{{item.msg1}}</p>
            <p>{{item.msg2}}<br>{{item.msg3}}</p>
          </div>
        </li>
      </ul>
      <img src="../../images/store/growth_14.png" alt="" width="100%">
    </div>
    <div class="part_bottom">
      <div class="part">
        <div class="title">屠宰车间</div>
        <p>配备了先进的生猪屠宰、肉制品加工设备（关键设备均从欧美等国进口）和产品质量安全检测设备。占地面积208亩,拥有10000吨低温冷库和1000吨预冷库、急冻库。</p>
      </div>
      <div class="part">
        <div class="title">检测报告</div>
        <img src="../../images/store/test_report.png" alt="" width="90%">
        <img src="../../images/store/feeding_09.png" alt="" width="90%">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        pigMsgList: [{
          msg1: '出生保育',
          msg2: '2月5日-6月3日',
          msg3: '淮阴种猪场',
          imgUrl: require('../../images/store/growth_10.png')
        },
        {
          msg1: '育肥出栏',
          msg2: '6月14日',
          msg3: '转栏至南农大淮安研究院试验猪场',
          imgUrl: require('../../images/store/growth_11.png')
        },
        {
          msg1: '屠宰排酸',
          msg2: '9月17日',
          msg3: '江苏淮安苏食肉品有限公司',
          imgUrl: require('../../images/store/growth_12.png')
        },
        {
          msg1: '分割包装',
          msg2: '9月18日',
          msg3: '南农大淮安研究院',
          imgUrl: require('../../images/store/growth_13.png')
        },]
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
  }
</script>
<style scoped lang="scss">
  @import '../../style/mixin';
  .traceability{
    background: #fff;
    .top{
      @include wh(100%, 3.285rem);
      @include bis('../../images/store/traceability_banner.png');
      text-align: center;
      @include sc(.21rem, #fff);
      line-height: 3.285rem;
    }
    .part_1{
      ul{
        padding: .4rem .47rem .35rem;
        li{
          margin-top: .3rem;
          border-top: 1px solid $gd;
          padding-top: .1rem;
          @include sc(.13rem, $g6);
          text-align: justify;
        }
        li:first-child{
          margin-top: 0rem;
        }
      }
    }
    .growth {
      background: #efeff4;
      padding-bottom: .375rem;
      .text {
        @include sc(.13rem,$g6);
        line-height: 1.38;
        text-align: justify;
        margin: 0 auto;
      }
      .part{
        background: #efeff4;
      }
      .header {
        padding: 0rem 0 .25rem;
        position: relative;
        .text {
          width: 85%;
          line-height: 1.54;
        }
        img {
          position: relative;
          z-index: 1;
          margin-bottom: .3rem;
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
      .part1{
        .title {
          @include sc(.2rem,$g3);
          text-align: center;
          padding-bottom: .3rem;
        }
        .text{
          margin-bottom: .34rem;
        }
      }
      .part2{
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
        .multiline{
          margin-top: .46rem;
          padding: 0 .2rem;
          text-align: left;
        }
      }
      .part7 {
        background: #fcfbfc !important;
      }
    }
    .source{
      .title{
        @include sc(.2rem, #333333);
        padding: .3rem 0;
        text-align: center;
      }
      ul{
        padding: 0 .385rem .2rem .12rem;
        li{
          overflow: hidden;
          margin-bottom: .255rem;
          img{
            @include wh(1.5rem, .98rem);
            float: left;
          }
          div{
            width: 1.56rem;
            height: 1rem;
            float: right;
            position: relative;
            p:first-child{
              @include sc(.15rem, #333333);
              margin-top: .04rem;
            }
            p:last-child{
              @include sc(.13rem, #666666);
              position: absolute;
              bottom: 0;
              line-height: 1.38;
            }
          }
        }
      }
    }
    .part_bottom{
      .part{
        background: #fff;
        padding-bottom: .6rem;
        .title{
          font-size: 0.2rem;
          color: #333;
          text-align: center;
          padding: .3rem 0;
        }
        img{
          width: 3.06rem;
          margin: 0 auto;
        }
        p{
          @include (.13rem, #666666);
        }
      }
      .part:first-child{
        background: #efeff4;
      }
    }
  }
  .border_bg{
    position: relative;
    &:before{
      content: '';
      @include wh(.06rem, .06rem);
      position: absolute;
      border-top: 1px solid $gd;
      border-left: 1px solid $gd;
      background: $fc;
      transform:rotate(45deg);
      left: 50%;
      top: -.04rem;
      z-index: 1;
    }
  }
</style>
