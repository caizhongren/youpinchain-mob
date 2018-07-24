<template>
  <div class="goods">
    <div class="top_main">
      <img src="../../images/youpinchain/1.png" alt="" width="100%" class="show">
      <div class="title">
        <p class="price"><span>¥</span>{{goods.price}} <s>¥{{goods.marketPrice}}</s></p>
        <p class="name">{{goods.name}}</p>
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
  </div>
</template>

<script>
  export default {
    data(){
      return{
        goodsid:'',
        goods: {
          name:'猪耳朵500g*1份',
          description: '和黄瓜丝凉拌好吃极了～',
          price: 23.99,
          marketPrice: 33.99,
          Desc: '<div>商品介绍内容</div>'
        },
        cart_num: 8,
        number: [1, 2, 3, 4, 5],
      }
    },
    mounted(){
      this.goodsid = this.$route.params.goodsid;
      this.initData();
    },
    components:{
    },
    computed:{
    },
    methods:{
      initData () {
      },
      addCartList (goods) {
        this.cart_num += 1;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .goods {
    .title {
      background-color: $fc;
      padding: 0.02rem .15rem .1rem;
      border-radius: 10px 10px 0 0;
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
          @include bis('../../images/youpinchain/tab-buy-normal.png');
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
