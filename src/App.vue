<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>

    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>
import { FaitRate } from "./api/api";
import { mapState } from "vuex";
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  computed: {
    ...mapState(["current"]),
  },
  data() {
    return {};
  },
  created() {
    // 在页面刷新时，将vuex中的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //     sessionStorage.setItem("YnB3ZW4uY24=", this.$Base64.encode(JSON.stringify(this.$store.state)))
    // })

    // 页面加载时，读取sessionStorage中的状态信息
    // if (sessionStorage.getItem("YnB3ZW4uY24=")) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(this.$Base64.decode(sessionStorage.getItem('YnB3ZW4uY24=')))))
    //     sessionStorage.removeItem("YnB3ZW4uY24=")
    // }
    const a  = {"type":1,"email":"c13240891337@163.com","phone":"13240891337","phone_prefix":"852","nickname":"","status":1,"security":{"ga":0,"kyc":1,"pay_password":1}}
    window.sessionStorage.setItem('amount_way','CNY');
    window.sessionStorage.setItem('way_rate','6.7082');
    window.sessionStorage.setItem('account',JSON.stringify(a));
    window.sessionStorage.setItem('way_symbol','¥');

    const getRate = async () => {
      const result = await FaitRate(this.current.amount_way);
      const { data } = result;
      this.$store.commit("current/upWayRate", data.price);
      this.$store.commit("current/upSymbol", data.symbol);
    };
    getRate();
    setInterval(() => {
      getRate();
    }, 1000 * 60 * 60 * 2);
  },
  mounted() {
    // this.onResize();
  },
  methods: {
    /** 浏览器改变则执行 */
    onResize() {
      this.searchFormWidth();
      window.onresize = () => {
        this.searchFormWidth();
      };
    },
    searchFormWidth() {
      let item = this.$store.state.public.window;
      item.width = window.innerWidth;
      item.height = window.innerHeight;
    },
  },
  destroyed() {
    // window.onresize = null;
  },
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>