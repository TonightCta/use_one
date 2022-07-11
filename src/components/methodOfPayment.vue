<!--
 * @Name: 支付方式
 * @Date: 2022-06-18 18:55:53
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:23:25
-->

<template>
    <div class="methodOfPayment ui-grid-2">
        <template v-for="(item, index) in list">
            <TableList :name="item.name" :index="index" v-model="active">
                <template #left>
                    <div v-if="item.color" class="symbol" :style="'background:'+ item.color +';'"></div>
                </template>
            </TableList>
        </template>
    </div>
</template>

<script>
import TableList from './table-list'

export default {
    components: {
        TableList
    },
    data() {
        return {
            list: [
                { name: '全部' },
                { name: '银行卡', color: '#FEBD60' },
                { name: '微信', color: '#09BB07 ' },
                { name: '支付宝', color: '#5173FF' },
            ],
            active: ''
        }
    },
    methods: {

    }
};
</script>

<style lang="less" scoped>
.methodOfPayment {
    padding: 0px 12px 12px 12px;
    .symbol {
        position: absolute;
        left: 8px;
        width: 3px;
        height: 18px;
        border-radius: 1px;
    }
}
</style>