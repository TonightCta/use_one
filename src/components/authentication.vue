<!--
 * @Name: 提示身份验证
 * @Date: 2022-06-18 12:44:40
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-01 18:50:53
-->

<template>
    <div>
        <transition name="van-fade">
            <div class="authentication ui-flex-center" v-show="show">
                <div class="ui-flex-left m-30-r">
                    <div>
                        <B-svg name="ganTanYuan" class-name="ganTanYuan"></B-svg>
                    </div>
                    <div class="title b-text-xd-2">
                        为了保障交易功能的正常使用，需要您实名认证
                    </div>
                </div>
                <div class="ui-flex-center">
                    <div class="btn ui-flex-row" @click="popup.show = true">
                        <div class="btn-name">去实名</div>
                        <B-svg name="jianTouShuang" class-name="jianTouShuang"></B-svg>
                    </div>
                    <B-svg name="GuanBiYuan" class-name="GuanBiYuan" @click="shutDown"></B-svg>
                </div>
            </div>
        </transition>
        <P-popup v-model="popup.show" note="为了保障您的交易安全，需要完成以下条件。" :bottom="true">
            <template #title>
                请完成认证和绑定<B-svg name="renzhengxinxi" className="renzhengxinxi"></B-svg>
            </template>
            <div class="body">
                <div class="ui-flex-center">
                    <div class="main">
                        <div class="icon">
                            <B-svg name="shiMingRenZheng" className="shiMingRenZheng"></B-svg>
                        </div>
                        <div class="title">实名认证</div>
                        <div class="operation">
                            <template v-if="smbool">
                                <div class="wc">
                                    已完成<B-svg name="gouXun" className="gouXun"></B-svg>
                                </div>
                            </template>
                            <template v-else>
                                <div class="sz">
                                    去设置<B-svg name="gouXun" className="gouXun"></B-svg>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div>
                        <B-svg name="jianTouYou" className="jianTouYou"></B-svg>
                    </div>
                    <div class="main">
                        <div class="icon">
                            <B-svg name="miMa" className="miMa"></B-svg>
                        </div>
                        <div class="title">实名认证</div>
                        <div class="operation">
                            <template v-if="jymmbool">
                                <div class="wc">
                                    已完成<B-svg name="gouXun" className="gouXun"></B-svg>
                                </div>
                            </template>
                            <template v-else>
                                <div class="sz">
                                    去设置<B-svg name="gouXun" className="gouXun"></B-svg>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </P-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true,
            popup: {
                show: false
            },
            smbool: true,
            jymmbool: false
        }
    },
    methods: {
        shutDown() {
            this.show = false
        }
    },
};
</script>

<style lang="less" scoped>
.authentication {
    height: 52px;
    background: #d7fff4;
    padding: 0px 12px;
    .title {
        color: #2cbc94;
        margin-left: 8px;
        font-size: 12px;
        font-weight: 400;
    }
    .btn {
        width: 69px;
        height: 24px;
        border-radius: 4px;
        border: 1px solid #2cbc94;
        margin-right: 20px;
        &-name {
            color: #2cbc94;
            margin-right: 4px;
            font-size: 12px;
            font-weight: 400;
        }
    }
    .ganTanYuan {
        width: 14px;
        height: 14px;
        display: flex;
    }
    .jianTouShuang {
        width: 12px;
        height: 7px;
    }
    .GuanBiYuan {
        width: 14px;
        height: 14px;
    }
}

.popup-main {
    padding: 12px;
    .head {
        .title {
            font-weight: bold;
            font-size: 16px;
            color: #333333;
        }
        .note {
            min-height: 15px;
            margin-top: 5px;
            padding-bottom: 10px;
            font-size: 12px;
            color: #999999;
        }
    }
}

.renzhengxinxi {
    width: 15px;
    height: 15px;
    margin-left: 5px;
}

.body {
    padding: 33px 39px;
    .jianTouYou {
        width: 21px;
        height: 21px;
    }
    .shiMingRenZheng {
        width: 33px;
        height: 33px;
    }
    .miMa {
        width: 30px;
        height: 30px;
    }
    .gouXun {
        width: 11px;
        height: 11px;
        margin-left: 5px;
        vertical-align: -1px;
    }
    .main {
        width: 100px;
        text-align: center;
        .icon {
            margin-bottom: 3px;
        }
        .title {
            font-size: 14px;
            color: #333333;
            margin-bottom: 8px;
        }
        .operation {
            font-size: 12px;
            .wc {
                color: #09bb07;
                .gouXun {
                    color: #09bb07;
                    fill: #09bb07;
                }
            }
            .sz {
                color: #0170ff;
                .gouXun {
                    color: #cccccc;
                    fill: #cccccc;
                }
            }
        }
    }
}
</style>