<!--
 * @Name: '请付款', '订单已取消', '订单已完成'
 * @Date: 2022-06-21 14:28:01
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:52:22
-->
<template>
  <P-main type="Fei">
    <Navigation class-name="Fei" :WeiXinXiSwitch="true" />
    <div class="prompt">
      <div class="title">{{ orderMsg.status_text }}</div>
      <div class="note">
        <template v-if="orderMsg.status == 0">
          <div class="note-count" v-if="orderMsg.type == 2">
            <p>请在</p>
            <van-count-down :time="date" />
            <p>内付款给卖家，超时自动取消</p>
          </div>
          <div class="note-count" v-else>
            <p>买家将在</p>
            <van-count-down :time="date" />
            <p>内付款</p>
          </div>
        </template>
        <template v-if="orderMsg.status == 1">{{
          orderMsg.type == 2 ? "等待卖家放行" : "买家已付款，请放行"
        }}</template>
        <template v-if="orderMsg.status == 2">您的订单申诉中</template>
        <template v-if="orderMsg.status == 3"
          >您购买的资产已放入发币账户</template
        >
        <template v-if="orderMsg.status == 4">您已取消订单</template>
      </div>
    </div>
    <h4 class="h4" :class="orderMsg.type == 1 && 'red-line'">
      {{ orderMsg.type == 1 ? "出售" : "购买" }} {{ orderMsg.coin }}
    </h4>
    <div class="content ui-flex-1">
      <P-cell :list="list" theme="cell">
        <template #value_0="scope">
          <div
            class="theAmountOf"
            :class="{ 'theAmountOf-hong': orderMsg.type == 1 }"
          >
            <div class="fh">{{ orderMsg.currency }}</div>
            <div class="jg">{{ scope.row.value }}</div>
          </div>
        </template>
        <template #value_3="scope">
          <ul class="ui-list ui-list-hx">
            <li>{{ scope.row.value }}</li>
            <li>
              <P-copy v-model="scope.row.value">
                <B-svg name="copy" style="width: 17px; height: 17px"></B-svg>
              </P-copy>
            </li>
          </ul>
        </template>
      </P-cell>

      <van-cell-group :border="false" class="m-30-t cell">
        <!-- <van-cell
          v-if="state.index == 2"
          :border="false"
          title="买家昵称"
          value="彭于晏快递"
          is-link
        ></van-cell> -->
        <van-cell
          v-if="orderMsg.type == 1"
          :border="false"
          title="买家姓名"
          :value="orderMsg.order_user.name"
        ></van-cell>
        <van-cell
          v-if="orderMsg.type == 2"
          :border="false"
          title="卖家昵称"
          :value="orderMsg.adv_user.name"
        >
          <template #extra>
            <div class="ui-flex-row">
              <div class="p-5-l">
                <B-svg
                  name="renzhengxinxi"
                  style="width:12px; height:;13px"
                ></B-svg>
              </div>
              <van-icon name="arrow" />
            </div>
          </template>
        </van-cell>
        <!-- v-if="state.index == 0 || state.index == 2" -->
        <van-cell :border="false" title="收款方式">
          <template #right-icon>
            <img
              v-if="orderMsg?.adv_payments"
              :src="orderMsg?.adv_payments[0].logo"
              alt=""
            />
          </template>
        </van-cell>
      </van-cell-group>

      <template v-if="orderMsg.status == 0">
        <div class="Footer ui-flex">
          <div class="ui-flex-1" v-if="orderMsg.type == 2">
            <van-button
              type="default"
              class="btn-default"
              @click="bool.cancel = true"
              >取消订单</van-button
            >
          </div>
          <div class="ui-flex-2 m-10-l">
            <van-button
              type="info"
              class="btn-info"
              @click="bool.show = true"
              v-if="orderMsg.type == 2"
              >去付款</van-button
            >
            <van-button type="info" class="btn-info" v-else>去放行</van-button>
          </div>
        </div>
      </template>
    </div>
    <AnQuanBaoZhang v-if="orderMsg.status == 0"></AnQuanBaoZhang>
    <PayChoose v-model="bool.show" @click="onPayChoose"></PayChoose>
    <CancelAlertOrder
      v-model="bool.cancel"
      @click="cancelTheOrder"
    ></CancelAlertOrder>
  </P-main>
</template>

<script>
import AnQuanBaoZhang from "@/components/AnQuanBaoZhang";
import PayChoose from "@/components/pay-way/pay-choose";
import CancelAlertOrder from "./components/cancelAlertOrder";
import { OrderDetails, Types, CancelOrder } from "../../api/api";
import { mapState } from "vuex";
export default {
  components: { AnQuanBaoZhang, PayChoose, CancelAlertOrder },
  data() {
    return {
      id: "",
      state: {
        index: 0,
        title: ["请付款", "订单已取消", "订单已完成"],
      },
      bool: {
        show: false,
        cancel: false,
      },
      orderMsg: {}, //订单信息
      date: 0, //结束倒计时
    };
  },
  computed: {
    ...mapState(['current']),
    orderID() {
      return this.current.orderID
    },
    list() {
      const msg = this.orderMsg;
      return [
        {
          title: "总金额",
          value: msg.amount_currency?.toFixed(2),
          border: false,
        },
        {
          title: "单价",
          value: Number(msg.price)?.toFixed(4),
          extra: msg.currency,
          border: false,
        },
        {
          title: "数量",
          value: msg.amount_coin?.toFixed(4),
          extra: msg.coin,
          border: false,
        },
        { title: "订单编号", value: msg.order_sn, border: false },
        { title: "下单时间", value: msg.created_at, border: false },
      ];
    },
  },
  watch: {
    "$route.params": {
      deep: true,
      immediate: true,
      handler: function (v) {
        if (v.id) {
          this.id = v.id;
          console.log(v);
        }
      },
    },
  },
  created() {
    this.getOrderDetail();
  },
  methods: {
    //获取订单详情
    async getOrderDetail() {
      const types = await Types({ scene: "AdsOrderStatus" });
      console.log(types);
      const result = await OrderDetails({ id: this.orderID });
      console.log(result);
      this.orderMsg = result.data;
      types.data.map.forEach((e) => {
        if (this.orderMsg.status == e.val) {
          this.$set(this.orderMsg, "status_text", e.name);
        }
      });
      this.date =
        new Date(this.orderMsg.expires_at).getTime() - new Date().getTime();
    },
    //取消订单
    async cancelTheOrder(v) {
      //   this.state.index = 1;
      const result = await CancelOrder({
        type: this.orderMsg.type,
        id: this.orderMsg.id,
      });
      console.log(result);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      v.show = false;
      this.$toast("订单取消成功");
      this.getOrderDetail();
    },
    onPayChoose(row) {
      this.$router.push({
        path: "/payment",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.red-line::before {
  background: #fd5656;
}
.prompt {
  padding: 18px 12px;
  background: #fff;

  .title {
    font-size: 22px;
    color: #333333;
    font-weight: bold;
  }
  .note {
    font-size: 12px;
    color: #666666;
    margin-top: 10px;
    .note-count {
      display: flex;
      align-items: center;
      p {
        transform: translateY(1px);
      }
    }
    /deep/.van-count-down {
      font-size: 17px;
      color: #fd5656;
      margin: 0px 3px;
      font-weight: bold;
    }
  }
}

.content {
  padding: 10px 0px;
  background: #fff;
  .theAmountOf {
    position: absolute;
    right: 16px;
    top: 6px;
  }
  img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }
  /deep/.van-cell {
    align-items: center;
  }
  /deep/.svg-icon {
    width: 15px;
    height: 15px;
  }
}
</style>