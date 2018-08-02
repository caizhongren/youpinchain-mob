<template>
  <div class="growingEnvironment header-top">
      <head-top class="header" go-back='true' :headTitle="headTitle"></head-top>
      <img v-for="item in pics" :src="item" alt="" width="100%" class="show">
  </div>
</template>
<script>
  import {brandsPics} from '../../service/getData'
  import headTop from 'src/components/header/head'
  export default {
    data () {
      return {
        dataId:"",
          pics:[],
          headTitle: ''
      }
    },
    watch: {

    },
    mounted() {
        brandsPics(this.dataId).then(res => {
            if (res.errno !== 0){
                return;
            }
            this.pics = res.data;
        })

    },
    created() {
        this.dataId = this.$route.query.dataId;
        this.headTitle = this.dataId === '2' ? '生长环境' : this.dataId === '4' ? '饲养情况' : '健康指标'
    },
    methods: {

    },
    components: {
        headTop
    }
  }
</script>
<style>

</style>

