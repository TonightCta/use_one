<!--
 * @Name: 支付方式选择
 * @Date: 2022-06-22 14:35:49
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:22:22
-->
<template>
    <P-popup v-model="show" title="选择付款方式">
        <div class="pay">
            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell v-for="(item, index) in list" :key="index" clickable @click="onPay(index)"
                        :border="false">
                        <template #title>
                            <div class="pay-title">
                                <B-svg :name="item.icon" class="pay-icon"></B-svg>
                                <div class="title">{{item.name}}</div>
                            </div>
                        </template>
                        <template #right-icon>
                            <van-radio :name="index.toString()" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>
    </P-popup>
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
            show: false,
            radio: '',
            list: [
                { icon: 'qianBao', name: '银行卡' },
                // { icon: 'zhiFuBao', name: '微信' },
                // { icon: 'weiXinZhiFu', name: '支付宝' }
            ]
        }
    },
    watch: {
        value(v) {
            this.show = v
        },
        show(v) {
            this.$emit('input', v)
        },
    },
    methods: {
        onPay(index) {
            this.radio = index.toString()
            this.show = false
        }
    }
};
</script>

<style lang="less" scoped>
.pay {
    padding-top: 20px;
    // padding-bottom: 10px;
    &-icon {
        width: 22px;
        height: 22px;
        margin-right: 14px;
    }
    &-title {
        font-size: 16px;
        color: #333333;
        display: flex;
    }
    /deep/.van-cell {
        padding: 0px 0px 20px 0px;
        &:last-of-type {
            padding: 0px;
        }
    }
    /deep/.van-radio {
        .van-radio__icon {
            font-size: 16px;
            .van-icon {
                border: none;
                position: relative;
                &.van-icon-success:before {
                    position: absolute;
                    left: 2px;
                    font-size: 12px;
                    top: 1px;
                }
            }
        }
        .van-radio__icon--checked .van-icon {
            background-color: #2cbc94;
        }
    }
}
</style>