<template>
<div class="rating_page header-top">
    <head-top head-title="编辑地址" go-back='true'></head-top>
    <section class="adddetail">
        <form action="" v-on:submit.prevent>
            <section class="ui-padding-block">
                <div class="input-new">
                    <span>姓名</span>
                    <input type="text" placeholder="请填写你的姓名" @input="" v-model="address.name">
                </div>
                <div class="add-detail">
                    <div class="input-new">
                        <span>联系电话</span>
                        <input type="tel" maxlength="11" placeholder="请填写收货人手机号" @input="address.mobile = address.mobile.replace(/\D/g, '')" v-model="address.mobile" />
                    </div>
                </div>
                <div class="input-new">
                    <span>所在地区</span>
                    <input type="text" id="address-input" readonly="readonly" style="width:2.5rem;" placeholder="请选择" v-model="address.tipText">
                    <svg fill="#bbb" style="width: 0.18rem;margin-left: .1rem;">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                </div>
                <div class="input-new">
                    <span>地址</span>
                    <textarea placeholder="请填写详细地址" id="adinfo" value="" rows="2" v-model="address.address"></textarea>
                </div>
                <div class="input-new">
                    <!-- <span>姓名</span>
                    <input type="text" placeholder="请填写你的姓名" @input="" v-model="address.name"> -->
                    <p class="setDefault">设置为默认地址</p>
                    <div style="display:flex;align-items:center;margin-right: .1rem;">
                        <div class="wrap">
                            <my-switch size="md" open-name="" close-name="" v-model="toggle"></my-switch>
                        </div>
                    </div>
                </div>
            </section>
            <section class="addbutton">
                <button @click="submitAddress()">{{submitText}}</button>
            </section>
            <div class="delete-address" @click="showAlertTip = !showAlertTip" v-show="showDelete"></div>
            <div id="city_container"></div>
        </form>
    </section>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
    <alert-tip :showAlertTip="showAlertTip" :alertText='`<p>确定要删除该地址吗！</p>`' :type="1" v-show="showAlertTip" @fn="deleteAddress1"></alert-tip>
</div>
</template>

<script>
import AjaxPicker from "ajax-picker";
import headTop from "src/components/header/head";
import mySwitch from '../../../components/common/vue-switch';
import alertTip from "src/components/common/alertTip";
import {
    mapMutations
} from "vuex";
import {
    getAddressDetail,
    getRegionsList,
    deleteAddress,
    updateAddress,
    addAddress,
} from "../../../service/getData";

