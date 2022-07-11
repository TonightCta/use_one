/*
 * @Name: 用户注册-Store
 * @Date: 2022-04-21 13:55:44
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-29 17:09:20
 */
import { checkAvailable, country, sendCode, checkCode, register, forget } from '@/api/user/'

const state = {
    country: []
}

const mutations = {
    SET_COUNTRY: (state, list) => {
        state.country = list
    }
}

const actions = {
    //国家号码信息
    country({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.country.length < 1) {
                country().then(response => {
                    let { code, data } = response
                    if (code == 200) {
                        commit('SET_COUNTRY', data.list)
                    }
                    resolve(data.list)
                }).catch(error => {
                    reject(error)
                })
            } else {
                resolve(state.country)
            }
        })
    },
    //检查手机号/邮箱是否被占用
    checkAvailable({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            checkAvailable(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //发送验证码
    sendCode({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            sendCode(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //检查验证码
    checkCode({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            checkCode(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //注册账号
    register({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            register(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    //找回密码
    forget({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            forget(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}