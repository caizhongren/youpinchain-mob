<template>
  <div class="task">
    <div class="activity_detail">
      <p>距下轮开始</p>
      <!-- <p>距本轮结束</p> -->
      <p><span>{{countDown | timeArry(0)}}</span> : <span>{{countDown | timeArry(1)}}</span> : <span>{{countDown | timeArry(2)}}</span></p>
      <p><span>剩余金条</span></p>
      <p>{{remainder}}</p>
      <div :class="{'snatching' : countDown === 0 && remainder !== 0 && !robbed}" @click="robbingGold()">{{countDown !== 0 ? '未开始' : (remainder === 0 ? '已抢光' : (robbed ? '已抢过' : '抢'))}}</div>
    </div>
    <div class="description">
      <p>活动规则</p>
      <p>捡金任务是每天10:00—10：30、16:00—16:30、20:00—20:30三个时间段内，分别派送5000个金条奖池，居民在活动时间内随机领取一定数量的金条。若活动中奖池被领空则该段时间活动结束。某段时间活动结束后奖池剩余不计入下场活动奖池中。</p>
    </div>
    <div class="record_detail">
      <p class="title">金条记录</p>
      <div class="lucky_box">
        <ul class="lucky-users-box">
          <li v-for="item in record">
            <div>
              <img :src="item.imgUrl" alt="">
              <span>{{item.nickname}}</span>
            </div>
            <div>{{item.detail}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="showMask">
      <div class="tip">
        <p><img src="../../../../images/bounty-plan/money_reward_icon2.png" alt="" width="23%">恭喜您！</p>
        <p>成功抢到{{randomNumber}}个金条！</p>
        <p @click="showMask = false">知道啦</p>
      </div>
    </div>  
  </div>
</template>
<script>
  import { goldDrill, bullion } from '../../../../service/getData'
  import { ModalHelper } from '../../../../service/Utils'
  export default {
    data () {
      return {
        goldData: {},
        record: [],
        remainder: 500,
        countDown: 10000,
        timer: null,
        showMask: false,
        randomNumber: 20,
        robbed: false,
        timer2: null,
        boxHeight: 3.6, // 滚动区域高度(li高度0.6rem,倍数)
        record: [
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '1',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '2 ',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '3',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '4 mignonne',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '5',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '6 mignonne',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '7 mignonne',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '8',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '9',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '10',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '11',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '12',
            detail: '+10'
          },
          {
            imgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJEKkORcoT4TWW6pYdUU5Dl31FDCGslibmQzqQ4BN2bHRPFXar0ySzduFzGhs1n7CkiaibQsiaia2vNtkA/132',
            nickname: '13',
            detail: '+10'
          }
        ]
      }
    },
    watch: {
      showMask: function (newVal, oldVal) {
        newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    mounted() {
      this.luckyTimer(-this.boxHeight)
    },
    created() {
      this.getActDetail()
    },
    methods: {
      getActDetail () {
        var that = this
        // goldDrill(page, size).then(function (res) {
          // this.luckyTimer(-this.boxHeight)
        // })
        if(that.countDown){
          that.timer = setInterval(function () {
            if(that.countDown >= 1000){
              that.countDown -= 1000
              if(that.countDown < 1000){
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
        if(that.countDown === 0 && that.remainder !== 0 && !that.robbed){
          that.remainder = that.remainder - that.randomNumber
          that.robbed = true
          that.showMask = true
        } else {
          return
        }
      },
      luckyTimer: function (val) {
        var that = this
        var count = 0
        var $luckyUsersList = document.querySelector('.lucky-users-box')
        var $ulBox = document.querySelector('.lucky-users-box')
        var totalHeight = -0.6 * this.record.length
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
      color: #fff;
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
        background-color: #efeff4;
        border-radius: .05rem;
        line-height: .5rem;
        margin: 0 auto;
      }
      div.snatching{
        background-color: #ffe236;
      }
    }
    .mask{
      @include wh(100%,100%);
      background: rgb(0,0,0);
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 2.5rem;
      .tip{
        background: #fff;
        width: 2.8rem;
        margin: 0 auto;
        padding: .2rem .4rem .15rem;
        border-radius: .1rem;
        p{
          height: .3rem;
          line-height: 1.67;
          text-align: center;
          @include sc(.18rem, #333333);
          img{
            vertical-align: middle;
          }
        }
        p:last-child{
          background: #fc5340;
          @include sc(.15rem, #fff);
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
    background: #fff;
    color: #666666;
  }
  .record_detail{
    .lucky_box{
      height: 3.6rem;
      overflow-y: hidden;
      position: relative;
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
    //padding-bottom: 1rem;
    background: #efeff4;
  }
  .record_detail li{
    padding: 0 .12rem;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    img{
      @include wh(.3rem, .3rem);
      border-radius: 50%;
      vertical-align: middle;
      margin-right: .3rem;
    }
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
