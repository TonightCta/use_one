<!--
 * @Name: 金额
 * @Date: 2022-06-18 18:19:10
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:24:14
-->
<template>
  <div class="transaction-amount">
    <van-field class="input" v-model="value" placeholder="请输入目标金额">
      <template #button>{{ current.amount_way }}</template>
    </van-field>
    <div class="choose ui-grid-3">
      <div v-for="(item, index) in list" :key="index">
        <TableList
          :name="item"
          :index="index"
          v-model="active"
          @input="getOption"
        ></TableList>
      </div>
    </div>
    <div class="btn">
      <van-button
        type="default"
        @click="
          value = '';
          active = '';
        "
        >重置</van-button
      >
      <van-button type="primary" @click="filterAmount">确定</van-button>
    </div>
  </div>
</template>

<script>
import TableList from "./table-list";
import { mapState } from "vuex";
export default {
  components: {
    TableList,
  },
  data() {
    return {
      value: "",
      list: ["100", "500", "1000", "5000", "10000", "50000"],
      active: "",
    };
  },
  computed: {
    ...mapState(["current"]),
  },
  methods: {
    getOption(_val) {
      this.value = this.list[_val];
    },
    filterAmount() {
      this.$emit("click", this.value);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../assets/config.less";

.transaction-amount {
  padding: 0px 12px 12px 12px;
  .input {
    height: 35px;
    background: #f8f8f8;
    border-radius: 4px;
    padding: 6px 10px;
    /deep/.van-field__value {
      .van-field__button {
        color: #666666;
        font-size: 12px;
      }
    }
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
</style>