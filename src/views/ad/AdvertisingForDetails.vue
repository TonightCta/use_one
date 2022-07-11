<!--
 * @Name: 广告详情
 * @Date: 2022-06-30 17:02:37
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:53:19
-->
<template>
    <P-main>
        <Navigation title="广告详情" :editor-switch="true" />
        <div class="head ui-flex-lh">
            <div class="ui-flex-center">
                <div class="ui-flex-row">
                    <div class="h4">购买</div>
                    <div class="size-18">USDT</div>
                    <span class="iconfont icon-qiehuan m-5-lr"></span>
                    <div class="size-18">INR</div>
                </div>
                <div class="size-14">未接单</div>
            </div>
            <div class="ui-flex-center">
                <div class="ui-flex-left size-12">
                    <div class="m-5-r">广告编号</div>
                    <ul class="ui-list ui-list-hx">
                        <li>WB5545664414444411111</li>
                        <li>
                            <P-copy value="WB5545664414444411111">
                                <B-svg name="copy-1" class-name="copy"></B-svg>
                            </P-copy>
                        </li>
                    </ul>
                </div>
                <B-switch v-model="switcha" open="OFF" close="ON" trueColor="#0A8F6A" falseColor="#0A8F6A" />
            </div>
        </div>
        <div class="body">
            <P-cell :list="list" theme="cell" class="p-5-t">
                <template #value_0="scope">
                    <div class="theAmountOf">
                        <div class="fh">₹</div>
                        <div class="jg">{{scope.row.value}}</div>
                    </div>
                </template>
                <template #value_6="scope">
                    <Pay-way />
                </template>
                <template #value_8="scope">
                    <B-a href="/advertisingfordetails/11" class="orderRecord">{{scope.row.value}}单</B-a>
                </template>
            </P-cell>
            <div class="Footer ui-flex">
                <div class="ui-flex-1">
                    <P-button type="danger" plain class="w-100-b btn-danger" @click="shutDown">关闭广告</P-button>
                </div>
                <div class="ui-flex-1 m-10-l">
                    <P-button type="default" plain class="w-100-b btn-default">修改</P-button>
                </div>
            </div>
        </div>
        <Alert type="typography" v-model="bool.closeTheAd" title="确认关闭广告?">
            关闭后该广告无法再次开启，进行中的订单不受影响。
        </Alert>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            bool: {
                closeTheAd: false,
            },
            switcha: 0,
            name: 'vue',
            val: "",
            list: [
                { title: '总金额', value: '6.69', border: false },
                { title: '价格类型', value: '浮动价格', border: false },
                { title: '价格溢价', value: '10%', border: false },
                { title: '委托数量', value: '200.00', extra: 'USDT', border: false, style: { 'margin-top': '20px' } },
                { title: '剩余数量', value: '100.00', extra: 'USDT', border: false },
                { title: '单笔限额', value: '100.00-100000.00', extra: 'INR', border: false },
                { title: '收款方式', border: false },
                { title: '发布时间', value: '2022-10-12 10:36:23', extra: '', border: false },
                { title: '订单记录', value: '156', islink: true, border: false, style: { 'margin-top': '20px' } },
            ]
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function (v) {
                this.val = v
            }
        },
        val(v) {
            this.$emit('input', v)
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {
        shutDown() {
            this.bool.closeTheAd = true
        }
    }
};
</script>

<style lang="less" scoped>
.head {
    height: 98px;
    padding: 0px 12px;
    color: #ffffff;
    background: #2cbc94;
    .h4 {
        padding-left: 0px;
        padding-right: 5px;
        font-size: 17px;
        font-weight: 500;
        color: #ffffff;
        &:before {
            width: 2px;
            height: 10px;
            margin-top: 1px;
            background: #ffffff;
        }
    }
    .copy {
        width: 17px;
        height: 17px;
    }
    .ui-list-hx {
        li:after {
            background: #ffffff;
        }
    }
    /deep/.ivu-switch {
        &.ivu-switch-large {
            transform: scale(0.7);
            margin-right: -11px;
            height: 28px;
            line-height: 28px;
            border-radius: 22px;
        }
        &:after {
            top: 4px;
        }
    }
}

.body {
    .orderRecord {
        font-size: 14px;
        font-weight: 500;
        color: #6580ff;
    }
}
</style>