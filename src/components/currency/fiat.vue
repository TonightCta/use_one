<!--
 * @Name: 法币选择
 * @Date: 2022-07-06 15:02:45
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 09:47:05
-->
<template>
  <P-popup v-model="show" :style="{ height: '90%' }" :closeable="false">
    <P-index-bar :data="list" label="coin">
      <template #head>
        <div class="title m-10-t">常用法币</div>
        <van-cell
          v-for="(item, index) in cylist"
          :key="index"
          :border="index == cylist.length - 1 ? false : true"
          @click="selected(item)"
        >
          <template #title>
            <div class="ui-flex-left">
              <div class="ui-flex m-5-r">
                <van-image
                  width="26"
                  height="26"
                  :src="item.logo"
                  round
                  lazy-load
                />
              </div>
              <div>{{ item.currency }}</div>
            </div>
          </template>
        </van-cell>
        <div class="title m-22-t m-12-b">所有法币</div>
      </template>
      <template #body="{ row }">
        <van-cell
          v-for="(item, indexInner) in row"
          :key="indexInner"
          @click="selected(item)"
        >
          <template #title>
            <div class="ui-flex-left">
              <div class="ui-flex m-5-r">
                <van-image
                  width="26"
                  height="26"
                  :src="item.logo"
                  round
                  lazy-load
                />
              </div>
              <div>{{ item.currency }}</div>
            </div>
          </template>
        </van-cell>
      </template>
    </P-index-bar>
  </P-popup>
</template>

<script>
import { FaitCoin,FaitRate } from "../../api/api";
import { mapState } from "vuex";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      cylist: [],
      list: [],
    };
  },
  computed:{
    ...mapState(['current'])
  },    
  watch: {
    value: {
      immediate: true,
      handler: function (v) {
        this.show = v;
      },
    },
    show(v) {
      this.$emit("input", v);
    },
  },
  mounted() {
    this.onCoins();
  },
  methods: {
    async onCoins() {
      const result = await FaitCoin();
      const { code, data } = result;
      const { currency } = data;
      this.list = currency;
      this.list.forEach((e) => {
        this.$set(e, "coin", e.currency);
      });
      this.cylist = this.list.filter((item) => {
        if (item.hot == 1) {
          return item;
        }
      });
    },
    async selected(row) {
      this.show = false;
      this.$store.commit("current/upSymbol", row.symbol);
      this.$store.commit("current/upAmountWay", row.coin);
      const result = await FaitRate(this.current.amount_way);
      const { data } = result;
      this.$store.commit("current/upWayRate", data.price);
      this.$emit("click", row);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.popup-main {
  height: 100%;
  .head {
    display: none;
  }
  .container {
    display: flex;
    flex-flow: column;
    height: 100%;
    padding: 5px 0px 0px;
  }
}
/deep/.van-index-bar__sidebar {
  top: 57%;
}

.title {
  font-size: 16px;
  color: #666666;
  padding: 0px 12px;
}

/deep/.van-cell {
  padding: 10px 12px;
}
</style>