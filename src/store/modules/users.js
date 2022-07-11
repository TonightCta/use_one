/*
 * @Name: 用户管理-Store
 * @Date: 2022-04-21 13:55:44
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-04 18:26:25
 */
import { login } from '@/api/user/'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
    token: getToken()
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    }
}

const actions = {
    //用户登录
    login({ commit, state }, params) {
        return new Promise((resolve, reject) => {
            login(params).then(response => {
                if (response.code == 200) {
                    const { access_token, expires_in, token_type } = response.data;
                    setToken(token_type + ' ' + access_token)
                    commit('SET_TOKEN', getToken())
                }
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