<template>
  <div class="goods">
    <head-top class="header" go-back='true' is-share="true" :showShare="showShare" :headTitle="headTitle"></head-top>
    <div class="top_main">
      <carousel :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="5" :paginationSize="8" :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color">
        <slide v-for="item in goods.headPic" :key="item.id">
          <img :src="item" alt="" width="100%" class="show">
        </slide>
      </carousel>
      <div class="presell_box" v-if="goods.preSale">
        <div class="left_price left">
          <p class="price"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
          <p class="tip">商品预售预计{{goods.presellTime | dateCharacter}}发货</p>
        </div>
        <div class="right_tip right">
          <p>预售</p>
          <p>北京地区专供</p>
        </div>
      </div>
      <div class="title">
        <p class="price" v-if="!goods.preSale"><span>￥</span>{{goods.presentPrice}} <s>￥{{goods.originalPrice}}</s></p>
        <p class="name"><span class="presell_text" v-if="goods.preSale">【预售】</span>{{goods.name}}</p>
        <p class="desr">{{goods.describe}}</p>
      </div>
    </div>
    <div class="goods_info">
      <div class="info_title">商品详情</div>
      <!--<div class="info_content" v-html="goods.Desc"></div>-->
      <div class="info_content">
        <p>品名：{{goods.name}}</p>
        <p>净含量：{{goods.netContent}}</p>
        <p>包装形式：{{goods.packing}}</p>
        <p>保存状态：{{goods.storage}}</p>
        <p>保存期限：{{goods.qualityGuaranteePeriod}}</p>
        <p>温馨提示：打开包装后尽快食用，未使用部分冷冻保存。</p>
      </div>
      <!-- <div>
        <img v-for="item in goods.footPic" :src="item" alt="" width="100%" class="show">
      </div> -->
    </div>
    <div class="certificates">
      <p class="abstract">证件资质</p>
      <ul>
        <router-link tag="li" to="/credentials/#anchor0"><img src="../../images/store/credentials_1.png" alt=""><p>检疫证</p></router-link>
        <router-link tag="li" to="/credentials/#anchor1"><img src="../../images/store/credentials_2.png" alt=""><p>合格证</p></router-link>
        <router-link tag="li" to="/credentials/#anchor2"><img src="../../images/store/credentials_3.png" alt=""><p>经营许可证</p></router-link>
      </ul>
    </div>
    <div class="description_detail">
      <img class="abstractImg" src="../../images/store/Impression_bg.png" alt="">
      <ul>
        <li><p>腿肉</p><p>柔滑有胶质感，肥瘦适中，肥而不腻，瘦而不柴</p></li>
        <li v-if="goods.preSale">
          <p class="abstract">预售说明</p>
          <p>为保证新鲜，苏淮猪现杀发货，用户即日起可下单购买，9月19日开始发货。本批数量有限，售完为止。</p>
        </li>
        <li>
          <p class="abstract">物流说明</p>
          <div class="tip">（以下时效是以快递发出后计算）</div>
          <p>江浙沪全程顺丰冷链包邮，正常时效48小时内送达；北京地区用户下单后，物流先从淮安以冷链车运送到京，到京后同城快递次日达。<br>(快递高峰期会有所延误)</p>
        </li>
        <li>
          <p class="abstract">售后说明</p>
          <p>商品无质量问题不支持无理由退货及拒收。为保障您的权益，请您签收时务必配送人员当面签收验货，确认无误再进行签收。如出现商品配送有误、包装破损、商品腐烂、数量不对等问题，请在收到商品之时48小时内联系客服，并提交商品完整照片并说明问题，我们将及时为您售后处理</p>
        </li>
      </ul>
    </div>
    <div class="add_cart_container">
      <router-link class="cart_icon_num left" :to="'/cart'">
        <div class="icon"><span class="red-points">{{cart_num}}</span></div>
      </router-link>
      <div class="cart_btn right" @click="addCartList(goods)">加入购物车</div>
    </div>
    <share-mask v-if="showShare" :showShare="showShare"></share-mask>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import shareMask from 'src/components/common/shareMask'
  import headTop from 'src/components/header/head'
  import { ModalHelper } from '../../service/Utils'
  import { showBack } from 'src/config/mUtils'
  import {addToCart,getProductDetail,cartProductCount} from '../../service/getData'
  export default {
    data(){
      return{
        showShare: false,
        headTitle: '',
        goodsid:'',
        goods: {
        },
        cart_num: 0,
        number: [1, 2, 3, 4, 5],
        pagination: {
          activeColor: '#e4372e',
          color: '#fff'
        }
      }
    },
    watch: {
      'showShare': function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted(){
      this.goodsid = this.$route.params.goodsid;
      this.initData();
      this.initCartCount();
    },
    components:{
      Carousel,
      Slide,
      shareMask,
      headTop
    },
    computed:{
    },
    methods:{
      initData () {
        var that = this;
          getProductDetail(that.goodsid).then(res =>{
              if (res.errno !== 0){
                  return;
              }
              that.goods = res.data;
              that.goods.presellTime = 1537286400000;
              // that.goods.preSale = true;
          })

        //开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
        showBack(status => {
          that.headTitle = status ? that.goods.name : '';
        });
      },
      initCartCount () {
          cartProductCount().then(res =>{
              if (res.errno == 0) {
                  this.cart_num = res.data;
              }
          })
      },
      addCartList (goods) {
          addToCart(this.goodsid, 1).then(res => {
            if (res.errno === 0){
                alert("添加成功")
                this.initCartCount();
            }
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .goods {
    padding: .45rem 0 .5rem;
    .presell_box {
      overflow: hidden;
      padding: .08rem .12rem .12rem .12rem;
      background-image: linear-gradient(133deg, #fc5b46, #fa424f);
      @include wh(100%, .64rem);
      .left_price {
        .price {
          @include sc(.238rem, $fc);
          font-weight: bold;
          span { 
            @include sc(.15rem, $fc);
            font-weight: bold; 
          }
          s { 
            @include sc(.12rem, $fc);
            font-weight: normal; 
          }
        }
        .tip {
          @include sc(.12rem, $fc);
          margin-top: -.05rem;
        }
      }
      .right_tip {
        position: relative;
        width: 1rem;
        text-align: center;
        p:first-child{
          @include sc(.18rem, $fc);
          padding-top: .04rem;
        }
        p:last-child{
          @include sc(.13rem, rgba(255, 255, 255, 0.6));
        }
        &:before{
          content: '';
          position: absolute;
          top: .1rem;
          left: 0;
          @include wh(.01rem, .33rem);
          background-color: #fff;
        }
      }
    }
    .title {
      background-color: $fc;
      padding: 0.02rem .15rem .1rem;
      border-radius: .12rem .12rem 0 0;
      .price {
        @include sc(.238rem, $red);
        font-weight: bold;
        span { 
          @include sc(.12rem, $red);
          font-weight: normal; 
        }
        s { 
          @include sc(.12rem, $g9);
          font-weight: normal; 
        }
      }
      .name {
        @include sc(.18rem, $g3);
        padding: .01rem 0 0.02rem;
        .presell_text {
          @include sc(.18rem, $g3);
          margin: .08rem 0 0 -.1rem;
          display: inline-block;
        }
      }
      .desr {
        @include sc(.12rem, $g6);
      }
    }
    .goods_info {
      margin-top: .15rem;
      background-color: $fc;
      .info_title {
        padding-left: .16rem;
        border-left: 7px solid $red;
        line-height: .45rem;
        border-bottom: 1px solid #f7f7fa;
        @include wh(100%, .45rem);
        @include sc(.15rem, $g6);
      }
      .info_content {
        p{
          @include sc(.13rem, #666666);
          line-height: .35rem;
          border-bottom: 1px solid #f7f7fa;
          padding: 0rem .21rem;
        }
      }
    }
    .certificates{
      text-align: center;
      background-color: #efeff4;
      padding: .3rem .08rem;
      .abstract{
        @include sc(.2rem, #333333);
        margin-bottom: .27rem;
      }
      ul{
        display: flex;
        li{
          flex: 1;
          background-color: #fcfbfc;
          margin: 0 .04rem;
          padding: .1rem 0;
          border-radius: .05rem;
          img{
            width: .34rem;
          }
          p{
            @include sc(.13rem, #666666);
          }
        }
      }
    }
    .description_detail{
      .abstractImg{
        width: 100%;
        display: block;
      }
      ul{
        li{
          padding: .3rem;
          background-color: #fcfbfc;
          .abstract{
            @include sc(.2rem, #333333);
            text-align: center;
          }
          p{
            @include sc(.13rem, #666666);
            text-align: justify;
          }
          p:last-child{
            margin-top: .25rem;
          }
          .tip{
            @include sc(.13rem, #666666);
            text-align: center;
          }
        }
        li:nth-child(even){
          background-color: #efeff4;
        }
        li:first-child{
          position: relative;
          p:first-child{
            padding: 0 .06rem;
            line-height: .205rem;
            height: .205rem;
            background-color: #c51215;
            @include sc(.15rem, #fff);
            position: absolute;
            border-radius: .05rem;
          }
          p:last-child{
            @include sc(.15rem, #333333);
          }
        }
      }
    }
    .add_cart_container {
      position: fixed;
      bottom: 0;
      overflow: hidden;
      clear: both;
      @include wh(100%, .49rem);
      .cart_icon_num {
        @include wh(1.06rem, .49rem);
        background-color: #fff;
        .icon {
          position: relative;
          margin: 0.13rem auto;
          @include wh(.245rem, .225rem);
          @include bis('../../images/tab-buy-normal.png');
        }
      }
      .cart_btn {
        line-height: .49rem;
        text-align: center;
        background-color: $red;
        width: 71.73%;
        @include sc (.15rem, $fc);

      }
    }
  }
</style>
