<!--
  * @NAME 安全中心
  * @DATE 2022-07-13
  * @AUTHOR CT
-->
<template>
  <div class="safty-center">
    <Navigation title="安全中心" />
    <div class="list-top">
      <van-cell
        is-link
        :value="cell.val"
        v-for="(cell, index) in listTop"
        :key="index"
        :to="cell.url"
      >
        <template #title>
          <div class="cell-title">
            <p class="iconfont" :class="cell.icon" type="icon"></p>
            <p>{{ cell.title }}</p>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="list-top">
      <van-cell
        is-link
        value="设置"
        v-for="(cell, index) in listBottom"
        :key="index"
        :to="cell.url"
      >
        <template #title>
          <div class="cell-title">
            <p class="iconfont" :class="cell.icon" type="icon"></p>
            <p>{{ cell.title }}</p>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
      return{
        listBottom:[
          {
            icon:'icon-weibiaoti--',
            title:'登录密码',
            url:'/reset-password',
          },
          {
            icon:'icon-jiaoyiguanli',
            title:'交易密码',
            url:'/auth-trade'
          },
        ]
      }
    },
    computed:{
      ...mapState(['current']),
      listTop(){
        return [
          {
            icon:'icon-youxiang',
            title:'邮箱认证',
            url:'/auth-email',
            val:this.current.account.email ? '修改' : '设置'
          },
          {
            icon:'icon-shouji-2',
            title:'手机认证',
            url:'/auth-phone',
            // url:'/edit-phone'
            val:this.current.account.phone ? '修改' : '设置'
          },
          {
            icon:'icon-gicon',
            title:'谷歌认证',
            url:'/auth-google',
            val:this.current.account.security.ga == 1 ? '解除' : '绑定'
          },
        ]
      }
    },
    components:{
        Navigation:resolve => require(['../../../components/nav/Navigation'],resolve)
    }
}
</script>

<style lang="less" scoped>
.safty-center {
  width: 100%;
  height: 100vh;
  background: #f2f2f2;
  .list-top {
    margin-top: 6px;
    .cell-title {
      display: flex;
      align-items: center;
      p[type="icon"] {
        font-size: 16px;
        border-radius: 50%;
        margin-right: 6px;
        color: #333;
      }
    }
  }
}
</style>