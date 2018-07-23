 <template>
  	<div class="rating_page">
        <head-top head-title="编辑地址" go-back='true'>
        	<span slot="edit" class="edit" @click="editThing">{{editText}}</span>
        </head-top>
        <section class="address">
        	<ul class="addresslist">
        		<li>
        			<div class="address-detail">
        				<p>北京市海淀区中国科学院国家空间科学中心九章大厦B座</p>
        				<p><span>张三</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>15210288888</span></p>
        			</div>
        			<div class="deletesite">
        				<span @click="deleteSite(index, item)"></span>
        			</div>
        		</li>
        	</ul>
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
    			deletesite:false, //是否编辑状态
    			editText:'编辑',
    			adressList:[], //地址列表
            }
        },
        mounted(){
            this.initData();
        },
        mixins: [getImgPath],
        mounted(){
        	
        },
        components: {
            headTop,
        },
        computed:{
             ...mapState([
                'userInfo','removeAddress'
            ]),
             
        },
        props:[],
        methods: {
        	...mapActions([
                'saveAddress'
            ]),
            //初始化信息
            initData(){
                if (this.userInfo && this.userInfo.user_id) {
                   this.saveAddress();
                }
            },
            //编辑
            editThing(){
            	if(this.editText == '编辑'){
            		this.editText='完成';
            		this.deletesite=true;
            	}else{
            		this.editText='编辑';
            		this.deletesite=false;
            	}
            },
            //删除地址
            async deleteSite(index, item){
                if (this.userInfo && this.userInfo.user_id) {
                    await deleteAddress(this.userInfo.user_id, item.id);
            	    this.removeAddress.splice(index, 1);
                }
            }
        },
        watch: {
            userInfo: function (value) {
                if (value && value.user_id) {
                    this.initData();
                }
            }
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
        padding-top: .39rem;
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
                    @include bis('../../../../images/youpinchain/gwc-icon-add.png');
                    @include wh(.16rem,.22rem);
                }
    			.deletesite{
    				display:flex;
    				align-items:center;
    				span{
    					display:block;
    					@include wh(.23rem,.23rem);
                        @include bis('../../../../images/youpinchain/icon-edit-nor.png')
    				}
    			}
    		}
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
