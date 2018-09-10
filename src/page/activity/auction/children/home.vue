<template>
  <div class="auction_home" v-if="showDocument">
    <div class="add_count" @click="toShare" v-if="(auctionInfo.auctionState === 0 || auctionInfo.auctionState === 1) && auctionInfo.helpState && auctionInfo.helpNum < 3 "></div>
    <router-link class="lottery_entry" :class="{'lottery_entry_count' : auctionInfo.luckDrawState === 1}" tag="div" :to="'/auction/lottery/' + auctionInfo.auctionId + '/' + auctionInfo.luckDrawId" v-if="auctionInfo.auctionState === 1">
      <p v-if="auctionInfo.luckDrawState === 1">剩余<span>{{luckDrawTime | timeArry(1)}}:{{luckDrawTime | timeArry(2)}}</span></p>
    </router-link>
    <div class="top_main">
      <div class="head_tip" :class="{'ending' : auctionInfo.auctionState === 2}">
          <p>{{auctionInfo.auctionState === 0 ? '预告' : (auctionInfo.auctionState === 1 ? '进行中' : '已结束')}}</p>
          <p v-if="auctionInfo.auctionState !== 2">{{auctionInfo.auctionState === 0 ? '距离拍卖开始' : '本场剩余'}}：{{countDown | timeArry(0)}}:{{countDown | timeArry(1)}}:{{countDown | timeArry(2)}}</p>
      </div>
      <!-- <carousel class="banner_box" :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="5" :paginationSize="8" :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color"> -->
        <!-- <slide v-for="item in auctionInfo.goodsPic" :key="item.id"> -->
          <!-- <img :src="auctionInfo.goodsPic" alt="" class="show"> -->
        <!-- </slide> -->
      <!-- </carousel> -->
      <!--<div class="banner_box" :to="{path:'/home'}">-->
        <!--<img :src="auctionInfo.goodsPic" alt="" class="show">-->
      <!--</div>-->
      <router-link tag="div" class="banner_box" :to="{path:'/home'}">
        <img :src="auctionInfo.goodsPic" alt="" class="show">
      </router-link>
      <div class="title">
        <p>{{auctionInfo.goods}}</p>
        <p v-if="auctionInfo.rankingList.length">当前最高出价：<span>{{auctionInfo.highest}}</span><img src="../../../../images/auction/bullion.png"></p>
        <p>起拍价：{{auctionInfo.startingPrice}}<img src="../../../../images/auction/bullion.png"></p>
      </div>
    </div>
    <div class="bidders_info">
      <div class="bid_list">
        <p class="text-center" v-if="auctionInfo.auctionState === 2">恭喜以下{{auctionInfo.rankingList.length | numToChinese}}位用户竞拍成功！</p>
        <p v-else>出价榜<span v-if="auctionInfo.rankingList.length === 0">暂无</span></p>
        <table border="0" cellspacing="0" v-if="auctionInfo.rankingList.length">
          <thead>
            <tr>
              <th>当前排名</th>
              <th>用户</th>
              <th>出价金条</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in auctionInfo.rankingList">
              <td><span :class="['list_' + (index + 1)]">{{index < 3 ? (index + 1) : '0' + (index + 1)}}</span></td>
              <td>{{item.userName}}</td>
              <td>{{item.bidPrice}}</td>
              <td>{{item.addTime | timeformat}}</td>
            </tr>
          </tbody>
        </table>
        <!-- <p style="color:#fa424f;font-size:.15rem;" class="text-center" v-if="auctionInfo.auctionState === 2">*请以上用户在公众号发送“兑奖”领取奖励</p> -->
      </div>
      <div class="bid_process">
        <p class="process_title">竞拍流程</p>
        <ul>
          <li>
            <img src="../../../../images/auction/step_01.png" alt="">
            <p>出价竞拍</p>
            <p>01</p>
          </li>
          <li>
            <img src="../../../../images/auction/step_02.png" alt="">
            <p>竞拍成功</p>
            <p>02</p>
          </li>
          <li>
            <img src="../../../../images/auction/step_03.png" alt="">
            <p>兑奖页面兑奖</p>
            <p>03</p>
          </li>
          <li>
            <img src="../../../../images/auction/step_04.png" alt="">
            <p>兑奖成功</p>
            <p>04</p>
          </li>
        </ul>
      </div>
      <div class="bid_rule">
        <div class="rule_title">活动规则</div>
        <p><span>1.</span>关注链上臻品的用户可参与竞拍。</p>
        <p><span>2.</span>竞拍活动时间为每周二、周五19:00-21:00，每场活动拍卖的产品将综合参考用户意见选出。</p>
        <p><span>3.</span>限时2小时拍卖，20金条起拍，出价前5名获胜。出价规则：第五名当前出价+20金条≤每次出价≤第一名当前出价+40金条，如出现多个用户出价相同，最先出价者获胜。</p>
        <p><span>4.</span>每位用户有10次出价竞拍机会，竞拍开始前一天至竞拍结束前，用户可通过邀请好友助力增加竞拍次数。竞拍中，一旦出价，将不可主动撤销。</p>
        <p><span>5.</span>出价数额不能超过自己持有金条总数。</p>
        <p><span>6.</span>竞拍中，每30分钟可参与一次抽奖活动，随机抽取1—100金条，每场抽奖活动持续5分钟。</p>
        <p><span>7.</span>竞拍成功后，竞拍获胜者需在公众号"限时竞拍"菜单栏选择“我的竞拍”查看参与过的竞拍活动及竞拍结果，并进入“领取奖励”页面如实填写领奖所需信息。如30日内未提交则视为自动放弃。竞拍获胜者参与出价的金条不予退还。</p>
        <p><span>8.</span>前五名获胜者分别获得5斤、3斤、2斤、1斤、1斤苏淮猪腿肉。收货地仅覆盖江浙沪和北京，其他地区用户替换为等值话费。（以商城实际售价计）</p>
        <p><span>9.</span>最终解释权归链上臻品所有。</p>
      </div>
    </div>
    <!-- 底部悬浮状态条 -->
    <div class="bidders_status">
      <!-- 竞拍预告状态 -->
      <div class="two_part auctionState" v-if="auctionInfo.auctionState === 0">
        <div>
          <p>{{auctionInfo.bidNum}}次</p>
          <p>剩余出价</p>
        </div>
        <div class="grey">
          <p>起拍价：{{auctionInfo.startingPrice}}金条</p>
          <p>请提前确认金条充足</p>
        </div>
      </div>
      <div v-if="auctionInfo.auctionState === 1">
        <div class="one_part grey" v-if="!auctionInfo.lastPrice">
          <div class="two_line" v-if="auctionInfo.surplusBullion < offerRange[0]">
            <p>金条不足不能出价</p>
            <p>剩余金条：{{auctionInfo.surplusBullion}}</p>
          </div>
          <div class="two_part" v-else>
            <router-link :to="{ path: '/auction/record/bid', query: {auctionId : auctionInfo.auctionId}}" tag="div">
              <p>{{auctionInfo.bidNum}}次</p>
              <p>剩余出价</p>
            </router-link>
            <div class="red-linear-gradient" @click="showOffer()">
              <p>立即出价</p>
              <p>剩余金条：{{auctionInfo.surplusBullion}}</p>
            </div>
          </div>
        </div>
        <div class="three_part" v-if="auctionInfo.lastPrice">
          <router-link :to="{ path: '/auction/record/bid', query: {auctionId : auctionInfo.auctionId}}" tag="div">
            <p>{{auctionInfo.bidNum}}次</p>
            <p>剩余出价</p>
          </router-link>
          <div>
            <p>{{auctionInfo.lastPrice}}金条</p>
            <p>我的当前出价</p>
          </div>
          <div @click="showOffer()" class="grey" :class="{'red-linear-gradient' : auctionInfo.auctionState === 1 && auctionInfo.lastPrice && auctionInfo.bidNum && auctionInfo.surplusBullion + auctionInfo.lastPrice >= offerRange[0]}">
            <p v-if="auctionInfo.bidNum <=0">出价次数不足不能出价</p>
            <p v-if="auctionInfo.bidNum >0">{{auctionInfo.surplusBullion + auctionInfo.lastPrice < offerRange[0] ? '金条不足' : '立即出价'}}</p>
            <p v-if="auctionInfo.bidNum >0">剩余金条：{{auctionInfo.surplusBullion}}</p>
          </div>
        </div>
      </div>
      <div v-if="auctionInfo.auctionState === 2">
        <div v-if="!auctionInfo.lastPrice" class="one_part grey">
          <div class="only_line">竞拍已结束</div>
        </div>
        <div class="two_part">
          <router-link :to="{ path: '/auction/record/bid', query: {auctionId : auctionInfo.auctionId}}" tag="div">
            <p>{{auctionInfo.bidNum}}次</p>
            <p>剩余出价</p>
          </router-link>
          <div class="only_line" :class="{'green' : auctionInfo.bidSuccess, 'grey' : !auctionInfo.bidSuccess}">{{auctionInfo.bidSuccess ? '恭喜您，竞拍成功！' : '竞拍已结束'}}</div>
        </div>
      </div>
    </div>
    <div class="bid_mask" v-client-height v-if="showMask">
      <div class="bid_offer">
        <div class="title"><img src="../../../../images/auction/bullion.png" alt="">确认出价</div>
        <div class="detail">
          <p>
            <span>{{(auctionInfo.rankingList.length < 2) ? '当前领先出价金额' : '当前领先出价区间'}}</span>
            <span v-if="auctionInfo.rankingList.length > 1">{{auctionInfo.rankingList[auctionInfo.rankingList.length - 1].bidPrice}}-{{auctionInfo.rankingList[0].bidPrice}}金条</span>
            <span v-else-if="!auctionInfo.rankingList.length">{{auctionInfo.startingPrice}}金条</span>
            <span v-else>{{auctionInfo.rankingList[0].bidPrice}}</span>
          </p>
          <p>
            <span>我的上次出价</span>
            <span>{{auctionInfo.lastPrice || 0}}金条</span>
          </p>
          <p>
            <span>我的剩余金条</span>
            <span>{{auctionInfo.surplusBullion}}金条</span>
          </p>
        </div>
        <div class="number">
          <span @click="changeNumber(0)">-</span>
          <input v-model="offerNumber" :change="inputNum(offerNumber)" v-on:input="offerNumber = offerNumber.replace(/\D/g, '')" type="tel">
          <span @click="changeNumber(1)">+</span>
        </div>
        <p class="tip">*本次出价范围{{offerRange[0]}}-{{offerRange[1]}}金条，加价单位为5金条</p>
        <div class="confirm grey" @click="confirmOffer()" :class="{'red' : auctionInfo.surplusBullion + auctionInfo.lastPrice >= offerNumber}">{{auctionInfo.surplusBullion + auctionInfo.lastPrice < offerNumber ? '金条不足' : '确认出价'}}</div>
      </div>
      <img style="margin:0 auto;margin-top:.3rem;display:block;" @click="showMask = false" src="../../../../images/bounty-plan/close_model.png" alt="" width="30" class="close_model">
    </div>
  </div>
