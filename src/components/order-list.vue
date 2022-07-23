<!--
 * @Name: 首页列表内容组件
 * @Date: 2022-06-17 20:49:33
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:23:30
-->

<template>
  <div class="order" @click="$store.commit('current/upOrderID',row.id);$router.push('/pleasepayment')">
    <div class="head ui-flex-center ui-hx">
      <div class="left ui-flex-row">
        <div class="h4" :class="row.type == 1 && 'red-line'">
          {{ row.type == 2 ? "购买" : "出售" }}
        </div>
        <div>{{ row.coin }}</div>
      </div>
      <div class="right ui-flex-row">
        <div class="time">
          <p>还有</p>
          <van-count-down format="mm:ss" :time="row.end_time_temp" />
          <p>结束</p>
        </div>
        <div class="state">{{row.status_text}}</div>
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="body ui-flex-center">
      <div>
        <div><span class="label">单价</span>₹{{ row.price?.toFixed(2) }}</div>
        <div>
          <span class="label">数量</span>{{ row.amount_coin?.toFixed(4) }}
          {{ row.coin }}
        </div>
      </div>
      <div class="right">
        <div>总金额</div>
        <div
          class="price"
          :style="{ color: row.type == 1 ? '#FD5656' : '#2CBC94' }"
        >
          <span class="symbol m-5-r">{{ row.currency_symbol }}</span
          >{{ row.amount_currency?.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="footer ui-flex-center">
      <ul class="left">
        <li>
          <van-image
            round
            width="20"
            height="20"
            lazy-load
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </li>
        <li class="name">{{ row.user_info.name }}</li>
        <li>
          <!-- <WeiXinXi v-model="badge"></WeiXinXi> -->
        </li>
      </ul>
      <div class="right ui-flex-row">
        {{ row.created_at }}
      </div>
    </div>
  </div>
</template>

<script>
import WeiXinXi from "@/components/WeiXinXi";

export default {
  components: {
    WeiXinXi,
  },
  props: {
    // 订单ID
    row: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      badge: false,
    };
  },
  created() {
    console.log(this.row);
  },
};
</script>

<style lang="less" scoped>
.order {
  .head {
    &.ui-hx {
      &::after {
        background: #eeeeee;
      }
    }
    .left {
      font-weight: bold;
      .h4 {
        padding-left: 0px;
        padding-right: 5px;
        font-size: 14px;
        color: #333333;
        font-weight: bold;
        &::before {
          width: 3px;
          height: 10px;
          margin-top: 0px;
        }
      }
      .red-line::before {
        background: #fe5656;
      }
    }
    .right {
      font-size: 12px;
      color: #999999;
      .time {
        display: flex;
        align-items: center;
        /deep/.van-count-down {
          font-size: 14px;
          font-weight: 600;
          color: #fd5656;
          padding: 0px 5px;
        }
      }
      .state {
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        padding: 0px 5px;
      }
      .van-icon-arrow {
        width: 10px;
        height: 10px;
        color: #999999;
      }
    }
  }

  .body {
    color: #666666;
    line-height: 25px;
    margin-top: 10px;

    .right {
      text-align: right;
    }

    .label {
      font-size: 12px;
      color: #999999;
      margin-right: 5px;
    }

    .price {
      font-size: 22px;
      font-weight: bold;
      .symbol {
        font-size: 14px;
      }
    }
  }

  .footer {
    color: #666666;
    .left {
      display: flex;
      li {
        height: 35px;
        display: flex;
        align-items: center;
        &.name {
          font-size: 14px;
          font-weight: bold;
          color: #333330;
          margin: 0px 9px;
        }
        .renzhengxinxi {
          width: 12px;
          height: 13px;
        }
      }
    }
    .right {
      height: 14px;
      font-size: 10px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>