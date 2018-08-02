<template>
  <div class="growingEnvironment header-top">
      <head-top class="header" go-back='true' :headTitle="headTitle"></head-top>
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
          headTitle: '关于我们'
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
        headTop
    }
  }
</script>
<style>

</style>