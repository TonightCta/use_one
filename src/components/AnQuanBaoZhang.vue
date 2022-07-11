<!--
 * @Name: 安全保障浮悬框
 * @Date: 2022-06-21 23:55:14
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 17:25:20
-->
<template>
    <div>
        <div class="anQuanBaoZhang" @click="popup.show = true">
            <B-svg name="anQuanBaoZhang" class-name="ianQuanBaoZhang"></B-svg>
            <div class="prompt">
                <div>交易安全保障中</div>
                <div>
                    <B-svg name="jianTouYou1" class-name="jianTouYou1"></B-svg>
                </div>
            </div>
        </div>
        <P-popup v-model="popup.show" :closeable="false" class="inTheWholeSecurity">
            <template #title>
                <div>交易安全保障中</div>
            </template>
            <div class="body">
                <B-typographya v-for="(item, index) in list" :key="index" :svg="item.svg" :title="item.title"
                    :content="item.content" :index="index">
                    <template #content_0>
                        <div class="theAuthentication ui-grid-3">
                            <div class="item ui-flex-row-center">
                                <div>
                                    <B-svg name="ShiMinRenZhen"></B-svg>
                                </div>
                                <div class="name">实名认证</div>
                                <div>
                                    <B-svg name="gouXun" class-name="gouXun"></B-svg>
                                </div>
                            </div>
                            <div class="item ui-flex-row-center">
                                <div>
                                    <B-svg name="ShouJiYanZheng"></B-svg>
                                </div>
                                <div class="name">手机认证</div>
                                <div>
                                    <B-svg name="gouXun" class-name="gouXun"></B-svg>
                                </div>
                            </div>
                            <div class="item ui-flex-row-center">
                                <div>
                                    <B-svg name="renLianJianCha"></B-svg>
                                </div>
                                <div class="name">人脸检验</div>
                                <div>
                                    <B-svg name="gouXun" class-name="gouXun"></B-svg>
                                </div>
                            </div>
                        </div>
                    </template>
                </B-typographya>
                <div class="m-25-t">
                    <van-button type="default" class="btn-default h-45-i" @click="popup.show = false">好的</van-button>
                </div>
            </div>
        </P-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            popup: {
                show: false
            },
            list: [
                { svg: 'ShenFenZhen', title: '卖家身份验证' },
                { svg: 'renzhengxinxi1', title: '数字资产保护', content: '从下单开始，平台会持续将卖家订单的数字资产锁定，直到订单结束为止。' },
                { svg: 'ShouXing', title: '基础服务保障', content: '平台提供在线客服，快速响应处理订单问题。' },
            ]
        }
    }
};
</script>

<style lang="less" scoped>
.anQuanBaoZhang {
    position: fixed;
    bottom: 25%;
    left: 12px;
    display: flex;
    .ianQuanBaoZhang {
        width: 42px;
        height: 42px;
        position: absolute;
        z-index: 1;
    }
    .prompt {
        display: flex;
        width: 170px;
        height: 35px;
        background: #ffffff;
        box-shadow: 0px 0px 17px 0px rgba(216, 216, 216, 0.5);
        border-radius: 20px;
        position: absolute;
        top: 2px;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;
        color: #666666;
        .jianTouYou1 {
            width: 10px;
            height: 10px;
            vertical-align: -2px;
            margin-left: 5px;
            margin-right: 10px;
        }
    }
}

.inTheWholeSecurity {
    /deep/.popup-main {
        .head {
            height: 58px;
            background: #f3f6fc;
            display: flex;
        }
    }
    .theAuthentication {
        font-size: 12px;
        color: #333333;
        .item {
            height: 67px;
            padding-top: 2px;
            background: #f3f6fc;
            border-radius: 4px;
            .gouXun {
                width: 16px;
                height: 16px;
                fill: #2cbc94;
            }
            .name {
                padding: 2px 0px;
            }
        }
    }
}

.btn-default {
    font-size: 16px;
    color: #333333;
}
</style>