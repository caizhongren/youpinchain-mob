<template>
	<div>
		<nav class="shop_list_container">
			<div class="swiper-container" v-if="shopList.length">
				
			</div>
			<div class="no_list" v-else>
				<img src="../../images/youpinchain/buy-icon-n-normol.png" alt="您还没有添加任何商品哦～" width="15%">
				<p>您还没有添加任何商品哦～</p>
			</div>
		</nav>
		<div class="recommend_nav">
			<div class="recommend_header">推荐商品</div>
			<ul class="recommend_list">
				<li v-for="item in recommendList" :key="item.id">
					<img src="" alt="" class="img">
					<div class="left">
						<p class="name">{{item.name}}</p>
						<p class="price"><span>¥</span>{{item.price}} <s>¥{{item.marketPrice}}</s></p>
					</div>
					<div class="right add_cart">+</div>
				</li>
			</ul>
			<router-link :to="'/home'" class="load_more">查看更多商品</router-link>
		</div>
		<foot-guide></foot-guide>
	</div>    
</template>

<script>
import footGuide from 'src/components/footer/footGuide'

export default {
	data(){
		return {
			shopList: [],
			recommendList: [
				{
					id: 0,
					name:'猪耳朵500g*1份',
          price: 23.99,
          marketPrice: 33.99,
				},
				{
					id: 1,
					name:'2猪耳朵500g*1份',
          price: 23.99,
          marketPrice: 33.99,
				},
				{
					id: 2,
					name:'2猪耳朵500g*1份',
          price: 23.99,
          marketPrice: 33.99,
				},
				{
					id: 3,
					name:'2猪耳朵500g*1份',
          price: 23.99,
          marketPrice: 33.99,
				}
			]
		}
	},
	async beforeMount(){
	},
	mounted(){
	},
	components: {
		footGuide,
	},
	computed: {
	},
	methods: {
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.recommend_nav {
		background-color: $fc;
		padding-bottom: .65rem;
		.recommend_header {
			padding-left: .16rem;
			border-left: 7px solid $red;
			line-height: .45rem;
			border-bottom: 1px solid #f7f7fa;
			border-top: 1px solid #f7f7fa;
			@include wh(100%, .45rem);
			@include sc(.15rem, $g6);
		}
		.recommend_list {
			overflow: hidden;
			background-color: $fc;
			padding: .25rem .15rem 0;
			li:nth-child(odd) {
				float: left;
			}
			li:nth-child(even) {
				float: right;
			}
			li {
				@include wh(47.5%, 2.35rem);
				.img {
					background-color: #000;
					@include wh(100%, 1.65rem);
					display: block;
					border-radius: 5px;
					margin-bottom: .02rem;
				}
				.name {
					@include sc(.15rem, $g3);
				}
				.price {
					@include sc(.18rem, $red);
					font-weight: bold;
					span { 
						@include sc(.12rem, $red);
						font-weight: normal; 
						display: inline-block;
						transform: scale(.7) translateY(2px);
					}
					s { 
						@include sc(.12rem, $g9);
						font-weight: normal; 
					}
				}
				.add_cart {
					border: 2px solid $red;
					@include wh(.325rem, .325rem);
					@include sc(.35rem, $red);
					border-radius: 50%;
					line-height: .7;
					font-weight: bold;
					text-align: center;
					margin-top: .08rem;
				}
			}
		}
		.load_more {
			@include wh(35%, .28rem);
			@include sc(.14rem, $red);
			background-color: $fc;
			margin: 0rem auto;
			text-align: center;
			line-height: .28rem;
			border-radius: 15px;
			border: 1px solid $red;
			display: block;
		}
	}
	.shop_list_container {
		background-color: $fc;
		.no_list {
			padding: .5rem 0;
			text-align: center;
			p {
				@include sc(.12rem, $g6);
				margin: .15rem 0 0;
			}
		}
	}
</style>
