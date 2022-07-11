<!--
 * @Name: 需要帮助悬乎
 * @Date: 2022-06-23 23:47:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 17:26:46
-->
<template>
    <div class="help ui-flex-row">
        <B-svg name="erJi" class-name="erJi"></B-svg>
        <div class="title">需要帮助？</div>
    </div>
</template>

<style lang="less" scoped>
.help {
    position: fixed;
    right: 12px;
    bottom: 15%;
    width: 100px;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 0px 17px 0px rgba(216, 216, 216, 0.5);
    border-radius: 20px;
    .title {
        font-size: 12px;
        color: #5371fe;
    }
    .erJi {
        width: 17px;
        height: 17px;
        margin-right: 6px;
    }
}
</style>