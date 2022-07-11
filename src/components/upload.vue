<!--
 * @Name: 上传组件
 * @Date: 2022-04-23 17:40:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-04-23 18:57:18
-->

<template>
    <B-upload :action="action" :headers="headers" :data="data" :url="url" @callback="onCallback"></B-upload>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            action: process.env.VUE_APP_BASE_API + "/common/upload/single_pic",
            headers: {
                Authorization: getToken()
            },
            data: {
                savePath: "-"
            },
            url: this.value
        }
    },
    methods: {
        onCallback(row) {
            if (row.code == 200) {
                this.$message.success(row.msg);
                let { fileName, url } = row.data;
                this.url = url;
                this.$emit('input', url);
            }
        }
    }
};
</script>