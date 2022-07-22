<!--
 * @Name: 发布广告
 * @Date: 2022-07-01 14:09:15
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 09:46:19
-->
<template>
  <P-main>
    <Navigation>
      <template #title>
        <div class="nav-title">
          <div
            class="buy"
            :class="[form.type == 2 ? 'active' : '']"
            @click="tabs(2)"
          >
            购买
          </div>
          <div
            class="sell"
            :class="[form.type == 1 ? 'active' : '']"
            @click="tabs(1)"
          >
            出售
          </div>
        </div>
      </template>
    </Navigation>
    <P-body type="Fei">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="130px"
        class="main"
        label-position="left"
      >
        <van-cell-group :border="false" inset>
          <van-cell is-link @click="bool.CurrencyOption = true">
            <template #icon>
              <van-image
                width="26"
                height="26"
                :src="logo"
                v-if="logo"
                round
                lazy-load
                class="m-5-r"
              />
            </template>
            <template #title>
              {{ form.coin == "" ? "请选择币种类型" : form.coin }}
            </template>
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="m-12-t-i">
          <van-field
            @click="bool.CurrencyOptionTwo = true"
            v-model="form.currency"
            label="法币类型"
            label-width="60px"
            is-link
            placeholder="显示清除图标"
            :border="false"
          >
            <template #input>{{ form.currency }}</template>
          </van-field>
          <van-field
            v-model="form.amount"
            :label="`${form.type == 2 ? '购买' : '出售'}数量`"
            label-width="60px"
            :placeholder="`请输入${form.type == 2 ? '购买' : '出售'}数量`"
            :border="false"
          >
            <template #extra>{{ form.coin }}</template>
          </van-field>
          <van-field
            label="固定价格"
            label-width="60px"
            placeholder="固定价格"
            :border="false"
          >
            <template #input>固定价格</template>
          </van-field>
          <van-field
            v-model="form.price"
            label="单价"
            label-width="60px"
            :placeholder="adv_sick"
            :border="false"
          >
            <template #extra>{{ form.currency }}</template>
          </van-field>
          <van-cell>
            <template #title>
              <div class="ui-flex-left">
                <div class="m-5-r">
                  当前参考价格：{{
                    coinPrice != "-" ? Number(coinPrice).toFixed(4) : coinPrice
                  }}
                  {{ form.currency }}
                </div>
                <B-svg name="shuaxin-2" width="12px" @click="getCoinsPrice" />
              </div>
            </template>
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="m-12-t-i p-10-tb">
          <div class="p-16-lr">
            <div class="ui-flex-left">
              <div class="m-5-r size-12">单笔限额</div>
              <B-svg name="wenhao" class="wenhao" width="12px" />
            </div>
          </div>
          <div class="ui-flex-center m-8-t p-16-lr">
            <div>
              <van-field
                class="input"
                v-model="form.min_currency"
                label-width="60px"
                :placeholder="'最小' + minAdvNumber"
                :border="false"
              >
                <template #extra>{{ form.currency }}</template>
              </van-field>
            </div>
            <div class="m-10-lr size-12">~</div>
            <div>
              <van-field
                class="input"
                v-model="form.max_currency"
                label-width="60px"
                placeholder="最大"
                :border="false"
              >
                <template #extra>{{ form.currency }}</template>
              </van-field>
            </div>
          </div>
        </van-cell-group>

        <van-cell-group :border="false" inset class="m-12-t-i">
          <van-cell title="付款方式" is-link @click="bool.selectPay = true">
            {{ payWay ? payWay : "至少添加一种方式" }}
          </van-cell>
        </van-cell-group>

        <van-cell-group inset class="m-12-t-i">
          <van-field
            v-model="form.comment"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="可输入50字以内的备注信息（选填）"
          />
        </van-cell-group>

        <ul class="ui-list-dian">
          <li>每个币种只能同时发布上架一个出售和购买广告</li>
          <li>广告发布后，如您重新编辑以下内容，首页会重新排序</li>
          <li>每个广告有效时间为7天,到期未完成将自动下架</li>
          <li>
            广告每成交一笔，需支付广告费率。出售资产时，将从您的法币账户对应的币种资产中额外扣除。买入资产时将从您购买的资产中扣除。
          </li>
        </ul>
      </el-form>
      <div class="h-56"></div>
    </P-body>
    <div class="footer">
      <P-button type="primary" class="btn-primary h-44-i" @click="onSubmit"
        >发布广告</P-button
      >
    </div>
    <Currency-Option v-model="bool.CurrencyOption" @click="onCurrency" />
    <Currency-Option-Two
      v-model="bool.CurrencyOptionTwo"
      @click="onCurrencyTwo"
    />
    <!-- 付款选择 -->
    <PaySelect v-model="bool.selectPay" @click="selectCard" />
  </P-main>
</template>

<script>
import CurrencyOption from "@/components/currency";
import CurrencyOptionTwo from "@/components/currency/fiat";
import { CoinPrice, FaitRate, ReleaseAdv } from "../../api/api";

