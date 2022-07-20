<!--
 * @Name: 收款方式管理
 * @Date: 2022-07-04 14:45:50
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 18:20:01
-->
<template>
  <P-main>
    <Navigation />
    <P-body type="Fei" class="m-60-b">
      <h1>收款方式管理</h1>
      <!-- <P-list ref="P-list" theme="card" :footer="true" @refresh="onRefresh" @load="onList">
                <template v-slot="{row}">
                    <div class="cardPackage ui-flex-center">
                        <B-a :href="`/bankcard/operation/${row.id}`">
                            <div class="ui-flex-left">
                                <B-svg name="qianBao" width="14px" />
                                <div class="whereItIs">{{row.id}}-{{ cardType(row.p_id) }} {{row.bank}}</div>
                                <div class="INR">{{current.amount_way}}</div>
                            </div>
                            <div class="ui-flex-left info">
                                <div>{{row.username}}</div>
                                <div class="m-10-l">{{row.account}}</div>
                            </div>
                        </B-a>
                        <div>
                            <B-switch v-model="row.status" open="" close="" size="default" @on-change="updateStatus"
                                :item="row" />
                        </div>
                    </div>
                </template>
                <template #footer>
                    <ul class="ui-list-xing">
                        <li><span class="ui-col-hong">请确保您设置的账户为本人实名账户</span>，非本人实名账户收款会导致订单失败且账号被冻结</li>
                        <li>向买家仅展示已开启的收款账号</li>
                    </ul>
                </template>
            </P-list> -->

      <div class="card-list">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <ul>
            <li v-for="(card, index) in cardList" :key="index">
              <div class="card-msg">
                <p class="iconfont icon-a-bianzu3beifen" type="icon"></p>
                <div class="bank-name">
                  <div class="flex-box">
                    <p>
                      {{ card.id }}-{{ cardType(card.p_id) }} {{ card.bank }}
                    </p>
                    <p class="label-cur">{{ current.amount_way }}</p>
                  </div>
                  <p>{{ card.username }}&nbsp;&nbsp;{{ card.account }}</p>
                </div>
              </div>
              <div class="card-oper">
                <van-switch
                  v-model="card.checked"
                  @change="upCardStatus(card.id, card.checked)"
                  size="18px"
                  active-color="#2CBC94"
                  inactive-color="#f8f8f8"
                />
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
            <div slot="no-more">没有更多了</div>
            <div slot="no-results">没有数据了</div>
          </infinite-loading>
          <p class="other-li m-t-22">
            *<span class="ui-col-hong">请确保您设置的账户为本人实名账户</span
            >，非本人实名账户收款会导致订单失败且账号被冻结
          </p>
          <p class="other-li m-b-60">向买家仅展示已开启的收款账号</p>
        </van-pull-refresh>
      </div>
    </P-body>
    <Foo-ter>
      <P-button
        type="primary"
        class="btn-primary h-44-i"
        @click="$router.push('/bankcard/addtype')"
        >添加收款方式</P-button
      >
    </Foo-ter>
  </P-main>
</template>

<script>
import { mapState } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
export default {
  data() {
    return {
      params: {
        page: 1,
        limit: 10,
      },
      typeList: [],
      loading: false,
      cardList: [],
      checked: false,
    };
  },
  computed: {
    ...mapState(["current"]),
  },
  components: {
    InfiniteLoading,
  },
  created() {
    // this.onList();
  },
  mounted() {
    this.onType();
  },
  methods: {
    onRefresh() {
      this.onList();
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async onType() {
      const responseMap = await API.GetData(this, "card/map");
      this.typeList = responseMap;
    },
    async loadMoreEvent($state) {
      this.params.limit += 1;
      const result = await this.onList();
      const { data } = result;
      if (this.cardList.length == data.total) {
        $state.complete();
      } else {
        $state.loaded();
      }
    },
    async onList() {
      //   API.GetData(this, "card/list", this.params).then(response => {
      //       const { code, data, message } = response
      //       if (code == 200) {
      //           const { list, total } = data
      //           this.$refs['P-list'].Add(list, total)
      //       } else {
      //           this.$refs['P-list'].onOverlay(false)
      //           this.$toast.fail(message);
      //       }
      //   }).catch(error => {
      //       this.$toast.fail(error);
      //   });
      //   this.params.page++;
      const result = await API.GetData(this, "card/list", this.params);
      const { data } = result;
      const { list } = data;
      this.cardList = list;
      this.cardList.forEach((e) => {
        this.$set(e, "checked", e.status == 1 ? true : false);
      });
      return result;
    },
    // onRefresh() {
    //   this.params.page = 0;
    //   this.onList();
    // },
    cardType(id) {
      let row = this.typeList.filter((item) => {
        if (item.id === id) {
          return item;
        }
      });
      let name = "未知";
      if (row.length != 0) {
        name = row[0].name;
      }
      return name;
    },
    async upCardStatus(_id, _status) {
      const params = {
        id: _id,
        status: _status ? 1 : 0,
      };
      const result = await API.Update(this, "card/status", params);
      const { code, data, message } = result;
      if (code == 200) {
        this.form = data;
      } else {
        this.router.back(-1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
h1 {
  font-size: 22px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 22px;
}

.cardPackage {
  .whereItIs {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin: 0px 5px;
  }
  .INR {
    font-size: 10px;
    color: #666666;
    background: #efefef;
    border-radius: 2px;
    padding: 0px 5px;
    transform: scale(0.8);
  }
  .info {
    padding-top: 5px;
    padding-left: 20px;
    font-size: 12px;
    color: #666666;
  }
}

.ui-list-xing {
  margin-top: 22px;
  font-size: 12px;
  color: #999999;
}
</style>
