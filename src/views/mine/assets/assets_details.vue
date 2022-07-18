<!-- 资产详情 -->
<template>
  <div class="assets-details">
    <Navigation title="资产" />
    <div class="details-content">
      <div style="padding: 4px 12px">
        <div class="details-msg">
          <div class="coin-msg">
            <p class="coin-logo"></p>
            <p>USDT</p>
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
              <li v-for="(list, index) in tradeList" :key="index" @click="$router.push({
                path:'/assets-log',
                query:{
                    type:list.type
                }
              })">
                <div class="list-type">
                  <div class="flex-box">
                    <p
                      class="point-line"
                      :class="[
                        list.type == 1 && 'green-line',
                        list.type == 2 && 'red-line',
                        list.type == 3 && 'yellow-line',
                      ]"
                    ></p>
                    <p>
                      {{
                        (list.type == 1 && "充币") ||
                        (list.type == 2 && "售出") ||
                        (list.type == 3 && "买入")
                      }}
                    </p>
                  </div>
                  <p class="list-amount">{{ list.amount }}</p>
                </div>
                <div class="list-date">
                  <p>{{ list.date }}</p>
                  <p>
                    (手续费：{{ list.gas }}) &nbsp;
                    <span
                      :class="[
                        list.type == 1 && 'green-text',
                        list.type == 2 && 'red-text',
                        list.type == 3 && 'yellow-text',
                      ]"
                      >{{ list.type == 2 ? "-" : "+" }}{{ list.balance }}</span
                    >
                  </p>
                </div>
              </li>
            </ul>
          </van-pull-refresh>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useMsg: [
        {
          name: "可用",
          amount: "70.200",
        },
        {
          name: "冻结",
          amount: "29.996",
        },
        {
          name: "折合(INR)",
          amount: "12148.569",
        },
      ],
      tradeList: [
        {
          type: 1,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
        {
          type: 2,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
        {
          type: 3,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
        {
          type: 1,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
        {
          type: 3,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
        {
          type: 1,
          amount: "9219.3644",
          date: "2022-10-12  12:12:11",
          gas: "1.25536",
          balance: "1.2541122",
        },
      ],
      loading: false,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
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
        width: 16px;
        height: 16px;
        background: #ccc;
        border-radius: 50%;
        margin-right: 8px;
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