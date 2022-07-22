import { UserInfo } from '../../api/api'
const state = {
    amount_way: window.sessionStorage.getItem('amount_way') || 'CNY',//计价法币
    way_symbol: window.sessionStorage.getItem('way_symbol') || '￥',
    way_rate: window.sessionStorage.getItem('way_rate') || '0.00',//法币汇率,
    language: window.localStorage.getItem('locale') || 'zh',
    account: JSON.parse(window.sessionStorage.getItem('account')) || {},//用户信息
    coin:JSON.parse(window.sessionStorage.getItem('coin')) || {coin:'USDT',logo:require('../../assets/images/u_icon.png'),protocol:['ERC20','TRC20']},
    chantMsg:JSON.parse(window.sessionStorage.getItem('chantMsg')) || {},
};
const mutations = {
    upAmountWay: (state, opt) => {
        state.amount_way = opt;
        window.sessionStorage.setItem('amount_way', opt)
    },
    upWayRate: (state, opt) => {
        state.way_rate = opt;
        window.sessionStorage.setItem('way_rate', opt)
    },
    upLanguage: (state, opt) => {
        state.language = opt;
        window.localStorage.setItem('opt');
    },
    upAccount: (state, opt) => {
        state.account = opt;
        window.sessionStorage.setItem('account', JSON.stringify(opt));
    },
    upSymbol: (state, opt) => {
        state.way_symbol = opt;
        window.sessionStorage.setItem('way_symbol', opt);
    },
    upCoin:(state,opt) => {
        state.coin = opt;
        window.sessionStorage.setItem('coin',JSON.stringify(opt));
    },
    upChainMsg:(state,opt) => {
        state.chantMsg = opt;
        window.sessionStorage.setItem('chantMsg',JSON.stringify(opt));
    }
}

const actions = {
    upUserInfo: async ({ commit }) => {
        const token = document.cookie.match(`[;\s+]?Admin-Token=([^;]*)`)?.pop();
        const result = await UserInfo(token);
        commit('upAccount', result.data);
    }
};


export default {
    namespaced: true,
    state,
    mutations,
    actions
}