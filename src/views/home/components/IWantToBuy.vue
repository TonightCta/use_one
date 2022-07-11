<!--
 * @Name: 我要买
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:12:13
-->
<template>
    <div>
        <P-list ref="P-list" :footer="true" @refresh="onRefresh" @load="onList">
            <template v-slot="{row, index}">
                <template v-if="index == 0">
                    <Hemo-list :name="row.title" :Price="row.Price" @btnClick="bool.dialog = true"></Hemo-list>
                </template>
                <template v-else>
                    <Hemo-list :name="row.title" :Price="row.Price" @btnClick="btnClick(row)"></Hemo-list>
                </template>
            </template>
        </P-list>
        <BtnBuyingAndSelling v-model="bool.BuyingAndSelling" :currency="value" />
        <P-alert v-model="bool.dialog">
            <div class="m-20-b size16 h-25-l">
                广告已被商家修改，该广告已失效
            </div>
            <P-button type="primary" class="btn-primary h-44-i size-14-i" @click="bool.dialog = false">好的</P-button>
        </P-alert>
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