<!--
 * @Name: 等待对方放行
 * @Date: 2022-06-23 17:30:13
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:52:09
-->
<template>
    <P-main type="Fei">
        <Navigation class-name="Fei" :phone-switch="true" :WeiXinXiSwitch="true" />
        <div class="prompt">
            <div class="title">等待对方放行</div>
            <div class="note">
                剩余时间
                <B-date-countdown :endTime="date" hour=":" min=":" sec="" />超时自动放币
            </div>
        </div>
        <h4 class="h4">购买 USDT</h4>

        <div class="content ui-flex-1">
            <P-cell :list="list" theme="cell">
                <template #value_0="scope">
                    <ul class="ui-list ui-list-hx">
                        <li>
                            <div class="theAmountOf">
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

            <van-cell-group :border="false" class="m-30-t cell">
                <van-cell :border="false" title="卖家昵称" value="彭于晏">
                    <template #extra>
                        <div class="ui-flex-row">
                            <div class="p-5-l">
                                <B-svg name="renzhengxinxi" style="width:12px; height:;13px"></B-svg>
                            </div>
                            <van-icon name="arrow" />
                        </div>
                    </template>
                </van-cell>
                <van-cell :border="false" title="收款方式">
                    <template #right-icon>
                        <Pay-way />
                    </template>
                </van-cell>
                <van-cell :border="false" title="买家姓名" value="彭于晏"></van-cell>
            </van-cell-group>
            <div class="Footer ui-flex">
                <div class="ui-flex-1">
                    <van-button :type="onBtn(complaint.value,'申诉')" plain
                        :class="[complaint.value == '申诉' ? 'btn-info':'btn-default']">
                        <B-date-countdown v-model="complaint.value" :endTime="complaint.date" hour=":" min=":" sec=""
                            title-left="申诉 (" title-right=")" endText="申诉" />
                    </van-button>
                </div>
                <div class="ui-flex-1 m-10-l">
                    <van-button :type="onBtn(urged.value,'催促一次')"
                        :class="[urged.value == '催促一次' ? 'btn-info':'btn-fei']">
                        <B-date-countdown v-model="urged.value" :endTime="urged.date" hour=":" min=":" sec=""
                            title-left="催促一次 (" title-right=")" endText="催促一次" />
                    </van-button>
                </div>
            </div>
        </div>
        <Help />
    </P-main>
</template>

<script>
import Help from '@/components/help'

export default {
    components: { Help },
    data() {
        return {
            id: '',
            list: [
                { title: '总金额', value: '6.69', border: false },
                { title: '单价', value: '6.56', extra: 'INR', border: false },
                { title: '数量', value: '100.00', extra: 'USDT', border: false },
                { title: '订单编号', value: '02414555444584415565', border: false },
                { title: '下单时间', value: '2022-10-12 10:36:23', border: false },
            ],
            date: new Date("2022/06/24 10:30:00").getTime() / 1000,
            complaint: {
                value: '',
                date: new Date("2022/06/24 00:37:00").getTime() / 1000
            },
            urged: {
                value: '',
                date: new Date("2022/06/24 00:37:00").getTime() / 1000
            }
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
        onBtn(val, text) {
            return val == text ? 'info' : 'default'
        }
    },
    destroyed() {
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
</style>