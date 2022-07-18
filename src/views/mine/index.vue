<!--
 * @Name: 个人中心
 * @Date: 2022-06-28 09:40:19
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 18:12:11
-->
<template>
  <P-main>
    <div class="head ui-flex-left">
      <div class="ui-flex-row m-10-r user-nick">
        <!-- <van-image width="39" height="39" :src="require('@/assets/touxiang.png')" round lazy-load /> -->
        <p>
          {{
            current.account.email.substr(0, 2) ||
            current.account.phone.substr(0, 2)
          }}
        </p>
      </div>
      <div>
        <div class="name">
          {{ current.account.email || current.account.phone }}
        </div>
        <div class="ui-flex certification">
          <div class="ui-flex-row">
            <div class="title">实名认证</div>
            <B-svg
              name="gouXun"
              class-name="gouXun"
              v-if="current.account.security.kyc == 1"
            />
            <p class="iconfont icon-guanbi-" type="icon" v-else></p>
          </div>
          <div class="ui-flex-row">
            <div class="title">手机认证</div>
            <B-svg
              name="gouXun"
              class-name="gouXun"
              v-if="current.account.phone"
            />
            <p class="iconfont icon-guanbi-" type="icon" v-else></p>
          </div>
          <div class="ui-flex-row">
            <div class="title">邮箱认证</div>
            <B-svg
              name="gouXun"
              class-name="gouXun"
              v-if="current.account.email"
            />
            <p class="iconfont icon-guanbi-" type="icon" v-else></p>
          </div>
        </div>
      </div>
      <div
        class="btn-certification ui-flex-center"
        @click="$router.push('/auth-real')"
      >
        <B-svg name="gouXun-1" width="13px" />
        <div class="name">实名认证</div>
        <B-svg name="jianTouShuang-1" width="11px" height="8px" />
      </div>
    </div>
    <P-body class="m-60-b">
      <div class="totalAssets ui-flex-center">
        <div>
          <label>总资产估值</label>
          <dl class="ui-flex-dl">
            <dt class="total-price">{{ Number(assets).toFixed(4) }}</dt>
            <dd @click="bool.CurrencyOption = true">
              {{ current.amount_way }}
              <B-svg name="jianTouXia" class-name="icon-arrow" width="13px" />
            </dd>
          </dl>
        </div>
        <div
          class="btn ui-flex-row"
          @click="
            $router.push({
              name: 'MineAssets',
              query: {
                total_price: assets,
              },
            })
          "
        >
          <div>查看</div>
          <B-svg name="jianTouYou1" width="13px" height="10px" color="#fff" />
        </div>
      </div>
      <ul class="clinchADealTheData ui-list ui-list-hx">
        <li class="w-70">
          <div class="ui-flex-1">
            <label class="ui-ali-l-i">成交单数</label>
            <div class="val ui-ali-l-i">{{ panelMsg.total }}</div>
          </div>
        </li>
        <li class="w-70">
          <div class="ui-flex-1">
            <label>成交率</label>
            <div class="val">{{ panelMsg.percent }}</div>
          </div>
        </li>
        <li class="ui-flex-1">
          <div class="ui-flex-1">
            <label>平均放行</label>
            <div class="val">
              <dl class="ui-flex-dl">
                <dt>{{ panelMsg.avg }}</dt>
                <dd v-if="panelMsg.avg != '-'">min</dd>
              </dl>
            </div>
          </div>
        </li>
        <li class="ui-flex-1">
          <div class="ui-flex-1">
            <label class="ui-ali-r-i">平均付款</label>
            <div class="val ui-ali-r-i">
              <dl class="ui-flex-dl">
                <dt>{{ panelMsg.pay }}</dt>
                <dd v-if="panelMsg.pay != '-'">min</dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
      <div class="trading">
        <div class="name">今日交易情况</div>
        <ul class="ui-list">
          <li>
            <div class="ui-flex-1">
              <div class="val">{{ dayTotal }}</div>
              <label>成交比数</label>
            </div>
          </li>
          <li>
            <div class="ui-flex-1">
              <div class="val">
                {{ daySell ? daySell.toFixed(2) : `0.00`}}{{current.way_symbol}}
              </div>
              <label>出售金额</label>
            </div>
          </li>
          <li>
            <div class="ui-flex-1">
              <div class="val">
                {{ dayBuy ? dayBuy.toFixed(2) : `0.00` }}{{current.way_symbol}}
              </div>
              <label>购买金额</label>
            </div>
          </li>
        </ul>
      </div>

      <P-cell :list="list" class="column">
        <template #icon="{ row }">
          <div class="m-5-r">
            <B-svg :name="row.svg" width="17px" />
          </div>
        </template>
      </P-cell>
    </P-body>
    <Currency-Option v-model="bool.CurrencyOption" @click="onCurrency" />
  </P-main>
</template>

