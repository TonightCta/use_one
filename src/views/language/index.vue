<!--
 * @Name: 设置语言
 * @Date: 2022-06-28 22:27:59
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:18:52
-->

<template>
    <P-main type="Fei">
        <Navigation :title="$t('设置语言')" />
        <div class="pay">
            <van-cell-group :border="false">
                <van-cell v-for="(item, index) in list" :key="index" clickable @click="onPay(item)" :title="item.label">
                    <template #right-icon>
                        <van-icon name="success" v-if="language == item.name" />
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            language: '',
            list: [
                { name: 'zh', label: '简体中文' },
                { name: 'en', label: 'English' }
            ]
        }
    },
    created() {
        if (localStorage.getItem("locale")) {
            this.language = localStorage.getItem('locale')
        }
    },
    methods: {
        onPay(row) {
            this.language = row.name;
            this.$store.commit('current/upLanguage',this.language);
            localStorage.locale = this.language
            this.$router.go(0)
        }
    }
};
</script>

<style lang="less" scoped>
.pay{
    margin-top: 6px;
}
.van-icon-success {
    color: #2cbc94;
    font-size: 20px;
}
</style>