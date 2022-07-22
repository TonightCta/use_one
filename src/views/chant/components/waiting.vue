<!-- 等待审核 -->
<template>
  <div class="step-public waiting-chant">
    <img :src="require('../../../assets/images/chant_step.png')" alt="" />
    <h3>您的申请已提交！</h3>
    <p>审核专员将会在一个工作日内与您联系，</p>
    <p>请保持联系电话通畅。</p>
    <P-button type="primary" class="btn-primary" @click="$router.push('/')">好的</P-button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("./step.less");
.waiting-chant {
  text-align: center;
  img {
    margin-top: 72px;
    width: 128px;
    height: 128px;
  }
  h3{
    font-size: 18px;
    font-weight: 500;
    color: #333;
    margin-bottom: 6px;
  }
  p{
    font-size: 12px;
    color:#999;
  }
  button{
    margin-top: 60px;
    background: #6580FF;
    width: 215px;
    font-size: 16px;
  }
}
</style>