/*
 * @Name: 收款卡
 * @Date: 2022-07-04 17:56:39
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 11:39:40
 */
import { list, map, add, status, getinfo, update, del } from '@/api/card'

const state = {
    mapList: [],
    addtype: ''
}

const mutations = {
    SET_MAPLIST: (state, item) => {
        state.mapList = item
    },
    SET_ADDTYPE: (state, item) => {
        state.addtype = item
    }
}

const actions = {
    list({ commit }, params) {
        return new Promise((resolve, reject) => {
            list(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    map({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.mapList.length == 0) {
                map().then(response => {
                    let { code, data } = response
                    if (code == 200) {
                        commit('SET_MAPLIST', data.payments)
                        resolve(data.payments)
                    } else {
                        reject(response)
                    }
                }).catch(error => {
                    reject(error)
                })
            } else {
                resolve(state.mapList)
            }
        })
    },
    add({ commit }, params) {
        return new Promise((resolve, reject) => {
            add(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    status({ commit }, params) {
        return new Promise((resolve, reject) => {
            status(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    getinfo({ commit }, params) {
        return new Promise((resolve, reject) => {
            getinfo(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    update({ commit }, params) {
        return new Promise((resolve, reject) => {
            update(params).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    del({ commit }, params) {
        return new Promise((resolve, reject) => {
            del(params).then(response => {
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