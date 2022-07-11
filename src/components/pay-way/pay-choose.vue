<!--
 * @Name: 支付方式选择-带用户帐号 相关 帐号
 * @Date: 2022-06-22 14:16:52
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:22:26
-->
<template>
    <P-popup v-model="show" title="选择付款方式" class="pay-popup">
        <div class="pay">
            <van-radio-group v-model="radio">
                <van-cell-group :border="false">
                    <van-cell v-for="(item, index) in list" :key="index" clickable @click="onPay(index,item)"
                        :border="false">
                        <template #title>
                            <div class="pay-title">
                                <B-svg :name="item.icon" class="pay-icon"></B-svg>
                                <div>
                                    <div class="title">{{item.name}}({{item.account}})</div>
                                    <div class="username ui-flex">
                                        <div>{{item.username}}</div>
                                        <div v-if="item.bank" class="m-10-l">{{item.bank}}-{{item.whereItIs}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #right-icon>
                            <van-radio :name="index.toString()" v-if="radio == index.toString()" />
                            <van-icon name="circle" v-else />
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
                { icon: 'qianBao', name: '银行卡', account: '1214 5412 1456 2145', username: '吴彦祖', bank: '招商银行', whereItIs: '沙井支行' },
                // { icon: 'zhiFuBao', name: '微信', account: '15223656325', username: '吴彦祖' },
                // { icon: 'weiXinZhiFu', name: '支付宝', account: '16548756924', username: '吴彦祖' }
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
        onPay(index, row) {
            this.radio = index.toString()
            this.show = false
            this.$emit('click', row)
        }
    }
};
</script>

<style lang="less" scoped>
.pay-popup {
    /deep/.container {
        padding: 0px 12px 12px;
    }
}
.pay {
    padding-top: 15px;
    &-icon {
        width: 34px;
        height: 34px;
        margin-right: 14px;
    }
    &-title {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333333;
        .username {
            color: #999999;
        }
    }
    /deep/.van-cell {
        padding: 10px 0px;
        display: flex;
        align-items: center;
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
    .van-icon-circle:before {
        content: "\e692";
        color: #e6e6e6;
        font-size: 18px;
    }
}
</style>