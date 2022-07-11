import PhoneOrEmail from '../components/phoneOrEmail'
import Verification from '../components/verification'
import Password from '../components/password'

export default {
    components: {
        PhoneOrEmail, Verification, Password
    },
    data() {
        return {
            active: 0,
            list: [
                { id: 1, name: '手机', VerificationName: '短信' },
                { id: 2, name: '邮箱', VerificationName: '邮箱' }
            ],
            comName: 'PhoneOrEmail',
            Form: {
                phone_prefix: '',
                phone: '',
                email: '',
                code: ''
            }
        }
    }
}