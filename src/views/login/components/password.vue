<!--
 * @Name: 设置登录密码
 * @Date: 2022-06-26 21:27:29
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 14:33:54
-->
<template>
    <P-main class="login">
        <Navigation :ClickLeft="false" @click-left="onClickLeft" />
        <h3>{{$t('设置')}}{{$t('登录')}}{{$t('密码')}}
            <div>{{$t('8-12位大写、小写英文字母及数字组合')}}</div>
        </h3>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="password">
                <P-input :title="$t('输入密码')" v-model="ruleForm.password" :show-password="true"
                    :placeholder="$t('请输入密码')" />
            </el-form-item>

            <el-form-item prop="confirmPassword" class="m-0-b-i">
                <P-input :title="$t('再次输入密码')" v-model="ruleForm.confirmPassword" :show-password="true"
                    :placeholder="$t('请再次输入密码')" />
            </el-form-item>
        </el-form>

        <P-button type="primary" class="btn-primary h-44-i m-60-t-i" @click="submitForm('ruleForm')">{{$t(btnName)}}
        </P-button>
    </P-main>
</template>

<script>
export default {
    props: {
        btnName: {
            type: String,
            default: '注册'
        }
    },
    data() {
        let confirmPassword = (rule, value, callback) => {
            if (this.ruleForm.password == value) {
                callback();
            } else {
                callback(new Error(this.$t('两次密码不正确请重新输入')));
            }
        }

        return {
            ruleForm: {
                password: '',
                confirmPassword: ''
            },
            rules: {
                password: [
                    { required: true, message: this.$t('请输入密码'), trigger: 'blur' },
                    { min: 8, max: 12, message: this.$t('长度在8到12个字符'), trigger: 'blur' },
                    { validator: new RegExp().password, trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: this.$t('请输入确认密码'), trigger: 'blur' },
                    { validator: confirmPassword, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('click', this.ruleForm)
                }
            });
        },
        onClickLeft() {
            this.$emit('click-left')
        }
    }
};
</script>