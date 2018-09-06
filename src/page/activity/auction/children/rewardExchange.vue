<template>
    <div class="reward_exchange">
        <div class="header">
            <img src="../../../../images/auction/bg.png" alt="" width="100%">
        </div>
        <div class="content">
            <div class="form_box">
                <form>
                    <input type="text" placeholder="请输入微信号" v-model="user.wxNum" maxlength="50" required focus>
                    <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="user.phoneNum" v-on:input="user.phoneNum = user.phoneNum.replace(/\D/g, '')" autocomplete="off" required>
                    <div class="warning_tip">*涉及奖励发放领取，请务必认真填写</div>
                    <div class="submit_btn" @click="submitForm(user)">提交</div>
                </form>
            </div>
            <div class="tips">
                <div class="title">温馨提示</div>
                <div class="text">
                    <p>1.<span>此兑奖页面仅供竞拍获胜者填写，未参与竞拍或非竞拍获胜者填写无效。</span></p>
                    <p>2.<span>请获奖者于竞拍活动后30日内填写，逾期兑换链接将失效，且不再接受其他方式兑奖。</span></p>
                    <p>3.<span>请获奖者如实、准确填写信息，因信息填写错误所造成的损失由用户自担。</span></p>
                    <p>4.<span>如果其他疑问，请添加客服微信咨询</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { exchange } from '../../../../service/getData'
    export default {
        data () {
            return {
                showShare: true,
                bidId: this.$route.params.bidId * 1,
                user: {
                    phoneNum: '',
                    wxNum: ''
                }
            }
        },  
        watch: {
        },
        props: ['showErrMsg'],
        mounted() {
        },
        created() {
        },
        methods: {
            submitForm (user) {
                if (!user.phoneNum || !user.wxNum) {
                    return
                }
                var that = this
                exchange(that.bidId, user.wxNum, user.phoneNum).then(function (respones) {
                    if (respones && respones.errno === 0) {
                        that.showErrMsg('兑换成功',true)
                        that.user = {
                            phoneNum: '',
                            wxNum: ''
                        }
                    } else {
                        console.log(respones.errmsg)
                    }
                })
            }
        },
        components: {
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../../style/mixin';
    .reward_exchange {
        background: $fc;
        padding-bottom: .49rem;
        .header {
            background: $fc;
            img {
                display: block;
            }
        }
        .content {
            border-top-left-radius: .12rem;
            border-top-right-radius: .12rem;
            margin-top: -.12rem;
            padding: .15rem 0rem .2rem;
            z-index: 0;
            position: relative;
            background: $fc;
            .title {
                @include sc(.15rem,$g6);
                margin: .25rem 0 .15rem .15rem;
            }
            .form_box {
                padding-bottom: .35rem;
                border-bottom: 1px solid #eee;
                form {
                    margin: 0 auto;
                    text-align: center;
                    input {
                        @include wh(2.935rem,.45rem);
                        @include sc(.15rem,$g6);
                        background: #ececee;
                        border-radius: .05rem;
                        margin-top: .15rem;
                        padding: .15rem;
                        &:focus {
                            outline:0;
                        }
                        &::placeholder {
                            color: $g9;
                        }
                    }
                    .warning_tip {
                        line-height: 2.73;
                        @include sc(.11rem, #fc5340);
                        transform: scale(.95);
                        margin: .02rem auto .03rem;
                    }
                    .submit_btn {
                        @include wh(1.75rem,.49rem);
                        @include sc(.15rem,$fc);
                        border-radius: .05rem;
                        margin: 0 auto;
                        line-height: .5rem;
                        background-image: linear-gradient(133deg, #fc5b46, #fa424f);
                    }
                }
            }
            .tips {
                .text {
                    padding: .1rem .25rem .0rem .15rem;
                    line-height: 1.54;
                    letter-spacing: 0.4px;
                    text-align: justify;
                    p {overflow: hidden;
                        @include sc(.13rem,$g6);}
                    span {
                        float: right;
                        width: 95%;
                        @include sc(.13rem,$g6);
                    }
                }
            }
        }
    }
</style>
