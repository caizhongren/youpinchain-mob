<template>
  <div class="goods">
    <head-top class="header" go-back='true' is-share="true" :showShare="showShare" :headTitle="headTitle"></head-top>
    <div class="top_main">
      <carousel :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="5" :paginationSize="8" :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color">
        <slide>
          <img src="../../images/1.png" alt="" width="100%" class="show">
        </slide>
        <slide>
          <img src="../../images/1.png" alt="" width="100%" class="show">
        </slide>
        <slide>
          <img src="../../images/1.png" alt="" width="100%" class="show">
        </slide>
      </carousel>
      <div class="presell_box" v-if="goods.presell">
        <div class="left_price left">
          <p class="price"><span>¥</span>{{goods.price}} <s>¥{{goods.marketPrice}}</s></p>
          <p class="tip">商品预售预计{{goods.presellTime | dateCharacter}}发货</p>
        </div>
        <div class="right_tip right">预售</div>
      </div>
      <div class="title">
        <p class="price" v-if="!goods.presell"><span>¥</span>{{goods.price}} <s>¥{{goods.marketPrice}}</s></p>
        <p class="name"><span class="presell_text" v-if="goods.presell">【预售】</span>{{goods.name}}</p>
        <p class="desr">{{goods.description}}</p>
      </div>
    </div>
    <div class="goods_info">
      <div class="info_title">商品详情</div>
      <div class="info_content" v-html="goods.Desc"></div>
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
  export default {
    data(){
      return{
        showShare: false,
        headTitle: '',
        goodsid:'',
        goods: {},
        cart_num: 8,
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
      var that = this
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (t >= 30) {
          that.headTitle = that.goods.name;
        } else {
          that.headTitle = ''
        }
      }
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
        if (this.goodsid === '0') {
          this.goods = {
            name:'猪耳朵500g*1份',
            description: '和黄瓜丝凉拌好吃极了～',
            price: 23.99,
            marketPrice: 33.99,
            presellTime: 11111111,
            presell: true, // 是否预售
            Desc: '<div>商品介绍内容 <br>商品介绍内容 </br>商品介绍内容</div>'
          }
        } else {
          this.goods = {
            name:'猪耳朵500g*2份',
            description: '和黄瓜丝凉拌好吃极了～',
            price: 23.99,
            marketPrice: 33.99,
            presellTime: 11111111,
            presell: false, // 是否预售
            Desc: '<div>商品介绍内容 <br>商品介绍内容 </br>商品介绍内容</div>'
          }
        }
      },
      addCartList (goods) {
        this.cart_num += 1;
      },
      onScroll () {
        console.log(onScroll)
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
      padding: .08rem .25rem .12rem .12rem;
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
        @include sc(.18rem, $fc);
        padding: .04rem 0 .04rem .3rem;
        margin-top: .08rem;
        border-left: 1px solid $fc;
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
        padding: .1rem .21rem;
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
        background-color: $bc;
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
