<!--
 * @Name: 我要卖
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:17:14
-->
<template>
    <div>
        <P-list ref="P-list" :footer="true" @refresh="onRefresh" @load="onList">
            <template v-slot="{row, index}">
                <template v-if="index == 0">
                    <Hemo-list btn-name="出售" color="#FD5656" :name="row.title" :Price="row.Price"
                        @btnClick="bool.dialog = true">
                    </Hemo-list>
                </template>
                <template v-else>
                    <Hemo-list btn-name="出售" color="#FD5656" :name="row.title" :Price="row.Price"
                        @btnClick="btnClick(row)">
                    </Hemo-list>
                </template>
            </template>
        </P-list>
        <BtnBuyingAndSelling v-model="bool.BuyingAndSelling" title="出售" :currency="value" />
        <Alert v-model="bool.dialog" btn-determine-name="添加">
            买家仅支持xxx向您付款，您需要添加并开启相应的收款方式。
        </Alert>
    </div>
</template>

<script>
import HemoList from '@/components/hemo-list'
import BtnBuyingAndSelling from './BtnBuyingAndSelling'

export default {
    components: {
        HemoList, BtnBuyingAndSelling
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
    },
    data() {
        return {
            bool: {
                BuyingAndSelling: false,
                dialog: false
            },
            list: [],
            loading: false,
            finished: false,//是否已加载完成，加载完成后不再触发load事件
            refreshing: false,
        }
    },
    methods: {
        async onList() {
            const response = await API.GetData(this, 'api/list')
            const { code, items, total } = response
            if (code == 200) {
                this.$refs['P-list'].Add(items, total)
            }
        },
        onRefresh() {
            this.onList()
        },
        btnClick(row) {
            this.bool.BuyingAndSelling = true;
        }
    }
};
</script>