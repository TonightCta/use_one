<!--
 * @Name: 等待对方付款
 * @Date: 2022-06-24 17:45:46
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:52:01
-->
<template>
    <P-main type="Fei">
        <Navigation class-name="Fei" :WeiXinXiSwitch="true" />
        <div class="prompt">
            <div class="title">等待对方付款</div>
            <div class="note">
                对方将在
                <B-date-countdown :endTime="date" hour=":" min=":" sec="" />内付款，超时自动取消
            </div>
        </div>
        <h4 class="h4">出售 USDT</h4>

        <div class="content ui-flex-1">
            <P-cell :list="list" theme="cell">
                <template #value_0="scope">
                    <ul class="ui-list ui-list-hx">
                        <li>
                            <div class="theAmountOf theAmountOf-hong">
                                <div class="fh">₹</div>
                                <div class="jg">{{scope.row.value}}</div>
                            </div>
                        </li>
                        <li>
                            <P-copy v-model="scope.row.value">
                                <B-svg name="copy" style="width:17px;height:17px"></B-svg>
                            </P-copy>
                        </li>
                    </ul>
                </template>
                <template #value_3="scope">
                    <ul class="ui-list ui-list-hx">
                        <li>{{scope.row.value}}</li>
                        <li>
                            <P-copy v-model="scope.row.value">
                                <B-svg name="copy" style="width:17px;height:17px"></B-svg>
                            </P-copy>
                        </li>
                    </ul>
                </template>
            </P-cell>

            <van-cell-group :border="false" class="m-30-t cell m-30-b">
                <van-cell :border="false" title="买家姓名" value="彭于晏"></van-cell>
                <van-cell :border="false" title="收款方式">
                    <template #right-icon>
                        <Pay-way />
                    </template>
                </van-cell>
            </van-cell-group>

            <ul class="ui-list-dian">
                <li>收到非实名汇款或买家转账时备注了BTC、USDT及其它数字货币名称，请发起申诉并联系客服处理。</li>
                <li>收到大额汇款且无法确认收款的，请联系客服处理。</li>
                <li>订单状态变更为“买家已付款”后，请前往您的收款账户核实是否收到款项，收到后尽快点击放币。</li>
            </ul>
        </div>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            list: [
                { title: '总金额', value: '6.69', border: false },
                { title: '单价', value: '6.56', extra: 'CNY', border: false },
                { title: '数量', value: '100.00', extra: 'USDT', border: false },
                { title: '订单编号', value: '02414555444584415565', border: false },
                { title: '下单时间', value: '2022-10-12 10:36:23', border: false },
            ],
            date: new Date("2022/06/24 18:30:00").getTime() / 1000,
        }
    },
    watch: {
        "$route.params": {
            deep: true,
            immediate: true,
            handler: function (v) {
                if (v.id) {
                    this.id = v.id
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
    },
    destroyed() {
    }
};
</script>

<style lang="less" scoped>
.prompt {
    padding: 18px 12px;
    background: #fff;
    font-weight: bold;
    .title {
        font-size: 22px;
        color: #333333;
    }
    .note {
        font-size: 12px;
        color: #666666;
        margin-top: 10px;
        span {
            font-size: 17px;
            color: #fd5656;
            margin: 0px 3px;
            font-weight: bold;
        }
    }
}

.content {
    padding: 10px 0px;
    background: #fff;
    .theAmountOf {
        position: absolute;
        right: 52px;
        top: 8px;
    }
    /deep/.svg-icon {
        width: 15px;
        height: 15px;
    }
    /deep/.van-cell {
        padding: 5px 16px;
    }
}

.ui-list-dian {
    margin: 12px;
    padding: 12px;
    background: #e6e6e6;
    border-radius: 4px;
}
</style>