<!--
 * @Name: 快捷区 我要买和我要卖 键盘
 * @Date: 2022-06-24 09:23:13
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-03 16:26:25
-->
<template>
  <div class="buyingAndSelling">
    <div class="prompt ui-flex-right">
      <div class="ui-flex-row">
        <B-svg name="dengPao"></B-svg>
        1 {{ currency }}≈{{ Number(calPrice).toFixed(2) }}
        {{ current.amount_way }}
      </div>
    </div>
    <div class="countContainer">
      <B-svg name="anShuLiang" class-name="anShuLiang" @click="swap"></B-svg>
      <div class="count">
        <div class="value">
          {{ value }}
        </div>
        <div
          class="unit"
          @click="buyAway != currency ? (bool.CurrencyOption = true) : null"
        >
          {{ buyAway }}
          <B-svg
            name="jianTouXia"
            class-name="jianTouXia"
            v-if="buyAway != currency"
          ></B-svg>
        </div>
      </div>
    </div>
    <div class="theProportion">
      <slot name="theProportion"></slot>
    </div>
    <div class="way ui-flex-row">
      <div class="m-15-r size-12">选择支付方式：</div>
      <div class="ui-flex-row" @click="bool.pay = true">
        <Pay-way />
        <B-svg name="jianTouYou1" class-name="jianTouYou1"></B-svg>
      </div>
    </div>
    <DigitalKeyboard v-model="value"></DigitalKeyboard>
    <van-button
      type="primary"
      class="btn-primary m-20-t-i m-50-b-i"
      :style="{ background: color }"
      @click="turnTrade"
    >
      {{ btnName }}{{ currency }}
    </van-button>

    <P-popup v-model="btn.show" :title="'确认' + btnName" bottom>
      <div class="btn-popup">
        <van-cell-group :border="false">
          <van-cell title="付款方式">
            <template #right-icon>
              <div class="right-icon">
                <B-svg name="qianBao" class="m-5-r"></B-svg>
                银行卡
                <template v-if="btnName == '出售'"
                  >(2354 2144 3214 1215)</template
                >
              </div>
            </template>
          </van-cell>
          <van-cell title="单价">
            <template #right-icon>
              <div class="right-icon">{{calPrice.toFixed(2)}} {{ buyAway }}/{{ currency }}</div>
            </template>
          </van-cell>
          <van-cell :title="buyAway == currency ? '数量' : '金额'">
            <template #right-icon>
              <div class="right-icon">{{ buyAway == currency ? null : current.way_symbol }} {{ value }} {{ buyAway == currency ? currency : null }}</div>
            </template>
          </van-cell>
          <van-cell :title="buyAway == currency ? '总金额' : '总数量'">
            <template #right-icon>
              <div class="theAmountOf" :style="{ color: color }">
                <div class="fh" v-if="buyAway == currency">{{current.way_symbol}}</div>
                <div class="fh" v-else>&asymp;</div>
                <div class="jg">
                    {{
                        buyAway == currency ? (Number(value) * calPrice).toFixed(4) : (Number(value) / calPrice).toFixed(2)
                    }}
                    {{
                        buyAway == currency ? null : currency
                    }}
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <van-button
        type="primary"
        class="btn-primary m-10-t-i"
        :style="{ background: color }"
        @click="submit"
      >
        确认{{ btnName }}
      </van-button>
    </P-popup>

    <PayChoose ref="refpaychoose" v-model="bool.pay"></PayChoose>
    <Currency-Option v-model="bool.CurrencyOption" @click="onCurrency" />
  </div>
</template>

