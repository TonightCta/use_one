/*
 * @Name: API接口测试
 * @Date: 2022-04-20 19:22:37
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-06 18:31:01
 */

const { items, Length } = Data = require('../mock');

module.exports = [
    {
        url: '/api/list',
        type: 'post',
        response: () => {
            return {
                code: 200,
                total: Length,
                items: items()
            }
        }
    },
]