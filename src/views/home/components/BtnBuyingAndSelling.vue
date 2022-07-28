<!--
 * @Name: 首页买卖按钮弹出模块
 * @Date: 2022-06-25 09:32:20
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:19:18
-->
<template>
  <P-popup
    class="buyingAndSelling"
    v-model="accordingTo"
    :head="false"
    :closeable="false"
  >
    <div class="head">
      <div class="top ui-flex-center">
        <div class="ui-flex-row">
          <B-svg name="USDT" class-name="USDT" />
          <div class="title">{{ title }}{{ currency }}</div>
        </div>
        <div>
          <div class="theUnitPrice ui-flex-row">
            <B-svg name="dengPao" class-name="dengPao"></B-svg>
            <div>
              单价：{{ row.currency_symbol }}{{ row.price?.toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
      <P-tabs v-model="tabs.active" :list="tabs.list" :lineWidth="32">
        <template #title="scope"> {{ scope.row.name }}{{ title }} </template>
        <template #title_1="row">
          <span v-if="false">{{ row }}</span>
        </template>
      </P-tabs>
    </div>
    <div class="body ui-flex-row-center">
      <div class="ui-hx w-100-b">
        <div class="ui-flex-row p-10-tb">
          <div class="count">
            <B-input
              type="int"
              v-model="val"
              placeholder="0"
              :append="tabs.active == 0 ? theAmountOfUnits : currency"
              :sinceTheGrowth="true"
              :sinceTheGrowthWidth="23"
            ></B-input>
          </div>
          <!-- <div class="all">全部</div> -->
        </div>
      </div>
      <div class="limit">
        限额
        {{
          tabs.active == 0
            ? row.min_currency?.toFixed(2)
            : row.min_amount?.toFixed(4)
        }}-{{
          tabs.active == 0
            ? row.max_currency?.toFixed(2)
            : row.amount?.toFixed(4)
        }}
        {{ tabs.active == 0 ? theAmountOfUnits : currency }}
      </div>
    </div>
    <div class="theTotalNumber ui-flex-center">
      <div class="title">{{ tabs.active == 0 ? "总数量" : "总金额" }}</div>
      <dl class="ui-flex-dl">
        <dt>{{ calTotal.toFixed(4) }}</dt>
        <dd>{{ tabs.active == 0 ? currency : theAmountOfUnits }}</dd>
      </dl>
    </div>
    <div class="footer ui-grid-2">
      <P-button type="default" class="btn-default" @click="accordingTo = false"
        >取消</P-button
      >
      <P-button
        :type="title == '购买' ? 'primary' : 'danger'"
        :class="title == '购买' ? 'btn-primary' : 'btn-danger'"
        @click="placeOrder"
        >{{ title }}</P-button
      >
    </div>
  </P-popup>
</template>

<script>
import { PlaceOrder } from "../../../api/api";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "购买",
    },
    //币种
    currency: {
      type: String,
      default: "",
    },
    //下单信息
    row: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      val: 0,
      //   theAmountOfUnits: "INR", //金额单位
      accordingTo: false,
      tabs: {
        active: 0,
        list: [
          { name: "按金额", scroll: "" },
          { name: "按数量", scroll: "" },
        ],
      },
      limit: "622-1253", //限额
      theTotalNumber: 23.2251, //总数量
      theUnitPrice: 2.35, //单价
      calTotal: 0, //计算数量
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function (v) {
        this.accordingTo = v;
      },
    },
    accordingTo(v) {
      this.$emit("input", v);
    },
    "tabs.active"(val) {
      this.val = "";
      this.calTotal = 0;
    },
    val(val) {
      const computedMine = () => {
        if (this.tabs.active == 0) {
          this.calTotal = Number(val) / Number(this.row?.price);
        } else {
          this.calTotal = Number(val) * Number(this.row?.price);
        }
      };
      val && computedMine();
    },
  },
  computed: {
    theAmountOfUnits() {
      return this.row.currency;
    },
  },
  created() {
    // console.log(this.row);
  },
  mounted() {},
  methods: {
    //下单
    async placeOrder() {
      //通过金额购买
      const tradeForPrice = async () => {
        const price = Number(this.val);
        if (price < this.row.min_currency || price > this.row.max_currency) {
          this.$toast(
            `请输入${this.row.min_currency.toFixed(
              2
            )}-${this.row.max_currency.toFixed(2)}区间的金额`
          );
          return;
        }
        const params = {
          adv_id: this.row.id,
          order_type: 1,
          order_amount: price,
        };
        const result = await PlaceOrder(params);
        const { code } = result;
        if(code != 200){
            this.$toast(result.message);
            return;
        };
        console.log(result);
        console.log("通过金额购买");
        this.$router.push({
            path:'/pleasepayment',
            query:{
                id:result.data.order_id
            }
        });
      };
      //通过数量购买
      const tradeForAmount = async () => {
        const amount = Number(this.val);
        if (amount < this.row.min_amount || amount > this.row.amount) {
          this.$toast(
            `请输入${this.row.min_amount.toFixed(4)}-${this.row.amount.toFixed(
              4
            )}区间的数量`
          );
          return;
        }
        const params = {
          adv_id: this.row.id,
          order_type: 2,
          order_amount: amount,
        };
        const result = await PlaceOrder(params);
        const { code } = result;
        if(code != 200){
            this.$toast(result.message);
            return;
        };
        console.log(result);
        console.log("通过数量购买");
        this.$router.push('/pleasepayment');
        this.$store.commit('current/upOrderID',result.data.order_id);
      };
      this.tabs.active == 0 ? tradeForPrice() : tradeForAmount();
    },
  },
  destroyed() {},
};
</script>

