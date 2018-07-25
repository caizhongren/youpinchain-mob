 <template>
  <div class="rating_page">
        <section class="adddetail">
        	<form action="" v-on:submit.prevent>
        		<section class="ui-padding-block">
        			<div class="input-new">
                        <span>姓名</span>
        				<input type="text" placeholder="请填写你的姓名" @input="">
        			</div>
        			<div class="add-detail">
	        			<div class="input-new">
                            <span>联系电话</span>
	        				<input type="text" placeholder="请填写收货人手机号" @input=""/>
	        			</div>
        			</div>
        			 <div class="input-new">
                        <span>所在地区</span>
        				<input type="text" id="address-input" readonly="readonly" style="width:2.5rem;" placeholder="请选择">
                        <svg fill="#bbb" style="width: 0.18rem;margin-left: .1rem;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
        			</div>
        			<div class="input-new">
                        <span>地址</span>
                        <textarea placeholder="请填写详细地址" id="adinfo" value="" rows="2"></textarea>
        			</div>
        		</section>
        		<section class="addbutton">
        			<button @click.prevent="submitThing">保存</button>
        		</section>
                <div class="delete-address" @click="showAlertTip = !showAlertTip"></div>
                <div id="city_container">aaaa</div>
        	</form>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
        <alert-tip :showAlertTip="showAlertTip" :type="1" v-show="showAlertTip"></alert-tip>
    </div>
</template>

<script>
import AjaxPicker from 'ajax-picker'
    import headTop from 'src/components/header/head'
    import {getImgPath} from 'src/components/common/mixin'
    import {mapState, mapMutations} from 'vuex'
    import {postAddAddress} from 'src/service/getData'
    import alertTip from 'src/components/common/alertTip'
    

    export default {
      data(){
            return{
                showAlertTip: false, //弹出框
                deleteNumber: '',
                addressList:[[
                    {
                        "name": "北京",
                        "id": 0
                    },
                    {
                        "name": "广东",
                        "id": 0
                    },
                    {
                        "name": "上海",
                        "id": 0
                    },
                    {
                        "name": "天津",
                        "id": 0
                    },
                    {
                        "name": "重庆",
                        "id": 0
                    },
                    {
                        "name": "辽宁",
                        "id": 1
                    },
                    {
                        "name": "江苏",
                        "id": 1
                    },
                    {
                        "name": "湖北",
                        "id": 1
                    },
                    {
                        "name": "四川",
                        "id": 1
                    },
                    {
                        "name": "陕西",
                        "id": 1
                    },
                    {
                        "name": "河北",
                        "id": 1
                    },
                    {
                        "name": "山西",
                        "id": 1
                    },
                    {
                        "name": "河南",
                        "id": 1
                    },
                    {
                        "name": "吉林",
                        "id": 1
                    },
                    {
                        "name": "黑龙江",
                        "id": 1
                    },
                    {
                        "name": "内蒙古",
                        "id": 1
                    },
                    {
                        "name": "山东",
                        "id": 1
                    },
                    {
                        "name": "安徽",
                        "id": 1
                    },
                    {
                        "name": "浙江",
                        "id": 1
                    },
                    {
                        "name": "福建",
                        "id": 1
                    },
                    {
                        "name": "湖南",
                        "id": 1
                    },
                    {
                        "name": "广西",
                        "id": 1
                    },
                    {
                        "name": "江西",
                        "id": 1
                    },
                    {
                        "name": "贵州",
                        "id": 1
                    },
                    {
                        "name": "云南",
                        "id": 1
                    },
                    {
                        "name": "西藏",
                        "id": 1
                    },
                    {
                        "name": "海南",
                        "id": 1
                    },
                    {
                        "name": "甘肃",
                        "id": 1
                    },
                    {
                        "name": "宁夏",
                        "id": 1
                    },
                    {
                        "name": "青海",
                        "id": 1
                    },
                    {
                        "name": "新疆",
                        "id": 1
                    },
                    {
                        "name": "香港",
                        "id": 0
                    },
                    {
                        "name": "澳门",
                        "id": 0
                    },
                    {
                        "name": "台湾",
                        "id": 0
                    },
                    {
                        "name": "海外",
                        "id": 0
                    },
                    {
                        "name": "其他"
                    }
                ],
                [
                        {
                            "name": "广州",
                            "id": 0
                        },
                        {
                            "name": "深圳",
                            "id": 0
                        },
                        {
                            "name": "珠海",
                            "id": 0
                        },
                        {
                            "name": "汕头",
                            "id": 0
                        },
                        {
                            "name": "韶关",
                            "id": 0
                        },
                        {
                            "name": "佛山",
                            "id": 0
                        },
                        {
                            "name": "江门",
                            "id": 0
                        },
                        {
                            "name": "湛江",
                            "id": 0
                        },
                        {
                            "name": "茂名",
                            "id": 0
                        },
                        {
                            "name": "肇庆",
                            "id": 0
                        },
                        {
                            "name": "惠州",
                            "id": 0
                        },
                        {
                            "name": "梅州",
                            "id": 0
                        },
                        {
                            "name": "汕尾",
                            "id": 0
                        },
                        {
                            "name": "河源",
                            "id": 0
                        },
                        {
                            "name": "阳江",
                            "id": 0
                        },
                        {
                            "name": "清远",
                            "id": 0
                        },
                        {
                            "name": "东莞",
                            "id": 0
                        },
                        {
                            "name": "中山",
                            "id": 0
                        },
                        {
                            "name": "潮州",
                            "id": 0
                        },
                        {
                            "name": "揭阳",
                            "id": 0
                        },
                        {
                            "name": "云浮",
                            "id": 0
                        }
                    ],
                [
                  {
                    "name": "越秀区"
                    ,id: 0},
                  {
                    "name": "荔湾区"
                    ,id: 0},
                  {
                    "name": "海珠区"
                    ,id: 0},
                  {
                    "name": "天河区"
                    ,id: 0},
                  {
                    "name": "白云区"
                    ,id: 0},
                  {
                    "name": "黄埔区"
                    ,id: 0},
                  {
                    "name": "番禺区"
                    ,id: 0},
                  {
                    "name": "花都区"
                    ,id: 0},
                  {
                    "name": "南沙区"
                    ,id: 0},
                  {
                    "name": "萝岗区"
                    ,id: 0},
                  {
                    "name": "增城市"
                    ,id: 0},
                  {
                    "name": "从化市"
                    ,id: 0},
                  {
                    "name": "其他"
                    ,id: 0}
                ]]
            }
        },
        mounted () {
            var addressList = this.addressList
            var picker = new AjaxPicker({
                title: '配送至',
                tipText: ['省份', '城市', '区/县'],
                input: 'address-input',
                container: 'city_container',
                renderArr: [
                  function () {
                    picker.render(addressList[0])
                  } ,
                  function () {
                    console.log(picker.result1.value + '/' + picker.result1.id + '/' +  picker.result1.index)
                    picker.render(addressList[1])
                  },
                  function () {
                    picker.render(addressList[2])
                  }
                ],
                success: function (arr) {
                  var address = ''
                  for (var i = 0; i < arr.length; i++) {
                    address +=  ' ' + arr[i].value
                  }
                  document.getElementById('address-input').value = address.substring(1)
                }
            })
        },
        created(){
            this.deleteNumber = this.$route.query.number;
        },
        mixins: [getImgPath],
        components: {
            headTop,
            alertTip,
        },
        computed:{
        },
        props:[],
        methods: {
            confirmDelete () {
                // this.showAlert = true;
                this.$router.go(-1);
            }
        }
    }
