/*
 * @Name: 用户API接口
 * @Date: 2021-05-31 22:31:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:21:34
 */

import { post, get } from '../utils/request';

export const list = params => {
    return post('/api/list', params);
}

// 图形验证码
export const ImgCode = p => get('/api/v1/captcha',p);
//短信验证码
export const SendCode = p => post('/api/v1/user/sendCode',p);
//获取用户信息
export const UserInfo = p => get('/api/v1/user/profile',p);
//用户面板信息
export const UserPanel = p => get('/api/v1/user/panel',p);
//用户资产
export const UserAssets = p => get(`/api/v1/assets/account/spot`);
//法币列表
export const FaitCoin = p => get('/api/v1/c2c/currency',p);
//法币汇率
export const FaitRate = p => get(`/api/v1/c2c/currency/${p}`);
//实时行情
export const QU = p => get('/api/v1/quotation/list',p);
//单个币种流水
export const CoinAssets = p => post('/api/v1/assets/account/list/spot',p);
//币种流水详情
export const AssetsDetails = p => get(`/api/v1/assets/account/list/detail/${p}`)
//获取所有类型
export const Types = p => post('/api/v1/types',p);
//密码校验
export const CheckPass = p => post('/api/v1/security/checkPassword',p);
//绑定 / 修改邮箱
export const BindEmail = p => post('/api/v1/security/bindEmail',p);
//更换登录密码
export const ChangePass = p => post('/api/v1/security/changePassword',p);
//谷歌验证器信息
export const GoogleAuthMsg = p => get('/api/v1/security/googleAuth',p);
//绑定谷歌验证器
export const BindGoogleAuth = p => post('/api/v1/security/bindGoogleAuth',p);
//解绑谷歌验证器
export const UnBindGoogleAuth = p => post('/api/v1/security/unBindGoogleAuth',p);
//验证码校验
export const VerifyCode = p => post('/api/v1/user/checkCode',p);
//设置交易密码
export const SetTradePass = p => post('/api/v1/security/changePayPassword',p);
//绑定 / 修改手机
export const BindPhone = p => post('/api/v1/security/bindPhone',p);
//退出登录
export const Logout = p => get('/api/v1/user/logout',p);
//充币支持列表
export const SupportCoins = p => get('/api/v1/assets/coins',p);
//充币地址
export const CoinAddress = p => get(`/api/v1/assets/address/${p.coin}/${p.protocol}`);