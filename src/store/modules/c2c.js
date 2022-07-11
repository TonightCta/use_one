/*
 * @Name: c2c交易
 * @Date: 2022-07-04 11:28:47
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 09:44:09
 */
import { coins, currency } from '@/api/c2c'

const state = {
    coinsList: [],
    currencyList: [],
}

const mutations = {
    SET_COINSLIST: (state, item) => {
        state.coinsList = item
    },
    SET_CURRENCYLIST: (state, item) => {
        state.currencyList = item
    }
}

const actions = {
    coins({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.coinsList.length == 0) {
                coins().then(response => {
                    let { code, data, message } = response
                    if (code == 200) {
                        commit('SET_COINSLIST', data.coins)
                        resolve(data.coins)
                    } else {
                        reject(message)
                    }
                }).catch(error => {
                    reject(error)
                })
            } else {
                resolve(state.coinsList)
            }
        })
    },
    currency({ commit, state }) {
        return new Promise((resolve, reject) => {
            if (state.coinsList.length == 0) {
                currency().then(response => {
                    let { code, data, message } = response
                    if (code == 200) {
                        commit('SET_CURRENCYLIST', data.coins)
                        resolve(data.coins)
                    } else {
                        reject(message)
                    }
                }).catch(error => {
                    reject(error)
                })
            } else {
                resolve(state.coinsList)
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}