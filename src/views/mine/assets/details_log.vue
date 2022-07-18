<!-- 资金流水详情 -->
<template>
  <div class="details-log">
    <Navigation :title="routeTitle" />
    <div
      class="log-content"
      :class="[logType == 2 ? 'red-color' : 'green-color']"
    >
      <p class="iconfont icon-a-bianzu3 need-color" type="icon"></p>
      <p class="title-ype need-color">
        {{
          (logType == 1 && "充币成功") ||
          (logType == 2 && "售出成功") ||
          (logType == 3 && "买入成功")
        }}
      </p>
      <p class="log-amount need-color">
        {{ logType == 2 ? "-" : "+" }}
        20.000 USDT
      </p>
      <p class="log-date">2022-12-14 14:35:12</p>
      <div class="log-type type-shadow">
        <p>类型</p>
        <p>
          {{
            (logType == 1 && "普通充币") ||
            (logType == 2 && "售出") ||
            (logType == 3 && "买入")
          }}
        </p>
      </div>
      <div class="order-msg type-shadow">
        <div class="log-type">
          <p>手续费</p>
          <p>0.0000 USDT</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>实际到账</p>
          <p>0.0000 USDT</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>链类型</p>
          <p>ERC 20</p>
        </div>
        <div class="log-type" v-if="logType == 1">
          <p>交易哈希</p>
          <p>ankchaducndk</p>
        </div>
        <div class="log-type" v-if="logType != 1">
          <p>订单编号</p>
          <p>ankchaducndk</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // logType:1,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  computed: {
    logType() {
      return this.$route.query.type;
    },
    routeTitle() {
      return (
        (this.logType == 1 && "充币详情") ||
        (this.logType == 2 && "售出详情") ||
        (this.logType == 3 && "买入详情")
      );
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
    .log-type{
        padding: 12px;
    }
  }
}
</style>