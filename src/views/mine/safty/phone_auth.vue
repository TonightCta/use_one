<template>
  <div class="phone-auth">
    <Navigation v-if="!areaPop" />
    <div class="auth-content auth-before" v-if="beforeAuth == 1">
      <h3>密码验证</h3>
      <p class="auth-remark">为保护您的账号安全，需要登录密码进行验证</p>
      <el-form
        ref="check"
        :rules="authFormRule"
        :model="authForm"
        label-position="top"
      >
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
        @click="checkPass('check')"
        >下一步</P-button
      >
    </div>
    <div class="auth-content" v-if="!areaPop && beforeAuth == 2">
      <h3>手机{{ current.account.phone ? "更换" : "认证" }}</h3>
      <el-form :model="form" ref="form" :rules="ruleForm" label-position="top">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <P-input
            v-model="form.phone"
            :iconBorder="true"
            title="手机号"
            placeholder="请输入手机号"
          >
            <div class="" slot="icon">
              <div class="user-left ui-flex-row" @click="areaPop = true">
                <div v-if="form.phone_prefix">
                  <img :src="NationalNumber.logo" class="theNationalFlag" />
                </div>
                <div v-if="form.phone_prefix" class="name">
                  {{ form.phone_prefix }}
                </div>
                <div v-if="!form.phone_prefix" class="ui-col-fei m-5-r">
                  {{ $t("请选择") }}
                </div>
                <B-svg name="jianTouXia" class-name="jianTouXia" />
              </div>
            </div>
          </P-input>
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password" v-if="false">
          <P-input
            title="登录密码"
            placeholder="请输入登录密码"
            :show-password="true"
          ></P-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <P-input
            title="验证码"
            v-model="form.code"
            placeholder="请输入验证码"
          >
          </P-input>
          <p class="send-code-text" v-if="count == 0" @click="sendPhoneCode">
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
    <SelectArea
      v-model="areaPop"
      @close-area="closeArea"
      @click="getChoosePrefix"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CheckPass, BindPhone, SendCode } from "../../../api/api";
export default {
  data() {
    const verify_phone = (rule, value, callback) => {
      if (!this.form.phone_prefix) {
        callback(new Error("请选择国家区号"));
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
      beforeAuth: 1,
      count: 0,
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
      // 设置手机号
      form: {
        phone_prefix: "",
        phone: "",
        // password: "",
        code: "",
      },
      ruleForm: {
        phone_prefix: [
          {
            required: true,
            message: this.$t("请选择国家区号"),
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: this.$t("请输入手机号"), trigger: "blur" },
          { validator: verify_phone, trigger: "blur" },
        ],
        // password: [
        //   {
        //     required: true,
        //     message: this.$t("请输入登录密码"),
        //     trigger: "blur",
        //   },
        //   {
        //     min: 8,
        //     max: 12,
        //     message: this.$t("长度在8到12个字符"),
        //     trigger: "blur",
        //   },
        // ],
        code: [
          { required: true, message: this.$t("请输入验证码"), trigger: "blur" },
          { validator: verify_code, trigger: "blur" },
        ],
      },
      NationalNumber: {
        code: "",
        logo: "",
      },
      areaPop: false,
    };
  },
  computed: {
    ...mapState(["current"]),
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    SelectArea: (resolve) =>
      require(["../../login/components/selectArea"], resolve),
  },
  methods: {
    checkPass(formName) {
      this.$refs[formName].validate(async (res) => {
        if (res) {
          const result = await CheckPass({ password: this.authForm.password });
          const { code } = result;
          if (code != 200) {
            this.$toast(result.message);
            return;
          }
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
          });
          this.beforeAuth = 2;
        }
      });
    },
    closeArea() {
      this.areaPop = false;
    },
    getChoosePrefix(arg) {
      this.form = {
        ...this.form,
        phone_prefix: arg.prefix,
      };
      this.NationalNumber = {
        ...this.NationalNumber,
        logo: arg.logo,
        prefix: arg.prefix,
      };
    },
    //发送验证码
    async sendPhoneCode() {
      if (!this.form.phone_prefix) {
        this.$toast("请选择国家区号");
        return;
      }
      if (!this.form.phone) {
        this.$toast("请输入手机号");
        return;
      }
      const params = {
        scene: 3,
        type: 1,
        phone: this.form.phone,
        phone_prefix: this.form.phone_prefix,
      };
      const result = await SendCode(params);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$toast("验证码发送成功");
      this.count = 60;
    },
    submitEmail(formName) {
      this.$refs[formName].validate(async (res) => {
        if (res) {
          console.log("验证通过");
          const params = {
            phone: this.form.phone,
            phone_prefix: this.form.phone_prefix,
            password: this.authForm.password,
            code: this.form.code,
          };
          const result = await BindPhone(params);
          const { code } = result;
          if (code != 200) {
            this.$toast(result.message);
            return;
          }
          this.$toast("手机认证成功");
          this.$store.dispatch("current/upUserInfo");
          this.$router.go(-1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>