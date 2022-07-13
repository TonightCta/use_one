const state = {
    amount_way:'INR',
    language:window.localStorage.getItem('locale') || 'zh'
};

const mutations = {
    upAmountWay: (state,opt) => {
        state.amount_way = opt;
    },
    upLanguage:(state,opt) => {
        state.amount_way = opt;
    }
}

const actions = { };


export default{
    namespaced: true,
    state,
    mutations,
    actions
}