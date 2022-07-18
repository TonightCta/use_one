<!-- 充值 -->
<template>
  <div class="recharge">
    <Navigation className="other-color-nav" title="充币" />
    <div class="recharge-con">
      <div class="recharge-options">
        <van-cell title="币种" is-link to="/choose-coin">
          <template #right-icon>
            <div class="custom-arrow">
              <p class="iconfont icon-gicon"></p>
              <p>USDT</p>
              <p class="iconfont icon-youjiantou"></p>
            </div>
          </template>
        </van-cell>
        <van-cell
          title="选择充值网络"
          is-link
          :value="network"
          @click="chooseNetwork = true"
        />
      </div>
      <!-- 充值地址 -->
      <div class="recharge-msg">
        <p class="f-12">扫二维码，转入USDT</p>
        <img :src="require('../../../assets/images/test.png')" alt="" />
        <p class="f-12">充值地址</p>
        <p class="f-14">JJJHTFCDRCVGhxbhsyxgu4556cdac</p>
        <P-copy value="JJJHTFCDRCVGhxbhsyxgu">
          <div class="copy-btn">
            <p class="iconfont icon-fuzhi-6" type="icon"></p>
            <p>复制</p>
          </div>
        </P-copy>
      </div>
      <!-- 充值说明 -->
      <div class="recharge-remark">
        <h3>充值说明:</h3>
        <ul>
          <li v-for="(remark, index) in remarkList" :key="index">
            <p>{{ index + 1 }}.&nbsp;{{ remark }}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 充值网络选择 -->
    <van-popup v-model="chooseNetwork" round position="bottom">
      <van-nav-bar>
        <template #title>
          <p class="options-ch" @click="chooseNetwork = false;network = 'USDT-ERC20'">USDT-ERC20</p>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #title>
          <p class="options-ch"  @click="chooseNetwork = false;network = 'USDT-TRC20'">USDT-TRC20</p>
        </template>
      </van-nav-bar>
      <van-nav-bar>
        <template #title>
          <p class="options-cancel" @click="chooseNetwork = false">取消</p>
        </template>
      </van-nav-bar>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remarkList: [
        "请通过客户端或在线钱包将您需要充值的相应币种(USDT-TRC20)数目发送到该地址，充入其他资产将无法找回。",
        "发送完成后，系统会自动在此交易获得相应数量确认后将该笔虚拟币充值到您在本站的账户，相应数量的确认需要3大约0.5到1小时时间，请耐心等待。(确认数为2)",
        "同一个地址可多次充值，不影响到账。最小充值金额0.00001。",
      ],
      chooseNetwork: false,
      network: "USDT-TRC20",
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
};
</script>

<style lang="less" scoped>
/deep/.other-color-nav {
  .van-nav-bar {
    background: #2cbc94;
    .van-nav-bar__content {
      .van-nav-bar__left {
        .van-icon {
          color: white;
        }
      }
      .van-nav-bar__title {
        color: white;
      }
    }
  }
}
.recharge-con {
  width: 100%;
  height: calc(100vh - 46px);
  overflow: auto;
  background: #2cbc94;
  padding: 0 12px;
  .recharge-options {
    border-radius: 4px;
    overflow: hidden;
    .custom-arrow {
      display: flex;
      p {
        color: #969799;
        font-size: 14px;
      }
      p:first-child {
        color: #2cbc94;
      }
      .iconfont {
        font-size: 18px;
      }
      p:last-child {
        font-weight: bold;
        font-size: 17px;
        opacity: 0.95;
      }
    }
  }
  .recharge-msg {
    padding-top: 24px;
    background: white;
    border-radius: 4px;
    margin-top: 12px;
    text-align: center;
    overflow: hidden;
    img {
      width: 182px;
      height: 182px;
      margin: 10px 0 24px 0;
    }
    .f-12 {
      font-size: 12px;
      color: #999;
    }
    .f-14 {
      font-size: 14px;
      color: #666;
    }
    .copy-btn {
      width: 100%;
      height: 44px;
      text-align: center;
      background: #dffff6;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 16px;
        color: #2cbc94;
      }
      p[type="icon"] {
        margin-right: 10px;
      }
    }
  }
  .recharge-remark {
    padding: 8px 12px;
    background: white;
    border-radius: 4px;
    margin-top: 12px;
    margin-bottom: 2rem;
    h3 {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 6px;
    }
    ul {
      li {
        margin-bottom: 6px;
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
.options-ch {
  color: #333;
}
.options-cancel {
  color: #666;
}
/deep/.van-nav-bar__title {
  font-size: 14px;
}
</style>