export default {
    data() {
        return {
            showAlertTip: false, //弹出框
            deleteNumber: "",
            address: {},
            provinces: [],
            submitText: '保存',
            showDelete: true,
            toggle: false
        };
    },
    mounted() {
        // console.log(this.$route.query.addressId);
        if (this.$route.query.addressId != undefined) {
            getAddressDetail(this.$route.query.addressId).then(res => {
                this.address = res.data;
                this.address.tipText =
                    this.address.provinceName +
                    " " +
                    this.address.cityName +
                    " " +
                    this.address.areaName;
            });
        }

        getRegionsList(0).then(res => {
            this.provinces = res.data;
            var provinces = this.provinces;
            var that = this;
            var picker = new AjaxPicker({
                title: "配送至",
                tipText: ["省份", "城市", "区/县"],
                input: "address-input",
                container: "city_container",
                renderArr: [
                    function () {
                        picker.render(provinces);
                    },
                    function () {
                        getRegionsList(picker.result1.id).then(res => {
                            picker.render(res.data);
                        });
                    },
                    function () {
                        getRegionsList(picker.result2.id).then(res => {
                            picker.render(res.data);
                        });
                    }
                ],
                success: function (arr) {
                    var addressD = "";
                    for (var i = 0; i < arr.length; i++) {
                        addressD += " " + arr[i].value;
                    }
                    document.getElementById("address-input").value = addressD.substring(1);
                    that.address.provinceId = picker.result1.id;
                    that.address.provinceName = picker.result1.value;
                    that.address.cityId = picker.result2.id;
                    that.address.cityName = picker.result1.value;
                    that.address.areaId = picker.result3.id;
                    that.address.areaName = picker.result3.value;
                    that.address.tipText = addressD.substring(1);
                }
            });
        });
    },
    created() {
        this.deleteNumber = this.$route.query.number;
        if (this.$route.query.path == 'confirmOrder') {
            this.submitText = '保存并使用';
            this.showDelete = false
        }
    },
    components: {
        headTop,
        alertTip,
        'my-switch': mySwitch
    },
    computed: {},
    props: [],
    methods: {
        ...mapMutations([
            'CHOOSE_ADDRESS'
        ]),

        // 保存地址
        submitAddress() {
            var address = this.address;
            if (address.id) {
                updateAddress(
                    address.id,
                    address.name,
                    address.provinceId,
                    address.cityId,
                    address.areaId,
                    address.mobile,
                    address.address
                ).then(res => {
                    if (res.errno == 0) {
                        var index = 0;
                        if (this.$route.query.path == 'confirmOrder') {
                            localStorage.setItem('choosedAddress', JSON.stringify(address));
                            this.$router.go(-2);
                        } else {
                            this.$router.go(-1);
                        }
                    }
                });
            } else {
                addAddress(
                    address.name,
                    address.provinceId,
                    address.cityId,
                    address.areaId,
                    address.mobile,
                    address.address,
                    this.toggle
                ).then(res => {
                    address.id = res.data;
                    if (res.errno == 0) {
                        var index = 0;
                        if (this.$route.query.path == 'confirmOrder') {
                            localStorage.setItem('choosedAddress', JSON.stringify(address));
                            this.$router.go(-2);
                        } else {
                            this.$router.go(-1);
                        }
                    }
                });
            }
        },

        // 删除地址
        deleteAddress1() {
            var that = this;
            if (that.address.id) {
                deleteAddress(that.address.id).then(res => {
                  if (res.errno == 0) {
                    var sessionAddr = localStorage.getItem('choosedAddress');
                    if (sessionAddr && JSON.parse(sessionAddr).id == that.address.id) {
                        localStorage.removeItem('choosedAddress');
                    }
                    that.$router.go(-1);
                  }  
                });
            }
        }
    }
};
</script>

  
<style lang="scss" scoped>
@import "src/style/mixin";
.router-slid-enter-active,
.router-slid-leave-active {
    transition: all 0.4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}

.rating_page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 202;
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.wrap{
    display: flex;
    align-items: center;
}
.adddetail {
    margin-top: 0.05rem;
    @include borderRadius(10px);
    background: $fc;
    height: 98%;
}

.ui-padding-block {
    .add-detail {
        display: block;
    }
    .input-new {
        @include wh(100%, 0.45rem);
        padding: 0 0 0 0.12rem;
        display: flex;
        @include sc(0.15rem, $g6);
        border-bottom: 1px solid $bc;
        span {
            width: 0.7rem;
            line-height: 0.45rem;
            margin-right: 0.14rem;
        }
        input {
            display: flex;
            width: 2.7rem;
            font-size: 0.15rem;
        }
        .verifies {
            border-color: #ea3106;
        }
        p {
            @include sc(0.08rem, #ea3106);
            padding-left: 0.1rem;
            margin-top: 0.04rem;
        }
    }
    .input-new:nth-of-type(4) {
        height: 0.9rem;
        textarea {
            padding: 0.15rem 0 0 0;
            width: 2.7rem;
            font-size: 0.15rem;
        }
    }
    .input-new:last-child {
        display: flex;
        justify-content: space-between;
        p{
            @include sc(.15rem,$g6);
            line-height: .45rem;
            margin: 0;
            padding: 0;
        }
    }
}

.addbutton {
    margin: 0.31rem auto 0.73rem auto;
    width: 3.5rem;
    button {
        width: 100%;
        @include sc(0.15rem, $fc);
        line-height: 0.45rem;
        background: $red;
        font-weight: 700;
        @include borderRadius(0.23rem);
    }
    .butopacity {
        transition: all 0.4s;
        opacity: 1;
    }
}

.delete-address {
    @include wh(0.43rem, 0.43rem);
    @include bis("../../../images/add-delete.png");
    margin: 0 auto;
}
</style>
