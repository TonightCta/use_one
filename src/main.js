import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import i18n from './libs/i18n'
import './config/import'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')