<!--
 * @Name: 个人中心
 * @Date: 2022-06-28 09:40:19
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 18:12:11
-->
<template>
    <P-main>
        <div class="head ui-flex-left">
            <div class="ui-flex-row m-10-r">
                <van-image width="39" height="39" :src="require('@/assets/touxiang.png')" round lazy-load />
            </div>
            <div>
                <div class="name">空空如也</div>
                <div class="ui-flex certification">
                    <div class="ui-flex-row">
                        <div class="title">实名认证</div>
                        <B-svg name="gouXun" class-name="gouXun" />
                    </div>
                    <div class="ui-flex-row">
                        <div class="title">手机认证</div>
                        <B-svg name="gouXun" class-name="gouXun" />
                    </div>
                    <div class="ui-flex-row">
                        <div class="title">邮箱认证</div>
                        <B-svg name="gouXun" class-name="gouXun" />
                    </div>
                </div>
            </div>
            <div class="btn-certification ui-flex-center">
                <B-svg name="gouXun-1" width="13px" />
                <div class="name">实名认证</div>
                <B-svg name="jianTouShuang-1" width="11px" height="8px" />
            </div>
        </div>
        <P-body class="m-60-b">
            <div class="totalAssets ui-flex-center">
                <div>
                    <label>总资产估值</label>
                    <dl class="ui-flex-dl">
                        <dt>1965.214</dt>
                        <dd>
                            INR
                            <B-svg name="jianTouXia" width="13px" />
                        </dd>
                    </dl>
                </div>
                <div class="btn ui-flex-row">
                    <div>查看</div>
                    <B-svg name="jianTouYou1" width="13px" height="10px" color="#fff" />
                </div>
            </div>
            <ul class="clinchADealTheData ui-list ui-list-hx">
                <li class="w-70">
                    <div class="ui-flex-1">
                        <label class="ui-ali-l-i">成交单数</label>
                        <div class="val ui-ali-l-i">253</div>
                    </div>
                </li>
                <li class="w-70">
                    <div class="ui-flex-1">
                        <label>成交率</label>
                        <div class="val">95%</div>
                    </div>
                </li>
                <li class="ui-flex-1">
                    <div class="ui-flex-1">
                        <label>平均放行</label>
                        <div class="val">
                            <dl class="ui-flex-dl">
                                <dt>3.54</dt>
                                <dd>min</dd>
                            </dl>
                        </div>
                    </div>
                </li>
                <li class="ui-flex-1">
                    <div class="ui-flex-1">
                        <label class="ui-ali-r-i">平均付款</label>
                        <div class="val ui-ali-r-i">
                            <dl class="ui-flex-dl">
                                <dt>3.54</dt>
                                <dd>min</dd>
                            </dl>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="trading">
                <div class="name">今日交易情况</div>
                <ul class="ui-list">
                    <li>
                        <div class="ui-flex-1">
                            <div class="val">253</div>
                            <label>成交单数</label>
                        </div>
                    </li>
                    <li>
                        <div class="ui-flex-1">
                            <div class="val">95</div>
                            <label>成交率</label>
                        </div>
                    </li>
                    <li>
                        <div class="ui-flex-1">
                            <div class="val">2500.00</div>
                            <label>平均放行</label>
                        </div>
                    </li>
                </ul>
            </div>

            <P-cell :list="list" class="column">
                <template #icon={row}>
                    <div class="m-5-r">
                        <B-svg :name="row.svg" width="17px" />
                    </div>
                </template>
            </P-cell>
        </P-body>
    </P-main>
</template>

<script>

export default {
    data() {
        return {
            list: [
                { svg: 'gr-dingdan', title: '我的订单', 'islink': true, to: '/order' },
                { svg: 'gr-shoukuanfangshi', title: '收款方式', 'islink': true, to: '/bankcard' },
                { svg: 'gr-bangzhuzhongxin', title: '帮助中心', 'islink': true },
                { svg: 'gr-anquanzhongxin', title: '安全中心', 'islink': true ,to: "/safty"},
                { svg: 'gr-shezhi', title: '设置', 'islink': true ,to: "/setting"}
            ]
        }
    },
    methods: {

    }
};
</script>

<style lang="less" scoped>
.body {
    padding: 0;
}

.head {
    height: 150px;
    padding: 0px 12px;
    background: url("~@/assets/PersonalCenterHead.png") #26b890;
    background-size: cover;
    position: relative;
    &::after {
        content: "";
        height: 10px;
        display: block;
        background: #fff;
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .name {
        font-size: 18px;
        color: #ffffff;
    }
    .certification {
        .ui-flex-row {
            margin-right: 7px;
        }
        .title {
            font-size: 12px;
            color: #ffffff;
        }
        .gouXun {
            width: 13px;
            height: 13px;
            fill: #fff;
            margin-left: 3px;
        }
    }

    .btn-certification {
        width: 96px;
        height: 30px;
        background: rgba(255, 255, 255, 0.08);
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-top: 1px solid rgba(255, 255, 255, 0.77);
        border-bottom: 1px solid rgba(255, 255, 255, 0.77);
        border-left: 1px solid rgba(255, 255, 255, 0.77);
        position: absolute;
        right: 0px;
        padding: 0px 5px;
        margin-top: -30px;
        .name {
            font-size: 12px;
            color: #ffffff;
        }
    }
}

.totalAssets {
    padding: 5px 24px;
    label {
        font-size: 12px;
        color: #666666;
    }
    dt {
        font-size: 22px;
        color: #333333;
        font-weight: bold;
    }
    dd {
        font-size: 14px;
        color: #333333;
    }
    .btn {
        width: 59px;
        height: 28px;
        background: #f8f8f8;
        border-radius: 4px;
        font-size: 12px;
        color: #666666;
    }
}

.clinchADealTheData {
    margin: 20px 24px 10px 24px;
    li {
        &:after {
            height: 16px;
            background: #eeeeee;
            opacity: 1;
        }
    }
    label {
        display: block;
        font-size: 12px;
        color: #666666;
        text-align: center;
    }
    .val {
        margin-top: 3px;
        font-size: 18px;
        color: #333333;
        text-align: center;
        font-weight: bold;
        dd {
            font-size: 14px;
            margin-left: 0px;
        }
        .ui-flex-dl {
            dt {
                font-size: 18px;
            }
        }
        &.ui-ali-r-i {
            .ui-flex-dl {
                justify-content: flex-end;
            }
        }
    }
}

.trading {
    height: 120px;
    border-radius: 5px;
    background: url("~@/assets/trading.png");
    background-size: cover;
    position: relative;
    padding: 14px;
    .name {
        font-size: 14px;
        color: #ffffff;
        margin-top: 4px;
        margin-left: 6px;
    }
    ul {
        padding-top: 10px;
    }
    li {
        flex: 1;
        label {
            display: block;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
        .val {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
        }
    }
}

.column {
    /deep/.van-cell {
        padding: 10px 20px 10px 24px;
    }
}
</style>