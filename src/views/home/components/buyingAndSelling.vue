<!--
 * @Name: 快捷区 我要买和我要卖 键盘
 * @Date: 2022-06-24 09:23:13
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 16:26:25
-->
<template>
    <div class="buyingAndSelling">
        <div class="prompt ui-flex-right">
            <div class="ui-flex-row">
                <B-svg name="dengPao"></B-svg>
                1 {{currency}}≈78.09 {{INR}}
            </div>
        </div>
        <div class="countContainer">
            <B-svg name="anShuLiang" class-name="anShuLiang" @click="swap"></B-svg>
            <div class="count">
                <div class="value">
                    {{value}}
                </div>
                <div class="unit">
                    {{unit.USDT}}
                    <B-svg name="jianTouXia" class-name="jianTouXia" v-if="unit.USDT == INR"></B-svg>
                </div>
            </div>
        </div>
        <div class="theProportion">
            <slot name="theProportion"></slot>
        </div>
        <div class="way ui-flex-row">
            <div class="m-15-r size-12">选择支付方式：</div>
            <div class="ui-flex-row" @click="bool.pay = true">
                <Pay-way />
                <B-svg name="jianTouYou1" class-name="jianTouYou1"></B-svg>
            </div>
        </div>
        <DigitalKeyboard v-model="value"></DigitalKeyboard>
        <van-button type="primary" class="btn-primary m-20-t-i m-50-b-i" :style="{'background':color}"
            @click="btn.show = true">
            {{btnName}}{{currency}}
        </van-button>

        <P-popup v-model="btn.show" :title="'确认'+ btnName" bottom>
            <div class="btn-popup">
                <van-cell-group :border="false">
                    <van-cell title="付款方式">
                        <template #right-icon>
                            <div class="right-icon">
                                <B-svg name="qianBao" class="m-5-r"></B-svg>
                                银行卡
                                <template v-if="btnName == '出售'">(2354 2144 3214 1215)</template>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell title="单价">
                        <template #right-icon>
                            <div class="right-icon">
                                6.56 {{unit.INR}}/{{unit.USDT}}
                            </div>
                        </template>
                    </van-cell>
                    <van-cell title="数量">
                        <template #right-icon>
                            <div class="right-icon">
                                {{value}} {{unit.USDT}}
                            </div>
                        </template>
                    </van-cell>
                    <van-cell title="总金额">
                        <template #right-icon>
                            <div class="theAmountOf" :style="{'color':color}">
                                <div class="fh">₹</div>
                                <div class="jg">6.69</div>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

            <van-button type="primary" class="btn-primary m-10-t-i" :style="{'background':color}" @click="submit">
                确认{{btnName}}
            </van-button>
        </P-popup>

        <PayChoose ref="refpaychoose" v-model="bool.pay"></PayChoose>
    </div>
</template>

<script>
import DigitalKeyboard from '@/components/digital-keyboard'
import PayChoose from '@/components/pay-way/pay-choosea'

export default {
    components: {
        DigitalKeyboard, PayChoose
    },
    props: {
        //btn-name="购买" 
        //btn-name="出售" 
        btnName: {
            type: String,
            default: ''
        },
        //币种 单位 如 USDT
        currency: {
            type: String,
            default: ''
        },
        //color="#FD5656"
        color: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            bool: {
                pay: false
            },
            value: 0,
            INR: 'INR',
            unit: {
                INR: 'INR',
                USDT: ''
            },
            btn: {
                show: false
            }
        }
    },
    watch: {
        btnName: {
            immediate: true,
            handler: function (v) {
                this.value = 0
                setTimeout(() => {
                    this.$refs['refpaychoose'].radio = ''
                }, 1000)
            }
        },
        currency: {
            immediate: true,
            handler: function (v) {
                if (this.unit.USDT == '') {
                    this.unit.USDT = v
                }
            }
        },
    },
    mounted() {

    },
    methods: {
        swap() {
            let { INR, USDT } = JSON.parse(JSON.stringify(this.unit))
            this.unit.INR = USDT
            this.unit.USDT = INR
            this.$emit('swap')
        },
        submit() {
            this.value = 0
            this.btn.show = false
            this.swap()
            let _this = this
            setTimeout(() => {
                let url = '/pleasepayment/' + Math.floor(Math.random() * '123')
                if (this.btnName == '出售') {
                    url = '/waitingforpayment/' + Math.floor(Math.random() * '123')
                }
                _this.$router.push({
                    path: url
                })
            }, 100)
        }
    }
};
</script>

<style lang="less" scoped>
.buyingAndSelling {
    padding: 15px 0px;
    .prompt {
        div {
            width: 140px;
            height: 26px;
            background: #f6f6f6;
            border-radius: 13px;
            font-size: 12px;
            color: #999999;
        }
    }
    .countContainer {
        position: relative;
        .anShuLiang {
            width: 25px;
            height: 25px;
            position: absolute;
            right: 12px;
            top: 15px;
        }
        .count {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: baseline;
            margin-top: 15px;
            .value {
                font-size: 34px;
                font-weight: 600;
                color: #333333;
                max-width: 55%;
            }
            .unit {
                font-size: 12px;
                font-weight: 500;
                color: #333333;
                display: flex;
                align-items: flex-end;
                .jianTouXia {
                    width: 12px;
                    height: 12px;
                }
            }
        }
    }
    .theProportion {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .way {
        margin-top: 10px;
        .jianTouYou1 {
            width: 11px;
            height: 11px;
            margin-left: 5px;
        }
    }
}

/deep/.van-cell {
    padding: 10px 10px;
    &::after {
        left: 10px;
        right: 10px;
    }
}
/deep/.van-cell-group {
    &::after {
        display: none;
    }
}

.btn-popup {
    /deep/.van-cell {
        .van-cell__title {
            font-size: 14px;
            color: #666666;
        }
        .right-icon {
            color: #333333;
        }
    }
}
</style>