<!-- 视频证明 -->
<template>
  <div class="stwp-two step-public">
    <p class="step-title">视频证明</p>
    <div class="step-content">
      <div class="content-msg">
        <p>
          请手持身份证正面，朗读以下范本并进行视频录制（保证声音和影像清晰）
        </p>
        <div class="up-video">
          <input type="file" accept="video/*" />
          <img :src="require('../../../assets/images/up_video.png')" alt="" />
        </div>
        <p>
          <span>*</span>
          本人(姓名)身份证号(身份证号码)，我的资金来源合法可靠，自愿交易比特币等数字资产，本人充分了解数字货币及潜在风险，本人具有抗风险的能力并愿意承担一切风险。另外，我确定此账号所有操作均为本人操作，该账号所产生的一切法律责任，由我个人承担。
        </p>
      </div>
      <div class="content-btn">
        <div class="btn-label"></div>
        <div class="btn-box">
          <P-button
            type="primary"
            class="btn-primary default-btn"
            @click="$emit('upStep', 0)"
            >上一步</P-button
          >
          <P-button type="primary" class="btn-primary" @click="$emit('upStep',2)">下一步</P-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import url("./step.less");
.step-content{
    width: 100%;
    height: calc(100vh - 48px - 156px - 48px);
}
.content-msg {
  padding: 10px 12px !important;
  p{
    font-size: 14px;
    color: #666;
    span{
        color: #395CFF;
    }
  }
  .up-video {
    width: 100%;
    height: 175px;
    border-radius: 4px;
    border: 1px dashed #d8dbe4;
    margin: 12px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      position: absolute;
      opacity: 0;
    }
    img {
      width: 64px;
      height: 64px;
    }
  }
}
.btn-box {
  display: flex;
  .default-btn {
    width: 40%;
    margin-right: 16px;
    background: #ffffff !important;
    border: 1px solid #e6e6e6;
    color: #999999;
  }
}
</style>