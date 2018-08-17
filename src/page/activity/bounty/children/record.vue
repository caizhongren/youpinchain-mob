<template>
  <div class="gold_record">
    <div class="top">
      <p>{{goldData.balancePrice}}</p>
      <p>{{ type === '0' ? '我的金钻' : '我的金条'}}</p>
      <div class="frozen" v-if="type === '1'">冻结：{{goldData.freezing}}</div>
    </div>
    <div class="description">
      <p>金{{ type === '0' ? '钻' : '条'}}介绍</p>
      <p v-if="type === '0'">金钻是基于链上臻品居民参与赏金计划中淘金任务获得奖励产生的。金钻可以用来直接兑换数字资产、京东E卡等产品。</p>
      <p v-else>金条是基于链上臻品居民参与体系建设任务获得奖励产生的。帮助居民更好的了解区块链，近距离接触、参与链上臻品活动，享受链上商城带来的品质和福利。后续还将开发更多基于金条的功能。</p>
    </div>
    <div class="record_detail">
      <p class="title">金{{type === '0' ? '钻' : '条'}}记录</p>
      <ul>
        <li v-for="(item,index) in record" :key="index" v-if="record.length > 0">
          <div>
            <p>{{item.remark}}</p>
            <p>{{item.addTime | timeformat}}</p>
          </div>
          <div :class="{'green': item.bookType === 1}">{{item.bookType == 0 ? '+' : '-'}}{{item.actualPrice}}</div>
        </li>
        <p @click="loadMore" v-show="page < totalPages" class="loadMore">加载更多</p>
        <li v-if="record.length <= 0" class="no_record">暂无记录</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { goldDrill, bullion } from '../../../../service/getData' 
  export default {
    data () {
      return {
        page: 1,
        size: 10,
        goldData: {},
        record: [],
        totalPages: 0
      }
    },
    watch: {

    },
    mounted() {
      
    },
    created() { 
      var that = this
      that.type = that.$route.params.type
      that.getRecord(that.page, that.size, that.type)
    },
    methods: {
      setRecord (res) {
        this.goldData = res.data
        this.totalPages = res.data.totalPages
        if (!this.goldData.record) return
        for (var i = 0; i < this.goldData.record.length; i++){
          this.record.push(this.goldData.record[i])
        }
      },
      getRecord (page, size) {
        var that = this
        if (that.type === '0') {
          goldDrill(page, size).then(function (res) {
            that.setRecord(res)
          })
        } else if (that.type === '1') {
          bullion(page, size).then(function (res) {
            that.setRecord(res)
          })
        }
      },
      loadMore (type) {
        var that = this
        that.page += 1
        if(that.page > that.totalPages){
          return
        }
        that.getRecord(that.page, that.size)
      }
    },
  }
</script>
<style scoped>
  .gold_record{
    background: #efeff4;
  }
  .gold_record .top{
    color: #fff;
    height: 1.55rem;
    background-image: linear-gradient(74deg, #836252, #383052);
    padding-top: .24rem;
    text-align: center;
    position: relative;
  }
  .top p{
    font-size: .13rem;
  }
  .top p:first-child{
    font-size: .4rem;
    font-weight: bold;
  }
  .frozen{
    position: absolute;
    left: 0;
    bottom: 0;
    height: .4rem;
    background: rgba(181, 184, 188, 0.51);
    line-height: .4rem;
    width: 100%;
    text-align: left;
    padding-left: .22rem;
    font-size: .13rem;
  }
  .description,.record_detail{
    margin-top: .16rem;
    border-radius: .1rem;
    background: #fff;
    color: #666666;
  }
  .description p{
    font-size: .13rem;
    padding: .15rem .12rem .2rem .12rem;
    line-height: 2;
    text-align: justify;
  }
  .description p:first-child{
    line-height: .45rem;
    font-size: .15rem;
    border-bottom: 0.01rem solid #dddddd;
    padding: 0;
    padding-left: .12rem;
  }
  .record_detail .title{
    line-height: .45rem;
    font-size: .15rem;
    border-bottom: 0.01rem solid #dddddd;
    padding: 0;
    padding-left: .12rem;
  }
  .record_detail ul{
    padding-bottom: 1rem;
    background: #efeff4;
  }
  .record_detail li{
    padding: 0 .12rem;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
  }
  .record_detail li:nth-child(even){
    background: #f6f5f5;
  }
  .record_detail li p{
    margin-bottom: .06rem;
    font-size: .125rem;
  }
  .record_detail li p:last-child{
    font-size: .12rem;
    color: #999999;
  }
  .record_detail li div:last-child{
    color: #fc4c42;
    font-size: .15rem;
  }
  .record_detail li div:last-child.green {
    color: #26cc41;
  }
  .loadMore{
    width: 35%;
    height: 0.28rem;
    font-size: 0.14rem;
    color: #666666;
    background-color: #efeff4;
    margin: 0rem auto;
    text-align: center;
    line-height: .28rem;
    display: block;
    text-align: center;
    margin-top: .1rem;
  }
  .record_detail li.no_record {
    justify-content: center;
    height: 1.6rem;
    background: #fff;
  }
</style>
