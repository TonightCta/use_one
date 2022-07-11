<template>
    <P-main>
        <div class="container">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <foorer></foorer>
    </P-main>
</template>

<script>
import foorer from '@/components/footer';

export default {
    components: {
        foorer
    }
};
</script>

<style lang="less" scoped>
.container {
    flex: 1;
}
</style>