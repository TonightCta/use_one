<!-- Google验证器 -->
<template>
  <div class="google-auth">
    <Navigation :title="gooleType == 1 ? '设置谷歌认证' : '解除谷歌绑定'" />
    <div class="google-content" v-if="gooleType == 1">
      <div>
        <p class="step-remark">
          第一步：根据您的手机系统类型，下载并安装谷歌身份验证器
        </p>
        <div class="step-one">
          <div class="step-con" v-for="(down, index) in downWay" :key="index">
            <p>{{ down.type }}</p>
            <div
              class="load-way"
              v-for="(load, index) in down.way"
              :key="`${index}-load`"
            ></div>
          </div>
        </div>
        <p class="step-remark" style="margin-top: 20px">
          第二步：使用谷歌身份认证器APP扫描一下二维码，或添加密文进行手工验证
        </p>
        <div class="qr-box">
          <img :src="require('../../../assets/images/test.png')" alt="" />
        </div>
        <div class="qr-text">
          <p class="text-box">密文：JJJHTFCDRCVGhxbhsyxgu</p>
          <P-copy value="JJJHTFCDRCVGhxbhsyxgu">
            <P-button type="primary">复制</P-button>
          </P-copy>
          <P-button type="primary">刷新</P-button>
        </div>
        <p class="step-remark" style="margin-top: 28px">
          第三步：填写手机显示的动态密码以激活谷歌两步验证：
        </p>
        <p class="step-pass">
          <input type="text" placeholder="请输入动态密码" />
        </p>
      </div>
      <div>
        <P-button type="primary" class="btn-primary h-44-i m-60-t-i"
          >启用</P-button
        >
      </div>
    </div>
    <!-- 解除验证器 -->
    <div class="remove-auth" v-else>
      <el-form :model="form" ref="removeAuth" :rules="ruleForm" label-position="top">
        <el-form-item prop="password">
          <P-input
            title="登录密码"
            v-model="form.password"
            :show-password="true"
            placeholder="请输入登录密码"
          ></P-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <P-input
            title="谷歌验证码"
            v-model="form.authCode"
            placeholder="请输入谷歌验证码"
          ></P-input>
        </el-form-item>
      </el-form>
      <P-button
        type="primary"
        class="btn-primary"
        @click="submitRemove('removeAuth')"
        >确认</P-button
      >
    </div>
    <Alert title="提示" @click="$router.go(-1)" v-model="removeStatus" :cancelSwitch="false">
      <p style="text-align:center;">谷歌认证解除成功</p>
    </Alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gooleType: 1, //1 - 设置 2 - 解除
      removeStatus:false,
      downWay: [
        {
          type: "Android：",
          way: [
            {
              type: "local",
              url: "",
            },
            {
              type: "play",
              url: "",
            },
          ],
        },
        {
          type: "iOS：",
          way: [
            {
              type: "store",
              url: "",
            },
          ],
        },
      ],
      form: {
        password: "",
        authCode: "",
      },
      ruleForm: {
        password: [
          {
            required: true,
            message: this.$t("请输入登录密码"),
            trigger: "blur",
          },
        ],
        authCode: [
          {
            required: true,
            message: this.$t("请输入谷歌验证码"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    Alert:resolve => require(['../../../components/Alert'],resolve)
  },
  methods: {
    submitRemove(formName) {
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
.google-content {
  width: 100%;
  border-top: 1px solid #e6e6e6;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 46px);
  .step-remark {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    margin-bottom: 14px;
  }
  .step-one {
    display: flex;
    .step-con {
      width: 100%;
      p {
        margin-bottom: 4px;
        font-size: 14px;
        color: #666;
      }
      .load-way {
        width: 126px;
        height: 38px;
        border-radius: 7px;
        background: black;
        margin-bottom: 10px;
      }
    }
  }
  .qr-box {
    width: 135px;
    height: 135px;
    padding: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .qr-text {
    display: flex;
    margin-top: 10px;
    .text-box {
      height: 34px;
      flex: 1;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      padding-left: 8px;
      font-size: 13px;
      color: #666;
      border-radius: 4px;
      margin-right: 12px;
    }
    button {
      height: 34px;
      background: #2cbc94;
      border-radius: 4px;
    }
    button:last-child {
      margin-left: 6px;
    }
  }
  .step-pass {
    input {
      width: 100%;
      height: 34px;
      border-bottom: 1px solid #eee;
    }
  }
}
.remove-auth {
  padding: 12px;
  /deep/.el-form-item {
    margin-bottom: 6px;
  }
  .btn-primary {
    margin-top: 40px;
  }
}
</style>