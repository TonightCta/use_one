<!--
 * @Name: 添加银行卡
 * @Date: 2022-07-04 16:09:36
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 14:12:28
-->

<template>
    <P-main>
        <Navigation v-if="form.id == ''" />
        <Navigation v-else :delSwitch="true" @click-icon="clickIcon" />
        <P-body type="Fei" class="m-55-b">
            <h1>{{form.id === '' ? '添加':''}}银行卡</h1>
            <el-form :model="form" ref="form" :rules="rules" label-width="130px" class="main" label-position="top"
                :hide-required-asterisk="true">
                <div class="form-item">
                    <el-form-item prop="username">
                        <template #label>
                            <div class="label">
                                姓名<span>*</span>
                            </div>
                        </template>
                        <el-input v-model="form.username" class="ui-input" placeholder="请输入您的姓名"></el-input>
                    </el-form-item>
                    <el-form-item prop="account">
                        <template #label>
                            <div class="label">
                                银行卡号<span>*</span>
                            </div>
                        </template>
                        <el-input v-model="form.account" class="ui-input" placeholder="请输入银行卡号" :maxlength="19">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="bank">
                        <template #label>
                            <div class="label">
                                开户银行<span>*</span>
                            </div>
                        </template>
                        <el-input v-model="form.bank" class="ui-input" placeholder="请输入开户银行"></el-input>
                    </el-form-item>
                </div>
                <div class="form-item m-10-t">
                    <el-form-item label="开户支行 (选填）">
                        <el-input v-model="form.bank_branch" class="ui-input" placeholder="请输入开户支行"></el-input>
                    </el-form-item>
                </div>
            </el-form>

            <B-typographya class="prompt">
                <template #icon>
                    <i class="el-icon-warning" />
                </template>
                <template #title>
                    风险提示:C2C属于场外交易，法币不经过平台，平台不会自动扣款，需要您手动自行转账给对方，对方才能收到款项。当您在法币交易出售资产时，您选择的收款方式将会展示给买方，请确认信息准确无误。
                </template>
            </B-typographya>

            <B-typographya class="text-yesNo">
                <template #icon>
                    <B-svg name="Gou1" class-name="b-icon-svg" :class="[bool.checkThe ? 'active':'']"
                        @click="checkThe" />
                </template>
                <template #title>
                    <div @click="checkThe">我已阅读并充分理解上述内容，由于款项造成的交易风险自行承担</div>
                </template>
            </B-typographya>
        </P-body>
        <Foo-ter>
            <P-button type="primary" class="btn-primary h-44-i" @click="onSubmit('form')">{{form.id === '' ? '保存':'修改'}}
            </P-button>
        </Foo-ter>

        <Alert v-model="alert.show" title="提示" :cancel-switch="alert.cancelSwitch" @click="onAlert">
            <div class="ui-flex-row">{{alert.message}}</div>
        </Alert>
    </P-main>
</template>

<script>
export default {
    data() {
        return {
            bool: {
                checkThe: false
            },
            form: {
                id: '',
                p_id: this.$store.state.card.addtype,
                username: '',
                account: '',
                bank: '',
                bank_branch: '',
                qrcode: '',
                status: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入您的姓名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '请输入银行卡号', trigger: 'blur' },
                    { validator: new RegExp().bankCard, trigger: 'blur' }
                ],
                bank: [
                    { required: true, message: '请输入开户银行', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ]
            },
            alert: {
                show: false,
                cancelSwitch: false,
                index: 0,
                message: ''
            }

        }
    },
    watch: {
        '$route.params': {
            deep: true,
            immediate: true,
            handler: function (v) {
                if (v.id) {
                    this.form.id = v.id
                    this.onList(v.id)
                }
            }
        },
    },
    mounted() {
        if (this.form.p_id == '' && this.form.id == '') {
            this.$router.back(-1)
        }
    },
    methods: {
        onAlert() {
            this.alert.show = false
            if (this.alert.index === 1) {
                this.del()
            }
        },
        onSubmit(formName) {
            this.$refs[formName].validate((res) => {
                if (res) {
                    if (this.bool.checkThe) {
                        if (this.form.id == '') {
                            this.Submit()
                        } else {
                            this.Update()
                        }
                    } else {
                        this.alert.show = true
                        this.alert.cancelSwitch = false
                        this.alert.index = 0
                        this.alert.message = '请勾选交易风险'
                    }
                }
            });
        },
        checkThe() {
            this.bool.checkThe = !this.bool.checkThe
        },
        async Submit() {
            const response = await API.Submit(this, 'card/add', this.form)
            const { code, message } = response
            if (code == 200) {
                this.$store.commit('card/SET_ADDTYPE', '');
                this.$router.push({ path: '/bankcard' })
            } else {
                this.$toast.fail(message);
            }
        },
        async onList(id) {
            const response = await API.GetData(this, 'card/getinfo', id)
            const { code, data, message } = response
            if (code == 200) {
                this.form = data
                this.bool.checkThe = true
            } else {
                this.$router.back(-1)
            }
        },
        async Update() {
            API.Update(this, 'card/update', this.form).then(response => {
                if (response.code == 200) {
                    this.$router.go(-1)
                }
            }).catch(error => {
                this.$toast.fail(error.message);
            });
        },
        clickIcon(v) {
            if (v == 'del') {
                this.alert.show = true
                this.alert.cancelSwitch = true
                this.alert.index = 1
                this.alert.message = '确认删除该收款方式?'
            }
        },
        async del() {
            const response = await API.Del(this, 'card/del', this.form.id)
            const { code, data, message } = response
            if (code == 200) {
                this.$router.push({ path: '/bankcard' })
            }
        }
    }
};
</script>

<style lang="less" scoped>
h1 {
    padding: 12px;
    padding-bottom: 15px;
    font-size: 23px;
    color: #333333;
}
.body {
    padding: 0px;
    .form-item {
        padding: 12px;
        background: #fff;
        /deep/.el-form-item {
            margin-bottom: 10px;
            &.is-error {
                margin-bottom: 22px;
            }
            .el-form-item__label {
                padding: 0px;
            }
            .el-input__inner {
                height: 40px;
                padding: 0 10px;
                border: 1px solid #eeeeee;
            }
        }
        .label {
            span {
                vertical-align: -7px;
                color: #ff4d4d;
                font-size: 20px;
                margin-left: 3px;
            }
        }
    }
}

.prompt {
    margin-top: 12px;
    padding: 10px;
    background: #ffebeb;
    border-radius: 4px;
    /deep/.title {
        font-size: 12px;
        font-weight: 400;
        color: #ff7676;
        .el-icon-warning {
            font-size: 14px;
        }
    }
}

.text-yesNo {
    padding: 12px;
    /deep/.title {
        font-size: 12px;
        color: #666666;
        .icon-svg {
            width: 11px;
            height: 20px;
            .b-icon-svg {
                width: 11px;
                height: 11px;
            }
        }
    }
    .b-icon-svg {
        width: 11px;
        height: 11px;
        border-radius: 2px;
        border: 1px solid #666666;
        /deep/use {
            display: none;
        }
        &.active {
            /deep/use {
                display: block;
            }
        }
    }
}
</style>