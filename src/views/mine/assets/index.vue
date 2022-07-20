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
              <p type="icon" class="iconfont icon-yanjing-3" v-if="!visible" @click="visible = !visible"></p>
              <p type="icon" class="iconfont icon-24gf-eyeHide" v-else @click="visible = !visible"></p>
            </div>
            <div class="balance-amount">
              <p>
                <mt-spinner
                  v-if="!price_btc"
                  type="triple-bounce"
                  color="white"
                ></mt-spinner>
                <span v-else>{{ visible ? Number(price_btc).toFixed(6) : '&prop;' }}</span>
              </p>
              <p class="label">&asymp;</p>
              <p>{{ current.way_symbol }}{{ visible ? totalPrice : '&prop;' }}</p>
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
                ></p>
                <p>{{ oper.name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 搜索资产 -->
        <div class="search-assets">
          <P-input placeholder="搜索" v-model="searchAssets">
            <template #icon>
              <div class="iconfont icon-fangdajing"></div>
            </template>
          </P-input>
        </div>
      </div>
      <!-- 资产列表 -->
      <div class="assets-list">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <div class="flex-box p-t-40" v-if="loadData">
            <mt-spinner type="triple-bounce" color="#2CBC94"></mt-spinner>
          </div>
          <div v-else>
            <ul v-if="assetsList.length != 0">
              <li
                class=""
                v-for="(assets, index) in assetsList"
                :key="index"
                @click="
                  $router.push({
                    path: '/assets-details',
                    query: {
                      row: JSON.stringify(assets),
                    },
                  })
                "
              >
                <div class="coin-msg">
                  <div class="flex-box">
                    <p class="coin-icon">
                      <img :src="assets.logo" alt="" />
                    </p>
                    <p class="coin-name">{{ assets.coin }}</p>
                  </div>
                  <p class="iconfont icon-youjiantou" type="icon"></p>
                </div>
                <div class="amount-msg">
                  <div>
                    <p>可用</p>
                    <p>{{ visible ? Number(assets.available).toFixed(4) : '&prop;' }}</p>
                  </div>
                  <div>
                    <p>冻结</p>
                    <p>{{ visible ? Number(assets.freeze).toFixed(4) : '&prop;' }}</p>
                  </div>
                  <div>
                    <p>折合</p>
                    <p>
                      <mt-spinner
                        type="triple-bounce"
                        color="#2CBC94"
                        v-if="!assets.price"
                      ></mt-spinner>
                      <span v-else
                        >{{ current.way_symbol
                        }}{{ visible ? Number(assets.price).toFixed(4) : '&prop;' }}</span
                      >
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <p class="no-data" v-else>暂无数据</p>
          </div>
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
      assetsList: [],
      assetsSec: [],
      loading: false,
      price_btc: "",
      searchAssets: "", //搜索资产
      loadData: false,//加载动画
      visible:true,//可视状态
    };
  },
  computed: {
    ...mapState(["current"]),
    totalPrice() {
      return Number(this.$route.query.total_price).toFixed(4);
    },
  },
  watch: {
    searchAssets(val) {
      const search = () => {
        this.assetsList = this.assetsSec.filter((e) => {
          return e.coin.includes(val.toUpperCase());
        });
      };
      val && search();
      !val && (this.assetsList = this.assetsSec);
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
      this.getCoinList();
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
      this.loadData = true;
      const result = await UserAssets();
      let list_local = [];
      const { data } = result;
      for (let i in data) {
        list_local.push(data[i]);
      }
      this.assetsList = list_local;
      this.assetsList.forEach(async (e) => {
        this.$set(
          e,
          "price",
          await oneInterPrice(this.current.way_rate, e.available, e.coin)
        );
      });
      this.assetsSec = this.assetsList;
      this.loadData = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>