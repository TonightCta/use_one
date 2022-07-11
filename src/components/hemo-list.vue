<!--
 * @Name: 首页列表内容组件
 * @Date: 2022-06-17 20:49:33
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-01 10:32:58
-->

<template>
    <div class="list">
        <div class="header ui-flex-center">
            <ul class="left">
                <li>
                    <van-image round width="20" height="20" lazy-load src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                </li>
                <li class="name">{{ name.shenglue(10) }}</li>
                <li>
                    <B-svg name="renzhengxinxi" className="renzhengxinxi"></B-svg>
                </li>
            </ul>
            <ul class="right ui-flex ui-list ui-list-hx">
                <li>成交量 335</li>
                <li>85%</li>
            </ul>
        </div>
        <div class="body ui-flex-center">
            <div>
                <div><span class="label">数量</span>17.954 USDT</div>
                <div><span class="label">限额</span>₹100.00-₹120.00</div>
            </div>
            <div class="right">
                <div>单价</div>
                <div class="price" :style="{'color':color}">
                    <span class="symbol m-5-r">₹</span>{{Price}}
                </div>
            </div>
        </div>
        <div class="footer ui-flex-center">
            <Pay-way />
            <div class="btn" :style="{'background':color}" @click="btnClick">
                {{btnName}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //按钮名称
        btnName: {
            type: String,
            default: '购买'
        },
        //按钮背景色和价格文字颜色
        color: {
            type: String,
            default: '#2cbc94'
        },
        name: {
            type: String,
            default: ''
        },
        Price: {
            type: [Number, String],
            default: 0
        }
    },
    methods: {
        btnClick() {
            this.$emit('btnClick')
        }
    }
};
</script>

<style lang="less" scoped>
.list {
    padding: 12px 0px;
}

.header {
    color: #666666;
    .left {
        display: flex;
        li {
            height: 35px;
            display: flex;
            align-items: center;
            &.name {
                font-size: 14px;
                font-weight: bold;
                color: #333330;
                margin: 0px 9px;
            }
            .renzhengxinxi {
                width: 12px;
                height: 13px;
            }
        }
    }
    .right {
        li {
            &:after {
                height: 10px;
                top: 54%;
                background: #999999;
            }
            &:last-of-type {
                padding-right: 0px;
            }
        }
    }
}

.body {
    color: #666666;
    line-height: 25px;

    .right {
        text-align: right;
    }

    .label {
        font-size: 12px;
        color: #999999;
        margin-right: 5px;
    }

    .price {
        font-size: 22px;
        font-weight: bold;
        .symbol {
            font-size: 14px;
        }
    }
}

.footer {
    margin-top: 5px;
    li {
        margin-right: 10px;
        /deep/.svg-icon {
            width: 15px;
            height: 15px;
        }
    }
    .btn {
        width: 78px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
    }
}
</style>