<template>
  <P-main>
    <Navigation
      title="我的广告"
      :left-arrow="false"
      :class="[bool.ScreeningClass ? 'navigation' : '']"
    >
      <template #right>
        <B-svg name="shaixuan" @click="openScreening(true)" />
      </template>
    </Navigation>
    <P-body type="Fei">
      <P-list
        ref="P-list"
        :footer="true"
        theme="card"
        @refresh="onRefresh"
        @load="onList"
      >
        <template v-slot="{ row }">
          <B-a :href="`/advertisingfordetails/${row.id}`">
            <Advertising-list
              :name="row.name"
              :Price="row.Price"
              :badge="row.number"
              :date="row.datetime"
              :state="row.number"
              @operation="operation(row)"
            />
          </B-a>
        </template>
      </P-list>
    </P-body>
    <Screening v-model="bool.Screening" />
    <P-select
      v-model="bool.moreAndMore"
      :list="select"
      cancelText="取消"
      @select="moreOperations"
    />
    <Alert type="typography" v-model="bool.closeTheAd" title="确认关闭广告?">
      若您已向卖家付款，请勿取消订单，否则可能会导致资金损失。若当日取消超过3次将会禁止交易。
    </Alert>
    <P-suspension-add href="/release" />
  </P-main>
</template>

<script>
import AdvertisingList from "@/components/advertising-list";
import Screening from "./components/screening";

export default {
  components: {
    AdvertisingList,
    Screening,
  },
  data() {
    return {
      bool: {
        ScreeningClass: false,
        Screening: false,
        ScreeningBool: true,
        moreAndMore: false,
        closeTheAd: false,
      },
      select: [{ name: "修改" }, { name: "关闭广告", color: "#FD5656" }],
    };
  },
  watch: {
    "bool.Screening"(v) {
      if (!v) {
        this.openScreening(false);
      }
    },
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    openScreening(bool) {
      if (this.bool.ScreeningBool) {
        this.bool.ScreeningBool = false;
        if (this.bool.ScreeningClass) {
          if (bool) {
            this.bool.Screening = !this.bool.Screening;
          }
          setTimeout(() => {
            this.bool.ScreeningClass = false;
            this.bool.ScreeningBool = true;
          }, 500);
        } else {
          this.bool.ScreeningClass = true;
          setTimeout(() => {
            if (bool) {
              this.bool.Screening = !this.bool.Screening;
            }
            this.bool.ScreeningBool = true;
          }, 50);
        }
      }
    },
    operation(row) {
      this.bool.moreAndMore = true;
    },
    moreOperations(action, index) {
      if (index === 1) {
        this.bool.closeTheAd = true;
      }
    },
    async onList() {
      const response = await API.GetData(this, "api/list");
      const { code, items, total } = response;
      if (code == 200) {
        this.$refs["P-list"].Add(items, total);
      }
    },
    onRefresh() {
      this.onList();
    },
  },
};
</script>

<style lang="less" scoped>
.navigation {
  /deep/.van-nav-bar {
    z-index: 9999;
  }
}
</style>