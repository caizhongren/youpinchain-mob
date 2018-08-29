<template>
  <div class="auction_home">
    <div class="add_count"></div>
    <div class="lottery_entry"></div>
    <div class="top_main">
      <div class="head_tip">
          <p>预告</p>
          <p>距离拍卖开始：hh:mm:ss</p>
      </div>
      <carousel class="banner_box" :loop="true" :autoplay="true" :minSwipeDistance="6" :scrollPerPage="true" :speed="500" :perPage="1" :paginationPadding="5" :paginationSize="8" :paginationActiveColor="pagination.activeColor" :paginationColor="pagination.color">
        <slide v-for="item in goods.headPic" :key="item.id">
          <img :src="item" alt="" width="100%" class="show">
        </slide>
      </carousel>
      <div class="title">
        <p>EOS虚拟币</p>
        <p>当前最高出价：<span>800</span><img src="../../../../images/auction/bullion.png"></p>
        <p>起拍价：500<img src="../../../../images/auction/bullion.png"></p>
      </div>
    </div>
    <div class="bidders_info">
      <div class="bid_list">
        <p>出价榜</p>
        <table border="0" cellspacing="0">
          <thead>
            <tr>
              <th>当前排名</th>
              <th>用户</th>
              <th>出价金条</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="list_1">1</span></td>
              <td>钢炮</td>
              <td>800</td>
              <td>2018.7.21 11:18</td>
            </tr>
            <tr>
              <td><span class="list_2">2</span></td>
              <td>钢炮</td>
              <td>800</td>
              <td>2018.7.21 11:18</td>
            </tr>
            <tr>
              <td><span class="list_3">3</span></td>
              <td>钢炮</td>
              <td>800</td>
              <td>2018.7.21 11:18</td>
            </tr>
            <tr>
              <td><span class="list_4">04</span></td>
              <td>钢炮</td>
              <td>800</td>
              <td>2018.7.21 11:18</td>
            </tr>
            <tr>
              <td><span class="list_5">05</span></td>
              <td>钢炮</td>
              <td>800</td>
              <td>2018.7.21 11:18</td>
            </tr>
          </tbody>
        </table>
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
        <p><span>1.</span>注册用户可参与竞拍。</p>
        <p><span>2.</span>限时2小时拍卖，20金条起拍，出价前5名获胜。加价规则：第五名当前出价+20金条≤每次加价幅度≦第一名当前出价+40金条，如出现多个用户出价相同，最先出价者优先中标。</p>
        <p><span>3.</span>每位用户有10次出价竞拍机会，竞拍开始前一天至竞拍结束前，用户可通过邀请好友助力增加竞拍次数。竞拍中，一旦出价，将不可主动撤销。</p>
        <p><span>4.</span>出价数额不能超过自己持有金条总数。</p>
        <p><span>5.</span>竞拍中，每30分钟可参与一次抽奖活动，随机抽取1—100金条，每场抽奖活动持续5分钟。</p>
        <p><span>6.</span>竞拍成功后，竞拍获胜者需在公众号回复“兑奖”获取领奖页面，如实准确填写领奖所需信息。如30日内未提交则视为自动放弃。竞拍所得者参与出价的金条不予退还。</p>
      </div>
    </div>
    <div class="bidders_status">
      <div>
        <p>10次</p>
        <p>剩余出价</p>
      </div>
      <div>
        <p>540金条</p>
        <p>我的当前出价</p>
      </div>
      <div>
        <p>立即出价</p>
        <p>剩余金条：10000</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel';
  export default {
    data () {
      return {
        pagination: {
          activeColor: '#e4372e',
          color: '#fff'
        },
        goods: {
          headPic: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531924901590&di=c68d3de5f9fdf610cab70c58eeb43a6e&imgtype=0&src=http%3A%2F%2Fimg03.tooopen.com%2Fimages%2F20120807%2Fsy_201208071618090810.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531924901590&di=c68d3de5f9fdf610cab70c58eeb43a6e&imgtype=0&src=http%3A%2F%2Fimg03.tooopen.com%2Fimages%2F20120807%2Fsy_201208071618090810.jpg'
          ]
        },
      }
    },  
    watch: {
    },
    mounted() {
    },
    created() {
    },
    methods: {
    },
    components: {
      Carousel,
      Slide,
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../../style/mixin';
  .auction_home{
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
    .top_main {
      margin-bottom: .15rem;
      .head_tip{
        @include wh(100%, .5rem);
        background: #fff;
        display: flex;
        p{
          text-align: center;
          flex: 2.75;
          line-height: .5rem;
          @include sc(.15rem, #333333);
        }
        p:first-child{
          @include wh(0.86rem, 100%);
          padding-right: 0.16rem;
          @include bis('../../../../images/auction/state_bg.png');
          flex: 1;
          @include sc(.18rem, #fff);
        }
      }
      .banner_box{
        height: 3.275rem;
        overflow: hidden;
      }
      .title{
        //@include wh(100%, .7rem);
        background: #fff;
        border-radius: .12rem .12rem 0 0;
        padding: .1rem .15rem .04rem;
        margin-bottom: .075rem;
        p:first-child{
          @include sc(.18rem, #333333);
        }
        p:nth-child(2),p:nth-child(3){
          @include sc(.12rem, #666666);
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
      background: #fff;
      .bid_list{
        p{
          @include sc(.15rem, #666666);
          line-height: .45rem;
          padding-left: .13rem;
        }
        table{
          text-align: center;
          width: 100%;
          border-bottom: 1px solid #f6f5f5;
          tr{
            height: .45rem;
          }
          thead{
            @include sc(.13rem, #666666);
            background-color: #f6f5f5;
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
                  @include sc(.13rem, #fff);
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
                @include sc(.13rem, #666666);
              }
              td:nth-child(3){
                @include sc(.185rem, #333333);
              }
              td:last-child{
                @include sc(.12rem, #999999);
              }
            }
            tr:nth-child(even){
              background: #f6f5f5;
            }
          }
        }
      }
      .bid_process{
        padding-left: .12rem;
        border-bottom: 1px solid #f6f5f5;
        .process_title{
          @include sc(.15rem, #666666);
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
              @include sc(.105rem, #666666);
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
          @include sc(.15rem, #666666);
          line-height: .8rem;
        }
        p{
          @include sc(.13rem, #666666);
          line-height: 1.84;
          padding-left: .24rem;
          padding-right: .29rem;
          position: relative;
          text-align: justify;
          span{
            position: absolute;
            left: 0rem;
            top: 0rem;
          }
        }
      }
    }
    .bidders_status{
      @include wh(100%, .5rem);
      text-align: center;
      display: flex;
      div{
        padding: .05rem 0;
      }
      div:first-child,div:nth-child(2){
        width: 1rem;
        background: #fff;
        p:first-child{
          @include sc(.15rem ,#666666);
        }
        p:last-child{
          @include sc(.12rem ,#999999);
        }
      }
      div:first-child{
        position: relative;
        &:after{
          content: '';
          border-style: solid;
          border-width: .08rem 0 .0725rem .0725rem;
          border-color:transparent transparent transparent #666666;
          opacity: .2;
          display: block;
          position: absolute;
          top: 30%;
          right: 0.1rem;
        }
      }
      div:last-child{
        background-image: linear-gradient(133deg, #fc5b46, #fa424f);
        width: 1.75rem;
        p:first-child{
          @include sc(.15rem ,#fff);
        }
        p:last-child{
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
</style>
