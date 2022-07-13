<!--
 * @Name: 弹窗
 * @Date: 2022-06-30 15:35:14
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-04 19:42:23
-->
<template>
    <P-alert v-model="val" :title="title">
        <div class="m-20-b size16 h-25-l">
            <slot v-if="type == ''"></slot>
            <B-typographya v-if="type == 'typography'" :svg="svg" class="text-prompt">
                <template #title>
                    <slot></slot>
                </template>
            </B-typographya>
        </div>
        <div :class="[cancelSwitch ? 'ui-grid-2':'']">
            <P-button type="default" class="btn-fei-1" v-if="cancelSwitch" @click="cancel">{{btnCancelName}}</P-button>
            <P-button type="primary" class="btn-primary h-44-i" @click="determine">
                {{btnDetermineName}}
            </P-button>
        </div>
    </P-alert>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        btnCancelName: {
            type: String,
            default: '取消'
        },
        btnDetermineName: {
            type: String,
            default: '确定'
        },
        type: {
            type: String,
            default: ''
        },
        svg: {
            type: String,
            default: 'GanTanYuan1'
        },
        cancelSwitch: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            val: false
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function (v) {
                this.val = v
            }
        },
        val(v) {
            this.$emit('input', v)
        },
    },
    methods: {
        cancel() {
            this.val = false
            this.$emit('cancel')
        },
        determine() {
            this.$emit('click')
        }
    }
};
</script>

<style lang="less" scoped>
.text-prompt {
    /deep/.title {
        font-size: 14px;
        color: #666666;
        justify-content: center;
        .icon-svg {
            width: 11px !important;
            height: 20px !important;
            .b-icon-svg {
                width: 11px !important;
                height: 11px !important;
            }
        }
    }
}
</style>