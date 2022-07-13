<!--
 * @Name: 忘记密码
 * @Date: 2022-06-29 11:08:30
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:57:12
-->

<template>
    <div>
        <P-main class="login registered" v-show="!bool.SelectArea">
            <Navigation />
            <h3>{{$t(title)}}</h3>

            <P-tabs v-model="active" :list="list" :lineWidth="36" />

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="p-30-t">
                <el-form-item ref="phone" prop="phone" v-if="active == 0">
                    <P-input v-model="ruleForm.phone" :iconBorder="true" :placeholder="$t('请输入手机号码')">
                        <div slot='icon'>
                            <div class="user-left ui-flex-row" @click="bool.SelectArea = true">
                                <div v-if="ruleForm.phone_prefix"><img :src="NationalNumber.logo"
                                        class="theNationalFlag"></div>
                                <div v-if="ruleForm.phone_prefix" class="name">{{ruleForm.phone_prefix}}</div>
                                <div v-if="!ruleForm.phone_prefix" class="ui-col-fei m-5-r">{{$t('请选择')}}</div>
                                <B-svg name="jianTouXia" class-name="jianTouXia" />
                            </div>
                        </div>
                    </P-input>
                </el-form-item>      

                <el-form-item prop="email" v-if="active == 1">
                    <P-input v-model="ruleForm.email" icon="icon-youxiang" :placeholder="$t('请输入邮箱')" />
                </el-form-item>
            </el-form>
            <P-button type="primary" class="btn-primary h-44-i m-60-t-i" @click="submitForm('ruleForm')">{{$t('下一步')}}
            </P-button>
        </P-main>
        <SelectArea v-model="bool.SelectArea" @click="onSelectArea" />
    </div>
</template>

<script>
import { stringify } from 'querystring';
import SelectArea from './selectArea'

export default {
    components: { SelectArea },
    props: {
        title: {
            type: String,
            default: ''
        },
        tabsActive: {
            type: Number,
            default: 0
        },
        list: {
            type: [Object, Array],
            default: () => []
        },
        phone_prefix: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        }
    },
    data() {
        const validationPhone = (rule, value, callback) => {
            if (this.ruleForm.phone_prefix == '') {
                callback(new Error(this.$t('请选择国家区号')));
            } else {
                if (value.length != 11) {
                    callback(new Error(this.$t('手机号应为11位数')));
                } else {
                    if (value.RegExp("手机")) {
                        callback();
                    } else {
                        callback(new Error(this.$t('手机号格式错误')));
                    }
                }
            }
        }

        return {
            bool: {
                SelectArea: false
            },
            active: 0,
            NationalNumber: {
                logo: ''
            },
            ruleForm: {
                phone_prefix: '',
                phone: '',
                email: ''
            },
            rules: {
                phone: [
                    { required: true, message: this.$t('请输入手机号码'), trigger: 'blur' },
                    { validator: validationPhone, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: this.$t('请输入邮箱'), trigger: 'blur' },
                    { validator: new RegExp().email, trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        active(v) {
            this.$emit('update:tabsActive', v)
        },
        tabsActive: {
            immediate: true,
            handler: function (v) {
                this.active = v
            }
        },
        phone_prefix: {
            immediate: true,
            handler: function (v) {
                this.ruleForm.phone_prefix = v
            }
        },
        phone: {
            immediate: true,
            handler: function (v) {
                this.ruleForm.phone = v
            }
        },
        email: {
            immediate: true,
            handler: function (v) {
                this.ruleForm.email = v
            }
        },
    },
    methods: {
        onSelectArea(row) {
            this.NationalNumber = row
            this.ruleForm.phone_prefix = row.prefix
            this.$refs.phone.clearValidate();
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.checkAvailable()
                }
            });
        },
        async checkAvailable() {
            // console.log(typeof parseInt(this.list[this.active].id))
            // console.log(typeof this.ruleForm.email)
            // console.log(typeof this.ruleForm.phone)
            // console.log(typeof this.ruleForm.phone_prefix)
            // return
            let response = await this.$store.dispatch('registered/checkAvailable', {
                type: parseInt(this.list[this.active].id),
                email: this.ruleForm.email ? this.ruleForm.email : '',
                phone: this.ruleForm.phone,
                phone_prefix: String(this.ruleForm.phone_prefix)
            })
            this.$emit('click', response, this.ruleForm)
        }
    }
};
</script>

<style lang="less" scoped>
.registered {
    .theNationalFlag {
        height: 15px;
        width: 15px;
    }
    .user-left {
        .jianTouXia {
            width: 13px;
            height: 13px;
            fill: #2cbc94;
        }
        .name {
            color: #2cbc94;
            margin: 0px 3px;
        }
    }
    /deep/.van-tabs {
        .van-tab {
            margin-right: 20px;
            .van-tab__text--ellipsis {
                font-size: 16px;
                color: #666666;
            }
            &.van-tab--active {
                .van-tab__text--ellipsis {
                    color: #333333;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>
