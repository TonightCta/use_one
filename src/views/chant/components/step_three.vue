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
              <img
                v-if="!pic.imgSrc"
                :src="require('../../../assets/images/up_pic.png')"
                class="up-icon"
                alt=""
              />
              <p v-if="!pic.imgSrc">{{ pic.title }}</p>
              <img :src="pic.imgSrc" v-if="pic.imgSrc" class="up-img" alt="" />
              <input
                type="file"
                accept="image/*"
                @change="test($event, index)"
              />
              <div class="re-up" v-if="pic.imgSrc">
                <p class="iconfont icon-shangchuan-copy"></p>
                <p>重新上传</p>
              </div>
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
            @click="$emit('upStep', 0)"
            >上一步</P-button
          >
          <P-button type="primary" class="btn-primary" @click="submitStepTwo"
            >下一步</P-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChantStepTwo } from "../../../api/api";
export default {
  data() {
    return {
      picList: [
        {
          title: "上传身份证人像面",
          file: "",
          imgSrc: null,
        },
        {
          title: "上传身份证国徽面",
          file: "",
          imgSrc: null,
        },
        {
          title: "上传手持身份证",
          file: "",
          imgSrc: null,
        },
      ],
    };
  },
  methods: {
    test($e, index) {
      console.log($e.target.files[0]);
      const file = $e.target.files[0];
      let imgSrc;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (temp) => {
        imgSrc = temp.target.result;
        console.log(imgSrc);
        this.$set(this.picList[index], "file", file);
        this.$set(this.picList[index], "imgSrc", imgSrc);
      };

      console.log(this.picList);
    },
    //上传身份文件
    async submitStepTwo() {
    //   console.log(213);
    //   this.picList.forEach((e) => {
    //     if (!e.file) {
    //       this.$toast("请上传身份文件");
    //       return;
    //     }
    //   });
      if (!this.picList[0].file) {
        this.$toast("请上传身份证人像面");
        return;
      }
      if (!this.picList[1].file) {
        this.$toast("请上传身份证国徽面");
        return;
      }
      if (!this.picList[2].file) {
        this.$toast("请上传手持身份证");
        return;
      };
      this.$toast.loading({
        message:'加载中...',
        forbidClick:true
      })
      const formdata = new FormData();
      formdata.append("card_front", this.picList[0].file);
      formdata.append("card_back", this.picList[1].file);
      formdata.append("card_hand", this.picList[2].file);
      const result = await ChantStepTwo(formdata);
      const { code } = result;
      if (code != 200) {
        this.$toast(result.message);
        return;
      }
      this.$emit("upStep", 2);
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
        .up-icon {
          width: 44px;
          height: 44px;
        }
        .up-img {
          width: 100%;
          height: 100%;
        }
        input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: 200;
        }
        .re-up {
          position: absolute;
          z-index: 100;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            // font-weight: bold;
            color: rgba(255, 255, 255, 0.8);
          }
          p:last-child {
            color: white;
            font-size: 12px;
            transform: translateY(-12px);
          }
          .iconfont {
            font-size: 32px;
          }
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