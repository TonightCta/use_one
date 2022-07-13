<!--
 * @Name: 订单列表组件
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:19:49
-->
<template>
    <P-list ref="P-list" :footer="true" theme="card" @refresh="onRefresh" @load="onList">
        <template v-slot="{row}">
            <Order-list :name="row.name" :Price="row.Price" :badge="row.number" :date="row.datetime"></Order-list>
        </template>
    </P-list>
</template>

<script>
import OrderList from '@/components/order-list'

export default {
    components: {
        OrderList
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            list: []
        }
    },
    methods: {
        async onList() {
            const response = await API.GetData(this, 'api/list')
            const { code, items, total } = response;
            if (code == 200) {
                this.$refs['P-list'].Add(items, total)
            }
        },
        onRefresh() {
            this.onList()
        },
    }
};
</script>