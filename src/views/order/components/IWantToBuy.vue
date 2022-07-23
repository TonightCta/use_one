<!--
 * @Name: 订单列表组件
 * @Date: 2022-06-17 16:47:03
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 20:19:49
-->
<template>
  <div class="going-order">
    <div>
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <ul>
          <li v-for="(row, index) in list" :key="index">
            <Order-list :row="row"></Order-list>
          </li>
        </ul>
        <infinite-loading
          spinner="spiral"
          @infinite="loadMoreEvent"
          :distance="0"
        >
          <div slot="spinner">
            <mt-spinner type="triple-bounce" color="#2CBC94"></mt-spinner>
          </div>
        </infinite-loading>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import OrderList from "@/components/order-list";
import { OrderListService, Types } from "../../../api/api";
import { setTypes } from "../../../utils/index";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    OrderList,
    InfiniteLoading,
  },
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    type:{
      type:Number,
      default:1,
    }
  },
  data() {
    return {
      list: [],
      page: 0,
      loading: false,
    };
  },
  created() {
    // this.getOrderList();
  },
  methods: {
    //获取订单列表
    async getOrderList() {
      const types = await Types({ scene: "AdsOrderStatus" });
      console.log(this.value);
      const params = {
        page: this.page,
        limit: 10,
        search: {
          group_status: this.type,
          status: this.value,
        },
      };
      const result = await OrderListService(params);
      console.log(result);
      this.list = result.data.list;
      this.list.forEach((e) => {
        this.$set(
          e,
          "end_time_temp",
          new Date(e.expires_at).getTime() - new Date().getTime()
        );
      });
      this.list = setTypes(this.list, types.data.map);
      return result;
    },
    onRefresh() {
      this.page = 0;
      this.getOrderList();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async loadMoreEvent($state) {
      //   this.state = $state;
      //   this.loadMoreDom = true;
      this.page += 1;
      const result = await this.getOrderList();
      const { data } = result;
      if (this.list.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
  },
};
</script>
<style lang="less" scoped>
.going-order {
  /deep/.van-pull-refresh{
    height: 80vh;overflow: auto;
  }
  ul {
    li {
      padding: 12px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
    }
  }
}
</style>