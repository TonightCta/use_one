<!--
 * @Name: 订单列表已结束
 * @Date: 2022-06-20 09:37:14
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 18:29:42
-->
<template>
    <P-main>
        <div>
            <P-nav left-arrow :border="false" :fixed="true" :placeholder="true">
                <template #title>
                    <div class="nav-container ui-flex-row">
                        <B-a class="ongoing" href="/order">进行中</B-a>
                        <div class="hasEnded active">已结束</div>
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
                <IWantToBuy :type="2" v-model="tabs.list[tabs.active].val"></IWantToBuy>
            </P-tabs-container>
        </P-body>
    </P-main>
</template>

<script>
export default {
    components: {
        IWantToBuy:() => import("./components/IWantToBuy"),
    },
    data() {
        return {
            tabs: {
                active: 0,
                list: [
                    { name: '全部', badge: '9', scroll: '' ,val:0},
                    { name: '已完成', badge: '199', scroll: '',val:3 },
                    { name: '已取消', scroll: '',val:4}
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