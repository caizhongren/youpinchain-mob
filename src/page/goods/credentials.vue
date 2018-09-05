<template>
  <div class="credentials">
    <div id="anchor0">
      <div class="title"><span></span>检疫证</div>
      <div class="content">
        <img src="../../images/store/certificates_01.png" width="100%">
      </div>
    </div>
    <div id="anchor1">
      <div class="title"><span></span>合格证</div>
      <div class="content">
        <img src="../../images/store/certificates_02.png" width="65%">
      </div>
    </div>
    <div id="anchor2">
      <div class="title"><span></span>经营许可证</div>
      <div class="content">
        <img src="../../images/store/certificates_03.png" width="80%">
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    watch: {
      '$route': 'scrollToAnchor'
    },
    mounted() {
      var that = this
      window.onload = function(){
        that.scrollToAnchor();
      };
    },
    created() {
    },
    methods: {
      // 滚动到自定义的伪锚点
      scrollToAnchor(){
        var hash = window.location.hash.substring(1), // 获取url的hash值
          anchor = this.getAnchor(hash), // 获取伪锚点的id
          anchorDom, // 伪锚点dom对象
          anchorScrollTop; // 伪锚点距离页面顶部的距离
        // 如果不存在伪锚点,则直接结束
        if(anchor.length < 1){
          return;
        }
        anchorDom = document.getElementById(anchor);
        anchorScrollTop = anchorDom.offsetTop;
        this.animationToAnchor(document.body.scrollTop, anchorScrollTop);
      },
      /* 
        @function 滚动到指定位置方法
        @param startNum {int} -- 开始位置
        @param stopNum {int} -- 结束位置
      */
      animationToAnchor(startNum, stopNum){
        var that = this
        var nowNum = startNum + 10; // 步进为10

        if(nowNum > stopNum){
          nowNum = stopNum;
        }
        // 缓动方法
        window.requestAnimationFrame(function(){
          window.scrollTo(0,nowNum)
          // document.body.scrollTop = nowNum; // 当前示例页面，滚动条在body，所以滚动body
          // 滚动到预定位置则结束
          if(nowNum == stopNum){
            return;
          }

          that.animationToAnchor(nowNum, stopNum); // 只要还符合缓动条件，则递归调用
        });
      },
      // 获取锚点id
      getAnchor(str){
        return this.checkAnchor(str) ? str.split("#")[1] : "";
      },
      // 判断是否为特殊的hash值，也即是否为伪锚点
      checkAnchor(str){
        return str.indexOf("#") == 0 ? true : false;
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
  @import '../../style/mixin';
  .credentials {
    #anchor0, #anchor1, #anchor2 {
      background-color: $bc;
      span {
        @include wh(.05rem,.17rem);
        border-radius: .025rem;
        display: inline-block;
        margin-right: .07rem;
        vertical-align: sub;
      }
    } 
    #anchor1 {
      background-color: $fc;
      span {
        background-image: linear-gradient(357deg, #fb9d1c, #ffc868);
      }
      img {
        margin: .15rem auto;
      }
    }
    #anchor0 {
      span {
        background-image: linear-gradient(357deg, #3bc3a1, #74e7cc);
      }
      padding-bottom: .25rem;
      .content {
        background-color: $fc;
      }
    }
    #anchor2 {
      span {
        background-image: linear-gradient(357deg, #fc5b46, #fa424f);
      }
    }
    .title {
      @include sc(.15rem, $g3);
      padding: .2rem
    }
    .content {
      text-align: center;
    }
  }
</style>