<!--
 * @Name: 支付方式
 * @Date: 2022-06-18 18:55:53
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:23:25
-->

<template>
  <div class="methodOfPayment ui-grid-2">
    <div v-for="(item, index) in list" :key="index">
      <TableList
        :name="item.name"
        :index="index"
        @input="setPayway"
        v-model="active"
      >
        <template #left>
          <div
            v-if="item.color"
            class="symbol"
            :style="'background:' + item.color + ';'"
          ></div>
        </template>
      </TableList>
    </div>
  </div>
</template>

<script>
import TableList from "./table-list";
import { Payments } from "../api/api";
export default {
  components: {
    TableList,
  },
  data() {
    return {
      list: [],
      active: "",
    };
  },
  created() {
    this.getMents();
  },
  methods: {
    async getMents() {
      const result = await Payments();
      this.list = result.data.payments;
      this.$set(this.list[0], "color", "#5173FF");
      this.$set(this.list[1], "color", "#09BB07");
      this.$set(this.list[2], "color", "#FEBD60");
      this.list.unshift({
        name: "全部",
        id: null,
      });
    },
    setPayway(_val) {
      this.$emit('click',this.list[_val]?.id);
    },
  },
};
</script>

<style lang="less" scoped>
.methodOfPayment {
  padding: 0px 12px 12px 12px;
  .symbol {
    position: absolute;
    left: 8px;
    width: 3px;
    height: 18px;
    border-radius: 1px;
  }
}
</style>