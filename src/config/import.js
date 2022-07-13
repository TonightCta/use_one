/*
 * @Name: 插件库
 * @Date: 2021-05-27 15:48:54
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 22:36:16
 */

import Vue from 'vue'

import personalized from 'vue-personalized'
import 'vue-personalized/index.css'
Vue.use(personalized)

import '../assets/iconfont/iconfont.css'

import '../libs/ElementUI/index'

import '../libs/ViewUI/index'

import '../libs/vant/index'

import '../utils/axios'

import components from "@/components/index"
Vue.use(components)

import less from 'less'
Vue.use(less)

if (process.env.NODE_ENV === 'development') {
    const { mockXHR } = require('../../mock')
    mockXHR()
}

Vue.prototype.$Base64 = require('js-base64').Base64

import Directives from '../directives/index'
Vue.use(Directives)

import '@/assets/index.less'