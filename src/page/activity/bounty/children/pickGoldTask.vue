<template>
  <div class="task" v-if="showDocument">
    <div class="activity_detail">
      <p v-if="lastScene === 'true' && actDetail.surplus === 0">今日已结束</p>
      <p v-else>{{actDetail.state === 2 && actDetail.surplus === 0 || actDetail.state === 1 ? '距下轮开始' : '距本轮结束'}}</p>
      <p :class="{'opacity_zero' : lastScene === 'true' && actDetail.surplus === 0}"><span>{{countDown | timeArry(0)}}</span> : <span>{{countDown | timeArry(1)}}</span> : <span>{{countDown | timeArry(2)}}</span></p>
      <p><span>剩余金条</span></p>
      <p>{{actDetail.surplus}}</p>
      <div :class="{'snatching' : countDown > 0 && actDetail.surplus !== 0 && !actDetail.partake && actDetail.state === 2}" @click="robbingGold()">{{actDetail.state === 1 ? '未开始' : (actDetail.state === 3 ? '已结束' : (actDetail.partake ? '已抢过' : (actDetail.surplus === 0 ? '已抢光' : '抢')))}}</div>
    </div>
    <div class="description">
      <p>活动规则</p>
      <p>捡金任务是每天10:00—10:30、16:00—16:30、20:00—20:30三个时间段内，分别派送5000个金条奖池，居民在活动时间内随机领取一定数量的金条。若活动中奖池被领空则该段时间活动结束。某段时间活动结束后奖池剩余不计入下场活动奖池中。</p>
    </div>
    <div class="record_detail">
      <p class="title">金条记录</p>
      <div class="lucky_box">
        <ul class="lucky-users-box">
          <li class="no_record" v-if="!actDetail.pickGoldRecord.length">暂无记录</li>
          <li v-for="item in actDetail.pickGoldRecord">
            <div>
              <img :src="item.headImgUrl" alt="">
              <span>{{item.nickName}}</span>
            </div>
            <div>+{{item.amount}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="showMask" v-client-height>
      <div class="tip" v-if="!modalEnd">
        <p><img src="../../../../images/bounty-plan/money_reward_icon2.png" alt="" width="23%">恭喜您！</p>
        <p>成功抢到{{randomNumber}}个金条！</p>
        <p @click="showMask = false">知道啦</p>
      </div>
      <div v-else class="activityEnd">本轮活动已结束</div>
    </div>  
  </div>
</template>
<script>
  import { pickGoldDetail, robGold } from '../../../../service/getData'
  import { ModalHelper } from '../../../../service/Utils'
  export default {
    data () {
      return {
        timer: null,
        timer2: null,
        showMask: false,
        randomNumber: null,
        boxHeight: 3, // 滚动区域高度(li高度0.6rem,倍数)
        modalEnd: false,
        actDetail: {},
        showDocument: false,
        countDown: null,
        busy: false,
        lastScene: this.$route.query.lastScene.toString()
      }
    },
    watch: {
      showMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      countDown: function () {
        var that = this
        if(that.countDown === 0 && that.actDetail.state === 2){
          that.showMask = true
          that.modalEnd = true
        } else if(that.countDown === 0 && that.actDetail.state === 1){
          that.getActDetail()
        }
      }
    },
    mounted() {
      this.getActDetail()
    },
    created() {
    },
    methods: {
      getActDetail () {
        var that = this
        pickGoldDetail(1,100,that.$route.params.id).then(function(res){
          that.showDocument = true
          that.actDetail = res.data
          that.countDown = res.data.countDown
          clearInterval(that.timer)
          setTimeout(function() {
            that.luckyTimer(-that.boxHeight)
          }, 100)
          that.computeNumber()
        })
      },
      computeNumber () {
        var that = this
        if(that.countDown){
          this.timer = setInterval(function () {
            if(that.countDown >= 1){
              that.countDown -= 1
              if(that.countDown < 1){
                that.countDown = 0
              }
            } else {
              clearInterval(that.timer)
              return
            }
          },1000)
        }
      },
      robbingGold () {
        var that = this
        if (that.busy) {
          return
        }
        that.busy = true
        setTimeout(function () {
          that.busy = false
        }, 2000)
        if(that.actDetail.state === 2 && that.countDown > 0 && that.actDetail.surplus !== 0 && !that.actDetail.partake){
          robGold(that.$route.params.id).then(function(res){
            if (res && res.errno === 0) {
              that.randomNumber = res.data
              that.getActDetail()
              that.showMask = true
            } else {
              console.log(res.errmsg)
            }
          })
        } else {
          return
        }
      },
      luckyTimer: function (val) {
        var that = this
        var count = 0
        var $luckyUsersList = document.querySelector('.lucky-users-box')
        var $ulBox = document.querySelector('.lucky-users-box')
        var totalHeight = -0.6 * that.actDetail.pickGoldRecord.length
        if(totalHeight < -that.boxHeight){
          that.timer2 = setInterval(function () {
            if (totalHeight >= (count + 1) * -that.boxHeight && val !== 0) {
              count = 0
              val = 0
              $luckyUsersList.classList.remove('animate')
              $luckyUsersList.style.webkitTransform = 'translateY(0rem)'
            } else {
              count += 1
              $luckyUsersList.className += ' animate'
              if(totalHeight >= (count + 1) * -that.boxHeight){
                $luckyUsersList.style.webkitTransform = 'translateY(' + (totalHeight + that.boxHeight) + 'rem)'
              } else{
                $luckyUsersList.style.webkitTransform = 'translateY(' + val + 'rem)'
              }
            }
            val -= that.boxHeight
          }, 5000)
        }
      }
    },
    destroyed () {
      clearInterval(this.timer)
      clearInterval(this.timer2)
      ModalHelper.beforeClose()
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../../style/mixin';
  .task{
    position: relative;
    .activity_detail{
      @include wh(100%, 3.4rem);
      @include bis('../../../../images/bounty-plan/jian-bg.png');
      background-size: 100% 2.7rem;
      background-color: #854eb1;
      color: $fc;
      text-align: center;
      padding-top: .95rem;
      p:nth-child(1){
        font-size: .13rem;
        margin-bottom: .13rem;
      }
      p:nth-child(2){
        font-size: .18rem;
        line-height: .26rem;
        margin-bottom: .12rem;
        font-family: PingFangSC;
        span{
          background: #2d1063;
          padding: 0 .03rem;
          display: inline-block;
          width: .24rem;
        }
      }
      p:nth-child(3){
        line-height: .12rem;
        span{
          display: inline-block;
          background: #9f6cff;
          border-radius: .025rem;
          font-size: .12rem;
          padding: .03rem .06rem;
        }
      }
      p:nth-child(4){
        font-size: .4rem;
        line-height: .4rem;
        margin-bottom: .3rem;
      }
      div:last-child{
        @include sc(.24rem,#2a2a33);
        @include wh(1.8rem,.5rem);
        background-color: $bc;
        border-radius: .05rem;
        line-height: .5rem;
        margin: 0 auto;
      }
      div.snatching{
        background-color: #ffe236;
      }
    }
    .mask{
      @include wh(100%,auto);
      background: rgba(0, 0, 0, .9);
      position: fixed;
      top: 0;
      left: 0;
      padding-top: 2.2rem;
      .tip{
        background: $fc;
        width: 2.8rem;
        margin: 0 auto;
        padding: .2rem .4rem .15rem;
        border-radius: .1rem;
        p{
          height: .3rem;
          line-height: 1.67;
          text-align: center;
          @include sc(.18rem, $g3);
          img{
            vertical-align: middle;
          }
        }
        p:last-child{
          background: #fc5340;
          @include sc(.15rem, $fc);
          line-height: .4rem;
          height: .4rem;
          margin-top: .18rem;
        }
      }
    }
  }
  .description,.record_detail{
    margin-top: .16rem;
    border-radius: .1rem;
    background: $fc;
    color: $g6;
  }
  .record_detail{
    .title{
      line-height: .45rem;
      font-size: .15rem;
      border-bottom: 0.01rem solid $gd;
      padding: 0;
      padding-left: .12rem;
    }
    .lucky_box{
      height: 3rem;
      overflow-y: hidden;
      position: relative;
      .lucky-users-box {
        background: $bc;
        li {
          padding: 0 .12rem;
          height: .6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: $fc;
          img{
            @include wh(.3rem, .3rem);
            border-radius: 50%;
            vertical-align: middle;
            margin-right: .3rem;
          }
          p{
            margin-bottom: .06rem;
            font-size: .125rem;
          }
          p:last-child{
            font-size: .12rem;
            color: $g9;
          }
          div:last-child{
            color: #fc4c42;
            font-size: .15rem;
          }
          div:last-child.green {
            color: #26cc41;
          }
        }
        li:nth-child(even){
          background: $f5;
        }
        li.no_record {
          justify-content: center;
          height: 1.6rem;
          background: $fc;
        }
      }
      .lucky-users-box.animate{
        transition: 1s all ease-in-out;
      }
    }
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
    border-bottom: 0.01rem solid $gd;
    padding: 0;
    padding-left: .12rem;
  }
  .loadMore{
    width: 35%;
    height: 0.28rem;
    font-size: 0.14rem;
    color: $g6;
    background-color: $bc;
    margin: 0rem auto;
    text-align: center;
    line-height: .28rem;
    display: block;
    text-align: center;
    margin-top: .1rem;
  }
  .activityEnd{
    @include sc(.2rem, $fc);
    text-align: center;
  }
  .opacity_zero{
    opacity: 0;
  }
</style>
