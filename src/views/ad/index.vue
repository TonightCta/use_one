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
      <!-- <P-list
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
      </P-list> -->
      <div class="adv-list-parent">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <ul class="adv-list">
            <li
              v-for="(row, index) in advList"
              :key="index"
              :class="row.adv_type == 2 ? 'green-color' : 'red-color'"
            >
              <!-- 标题信息 -->
              <div class="adv-title">
                <p class="title-msg">
                  <span></span>{{ row.adv_type == 2 ? "购买" : "出售" }}&nbsp;{{
                    row.coin
                  }}
                </p>
                <div>
                  <span>{{ row.status_text }}</span>
                  <van-switch
                    v-if="row.status == 1 || row.status == 2"
                    active-color="#2CBC94"
                    inactive-color="#ccc"
                    v-model="row.checked"
                    @change="upAdvStatusEv(row)"
                    size="16"
                  />
                </div>
              </div>
              <!-- 广告信息 -->
              <div
                class="adv-content"
                @click="
                  $router.push('/advertisingfordetails');
                  $store.commit('current/upAdvID', row.id);
                "
              >
                <div class="price-msg">
                  <p>
                    <span>数量</span>{{ row.amount.toFixed(2) }}&nbsp;{{
                      row.coin
                    }}
                  </p>
                  <p>
                    <span>限额</span>{{ row.min_currency.toFixed(2) }}-{{
                      row.max_currency.toFixed(2)
                    }}&nbsp;{{ row.currency }}
                  </p>
                </div>
                <div class="price-limit">
                  <p>单价</p>
                  <p class="with-color">
                    <span>{{ row.currency_symbol }}</span
                    >{{ row.price.toFixed(2) }}
                  </p>
                </div>
              </div>
              <!-- 操作信息 -->
              <div class="adv-footer">
                <div class="pay-way">
                  <p v-for="(pay, index) in row.payments" :key="index">
                    <img :src="pay.logo" alt="" />
                  </p>
                </div>
                <div
                  class="iconfont icon-qita"
                  @click="operation(row)"
                  v-if="row.status == 1 || row.status == 2"
                ></div>
              </div>
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
    </P-body>
    <Screening v-model="bool.Screening" @click="getFilter" />
    <P-select
      v-model="bool.moreAndMore"
      :list="select"
      cancelText="取消"
      @select="moreOperations"
    />
    <Alert
      type="typography"
      @click="upAdvStatusEv(null, advID)"
      v-model="bool.closeTheAd"
      title="确认关闭广告?"
    >
      若您已向卖家付款，请勿取消订单，否则可能会导致资金损失。若当日取消超过3次将会禁止交易。
    </Alert>
    <P-suspension-add @click="goRelease" />
    <!-- 申请成为商家 -->
    <Alert
      title="提示"
      v-model="bool.goChant"
      @click="$router.push('/chant-application')"
    >
      <p class="text-center">您尚未成为商家，是否前往申请？</p>
    </Alert>
    <!-- 设置昵称 -->
    <Alert
      v-model="bool.setNickName"
      title="设置昵称"
      @click="submitNickname"
      btnDetermineName="添加"
    >
      <div class="set-nickname">
        <p>
          <span class="iconfont icon-attention"></span>
          发布广告需设置法币账户昵称，完成设置后不可修改。
        </p>
        <input type="text" placeholder="请输入昵称" v-model="nickname" />
      </div>
    </Alert>
  </P-main>
</template>

<script>
import AdvertisingList from "@/components/advertising-list";
import Screening from "./components/screening";
import { mapState } from "vuex";
import { SetNickname, AdvList, Types, UpAdvStatus } from "../../api/api";
import InfiniteLoading from "vue-infinite-loading";
import { setTypes } from "../../utils";
export default {
  components: {
    AdvertisingList,
    Screening,
    InfiniteLoading,
  },
  data() {
    return {
      bool: {
        ScreeningClass: false,
        Screening: false,
        ScreeningBool: true,
        moreAndMore: false,
        closeTheAd: false,
        goChant: false,
        setNickName: false,
      },
      nickname: "",
      select: [{ name: "修改" }, { name: "关闭广告", color: "#FD5656" }],
      advList: [], //广告列表
      advListSec: [],
      page: 0,
      loading: false,
      advID: null,
      arr2: [],
      arr3: [],
      arr4: [],
    };
  },
  watch: {
    "bool.Screening"(v) {
      if (!v) {
        this.openScreening(false);
      }
    },
  },
  computed: {
    ...mapState(["current"]),
  },
  created() {
    // this.getFilterAdv();
    // this.getAdvList();
  },
  mounted() {},
  methods: {
    //筛选类型
    getFilter(_params) {
      this.getAdvList(_params);
      this.bool.Screening = false;
    },
    //获取广告列表
    async getAdvList(_params) {
      const result = await AdvList({
        page: this.page,
        limit: 10,
        search: _params ? _params : {},
      });
      const types = await Types({ scene: "AdsStatus" });
      if (this.page > 1) {
        result.data.list.forEach((e) => {
          this.advList.push(e);
        });
      } else {
        this.advList = result.data.list;
      }
      this.advList.forEach((e) => {
        this.$set(e, "checked", e.status == 1 ? true : false);
        this.$set(e, "type_text", e.type == 1 ? "出售" : "购买");
      });
      this.advList = setTypes(this.advList,types.data.map)
      return result;
    },
    async loadMoreEvent($state) {
      //   this.state = $state;
      //   this.loadMoreDom = true;
      this.page += 1;
      const result = await this.getAdvList();
      const { data } = result;
      if (this.advList.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    //更新广告状态
    async upAdvStatusEv(_row, _status) {
      const params = {
        id: _status ? _status : _row.id,
        status: _status ? 3 : _row.status == 1 ? 2 : 1,
      };
      const result = await UpAdvStatus(params);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$toast.success({
        message: "修改成功",
        forbidClick: true,
      });
      this.getAdvList();
      this.bool.closeTheAd = false;
    },
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
      this.advID = row.id;
    },
    //更多操纵
    moreOperations(action, index) {
      if (index === 1) {
        this.bool.closeTheAd = true;
      } else {
        this.$router.push({
          path: "/release",
          query: {
            id: this.advID,
          },
        });
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
      // this.onList();
      this.page = 0;
      this.getAdvList();
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    //发布广告
    goRelease() {
      //  href="/release"/
      if (!this.current.account.security) {
        this.$router.push("/login?ReturnUrl=/");
        return;
      }
      const { merchant } = this.current.account.security;
      const { merchant_name } = this.current.account.merchantInfo;
      if (merchant == 0) {
        this.bool.goChant = true;
        return;
      }
      if (!merchant_name) {
        this.bool.setNickName = true;
        return;
      }
      this.$router.push("/release");
    },
    //设置昵称
    async submitNickname() {
      if (!this.nickname) {
        this.$toast("请输入昵称");
        return;
      }
      const result = await SetNickname({ merchant_name: this.nickname });
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      await this.$store.dispatch("current/upUserInfo");
      this.$toast("设置成功");
      this.$router.push("/release");
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.navigation {
  /deep/.van-nav-bar {
    z-index: 9999;
  }
}
</style>