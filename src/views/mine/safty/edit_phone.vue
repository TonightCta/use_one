<template>
  <div class="phone-auth">
    <Navigation v-if="!areaPop" />
    <div class="auth-content" v-if="!areaPop">
      <h3>更换手机号码</h3>
      <el-form :model="form" ref="form" :rules="ruleForm" label-position="top">
        <!-- 原手机号验证码 -->
        <el-form-item prop="code">
          <P-input title="原手机号验证码" placeholder="请输入验证码"> </P-input>
          <p class="send-code-text" v-if="count == 0" @click="count = 60">
            {{ $t("获取验证码") }}
          </p>
          <B-data-theCountdown v-model="count" v-else
            >{{ count }} {{ $t("秒后重新获取") }}</B-data-theCountdown
          >
        </el-form-item>
        <!-- 登录密码 -->
        <el-form-item prop="password">
          <P-input
            title="登录密码"
            placeholder="请输入登录密码"
            :show-password="true"
          ></P-input>
        </el-form-item>
        <!-- 新手机号 -->
        <el-form-item prop="phone">
          <P-input
            v-model="form.phone"
            :iconBorder="true"
            title="新手机号"
            placeholder="请输入新手机号"
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
        <!-- 新手机号验证码 -->
        <el-form-item prop="code">
          <P-input title="新手机号验证码" placeholder="请输入验证码"> </P-input>
          <p class="send-code-text" v-if="count == 0" @click="count = 60">
            {{ $t("获取验证码") }}
          </p>
          <B-data-theCountdown v-model="count" v-else
            >{{ count }} {{ $t("秒后重新获取") }}</B-data-theCountdown
          >
        </el-form-item>
      </el-form>
      <div class="edit-phone-remark">
        <p class="iconfont icon-attention" type="icon"></p>
        为了您的账户资金安全，更换手机号码之后的24小时内不可提币。
      </div>
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
      count: 0,
      // 设置手机号
      form: {
        nowPhone_code: "",
        phone_prefix: "",
        phone: "",
        password: "",
        code: "",
      },
      ruleForm: {
        nowPhone_code: [
          { required: true, message: this.$t("请输入验证码"), trigger: "blur" },
        ],
        phone: [
          { required: true, message: this.$t("请输入手机号"), trigger: "blur" },
          { validator: verify_phone, trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: this.$t("请输入登录密码"),
            trigger: "blur",
          },
          {
            min: 8,
            max: 12,
            message: this.$t("长度在8到12个字符"),
            trigger: "blur",
          },
        ],
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
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    SelectArea: (resolve) =>
      require(["../../login/components/selectArea"], resolve),
  },
  methods: {
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
.edit-phone-remark {
  padding: 12px;
  background: #eeeeee;
  border-radius: 4px;
  margin-top: 8px;
  display: flex;
  p[type="icon"]{
    margin-right: 2px;
    font-size: 14px;
    transform: translateY(1px);
  }
  p {
    font-size: 12px;
    color: #999999;
  }
}
</style>