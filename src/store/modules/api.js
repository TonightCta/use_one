/*
 * @Name: 用户管理-Store
 * @Date: 2022-04-21 13:55:44
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-19 00:22:34
 */
import { list } from '@/api/api'

const state = {}

const mutations = {}

const actions = {
    //获取列表
    list({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            list(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}