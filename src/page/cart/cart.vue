<template>
	<div>
		<nav class="shop_list_container">
			<div class="swiper-container" v-if="carts.length">
				<div class="topBG"></div>
				<div class="shop_info">
					<ul class="goods">
						<li v-for="item in carts" :key="item.cartId">
							<span :class="[item.choose ? 'choose' : 'unselected']" @click="item.choose = !item.choose"></span>
							<img :src="item.thumbnailPic" alt="" class="img">
							<div class="goods_info">
								<p class="name">{{item.productName}}</p>
								<p class="price"><span>¥</span>{{item.presentPrice}}</p>
							</div>
							<div class="cart_btns">
								<span class="subduction" :class="{'disabled': item.number <= 1}" @click="item.number > 1 ? addNumber(item, -1) : deleteCart(item)"></span>
								<span class="num">{{item.number}}</span>
								<span class="add" @click="addNumber(item, 1)"></span>
							</div>
						</li>
					</ul>
					<ul class="payment_info">
						<li>
							<p>商品总价</p>
							<p>¥{{goodsPrice}}</p>
						</li>
						<li>
							<p>优惠券</p>
							<p class="coupon">无可用</p>
						</li>
						<li>
							<p>商品实付</p>
							<p>¥{{payment}}</p>
						</li>
						<li>
							<p>运费</p>
							<p>¥{{fare}}</p>
						</li>
					</ul>
					<div class="right totalPrice">
						合计 <p><span>¥</span>{{totalPrice}}</p>
					</div>
				</div>
			</div>
			<div class="no_list" v-else>
				<img src="../../images/buy-icon-n-normol.png" alt="您还没有添加任何商品哦～" width="15%">
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
					<div class="right add_cart"></div>
				</li>
			</ul>
			<router-link :to="'/home'" class="load_more">查看更多商品</router-link>
		</div>
		<ul class="settlement">
			<li @click="selectAll = !selectAll">
				<span :class="[selectAll ? 'selectAll' : 'unselected']"></span> 全选
			</li>
			<li>
				<p>合计 <span class="red">¥{{totalPrice}}</span></p>
				<p>运费 ¥{{fare}}</p>
			</li>
			<router-link tag="li" :to="'/confirmOrder'">去结算</router-link>
		</ul>
		<foot-guide></foot-guide>
	</div>    
</template>

<script>
import footGuide from 'src/components/footer/footGuide'
import {findCart, updateCart, deleteCart, submitOrder} from '../../service/getData'

