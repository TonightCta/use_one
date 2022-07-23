<!--
 * @Name: 筛选
 * @Date: 2022-06-30 11:15:34
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:37:51
-->
 <template>
  <P-popup class="popup-cell" v-model="val" position="top">
    <P-cell :list="list" theme="cell">
      <template #title="scope">
        {{ scope.row.title }}
      </template>
      <template #label="scope">
        <div class="ui-grid-3">
          <P-button-A
            v-for="(item, index) in scope.row.list"
            :key="index"
            :index="index"
            v-model="scope.row.active"
            @click.native="emitFilter(item)"
          >
            <span>{{ item.title }}</span>
          </P-button-A>
        </div>
      </template>
    </P-cell>
    <div class="ui-grid-2 b-mar-20-t">
      <P-button type="default" class="btn-fei-1" @click="resetFilter"
        >重置</P-button
      >
      <P-button type="primary" class="btn-primary h-42-i" @click="turnFilter"
        >确定</P-button
      >
    </div>
  </P-popup>
</template>
 
 <script>
import { CoinList, Types } from "../../../api/api";
import { setTypes } from "../../../utils";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      val: false,
      list: [
        {
          title: "类型",
          active: 0,
          list: [
            { title: "全部", val: null },
            { title: "购买", vla: 2 },
            { title: "出售", val: 1 },
          ],
        },
        {
          title: "币种",
          active: 0,
          list: [
            { title: "全部" },
            { title: "USDT" },
            { title: "BTC" },
            { title: "AITD" },
            { title: "ETH" },
            { title: "XRP" },
          ],
        },
        {
          title: "状态",
          active: 0,
          list: [
            { title: "全部" ,val:null},
            { title: "接单中" },
            { title: "已下架" },
            { title: "已完成" },
            { title: "已关闭" },
          ],
        },
      ],
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function (v) {
        this.val = v;
      },
    },
    val(v) {
      this.$emit("input", v);
    },
  },
  computed: {},
  created() {
    this.getCoinList();
  },
  mounted() {},
  methods: {
    //获取筛选币种列表 & Type设置
    async getCoinList() {
      const result = await CoinList();
      const types = await Types({ scene: "AdsStatus" });
      let arr = [];
      result.data.coins.forEach((e) => {
        const item = {
          title: e.coin,
          val: e.coin,
        };
        arr.push(item);
      });
      arr.unshift({ title: "全部", val: null });
      this.list[1].list = arr;
      this.list[2].list = setTypes(this.list[2].list,types.data.map);
    },
    resetFilter() {
      this.list.forEach((e) => {
        this.$set(e, "active", 0);
      });
    },
    turnFilter() {
      const params = {
        type: this.list[0].list[this.list[0].active].val,
        coin: this.list[1].list[this.list[1].active].val,
        status: this.list[2].list[this.list[2].active].val,
      };
      this.$emit("click", params);
    },
    emitFilter(_item) {
      //   this.$emit("click", _item.title);
      //   console.log(_item);
    },
  },
};
</script>

<style lang="less" scoped>
.popup-cell {
  padding-top: 10px;
  /deep/.van-cell {
    padding: 0px;
    margin-top: 10px;
    .van-cell__title {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
      line-height: 20px;
      .van-cell__label {
        margin-top: 10px;
      }
    }
  }
}
</style>