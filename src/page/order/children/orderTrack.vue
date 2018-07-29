 <template>
  <div class="order_track_page">
        <section v-if="!showLoading" id="scroll_section" class="scroll_container">
            <section class="scroll_insert">
				<div class="page-top-red"></div>
				<section class="order_track_detail border_radius">
					<ul>
						<li class="order_track_step" v-if="order_track.order_track_step.length >= 5">
							<div>
								<p>{{order_track.order_track_step[4] | date_hm}}</p>
								<p>{{order_track.order_track_step[4] | date_md}}</p>
							</div>
							<span class="have_after">收</span>
							<div>
								<p style="text-indent: -.06rem;">【订单完成】</p>
								<p>感谢您的支持，欢迎再次来哦～</p>
							</div>
						</li>
						<li class="order_track_step" v-if="order_track.order_track_step.length >= 4">
							<div>
								<p>{{order_track.order_track_step[3] | date_hm}}</p>
								<p>{{order_track.order_track_step[3] | date_md}}</p>
							</div>
							<span class="have_after distributing"><b></b></span>
							<div>
								<p style="text-indent: -.06rem;">【配送中】</p>
								<p> 快递小哥已出发，请耐心等待</p>
 								<p>联系电话：<b class="phone_number">13899998888</b></p>
							</div>
						</li>
						<li class="order_track_step" v-if="order_track.order_track_step.length >= 3">
							<div>
								<p>{{order_track.order_track_step[2] | date_hm}}</p>
								<p>{{order_track.order_track_step[2] | date_md}}</p>
							</div>
							<span class="have_after circle_only"><b></b></span>
							<div class="align_center">
								<p style="text-indent: -.06rem;">【商品已发货】</p>
							</div>
						</li>
						<li class="order_track_step" v-if="order_track.order_track_step.length >= 2">
							<div>
								<p>{{order_track.order_track_step[1] | date_hm}}</p>
								<p>{{order_track.order_track_step[1] | date_md}}</p>
							</div>
							<span class="have_after circle_only"><b></b></span>
							<div>
								<p style="text-indent: -.06rem;">【支付成功】</p>
								<p>我们会尽快发货的哟～</p>
							</div>
						</li>
						<li class="order_track_step" v-if="order_track.order_track_step.length >= 1">
							<div>
								<p>{{order_track.order_track_step[0] | date_hm}}</p>
								<p>{{order_track.order_track_step[0] | date_md}}</p>
							</div>
							<span class="circle_only"><b></b></span>
							<div>
								<p> 订单提交成功</p>
 								<p>订单号：<b class="phone_number">{{order_track.order_number}}</b></p>
							</div>
						</li>
					</ul>	
				</section>
            </section> 
        </section>  
        <foot-guide></foot-guide>
        <transition name="loading">
            <loading v-if="showLoading"></loading>
        </transition>
    </div>
</template>

<script>
    import loading from 'src/components/common/loading'
    import footGuide from 'src/components/footer/footGuide'
    import {addzero} from '../../../config/mUtils'

    export default {

      data(){
            return{
                showLoading: true, //显示加载动画
                // order_msg_title: ['订单提交成功', '支付成功', '商品已发货', '配送中', '订单完成'],
                order_track:{
                	order_track_step: [1529468580000, 1529468580000, 1529468580000, 1529468580000, 1529468580000],
                	order_number: 13899998888,
                	distribute_msg: {
                		mobile: 13899998888 
                	}
                }
            }
        },
        created () {
            this.showLoading = false
            console.log
        },
        mounted(){
        },
        components: {
            loading, footGuide
        },
        computed: {
        },
        methods: {
        	addzero (number) {
        		return number < 10 ? '0' + number : number;
        	}
        },
        watch: {
        },
        filters: {
        	date_md: function(time) {
        		return (addzero(new Date(time).getMonth() + 1)) + '-' + addzero(new Date(time).getDate()); 
        	},
        	date_hm: function(time) {
        		return (addzero(new Date(time).getHours()) + ':' + addzero(new Date(time).getMinutes()));
        	}
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .order_track_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .scroll_container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .scroll_insert{
        padding-bottom: .6rem;
    }
    .page-top-red{
        width: 100%;
        height: .83rem;
        background-image: linear-gradient(to bottom, #fc5b46 44%, #fa424f);
    }
    .border_radius{
        box-shadow: 0px 1px 13.9px 0.6px rgba(181, 184, 188, 0.51);
        border-radius: .1rem;
        @include wh(3.5rem, auto);
        background-color: #fff;
        margin: 0 auto;
        margin-bottom: .16rem;
    }
    .order_track_detail{
    	padding: .2rem .15rem;
    	margin-top: -.4rem;
    	@include sc(.15rem,#666666);
    	line-height: .24rem;
    	min-height: 5.5rem;
    	.order_track_step {
    		display: flex;
    		@include fj;
    		margin-bottom: .3rem;
    		.phone_number{
    			color: #e4372e;
    		}
    		span{
	    		@include wh(.25rem,.25rem);
	    		border-radius: 50%;
	    		text-align: center;
	    		line-height: .25rem;
	    		background: #ccc;
	    		color: #fff;
	    		margin-top: .1rem;
	    		position: relative;
	    	}
	    	.have_after:after{
	    		content:'';
	    		height: .9rem;
	    		border: .005rem solid #cdcdcd;
	    		background: #cdcdcd;
	    		position: absolute;
	    		left: 0.116rem;
			    top: .25rem;
	    	}
	    	.received:after{
	    		border: 0.005rem dashed #ccc;
	    	}
	    	.circle_only{
	    		background: rgba(255,255,255,0);
	    		padding: .075rem;
	    		b{
	    			background: #ccc;
	    			@include wh(.1rem,.1rem);
	    			display: block;
	    			border-radius: 50%;
	    		}
	    	}
	    	.circle_only:after{
	    		top: 0.12rem;
	    		height: 1.02rem;
	    	}
	    	.distributing{
	    		@include bis('../../../images/icon-yfh.png');
	    	}
	    	div:nth-of-type(1){
	    		p:nth-of-type(1){
	    			@include sc(.18rem,#666666);
	    		}
	    		p:nth-of-type(2){
	    			@include sc(.13rem,#999999);
	    			text-indent: .04rem;
	    		}
	    	}
	    	div:nth-of-type(2){
	    		min-height:.72rem;
	    		min-width: 2.1rem;
	    	}
    	}
    }
    .align_center{
    	display: flex;
	    align-items: center;
    }
    .loading-enter-active, .loading-leave-active {
        transition: opacity .7s
    }
    .loading-enter, .loading-leave-active {
        opacity: 0;
    }
    
</style>
