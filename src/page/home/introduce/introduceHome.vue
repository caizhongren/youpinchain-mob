<template>
  <div class="introduceHome">
    <div class="part_1">
      <ul>
        <li class="border_bg">科学家团队养殖。苏淮猪养殖方法由南京农业大学黄瑞华教授团队30年潜心研究，饲养人员为农业大学硕士以上学历，保障科学健康养殖。</li>
        <li class="border_bg">国际顶级的生长环境。智能化恒温宿舍，进口全自动饲养设备，国际顶尖科研级设备全天候精准监测猪的生长与环境数据，精心呵护苏淮猪的生活品质。</li>
        <li class="border_bg">专家团队贴身护理。专家团队每天研究分析猪的生长性能数据，科学化计算配备采食量、料肉比。饲料不添加激素、不含抗生素，保证无抗绿色健康肉质。</li>
        <li class="border_bg">由专业屠宰企业进行规范化屠宰、冷链排酸后，通过冷链物流运到位于智慧谷的规范化分割包装加工间，由专业小刀手进行细分割，并采用先进的密封小包装。 </li>
      </ul>
    </div>
    <div class="part_2">
      <div class="goods" v-for="item in productList">
        <div class="abstract"><strong>·</strong>&nbsp;&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;<strong>·</strong></div>
        <img :src="item.thumbnailPic" alt="" class="" :class="{'noImage': !item.thumbnailPic}">
        <p>{{item.name}}{{item.netContent}}*1{{item.packing}}</p>
        <p>原价：￥{{item.originalPrice | number}}</p>
        <p>预售价：￥<span>{{item.presentPrice | number}}</span>/{{item.netContent}}</p>
        <router-link tag="p" :to="'/goods/' + item.id">立即购买</router-link>
      </div>
      <div class="load_more"><router-link tag="button" to="/">查看更多商品</router-link></div>
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
  import { productHotList } from '../../../service/getData'
  export default {
    data () {
      return {
        productList: null,
      }
    },
    watch: {

    },
    mounted() {
      var that = this
      productHotList(1,2).then(function (res) {
        that.productList = res.data.productList
      })
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
      padding-bottom: .5rem;
      background-color: #efeff4;
      .load_more{
        border-top: 1px solid #f8f8f8;
        padding: .2rem 0;
        background: $fc;
        button{
          width: 35%;
          height: 0.28rem;
          font-size: 0.14rem;
          color: #e4372e;
          background-color: #fff;
          margin: 0rem auto;
          text-align: center;
          line-height: .28rem;
          border-radius: 15px;
          border: 1px solid #e4372e;
          display: block;
        }
      }
      .goods{
        @include wh(100%, 5.8rem);
        @include bis('../../../images/store/introduce_bg.png');
        background-color: $bc;
        background-position: 0 .4rem;
        background-size: 100% auto;
        text-align: center;
        img{
          @include wh(2.2rem, 2.2rem);
          display: block;
          margin: 0 auto;
          padding-top: .9rem;
        }
        .abstract{
          @include sc(.2rem ,#fcfbfc);
          padding-top: .4rem;
          font-weight: bold;
          line-height: .5rem;
          strong{
            font-size: .4rem;
            vertical-align: middle;
            line-height: 0.5rem;
          }
        }
        p{
          margin-bottom: .04rem;
        }
        p:nth-child(3){
          padding-top: .2rem;
          @include sc(.2rem, $g3);
        }
        p:nth-child(4){
          @include sc(.15rem, $g9);
        }
        p:nth-child(5){
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

