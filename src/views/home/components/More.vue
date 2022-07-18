<!--
 * @Name: 更多
 * @Date: 2022-06-19 02:00:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 18:11:56
-->
<template>
    <div class="ui-flex">
        <B-svg name="sanDian" @click="show = true"></B-svg>
        <P-select v-model="show" :list="unActions" cancelText="取消" @select="sheet"></P-select>
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
            ],
            unActions:[
                {name:'商家申请',url:'/chant-application'},
                {name:'资金划转'},
                {name:'收款方式管理'},
            ]
        }
    },
    methods: {
        sheet(action, index) {
            console.log(action, index);
            action.url && this.$router.push(action.url)
        }
    }
};
</script>