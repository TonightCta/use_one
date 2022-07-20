<!-- 资金流水详情 -->
<template>
  <div class="details-log">
    <Navigation :title="detailMsg.routeTitle" />
    <div
      class="log-content"
      :style="{color:detailMsg.color}"
    >
      <p class="iconfont icon-a-bianzu3 need-color" type="icon"></p>
      <p class="title-ype need-color" :style="{color:detailMsg.color}">
        {{
          detailMsg.routeTitle
        }}
      </p>
      <p class="log-amount need-color" :style="{color:detailMsg.color}">
        {{ detailMsg.amount > 0 ? "+" : " " }}
        {{detailMsg.amount}}&nbsp;{{detailMsg.coin}}
      </p>
      <p class="log-date">
        {{detailMsg.time}}
      </p>
      <div class="log-type type-shadow">
        <p>类型</p>
        <p>
          {{ detailMsg.tradeType }}
        </p>
      </div>
      <div class="order-msg type-shadow">
        <div class="log-type">
          <p>手续费</p>
          <p>{{detailMsg.fee}}&nbsp;{{detailMsg.coin}}</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>实际到账</p>
          <p>{{detailMsg.true_amount}}&nbsp;{{detailMsg.coin}}</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>链类型</p>
          <p>{{detailMsg.protocol}}</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>交易哈希</p>
          <p>{{detailMsg.txid}}</p>
        </div>
        <div class="log-type" v-if="logType != 1">
          <p>订单编号</p>
          <p>{{detailMsg.order_sn}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AssetsDetails, Types } from "../../../api/api";
export default {
  data() {
    return {
      // logType:1,
      detailMsg:{}
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  created() {
    this.getAssetsDetails();
  },
  computed: {
    logType() {
      return this.$route.query.type;
    },
  },
  methods: {
    async getAssetsDetails() {
      const ID = this.$route.query.type;
      const result = await AssetsDetails(ID);
      console.log(result);
      const { data } = result;
      this.detailMsg = data;
      const types = await Types({ scene: "UsersSpotAssetsType" });
      types.data.map.forEach((e) => {
        if (data.type == e.val) {
          this.$set(this.detailMsg,'routeTitle',`${e.name}成功`)
          this.$set(this.detailMsg,'tradeType',e.name)
          this.$set(this.detailMsg,'color',e.color)
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.red-color {
  .need-color {
    color: #fd5656;
  }
}
.green-color {
  .need-color {
    color: #26bb9b;
  }
}
.log-content {
  border-top: 1px solid #eee;
  padding: 48px 12px;
  text-align: center;
  p[type="icon"] {
    font-size: 30px;
  }
  .title-ype {
    margin: 10px 0;
    font-size: 14px;
  }
  .log-amount {
    font-size: 22px;
    font-weight: 500;
  }
  .log-date {
    font-size: 12px;
    color: #999;
    margin-bottom: 30px;
  }
  .log-type {
    padding: 14px 12px;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p:first-child {
      font-size: 12px;
      color: #999;
    }
    p:last-child {
      font-size: 14px;
      color: #333;
    }
  }
  .type-shadow {
    box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.05);
  }
  .order-msg {
    margin-top: 8px;
    border-radius: 4px;
    .log-type {
      padding: 12px;
    }
  }
}
</style>