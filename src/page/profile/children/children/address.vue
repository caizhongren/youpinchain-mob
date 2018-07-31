 <template>
  	<div class="rating_page">
        <section class="address">
        	<ul class="addresslist">
        		<li v-for='(item,index) in adressList' @click="selectOrEdit(item, index)">
                    <span class="default-address" v-show="addressIndex === index"></span>
        			<div class="address-detail">
        				<p>{{item.detailedAddress}}</p>
        				<p><span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.mobile}}</span></p>
        			</div>
        			<div class="deletesite" @click.stop="toEdit(item, index)">
        				<span></span>
        			</div>
        		</li>
        	</ul>
            <div class="no_address" v-show="adressList.length === 0">您还没有添加过地址哦～</div>
			<router-link to='/profile/info/address/add'>
				<div class="addsite">
					+ 添加新地址
				</div>
			</router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import headTop from 'src/components/header/head'
    import {getAddressList} from '../../../../service/getData'
    import {mapState, mapMutations} from 'vuex'

    export default {
      data(){
            return{
    			adressList:[] //地址列表
            }
        },
        mounted(){
            getAddressList().then(res => {
                this.adressList = res.data;
            })
        },
        created () {
            if(this.$route.query.path !== 'confirmOrder'){
                this.selectedAddress = null;
            }
        },
        components: {
        },
        computed:{
			...mapState([
				'addressIndex'
			]),
        },
        props:[],
        methods: {
			...mapMutations([
				'CHOOSE_ADDRESS'
			]),
            selectOrEdit (address, index) {
                index = -1
                if(this.$route.query.path === 'confirmOrder'){
                    this.CHOOSE_ADDRESS({address, index});
                    this.$router.go(-1);
                } else {
                    this.$router.push({name: 'editAddress', query:{addressId: address.id}});
                }
            },
            toEdit (address, index) {
                this.$router.push({name: 'editAddress', query:{addressId: address.id}})
            }
        },
        watch: {
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  
    .rating_page{
        position: absolute;
        top: 0;
        background-color: #f2f2f2;
        z-index: 202;
        @include wh(100%,100);
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .edit{
    	right: 0.08rem;
        @include sc(0.14rem, #fff);
        @include ct;
    }
    .address{
    	width:100%;
    	margin-top:.08rem;
        padding-bottom: .6rem;
    	.addresslist{
    		li{
                margin: .16rem .12rem;
                padding: .21rem .17rem .25rem .57rem;
    			@include fj(space-between);
                border-radius: 10px;
                background-color: #ffffff;
                box-shadow: 0px 1px 13.9px 0.6px rgba(110, 194, 46, 0.24);
                position: relative;
                .default-address{
                    @include wh(.43rem,.42rem);
                    position: absolute;
                    left: 0;
                    top: 0;
                    @include bis('../../../../images/add-slected.png');
                }
                .address-detail{
                    position: relative;
                    width: 2.3rem;
                    p{
                        line-height: 1.6;
                        @include sc(.15rem,#666666);
                        span{
                            display:inline-block;
                            @include sc(.15rem,#666666);
                        }
                    }
                    p:nth-of-type(1){
                        margin-bottom: .24rem;
                    }
                }
    			.address-detail:before{
                    content: '';
                    position: absolute;
                    left: -.28rem;
                    top: 0rem;
                    @include bis('../../../../images/gwc-icon-add.png');
                    @include wh(.16rem,.22rem);
                }
    			.deletesite{
    				display:flex;
    				align-items:center;
                    width: .5rem;
    				span{
    					display:block;
    					@include wh(.23rem,.23rem);
                        margin-left: .2rem;
                        @include bis('../../../../images/icon-edit-nor.png')
    				}
    			}
    		}
    	}
        .no_address{
            @include sc(.15rem,#666666);
            text-align: center;
            line-height: 6rem;
            background: #fff;
            position: fixed;
            bottom: .5rem;
            width: 100%;
        }
    	.addsite{
    		background:#e4372e;
    		@include wh(100%,.5rem);
            line-height: .5rem;
            position: fixed;
            bottom: 0;
            text-align: center;
			@include sc(.15rem,#fff);
            font-weight: bold;
    	}
    }
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(.4rem, 0, 0);
    opacity: 0;
}
</style>
