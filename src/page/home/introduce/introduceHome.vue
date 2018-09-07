<template>
  <div class="introduceHome">
    <div class="part_1">
      <ul>
        <li class="border_bg">南京农业大学黄瑞华教授30年精心培育，科学养殖打造“一家杀猪百家香”的优质猪种。</li>
        <li class="border_bg">养殖环境全程可控，先进的养殖环境与设施既确了保猪生长环境的可控性，也可以不断优化猪舍环境。</li>
        <li class="border_bg">饲料无抗生物发酵，不添加激素、抗生素等。添加微生物菌剂，增强生猪的抵抗力，对于疫苗严格按照免疫程序进行接种。根据不同日龄猪实行标准化、程序化添加，以改善肉质。</li>
        <li class="border_bg">由专业屠宰企业进行规范化屠宰、冷链排酸后，通过冷链物流运到位于智慧谷的规范化分割包装加工间，由专业小刀手进行细分割，并采用先进的密封小包装。 </li>
      </ul>
    </div>
    <div class="part_2">
      <div class="goods">
        <p>腿肉500g*1份</p>
        <p>原价：￥58.00</p>
        <p>预售价：￥<span>40</span>.00/500g</p>
        <p>立即购买</p>
      </div>
      <div class="goods goods_2">
        <p>五花500g*1份</p>
        <p>原价：￥58.00</p>
        <p>预售价：￥<span>40</span>.00/500g</p>
        <p>立即购买</p>
      </div>
    </div>
    <div class="part_3">
      <ul>
        <li>
          <div class="title">肉鲜味美，重拾儿时的味道！</div>
          <p>无抗猪肉，使用无抗生物发酵饲料饲养，内脏吃得放心，更适合孕妇、儿童；</p>
          <p>生长周期8-10个月；</p>
          <p>营养丰富，富含氨基酸、蛋白质、不饱和脂肪酸等营养物质；</p>
          <p>肌内脂含量高，肉嫩多汁、适口性强，真正小时候猪肉的味道</p>
        </li>
        <li>
          <img src="../../../images/store/introduce_03.png" alt="">
          <div class="title">肉鲜味美，重拾儿时的味道！</div>
          <p>专业冷链仓储，严控温度区间；专业冷链保温箱，环保降解专用袋，为新鲜品质保驾护航最后一公里。</p>
        </li>
      </ul>
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
  .introduceHome {
    background: $fc;
    .part_1{
      ul{
        padding: .3rem .47rem .35rem;
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
    .part_2{
      .goods{
        @include wh(100%, 5.8rem);
        @include bis('../../../images/store/introduce_01.png');
        background-color: $bc;
        background-position: 0 .4rem;
        background-size: 100% auto;
        text-align: center;
        p{
          margin-bottom: .04rem;
        }
        p:first-child{
          padding-top: 4.2rem;
          @include sc(.2rem, $g3);
        }
        p:nth-child(2){
          @include sc(.15rem, $g9);
        }
        p:nth-child(3){
          @include sc(.17rem, $g3);
          span{
            font-size: .25rem;
          }
        }
        p:last-child{
          border-radius: .15rem;
          background-color: #e73525;
          line-height: .325rem;
          height: .325rem;
          width: 1rem;
          margin: 0 auto;
          @include sc(.15rem, $fc);
          margin-top: .12rem;
        }
      }
      .goods_2{
        @include bis('../../../images/store/introduce_02.png');
        background-size: 100% auto;
        @include wh(100%, 6.3rem);
      }
    }
    .part_3{
      background: $fc;
      padding-bottom: .3rem;
      ul{
        li:nth-child(even){
          background: $bc;
        }
        li:nth-child(2){
          img{
            width: 100%;
            display: block;
          }
          p:last-child{
            padding-bottom: .4rem;
            margin-bottom: 0;
          }
        }
        li{
          background: $fc;
          p{
            @include sc(.13rem, $g6);
            padding: 0 .29rem;
            margin-bottom: .1rem;
            text-align: justify;
          }
          p:last-child{
            margin-bottom: .25rem;
          }
        }
      }
      .title{
        @include sc(.2rem, $g3);
        text-align: center;
        padding: .3rem 0;
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

