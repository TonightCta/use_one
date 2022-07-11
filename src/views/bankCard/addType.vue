<!--
 * @Name: 添加类型选择
 * @Date: 2022-07-04 15:35:32
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-05 17:37:09
-->
<template>
    <P-main>
        <Navigation title="添加" />
        <P-body type="Fei">
            <van-cell-group :border="false" class="m-6-t">
                <van-cell v-for="(item, index) in list" :key="index" @click="selected(item)">
                    <template #title>
                        <div class="ui-flex-left">
                            <img :src="item.logo" width="16" height="16" />
                            <div class="name">{{item.name}}</div>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>
        </P-body>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    mounted() {
        this.onList()
    },
    methods: {
        selected(row) {
            this.$store.commit('card/SET_ADDTYPE', row.id);
            this.$router.push({
                path: '/bankcard/operation'
            })
        },
        async onList() {
            const response = await API.GetData(this, 'card/map')
            this.list = response
        }
    }
};
</script>

<style lang="less" scoped>
.body {
    padding: 0px;
    .name {
        margin-left: 12px;
        font-size: 14px;
        color: #333333;
    }
}
</style>