<template>
  <div class="growingEnvironment">
      <img v-for="item in pics" :src="item" alt="" width="100%" class="show">
  </div>
</template>
<script>
    import {brandsPics} from '../../service/getData'
  export default {
    data () {
      return {
        dataId:"",
          pics:[]
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
    },
    methods: {

    },
  }
</script>
<style>

</style>

