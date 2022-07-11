/*
 * @文件类型:  语言切换
 * @地址:  https://element.eleme.cn/#/zh-CN/component/i18n
 * @作者: 鹏家公子 
 * @日期: 2020-09-01 12:36:58 
 * @上次修改人:   鹏家公子 
 * @上次修改时间: 2020-09-01 12:36:58 
 * @注释: vue页面可以用 {{ $t("message.hello") }} 获取定义的内容
 * 
 * 
 * <template>
    <div class="mail bpw-wid-350 bpw-center bpw-mar-t-200">
        <el-button type="primary" @click="language">{{locale}}</el-button>

        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item :label="$t('username')" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('password')" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.Submit')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('btn.Reset')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { logon } from "@/api/user";

export default {
    data() {
        var yzusername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                callback();
            }
        };
        var yzpassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            locale: localStorage.getItem('locale') || 'zh',
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [{ validator: yzusername, trigger: "blur", }],
                password: [
                    { validator: yzpassword, trigger: "blur" },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    logon(this.ruleForm).then((response) => {
                        if (response.length != 0) {
                            this.$notify.success({
                                title: this.$t("Systemprompt"),
                                message: "登录成功。",
                            });
                        } else {
                            this.$notify.error({
                                title: this.$t("Systemprompt"),
                                message: "帐号或密码错误，请重新输入。",
                            });
                        }
                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        language() {
            if (localStorage.locale) {
                if(localStorage.locale == "en"){
                    localStorage.locale = "zh"
                }else{
                    localStorage.locale = "en"
                }
            } else {
                localStorage.locale = "en"
            }
            this.$router.go(0)
        },
    },
};
</script>
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale';
import zh from './langs/zh'
import en from './langs/en'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
}

const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages,
    silentTranslationWarn: true //去除国际化警告
})

//为了实现element插件的多语言切换
locale.i18n((key, value) => i18n.t(key, value))

export default i18n