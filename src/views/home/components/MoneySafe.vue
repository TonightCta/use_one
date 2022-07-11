<!--
 * @Name: 资金安全弹窗提示
 * @Date: 2022-06-24 16:17:25
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:18:58
-->
<template>
    <P-alert v-model="show" :btn-show="true" btn-type="danger" btn-name="我知道了">
        <template #title>
            <B-svg name="GanTanTiShi" style="width:38px; height:38px"></B-svg>
        </template>
        为了您的资金安全，请先确认是否收到资金后,在放币。请勿相信任何截图，短信和更换支付方式的请求。
    </P-alert>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: false
        }
    },
    watch: {
        value: {
            immediate: true,
            handler: function (v) {
                this.show = v
            }
        },
        show(v) {
            this.$emit('input', v)
        }
    }
};
</script>