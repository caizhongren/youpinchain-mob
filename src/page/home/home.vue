<template>
  <div class="home">
    <img src="../../images/youpinchain/1.png" alt="" width="100%" class="show">
    <ul class="product_nav">
      <li v-for="(tab, index) in product_nav" :key="index" :class="{'active': index === activeTab}" @click="toggleTab(index)">{{tab}}</li>
    </ul>
    <section id="hot_goods">
      <h4 class="goods_title">热卖商品</h4>
      <ul class="goodslistul clear">
        <li v-for="item in hotgoodslist" :key="item.id">
          <router-link  tag="div" :to="'/goods/' + item.id">
            <img :src="item.imgUrl" alt="" class="left" :class="{'noImage': !item.imgUrl}">
            <div class="left goods_info">
              <p class="name">{{item.name}}</p>
              <p class="desr">{{item.description}}</p>
              <p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>
              <p class="price"><span>¥</span>{{item.price}} <s>¥{{item.marketPrice}}</s></p>
            </div>
          </router-link>  
          <div class="shopping_cart"  @touchstart="addToCart($event)"></div>
        </li>
      </ul>
      <!-- <transition appear @after-appear = 'afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot">
        <span class="move_dot" v-if="item"></span>
      </transition> -->
    </section>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide'
// import {goodsList} from '../../service/getData'

export default {
  data(){
    return{
      goodsList: [],
      product_nav: ['生长环境', '饲养情况', '健康指标'],
      activeTab: 0,
      hotgoodslist: [
        {
          id: 0,
          name: '猪耳朵500g*1份',
          description: '和黄瓜丝凉拌好吃极了～',
          useCoupon: 0, // 0 优惠券不可使用，1 优惠券可使用
          marketPrice: 33.99,
          price: 23.99,
          imgUrl: 'http://test321.hongcai.com/uploads/png/original/2018-07-18/goods/goods-561b43d97c9a4fdcbb77ae2f3d0919b9-original.png'
        },
        {
          id: 2,
          name: '猪耳朵500g*1份',
          description: '和黄瓜丝凉拌好吃极了～',
          useCoupon: 1, // 0 优惠券不可使用，1 优惠券可使用
          marketPrice: 33.99,
          price: 23.99,
          imgUrl: ''
        }
      ],
      showMoveDot: [], //控制下落的小圆点显示隐藏
      windowHeight: null, //屏幕的高度
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
    }
  },
	mounted(){
    //获取商品列表
    // goodsList(1, 10).then(res => {
    //     this.goodsList = res;
    // })
  },
  components:{
      footGuide
  },
  computed:{
  },
  methods:{
    toggleTab (index) {
      this.activeTab = index
    },
    addToCart (event) { // 加入购物车，计算按钮位置。
      let elLeft = event.target.getBoundingClientRect().left;
      let elBottom = event.target.getBoundingClientRect().bottom;
      this.showMoveDot.push(true);
      this.showMoveDotFun(this.showMoveDot, elLeft, elBottom);
    },
    showMoveDotFun (showMoveDot, elLeft, elBottom) { // 显示下落圆球
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    beforeEnter(el){
      el.style.transform = `translate3d(${this.elLeft - 30}px,${37 + this.elBottom - this.windowHeight}px,0px)`;
      el.style.opacity = 0;
    },
    afterEnter(el){
      el.style.transform = `translate3d(0,0,0px)`;
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
      this.showMoveDot = this.showMoveDot.map(item => false);
      el.style.opacity = 1;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .move_dot {
    position: fixed;
    bottom: 1.3rem;
    left: 52.7%;
    background: $red;
    display: block;
    border-radius: 50%;
    @include wh(.15rem, .15rem);
  }
  .home {
    margin-bottom: .5rem;
  }
  .product_nav{
    overflow: hidden;
    clear: both;
    text-align: center;
    background-color: $fc;
    @include wh(100%, .575rem);
      line-height: .575rem;
    li {
      float: left;
      @include wh(33.333%, .575rem);
      @include sc(.15rem, $g6);
    }
    li.active {
      background-color: $red;
      color: $fc;
    }
  }
  #hot_goods {
    background-color: $fc;
    margin-top: .15rem;
    padding: .2rem 0;
    .goods_title {
      text-align: center;
      margin: 0 auto;
      display: block;
      line-height: .41rem;
      text-shadow: 0px 1px 5px rgba(118, 176, 252, 0.67);
      @include wh(42%, .41rem);
      @include sc(.15rem, $fc);
      @include bis('../../images/youpinchain/home-bg-rmsp-normol.png');
    }
    .goodslistul {
      padding: .25rem .15rem;
      img {
        margin-right: .12rem;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 5px; 
      }
      img.noImage {
        background-color: #000;
      }
      li {
        width: 100%;
        clear: both;
        overflow: hidden;
        margin-bottom: .12rem;
        position: relative;
      }
      .goods_info {
        .name {
          @include sc(.15rem, $g3);
          padding: .05rem 0 .03rem;
        }
        .desr {
          @include sc(.12rem, $g6);
        }
        .coupon {
          border-radius: 7px;
          display: inline-block;
          transform: scale(0.82) translateX(-8px);
          margin: .2rem 0 .1rem;
          padding: 0 2px;
        }
        .useCoupon {
          @include sc(.12rem, $red);
          border: 1px solid $red;
        }
        .unuseCoupon {
          @include sc(.12rem, $g9);
          border: 1px solid $g9;
        }
        .price {
          @include sc(.18rem, $red);
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
      }
      .shopping_cart {
        position: absolute;
        right: 0;
        bottom: .25rem;
        @include wh(.315rem, .315rem);
        @include bis('../../images/youpinchain/shopping_cart.png');
      }
    }
  }
</style>
