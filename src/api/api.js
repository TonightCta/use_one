/*
 * @Name: 用户API接口
 * @Date: 2021-05-31 22:31:27
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-30 11:21:34
 */

import { post, get } from '../utils/request';

export const list = params => {
    return post('/api/list', params);
}