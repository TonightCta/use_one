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