<style lang="less" scoped>
.buyingAndSelling {
  transition: all 0.34s ease-out;
  /deep/.container {
    padding: 0px;
  }
  /deep/.el-input-group__append {
    transform: translateY(-4px);
  }
  .head {
    height: 77px;
    padding: 12px 12px 0px 12px;
    background: #f5f8ff;
    .top {
      .title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
      }
      .USDT {
        width: 19px;
        height: 19px;
        margin-right: 5px;
      }
      .theUnitPrice {
        padding: 0px 10px;
        height: 24px;
        background: #ffffff;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        .dengPao {
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
    /deep/.van-tabs {
      margin-top: 5px;
      .van-tabs__wrap {
        height: 35px;
        .van-tabs__nav--line {
          padding-bottom: 0px;
          background-color: transparent;
          .van-tab {
            margin-right: 15px;
            font-size: 14px;
            color: #666666;
            &.van-tab--active {
              font-size: 14px;
              font-weight: bold;
              color: #333333;
            }
          }
        }
        .van-tabs__line {
          bottom: 0px;
        }
      }
    }
  }
  .body {
    height: 150px;
    padding: 0px 12px;
    .ui-hx {
      position: relative;
      &::after {
        background: #eeeeee;
      }
      .count {
        margin-right: 52px;
      }
      .all {
        position: absolute;
        right: 0px;
        font-size: 14px;
        color: #6580ff;
        bottom: 14px;
      }
      /deep/.el-input {
        input {
          font-size: 30px;
          font-weight: bold;
          color: #333333;
          &::placeholder {
            color: #333333;
          }
        }
        .el-input-group__append {
          font-size: 22px;
          font-weight: bold;
          color: #999999;
          margin-left: 8px;
          align-self: flex-end;
        }
      }
    }
    .limit {
      padding: 10px 0px;
      font-size: 12px;
      color: #adadad;
    }
  }

  .theTotalNumber {
    padding: 0px 12px;
    width: 375px;
    height: 38px;
    background: #f2f2f2;
    .title {
      font-size: 12px;
      color: #333330;
    }
    dl {
      dt {
        font-weight: bold;
        color: #121314;
      }
      dd {
        color: #9e9f9f;
      }
    }
    .ui-flex-dl dd {
      margin-bottom: 5px;
    }
  }

  .footer {
    padding: 12px;
    .van-button {
      height: 44px;
    }
  }
}
</style>