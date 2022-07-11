<!--
 * @Name: 下拉选项
 * @Date: 2022-06-18 14:03:16
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:24:31
-->

<template>
    <div class="ui-flex-center screening">
        <div class="left">
            <van-dropdown-menu active-color="#2cbc94">
                <van-dropdown-item title="支付方式">
                    <MethodOfPayment></MethodOfPayment>
                </van-dropdown-item>
                <van-dropdown-item title="交易金额">
                    <TheAmountOf></TheAmountOf>
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>
        <div class="right">
            <van-dropdown-menu active-color="#2cbc94">
                <van-dropdown-item title="更多筛选">
                    12
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>
    </div>
</template>

<script>
import MethodOfPayment from './methodOfPayment'
import TheAmountOf from './TheAmountOf'

export default {
    components: {
        MethodOfPayment,
        TheAmountOf
    },
    data() {
        return {

        };
    },
    methods: {
    }
};
</script>

<style lang="less" scoped>
.screening {
    padding-left: 5px;
    color: #333333;
    font-size: 14px;
    background: #fff;
    /deep/.van-dropdown-menu {
        .van-dropdown-menu__bar {
            height: 44px;
            box-shadow: none;
            .van-dropdown-menu__item {
                margin-right: 25px;
                .van-dropdown-menu__title::after {
                    border-color: transparent transparent #666666 #666666;
                }
            }
        }
        .van-popup {
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
        }
    }
    .right {
        /deep/.van-dropdown-menu {
            .van-dropdown-menu__bar {
                .van-dropdown-menu__item {
                    margin-right: 20px;
                }
            }
        }
    }
}
</style>