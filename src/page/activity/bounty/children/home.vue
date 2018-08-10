<template>
  <div class="bounty_home">
      <div class="top_header">
          <router-link tag="div" class="fl" :to="'/bountyPlan/userCenter'"></router-link>
          <div class="gold_box">
              <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/0'">金钻 {{data.balance.goldDrill}}</router-link>
              <router-link tag="p" :to="'/bountyPlan/userCenter/goldRecord/1'">金条 {{data.balance.bullion}}</router-link>
          </div>
      </div>
  </div>
</template>
<script>
    import { bountyHome } from '../../../../service/getData'
    export default {
        data () {
            return {
                data: {
                    balance: {
                        goldDrill: 0,
                        bullion: 0,
                    },

                },
            }
        },
        watch: {

        },
        mounted() {
            //获取首页信息
            bountyHome().then(res => {
                this.data = res.data
            })
        },
        created() {
            
        },
        methods: {

        },
    }
</script>
<style scoped>
   .bounty_home {

   }
</style>
