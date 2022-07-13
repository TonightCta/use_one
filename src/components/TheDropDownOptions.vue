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
            <van-dropdown-menu active-color="#2cbc94" v-if="buyOrSell == 1">
                <van-dropdown-item title="更多筛选">
                    12{{buyOrSell}}
                </van-dropdown-item>
            </van-dropdown-menu>
            <div class="buy-more-filter" v-else @click.stop="buyMoreFilter.show = true">
                更多筛选
            </div>
        </div>
        <!-- 买入 - 更多筛选 -->
        <P-popup v-model="buyMoreFilter.show" :head="false">
            12
        </P-popup>
    </div>
</template>

<script>
import MethodOfPayment from './methodOfPayment'
import TheAmountOf from './TheAmountOf'

export default {
    props:{
        buyOrSell:{
            type:Number,
            default:0
        }
    },
    components: {
        MethodOfPayment,
        TheAmountOf
    },
    data() {
        return {
            buyMoreFilter:{
                show:false,
                value:0,
                options:{

                }
            },
        };
    },
    methods: {
        testClick(){
            console.log(123)
        }
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
        .buy-more-filter{
            font-size: 15px;
            padding-right: 28px;
            position: relative;
            overflow: hidden;
        }
        .buy-more-filter::after{
            position: absolute;
            top:50%;
            right: 16px;
            margin-top: -5px;
            border: 3px solid;
            transform: rotate(-45deg);
            opacity: .8;
            content: '';
            border-color: transparent transparent #666 #666;
        }
    }
}
</style>