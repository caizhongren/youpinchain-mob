 <template>
    <div class="page">
        <span class="rem_time">
           {{remaining}}
        </span>
    </div>
</template>

<script>

    export default {
        data(){
            return{
                countNum: 900,
                showAlert: false
            }
        },
        mounted(){
            this.countNum -= this.numTime;
            this.remainingTime();
        },
        props: ['time'],
        components: {
        },
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
            //计算时间
            remainingTime(){
                clearInterval(this.timer);
                this.timer = setInterval(() => {
                    this.countNum --;
                }, 1000);
            }
        },
        computed: {
            //转换时间成分秒
            remaining: function (){
                let minute = parseInt(this.countNum/60);
                let second = parseInt(this.countNum%60);
                if (minute < 10) {
                    minute = '0' + minute;
                }
                if (second < 10) {
                    second = '0' + second;
                }
                if(this.countNum > 0){
                    return '支付 ' + minute + ':' + second;
                } else {
                    return '支付超时'
                }
                
            },
            //订单返回时间秒分分别处理
            numTime: function (){
                if (this.time.toString().indexOf('分钟') !== -1) {
                    return parseInt(this.time)*60;
                }else{
                    return parseInt(this.time);
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
	.page{
        display: inline-block;
        height: .32rem;
        border-radius: .16rem;
        background: $red;
        padding: 0 .1rem;
        margin-left: .1rem;
        .rem_time{
            border-radius: .03rem;
            @include sc(.15rem,$fc);
            line-height: .32rem;
        }
    }
</style>