<script>
import DigitalKeyboard from "@/components/digital-keyboard";
import PayChoose from "@/components/pay-way/pay-choosea";
import { mapState } from "vuex";
import { QU } from "../../../api/api";
export default {
  components: {
    DigitalKeyboard,
    PayChoose,
    CurrencyOption: () => import("@/components/currency/fiat"),
  },
  props: {
    //btn-name="购买"
    //btn-name="出售"
    btnName: {
      type: String,
      default: "",
    },
    //币种 单位 如 USDT
    currency: {
      type: String,
      default: "",
    },
    //color="#FD5656"
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      calPrice: 0, //计算价格
      bool: {
        pay: false,
        CurrencyOption: false,
      },
      value: 0,
      INR: "INR",
      unit: {
        INR: "INR",
        USDT: "",
      },
      btn: {
        show: false,
      },
      coinListMsg: [], //币种信息列表
      selectedCoin: null,
      buyAway: null, //默认购买方式 法币金额 / 币种数量
      placeType:1,//购买 / 出售方式 1 --> 按照金额 2 --> 按照数量
    };
  },
  computed: {
    ...mapState(["current"]),
  },
  watch: {
    btnName: {
      immediate: true,
      handler: function (v) {
        this.value = 0;
        // setTimeout(() => {
        //     this.$refs['refpaychoose'].radio = ''
        // }, 1000)
      },
    },
    currency: {
      immediate: true,
      handler: function (v) {
        this.getCoinMsg(v);
      },
    },
  },
  created() {
    // this.getCoinMsg();
    this.buyAway = this.current.amount_way;
  },
  mounted() {},
  methods: {
    //选择法币
    onCurrency(_item) {
      this.$store.commit("current/upAmountWay", _item.coin);
      this.$store.commit("current/upWayRate", _item.price);
      this.$store.commit("current/upSymbol", _item.symbol);
      this.buyAway = _item.coin;
      this.swap(_item.coin);
      this.getCoinMsg(this.currency);
    },
    //获取行情计价
    async getCoinMsg(_coin) {
      const result = await QU();
      this.coinListMsg = result.data.list;
      if (_coin == "USDT") {
        this.calPrice = this.current.way_rate;
      } else {
        this.calPrice = this.coinListMsg[_coin].price * this.current.way_rate;
      }
    },
    swap(_icon) {
      if (typeof _icon != "string") {
        console.log(1);
        this.buyAway =
          this.buyAway == this.currency
            ? this.current.amount_way
            : this.currency;
        this.placeType = 
            this.buyAway == this.currency
            ? 2
            : 1
      }
      this.$emit("swap");
    },
    //购买 / 出售
    turnTrade() {
      if (Number(this.value) == 0) {
        this.$toast("请输入金额或数量");
        return;
      }
      this.btn.show = true
    },
    submit() {
      this.value = 0;
      this.btn.show = false;
      this.swap();
      let _this = this;
      setTimeout(() => {
        let url = "/pleasepayment/" + Math.floor(Math.random() * "123");
        if (this.btnName == "出售") {
          url = "/waitingforpayment/" + Math.floor(Math.random() * "123");
        }
        _this.$router.push({
          path: url,
        });
      }, 100);
    },
  },
};
</script>

<style lang="less" scoped>
.buyingAndSelling {
  padding: 15px 0px;
  .prompt {
    div {
      min-width: 140px;
      padding: 0 12px;
      height: 26px;
      background: #f6f6f6;
      border-radius: 13px;
      font-size: 12px;
      color: #999999;
    }
  }
  .countContainer {
    position: relative;
    .anShuLiang {
      width: 25px;
      height: 25px;
      position: absolute;
      right: 12px;
      top: 15px;
    }
    .count {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: baseline;
      margin-top: 15px;
      .value {
        font-size: 34px;
        font-weight: 600;
        color: #333333;
        max-width: 55%;
      }
      .unit {
        font-size: 12px;
        font-weight: 500;
        color: #333333;
        display: flex;
        align-items: flex-end;
        .jianTouXia {
          width: 12px;
          height: 12px;
          transform: translateY(-3px);
        }
      }
    }
  }
  .theProportion {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .way {
    margin-top: 10px;
    .jianTouYou1 {
      width: 11px;
      height: 11px;
      margin-left: 5px;
    }
  }
}

/deep/.van-cell {
  padding: 10px 10px;
  &::after {
    left: 10px;
    right: 10px;
  }
}
/deep/.van-cell-group {
  &::after {
    display: none;
  }
}

.btn-popup {
  /deep/.van-cell {
    .van-cell__title {
      font-size: 14px;
      color: #666666;
    }
    .right-icon {
      color: #333333;
    }
  }
}
</style>