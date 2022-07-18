const state = {
    amount_way:window.sessionStorage.getItem('amount_way') || 'CNY',//计价法币
    way_symbol:window.sessionStorage.getItem('way_symbol') || '￥',
    way_rate:window.sessionStorage.getItem('way_rate') || '0.00',//法币汇率,
    language:window.localStorage.getItem('locale') || 'zh',
    account:JSON.parse(window.sessionStorage.getItem('account')) || '',
};

const mutations = {
    upAmountWay: (state,opt) => {
        state.amount_way = opt;
        window.sessionStorage.setItem('amount_way',opt)
    },
    upWayRate:(state,opt) => {
        state.way_rate = opt;
        window.sessionStorage.setItem('way_rate',opt)
    },
    upLanguage:(state,opt) => {
        state.language = opt;
        window.localStorage.setItem('opt');
    },
    upAccount:(state,opt) => {
        state.account = opt;
        window.sessionStorage.setItem('account',JSON.stringify(opt));
    },
    upSymbol:(state,opt) => {
        state.way_symbol = opt;
        window.sessionStorage.setItem('way_symbol',opt);
    }
}

const actions = { };


export default{
    namespaced: true,
    state,
    mutations,
    actions
}