//邮箱格式校验
export function checkEmail(arg) {
    const rule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return rule.test(arg);
}
//密码校验
export function checkPassword(arg) {
    const reg = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,12}$/);
    return reg.test(arg) // true
}