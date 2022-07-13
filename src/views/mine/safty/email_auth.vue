<!-- 邮箱认证 -->
<template>
  <div class="email-auth">
    <Navigation />
    <div class="auth-content auth-before" v-if="beforeAuth == 1">
      <h3>密码验证</h3>
      <p class="auth-remark">为保护您的账号安全，需要登录密码进行验证</p>
      <el-form :rules="authFormRule" :model="authForm" label-position="top">
        <el-form-item prop="password">
          <P-input
            title="登录密码"
            v-model="authForm.password"
            placeholder="请输入登录密码"
            :show-password="true"
          ></P-input>
        </el-form-item>
      </el-form>
      <P-button
        style="margin-top: 40px"
        type="primary"
        class="btn-primary"
        @click="beforeAuth = 2"
        >下一步</P-button
      >
    </div>
    <div class="auth-content" v-else>
      <h3>邮箱认证</h3>
      <el-form :model="form" ref="form" :rules="ruleForm" label-position="top">
        <el-form-item prop="email">
          <P-input
            title="邮箱地址"
            v-model="form.email"
            placeholder="请输入邮箱地址"
          ></P-input>
        </el-form-item>
        <el-form-item prop="code">
          <P-input
            title="验证码"
            v-model="form.code"
            placeholder="请输入验证码"
          >
          </P-input>
          <p class="send-code-text" v-if="count == 0" @click="count = 60">
            {{ $t("获取验证码") }}
          </p>
          <B-data-theCountdown v-model="count" v-else
            >{{ count }} {{ $t("秒后重新获取") }}</B-data-theCountdown
          >
        </el-form-item>
      </el-form>
      <P-button
        type="primary"
        class="btn-primary h-44-i m-60-t-i"
        @click="submitEmail('form')"
        >提交</P-button
      >
    </div>
  </div>
</template>

<script>
import { checkEmail } from "../../../utils/index";
export default {
  data() {
    const verify_email = (rule, value, callback) => {
      if (!checkEmail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback();
      }
    };
    const verify_code = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("请输入6位验证码"));
      } else {
        callback();
      }
    };
    return {
      beforeAuth: 1, // 1 - 未验证 2 - 已验证
      authForm: {
        password: "",
      },
      authFormRule: {
        password: [
          {
            required: true,
            message: this.$t("请输入登录密码"),
            trigger: "blur",
          },
        ],
      },
      form: {
        email: "",
        code: "",
      },
      ruleForm: {
        email: [
          {
            required: true,
            message: this.$t("请输入邮箱地址"),
            trigger: "blur",
          },
          { validator: verify_email, trigger: "blur" },
        ],
        code: [
          { required: true, message: this.$t("请输入验证码"), trigger: "blur" },
          { validator: verify_code, trigger: "blur" },
        ],
      },
      count: 0,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  methods: {
    submitEmail(formName) {
      this.$refs[formName].validate((res) => {
        if (res) {
          console.log("验证通过");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.auth-before {
  h3 {
    margin-bottom: 0;
  }
}
.auth-remark {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  margin-bottom: 38px;
}
</style>