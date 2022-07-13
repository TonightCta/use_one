<!-- 设置 -->
<template>
  <div class="setting-mine">
    <Navigation :title="$t('设置')" />
    <div class="amount-way">
      <van-cell
        v-for="(cell, index) in setList"
        :to="cell.url"
        :key="index"
        :title="cell.title"
        is-link
        :value="cell.sec_point"
      />
    </div>
    <van-cell title="当前版本" value="3.2.0" is-link />
    <div class="login-out">
      <P-button type="primary" class="btn-default" @click="askLoginOut = true">退出登录</P-button>
    </div>
    <Alert title="提示" v-model="askLoginOut" @click="turnLoginOut">
        <p style="text-align:center;">确认退出登录吗?</p>
    </Alert>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    Alert:resolve => require(['../../../components/Alert'],resolve)
  },
  computed: {
    ...mapState(["current"]),
  },
  data() {
    return {
      setList: [
        {
          title: "语言",
          sec_point: "简体中文",
          url: "/language",
          type: 0,
        },
        {
          title: "计价方式",
          sec_point: "",
          url: "/choose-amount-way",
          type: 1,
        },
      ],
      askLoginOut:false,
    };
  },
  methods:{
    turnLoginOut(){
        console.log(123)
    },  
  },    
  mounted() {
    this.$set(
      this.setList[0],
      "sec_point",
      this.current.language == "zh" ? "简体中文" : "English"
    );
    this.$set(this.setList[1], "sec_point", this.current.amount_way);
    // console.log(this.setList);
  },
};
</script>

<style lang="scss" scoped>
.setting-mine {
  background: #f2f2f2;
  width: 100%;
  height: 100vh;
  .amount-way {
    margin: 6px 0;
  }
  .login-out {
    width: 100%;
    padding: 44px 12px;
    .btn-default {
      width: 100%;
      height: 44px;
      background: #e4e4e4;
      color: #666;
      border: 0;
    }
  }
}
</style>