<!-- 广告订单记录 -->
<template>
  <P-main>
    <div class="adv-detail-log">
      <Navigation title="订单记录" />
      <P-body type="Fei">
        <div class="log-list">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <ul>
              <li
                v-for="(item, index) in logList"
                :key="index"
                :class="item.type == 2 ? 'green-color' : 'red-color'"
              >
                <!-- 标题信息 -->
                <div class="log-title">
                  <p class="title-msg">
                    <span></span>
                    {{ item.type == 2 ? "购买" : "出售" }}&nbsp;{{ item.coin }}
                  </p>
                  <div class="right-oper">
                    <p v-if="item.status == 1">还有<span>
                        <van-count-down :time="item.end_time_temp" format="HH:mm" />
                    </span>结束</p>
                    <p>
                      {{ item.status_text}}
                      <span class="iconfont icon-youjiantou"></span>
                    </p>
                  </div>
                </div>
                <!-- 订单信息 -->
                <div class="log-content">
                  <div>
                    <p>
                      <span>单价</span>{{ item.currency_symbol
                      }}{{ item.price }}
                    </p>
                    <p>
                      <span>数量</span>{{ item.amount_coin }}{{ item.coin }}
                    </p>
                  </div>
                  <div>
                    <p>总金额</p>
                    <p class="all-price">
                      <span>{{ item.currency_symbol }}</span
                      >{{ item.amount_currency.toFixed(2) }}
                    </p>
                  </div>
                </div>
                <!-- 底部信息 -->
                <div class="log-oper">
                  <div>
                    <img
                      :src="require('../../assets/images/test.png')"
                      alt=""
                    />
                    <p>{{ item.user_info.name }}</p>
                    <p class="iconfont icon-xiaoxi-7"></p>
                  </div>
                  <p>{{ item.created_at }}</p>
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
      </P-body>
    </div>
  </P-main>
</template>

<script>
import { AdvDetailLog,Types } from "../../api/api";
import InfiniteLoading from "vue-infinite-loading";
import { mapState } from "vuex";
import { setTypes } from '../../utils/index'
export default {
  data() {
    return {
      loading: false, //刷新数据
      logList: [],
      page: 0,
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../components/nav/Navigation"], resolve),
    InfiniteLoading,
  },
  computed: {
    ...mapState(["current"]),
    advID() {
      return this.current.advID;
    },
  },
  created() {
    // this.getLoglist();
  },
  methods: {
    //获取订单列表
    async getLoglist() {
      const types = await Types({scene:'AdsOrderStatus'});
      console.log(types)
      const params = {
        id: this.advID,
        page: 1,
        limit: 10,
      };
      const result = await AdvDetailLog(params);
      if (this.page > 1) {
        result.data.list.forEach((e) => {
          this.logList.push(e);
        });
      } else {
        this.logList = result.data.list;
      };
      const date = new Date().getTime();
      this.logList.forEach(e => {
        this.$set(e,'end_time_temp',new Date(e.expires_at) - date);
      });
      this.logList = setTypes(this.logList,types.data.map);
      console.log(this.logList)
      return result;
    },
    //加载更多
    async loadMoreEvent($state) {
      this.page += 1;
      const result = await this.getLoglist();
      const { data } = result;
      if (this.logList.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    //下拉刷新
    onRefresh() {
      this.page = 0;
      this.getLoglist();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.body {
  height: calc(100vh - 46px);
}
.log-list {
  /deep/.van-pull-refresh {
    height: 90vh;
    overflow: auto;
  }
  ul {
    li {
      padding: 12px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      .log-title {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
        margin-bottom: 8px;
        .title-msg {
          span {
            display: inline-block;
            width: 3px;
            height: 10px;
            border-radius: 2px;
            margin-right: 4px;
          }
          font-size: 4px;
          color: #333;
          font-weight: 500;
        }
        .right-oper {
          display: flex;
          align-items: center;
          p {
            font-size: 12px;
            .iconfont {
              font-size: 12px;
            }
          }
          p:first-child {
            color: #999999;
            margin-right: 6px;
            display: flex;
            align-items: center;
            /deep/.van-count-down {
              font-size: 14px;
              color: #fd5656;
              margin: 0 2px;
            }
          }
          p:last-child {
            color: #333;
            .iconfont {
              color: #999;
            }
          }
        }
      }
      .log-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        p {
          font-size: 12px;
          color: #666;
        }
        div:first-child {
          p {
            span {
              margin-right: 8px;
              color: #999;
            }
          }
        }
        div:last-child {
          text-align: right;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: flex-end;
          p:first-child {
            transform: scale(0.85);
          }
          p:last-child {
            font-size: 22px;
            span {
              font-size: 12px;
            }
          }
        }
      }
      .log-oper {
        display: flex;
        justify-content: space-between;
        div {
          display: flex;
          align-items: center;
          .iconfont {
            font-size: 14px;
            margin-left: 6px;
            color: #999;
          }
        }
        img {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 8px;
        }
      }
    }
    .green-color {
      .log-title {
        .title-msg {
          span {
            background: #2cbc94;
          }
        }
      }
      .log-content {
        .all-price {
          color: #2cbc94;
        }
      }
    }
    .red-color {
      .log-title {
        .title-msg {
          span {
            background: #fd5656;
          }
        }
      }
      .log-content {
        .all-price {
          color: #fd5656;
        }
      }
    }
  }
}
</style>