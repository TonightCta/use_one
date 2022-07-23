<template>
  <P-main>
    <div class="container">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
        <!-- <div>123</div> -->
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <foorer></foorer>
  </P-main>
</template>

<script>
import foorer from "@/components/footer";

export default {
  components: {
    foorer,
  },
};
</script>

<style lang="less" scoped>
.container {
  flex: 1;
}
</style>