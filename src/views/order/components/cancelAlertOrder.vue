<!--
 * @Name: 取消订单弹窗
 * @Date: 2022-06-22 15:43:49
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:17:27
-->
<template>
    <P-alert v-model="show" title="确认取消订单">
        <B-typographya v-for="(item, index) in list" :key="index" :svg="item.svg" :title="item.title"
            :class="item.class" :content="item.content" :index="index">
            <template #icon_1>
                <B-svg :name="item.svg" class-name="b-icon-svg" :class="[bool ? 'active':'']" @click="checkThe"></B-svg>
            </template>
            <template #title_1>
                <div @click="checkThe">{{item.title}}</div>
                <div class="ui-col-hong" v-if="prompt">
                    请先勾选后在执行操作
                </div>
            </template>
        </B-typographya>
        <div class="ui-flex-center m-20-t">
            <van-button type="info" class="btn-info" @click="shutDown">再想想</van-button>
            <van-button type="default" class="btn-default" @click="cancelTheOrder">取消订单</van-button>
        </div>
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
            bool: false,
            list: [
                { svg: 'GanTanYuan1', class: 'text-prompt', title: '若您已向卖家付款，请勿取消订单，否则可能会导致资金损失。若当日取消超过3次将会禁止交易。' },
                { svg: 'Gou1', class: 'text-yesNo', title: '我还没付钱给对方' },
            ],
            show: false,
            prompt: false
        }
    },
    watch: {
        value(v) {
            this.show = v
        },
        show(v) {
            this.$emit('input', v)
        },
        bool(v) {
            if (v) {
                this.prompt = false
            }
        }
    },
    methods: {
        checkThe() {
            this.bool = !this.bool
        },
        shutDown() {
            this.show = false
            this.bool = false
        },
        cancelTheOrder() {
            if (!this.bool) {
                this.prompt = true
                return
            }
            this.$emit('click', this)
        }
    }
};
</script>

<style lang="less" scoped>
.text-prompt {
    /deep/.title {
        font-size: 14px;
        color: #666666;
        .icon-svg {
            width: 11px;
            height: 20px;
            .b-icon-svg {
                width: 11px;
                height: 11px;
            }
        }
    }
}

.text-yesNo {
    /deep/.title {
        font-size: 12px;
        color: #6580ff;
        .icon-svg {
            width: 11px;
            height: 20px;
            .b-icon-svg {
                width: 11px;
                height: 11px;
            }
        }
    }
}

.b-icon-svg {
    width: 11px;
    height: 11px;
    border-radius: 2px;
    border: 1px solid #6580ff;
    /deep/use {
        display: none;
    }
    &.active {
        /deep/use {
            display: block;
        }
    }
}

.van-button {
    height: 40px;
    border: none;
    width: 100%;
}

.btn-info {
    margin-right: 5px;
}

.btn-default {
    margin-left: 5px;
    background: #eeeeee;
}
</style>