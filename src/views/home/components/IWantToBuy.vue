<!--
 * @Name: 我要买
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:12:13
-->
<template>
  <div>
    <!-- <P-list ref="P-list" :footer="true" @refresh="onRefresh" @load="onList">
      <template v-slot="{ row, index }">
        <template v-if="index == 0">
          
        </template>
        <template v-else>
          <Hemo-list
            :name="row.title"
            :Price="row.Price"
            @btnClick="btnClick(row)"
          ></Hemo-list>
        </template>
      </template>
    </P-list> -->
    <div class="c2c-list">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <ul>
          <li v-for="(row, index) in list" :key="index">
            <Hemo-list :row="row" @btnClick="btnClick(row)"></Hemo-list>
          </li>
        </ul>
        <infinite-loading
          spinner="spiral"
          @infinite="loadMoreEvent"
          :distance="0"
        >
          <div slot="spinner" class="p-t-40">
            <mt-spinner type="triple-bounce" color="#2CBC94"></mt-spinner>
          </div>
        </infinite-loading>
      </van-pull-refresh>
    </div>
    <BtnBuyingAndSelling
      v-model="bool.BuyingAndSelling"
      :currency="value"
      :row="placeMsg"
    />
    <P-alert v-model="bool.dialog">
      <div class="m-20-b size16 h-25-l">广告已被商家修改，该广告已失效</div>
      <P-button
        type="primary"
        class="btn-primary h-44-i size-14-i"
        @click="
          bool.dialog = false;
          bool.is_need_auth = true;
        "
        >好的</P-button
      >
    </P-alert>
    <!-- <NeedAuth v-model="bool.is_need_auth"/> -->
  </div>
</template>

<script>
import HemoList from "@/components/hemo-list";
import BtnBuyingAndSelling from "./BtnBuyingAndSelling";
import NeedAuth from "./need_auth";
import { AdvTradeList, TradeVerify } from "../../../api/api";
import InfiniteLoading from "vue-infinite-loading";
import { mapState } from "vuex";
export default {
  components: {
    HemoList,
    BtnBuyingAndSelling,
    NeedAuth,
    InfiniteLoading,
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    filterAmount: {
      type: [String, Number],
      default: null,
    },
    filterMents: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      bool: {
        BuyingAndSelling: false,
        dialog: false,
        is_need_auth: false,
      },
      test: true,
      list: [],
      loading: false,
      finished: false, //是否已加载完成，加载完成后不再触发load事件
      refreshing: false,
      page: 0,
      loading: false,
      list: [],
      placeMsg: {}, //下单信息
      coin:null,
    };
  },
  watch: {
    value(val){
      console.log(val)
      this.onList()
    },
    filterAmount(val) {
      this.onList();
      console.log(val);
    },
    filterMents(val) {
      this.onList();
      console.log(val);
    },
    currency(_val) {
      this.onList();
    },
  },
  created() {
    // this.onList();
    // console.log(this.filterAmount)
  },
  computed: {
    ...mapState(["current"]),
    currency() {
      return this.current.amount_way;
    },
  },
  methods: {
    testRef(_val){
      this.coin = _val;
    },
    //获取交易列表
    async onList(_coin) {
      const params = {
        type: 1,
        page: this.page,
        limit: 10,
        search: {
          currency: this.current.amount_way,
          coin: this.coin ? this.coin : this.value,
          payments: this.filterMents,
          amount: this.filterAmount,
        },
      };
      const result = await AdvTradeList(params);
      const { data } = result;
      this.list = data.list;
      console.log(this.list);
      return result;
    },
    // 加载更多
    async loadMoreEvent($state) {
      this.page += 1;
      const result = await this.onList();
      const { data } = result;
      if (this.list.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    //刷新
    onRefresh() {
      this.page = 0;
      this.onList();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    //点击购买
    async btnClick(row) {
      const result = await TradeVerify({ type: 2, advId: row.id });
      console.log(result);
      const { code, data } = result;
      if (code == 100016) {
        this.bool.dialog = true;
        return;
      } else if (code != 200) {
        this.$toast(result.message);
        return;
      }
      if (data.rules.kyc.required) {
        if (!data.rules.kyc.val) {
          this.$toast("您尚未完成实名认证");
          return;
        }
      }
      if (data.rules.pay_password.required) {
        if (!data.rules.pay_password.val) {
          this.$toast("您尚未设置交易密码");
          return;
        }
      };
      this.placeMsg = row;
      this.bool.BuyingAndSelling = true;
    },
  },
};
</script>
<style lang="less" scoped>
.c2c-list {
  /deep/.van-pull-refresh {
    height: 70vh;
    overflow: auto;
  }
}
</style>