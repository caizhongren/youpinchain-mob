<template>
  <div class="home">
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <div v-show="!showLoading">
      <router-link tag="div" class="header_image" :to="{path:'/introduce'}">
        <img :src="brand.pictureUrl" alt="" width="100%" class="show">
      </router-link>
      <!-- <ul class="product_nav">
        <li v-for="(tab, index) in product_nav" :key="index" :class="{'active': index === activeTab}" v-if="tab.name !== 'brand'"
            @click="toggleTab(tab.id,index)">{{tab.name}}</li>
      </ul> -->
      <section id="hot_goods">
        <h4 class="goods_title">热卖商品</h4>
        <ul class="goodslistul clear">
          <li v-for="item in hotgoodslist" :key="item.id">
            <router-link  tag="div" :to="'/goods/' + item.id">
              <img :src="item.thumbnailPic" alt="" class="left" :class="{'noImage': !item.thumbnailPic}">
              <div class="left goods_info">
                <p class="name">{{item.name + ' ' + item.netContent}}*1{{item.packing}}</p>
                <p class="desr">{{item.describe}}</p>
                <!--<p class="coupon" :class="[item.useCoupon === 0 ? 'unuseCoupon' : 'useCoupon']">{{item.useCoupon === 0 ? '优惠券不可使用' : '优惠券可使用'}}</p>-->
                <p class="price"><span class="RMB">￥</span>{{item.presentPrice}} <s>￥{{item.originalPrice}}</s></p>
              </div>
            </router-link>  
            <div class="shopping_cart"  @touchstart="addToCart(item.id, $event)"></div>
          </li>
        </ul>
        <div @click="loadMore()" class="load_more" v-if="hasMore">查看更多商品</div>
        <transition appear @after-appear = 'afterEnter' @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
          <span class="move_dot" v-if="item"></span>
        </transition>
      </section>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide'
import {homeIndex, addToCart, productList} from '../../service/getData'
import loading from "../../components/common/loading";

export default {
  data(){
    return{
      brand: {},
      goodsList: [],
      product_nav: [],
      activeTab: 0,
      hotgoodslist: [],
      showLoading: true,
      showMoveDot: [], //控制下落的小圆点显示隐藏
      elLeft: 0, //当前点击加按钮在网页中的绝对top值
      elBottom: 0, //当前点击加按钮在网页中的绝对left值
      hasMore: false, // 是否有更多商品，是否可以点击加载更多
      page: 1,
      pageSize: 4,
      datasBrandId:""
    }
  },
	mounted(){
    //获取商品列表
    homeIndex().then(res => {
      this.product_nav = res.data.brandDatas
      this.brand = res.data.brand
      this.showLoading = false;
      this.getDatasBrandId(res.data.brandDatas)
    })

    productList(this.page, this.pageSize).then(res => {
      this.hotgoodslist = res.data.productList
      this.hasMore = res.data.totalPages > this.page
      this.showLoading = false;
    })


  },
  components:{
    footGuide,
    loading
  },
  computed:{
  },
  methods:{
    loadMore () {
      if(!this.hasMore) {
        return;
      }
      this.page++;
      productList(this.page, this.pageSize).then(res => {
        var hotgoodslist = res.data.productList
        for (var i = 0; i < hotgoodslist.length; i++) {
          this.hotgoodslist.push(hotgoodslist[i])
        }
        this.hasMore = res.data.totalPages > this.page
      })
    },
    toggleTab (dataId,index) {
        this.$router.push("/growing-environment?dataId=" + dataId);
        this.activeTab = index
    },
    addToCart (productId, event) { // 加入购物车，计算按钮位置。
      let elLeft = event.target.getBoundingClientRect().left;
      let elBottom = event.target.getBoundingClientRect().bottom;
      this.showMoveDot.push(true);
      let that = this;
      this.showMoveDotFun(this.showMoveDot, elLeft, elBottom);
      addToCart(productId, 1).then(res => {
        that.$parent.getCartNum();
      })
    },
    showMoveDotFun (showMoveDot, elLeft, elBottom) { // 显示下落圆球
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
    },
    beforeEnter(el){
      console.log(this.elBottom)
      el.style.transform = `translate3d(${this.elLeft - 230}px,${20 +this.elBottom - window.innerHeight}px,0px)`;
      el.style.opacity = 0;
    },
    afterEnter(el){
      el.style.transform = `translate3d(0,0,0px)`;
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
      this.showMoveDot = this.showMoveDot.map(item => false);
      el.style.opacity = 1;
    },
    getDatasBrandId(nav){
        nav.forEach(key => {
          if(key.name === 'brand'){
              this.datasBrandId = key.id
          }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .header_image {
    height: 4.2rem;
  }
  .move_dot {
    position: fixed;
    bottom: .32rem;
    left: 52.7%;
    background: $red;
    display: block;
    border-radius: 50%;
    @include wh(.15rem, .15rem);
  }
  .home {
    padding-bottom: .5rem;
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
    // margin-top: .15rem;
    padding: .2rem 0;
    .load_more {
			@include wh(35%, .28rem);
			@include sc(.14rem, $red);
			background-color: $fc;
			margin: 0rem auto;
			text-align: center;
			line-height: .28rem;
			border-radius: 15px;
			border: 1px solid $red;
			display: block;
		}
    .goods_title {
      text-align: center;
      margin: 0 auto;
      display: block;
      line-height: .41rem;
      text-shadow: 0px 1px 5px rgba(118, 176, 252, 0.67);
      @include wh(42%, .41rem);
      @include sc(.15rem, $fc);
      @include bis('../../images/home-bg-rmsp-normol.png');
    }
    .goodslistul {
      padding: .25rem .15rem .1rem;
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
        border-bottom: 1px solid #f8f8f8;
        padding-bottom: .15rem;
      }
      .goods_info {
        width: 55.8%;
        .name {
          @include sc(.15rem, $g3);
          padding: .05rem 0 .03rem;
        }
        .desr {
          @include sc(.12rem, $g6);
          height: .75rem;
        }
        .coupon {
          border-radius: 10px;
          display: inline-block;
          transform: scale(0.82) translateX(-8px);
          margin: .2rem 0 .1rem;
          padding: 0 .05rem;
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
          // margin-top: .6rem;
          @include sc(.18rem, $red);
          font-weight: bold;
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
        @include bis('../../images/shopping_cart.png');
      }
    }
  }
</style>
