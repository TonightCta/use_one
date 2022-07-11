<!--
 * @Name: 更多
 * @Date: 2022-06-19 02:00:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:17:23
-->
<template>
    <div>
        <B-svg name="sanDian" @click="show = true"></B-svg>
        <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" close-on-click-action @select="sheet" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            actions: [
                { name: '我的广告' },
                { name: '我的商家信息' },
                { name: '收款方式管理' }
            ]
        }
    },
    methods: {
        sheet(action, index) {
            console.log(action, index)
        }
    }
};
</script>