<script>
import { mapState } from "vuex";
import { interPrice } from "../../utils/index";
import { UserPanel, UserAssets } from "../../api/api";
export default {
  data() {
    return {
      bool: {
        CurrencyOption: false,
      },
      assets: 0, //资产
      dayBuy: 0, //今日买入,
      daySell: 0, //今日卖出
      dayTotal: 0, //今日成交单数
      panelMsg: {
        total: "-", //成交单数
        percent: "-", //成交率
        avg: "-", //平均放行
        pay: "-", //平均付款
      },
      list: [
        {
          svg: "gr-dingdan",
          title: "我的订单",
          islink: true,
          to: "/order?outback=1",
        },
        {
          svg: "gr-shoukuanfangshi",
          title: "收款方式",
          islink: true,
          to: "/bankcard",
        },
        // { svg: 'gr-bangzhuzhongxin', title: '帮助中心', 'islink': true },
        {
          svg: "gr-anquanzhongxin",
          title: "安全中心",
          islink: true,
          to: "/safty",
        },
        { svg: "gr-shezhi", title: "设置", islink: true, to: "/setting" },
      ],
    };
  },
  computed: {
    ...mapState(["current"]),
    // mineAssets() {
    //   return parseInt(this.assets) * parseInt(this.current.way_rate);
    // },
  },
  components: {
    CurrencyOption: () => import("@/components/currency/fiat"),
  },
  created() {
    this.getPanel();
    this.getAssets();
  },
  methods: {
    //选中法币
    onCurrency(val) {
      this.typeCoin = val.coin;
      this.getAssets();
      this.getPanel();  
    },
    //时间转化
    formatMin(_val) {
      let min = ~~((parseInt(_val) % 3600) / 60);
      let sec = parseInt(_val) % 60;
      let sec_min = "";
      sec_min += "" + min + "." + (sec < 10 ? "0" : "");
      sec_min += "" + sec;
      return sec_min;
    },
    //计算总资产
    async getAssets() {
      const result = await UserAssets();
      const { data } = result;
      const price = await interPrice(this.current.way_rate, data, 0);
      this.assets = this.interArr(price);
    },
    //获取面板基本信息
    async getPanel() {
      const result = await UserPanel();
      const { data } = result;
      this.panelMsg = {
        total: data.merchantInfo.dealTotal,
        percent: data.merchantInfo.dealRate + "%",
        avg: this.formatMin(data.merchantInfo.avgReceipt),
        pay: this.formatMin(data.merchantInfo.avgPay),
        ...this.panelMsg,
      };
      this.getDayTrade(data.userInfo);
    },
    //计算数组总和
    interArr(_price) {
      return _price.reduce((pre, cur) => {
        return pre + cur;
      });
    },
    //获取今日成交数据
    getDayTrade(_data) {
      this.dayTotal = _data.total;
      const buy = async () => {
        const price = await interPrice(
          this.current.way_rate,
          _data.buy,
          1
        );
        this.dayBuy = this.interArr(price);
      };
      const sell = async () => {
        const price = await interPrice(
          this.current.way_rate,
          _data.sell,
          1
        );
        this.daySell = this.interArr(price);
      };
      JSON.stringify(_data.buy) !== "{}" && buy();
      JSON.stringify(_data.sell) !== "{}" && sell();
    },
  },
};
</script>

<style lang="less" scoped>
.body {
  padding: 0;
}

.head {
  height: 150px;
  padding: 0px 12px;
  background: url("~@/assets/PersonalCenterHead.png") #26b890;
  background-size: cover;
  position: relative;

  .user-nick {
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    p {
      font-size: 22px;
    }
  }
  &::after {
    content: "";
    height: 10px;
    display: block;
    background: #fff;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .name {
    font-size: 18px;
    color: #ffffff;
  }
  .certification {
    .ui-flex-row {
      margin-right: 7px;
    }
    .title {
      font-size: 12px;
      color: #ffffff;
    }

    p[type="icon"] {
      color: white;
      opacity: 0.8;
      margin-left: 3px;
      font-size: 15px;
      transform: translateY(1px);
    }
    .gouXun {
      width: 13px;
      height: 13px;
      fill: #fff;
      margin-left: 3px;
    }
  }

  .btn-certification {
    width: 96px;
    height: 30px;
    background: rgba(255, 255, 255, 0.08);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.77);
    border-bottom: 1px solid rgba(255, 255, 255, 0.77);
    border-left: 1px solid rgba(255, 255, 255, 0.77);
    position: absolute;
    right: 0px;
    padding: 0px 5px;
    margin-top: -30px;
    .name {
      font-size: 12px;
      color: #ffffff;
    }
  }
}

.totalAssets {
  padding: 5px 24px;
  label {
    font-size: 12px;
    color: #666666;
  }
  dt {
    font-size: 22px;
    color: #333333;
    font-weight: bold;
  }
  dd {
    font-size: 14px;
    color: #333333;
  }
  .total-price {
    display: inline-block;
    transform: translateY(2px);
  }
  .icon-arrow {
    transform: translateY(2px);
  }
  .btn {
    width: 59px;
    height: 28px;
    background: #f8f8f8;
    border-radius: 4px;
    font-size: 12px;
    color: #666666;
  }
}

.clinchADealTheData {
  margin: 20px 24px 10px 24px;
  li {
    &:after {
      height: 16px;
      background: #eeeeee;
      opacity: 1;
    }
  }
  label {
    display: block;
    font-size: 12px;
    color: #666666;
    text-align: center;
  }
  .val {
    margin-top: 3px;
    font-size: 18px;
    color: #333333;
    text-align: center !important;
    font-weight: bold;
    dd {
      font-size: 14px;
      margin-left: 0px;
    }
    .ui-flex-dl {
      dt {
        font-size: 18px;
      }
    }
    &.ui-ali-r-i {
      .ui-flex-dl {
        justify-content: flex-end;
      }
    }
  }
}

.trading {
  height: 120px;
  border-radius: 5px;
  background: url("~@/assets/trading.png");
  background-size: cover;
  position: relative;
  padding: 14px;
  .name {
    font-size: 14px;
    color: #ffffff;
    margin-top: 4px;
    margin-left: 6px;
  }
  ul {
    padding-top: 10px;
  }
  li {
    flex: 1;
    label {
      display: block;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    .val {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #333333;
    }
  }
}

.column {
  /deep/.van-cell {
    padding: 10px 20px 10px 24px;
  }
}
</style>