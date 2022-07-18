import * as api from '../api/api'
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
//价格计算
export async function computedPrice(_rate, _number, _coin) {
    /**
     * @param _rate 法币汇率
     * @param _number 币种数量
     * @param _coin 币种
    */
    const result = await api.QU();
    const { data } = result;
    const { list } = data;
    if (_coin == 'USDT') {
        return Number(_rate) * Number(_number);
    } else {
        return Number(_rate) * Number(_number) * list[_coin].price;
    }
};
//价格总量计算
export async function interPrice(_rate, _data, _type) {
    /**
     * @param _rate 法币汇率
     * @param _data 计算数据
     * @param _type 数据格式
     * @param _data => { //type == 0 && number:*,coinname:* } => { //type == 1 && coinname:number }
    */
    let price = [];
    for (let i in _data) {
        price.push(
            await computedPrice(
                _rate,
                _type == 0 ? _data[i].available : _data[i],
                _type == 0 ? _data[i].coin : i
            )
        );
    };
    return price;
};
//计算单个币种持有价格
export async function oneInterPrice(_rate,_number, _coin) {
    let price = '';
    price = await computedPrice(
        _rate,
        _number,
        _coin
    )
    return price;
}
//获取币种行情价格
export async function getCoinPrice(_icon) {
    const result = await api.QU();
    const { data } = result;
    const { list } = data;
    return list[_icon].price;
}