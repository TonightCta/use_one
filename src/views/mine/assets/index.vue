<!--
  * @NAME 我的资产
  * @DATE 2022-07-14
  * @AUTHOR CT
-->
<template>
  <div class="mine-assets">
    <Navigation title="我的资产" />
    <div class="assets-content">
      <div style="padding: 0 12px">
        <div class="assets-overview">
          <div>
            <div class="all-balance">
              <p>总资产折合(BTC)</p>
              <p type="icon" class="iconfont icon-yanjing-3"></p>
            </div>
            <div class="balance-amount">
              <p>{{ Number(price_btc).toFixed(6) }}</p>
              <p class="label">&asymp;</p>
              <p>{{ current.way_symbol }}{{ totalPrice }}</p>
            </div>
          </div>
          <!-- 操作 -->
          <div class="view-oper">
            <ul>
              <li
                v-for="(oper, index) in operList"
                :key="index"
                @click="$router.push(oper.url)"
              >
                <p
                  type="icon"
                  class="iconfont"
                  :class="oper.icon"
                  @click="showPrice = !showPrice"
                ></p>
                <p>{{ oper.name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 搜索资产 -->
        <div class="search-assets">
          <P-input placeholder="搜索">
            <template #icon>
              <div class="iconfont icon-fangdajing"></div>
            </template>
          </P-input>
        </div>
      </div>
      <!-- 资产列表 -->
      <div class="assets-list">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <ul>
            <li
              class=""
              v-for="(assets, index) in assetsList"
              :key="index"
              @click="$router.push('/assets-details')"
            >
              <div class="coin-msg">
                <div class="flex-box">
                  <p class="coin-icon">
                    <img :src="assets.logo" alt="">
                  </p>
                  <p class="coin-name">{{ assets.coin }}</p>
                </div>
                <p class="iconfont icon-youjiantou" type="icon"></p>
              </div>
              <div class="amount-msg">
                <div>
                  <p>可用</p>
                  <p>{{ assets.available }}</p>
                </div>
                <div>
                  <p>冻结</p>
                  <p>{{ assets.freeze }}</p>
                </div>
                <div>
                  <p>折合</p>
                  <p>{{ assets.price }}</p>
                </div>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinPrice, oneInterPrice } from "../../../utils/index";
import { mapState } from "vuex";
import { UserAssets } from "../../../api/api";
export default {
  data() {
    return {
      operList: [
        {
          icon: "icon-a-bianzu9",
          name: "充币",
          url: "/recharge",
        },
        {
          icon: "icon-yinhangka-2",
          name: "交易",
          url: "/index",
        },
        {
          icon: "icon-a-35guanggaoxiaoshou",
          name: "发布广告",
          url: "/release",
        },
      ],
      assetsList: [
        {
          coinName: "USDT",
          use: "1.2541122",
          id: 1,
          un_use: "1.25536",
          amount: "0.000000",
        },
        {
          coinName: "BTC",
          use: "1.2541122",
          id: 1,
          un_use: "1.25536",
          amount: "₹321,481.04",
        },
        {
          coinName: "ETH",
          use: "1.2541122",
          id: 1,
          un_use: "1.25536",
          amount: "< ₹0.01",
        },
      ],
      loading: false,
      price_btc: "0.00",
      showPrice: true,
    };
  },
  computed: {
    ...mapState(["current"]),
    totalPrice() {
      return Number(this.$route.query.total_price).toFixed(4);
    },
  },
  created() {
    this.interTotalPrice();
    this.getCoinList();
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    //计算法币资产至BTC
    async interTotalPrice() {
      const btc_price = await getCoinPrice("BTC");
      const price_of_us =
        parseInt(this.$route.query.total_price) /
        parseInt(this.current.way_rate);
      this.price_btc = parseInt(price_of_us) / parseInt(btc_price);
    },
    //获取资产列表
    async getCoinList() {
      const result = await UserAssets();
      console.log(result);
      let list_local = [];
      const { data } = result;
      for (let i in data) {
        list_local.push(data[i]);
      }
      console.log(list_local);
      this.assetsList = list_local;
      console.log(await oneInterPrice(this.current.way_rate, this.assetsList[0].available, this.assetsList[0].coin))
      this.assetsList.forEach(async (e) => {
        this.$set(
          e,
          'price',
          await oneInterPrice(this.current.way_rate, e.available, e.coin)
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>