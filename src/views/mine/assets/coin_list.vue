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
      <van-index-bar :index-list="indexList" sticky>
        <div v-for="(item, index) in list" :key="index">
          <van-index-anchor :index="index">
            {{index}}
          </van-index-anchor>
          <div class="coin-msg" v-for="(coin,index) in item" :key="index" @click="selectCoin(coin)">
            <div class="flex-box">
              <img :src="coin.logo" alt="" />
              <p>{{coin.coin}}</p>
            </div>
            <p class="stop-recharge" v-if="coin.deposit == 0">暂停充币</p>
          </div>
        </div>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { SupportCoins } from "../../../api/api";
export default {
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  data() {
    return {
      hotList: ["USDT", "TRX", "BTC", "ENQ", "ETH", "BNB"],
      list: [],
      indexList: [],
    };
  },
  created() {
    this.getSupportCoins();
  },
  methods: {
    //获取支持币种列表
    async getSupportCoins() {
      const result = await SupportCoins();
      this.list = result.data.coins;
      this.indexList = Object.keys(this.list);
    },
    //选择币种
    selectCoin(_msg){
      console.log(_msg);
      const params = {
        coin:_msg.coin,
        logo:_msg.logo,
        protocol:_msg.protocol_list
      };
      this.$store.commit('current/upCoin',params);
      this.$router.go(-1);
    }
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
    .stop-recharge {
      padding-right: 44px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>