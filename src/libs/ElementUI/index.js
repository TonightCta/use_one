
import Vue from 'vue'
import Cookies from 'js-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium'
})