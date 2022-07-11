<!--
 * @Name: 请向卖家付款
 * @Date: 2022-06-23 11:39:44
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 17:22:02
-->
<template>
    <P-main class="ui-flex-tbf">
        <Navigation :border="true" :WeiXinXiSwitch="true" />

        <P-body type="Fei">
            <div class="head-info ui-flex-row-center">
                <div class="title">请向卖家付款</div>
                <div class="price">
                    <div class="theAmountOf theAmountOf-hong">
                        <div class="fh">₹</div>
                        <div class="jg">6.69</div>
                    </div>
                </div>
                <div class="date">
                    请在
                    <B-date-countdown :endTime="date" hour=":" min=":" sec="" />内付款给卖家，超时自动取消
                </div>
            </div>

            <van-cell-group class="cell" inset>
                <van-cell value="切换" is-link @click="bool.show = true">
                    <template #title>
                        <div class="head ui-flex-left">
                            <B-svg name="qianBao" class-name="yhk-icon"></B-svg>
                            <div class="name">银行卡</div>
                        </div>
                    </template>
                </van-cell>

                <van-cell title="姓名">
                    <template #right-icon>
                        <ul class="ui-list ui-list-hx">
                            <li>吴彦祖</li>
                            <li>
                                <P-copy value="吴彦祖">
                                    <B-svg name="copy" class-name="copy"></B-svg>
                                </P-copy>
                            </li>
                        </ul>
                    </template>
                </van-cell>

                <van-cell title="银行卡号">
                    <template #right-icon>
                        <ul class="ui-list ui-list-hx">
                            <li>3223554422115564</li>
                            <li>
                                <P-copy value="3223554422115564">
                                    <B-svg name="copy" class-name="copy"></B-svg>
                                </P-copy>
                            </li>
                        </ul>
                    </template>
                </van-cell>

                <van-cell title="开户银行">
                    <template #right-icon>
                        <ul class="ui-list ui-list-hx">
                            <li>中国工商银行</li>
                            <li>
                                <P-copy value="中国工商银行">
                                    <B-svg name="copy" class-name="copy"></B-svg>
                                </P-copy>
                            </li>
                        </ul>
                    </template>
                </van-cell>

                <van-cell title="开户支行">
                    <template #right-icon>
                        <ul class="ui-list ui-list-hx">
                            <li>南山支行</li>
                            <li>
                                <P-copy value="南山支行">
                                    <B-svg name="copy" class-name="copy"></B-svg>
                                </P-copy>
                            </li>
                        </ul>
                    </template>
                </van-cell>

            </van-cell-group>

            <ul class="ui-list-dian">
                <li>转账时请勿备注BTC、USDT等敏感信息，防止汇款时被拦截、账户被冻结等问题。</li>
                <li>账号完成后请务必备注点击下方按钮，通知卖家确认收款，否则付款时间超过后订单会自动取消，造成资产损失！</li>
            </ul>
        </P-body>

        <div class="footer">
            <van-button class="btn-fei" @click="bool.btn = true">我已完成付款</van-button>
        </div>

        <AnQuanBaoZhang />
        <PayChoose v-model="bool.show" @click="onPayChoose" />

        <P-alert class="theTotalAmount" v-model="bool.btn" title="总金额" :showConfirmButton="true"
            :showCancelButton="true" btnName="确认已付款" @click="submit">
            <div class="ui-flex-row">
                <div class="theAmountOf theAmountOf-hong">
                    <div class="fh">₹</div>
                    <div class="jg">656.00</div>
                </div>
            </div>
            <B-typographya class="m-15-t" svg="GanTanYuan1" title="请确认您是否已通过卖方提示的收款方式进行付款。" />
        </P-alert>
    </P-main>
</template>

<script>
import AnQuanBaoZhang from '@/components/AnQuanBaoZhang'
import PayChoose from '@/components/pay-way/pay-choose'

export default {
    components: {
        AnQuanBaoZhang, PayChoose
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
    },
    data() {
        return {
            id: '',
            bool: {
                show: false,
                btn: false
            },
            date: new Date("2022/06/24 00:30:00").getTime() / 1000,
        }
    },
    watch: {
        "$route.params": {
            deep: true,
            immediate: true,
            handler: function (v) {
                if (v.id) {
                    this.id = v.id
                    console.log(v)
                }
            }
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        onPayChoose(row) {
            console.log(row)
        },
        submit() {
            this.$router.push({
                path: '/waitingforclearance/' + this.id
            })
        }
    }
};
</script>

<style lang="less" scoped>
.head-info {
    height: 130px;
    .title {
        font-size: 22px;
        color: #333333;
        font-weight: bold;
    }
    .price {
        padding: 5px 0px;
    }
    .date {
        font-size: 12px;
        color: #666666;
        span {
            font-size: 17px;
            color: #fd5656;
            margin: 0px 3px;
        }
    }
}

.cell {
    .head {
        .yhk-icon {
            width: 18px;
            height: 18px;
            margin-right: 5px;
        }
        .name {
            font-size: 16px;
            color: #666666;
        }
    }
}

.ui-list-dian {
    margin-top: 12px;
    padding: 12px;
    background: #e6e6e6;
    border-radius: 4px;
}

.footer {
    display: flex;
    padding: 6px 12px;
}

.theTotalAmount {
    /deep/.promptSafety {
        padding: 12px 16px;
        .title {
            font-size: 14px;
            color: #666666;
        }
        .content {
            .title {
                color: #333333;
                .b-icon-svg {
                    width: 13px;
                    height: 13px;
                    margin-top: 4px;
                }
            }
        }
    }
    /deep/.van-dialog__footer {
        .van-dialog__cancel,
        .van-dialog__confirm {
            font-size: 14px;
            height: 44px;
        }
        .van-dialog__cancel {
            color: #333333;
        }
        .van-dialog__confirm {
            color: #999999;
        }
    }
}
</style>