export default {
	data(){
		return {
			selectAll: false,
			totalPrice: 188,
			goodsPrice: 88,
			payment: 88,
			fare: 8.8,
			carts: [],
			recommendList: [
				{
					id: 0,
					name:'猪耳朵500g*1份aaaaaaaaaa',
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
		findCart(1, 100).then(res => {
			this.carts = res.data.cart;
		})
	},
	components: {
		footGuide,
	},
	computed: {
	},
	methods: {
		toSettlement () {
		},
		/**
		 * 添加或删除购物车商品数量
		 */
		addNumber(cart, number) {
			updateCart(cart.cartId, number).then(res => {
				if (res.errno == 0) {
					cart.number = cart.number + number;
				} 
			})
		},

		/**
		 * 删除购物车
		 */
		deleteCart(cart) {
			deleteCart(cart.cartId).then(res => {
				if (res.errno == 0) {
					this.carts.splice(this.carts.indexOf(cart), 1);
				}
			})
		}
	},
	watch: {
	}
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.recommend_nav {
		background-color: $fc;
		padding-bottom: 1.65rem;
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
				.left {
					width: 80%;
				}
				.name {
					@include sc(.15rem, $g3);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
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
					@include wh(.315rem, .315rem);
					@include bis('../../images/shopping_cart.png');
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
		background-color: $bc;
		.no_list {
			padding: .5rem 0;
			text-align: center;
			p {
				@include sc(.12rem, $g6);
				margin: .15rem 0 0;
			}
		}
		.swiper-container {
			padding-bottom: .15rem;
			.topBG {
				@include wh(100%, .83rem);
				@include bis('../../images/gwc-bg.png');
			}
			.shop_info {
				margin: -.48rem auto 0;
				width: 95%;
				background-color: $fc;
				padding: .2rem .15rem;
				border-radius: 10px;
				overflow: hidden;
				.goods {
					border-bottom: 1px solid #ddd;
					li {
						position: relative;
						margin-bottom: .26rem;
					}
					.unselected {
						border-radius: 50%;
						display: inline-block;
						border: 1.5px solid $g9;
						@include wh (.19rem, .19rem);
					}
					.choose {
						@include bis('../../images/selected.png');
						display: inline-block;
						@include wh (.19rem, .19rem);
					}
					.img {
						display: inline-block;
						border-radius: 5px;
						@include wh (.95rem, .945rem);
						background-color: #000;
						vertical-align: middle;
						margin-left: .05rem;
					}
					.goods_info {
						display: inline-block;
						.name {
							@include sc(.15rem, $g3);
							top: -.1rem;
							position: relative;
						}
						.price {
							@include sc(.18rem, $red);
							font-weight: bold;
							position: relative;
    					top: .38rem;
							span { 
								display: inline-block;
								@include sc(.12rem, $red);
								font-weight: normal; 
								transform: scale(.8) translateY(1px);
							}
						}
					}
					.cart_btns {
						position: absolute;
						right: 0;
						bottom: 0;
						display: flex;
						.subduction, .num, .add {
							@include wh(.23rem, .23rem);
							display: inline-flex;
							flex: 1;
							align-items: center;
							justify-content: center;
						}
						.num {
							@include sc(.18rem, $red);
							vertical-align: top;    
							margin: 0 .1rem;
						}
						.subduction {
        			@include bis('../../images/sub-icon.png');
						}
						.subduction.disabled {
        			@include bis('../../images/sub-disable-icon.png');
						}
						.add {
        			@include bis('../../images/add-icon.png');
						}
					}
				}
				.payment_info {
					overflow: hidden;
					padding: .15rem 0;
					border-bottom: 1px solid #ddd;
					li {
						@include wh(100%, .35rem);
						line-height: .35rem;
						p {
							@include sc(.15rem, $g6);
						}
						p:nth-child(odd) {
							float: left;
						}
						p:nth-child(even) {
							float: right;
						}
						p.coupon {
							color: $g9;
						}
					}
					
				}
				.totalPrice {
					margin-top: .12rem;
					p {
						display: inline-block;
						@include sc(.2rem, $g3);
						font-weight: bold;
						span {
							@include sc(.13rem, $g3);
							font-weight: normal;
						}
					}
				}
			}
		}
	}
	.settlement {
		position: fixed;
		bottom: 0.49rem;
		line-height: .675rem;
		background-color: $fc;
		border: solid 0.5px #cccccc;
		@include wh(100%, .675rem);
		overflow: hidden;
		li {
			float: left;
			text-align: center;
		}
		li:nth-child(1) {
			width: 46.33%;
			text-align: left;
			padding-left: .2rem;
		}
		li:nth-child(2) {
			text-align: left;
			padding-right: .12rem;
			line-height: 1;
			padding-top: .05rem;
			.red {
				@include sc(.18rem, $red);
				font-weight: 600;
			}
			p {
				line-height: 1.5;
				@include sc(.15rem, $g6);
			}
		}
		li:nth-child(3) {
			width: 30.33%;
			@include sc(.15rem, $fc);
			background-color: $red;
		}
		.unselected {
			border-radius: 50%;
			display: inline-block;
			border: 1.5px solid $g9;
			@include wh (.19rem, .19rem);
			vertical-align: text-bottom;
		}
		.selectAll {
			@include bis('../../images/selected.png');
			display: inline-block;
			@include wh (.19rem, .19rem);
			vertical-align: text-bottom;
		}
	}
</style>
