<!-- 商家申请 -->
<template>
  <div class="application-chant">
    <Navigation />
    <div class="application-con">
      <h3>广告权限申请</h3>
      <h4>成为商家，获得广告发布权限，享受更多交易特权。</h4>
      <div class="rights-box">
        <div class="title-box">
          <p class="title-line"></p>
          <p>商家认证条件</p>
          <p class="title-line"></p>
        </div>
        <ul>
          <li v-for="(right, index) in rightsList" :key="index">
            <img :src="right.icon" alt="" />
            <p>{{ right.text }}</p>
          </li>
        </ul>
      </div>
      <p class="agree">
        <van-checkbox  icon-size="14px" v-model="checked">我已阅读并同意<span>《商家协议》</span></van-checkbox>
      </p>
      <P-button type="primary" class="btn-primary" @click="confirm">开始申请</P-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      rightsList: [
        {
          icon: require("../../assets/images/auth_icon.png"),
          text: "完成实名认证",
        },
        {
          icon: require("../../assets/images/trade_icon.png"),
          text: "平台交易量达1000USDT以上",
        },
        {
          icon: require("../../assets/images/bank_icon.png"),
          text: "法币账户1000USDT作为商家保证金",
        },
      ],
      checked:false
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../components/nav/Navigation"], resolve),
  },
  methods:{
    // 开始申请
    confirm(){
        this.checked ? this.$router.push('/application-step') : Toast('请阅读并同意商家协议') 
    }
  }
};
</script>

<style lang="less" scoped>
.application-con {
  padding: 34px 12px;
  height: calc(100vh - 46px);
  background: #f2f2f2;
  text-align: center;
  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
  }
  h4 {
    font-size: 14px;
    color: #666;
    margin-bottom: 22px;
  }
  .rights-box {
    width: 100%;
    height: 194px;
    background: url("../../assets/images/rights_bg.png");
    background-size: 100% 100%;
    padding: 16px 12px;
    .title-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 22px;
      .title-line {
        height: 1px;
        width: 8px;
        background: #333;
        opacity: 0.6;
        border-radius: 2px;
      }
      p:nth-child(2) {
        margin: 0 22px;
        font-size: 18px;
        color: #333;
        font-weight: 500;
      }
    }
    ul {
      li {
        text-align: left;
        margin-bottom: 20px;
        display: flex;
        img{
            width: 22px;
            height: 22px;
            margin-right: 10px;
        }
        p {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
  .agree{
    margin-top: 48px;
    span{
        color: #4F6DFD;
        font-weight: 500;
    }
    /deep/.van-icon{
        line-height: 1;
    }
    /deep/.van-checkbox__label{
        margin-left: 4px;
        font-size: 14px;
    }
  }
  .btn-primary{
    margin-top: 12px;
    background: #6580FF;
  }
}
</style>