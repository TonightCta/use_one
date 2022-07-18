<!--
    * @Name 商家中心
    * @Date 2022-07-15
    * @Author CT
-->
<template>
  <div class="chant-center">
    <Navigation :editor-switch="true" className="with-bg-nav" />
    <div class="msg-card">
      <div class="account-msg">
        <img :src="require('../../assets/images/test.png')" alt="" />
        <div class="name-auth">
          <p class="chant-name">空空入也</p>
          <div class="auth-box">
            <div>
              <p class="iconfont icon-shiming-2" type="icon"></p>
              <p>实名认证</p>
              <p class="iconfont icon-a-bianzu3"></p>
            </div>
            <div>
              <p class="iconfont icon-shouji-2" type="icon"></p>
              <p>手机认证</p>
              <p class="iconfont icon-a-bianzu3"></p>
            </div>
            <div>
              <p class="iconfont icon-youxiang" type="icon"></p>
              <p>邮箱认证</p>
              <p class="iconfont icon-a-bianzu3"></p>
            </div>
          </div>
        </div>
      </div>
      <div class="trade-msg">
        <ul>
          <li v-for="(msg, index) in tradeMsg" :key="index">
            <div v-if="!msg.line" class="current-msg">
              <p>{{ msg.number }}</p>
              <p>{{ msg.name }}</p>
            </div>
            <div v-else class="msg-line"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 发布列表 -->
    <div class="release-list">
      <p class="release-title">在线购买 (2)</p>
      <P-list
        ref="P-list"
        :footer="false"
        @refresh="reloadList"
        finishedText=""
        @load="loadList"
      >
        <template v-slot="{ row, index }">
          <Release-list buy-btn :row="row" :key="index" />
        </template>
      </P-list>
      <p class="release-title">在线出售 (2)</p>
      <P-list
        ref="P-list-sell"
        :footer="false"
        finishedText=""
        @refresh="reloadListSell"
        @load="loadListSell"
      >
        <template v-slot="{ row, index }">
          <Release-list :row="row" :key="index" />
        </template>
      </P-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tradeMsg: [
        {
          line: false,
          number: 253,
          name: "成交单数",
        },
        {
          line: true,
        },
        {
          line: false,
          number: "95%",
          name: "成交率",
        },
        {
          line: true,
        },
        {
          line: false,
          number: "3.54min",
          name: "平均放行",
        },
        {
          line: true,
        },
        {
          line: false,
          number: "3.54min",
          name: "平均付款",
        },
      ],
      listBuy: [],
      listSell: [],
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../components/nav/Navigation"], resolve),
    ReleaseList: (resolve) => require(["./components/release_list"], resolve),
  },
  methods: {
    reloadList() {
      console.log("刷新了");
      this.loadList();
    },
    reloadListSell() {
      console.log("刷新了");
      this.loadListSell();
    },
    async loadList() {
      console.log("加载数据");
      const response = {
        code: 200,
        items: [
          {
            coin: "USDT",
            number: "17.954 USDT",
            amount: "₹100.00-₹120.00",
            price: "₹6.69",
          },
          {
            coin: "USDT",
            number: "17.954 USDT",
            amount: "₹100.00-₹120.00",
            price: "₹6.69",
          },
        ],
        total: 2,
      };
      const { code, items, total } = response;
      if (code == 200) {
        this.$refs["P-list"].Add(items, total);
      }
    },
    async loadListSell() {
      const response = {
        code: 200,
        items: [
          {
            coin: "USDT",
            number: "17.954 USDT",
            amount: "₹100.00-₹120.00",
            price: "₹6.69",
          },
          {
            coin: "USDT",
            number: "17.954 USDT",
            amount: "₹100.00-₹120.00",
            price: "₹6.69",
          },
        ],
        total: 2,
      };
      const { code, items, total } = response;
      if (code == 200) {
        this.$refs["P-list-sell"].Add(items, total);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.msg-card {
  width: 100%;
  height: 188px;
  z-index: 2000;
  position: fixed;
  background: url("../../assets/images/chant_bg.png");
  background-size: 100% 100%;
  transform: translateY(-46px);
  .account-msg {
    display: flex;
    padding: 50px 12px 0;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name-auth {
      .chant-name {
        font-size: 18px;
        color: white;
        font-weight: 500;
      }
      .auth-box {
        display: flex;
        p {
          font-size: 12px;
          color: #0a664c;
        }
        p[type="icon"] {
          font-size: 10px;
          margin-right: 2px;
        }

        div {
          display: flex;
          margin-right: 8px;
          p:nth-child(2) {
            margin-right: 2px;
          }
        }
      }
    }
  }
  .trade-msg {
    padding-top: 30px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        .current-msg {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          p {
            color: white;
          }
          p:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          p:last-child {
            font-size: 12px;
            opacity: 0.8;
          }
        }
        .msg-line {
          width: 1px;
          height: 16px;
          background: #eee;
          opacity: 0.2;
        }
      }
    }
  }
}
.release-list {
  //   transform: translateY(-46px);
  margin-top: 140px;
  padding: 12px 0;
  //   height: calc(100vh - 234px);
  //   overflow: auto;
  .release-title {
    font-size: 13px;
    color: #333;
    font-weight: 500;
    margin-bottom: 12px;
    padding: 0 12px;
  }
  /deep/.van-cell::after {
    display: none !important;
  }
}
/deep/.with-bg-nav {
  .van-nav-bar {
    background: rgba(0, 0, 0, 0);
    z-index: 2022;
    .van-icon {
      color: white;
    }
  }
}
</style>