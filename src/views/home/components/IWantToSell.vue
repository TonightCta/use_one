<!--
 * @Name: 我要卖
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:17:14
-->
<template>
  <div>
    <!-- <P-list ref="P-list" :footer="true" @refresh="onRefresh" @load="onList">
            <template v-slot="{row, index}">
                <template v-if="index == 0">
                    <Hemo-list btn-name="出售" color="#FD5656" :name="row.title" :Price="row.Price"
                        @btnClick="bool.dialog = true">
                    </Hemo-list>
                </template>
                <template v-else>
                    <Hemo-list btn-name="出售" color="#FD5656" :name="row.title" :Price="row.Price"
                        @btnClick="btnClick(row)">
                    </Hemo-list>
                </template>
            </template>
        </P-list> -->
    <div class="c2c-list">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <ul>
          <li v-for="(row, index) in list" :key="index">
            <Hemo-list
              btn-name="出售"
              color="#FD5656"
              :row="row"
              @btnClick="btnClick(row)"
            ></Hemo-list>
          </li>
        </ul>
        <infinite-loading
          spinner="spiral"
          @infinite="loadMoreEvent"
          :distance="0"
        >
          <div slot="spinner" class="p-top-40">
            <mt-spinner type="triple-bounce" color="#2CBC94"></mt-spinner>
          </div>
        </infinite-loading>
      </van-pull-refresh>
    </div>
    <BtnBuyingAndSelling
      v-model="bool.BuyingAndSelling"
      title="出售"
      :row="placeMsg"
      :currency="value"
    />
    <Alert v-model="bool.dialog" btn-determine-name="添加">
      买家仅支持xxx向您付款，您需要添加并开启相应的收款方式。
    </Alert>
  </div>
</template>

<script>
import HemoList from "@/components/hemo-list";
import BtnBuyingAndSelling from "./BtnBuyingAndSelling";
import { AdvTradeList, TradeVerify } from "../../../api/api";
import InfiniteLoading from "vue-infinite-loading";
import { mapState } from "vuex";

export default {
  components: {
    HemoList,
    BtnBuyingAndSelling,
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
      },
      list: [],
      loading: false,
      finished: false, //是否已加载完成，加载完成后不再触发load事件
      refreshing: false,
      page: 0,
      loading: false,
      list: [],
      placeMsg: {},
      coin:null,
    };
  },
  watch: {
    value(val){
      console.log(val);
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
  created(){
    console.log(this.value)
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
    async onList() {
      const params = {
        type: 2,
        page: this.page,
        limit: 10,
        search: {
          currency: this.current.amount_way,
          coin: this.value,
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
    onRefresh() {
      this.page = 0;
      this.onList();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async btnClick(row) {
      const result = await TradeVerify({ type: 1, advId: row.id });
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
      }
      this.placeMsg = row;
      console.log(this.placeMsg);
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