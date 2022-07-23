<!--
 * @Name: 下拉选项
 * @Date: 2022-06-18 14:03:16
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:24:31
-->

<template>
  <div class="ui-flex-center screening">
    <div class="left">
      <van-dropdown-menu active-color="#2cbc94">
        <van-dropdown-item title="支付方式" ref="pay-ments">
          <MethodOfPayment @click="setPayments"></MethodOfPayment>
        </van-dropdown-item>
        <van-dropdown-item title="交易金额" ref="trade-admount">
          <TheAmountOf @click="setFilter"></TheAmountOf>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="right">
      <van-dropdown-menu active-color="#2cbc94">
        <van-dropdown-item title="更多筛选">
          <div class="other-options">
            <h3>其他</h3>
            <div class="choose ui-grid-3">
              <div v-for="(item, index) in list" :key="index">
                <TableList
                  :name="item"
                  :index="index"
                  v-model="active"
                ></TableList>
              </div>
            </div>
            <h3 style="margin-top: 12px">交易类型</h3>
            <div class="choose ui-grid-3">
              <div v-for="(item, index) in tradeList" :key="index">
                <TableList
                  :name="item"
                  :index="index"
                  v-model="activeTrade"
                ></TableList>
              </div>
            </div>
            <div class="btn">
              <van-button type="default" @click="active = '';activeTrade = '';">重置</van-button>
              <van-button type="primary">确定</van-button>
            </div>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
  </div>
</template>

<script>
import MethodOfPayment from "./methodOfPayment";
import TheAmountOf from "./TheAmountOf";
import TableList from "./table-list.vue";

export default {
  props: {
    buyOrSell: {
      type: Number,
      default: 0,
    },
  },
  components: {
    MethodOfPayment,
    TheAmountOf,
    TableList,
  },
  data() {
    return {
      buyMoreFilter: {
        show: false,
        value: 0,
        options: {},
      },
      list: ["隐藏验证单", "我的关注", "交易过", "仅展示可交易单"],
      active: "",
      tradeList: ["普通交易", "大宗交易"],
      activeTrade: "",
    };
  },
  methods: {
    setFilter(_val){
      this.$refs['trade-admount'].toggle();
      this.$emit('filter-amount',_val)
    },
    setPayments(_val){
      this.$refs['pay-ments'].toggle();
      this.$emit('filter-ments',_val)
    },
    testClick() {
      console.log(123);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/config.less";
.screening {
  padding-left: 5px;
  color: #333333;
  font-size: 14px;
  background: #fff;
  /deep/.van-dropdown-menu {
    .van-dropdown-menu__bar {
      height: 44px;
      box-shadow: none;
      .van-dropdown-menu__item {
        margin-right: 25px;
        .van-dropdown-menu__title::after {
          border-color: transparent transparent #666666 #666666;
        }
      }
    }
    .van-popup {
      border-bottom-left-radius: 14px;
      border-bottom-right-radius: 14px;
    }
  }
  .right {
    /deep/.van-dropdown-menu {
      .van-dropdown-menu__bar {
        .van-dropdown-menu__item {
          margin-right: 20px;
        }
      }
    }
    .buy-more-filter {
      font-size: 15px;
      padding-right: 28px;
      position: relative;
      overflow: hidden;
    }
    .buy-more-filter::after {
      position: absolute;
      top: 50%;
      right: 16px;
      margin-top: -5px;
      border: 3px solid;
      transform: rotate(-45deg);
      opacity: 0.8;
      content: "";
      border-color: transparent transparent #666 #666;
    }
  }
  .other-options {
    padding: 12px;
    h3 {
      font-size: 14px;
      color: #333;
    }
    .choose {
      padding-top: 12px;
    }
    .btn {
      padding-top: 20px;
      display: grid;
      grid-template-columns: auto auto;
      gap: 17px;
      .van-button {
        height: 40px;
        border-radius: 4px;
        &.van-button--default {
          background: @btn-default;
          border: 1px solid @btn-default;
        }
        &.van-button--primary {
          background: @btn-primary;
          border: 1px solid @btn-primary;
        }
      }
    }
  }
}
</style>