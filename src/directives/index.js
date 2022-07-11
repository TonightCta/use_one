/*
 * @Author: 权限配置全局 * @Date: 2022-04-14 14:53:47 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-14 14:57:49
 */

import permission from "./permission"
//批量注册指令(现在就一个permission)
const directives = {
    permission
}
//注册的一般写法，循环遍历directives，通过vue.directive注册
export default {
    install(Vue) {
        Object.keys(directives).forEach(key => {
            Vue.directive(key, directives[key])
        })
    }
}
