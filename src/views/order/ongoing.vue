<!--
 * @Name: 订单列表进行中
 * @Date: 2022-06-20 09:37:14
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 18:29:18
-->
<template>
    <P-main>
        <div>
            <P-nav :left-arrow="$route.query.outback == 1" :border="false" :fixed="true" :placeholder="true">
                <template #title>
                    <div class="nav-container ui-flex-row">
                        <div class="ongoing active">进行中</div>
                        <B-a class="hasEnded" href="/order/hasended">已结束</B-a>
                    </div>
                </template>
            </P-nav>
            <div class="van-sticky">
                <div class="van-Container">
                    <P-tabs v-model="tabs.active" :list="tabs.list"></P-tabs>
                </div>
            </div>
        </div>
        <P-body type="Fei">
            <P-tabs-container v-model="tabs.active" :list="tabs.list">
                <IWantToBuy></IWantToBuy>
            </P-tabs-container>
        </P-body>
    </P-main>
</template>

<script>
export default {
    components: {
        IWantToBuy: () => import("./components/IWantToBuy"),
    },
    data() {
        return {
            tabs: {
                active: 0,
                list: [
                    { name: '全部', scroll: '' },
                    { name: '未付款', badge: '1', scroll: '' },
                    { name: '已付款', scroll: '' },
                    { name: '申诉中', scroll: '' },
                ],
            },
            headNav: {
                active: 0,
                scroll: [0, 0]
            },
        }
    },
    watch: {
        'tabs.active'(now, before) {
            let scroll = this.tabs.list[now].scroll
            if (scroll != '') {
                this.scrollTop(scroll)
            } else {
                this.scrollTop(0)
            }
        }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
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
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
};
</script>

<style lang="less" scoped>
.van-sticky {
    height: 46px;
    .van-Container {
        position: fixed;
        width: 100%;
        padding: 0px 12px;
        top: 46px;
        background: #fff;
        z-index: 1;
    }
}

.nav-container {
    .ongoing,
    .hasEnded {
        font-size: 14px;
        color: #999999;
        padding: 0px 8px;
        &.active {
            font-size: 18px;
            color: #333333;
        }
    }
}
</style>