<template>
  <div class="invite_landing" v-client-height ref="test">
    <img :src="output" width="100%" v-if="showImages" ref="output"/>
    <div class="box" v-if="!showImages" v-client-height>
      <div class="bg" v-client-height></div>
      <div class="container" v-client-height>
        <div class="title">宣传语</div>
        <div class="qrcode" id="qrcode"></div>
        <div class="content">宣传语宣传语宣传语</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {QRCode} from '../../../../plugins/qrcode.js'
  import { inviteCode } from '../../../../service/getData'
  export default {
    name: 'inviteLanding',
    data () {
      return {
        output: null,
        showImages: false
      }
    },
    props: ['url'],
    watch: {

    },
    mounted() {
      //获取我的分享码
      var that = this
      inviteCode().then(res => {
          that.url = res.data
          that.qrcode = new QRCode(document.getElementById('qrcode'), {
              text: that.url,
              width: 150,
              height: 150,
              colorDark: '#000000',
              colorLight: '#ffffff'
          })
          setTimeout(function (){
            if (that.url) {
              that.print()
            }
          }, 100)
      })
    },
    created() {
      
    },
    methods: {
      print() {
        const el = this.$refs.test;
        const options = {
          type: 'dataURL'
        }
        console.log(this.output)
        var that = this
        that.$html2canvas(el, options).then(function(result) {
          that.showImages = true
          that.output = result;
        });
      }
    },
  }
</script>
<style lang="scss" scope>
  @import '../../../../style/mixin';
  .invite_landing {
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    img {
      display: block;
    }
    .box {
      position: relative;
      .bg {
        position: absolute;
        width: 100%;
        @include bis('../../../../images/bounty-plan/share_poster.png');
      }
      .container {
        position: relative;
        z-index: 111;
        margin: 0 auto;
        padding-top: 1.83rem;
        width: 80%;
        text-align: center;
        .title {
          @include sc(.18rem, $g3);
          height: .6rem;
        }
        .content {
          @include sc(.15rem, $g3);
        }
        .qrcode {
          @include wh(2.26rem,2.26rem);
          border-radius: .05rem;
          background: #000;
          margin: 0.12rem auto .05rem;
        }
      }
    }
  }
</style>
