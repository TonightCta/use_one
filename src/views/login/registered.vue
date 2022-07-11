<!--
 * @Name: 注册
 * @Date: 2022-06-26 14:39:56
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:18:41
-->
<template>
    <div>
        <PhoneOrEmail v-if="comName == 'PhoneOrEmail'" title="注册" :tabs-active.sync="active" :list="list"
            :phone_prefix="Form.phone_prefix" :phone="Form.phone" :email="Form.email" @click="onPhoneOrEmail" />
        <Verification v-if="comName == 'Verification'" :title="list[active]" :active="active" :scene="1"
            :phone_prefix="Form.phone_prefix" :phone="Form.phone" :email="Form.email" @click="onVerification"
            @click-left="onVClickLeft" />
        <Password v-if="comName == 'Password'" @click="onPassword" @click-left="onPClickLeft" />
    </div>
</template>

<script>
import Mixins from './mixins'

export default {
    mixins: [Mixins],
    computed: {
        account() {
            return this.active == 0 ? this.Form.phone : this.Form.email
        }
    },
    methods: {
        onPhoneOrEmail(response, ruleForm) {
            const { code, message } = response
            if (code == 200) {
                this.comName = 'Verification'
                this.Form.phone = ruleForm.phone
                this.Form.email = ruleForm.email
                this.Form.phone_prefix = ruleForm.phone_prefix
            } else {
                this.$toast({
                    message: message,
                    position: 'bottom'
                });
            }
        },
        onVerification(response, ruleForm) {
            const { code, message } = response;
            if (code == 200) {
                this.comName = 'Password'
                this.Form.code = ruleForm
            } else {
                this.$toast({
                    message: message,
                    position: 'bottom'
                });
            }
        },
        async onPassword(ruleForm) {
            this.$toast.loading({
                duration: 0,
                forbidClick: true,
                message: this.$t('注册中')
            });

            const response = await this.$store.dispatch('registered/register', {
                type: this.list[this.active].id,
                email: this.Form.email,
                phone: this.Form.phone,
                phone_prefix: this.Form.phone_prefix,
                code: this.Form.code,
                password: ruleForm.password,
                password_confirmation: ruleForm.confirmPassword,
            })

            const { code, message } = response
            if (code == 200) {
                this.$toast.success('注册成功');
                setTimeout(() => {
                    this.$router.push({
                        path: '/login'
                    })
                }, 1500)
            } else if (code == 100005) {
                this.$toast.fail(message);
                setTimeout(() => {
                    this.comName = 'Verification'
                }, 1500)
            } else {
                this.$toast.fail('请重新注册');
                setTimeout(() => {
                    this.comName = 'PhoneOrEmail'
                }, 1500)
            }
        },
        onVClickLeft() {
            this.comName = 'PhoneOrEmail'
        },
        onPClickLeft() {
            this.comName = 'Verification'
        }
    }
};
</script>