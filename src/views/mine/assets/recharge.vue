<!-- 充值 -->
<template>
  <div class="recharge">
    <Navigation className="other-color-nav" title="充币" />
    <div class="recharge-con">
      <div class="recharge-options">
        <van-cell title="币种" is-link to="/choose-coin">
          <template #right-icon>
            <div class="custom-arrow">
              <img :src="coinMsg.logo" alt="" />
              <p>{{ coinMsg.coin }}</p>
              <p class="iconfont icon-youjiantou"></p>
            </div>
          </template>
        </van-cell>
        <van-cell
          title="选择充值网络"
          is-link
          :value="coinMsg.coin + ' - ' + network"
          @click="chooseNetwork = true"
        />
      </div>
      <!-- 充值地址 -->
      <div class="recharge-msg">
        <p class="f-12">扫二维码，转入USDT</p>
        <!-- <img :src="require('../../../assets/images/test.png')" alt="" /> -->
        <div class="address-box" ref="address-box"></div>
        <p class="f-12">充值地址</p>
        <p class="f-14">{{ contractAddress }}</p>
        <P-copy :value="contractAddress">
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
      <van-nav-bar v-for="(pro, index) in coinMsg.protocol" :key="index">
        <template #title>
          <p
            class="options-ch"
            @click="
              chooseNetwork = false;
              network = pro;
            "
          >
            {{ coinMsg.coin }}-{{ pro }}
          </p>
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
import { mapState } from "vuex";
import { CoinAddress } from "../../../api/api";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      chooseNetwork: false,
      network: "TRC20",
      contractAddress: null,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  watch:{
    contractAddress(val){
      val && this.createQRCode();
    }
  },
  computed: {
    ...mapState(["current"]),
    coinMsg() {
      return {
        coin: this.current.coin.coin,
        logo: this.current.coin.logo,
        protocol: this.current.coin.protocol,
      };
    },
    remarkList(){
      return [
        `请通过客户端或在线钱包将您需要充值的相应币种(${this.coinMsg.coin}-${this.network})数目发送到该地址，充入其他资产将无法找回。`,
        "发送完成后，系统会自动在此交易获得相应数量确认后将该笔虚拟币充值到您在本站的账户，相应数量的确认需要3大约0.5到1小时时间，请耐心等待。(确认数为2)",
        "同一个地址可多次充值，不影响到账。最小充值金额0.00001。",
      ]
    }
  },
  created() {
    this.network = this.coinMsg.protocol[0];
    this.getAddress();
  },
  methods: {
    //获取充币地址
    async getAddress() {
      const params = {
        coin: this.coinMsg.coin,
        protocol: this.coinMsg.protocol[0],
      };
      const result = await CoinAddress(params);
      console.log(result);
      this.contractAddress = result.data.address;
    },
    //生成二维码
    createQRCode() {
      new QRCode(this.$refs["address-box"], {
        text: this.contractAddress,
        width: 180,
        height: 180,
        colorDark: "#333",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.L,
      });
    },
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
      align-items: center;
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
      img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
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
    .address-box {
      width: 182px;
      height: 182px;
      margin: 10px auto 24px auto;
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