</script>
  
<style lang="scss" scoped>
    @import 'src/style/mixin';
  	.router-slid-enter-active, .router-slid-leave-active {
  	    transition: all .4s;
  	}
  	.router-slid-enter, .router-slid-leave-active {
  	    transform: translate3d(2rem, 0, 0);
        opacity: 0;
  	}
    .rating_page{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .adddetail{
    	margin-top:.11rem;
        @include borderRadius(10px);
        background: #fff;
        height: 98%;
    }
    .ui-padding-block{
    	.add-detail{display:block;}
    	.input-new{
    		@include wh(100%,.45rem);
            padding: 0 0 0 .12rem;
            display: flex;
            @include sc(.15rem,#666666);
            border-bottom: 1px solid #efeff4;
            span{
                width: .6rem;
                line-height: .45rem;
                margin-right: .14rem;
            }
    		input{
    			display:flex;
    			width:2.7rem;
                line-height: .45rem;
                font-size: .15rem;
    		}
    		.verifies{
				border-color:#ea3106;
    		}
    		p{
				@include sc(.08rem,#ea3106);
				padding-left:.1rem;
				margin-top:.04rem;
    		}
    	}
    	.input-new:nth-of-type(4){
            height:.9rem;
            textarea{
                padding: .15rem 0 0 0;
                width: 2.7rem;
                font-size: .15rem;
            }
        }
    }
    .addbutton{
    	margin:.31rem auto .73rem auto;
    	width:3.5rem;
    	button{
    		width:100%;
    		@include sc(.15rem,#fff);
    		line-height:.45rem;
    		background:#e4372e;
    		font-weight:700;
            @include borderRadius(.23rem);
    	}
    	.butopacity{
    		transition: all .4s;
    		opacity:1;
    	}
    }
    .delete-address{
        @include wh(.43rem,.43rem);
        @include bis('../../../../../images/add-delete.png');
        margin: 0 auto;
    }
</style>
