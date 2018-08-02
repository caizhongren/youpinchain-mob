<template>
    <div class="profile_page">
        <section>
            <div class="profile-top-red"></div>
            <section class="profile-number">
                <div class="profile-link">
                    <img :src="userInfo.userImgUrl" alt="" class="privateImage" v-if="userInfo && userInfo.userImgUrl">
                    <div class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </div>
                    <p class="user-name">{{userInfo.username}}</p>
                </div>
            </section>
            <section class="info-data">
                <router-link to='/order' class="my-order" tag="div">
                    <span>我的订单</span>
                    <span class="to-all-order">
                        全部订单
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
                <ul class="clear">
                    <router-link to="/order/unpaid" tag="li" class="info-data-link">
                        <span class="info-data-top"><b class="red-points" v-if="userInfo.unpaid">{{userInfo.unpaid}}</b></span>
                        <span class="info-data-bottom">待支付</span>
                    </router-link>
                    <router-link to="/order/undelivery" tag="li" class="info-data-link">
                       <span class="info-data-top"><b class="red-points" v-if="userInfo.undelivery">{{userInfo.undelivery}}</b></span>
                       <span class="info-data-bottom">待发货</span>
                    </router-link>
                    <router-link to="/order/delivered" tag="li" class="info-data-link">
                        <span class="info-data-top"><b class="red-points" v-if="userInfo.delivered">{{userInfo.delivered}}</b></span>
                        <span class="info-data-bottom">已发货</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的优惠券 -->
                <router-link to='/coupon' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>我的优惠券</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 地址管理 -->
                <router-link to='/profile/info/address' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>地址管理</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 联系客服 -->
                <div class="myorder" @click="showAlertTip = !showAlertTip">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>联系客服</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <!-- 关于我们 -->
                <router-link to='/aboutUs' class="myorder">
                    <aside></aside>
                    <div class="myorder-div">
                        <span>关于我们</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            
        </section>
        <alert-tip :showAlertTip="showAlertTip" :type="2" :alertText='`<p>确定拨打客服电话 <br> 400-990-7626</p>`' v-show="showAlertTip"></alert-tip>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import alertTip from "src/components/common/alertTip";
import footGuide from "src/components/footer/footGuide";
import { orderStat, userInfo } from '../../service/getData';

export default {
  data() {
    return {
      showAlertTip: false,
      orderStat: {},
      userInfo: {
        userImgUrl: "",
        username: "",
        unpaid: 0,
        undelivery: 0,
        delivered: 0
      }
    };
  },
  mounted() {
      orderStat().then(res => {
          if(res.errno !== 0){
            return;
          }

          res.data.orderStat.forEach(stat => {
            if (stat.status == 101) {
              this.userInfo.unpaid = stat.count;
            }
            if (stat.status == 201) {
              this.userInfo.undelivery = stat.count;
            }

            if (stat.status == 301) {
              this.userInfo.delivered = stat.count;
            }

          });

      }),

      userInfo().then(res => {
        if (res.errno == 0) {
          this.userInfo.userImgUrl = res.data.headImgUrl;
          this.userInfo.username = res.data.nickName;
        }
      })
  },
  components: {
    footGuide,
    alertTip
  },

  computed: {},

  methods: {},
  watch: {}
};
</script>

<style lang="scss" scoped>
@import "src/style/mixin";

.profile_page {
  p,
  span {
    font-family: Helvetica Neue, Tahoma, Arial;
  }
  padding-bottom: 0.6rem;
}
.profile-top-red {
  height: 0.83rem;
  width: 100%;
  background-image: linear-gradient(to bottom, #fc5b46, #fa424f);
}
.profile-number {
  height: 1.2rem;
  width: 3.5rem;
  margin: 0 auto;
  margin-top: -0.5rem;
  margin-bottom: 0.15rem;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 10px;
  .profile-link {
    padding: 0.05rem 0;
    text-alig: center;
    display: block;
    box-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .privateImage {
      @include wh(0.75rem, 0.75rem);
      border-radius: 50%;
      vertical-align: middle;
      margin: 0 auto;
      display: block;
      .privateImage-svg {
        border-radius: 50%;
        @include wh(0.75rem, 0.75rem);
        display: block;
      }
    }
    .user-name {
      font-size: 0.15rem;
      font-weight: bold;
      color: #333333;
      text-align: center;
    }
  }
}
.info-data {
  width: 3.5rem;
  margin: 0 auto;
  border-radius: 10px;
  background: $fc;
  box-sizing: border-box;
  .my-order {
    height: 0.44rem;
    border-bottom: 1px solid #f1f1f1;
    span {
      line-height: 0.44rem;
      color: #333333;
      font-size: 0.15rem;
      padding-left: 0.12rem;
      float: left;
    }
    .to-all-order {
      color: #999999;
      font-size: 0.13rem;
      float: right;
      svg {
        width: 0.1rem;
        height: 0.1rem;
        margin: 0 0.12rem 0 0.1rem;
      }
    }
  }
  ul {
    .info-data-link {
      float: left;
      width: 33.33%;
      display: inline-block;
      span {
        display: block;
        width: 100%;
        text-align: center;
      }
      .info-data-top {
        margin: 0.17rem auto 0.09rem;
        position: relative;
        @include wh(0.29rem, 0.275rem);
        @include bis("../../images/mine-icon-dzf.png");
      }
      .info-data-bottom {
        @include sc(0.114rem, #666);
        font-weight: 400;
        padding-bottom: 0.09rem;
      }
    }
    .info-data-link:nth-of-type(2) .info-data-top {
      @include bis("../../images/mine-icon-dfh.png");
    }
    .info-data-link:nth-of-type(3) .info-data-top {
      @include bis("../../images/mine-icon-yfh.png");
    }
  }
}
.profile-1reTe {
  margin-top: 0.15rem;
  background: $fc;
  border-radius: 10px;
  .myorder {
    padding-left: 0.32rem;
    display: flex;
    align-items: center;
    @include wh(100%, 0.55rem);
    border-bottom: 1px solid #f1f1f1;
    aside {
      @include wh(0.28rem, 0.26rem);
      margin-left: -0.172rem;
      margin-right: 0.18rem;
      display: flex;
      align-items: center;
      @include bis("../../images/mine-wdyhq.png");
    }
    .myorder-div {
      width: 100%;
      padding: 0.086rem 0.053rem 0.086rem 0;
      @include sc(0.028rem, #333);
      display: flex;
      justify-content: space-between;
      span {
        display: block;
        font-size: 0.15rem;
      }
      .myorder-divsvg {
        @include wh(0.1rem, 0.175rem);
        width: 0.1rem;
        margin-right: 0.12rem;
        svg {
          @include wh(180%, 180%);
          margin-top: -0.05rem;
        }
      }
    }
  }
  .myorder:nth-of-type(2) aside {
    @include bis("../../images/mine-dzgl.png");
  }
  .myorder:nth-of-type(3) aside {
    @include bis("../../images/mine-lxkf.png");
  }
  .myorder:nth-of-type(4) aside {
    @include bis("../../images/mine-gywm.png");
  }
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(0.4rem, 0, 0);
  opacity: 0;
}
</style>