export default {
  components: {
    CurrencyOption,
    CurrencyOptionTwo,
    PaySelect: (resolve) =>
      require(["../../components/pay-way/pay-choose"], resolve),
  },
  data() {
    return {
      bool: {
        CurrencyOption: false,
        CurrencyOptionTwo: false,
        selectPay: false,
      },
      coinPrice: "-", //法币价格
      logo: "",
      form: {
        type: 2,
        coin: "",
        currency: "",
        amount: "", //购买数量
        price_type: 1,
        price: "", //购买价格
        min_currency: "", //最小限额
        max_currency: "", //最大限额
        payments: "",
        comment: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          { validator: new RegExp().password, trigger: "blur" },
        ],
      },
      coinsPrice: [], //币种行情价格
      payWay: null, //支付方式
      payWayID: null, //支付ID
      maxPrice: null, //单价最低限额
      minPrice: null, //单价最高价格
      minAdvNumber: 1, //最小限额
      coinRow: {},
    };
  },
  computed: {
    adv_sick() {
      return this.coinPrice != "-"
        ? this.minPrice.toFixed(4) + "-" + this.maxPrice.toFixed(4)
        : "输入交易价格";
    },
  },
  created() {
    // this.getCoinsPrice();
  },
  mounted() {},
  methods: {
    tabs(v) {
      this.form.type = v;
    },
    selectCard(_card) {
      this.payWay = _card.name;
      this.payWayID = _card.id;
    },
    onCurrency(row) {
      this.coinRow = row;
      this.minAdvNumber = row.adv_min;
      this.form.coin = row.coin;
      this.logo = row.logo;
      this.getCoinsPrice();
    },
    onCurrencyTwo(row) {
      this.form.currency = row.coin;
      this.getCoinsPrice();
    },
    //获取币种行情
    async getCoinsPrice() {
      if (!this.form.coin || !this.form.currency) {
        return;
      }
      const cur = await FaitRate(this.form.currency);
      let uPrice;
      if (this.form.coin == "USDT") {
        const u = await FaitRate("USD");
        uPrice = u.data.price;
      }
      const result = await CoinPrice();
      this.coinPrice =
        cur.data.price *
        (this.form.coin == "USDT"
          ? Number(uPrice).toFixed(4)
          : Number(Object(result.data.list)[this.form.coin].price).toFixed(4));
      this.maxPrice =
        this.coinPrice * (this.coinRow.adv_price_max_percent / 100) +
        this.coinPrice;
      this.minPrice =
        this.coinPrice * (this.coinRow.adv_price_min_percent / 100) +
        this.coinPrice;
    },
    //发布广告
    async onSubmit() {
      if (!this.form.amount) {
        this.$toast("请输入购买数量");
        return;
      }
      if (!this.form.price) {
        this.$toast("请输入交易价格");
        return;
      }
      if (this.form.price < this.minPrice || this.form.price > this.maxPrice) {
        this.$toast(`请设置${this.minPrice}-${this.maxPrice}区间的价格`);
        return;
      }
      if (!this.form.min_currency) {
        this.$toast("请输入最小限额");
        return;
      }
      if (this.form.min_currency < this.minAdvNumber) {
        this.$toast(`该币种最小单笔限额为${this.minAdvNumber}`);
        return;
      }
      if (!this.form.max_currency) {
        this.$toast("请输入最大限额");
        return;
      }
      if (!this.payWayID) {
        this.$toast("请选择付款方式");
        return;
      }
      const params = {
        type: this.form.type,
        coin: this.form.coin,
        currency: this.form.currency,
        amount: this.form.amount,
        price_type: 1,
        price: this.form.price,
        min_currency: this.form.min_currency,
        max_currency: this.form.max_currency,
        payments: String(this.payWayID),
        comment: this.comment,
      };
      const result = await ReleaseAdv(params);
      console.log(result);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.nav-title {
  display: flex;
  .buy,
  .sell {
    width: 91px;
    height: 30px;
    line-height: 30px;
    background-size: cover;
    font-size: 16px;
    font-weight: 400;
    color: #666666;
  }

  .buy {
    margin-left: 7px;
    background-image: url("~@/assets/tabs-a1.png");
    &.active {
      color: #ffffff;
      background-image: url("~@/assets/tabs-a.png");
    }
  }
  .sell {
    margin-left: -7px;
    background-image: url("~@/assets/tabs-b.png");
    &.active {
      color: #ffffff;
      background-image: url("~@/assets/tabs-b1.png");
    }
  }
}

.body {
  .USDT {
    width: 19px;
    height: 19px;
    margin-right: 5px;
    margin-top: 1px;
  }

  .wenhao {
    margin-top: -1px;
  }

  .input {
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    padding: 7px 10px;
    color: #999999;
  }

  .ui-list-dian {
    margin-top: 12px;
    padding: 12px;
    background: #e6e6e6;
    border-radius: 4px;
    li {
      margin-bottom: 3px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}

.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  background: #fff;
  padding: 6px 12px;
}
</style>