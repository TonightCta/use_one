<template>
  <div class="real-auth">
    <Navigation title="实名认证" />
    <div class="real-content">
      <img :src="require('../../../assets/images/real_icon.png')" alt="" />
      <p class="real-remark">
        实名认证过程需要确认证件的以下信息，否则会导致认证失败
      </p>
      <ul>
        <li v-for="(way, index) in way" :key="index">
          <p class="way-point"></p>
          <p>{{ way }}</p>
        </li>
      </ul>
      <p class="un-way">查看禁止国家/地区列表</p>
      <P-button type="primary" class="btn-primary">开始认证</P-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      way: [
        "证件年龄不得低于18岁以下",
        "上传的证件信息没有在其他账号上认证过",
        "需要政府发放的证件原件，不支持纸质版证件或其它无法律效应的证件",
        "不支持复印、打印、黑白色照片以及磨损严重的证件",
        "发布证件的国家/地区不在禁止服务的列表中查看禁止国家1地区列表",
      ],
    };
  },
  components: {
    Navigation: (resolve) =>
      require(["../../../components/nav/Navigation"], resolve),
  },
};
</script>

<style lang="scss" scoped>
.real-content {
  padding: 42px 12px;
  text-align: center;
  img {
    width: 120px;
    height: 120px;
    margin-bottom: 38px;
  }
  .real-remark {
    font-size: 14px;
    color: #333;
    text-align: left;
    margin-bottom: 24px;
  }
  ul {
    padding-left: 12px;
    li {
      display: flex;
      text-align: left;
      align-items: center;
      margin-bottom: 8px;
      .way-point {
        width: 4px;
        height: 4px;
        background: #999;
        border-radius: 50%;
        margin-right: 8px;
      }
      p{
        font-size: 14px;
        color: #666;
      }
    }
  }
  .un-way{
    text-align: left;
    margin-top: 10px;
    font-size: 14px;
    color: #2CBC94;
    margin-bottom: 22px;
  }
}
</style>