<!-- 充币类型 -->
<template>
  <div class="coin-list">
    <Navigation title="充币币种" />
    <div class="list-con">
      <div class="hot-coin">
        <h4>热门</h4>
        <ul>
          <li v-for="(hot, index) in hotList" :key="index">{{ hot }}</li>
        </ul>
      </div>
      <van-index-bar>
        <van-index-anchor index="A" />
        <div class="coin-msg">
          <div class="flex-box">
            <img :src="require('../../../assets/images/test.png')" alt="" />
            <p>ARDR</p>
          </div>
          <p class="stop-recharge">暂停充币</p>
        </div>
        <van-index-anchor index="B" />
        <div class="coin-msg">
          <div class="flex-box">
            <img :src="require('../../../assets/images/test.png')" alt="" />
            <p>BTC</p>
          </div>
          <p class="stop-recharge">暂停充币</p>
        </div>
        <van-index-anchor index="U" />
        <div class="coin-msg">
          <div class="flex-box">
            <img :src="require('../../../assets/images/test.png')" alt="" />
            <p>USDT</p>
          </div>
          <p class="stop-recharge">暂停充币</p>
        </div>
        <van-index-anchor index="X" />
        <div class="coin-msg">
          <div class="flex-box">
            <img :src="require('../../../assets/images/test.png')" alt="" />
            <p>XRP</p>
          </div>
          <p class="stop-recharge">暂停充币</p>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  data() {
    return {
      hotList: ["USDT", "TRX", "BTC", "ENQ", "ETH", "BNB"],
      list: [],
    };
  },
};
</script>

<style lang="less" scoped>
/deep/.van-index-bar__sidebar {
  background: #f1f1f1;
  padding: 8px 0;
  border-radius: 12px;
  right: 12px;
  .van-index-bar__index {
    padding: 0 4px 4px 4px;
  }
}
.list-con {
  border-top: 1px solid #eee;
  .hot-coin {
    padding: 12px;
    h4 {
      font-size: 14px;
      color: #666;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        padding: 5px 27px;
        border-radius: 4px;
        background: #f8f8f8;
        color: #333;
        margin-top: 6px;
        margin-right: 14px;
      }
    }
  }
  .coin-msg {
    display: flex;
    align-items: center;
    padding-left: 12px;
    margin-bottom: 12px;
    justify-content: space-between;
    .flex-box {
      display: flex;
      align-items: center;
      p {
        font-size: 16px;
        color: #333;
      }
    }
    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      margin-right: 8px;
    }
    .stop-recharge{
        padding-right: 44px;
        font-size: 14px;
        color: #999;
    }
  }
}
</style>