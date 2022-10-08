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

// 图形验证码
export const ImgCode = p => get('/api/v1/captcha',p);
//短信验证码
export const SendCode = p => post('/api/v1/user/sendCode',p);
//获取用户信息
export const UserInfo = p => get(`/api/v1/user/profile`);
//用户面板信息
export const UserPanel = p => get('/api/v1/user/panel',p);
//用户资产
export const UserAssets = p => get(`/api/v1/assets/account/spot`);
//法币列表
export const FaitCoin = p => get('/api/v1/c2c/currency',p);
//法币汇率
export const FaitRate = p => get(`/api/v1/c2c/currency/${p}`);
//实时行情
export const QU = p => get('/api/v1/quotation/list',p);
//单个币种流水
export const CoinAssets = p => post('/api/v1/assets/account/list/spot',p);
//币种流水详情
export const AssetsDetails = p => get(`/api/v1/assets/account/list/detail/${p}`)
//获取所有类型
export const Types = p => post('/api/v1/types',p);
//密码校验
export const CheckPass = p => post('/api/v1/security/checkPassword',p);
//绑定 / 修改邮箱
export const BindEmail = p => post('/api/v1/security/bindEmail',p);
//更换登录密码
export const ChangePass = p => post('/api/v1/security/changePassword',p);
//谷歌验证器信息
export const GoogleAuthMsg = p => get('/api/v1/security/googleAuth',p);
//绑定谷歌验证器
export const BindGoogleAuth = p => post('/api/v1/security/bindGoogleAuth',p);
//解绑谷歌验证器
export const UnBindGoogleAuth = p => post('/api/v1/security/unBindGoogleAuth',p);
//验证码校验
export const VerifyCode = p => post('/api/v1/user/checkCode',p);
//设置交易密码
export const SetTradePass = p => post('/api/v1/security/changePayPassword',p);
//绑定 / 修改手机
export const BindPhone = p => post('/api/v1/security/bindPhone',p);
//退出登录
export const Logout = p => get('/api/v1/user/logout',p);
//充币支持列表
export const SupportCoins = p => get('/api/v1/assets/coins',p);
//充币地址
export const CoinAddress = p => get(`/api/v1/assets/address/${p.coin}/${p.protocol}`);
//成为商家前置条件
export const ChantCondition = p => get('/api/v1/merchant/beforeApply',p);
//商家申请基本信息一
export const ChantStepOne = p => post('/api/v1/merchant/applyBase',p);
//商家申请基本信息二
export const ChantStepTwo = p => post('/api/v1/merchant/applyCard',p);
//商家申请基本信息三
export const ChantStepThree = p => post('/api/v1/merchant/applyVideo',p);
//上传文件
export const PublicUpFile = p => post('/api/v1/uploads',p);
//设置昵称
export const SetNickname = p => post('/api/v1/merchant/setMerchantName',p);
//发布广告
export const ReleaseAdv = p => post('/api/v1/merchant/adv/push',p);
//币种行情价格
export const CoinPrice = p => get('/api/v1/quotation/list',p);
//支付卡列表
export const CardMap = p => post('/api/v1/payments/list',p);
//付款方式
export const SupportPay = p => get('/api/v1/payments/map',p);
//广告列表
export const AdvList = p => post('/api/v1/merchant/adv/list',p);
//更新广告状态
export const UpAdvStatus = p => post('/api/v1/merchant/adv/status',p);
//支持的币种列表
export const CoinList = p => get('/api/v1/c2c/coins',p);
//广告详情
export const AdvDetail = p => get(`/api/v1/merchant/adv/get/${p}`);
//广告修改
export const AdvChange = p => post(`/api/v1/merchant/adv/update/${p.id}`,p);
//广告订单记录
export const AdvDetailLog = p => post(`/api/v1/merchant/adv/list/${p.id}`,p);
//C2C广告列表
export const AdvTradeList = p => post(`/api/v1/market/c2c/ads/${p.type}`,p);
//支持的支付方式
export const Payments = p => get('/api/v1/payments/map',p);
//购买 / 出售 前验证
export const TradeVerify = p => get(`/api/v1/c2c/order/before/${p.type}`,p);
//下单
export const PlaceOrder = p => post('/api/v1/c2c/order/place',p);
//订单详情
export const OrderDetails = p => get(`/api/v1/c2c/order/detail/${p.id}`);
//取消订单
export const CancelOrder = p => get(`/api/v1/c2c/order/cancel/${p.type}`,p);
//订单列表
export const OrderListService = p => post('/api/v1/order/c2c/list',p);
