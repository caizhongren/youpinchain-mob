<template>
<!-- 拨打客服电话 -->
<div class="mask-common mask1" v-client-height>
    <div class="alert-wrap">
        <div class="text" v-html="alertText"></div>
        <div class="i-know">
            <div @click="cancelAlertTip()">取消</div>
            <div @click="confirmAlertTip(type)">确定</div>
        </div>
    </div>
</div>
</template>

<script>
import {
    ModalHelper
} from '../../service/Utils'
export default {
    name: 'alertTip',
    data() {
        return {
            AddressText: '<p>确定要删除该地址吗！</p>',
            TelText: '<p>确定拨打客服电话 <br> 400-990-7626</p>'
        }
    },
    props: {
        'alertText': {
            type: String
        },
        'showAlertTip': {
            type: Boolean
        },
        'type': {
            type: Number
        }
    }, // 判断来源 1: 删除地址，2: 拨打客服电话
    watch: {
        '$parent.showAlertTip': function (newVal, oldVal) {
            newVal ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
        }
    },
    mounted() {},
    created() {},
    methods: {
        confirmAlertTip(type) {
            this.$parent.showAlertTip = false
            // if (type == 2) {
            //     window.location.href = "tel:10086"
            // } else {
            //     this.$emit('fn')
            // }
            this.$emit('fn')
        },
        cancelAlertTip(type) {
          this.$parent.showAlertTip = false;
        }
    },
    components: {},
    desrtoyed() {}
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.mask-common {
    position: fixed;
    top: 0;
    z-index: 999999;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.9);
    -webkit-overflow-scrolling: touch;
    overflow-y: hidden !important;
    text-align: center;
}

.i-know {
    display: flex;
    @include sc(.18rem, $g3);
    line-height: .46rem;
    background-color: $fc;
    border-radius: 0 0 .2rem .2rem;
}

.i-know div {
    flex: 1;
}

.i-know div:first-child {
    color: $g3;
    border-right: 1px solid $gd;
}

.i-know div:last-child {
    color: $red;
}

.mask1 .alert-wrap .text {
    @include sc(.18rem, $g3);
    height: 1rem;
    padding: .3rem .2rem 0;
    border-bottom: 1px solid $gd;
    border-radius: .2rem .2rem 0 0;
    line-height: 1.33;
}

.mask1 .alert-wrap {
    @include wh(2.795rem, 1.47rem);
    border-radius: 10px;
    background-color: #fffefe;
    margin: 1.2rem auto;
}
</style>