</template>
<script>
  import { ModalHelper } from '../../../../service/Utils'
  import { Carousel, Slide } from 'vue-carousel';
  import { auction, offer } from '../../../../service/getData'
  export default {
    data () {
      return {
        showDocument: false,
        showMask: false,
        countDown: null,
        luckDrawTime: null,
        timer: null,
        timer2: null,
        timer3: null,
        offerNumber: null,
        offerRange: [],
        pagination: {
          activeColor: '#e4372e',
          color: '#fff'
        },
        auctionInfo: {}
      }
    },
    props: ['showErrMsg'],
    watch: {
      showMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      countDown: function (val) {
        var that = this
        if (!val) {
          clearInterval(that.timer3)
          that.timer3 = setTimeout(function () {
            that.getAuctionInfo()
          },1000)
        }
      },
      luckDrawTime: function (val) {
        var that = this
        if (!val) {
          clearInterval(that.timer3)
          that.timer3 = setTimeout(function () {
            that.getAuctionInfo()
          },1000)
        }
      }
    },
    mounted() {
      this.getAuctionInfo()
    },
    created() {
    },
    methods: {
      // 获取首页数据
      getAuctionInfo() {
        var that = this 
        auction().then(function (res) {
          that.auctionInfo = res.data
          that.showDocument = true
          that.countDown = res.data.countDown
          that.luckDrawTime = res.data.luckDrawTime
          that.offerRange = that.calculateRange(res.data.rankingList,res.data.startingPrice)
          clearInterval(that.timer)
          clearInterval(that.timer2)
          clearInterval(that.timer3)
          if (res.data.auctionState === 1) {
            that.timer2 = setTimeout(function () {
              that.getAuctionInfo()
            },5000)
          }
          that.computeNumber()
        })
      },
      // 倒计时
      computeNumber () {
        var that = this
        var time = that.countDown
        var luckDrawTime = that.luckDrawTime
        var start_time = new Date().getTime(); //获取开始时间的毫秒数
        if(that.countDown){
          this.timer = setInterval(function () {
            if(that.countDown >= 1){
              var end_time = new Date().getTime();
              var diff_time = Math.floor((end_time - start_time) / 1000);
              //拿到时间差作为时间标记（行走时间）
              document.addEventListener('visibilitychange',function() {
                  if(document.visibilityState=='visible') {
                      that.countDown = time - diff_time
                      that.luckDrawTime = luckDrawTime - diff_time
                  } else {
                  }
              })
              that.countDown -= 1
              that.luckDrawTime -= 1
              if(that.countDown < 1){
                that.countDown = 0
              }
              if(that.luckDrawTime < 1){
                that.luckDrawTime = 0
              }
            } else {
              clearInterval(that.timer)
              return
            }
          },1000)
        }
      },
      // 返回出价范围数组
      calculateRange (Arry,startingPrice) {
        var range = []
        if (!Arry.length) {
          range.push(startingPrice + 20, startingPrice + 40)
        } else if (Arry.length === 1) {
          range.push(Arry[0].bidPrice + 20, Arry[0].bidPrice + 40)
        } else {
          range.push(Arry[Arry.length - 1].bidPrice + 20, Arry[0].bidPrice + 40)
        }
        return range
      },
      // 点击出价
      showOffer () {
        if (this.auctionInfo.auctionState === 1 && ((this.auctionInfo.lastPrice && this.auctionInfo.bidNum) || !this.auctionInfo.lastPrice) && this.auctionInfo.surplusBullion + this.auctionInfo.lastPrice >= this.offerRange[0]) {
          this.showMask = true
          this.offerNumber = this.offerRange[0]
        } else {
          return
        }
      },
      // 加减按钮
      changeNumber (number) {
        var that = this
        if(number){
          that.offerNumber += 5
          if(that.offerNumber > that.offerRange[1]){
            that.offerNumber = that.offerRange[1]
          }
        } else {
          that.offerNumber -= 5
          if(that.offerNumber < that.offerRange[0]){
            that.offerNumber = that.offerRange[0]
          }
        }
      },
      // 输入出价数
      inputNum (value) {
        this.offerNumber = this.offerNumber * 1
        if (value > this.offerRange[1]) {
          this.offerNumber = this.offerRange[1]
        }
      },
      // 确认出价
      confirmOffer () {
        var that = this
        if (that.offerRange[0] <= that.offerNumber && that.offerNumber <= that.offerRange[1]) {
          offer(that.auctionInfo.auctionId,that.offerNumber * 100).then(function (res) {
            if(res.errno) {
              that.showMask = false
              that.$parent.showErrMsg(res.errmsg)
            } else {
              that.showMask = false
              that.getAuctionInfo()
              that.$parent.showErrMsg('出价成功',true)
            }
          })
        } else {
          that.$parent.showErrMsg('不符合出价规则')
        }
      },
      toShare () {
        window.location.href = process.env.DOMAIN + '/auction/sharing/' + this.auctionInfo.auctionId + '?T=' + localStorage.getItem('X-youpinchain-Token')
      }
    },
    components: {
      Carousel,
      Slide,
    },
    destroyed () {
      ModalHelper.beforeClose()
      clearInterval(this.timer)
      clearInterval(this.timer2)
      clearInterval(this.timer3)
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../style/mixin';
  .auction_home{
    padding-bottom: .5rem;
    position: relative;
    .add_count,.lottery_entry{
      @include bis('../../../../images/auction/add_count.png');
      @include wh(.935rem, .42rem);
      position: fixed;
      top: 1.78rem;
      right: 0;
      z-index: 50;
    }
    .lottery_entry{
      top: 2.4rem;
      right: .09rem;
      @include wh(.78rem, .78rem);
      @include bis('../../../../images/auction/lottery_entrance_01.png');
    }
    .lottery_entry.lottery_entry_count{
      @include bis('../../../../images/auction/lottery_entrance_02.png');
      p{
        @include sc(.093rem, $fc);
        position: absolute;
        bottom: 0.04rem;
        width: 100%;
        text-align: center;
        span{
          display: inline-block;
          width: .3rem;
          @include sc(.093rem, $fc);
        }
      }
    }
    .head_tip{
      position: fixed;
      top: 0;
      z-index: 50;
      @include wh(100%, .5rem);
      display: flex;
      p{
        text-align: center;
        flex: 2.75;
        line-height: .5rem;
        @include sc(.15rem, $g3);
        background: $fc;
      }
      p:first-child{
        @include wh(0.86rem, 100%);
        padding-right: 0.16rem;
        @include bis('../../../../images/auction/state_bg.png');
        flex: 1;
        @include sc(.18rem, $fc);
      }
    }
    .head_tip.ending{
      display: block;
      p:first-child{
        @include bis('../../../../images/auction/state_end_bg.png');
        background-color: transparent;
      }
    }
    .top_main {
      margin-bottom: .15rem;
      .banner_box{
        height: 3.75rem;
        overflow: hidden;
        img {
          @include wh(100%,3.75rem);
        }
      }
      .title{
        //@include wh(100%, .7rem);
        background: $fc;
        border-radius: .12rem .12rem 0 0;
        padding: .1rem .15rem .04rem;
        margin-bottom: .075rem;
        p:first-child{
          @include sc(.18rem, $g3);
        }
        p:nth-child(2),p:nth-child(3){
          @include sc(.12rem, $g6);
          line-height: .29rem;
          span{
            @include sc(.185rem, #e42826);
            font-weight: 500;
          }
          img{
            width: .275rem;
            padding-bottom: 0.04rem;
            vertical-align: middle;
            margin-left: .04rem;
          }
        }
        p:nth-child(3){
          span{

          }
          img{
            width: .205rem;
          }
        }
      }
    }
    .bidders_info{
      border-radius: .12rem .12rem 0 0;
      background: $fc;
      .bid_list{
        p{
          @include sc(.15rem, $g6);
          line-height: .45rem;
          padding-left: .13rem;
          span{
            @include sc(.15rem, $g9);
            margin-left: .15rem;
          }
          border-bottom: 1px solid $f5;
        }
        table{
          text-align: center;
          width: 100%;
          border-bottom: 1px solid $f5;
          tr{
            height: .45rem;
          }
          thead{
            @include sc(.13rem, $g6);
            background-color: $f5;
            tr{
              th{
                font-weight: normal;
              }
              th:first-child{
                width: .7rem;
              }
              th:nth-child(2){
                width: 1rem;
              }
              th:nth-child(3){
                width: .7rem;
              }
              th:last-child{
                width: 1rem;
              }
            }
          }
          tbody{
            tr{
              td:first-child{
                span{
                  display: inline-block;
                  @include sc(.13rem, $fc);
                  line-height: .22rem;
                  font-weight: bold;
                  @include wh(.22rem, .265rem);
                }
                .list_1{
                  @include bis('../../../../images/auction/bid_list_01.png');
                }
                .list_2{
                  @include bis('../../../../images/auction/bid_list_02.png');
                }
                .list_3{
                  @include bis('../../../../images/auction/bid_list_03.png');
                }
                .list_4,.list_5{
                  @include sc(.18rem, rgba(102, 102, 102, .2));
                  font-weight: bold;
                }
              }
              td:nth-child(2){
                @include sc(.13rem, $g6);
              }
              td:nth-child(3){
                @include sc(.185rem, $g3);
              }
              td:last-child{
                @include sc(.12rem, $g9);
              }
            }
            tr:nth-child(even){
              background: $f5;
            }
          }
        }
      }
      .bid_process{
        padding-left: .12rem;
        border-bottom: 1px solid $f5;
        .process_title{
          @include sc(.15rem, $g6);
          line-height: .7rem;
        }
        ul{
          display: flex;
          height: 1rem;
          li{
            flex: 1;
            text-align: center;
            position: relative;
            img{
              height: .29rem;
            }
            p:nth-child(2){
              @include sc(.105rem, $g6);
            }
            p:last-child{
              @include sc(.178rem, rgba(102, 102, 102, 0.2));
            }
            &:after{
              content: '';
              border-style: solid;
              border-width: .06rem 0 .06rem .06rem;
              border-color:transparent transparent transparent #fb4f4a;
              opacity: .2;
              display: block;
              position: absolute;
              top: 10%;
              right: -0.06rem;
            }
          }
          li:last-child{
            &:after{
              content: '';
              border: none;
            }
          }
        }
      }
      .bid_rule{
        padding-left: .12rem;
        padding-bottom: .2rem;
        margin-bottom: .16rem;
        .rule_title{
          @include sc(.15rem, $g6);
          line-height: .8rem;
        }
        p{
          @include sc(.13rem, $g6);
          line-height: 1.84;
          padding-left: .24rem;
          padding-right: .29rem;
          position: relative;
          text-align: justify;
          span{
            position: absolute;
            left: 0rem;
            top: -0.035rem;
          }
        }
      }
    }
    .bidders_status{
      @include wh(100%, .5rem);
      text-align: center;
      position: fixed;
      bottom: 0;
      .one_part{
        height: .5rem;
        text-align: center;
        .two_line{
          padding: .05rem 0;
          p:first-child{
            @include sc(.15rem ,$fc);
          }
          p:last-child{
            @include sc(.12rem ,rgba(255, 255, 255, 0.6));
          }
        }
        .only_line{
          @include sc(.15rem, $fc);
          line-height: .5rem;
        }
      }
      .two_part{
        display: flex;
        height: .5rem;
        div{
          padding: .05rem 0;
        }
        div:first-child{
          width: 1rem;
          background: $fc;
          p:first-child{
            @include sc(.15rem ,$g6);
          }
          p:last-child{
            @include sc(.12rem ,$g9);
          }
        }
        div:first-child{
          position: relative;
          &:after{
            content: '';
            border-style: solid;
            border-width: .08rem 0 .0725rem .0725rem;
            border-color:transparent transparent transparent $g6;
            opacity: .2;
            display: block;
            position: absolute;
            top: 30%;
            right: 0.1rem;
          }
        }
        div:last-child{
          width: 2.75rem;
          p:first-child{
            @include sc(.15rem ,$fc);
          }
          p:last-child{
            @include sc(.12rem ,rgba(255, 255, 255, 0.6));
          }
        }
        .only_line{
          padding: 0;
          @include sc(.15rem, $fc);
          line-height: .5rem;
        }
      }
      .two_part.auctionState {
        div:first-child {
          &:after{
            content: none;
          }
        }
      }
      .three_part{
        display: flex;
        height: .5rem;
        div{
          padding: .05rem 0;
        }
        div:first-child,div:nth-child(2){
          width: 1rem;
          background: $fc;
          p:first-child{
            @include sc(.15rem ,$g6);
          }
          p:last-child{
            @include sc(.12rem ,$g9);
          }
        }
        div:first-child{
          position: relative;
          &:after{
            content: '';
            border-style: solid;
            border-width: .08rem 0 .0725rem .0725rem;
            border-color:transparent transparent transparent $g6;
            opacity: .2;
            display: block;
            position: absolute;
            top: 30%;
            right: 0.1rem;
          }
        }
        div:last-child{
          width: 1.75rem;
          p:first-child{
            @include sc(.15rem ,$fc);
            width: 1rem;
            margin: 0 auto;
          }
          p:nth-child(2){
            @include sc(.12rem ,rgba(255, 255, 255, 0.6));
          }
        }
        div:nth-child(2){
          position: relative;
          &:before{
            content: '';
            @include wh(.01rem, .3rem);
            position: absolute;
            background: #e3dfdf;
            left: 0;
            top: 18%;
          }
        }
      }  
    }
    .bid_mask{
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
      background: rgba(0,0,0,.5);
      padding-top: 1.2rem;
      .bid_offer{
        padding-bottom: .2rem;
        background: $fc;
        text-align: center;
        @include wh(2.8rem, auto);
        margin: 0 auto;
        border-radius: .1rem;
        overflow: hidden;
        .title{
          @include sc(.18rem, $g3);
          line-height: .55rem;
          background-color: #f9f9f9;
          height: .55rem;
          margin-bottom: .1rem;
          img{
            width: .32rem;
            vertical-align: middle;
            padding-bottom: 0.06rem;
            margin-right: .05rem;
          }
        }
        .detail{
          padding: 0 .1rem 0rem .25rem;
          text-align: left;
          p{
            display: flex;
            margin-bottom: .12rem;
            //justify-content: space-between;
            span:first-child{
              @include sc(.13rem, rgba(51, 51, 51, 0.7));
              width: 1.2rem;
            }
            span:last-child{
              @include sc(.15rem, $g3);
            }
          }
        }
        .number{
          display: flex;
          justify-content: space-between;
          height: .4rem;
          padding: 0 .25rem;
          margin-bottom: .12rem;
          span{
            background: #ececee;
            border-radius: .05rem;
            @include sc(.3rem, #fc5340);
            width: .42rem;
            line-height: .34rem;
          }
          input{
            width: 1.23rem;
            font-size: .24rem;
            @include sc(.24rem, #fc5340);
            border-radius: .05rem;
            line-height: .4rem;
            text-align: center;
            background: #ececee;
          }
        }
        .tip{
          @include sc(.11rem, #fc5340);
          margin-bottom: .2rem;
        }
        .confirm{
          @include sc(.15rem, $fc);
          @include wh(1.93rem, .4rem);
          line-height: .4rem;
          margin: 0 auto;
          border-radius: .05rem;
        }
      }
    }
    .grey{
      background-color: $g9;
    }
    .red{
      background-color: #fc5340;
    }
    .green{
      background-color: #3edaa1;
    }
    .red-linear-gradient{
      background-image: linear-gradient(133deg, #fc5b46, #fa424f);
    }
  }
  .text-center{
    text-align: center;
  } 
</style>
