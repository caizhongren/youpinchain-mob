<template>
  <div>
    <img src="../../images/youpinchain/1.png" alt="" width="100%" class="show">
    <ul class="product_nav">
      <li v-for="(tab, index) in product_nav" :key="index" :class="{'active': index === activeTab}" @click="toggleTab(index)">{{tab}}</li>
    </ul>
    <section id="hot_goods">
      <h4 class="goods_title">热卖商品</h4>
      <ul class="goodslistul clear">
        <router-link  tag="li" v-for="item in hotcity" :to="'/goods/' + item.id" :key="item.id">
            {{item.name}}
        </router-link>  
      </ul>
    </section>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide'
// import {cityGuess, hotcity, groupcity} from '../../service/getData'
import {hotcity} from '../../service/getData'

export default {
  data(){
    return{
      hotcity: [],
      product_nav: ['生长环境', '饲养情况', '健康指标'],
      activeTab: 0
    }
  },
	mounted(){
    // 获取当前城市
    // cityGuess().then(res => {
    //     this.guessCity = res.name;
    //     this.guessCityid = res.id;
    // })

    //获取热门城市
    hotcity(1, 10).then(res => {
        this.hotcity = res;
    })

    //获取所有城市
    // groupcity().then(res => {
    //     this.groupcity = res;
    // })
  },
  components:{
      footGuide
  },

  computed:{
    //将获取的数据按照A-Z字母开头排序
    sortgroupcity(){
        let sortobj = {};
        for (let i = 65; i <= 90; i++) {
            if (this.groupcity[String.fromCharCode(i)]) {
                sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
            }
        }
        return sortobj
    }
  },

  methods:{
    //点击图标刷新页面
    reload(){
        window.location.reload();
    },
    toggleTab (index) {
      this.activeTab = index
    }
  },
}

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
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
      @include wh(50%, .41rem);
      @include sc(.15rem, $fc);
      @include bis('../../images/youpinchain/home-bg-rmsp-normol.png');
    }
  }
</style>
