<!-- 视频证明 -->
<template>
  <div class="stwp-two step-public">
    <p class="step-title">视频证明</p>
    <div class="step-content">
      <div class="content-msg">
        <p>
          请手持身份证正面，朗读以下范本并进行视频录制（保证声音和影像清晰）
        </p>
        <div class="up-video" :class="file && 'has-file'">
          <input type="file" accept="video/*" @change="upVideo" />
          <img
            v-if="!file"
            :src="require('../../../assets/images/up_video.png')"
            alt=""
          />
          <div class="re-up" v-else>
            <p class="iconfont icon-shangchuan-copy"></p>
            <p>从新上传</p>
          </div>
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
            @click="$emit('upStep', 1)"
            >上一步</P-button
          >
          <P-button type="primary" class="btn-primary" @click="upSetFile"
            >下一步</P-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChantStepThree,PublicUpFile } from "../../../api/api";

export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    upVideo($e) {
      this.file = $e.target.files[0];
    },
    //上传视频
    async upSetFile() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const formdata = new FormData();
      formdata.append('video',this.file);
      // const file = await PublicUpFile(formdata);
      // if(file.code != 200){
      //   this.$toast('上传失败，请稍后再试');
      //   return;
      // }
      const result = await ChantStepThree(formdata);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$emit("upStep", 3);
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./step.less");
.step-content {
  width: 100%;
  height: calc(100vh - 48px - 156px - 48px);
}
.content-msg {
  padding: 10px 12px !important;
  p {
    font-size: 14px;
    color: #666;
    span {
      color: #395cff;
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
    .re-up {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .iconfont {
        font-size: 36px;
        color: white;
      }
      p {
        font-size: 12px;
        color: white;
      }
    }
  }
  .has-file {
    background-image: url("../../../assets/images/video_bg.png");
    background-size: 100% 100%;
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