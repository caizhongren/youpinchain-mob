<template>
    <div class="introduce">
        <ul class="tabs">
            <li v-for="(item,index) in tabs" :key="index" :class="{'active': activeTab == index}" @click="switchTab(index)">{{item.name}}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        tabs: [
            {
                tab: 0,
                name: '商品介绍',
                component: 'introduceHome'
            },
            {
                tab: 1,
                name: '生长环境',
                component: 'growth'
            },
            {
                tab: 2,
                name: '饲养安全',
                component: 'feeding'
            }
        ],
        activeTab: 0
      }
    },
    watch: {

    },
    mounted() {
    },
    created() {
        location.pathname.indexOf('growth') !== -1 ? this.activeTab = 1 : location.pathname.indexOf('feeding') !== -1 ? this.activeTab = 2 : this.activeTab = 0;
    },
    methods: {
        switchTab: function (index) {
            if (this.activeTab !== index) {
                this.activeTab = index
                this.$router.replace({name: this.tabs[index].component})
            }
        }
    },
    components: {
    }
  }
</script>
<style scoped lang="scss">
    @import '../../../style/mixin';
    .introduce {
        padding-top: .45rem;
        .tabs {
            @include wh(100%,.45rem);
            @include sc(.15rem,$g6);
            line-height: .45rem;
            background: $fc;
            position: fixed;
            top: 0;
            z-index: 9;
            li {
                float: left;
                @include wh(33.33%,.45rem);
                border-bottom: 1px solid #eee;
                text-align: center;
            }
            li.active {
                color: #e73525;
                font-weight: 500;
                position: relative;
                &:after {
                    content: '';
                    display: block;
                    @include wh(.36rem,.03rem);
                    border-radius: 1.5px;
                    background-color: #e73525;
                    position: absolute;
                    bottom: -2px;
                    left: 33%;
                }
            }
        }
    }
</style>

