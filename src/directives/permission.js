/*
 * @Author: 权限配置 * @Date: 2022-04-14 14:58:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-04-14 14:58:43
 * 组件标签调用  v-permission="['admin']"
 */

export default {
    inserted(el, bindling) {
        //bindling.value为指令的绑定值
        let perVal = bindling.value;
        if (bindling.value) {
            //假设某用户对某模块只有添加和删除的权限
            //这个权限信息(即pers)应该是不同用户登录时从后台拿到的对应的信息
            let pers = ['add', 'delete'];
            //hasPer为true为有权限
            //hasPer为false为无权限
            let hasPer = pers.some(item => {
                return item == perVal
            });
            //没有权限就先隐藏此元素吧
            if (!hasPer) {
                el.style.display = "none"
            }
        }
    }
}