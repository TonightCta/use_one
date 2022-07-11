<!--
 * @Name: '请付款', '订单已取消', '订单已完成'
 * @Date: 2022-06-21 14:28:01
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:52:22
-->
<template>
    <P-main type="Fei">
        <Navigation class-name="Fei" :WeiXinXiSwitch="true" />
        <div class="prompt">
            <div class="title">{{state.title[state.index]}}</div>
            <div class="note">
                <template v-if="state.index == 0">
                    请在
                    <B-date-countdown :endTime="date" hour=":" min=":" sec="" />内付款给卖家，超时自动取消
                </template>
                <template v-if="state.index == 1">您已取消订单</template>
                <template v-if="state.index == 2">您购买的资产已放入发币账户</template>
            </div>
        </div>
        <h4 class="h4">购买 USDT</h4>
        <div class="content ui-flex-1">
            <P-cell :list="list" theme="cell">
                <template #value_0="scope">
                    <div class="theAmountOf" :class="{'theAmountOf-hong':state.index == 0}">
                        <div class="fh">₹</div>
                        <div class="jg">{{scope.row.value}}</div>
                    </div>
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

            <van-cell-group :border="false" class="m-30-t cell">
                <van-cell v-if="state.index == 2" :border="false" title="买家昵称" value="彭于晏快递" is-link></van-cell>
                <van-cell v-if="state.index == 2" :border="false" title="买家姓名" value="彭于晏"></van-cell>
                <van-cell v-if="state.index == 0 || state.index == 1" :border="false" title="卖家昵称" value="彭于晏">
                    <template #extra>
                        <div class="ui-flex-row">
                            <div class="p-5-l">
                                <B-svg name="renzhengxinxi" style="width:12px; height:;13px"></B-svg>
                            </div>
                            <van-icon name="arrow" />
                        </div>
                    </template>
                </van-cell>
                <van-cell :border="false" title="收款方式" v-if="state.index == 0 || state.index == 2">
                    <template #right-icon>
                        <Pay-way />
                    </template>
                </van-cell>
            </van-cell-group>

            <template v-if="state.index == 0">
                <div class="Footer ui-flex">
                    <div class="ui-flex-1">
                        <van-button type="default" class="btn-default" @click="bool.cancel = true">取消订单</van-button>
                    </div>
                    <div class="ui-flex-2 m-10-l">
                        <van-button type="info" class="btn-info" @click="bool.show = true">去付款</van-button>
                    </div>
                </div>
            </template>
        </div>
        <AnQuanBaoZhang v-if="state.index == 0"></AnQuanBaoZhang>
        <PayChoose v-model="bool.show" @click="onPayChoose"></PayChoose>
        <CancelAlertOrder v-model="bool.cancel" @click="cancelTheOrder"></CancelAlertOrder>
    </P-main>
</template>

<script>
import AnQuanBaoZhang from '@/components/AnQuanBaoZhang'
import PayChoose from '@/components/pay-way/pay-choose'
import CancelAlertOrder from './components/cancelAlertOrder'

export default {
    components: { AnQuanBaoZhang, PayChoose, CancelAlertOrder },
    data() {
        return {
            id: '',
            state: {
                index: 0,
                title: ['请付款', '订单已取消', '订单已完成']
            },
            bool: {
                show: false,
                cancel: false
            },
            list: [
                { title: '总金额', value: '6.69', border: false },
                { title: '单价', value: '6.56', extra: 'INR', border: false },
                { title: '数量', value: '100.00', extra: 'USDT', border: false },
                { title: '订单编号', value: '02414555444584415565', border: false },
                { title: '下单时间', value: '2022-10-12 10:36:23', border: false },
            ],
            date: new Date("2022/06/23 23:30:00").getTime() / 1000
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
        },
    },
    methods: {
        //取消订单
        cancelTheOrder(v) {
            v.show = false;
            this.state.index = 1
        },
        onPayChoose(row) {
            this.$router.push({
                path: '/payment/' + this.id
            })
        }
    }
};
</script>

<style lang="less" scoped>
.prompt {
    padding: 18px 12px;
    background: #fff;
    .title {
        font-size: 22px;
        color: #333333;
        font-weight: bold;
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
        right: 16px;
        top: 6px;
    }
    /deep/.svg-icon {
        width: 15px;
        height: 15px;
    }
}
</style>