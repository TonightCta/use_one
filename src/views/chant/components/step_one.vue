<!-- 基本信息 -->
<template>
  <div class="step-one step-public">
    <p class="step-title">基本信息</p>
    <div class="step-content">
      <div class="content-msg">
        <el-form
          ref="step-form"
          :model="form"
          :rules="ruleForm"
          label-position="top"
        >
          <el-form-item prop="name">
            <P-input
              title="姓名"
              v-model="form.name"
              placeholder="请输入真实姓名"
            ></P-input>
          </el-form-item>
          <el-form-item prop="phone">
            <P-input
              title="手机号"
              v-model="form.phone"
              placeholder="请输入本人电话"
            ></P-input>
          </el-form-item>
          <el-form-item prop="email">
            <P-input
              title="邮箱"
              v-model="form.email"
              placeholder="请输入本人邮箱"
            ></P-input>
          </el-form-item>
          <el-form-item prop="contact">
            <P-input
              title="紧急联系人"
              v-model="form.contact"
              placeholder="请输入紧急联系人姓名"
            ></P-input>
          </el-form-item>
          <el-form-item prop="contact_phone">
            <P-input
              title="紧急联系人电话"
              v-model="form.contact_phone"
              placeholder="请输入紧急联系人电话"
            ></P-input>
          </el-form-item>
          <el-form-item prop="与本人的关系">
            <div class="select-mine">
              <p class="other-title">与本人的关系</p>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <p class="select-error" v-if="value">请选择与本人关系</p>
            </div>
          </el-form-item>
          <el-form-item prop="address">
            <P-input
              title="紧急联系人电话"
              v-model="form.address"
              placeholder="请输入本人现常住地址"
            ></P-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-btn">
        <div class="btn-label"></div>
        <div class="btn-box">
          <P-button
            type="primary"
            class="btn-primary"
            @click="submitStepOne('step-form')"
            >下一步</P-button
          >
        </div>
      </div>
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
    return {
      options: [
        {
          value: "父母",
          label: "父母",
        },
        {
          value: "配偶",
          label: "配偶",
        },
        {
          value: "朋友",
          label: "朋友",
        },
        {
          value: "同事",
          label: "同事",
        },
      ],
      value: "",
      form: {
        name: "", //真实姓名
        phone: "", //手机号
        email: "", //邮箱
        contact: "", //紧急联系人
        contact_phone: "", //紧急联系人电话
        relation: "", //与本人的关系
        address: "", //常用地址
      },
      ruleForm: {
        name: [
          {
            required: true,
            message: this.$t("请输入真实姓名"),
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: this.$t("请输入手机号"), trigger: "blur" },
        ],
        email: [
          {
            required: true,
            message: this.$t("请输入邮箱地址"),
            trigger: "blur",
          },
          { validator: verify_email, trigger: "blur" },
        ],
        contact: [
          {
            required: true,
            message: this.$t("请输入紧急联系人"),
            trigger: "blur",
          },
        ],
        contact_phone: [
          {
            required: true,
            message: this.$t("请输入紧急联系人电话"),
            trigger: "blur",
          },
        ],
        relation: [
          {
            required: true,
            message: this.$t("请选择与本人的关系"),
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: this.$t("请输入常用地址"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitStepOne(formName) {
      this.$emit("upStep", 1);
      return;
      this.$refs[formName].validate((res) => {
        if (res) {
          console.log("验证通过");
          this.$emit("upStep", 1);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./step.less");
.content-msg {
  padding-bottom: 30px !important;
  .other-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
  }
  .select-mine {
    position: relative;
    .select-error {
      position: absolute;
      bottom: -27px;
      font-size: 12px;
      color: #f56c6c;
    }
  }
  /deep/.el-select {
    width: 100%;
    .el-input__inner {
      height: 44px;
      border-color: #eee;
      padding-left: 10px;
      background: #fdfdfd;
    }
  }
}
</style>