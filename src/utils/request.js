/*
 * @Name: axios
 * @Date: 2022-04-14 12:00:53
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 14:10:46
 */

import qs from "qs";
import axios from 'axios';
import router from '../router'
import i18n from '@/libs/i18n'
import { getToken, removeToken } from '@/utils/auth'

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 1000 * 60 * 10,
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }
});

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers.Authorization = getToken()
        }
        return config;
    },
    error => {
        Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            let data = response.data;
            switch (data.code) {
                case 401:
                    //token过期返回登录页
                    removeToken();
                    router.push("/login?ReturnUrl=" + router.history.current.path);
                    break;
                case 403:
                    data.message = i18n.t('参数校验失败')
                    break;
                case 100004:
                    data.message = i18n.t('用户已经存在')
                    break;
                case 100005:
                    data.message = i18n.t('验证码错误')
                    break;
                case 100007:
                    data.message = i18n.t('删除银行卡不存在')
                    break;
                case 100030:
                    data.message = i18n.t('用户尚未实名认证')
                    break;
                case 100040:
                    data.message = i18n.t('银行卡已被启用')
                    break;
                case 100011:
                    data.message = '谷歌验证码错误'
                    break;
                case 10050:
                    data.message = '交易密码不能和登录密码一致'
                    break;
                case 100008:
                    data.message = '密码错误'
                    break;
                case 100013:
                    data.message = '账户USDT余额无法支付保证金'
                    break;
                case 100012:
                    data.message = '交易流水总额不达标'
                    break;
                case 100016:
                    data.message = '广告已经失效,无法操作'
                    break;
            }
            return data;
        } else {
            Promise.reject();
        }
    },
    error => {
        if (process.env.NODE_ENV == "development") {
            console.error(error);
        }
        return Promise.reject("未知错误");
    }
);

export function post(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'post',
            url,
            data: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        });
    })
}

export function get(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'get',
            url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function put(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'put',
            url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export function del(url, data) {
    return new Promise((resolve, reject) => {
        service({
            method: 'delete',
            url,
            params: data
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default service;
