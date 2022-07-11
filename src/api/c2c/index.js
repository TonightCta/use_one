/*
 * @Name: c2c交易
 * @Date: 2021-05-31 22:31:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 09:42:25
 */
import { post, get } from '@/utils/request';

//支持的币种列表
export const coins = () => {
    return get('/api/v1/c2c/coins');
}

//支持的法币列表
export const currency = () => {
    return get('/api/v1/c2c/currency');
}

// export const currency = params => {
//     return post('/api/v1/c2c/currency', params);
// }