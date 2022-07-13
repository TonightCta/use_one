<!--
 * @Name: 选择地区
 * @Date: 2022-06-26 00:48:37
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:18:26
-->
<template>
  <P-main v-if="value">
    <Navigation
      :searchSwitch="true"
      v-model="keyword"
      :show-action="true"
      :left-arrow="false"
      @click-cancel="emitParent"
    />

    <div v-if="keyword == ''">
      <van-cell-group title="热门地区" class="m-30-b">
        <van-cell
          v-for="(item, index) in hot"
          :key="index"
          @click="selected(item)"
        >
          <template #title>
            <div class="ui-flex-left">
              <img :src="item.logo" class="theNationalFlag" />
              <div>{{ item.country }}</div>
            </div>
          </template>
          <template #extra>{{ item.prefix }}</template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="国家/地区">
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          @click="selected(item)"
        >
          <template #title>
            <div class="ui-flex-left">
              <img :src="item.logo" class="theNationalFlag" />
              <div>{{ item.country }}</div>
            </div>
          </template>
          <template #extra>{{ item.prefix }}</template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-cell-group v-else>
      <van-cell
        v-for="(item, index) in setData"
        :key="index"
        @click="selected(item)"
      >
        <template #title>
          <div class="ui-flex-left">
            <img :src="item.logo" class="theNationalFlag" />
            <div>{{ item.country }}</div>
          </div>
        </template>
        <template #extra>{{ item.prefix }}</template>
      </van-cell>
    </van-cell-group>
  </P-main>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: "",
      list: [],
      hot: [],
    };
  },
  computed: {
    setData() {
      let Arr = this.list.filter((data) => {
        if (data.country.toLowerCase().includes(this.keyword.toLowerCase())) {
          return data;
        }
      });
      return Arr;
    },
  },
  watch: {
    value(v) {
      this.getNationalNumber();
    },
  },
  methods: {
    //国家号码
    getNationalNumber() {
      this.$store.dispatch("registered/country").then((response) => {
        this.list = response;
        this.hot = response.map((item) => {
          if (item.hot == 1) {
            return item;
          }
        });
      });
    },
    selected(item) {
      this.$emit("input", false);
      this.$emit("click", item);
    },
    emitParent() {
      this.$emit('close-area')
    },
  },
};
</script>

<style lang="less" scoped>
.theNationalFlag {
  height: 16px;
  width: 16px;
  margin-right: 5px;
  border-radius: 50%;
}

/deep/.van-search__action {
  color: #2cbc94;
}
</style>