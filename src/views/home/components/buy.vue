<!--
 * @Name: 购买或出售
 * @Date: 2022-06-20 15:39:19
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:19:14
-->

<template>
  <BuyingAndSelling
    ref="BuyingAndSelling"
    :currency="value"
    :btn-name="btn.name"
    :color="btn.color"
    @swap="swap"
  >
    <template #theProportion>
      <template v-if="headNavActive === 0"
        >10-5,000,000 {{ buyAway }}</template
      >
      <template v-else>
        当前可用余额：0.00 {{ unit.USDT }}
        <span class="theBiggest">最大</span>
      </template>
    </template>
  </BuyingAndSelling>
</template>

<script>
import BuyingAndSelling from "./buyingAndSelling";
import { mapState } from "vuex";
export default {
  components: {
    BuyingAndSelling,
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    headNavActive: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      btn: {
        name: "",
        color: "",
      },
      unit: {
        INR: "",
        USDT: "",
      },
      buyAway: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function (v) {
        this.unit.USDT = v;
      },
    },
    headNavActive: {
      deep: true,
      immediate: true,
      handler: function (v) {
        if (v === 0) {
          this.buy();
        } else {
          this.sell();
        }
      },
    },
  },
  created(){
    this.buyAway = this.current.amount_way
  },
  computed: {
    ...mapState(["current"]),
  },
  methods: {
    buy() {
      this.btn.name = "购买";
      this.btn.color = "#2CBC94";
    },
    sell() {
      this.btn.name = "出售";
      this.btn.color = "#FD5656";
    },
    swap() {
      let data = this.$refs["BuyingAndSelling"];
      this.buyAway = data.buyAway;
    },
  },
};
</script>

<style lang="less" scoped>
.theBiggest {
  font-size: 12px;
  font-weight: 400;
  color: #2cbc94;
  padding-left: 8px;
}
</style>