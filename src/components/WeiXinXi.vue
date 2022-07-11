<!--
 * @Name: 微信息
 * @Date: 2022-06-21 14:52:40
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:24:37
-->
<template>
    <B-svg :name="value == 0 ? 'WeiXinXi' : 'WeiXinXi-1'" class-name="WeiXinXi"></B-svg>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0
        }
    }
};
</script>

<style lang="less" scoped>
.WeiXinXi {
    width: 20px;
    height: 20px;
}
</style>