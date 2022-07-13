<!--
 * @Name: 首页
 * @Date: 2022-06-20 09:37:14
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 20:53:03
-->
<template>
    <P-main>
        <!-- 头部信息 -->
        <div class="head">
            <div class="ui-flex-center">
                <div class="ui-flex-1"></div>
                <div class="ui-flex-2 ui-flex-row title" @click="bool.TopShow = true">
                    <div class="name">{{dropdown.options[dropdown.value].text}}</div>
                    <!-- <van-icon name="arrow-down" class="m-5-l" /> -->
                    <B-svg name="xiala-2" width="12" />
                </div>
                <div class="ui-flex-1 ui-flex-right">
                    <div class="options ui-flex-row" @click="bool.CurrencyOption = true" v-if="dropdown.value == 0">
                        <div class="name">{{typeCoin}}</div>
                        <B-svg name="jianTouXia" class-name="jianTouXia" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 买 / 卖 选项卡 -->
        <van-sticky>
            <div class="head-nav ui-flex-center">
                <div>
                    <ul class="ui-flex nav">
                        <li v-for="(item, index) in headNav.list" :key="index"
                            :class="[headNav.active === index ? 'active':'']" @click="onHeadNav(index)">{{item}}
                        </li>
                    </ul>
                </div>
                <ul class="ui-list">
                    <li>
                        <B-svg name="TopDingDan" />
                    </li>
                    <li>
                        <More />
                    </li>
                </ul>
            </div>
            <div class="tabs">
                <div class="container">
                    <P-tabs class="ui-hx m-12-lr" v-model="tabs.active" :list="tabs.list" />
                </div>
            </div>
            <TheDropDownOptions v-if="dropdown.value == 0" :buyOrSell="headNav.active"/>
            <Authentication />
        </van-sticky>

        <div class="body">
            <P-tabs-container v-model="tabs.active" :list="tabs.list">
                <component :is="headNav.cmpName" v-model="tabs.list[tabs.active].name" :headNavActive="headNav.active">
                </component>
            </P-tabs-container>
        </div>

        <P-suspension-add v-if="dropdown.value == 0" />
        <MoneySafe v-model="dialog.show" />
        <P-popup v-model="bool.TopShow" :head="false">
            <van-cell-group :border="false">
                <van-cell v-for="(item, index) in dropdown.options" :key="index" :title="item.text" :label="item.label"
                    @click="dropdown.value = item.value;bool.TopShow = false" />
            </van-cell-group>
        </P-popup>
        <Currency-Option v-model="bool.CurrencyOption" @click="onCurrency" />
    </P-main>
</template>

<script>
import TheDropDownOptions from '@/components/TheDropDownOptions'
import More from './components/More'
import MoneySafe from './components/MoneySafe'

export default {
    components: {
        IWantToBuy: () => import("./components/IWantToBuy"),
        IWantToSell: () => import("./components/IWantToSell"),
        Buy: () => import("./components/buy"),
        Authentication: () => import("@/components/authentication"),
        CurrencyOption:() => import("@/components/currency"),
        TheDropDownOptions,
        More,
        MoneySafe
    },
    data() {
        return {
            typeCoin:'INR',
            bool: {
                TopShow: false,
                CurrencyOption:false,
            },
            headNav: {
                active: 0,
                scroll: [0, 0],
                cmpName: "IWantToBuy",
                list: ['我要买', '我要卖']
            },
            tabs: {
                active: 0,
                list: [
                    { name: 'USDT', scroll: '' },
                    { name: 'BTC', scroll: '' },
                    { name: 'AITD', scroll: '' },
                    { name: 'ETH', scroll: '' },
                    { name: 'XRP', scroll: '' },
                ]
            },
            scroll: 0,
            dropdown: {
                value: 0,
                options: [
                    { text: '自选区', value: 0, label: '一键买卖，快速交易' },
                    { text: '快捷区', value: 1, label: '更多选择，自由交易' }
                ]
            },
            dialog: {
                show: false
            },
            actions: [
                { name: '我的广告' },
                { name: '我的商家信息' },
                { name: '收款方式管理' }
            ]
        }
    },
    watch: {
        'tabs.active'(now, before) {
            if (this.dropdown.value === 0) {
                let scroll = this.tabs.list[now].scroll
                if (scroll != '') {
                    this.scrollTop(scroll)
                } else {
                    if (this.scroll >= 84) {
                        this.scrollTop(84)
                    }
                }
            }
        },
        'dropdown.value': {
            immediate: true,
            handler: function (v) {
                if (v === 1) {
                    this.headNav.cmpName = "buy"
                    this.dialog.show = true
                } else {
                    if (this.headNav.active === 0) {
                        this.headNav.cmpName = "IWantToBuy"
                    } else {
                        this.headNav.cmpName = "IWantToSell"
                    }
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        onCurrency(val){
            console.log(val);
            this.typeCoin = val.coin;
        },  
        onHeadNav(i) {
            if (this.headNav.active === i) {
                return
            } else {
                this.headNav.active = i
            }

            if (this.dropdown.value === 0) {
                if (i === 0) {
                    this.headNav.scroll[1] = this.scroll;
                    this.headNav.cmpName = "IWantToBuy"
                } else {
                    this.headNav.scroll[0] = this.scroll;
                    this.headNav.cmpName = "IWantToSell"
                }

                let scroll = this.headNav.scroll[i]

                if (scroll !== 0) {
                    if (scroll >= 84) {
                        this.scrollTop(scroll)
                    } else {
                        this.scrollTop(84)
                    }
                } else {
                    if (this.scroll >= 84) {
                        this.scrollTop(84)
                    }
                }
            }
        },
        handleScroll() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop

            let { active, list } = this.tabs
            list[active].scroll = this.scroll
        },
        scrollTop(value) {
            this.$nextTick(() => {
                document.body.scrollTop = value
                document.documentElement.scrollTop = value
            })
        },
        sheet(action, index) {
            console.log(action, index)
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    }
};
</script>

<style lang="less" scoped>
.head {
    height: 55px;
    padding: 23px 12px 0px 12px;
    background: #2cbc94;
    .title {
        color: #ffffff;
        .name {
            font-size: 18px;
            margin-right: 7px;
        }
        /deep/.van-dropdown-menu__bar {
            .van-ellipsis {
                color: #fff;
            }
            .van-dropdown-menu__title--active {
                color: #fff !important;
            }
        }
    }

    .options {
        min-width: 50px;
        padding: 0 6px;
        height: 21px;
        background: #ffffff33;
        border-radius: 11px;
        color: #fff;
        .name {
            font-size: 12px;
        }
        .jianTouXia {
            fill: #fff;
            width: 12px;
            height: 12px;
            margin-left: 3px;
        }
    }
}

.head-nav {
    height: 56px;
    padding: 0px 12px;
    background: #2cbc94;
    li {
        line-height: 55px;
        color: #fff;
        /deep/.svg-icon {
            width: 20px;
            height: 20px;
            fill: #fff;
            margin-left: 8px;
        }
    }
    .nav {
        li {
            font-size: 16px;
            margin-right: 20px;
            &.active {
                font-size: 22px;
            }
        }
    }
}

.tabs {
    background: #2cbc94;
    .container {
        border-top-left-radius: 14px;
        border-top-right-radius: 14px;
        background: #fff;
        overflow: hidden;
    }
}

.body {
    padding: 0px 12px;
    /deep/.van-tabs__wrap {
        display: none;
    }
}
</style>