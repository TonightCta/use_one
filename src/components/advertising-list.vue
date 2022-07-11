<!--
 * @Name: 首页列表内容组件
 * @Date: 2022-06-17 20:49:33
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-01 10:33:13
-->

<template>
    <div class="order">
        <div class="head ui-flex-center ui-hx">
            <div class="left ui-flex-row">
                <div class="h4">购买</div>
                <div>USDT</div>
            </div>
            <div class="right ui-flex-row">
                <div class="state">{{ Fstate == 0 ? '已下架':'接单中' }}</div>
                <B-switch v-model="Fstate" open="" close="" size="small"></B-switch>
            </div>
        </div>
        <div class="body ui-flex-center">
            <div>
                <div><span class="label">单价</span>₹3.21</div>
                <div><span class="label">数量</span>1022.25 USDT</div>
            </div>
            <div class="right">
                <div>总金额</div>
                <div class="theAmountOf" :class="[Fstate == 0 ? 'theAmountOf-hong' : '']">
                    <div class="fh">₹</div>
                    <div class="jg">{{Price}}</div>
                </div>
            </div>
        </div>
        <div class="footer ui-flex-center">
            <Pay-way />
            <van-icon name="ellipsis" @click.stop="operation" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        Price: {
            type: [Number, String],
            default: 0
        },
        state: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            Fstate: 0
        }
    },
    watch: {
        state: {
            immediate: true,
            handler: function (v) {
                this.Fstate = v
            }
        },
    },
    methods: {
        operation() {
            this.$emit('operation')
        }
    }
};
</script>

<style lang="less" scoped>
.order {
    .head {
        &.ui-hx {
            &::after {
                background: #eeeeee;
            }
        }
        .left {
            font-weight: bold;
            .h4 {
                padding-left: 0px;
                padding-right: 5px;
                font-size: 14px;
                color: #333333;
                font-weight: bold;
                &::before {
                    width: 3px;
                    height: 10px;
                    margin-top: 0px;
                }
            }
        }
        .right {
            .state {
                font-size: 12px;
                font-weight: 400;
                color: #333333;
                padding: 0px 5px;
            }
        }
    }

    .body {
        color: #666666;
        line-height: 25px;
        margin-top: 10px;

        .right {
            text-align: right;
        }

        .label {
            font-size: 12px;
            color: #999999;
            margin-right: 5px;
        }

        .theAmountOf {
            .jg {
                font-size: 22px;
                font-weight: bold;
            }
            .fh {
                font-size: 14px;
            }
        }
    }

    .footer {
        .van-icon-ellipsis {
            color: #999999;
            font-size: 25px;
        }
    }
}
</style>