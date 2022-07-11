/*
 * @Name: 用户API接口
 * @Date: 2021-05-31 22:31:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:39:42
 */
import { post, get } from '@/utils/request';

//检查手机号/邮箱是否被占用
export const login = params => {
    return post('/api/v1/user/login', params);
}

//检查手机号/邮箱是否被占用
export const checkAvailable = params => {
    return post('/api/v1/user/checkAvailable', params);
}

//国家号码信息
export const country = () => {
    return get('/api/v1/user/country');
}

//发送验证码
export const sendCode = params => {
    return post('/api/v1/user/sendCode', params);
}

//检查验证码
export const checkCode = params => {
    return post('/api/v1/user/checkCode', params);
}

//注册账号
export const register = params => {
    return post('/api/v1/user/register', params);
}

//找回密码
export const forget = params => {
    return post('/api/v1/user/forget', params);
}