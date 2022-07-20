<!-- 重置密码 -->
<template>
  <div class="reset-password">
    <Navigation />
    <div class="reset-content">
      <h3>登录密码</h3>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="pass_before">
          <P-input
            title="原密码"
            :show-password="true"
            v-model="ruleForm.pass_before"
            placeholder="请输入原密码"
          ></P-input>
        </el-form-item>
        <el-form-item prop="pass_new">
          <P-input
            title="新密码"
            :show-password="true"
            v-model="ruleForm.pass_new"
            placeholder="请输入新密码"
          ></P-input>
        </el-form-item>
        <el-form-item prop="pass_verify">
          <P-input
            title="验证密码"
            :show-password="true"
            v-model="ruleForm.pass_verify"
            placeholder="请再次输入新密码"
          ></P-input>
        </el-form-item>
      </el-form>
      <P-button
        type="primary"
        class="btn-primary h-44-i m-60-t-i"
        @click="submitReset('ruleForm')"
        >提交</P-button
      >
    </div>
  </div>
</template>

<script>
import { ChangePass } from "../../../api/api";
export default {
  data() {
    const verify_fn = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.pass_new) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass_before: "",
        pass_new: "",
        pass_verify: "",
      },
      rules: {
        pass_before: [
          { required: true, message: this.$t("请输入原密码"), trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: this.$t("长度在8到12个字符"),
            trigger: "blur",
          },
          { validator: new RegExp().pass_before, trigger: "blur" },
        ],
        pass_new: [
          { required: true, message: this.$t("请输入新密码"), trigger: "blur" },
          {
            min: 8,
            max: 12,
            message: this.$t("长度在8到12个字符"),
            trigger: "blur",
          },
          { validator: new RegExp().pass_new, trigger: "blur" },
        ],
        pass_verify: [
          {
            required: true,
            message: this.$t("请再次输入新密码"),
            trigger: "blur",
          },
          {
            min: 8,
            max: 12,
            message: this.$t("长度在8到12个字符"),
            trigger: "blur",
          },
          { validator: verify_fn, trigger: "blur" },
        ],
      },
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  methods: {
    submitReset(formName) {
      this.$refs[formName].validate(async (res) => {
        if (res) {
          const params = {
            password_old: this.ruleForm.pass_before,
            password: this.ruleForm.pass_new,
            password_confirmation: this.ruleForm.pass_verify,
          };
          const result = await ChangePass(params);
          const { code } = result;
          if(code == 200){
            this.$toast.success('密码更新成功');
            this.$router.go(-1);
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.reset-content {
  padding: 0 12px;
  h3 {
    font-size: 22px;
    color: #333;
    font-family: 500;
    margin-bottom: 44px;
    margin-top: 10px;
  }
  /deep/.el-form-item {
    margin-bottom: 0;
  }
}
</style>