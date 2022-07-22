<!--
 * @Name: 登录
 * @Date: 2022-06-25 20:38:13
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-04 20:12:25
-->
<template>
    <div>
        <P-main class="login" v-show="!bool.SelectArea">
            <Navigation :languageSwitch="true" />
            <h3>{{$t('密码登录')}}</h3>
            <el-form :model="form" ref="form" :rules="rules" label-position="top">
                <el-form-item prop="phone" v-if="!email">
                    <P-input :title="$t('手机')" :iconBorder="true" v-model="form.phone" :placeholder="$t('请输入手机号码')">
                        <template #more>
                            <div class="email" @click="switchEmail(true)">{{$t('邮箱登录')}}</div>
                        </template>
                        <template #icon>
                            <div slot='icon'>
                                <div class="user-left ui-flex-row" @click="bool.SelectArea = true">
                                    <div v-if="form.phone_prefix"><img :src="NationalNumber.logo"
                                            class="theNationalFlag">
                                    </div>
                                    <div v-if="form.phone_prefix" class="name">{{form.phone_prefix}}</div>
                                    <div v-if="!form.phone_prefix" class="ui-col-fei m-5-r">{{$t('请选择')}}</div>
                                    <B-svg name="jianTouXia" class-name="jianTouXia" />
                                </div>
                            </div>
                        </template>
                    </P-input>
                </el-form-item>

                <el-form-item prop="email" v-if="email">
                    <P-input :title="$t('邮箱')" v-model="form.email" icon="icon-youxiang" :placeholder="$t('请输入邮箱')">
                        <template #more>
                            <div class="email" @click="switchEmail(false)">{{$t('手机登录')}}</div>
                        </template>
                    </P-input>
                </el-form-item>

                <el-form-item prop="password">
                    <P-input :title="$t('密码')" v-model="form.password" icon="icon-suoding" :show-password="true"
                        :placeholder="$t('输入您的登录密码')" />
                </el-form-item>
            </el-form>
            <P-button type="primary" class="btn-primary h-44-i m-60-t-i" @click="onSubmit('form')">{{$t('登录')}}
            </P-button>

            <div class="registered ui-flex-center m-15-t">
                <B-a href="/registered">{{$t('注册账号')}}</B-a>
                <B-a href="/forgotpassword">{{$t('忘记密码')}}?</B-a>
            </div>
        </P-main>
        <SelectArea v-model="bool.SelectArea" @click="onSelectArea"  @close-area="closeArea"/>
    </div>
</template>

<script>
import SelectArea from './components/selectArea';
import { UserInfo } from '../../api/api'

export default {
    components: { SelectArea },
    data() {
        const validationPhone = (rule, value, callback) => {
            if (this.form.phone_prefix == '') {
                callback(new Error(this.$t('请选择国家区号')));
            }else {
               callback()
            }
            // }
        }

        return {
            bool: {
                SelectArea: false
            },
            NationalNumber: {
                logo: ''
            },
            email: false,
            form: {
                phone_prefix: '',
                phone: '',
                email: '',
                password: ''
            },
            rules: {
                phone: [
                    { required: true, message: this.$t('请输入手机号码'), trigger: 'blur' },
                    { validator: validationPhone, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: this.$t('请输入邮箱'), trigger: 'blur' },
                    { validator: new RegExp().email, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('请输入密码'), trigger: 'blur' },
                    { min: 8, max: 12, message: this.$t('长度在8到12个字符'), trigger: 'blur' },
                    { validator: new RegExp().password, trigger: 'blur' }
                ]
            },
            ReturnUrl: '/index'
        }
    },
    watch: {
        '$route.query': {
            immediate: true,
            handler: function (v) {
                if (v.ReturnUrl) {
                    this.ReturnUrl = v.ReturnUrl
                }
            }
        },
    },
    methods: {
        closeArea(){
            this.bool.SelectArea = false;
        },  
        switchEmail(bool) {
            this.email = bool
            this.$refs['form'].resetFields();
        },
        onSelectArea(row) {
            this.NationalNumber = row
            this.form.phone_prefix = row.prefix
        },
        onSubmit(formName) {
            this.$refs[formName].validate((res) => {
                if (res) {
                    this.onLogin()
                }
            });
        },
        async onLogin() {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: '登录中'
            });

            const response = await this.$store.dispatch('users/login', {
                account: this.email ? this.form.email : this.form.phone,
                password: this.form.password
            })

            this.$toast.clear();

            if (response.code == 200) {
                const result = await UserInfo(response.data.access_token);
                const { code,data } = result;
                console.log(result)
                console.log(code)
                if(code != 200){
                    this.$toast('登录异常，请稍后再试');
                    router.currentRoute
                };
                this.$store.commit('current/upAccount',data)
                this.$router.push({
                    path: this.ReturnUrl
                })
            }
        }
    }
};
</script>

<style lang="less" scoped>
.email {
    height: 20px;
    font-size: 14px;
    color: #2cbc94;
}

.login {
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
}

.registered {
    font-size: 14px;
    color: #999999;
}
</style>