<template>
  <div class="release-con">
    <div class="coin-msg">
      <img :src="require('../../../assets/images/test.png')" alt="" />
      <p>{{ row.coin }}</p>
    </div>
    <div class="number-msg flex-b">
      <p><span>数量</span>{{ row.number }}</p>
      <p>单价</p>
    </div>
    <div class="amount-msg flex-b">
      <p><span>限额</span>{{ row.amount }}</p>
      <p :class="[buyBtn ? 'buy-color' : 'sell-colors']">{{row.price}}</p>
    </div>
    <div class="pay-btn flex-b">
        <p class="iconfont icon-a-bianzu3beifen" type="icon"></p>
        <button v-if="buyBtn" class="buy-btn">购买</button>
        <button v-else class="sell-btn">出售</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      /**
       * @param row.coin 币种名称
       * @param row.number 数量
       * @param row.amount 限额
       * @param row.price 价格
       */
      default: {},
    },
    buyBtn: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    console.log(this.row);
  },
};
</script>

<style lang="less" scoped>
.release-con {
  padding: 12px;
  margin: 0 12px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  border-radius: 4px;
  .coin-msg {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 4px;
    }
    p {
      font-size: 14px;
      color: #333;
    }
  }
  .flex-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 12px;
      color: #666;
      span {
        margin-right: 4px;
        color: #999;
      }
    }
  }
  .number-msg {
    p:last-child{
        color: #999;
    }
  }
  .amount-msg{
    p:first-child{
        transform: translateY(3px);
    }
    p:last-child{
        font-size: 22px;
        font-weight: 500;
    }
    .buy-color{
        color: #26B890;
    }
    .sell-color{
        color: #FD5656;
    }
  }
  .pay-btn{
    margin-top: 4px;
    p[type="icon"]{
        font-size: 20px;
        color: #FEBD60;
    }
    button{
        padding: 4px 25px;
        border-radius: 4px;
        font-size: 14px;
        color: white;
    }
    .buy-btn{
        background: #26B890;
    }
    .sell-btn{
        background: #FD5656;
    }
  }
}
</style>