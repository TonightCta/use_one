<!--
 * @Name: 忘记密码
 * @Date: 2022-06-29 11:08:30
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:57:12
-->

<template>
  <div>
    <P-main class="login registered" v-show="!bool.SelectArea">
      <Navigation />
      <h3>{{ $t(title) }}</h3>

      <P-tabs v-model="active" :list="list" :lineWidth="36" />

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="p-30-t">
        <el-form-item ref="phone" prop="phone" v-if="active == 0">
          <P-input
            v-model="ruleForm.phone"
            :iconBorder="true"
            :placeholder="$t('请输入手机号码')"
          >
            <div slot="icon">
              <div
                class="user-left ui-flex-row"
                @click="bool.SelectArea = true"
              >
                <div v-if="ruleForm.phone_prefix">
                  <img :src="NationalNumber.logo" class="theNationalFlag" />
                </div>
                <div v-if="ruleForm.phone_prefix" class="name">
                  {{ ruleForm.phone_prefix }}
                </div>
                <div v-if="!ruleForm.phone_prefix" class="ui-col-fei m-5-r">
                  {{ $t("请选择") }}
                </div>
                <B-svg name="jianTouXia" class-name="jianTouXia" />
              </div>
            </div>
          </P-input>
        </el-form-item>

        <el-form-item prop="email" v-if="active == 1">
          <P-input
            v-model="ruleForm.email"
            icon="icon-youxiang"
            :placeholder="$t('请输入邮箱')"
          />
        </el-form-item>

        <el-form-item prop="code">
          <P-input
            title="图片验证码"
            v-model="ruleForm.code"
            placeholder="请输入图形验证码"
          >
          </P-input>
          <div class="img-code">
            <img :src="imgCode" alt="">
          </div>
          <p class="re-send-code" @click="getImgCode">看不清？换一张</p>
        </el-form-item>
      </el-form>
      <P-button
        type="primary"
        class="btn-primary h-44-i m-60-t-i"
        @click="submitForm('ruleForm')"
        >{{ $t("下一步") }}
      </P-button>
    </P-main>
    <SelectArea v-model="bool.SelectArea" @click="onSelectArea" @close-area="closeArea"/>
  </div>
</template>

<script>
import { stringify } from "querystring";
import SelectArea from "./selectArea";
import { ImgCode } from "../../../api/api";

export default {
  components: { SelectArea },
  props: {
    title: {
      type: String,
      default: "",
    },
    tabsActive: {
      type: Number,
      default: 0,
    },
    list: {
      type: [Object, Array],
      default: () => [],
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
    const validationPhone = (rule, value, callback) => {
      if (this.ruleForm.phone_prefix == "") {
        callback(new Error(this.$t("请选择国家区号")));
      } else {
        callback();
      }
    };

    return {
      bool: {
        SelectArea: false,
      },
      active: 0,
      NationalNumber: {
        logo: "",
      },
      imgCode:require('../../../assets/images/test.png'),//图片验证码
      codeKey:null,//验证码key
      ruleForm: {
        phone_prefix: "",
        phone: "",
        email: "",
        code: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: this.$t("请输入手机号码"),
            trigger: "blur",
          },
          { validator: validationPhone, trigger: "blur" },
        ],
        email: [
          { required: true, message: this.$t("请输入邮箱"), trigger: "blur" },
          { validator: new RegExp().email, trigger: "blur" },
        ],
        code: [
          {
            required: true,
            message: this.$t("请输入图形验证码"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    active(v) {
      this.$emit("update:tabsActive", v);
    },
    tabsActive: {
      immediate: true,
      handler: function (v) {
        this.active = v;
      },
    },
    phone_prefix: {
      immediate: true,
      handler: function (v) {
        this.ruleForm.phone_prefix = v;
      },
    },
    phone: {
      immediate: true,
      handler: function (v) {
        this.ruleForm.phone = v;
      },
    },
    email: {
      immediate: true,
      handler: function (v) {
        this.ruleForm.email = v;
      },
    },
  },
  created(){
    this.getImgCode();
  },    
  methods: {
    closeArea(){
        console.log(1212313)
        this.bool.SelectArea = false;
    },  
    onSelectArea(row) {
      this.NationalNumber = row;
      this.ruleForm.phone_prefix = row.prefix;
      this.$refs.phone.clearValidate();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.checkAvailable();
        }
      });
    },
    //获取图形验证码
    async getImgCode(){
        const result = await ImgCode();
        this.imgCode = result.data.img;
        this.codeKey = result.data.key;
    },  
    async checkAvailable() {
      // console.log(typeof parseInt(this.list[this.active].id))
      // console.log(typeof this.ruleForm.email)
      // console.log(typeof this.ruleForm.phone)
      // console.log(typeof this.ruleForm.phone_prefix)
      // return
      let response = await this.$store.dispatch("registered/checkAvailable", {
        type: parseInt(this.list[this.active].id),
        email: this.ruleForm.email ? this.ruleForm.email : "",
        phone: this.ruleForm.phone,
        phone_prefix: String(this.ruleForm.phone_prefix),
        captcha_key:this.codeKey,
        captcha_val:this.ruleForm.code
      });
      this.$emit("click", response, this.ruleForm);
    },
  },
};
</script>

<style lang="less" scoped>
.registered {
  .theNationalFlag {
    height: 15px;
    width: 15px;
  }
  .user-left {
    .jianTouXia {
      width: 13px;
      height: 13px;
      fill: #2cbc94;
    }
    .name {
      color: #2cbc94;
      margin: 0px 3px;
    }
  }
  /deep/.van-tabs {
    .van-tab {
      margin-right: 20px;
      .van-tab__text--ellipsis {
        font-size: 16px;
        color: #666666;
      }
      &.van-tab--active {
        .van-tab__text--ellipsis {
          color: #333333;
          font-size: 18px;
        }
      }
    }
  }
  /deep/.el-form-item{
    position: relative;
    .img-code{
        width: 92px;
        height: 40px;
        position: absolute;
        right: 4px;
        top: 58px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .re-send-code{
        font-size: 12px;
        text-align: right;
        color: #6580FF;
    }
  }
}
</style>
