<!-- 绑定验证 -->
<template>
  <div class="need-auth">
    <P-popup v-model="accordingTo" :head="false">
      <div class="head auth-title">
        <p>请完成认证和绑定</p>
        <p class="iconfont icon-a-bianzu3" type="icon"></p>
      </div>
      <p class="title-remark">为了保障您的交易安全，需要完成以下条件。</p>
      <p class="label-line"></p>
      <div class="auth-step">
        <div class="current-icon">
          <p class="iconfont icon-haoyourenzheng" type="icon"></p>
          <p>实名认证</p>
          <p>
            已完成
            <span class="iconfont icon-a-bianzu3" type="icon"></span>
          </p>
        </div>
        <div class="only-icon">
          <p class="iconfont icon-a-bianzu91" type="icon"></p>
        </div>
        <div class="current-icon">
          <p class="iconfont icon-mima-3" type="icon"></p>
          <p>交易密码</p>
          <p>
            去设置
            <span class="iconfont icon-a-bianzu3" type="icon"></span>
          </p>
        </div>
      </div>
    </P-popup>
  </div>
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
      accordingTo: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function (v) {
        this.accordingTo = v;
      },
    },
    accordingTo(v) {
      this.$emit("input", v);
    },
  },
};
</script>

<style lang="less" scoped>
.auth-title {
  display: flex;
  align-items: center;
  p:first-child {
    font-size: 16px;
    color: #333;
  }
  p[type="icon"] {
    font-size: 14px;
    color: #09bb07;
    margin-left: 4px;
  }
}
.title-remark {
  font-size: 12px;
  color: #999;
}
.label-line {
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 10px 0 16px 0;
}
.auth-step {
  display: flex;
  justify-content: space-around;
  align-items: center;
  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .current-icon{
    p:first-child{
        font-size: 34px;
        color: #333;
    }
    p:nth-child(2){
        font-size: 14px;
        color: #333;
        margin: 3px 0 8px 0;
    }
    p:last-child{
        font-size: 12px;
        span{
            font-size: 12px;
        }
    }
  }
  .only-icon{
    .iconfont{
        font-size: 22px;
    }
  }
}
</style>