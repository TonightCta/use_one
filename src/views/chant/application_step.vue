<!-- 商家申请 -->
<template>
  <div class="application-step">
    <Navigation title="商家认证" />
    <div class="step-content">
      <div class="fixed-box">
        <!-- 悬浮信息 -->
        <div class="need-read">
          <p class="iconfont icon-attention" type="icon"></p>
          <p>
            请按照示例要求上传真实的认证资料，否则您将无法通过广告权限申请。以下信息仅作为申请入驻平台的使用，平台会保护您的认证资料
          </p>
        </div>
        <!-- 步骤条 -->
        <div class="step-line">
          <ul>
            <li class="" v-for="(point, index) in stepLine" :key="index">
              <div v-if="!point.line">
                <div class="arrive-point" v-if="point.arrive">
                  {{ point.step }}
                </div>
                <div v-else class="default-point"></div>
              </div>
              <div
                v-else
                class="ds-line"
                :class="[point.arrive && 'with-color-line']"
              ></div>
            </li>
          </ul>
          <ul class="text-for">
            <li
              v-for="(msg, index) in stepLine"
              :key="index"
              :class="msg.line && 'hidden-line'"
            >
              <div v-if="!msg.line">
                <p>{{ msg.title }}</p>
                <p>{{ msg.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <StepOne v-if="active == 1" @upStep="upStep" />
      <StepThree v-if="active == 2" @upStep="upStep" />
      <StepTwo v-if="active == 3" @upStep="upStep" />
      <Waiting v-if="active == 4"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stepLine: [
        {
          title: "提交申请",
          text: "完成实名认证",
          arrive: true,
          line: false,
          step: 1,
        },
        {
          arrive: false,
          line: true,
        },
        {
          title: "等待审核",
          text: "平台交易量达1000USDT以上",
          arrive: false,
          line: false,
          step: 2,
        },
        {
          arrive: false,
          line: true,
        },
        {
          title: "审核通过",
          text: "成为加V用户",
          arrive: false,
          line: false,
          step: 3,
        },
      ],
      active: 4,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../components/nav/Navigation"], resolve),
    StepOne: (resolve) => require(["./components/step_one"], resolve),
    StepTwo: (resolve) => require(["./components/step_two"], resolve),
    StepThree: (resolve) => require(["./components/step_three"], resolve),
    Waiting:(resolve) => require(['./components/waiting'],resolve)
  },
  methods: {
    upStep(_step) {
      console.log(_step);
      switch (_step) {
        case 0:
          this.$set(this.stepLine[1], "arrive", false);
          this.$set(this.stepLine[2], "arrive", false);
          this.active = 1;
          break;
        case 1:
          // this.$set(this.stepLine[1],'arrive',true);
          // this.$set(this.stepLine[2],'arrive',true);
          this.active = 2;
          break;
        case 2:
          // this.$set(this.stepLine[3],'arrive',true);
          // this.$set(this.stepLine[4],'arrive',true);
          this.active = 3;
          break;
        case 3:
          this.active = 4;
          this.$set(this.stepLine[1], "arrive", true);
          this.$set(this.stepLine[2], "arrive", true);
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.step-content {
  .fixed-box {
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 200;
    background: white;
  }
  .need-read {
    padding: 6px 12px;
    width: 100%;
    background: rgba(215, 255, 244, 0.65);
    display: flex;
    p[type="icon"] {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: #2cbc94;
    }
  }
  .step-line {
    margin-top: 16px;
    background: white;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      .hidden-line {
        display: none;
      }
      li {
        .arrive-point {
          width: 16px;
          height: 16px;
          background: #2cbc94;
          border-radius: 50%;
          font-size: 12px;
          color: white;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .default-point {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e6e6e6;
        }
        .ds-line {
          border-top: 2px dashed #eeeeee;
          width: 30vw;
        }
        .with-color-line {
          border-color: rgba(44, 188, 148, 0.4);
        }
      }
    }
    .text-for {
      justify-content: center;
      margin-top: 5px;
      li {
        text-align: center;
        width: 35%;
        div {
          p {
            font-size: 12px;
          }
          p:first-child {
            color: #333;
            font-weight: 500;
            display: inline;
          }
          p:last-child {
            font-size: 10px;
            color: #999;
            white-space: nowrap;
            transform: scale(0.8);
          }
        }
      }
    }
  }
}
</style>