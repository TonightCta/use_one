<!-- 资产详情 -->
<template>
  <div class="assets-details">
    <Navigation title="资产" />
    <div class="details-content">
      <div style="padding: 4px 12px">
        <div class="details-msg">
          <div class="coin-msg">
            <p class="coin-logo">
              <img :src="row.logo" alt="" />
            </p>
            <p>{{ row.coin }}</p>
          </div>
          <ul>
            <li v-for="(msg, index) in useMsg" :key="index">
              <p>{{ msg.name }}</p>
              <p>{{ msg.amount }}</p>
            </li>
          </ul>
        </div>
        <h3>资金流水</h3>
      </div>
      <!-- 资金流水详情 -->
      <div class="trade-list">
        <div class="list-con">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <ul>
              <li
                v-for="(list, index) in tradeList"
                :key="index"
                @click="
                  $router.push({
                    path: '/assets-log',
                    query: {
                      type: list.id,
                    },
                  })
                "
              >
                <div class="list-type">
                  <div class="flex-box">
                    <p
                      class="point-line"
                      :style="{ background: list.types?.color }"
                    ></p>
                    <p>
                      {{ list.types?.name }}
                    </p>
                  </div>
                  <p class="list-amount">{{ list.balance.toFixed(4) }}</p>
                </div>
                <div class="list-date">
                  <p>{{ list.time }}</p>
                  <p :style="{ color: list.types?.color }">
                    (手续费：{{ list.fee }}) &nbsp;
                    <span
                      >{{ list.amount > 0 ? "+" : " "
                      }}{{ Number(list.amount).toFixed(4) }}</span
                    >
                  </p>
                </div>
              </li>
            </ul>
            <infinite-loading
              spinner="spiral"
              @infinite="loadMoreEvent"
              :distance="0"
            >
              <div slot="spinner">
                <mt-spinner type="triple-bounce" color="#2CBC94"></mt-spinner>
              </div>
            </infinite-loading>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CoinAssets, Types } from "../../../api/api";
import InfiniteLoading from "vue-infinite-loading";
export default {
  data() {
    return {
      tradeList: [],
      loading: false,
      loadMoreDom: false,
      row: {},
      page: 0,
      state: null,
    };
  },
  computed: {
    ...mapState(["current"]),
    useMsg() {
      return [
        {
          name: "可用",
          amount: this.row.available,
        },
        {
          name: "冻结",
          amount: this.row.freeze,
        },
        {
          name: `折合(${this.current.amount_way})`,
          amount: this.row.price.toFixed(4),
        },
      ];
    },
  },
  created() {
    this.row = JSON.parse(this.$route.query.row);
    // this.getBill();
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
    InfiniteLoading,
  },
  methods: {
    onRefresh() {
      //   this.loadMoreEvent();
      //   this.limit = 10;
      //   this.state.loaded();
      this.page = 0;
      this.getBill();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async loadMoreEvent($state) {
      //   this.state = $state;
      //   this.loadMoreDom = true;
      this.page += 1;
      const result = await this.getBill();
      const { data } = result;
      if (this.tradeList.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    async getBill() {
      const result = await CoinAssets({
        page: this.page,
        limit: 7,
        coin: this.row.coin,
      });
      if (this.page != 1) {
        result.data.list.forEach((e) => {
          this.tradeList.push(e);
        });
      } else {
        this.tradeList = result.data.list;
      }
      const types = await Types({ scene: "UsersSpotAssetsType" });
      this.tradeList.forEach((e) => {
        types.data.map.forEach((type) => {
          if (e.type == type.val) {
            if (!e.types) {
              this.$set(e, "types", type);
            }
          }
        });
      });
      return result;
    },
  },
};
</script>

<style lang="less" scoped>
.details-content {
  border-top: 1px solid #eee;
  h3 {
    font-size: 16px;
    color: #333;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .details-msg {
    width: 100%;
    height: 124px;
    background-image: url("../../../assets/images/assets_overview.png");
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    padding-bottom: 24px;
    .coin-msg {
      display: flex;
      justify-content: center;
      align-items: center;
      .coin-logo {
        width: 18px;
        height: 16px;
        background: #ccc;
        border-radius: 50%;
        margin-right: 8px;
        transform: translateY(-2px);
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      p:last-child {
        font-size: 20px;
        color: white;
        font-weight: 500;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
      li {
        text-align: center;
        p {
          font-size: 12px;
          color: white;
          opacity: 0.9;
        }
      }
    }
    ul::after,
    ul::before {
      display: none;
    }
  }
  .trade-list {
    padding: 0 12px;
    .list-con {
      padding: 20px 12px;
      box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      height: 70vh;
      overflow-y: auto;
      ul {
        li {
          margin-bottom: 38px;

          .list-type {
            display: flex;
            justify-content: space-between;
            .flex-box {
              display: flex;
              align-items: center;
            }
            .point-line {
              width: 2px;
              height: 10px;
              margin-right: 6px;
            }
            .green-line {
              background: #26bb9b;
            }
            .red-line {
              background: #fd5656;
            }
            .yellow-line {
              background: #ffcc17;
            }
            p:last-child {
              font-size: 16px;
              font-weight: 500;
              color: #333;
            }
            .list-amount {
              font-size: 18px;
            }
          }
          .list-date {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #999;
            margin-top: 2px;
            .green-text {
              color: #26bb9b;
            }
            .red-text {
              color: #fd5656;
            }
            .yellow-text {
              color: #ffcc17;
            }
          }
        }
      }
    }
  }
}
</style>