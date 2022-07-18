<!-- 视频证明 -->
<template>
  <div class="stwp-two step-public">
    <p class="step-title">身份证明</p>
    <div class="step-content">
      <div class="content-msg">
        <p class="msg-title">请上传身份证照片</p>
        <div class="up-pic">
          <ul>
            <li v-for="(pic, index) in picList" :key="index">
              <img :src="require('../../../assets/images/up_pic.png')" alt="" />
              <p>{{ pic.title }}</p>
              <input type="file" accept="image/*" />
            </li>
          </ul>
        </div>
        <p class="msg-remark">
          *拍摄时，手持身份证人像面，将持证的手臂和上身整个拍进照片，脸部、身份证上所有信息清晰且不能被遮挡。
        </p>
        <p class="msg-remark">*仅支持 .jpg/.jpeg/.png格式</p>
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
          <P-button type="primary" class="btn-primary">下一步</P-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picList: [
        {
          title: "上传身份证人像面",
          file: "",
        },
        {
          title: "上传身份证国徽面",
          file: "",
        },
        {
          title: "上传手持身份证",
          file: "",
        },
      ],
    };
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
  .msg-title {
    color: #333;
    font-weight: bold;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    color: #999999;
  }
  .up-pic {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 47%;
        height: 108px;
        border: 1px dashed #d8dbe4;
        border-radius: 4px;
        margin-bottom: 12px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          font-size: 14px;
          margin-top: 8px;
          color: #c3cad2;
        }
        img {
          width: 44px;
          height: 44px;
        }
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
        }
      }
    }
    ul::after {
      display: none;
    }
    ul::before {
      display: none;
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