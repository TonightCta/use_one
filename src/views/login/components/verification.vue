<!--
 * @Name: 请输入手机或邮箱验证码
 * @Date: 2022-06-26 21:27:29
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:57:29
-->
<template>
  <P-main class="login">
    <Navigation :ClickLeft="false" @click-left="onClickLeft" />
    <h3>
      {{ $t("请输入") }}{{ title.VerificationName }}{{ $t("验证码") }}
      <div>{{ $t("验证码已发送至") }}{{ active == 0 ? phone : email }}</div>
    </h3>
    <P-verification v-model="val" />
    <div class="getVerificationCode ui-flex-center">
      <div>
        <div class="ui-col-hong">{{ this.errorInfo }}</div>
      </div>
      <div>
        <div @click="getVerificationCode" v-if="count == 0">
          {{ $t("获取验证码") }}
        </div>
        <B-data-theCountdown v-model="count" v-else
          >{{ count }} {{ $t("秒后重新获取") }}</B-data-theCountdown
        >
      </div>
    </div>
  </P-main>
</template>

<script>
export default {
  props: {
    title: {
      type: [Object, Array],
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
    scene: {
      type: Number,
      default: 0,
    },
    phone_prefix: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      val: "",
      errorInfo: "",
      showKeyboard: true,
      count: 0,
    };
  },
  created() {
    this.getVerificationCode();
  },
  watch: {
    val(v) {
      if (v.length === 6) {
        this.validation();
      } else {
        this.errorInfo;
      }
    },
  },
  methods: {
    async getVerificationCode() {
      this.count = 60;
      const result = await this.$store.dispatch("registered/sendCode", {
        scene: this.scene,
        type: this.title.id,
        email: this.email,
        phone: this.phone,
        phone_prefix: this.phone_prefix,
      });
      const { code } = result;  
      if (code != 200) {
        this.$toast("发送失败，请稍后再试");
        this.count = 60;
        return;
      }
    },
    async validation() {
      let response = await this.$store.dispatch("registered/checkCode", {
        scene: this.scene,
        receiver: this.active == 0 ? this.phone : this.email,
        code: this.val,
      });
      this.$emit("click", response, this.val);
    },
    onClickLeft() {
      this.$emit("click-left");
    },
  },
};
</script>

<style lang="less" scoped>
.getVerificationCode {
  font-size: 14px;
  color: #2cbc94;
  margin-top: 20px;
}
</style>