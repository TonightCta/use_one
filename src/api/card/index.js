/*
 * @Name: 收款卡
 * @Date: 2022-07-04 17:54:38
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 11:39:20
 */

import { post, get } from '@/utils/request';

//收款卡列表
export const list = params => {
    return post('/api/v1/payments/list', params);
}

//平台支持的收款卡
export const map = () => {
    return get('/api/v1/payments/map');
}

//新增收款卡
export const add = params => {
    return post('/api/v1/payments/create', params);
}

//新增收款卡
export const status = params => {
    return post(`/api/v1/payments/status/${params.id}`, params);
}

//获取收款卡信息
export const getinfo = params => {
    return get(`/api/v1/payments/get/${params}`);
}

//更新收款卡
export const update = params => {
    return post(`/api/v1/payments/update/${params.id}`, params);
}

//删除收款卡
export const del = id => {
    return get(`/api/v1/payments/delete/${id}`);
}