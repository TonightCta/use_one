/*
 * @Name: 
 * @Date: 2021-06-24 22:02:04
 * @LastEditors: VSCode
 * @LastEditTime: 2022-07-07 23:35:35
 * @调用: 
    const {items, Length} = Data =  require('../mock');
    module.exports = [
        {
            url: '/collection/list',
            type: 'get',
            response: () => {
                return {
                    code: 200,
                    total: Length,
                    items: items()
                }
            }
        }
    ]
 */

// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
//循环长度
const Length = 50;
// mock一组数据
const items = () => {
    let articles = [];
    for (let i = 0; i < Length; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', '图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            thumbnail_pic_75: Random.dataImage('75x75', '图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            thumbnail_pic_125: Random.dataImage('125x125', '图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            thumbnail_pic_500x120: Random.dataImage('500x120', '图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            name: Random.cname(), // 随机生成一个常见的中文姓名
            datetime: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            time: Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            date: Random.date('yyyy-MM-dd'), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            sex: Random.boolean(),  //性别
            content: Random.paragraph(), //内容英文
            takeaway: Random.cparagraph(), //导读
            ip: Random.ip(),
            email: Random.email(),
            address: Random.county(true),
            guid: Random.guid(), // "E5DB8f37-cdd5-cB72-bFCc-dad11FC6CCe7"
            id: Random.increment(),
            uid: Random.id(), //"120000197308243535"
            url: Random.url(),
            Price: Random.float(60, 100, 3, 5), //价格
            region: Random.region(), //"华东","华北","西北"
            arr: Random.range(10),//[0,1,2,3,4,5,6,7,8,9]
            "number|0-1": 1,
            "numbera|1-100": 1
        }
        articles.push(newArticleObject)
    }
    return articles
}

module.exports = {
    Length,
    items
}