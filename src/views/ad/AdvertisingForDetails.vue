<!--
 * @Name: 广告详情
 * @Date: 2022-06-30 17:02:37
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 17:53:19
-->
<template>
  <P-main>
    <Navigation title="广告详情" :editor-switch="true" />
    <div class="head ui-flex-lh">
      <div class="ui-flex-center">
        <div class="ui-flex-row">
          <div class="h4">{{ detailMsg.adv_type == 2 ? "购买" : "出售" }}</div>
          <div class="size-18">
            <mt-spinner
              v-if="!detailMsg.coin"
              type="triple-bounce"
              color="white"
            ></mt-spinner>
            <span v-else>{{ detailMsg.coin }}</span>
          </div>
          <span class="iconfont icon-qiehuan m-5-lr"></span>
          <div class="size-18">
            <mt-spinner
              v-if="!detailMsg.currency"
              type="triple-bounce"
              color="white"
            ></mt-spinner>
            <span v-else>{{ detailMsg.currency }}</span>
          </div>
        </div>
        <div class="size-14">{{ detailMsg.status_text }}</div>
      </div>
      <div class="ui-flex-center">
        <div class="ui-flex-left size-12">
          <div class="m-5-r">广告编号</div>
          <ul class="ui-list ui-list-hx">
            <li>{{ detailMsg.adv_sn }}</li>
            <li>
              <P-copy :value="detailMsg.adv_sn">
                <B-svg name="copy-1" class-name="copy"></B-svg>
              </P-copy>
            </li>
          </ul>
        </div>
        <B-switch
          v-model="switcha"
          v-if="detailMsg.status == 1 || detailMsg.status == 2"
          open="OFF"
          close="ON"
          trueColor="#0A8F6A"
          falseColor="#0A8F6A"
        />
      </div>
    </div>
    <div class="body">
      <P-cell :list="list" theme="cell" class="p-5-t">
        <template #value_0="scope">
          <div class="theAmountOf">
            <div class="fh">
              {{ detailMsg.currency_symbol }}
            </div>
            <div class="jg">
              <mt-spinner
                v-if="!detailMsg.currency"
                type="triple-bounce"
                color="#2CBC94"
              ></mt-spinner>
              <span v-else>{{ scope.row.value }}</span>
            </div>
          </div>
        </template>
        <template #value_5="scope">
          <span v-if="false">{{ scope }}</span>
          <Pay-way />
        </template>
        <template #value_7="scope">
          <span v-if="false">{{ scope }}</span>
          <B-a
            @click.native="
              $router.push('/adv-detail-log')
            "
            class="orderRecord"
            >{{ scope.row.value }}单</B-a
          >
        </template>
      </P-cell>
      <div class="Footer ui-flex">
        <div class="ui-flex-1">
          <P-button
            type="danger"
            plain
            class="w-100-b btn-danger"
            @click="shutDown"
            >关闭广告</P-button
          >
        </div>
        <div
          class="ui-flex-1 m-10-l"
          @click="
            $router.push({
              path: '/release',
              query: {
                id: detailMsg.id,
              },
            })
          "
        >
          <P-button type="default" plain class="w-100-b btn-default"
            >修改</P-button
          >
        </div>
      </div>
    </div>
    <Alert
      type="typography"
      @click="closeAdv"
      v-model="bool.closeTheAd"
      title="确认关闭广告?"
    >
      关闭后该广告无法再次开启，进行中的订单不受影响。
    </Alert>
  </P-main>
</template>

<script>
import { AdvDetail, Types, UpAdvStatus } from "../../api/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      bool: {
        closeTheAd: false,
      },
      switcha: 0,
      name: "vue",
      val: "",
      detailMsg: {}, //详情信息
    };
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler: function (v) {
        this.val = v;
      },
    },
    val(v) {
      this.$emit("input", v);
    },
  },
  computed: {
    ...mapState(['current']),
    advID() {
      return this.current.advID
    },
    list() {
      const msg = this.detailMsg;
      return [
        {
          title: "总金额",
          value: Number(msg.max_currency).toFixed(4),
          border: false,
        },
        {
          title: "价格类型",
          value: msg.price_type == 1 ? "固定价格" : "浮动价格",
          border: false,
        },
        // { title: "价格溢价", value: "10%", border: false },
        {
          title: "委托数量",
          value: msg.amount,
          extra: msg.coin,
          border: false,
          style: { "margin-top": "20px" },
        },
        {
          title: "剩余数量",
          value: msg.amount_stock,
          extra: msg.coin,
          border: false,
        },
        {
          title: "单笔限额",
          value:
            Number(msg.min_currency).toFixed(2) +
            "-" +
            Number(msg.max_currency).toFixed(2),
          extra: msg.currency,
          border: false,
        },
        { title: "收款方式", border: false },
        {
          title: "发布时间",
          value: msg.time,
          extra: "",
          border: false,
        },
        {
          title: "订单记录",
          value: msg.orders_count,
          islink: true,
          border: false,
          style: { "margin-top": "20px" },
        },
      ];
    },
  },
  created() {
    this.getAdvDetail();
  },
  mounted() {},
  methods: {
    //获取广告详情
    async getAdvDetail() {
      const result = await AdvDetail(this.advID);
      console.log(result);
      this.detailMsg = result.data;
      this.switcha = this.detailMsg.status == 1 ? 1 : 0;
      const types = await Types({ scene: "AdsStatus" });
      console.log(types);
      types.data.map.forEach((e) => {
        if (this.detailMsg.status == e.val) {
          this.$set(this.detailMsg, "status_text", e.name);
        }
      });
    },
    shutDown() {
      this.bool.closeTheAd = true;
    },
    //关闭广告
    async closeAdv() {
      const result = await UpAdvStatus({ id: this.detailMsg.id, status: 3 });
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$toast("关闭成功");
      this.getAdvDetail();
    },
  },
};
</script>

<style lang="less" scoped>
.head {
  height: 98px;
  padding: 0px 12px;
  color: #ffffff;
  background: #2cbc94;
  .h4 {
    padding-left: 0px;
    padding-right: 5px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    &:before {
      width: 2px;
      height: 10px;
      margin-top: 1px;
      background: #ffffff;
    }
  }
  .copy {
    width: 17px;
    height: 17px;
  }
  .ui-list-hx {
    li:after {
      background: #ffffff;
    }
  }
  /deep/.ivu-switch {
    &.ivu-switch-large {
      transform: scale(0.7);
      margin-right: -11px;
      height: 28px;
      line-height: 28px;
      border-radius: 22px;
    }
    &:after {
      top: 4px;
    }
  }
}

.body {
  .orderRecord {
    font-size: 14px;
    font-weight: 500;
    color: #6580ff;
  }
}
</style>