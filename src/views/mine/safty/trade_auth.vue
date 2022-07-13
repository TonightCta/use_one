<template>
  <div class="trade-auth">
    <Navigation />
    <!-- 前置验证 -->
    <div class="trade-before-auth" v-if="status == 0">
      <h3>邮箱验证码</h3>
      <p class="before-remark">为保护您的账号安全，需要登录密码进行验证</p>
      <P-verification v-model="valBefore" />
      <p v-if="count == 0" @click="count = 60" class="send-code un-send">
        获取验证码
      </p>
      <B-data-theCountdown v-model="count" v-else class="send-code"
        >{{ count }} {{ $t("秒后重新获取") }}</B-data-theCountdown
      >
    </div>
    <div class="set-trade-password" v-else>
      <h3>设置交易密码</h3>
      <p class="before-remark">8-12位大写、小写英文字母及数字组合</p>
      <div class="form-box">
        <el-form
          ref="form"
          :model="form"
          :rules="ruleForm"
          label-position="top"
        >
          <el-form-item prop="password">
            <P-input
              title="交易密码"
              v-model="form.password"
              :show-password="true"
              placeholder="请输入交易密码"
            ></P-input>
          </el-form-item>
          <el-form-item prop="repeat">
            <P-input
              v-model="form.repeat"
              title="确认密码"
              :show-password="true"
              placeholder="请再次输入交易密码"
            ></P-input>
          </el-form-item>
        </el-form>
        <!-- 交易密码说明 -->
        <div class="trade-remark-box">
          <ul>
            <li v-for="(remark, index) in remarkList" :key="`${index}-remark`">
              <p class="remark-point"></p>
              <p>{{ remark }}</p>
            </li>
          </ul>
        </div>
        <P-button type="primary" class="btn-primary" @click="submitSet('form')"
          >立即设置</P-button
        >
      </div>
    </div>
    <Alert
      svg=""
      type="typography"
      title="提示"
      v-model="isBindPhone"
      @cancel="$router.go(-1)"
      @click="$router.push('/auth-phone')"
    >
      <p>设置交易密码前需要手机认证</p>
    </Alert>
  </div>
</template>

<script>
import { Toast } from "vant";
import { checkPassword } from "../../../utils/index";
export default {
  data() {
    const verify_pass = (rule, value, callback) => {
      if (!checkPassword(value)) {
        callback(new Error("密码格式为8-12位大写、小写英文字母及数字组合"));
      } else {
        callback();
      }
    };
    const verify_repeat = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      status: 0,
      is_bind_phone: true, //是否绑定手机号
      isBindPhone: false, //未绑定提示
      valBefore: "", //前置验证码
      count: 0, //验证码倒计时
      form: {
        password: "",
        repeat: "",
      },
      ruleForm: {
        password: [
          {
            required: true,
            message: this.$t("请输入交易密码"),
            trigger: "blur",
          },
          { validator: verify_pass, trigger: "blur" },
        ],
        repeat: [
          {
            required: true,
            message: this.$t("请再次输入交易密码"),
            trigger: "blur",
          },
          { validator: verify_repeat, trigger: "blur" },
        ],
      },
      remarkList: [
        "交易密码是在交易所进行交易时需要输入密码，不同与登录密码。为确保您的财产安全，请牢记交易密码，防止丢失。",
        "8-12位含大小写字母及数字。",
      ],
    };
  },
  watch: {
    valBefore(val) {
      if (val.length == 6) {
        const next = async () => {
          Toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 2000,
          });
          if (!this.is_bind_phone) {
            setTimeout(() => {
              this.isBindPhone = true;
            }, 2000);
            return;
          }
          setTimeout(() => {
            this.status = 1;
          }, 2000);
        };
        next();
      }
    },
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    Alert: (resolve) => require(["../../../components/Alert"], resolve),
  },
  methods: {
    submitSet(formName) {
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
h3 {
  font-size: 22px;
  color: #333;
  font-weight: 500;
}
.before-remark {
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  margin-bottom: 40px;
}
.trade-before-auth {
  padding: 30px 12px;

  .send-code {
    text-align: right;
    margin-top: 14px;
    font-size: 14px;
  }
  .un-send {
    color: #2cbc94;
  }
}
.set-trade-password {
  padding: 30px 12px;
  /deep/.el-form-item {
    margin-bottom: 4px;
  }
  .trade-remark-box {
    padding: 12px;
    background: #eee;
    border-radius: 4px;
    margin-top: 22px;
    ul {
      li {
        display: flex;
        align-items: center;
        .remark-point {
          min-width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #999;
          margin-right: 8px;
        }
        p:last-child {
          font-size: 12px;
          color: #999;
        }
      }
      li:last-child {
        margin-top: 12px;
      }
    }
  }
  .btn-primary {
    margin-top: 22px;
  }
}
</style>