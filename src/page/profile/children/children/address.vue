 <template>
  	<div class="rating_page">
        <section class="address">
        	<ul class="addresslist">
        		<li v-for='(item,index) in adressList' @click="selectDefault(index)">
                    <span class="default-address" v-show="selectedAddress === index"></span>
        			<div class="address-detail">
        				<p>{{item.position}}</p>
        				<p><span>{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.phone}}</span></p>
        			</div>
        			<div class="deletesite">
        				<span @click="edit(index, item.number)"></span>
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
    import {getImgPath} from 'src/components/common/mixin'
    import {mapState,mapActions,} from 'vuex'
    import {getAddressList, deleteAddress} from 'src/service/getData'

    export default {
      data(){
            return{
                selectedAddress: 0,
    			adressList:[{
                    position: '北京市海淀区中国科学院国家空间科学中心九章大厦B座',
                    name: '张三',
                    phone: '15210288888',
                    number: 0
                },{
                    position: '北京市海淀区中国科学院国家空间科学中心九章大厦B座',
                    name: '张三',
                    phone: '15210288888',
                    number: 1
                },{
                    position: '北京市海淀区中国科学院国家空间科学中心九章大厦B座',
                    name: '张三',
                    phone: '15210288888',
                    number: 2
                }] //地址列表
            }
        },
        mounted(){
        },
        mixins: [getImgPath],
        mounted(){
        },
        components: {
        },
        computed:{
        },
        props:[],
        methods: {
            edit (index,number) {
                this.$router.push({name: 'editAddress', query:{index: index, number: number}})
            },
            selectDefault (number) {
                this.selectedAddress = number;
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
        left: 0;
        right: 0;
        bottom: 0;
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
        margin-bottom: .7rem;
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
    				span{
    					display:block;
    					@include wh(.23rem,.23rem);
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
