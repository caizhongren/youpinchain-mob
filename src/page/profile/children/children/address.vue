<template>
<div class="rating_page">
    <section class="address">
        <ul class="addresslist">
            <li v-for='(item, index) in adressList' @click="selectOrEdit(item, index)">
                <span class="default-address" v-show="choosedAddressIndex === index"></span>
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
import {
    getAddressList
} from '../../../../service/getData'
import {
    mapState,
    mapMutations
} from 'vuex'

export default {
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        if (to.name == 'addressList'){
            this.loadAddresses();
        }
        
        next();
    },
    data() {
        return {
            adressList: [], //地址列表,
            choosedAddressIndex: -1 // 用户选中的地址
        }
    },
    mounted() {
    },
    updated() {
    },
    created() {
        if (this.$route.query.path !== 'confirmOrder') {
            this.selectedAddress = null;
        }
        this.loadAddresses();
    },
    components: {},
    computed: {},
    props: [],
    methods: {
        loadAddresses() {
            getAddressList().then(res => {
                this.adressList = res.data;
                if (localStorage.getItem('choosedAddress')) {
                    var index = -1;
                    let choosedAddress = JSON.parse(localStorage.getItem('choosedAddress'));
                    this.adressList.forEach(address => {
                        index++;
                        if (choosedAddress && address.id == choosedAddress.id) {
                            this.choosedAddressIndex = index;
                        }
                    });
                }
            })
        },
        ...mapMutations([
            'CHOOSE_ADDRESS'
        ]),
        selectOrEdit(address, index) {
            if (this.$route.query.path === 'confirmOrder') {
                localStorage.setItem('choosedAddress', JSON.stringify(address));
                this.$router.go(-1);
            } else {
                var query = {
                    addressId: address.id
                }
                this.$router.push({
                    name: 'editAddress',
                    query: query
                });
            }
        },
        toEdit(address, index) {
            var query = {
                addressId: address.id
            }
            if (this.$route.query.path === 'confirmOrder') {
                query = {
                    addressId: address.id,
                    path: 'confirmOrder'
                }
            }

            this.$router.push({
                name: 'editAddress',
                query: query
            })
        }
    },
    watch: {}
}
</script>

  
<style lang="scss" scoped>
@import 'src/style/mixin';
.rating_page {
    position: absolute;
    top: 0;
    background-color: #f2f2f2;
    z-index: 202;
    @include wh(100%, 100);
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.edit {
    right: 0.08rem;
    @include sc(0.14rem, $fc);
    @include ct;
}

.address {
    width: 100%;
    margin-top: .08rem;
    padding-bottom: .6rem;
    .addresslist {
        li {
            margin: .16rem .12rem;
            padding: .21rem .17rem .25rem .57rem;
            @include fj(space-between);
            border-radius: 10px;
            background-color: $fc;
            box-shadow: 0px 1px 13.9px 0.6px rgba(110, 194, 46, 0.24);
            position: relative;
            .default-address {
                @include wh(.43rem, .42rem);
                position: absolute;
                left: 0;
                top: 0;
                @include bis('../../../../images/add-slected.png');
            }
            .address-detail {
                position: relative;
                width: 2.3rem;
                p {
                    line-height: 1.6;
                    @include sc(.15rem, $g6);
                    span {
                        display: inline-block;
                        @include sc(.15rem, $g6);
                    }
                }
                p:nth-of-type(1) {
                    margin-bottom: .24rem;
                }
            }
            .address-detail:before {
                content: '';
                position: absolute;
                left: -.28rem;
                top: 0rem;
                @include bis('../../../../images/gwc-icon-add.png');
                @include wh(.16rem, .22rem);
            }
            .deletesite {
                display: flex;
                align-items: center;
                width: .5rem;
                span {
                    display: block;
                    @include wh(.23rem, .23rem);
                    margin-left: .2rem;
                    @include bis('../../../../images/icon-edit-nor.png')
                }
            }
        }
    }
    .no_address {
        @include sc(.15rem, $g6);
        text-align: center;
        line-height: 6rem;
        background: $fc;
        position: fixed;
        bottom: .5rem;
        width: 100%;
    }
    .addsite {
        background: $red;
        @include wh(100%, .5rem);
        line-height: .5rem;
        position: fixed;
        bottom: 0;
        text-align: center;
        @include sc(.15rem, $fc);
        font-weight: bold;
    }
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(.4rem, 0, 0);
    opacity: 0;
}
</style>
