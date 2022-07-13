export default [
    {
        path: '/safty',
        name: 'Safty',
        meta: {
            title: '安全中心',
            content: {
                keywords: '安全中心',
                description: '安全中心'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/safty/index'], resolve)
    },
    {
        path:'/reset-password',
        name:'ResetPassword',
        meta:{
            title:'重置密码',
            content:{
                keywords:'重置密码',
                description:'重置密码'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/reset_password'],resolve)
    },
    {
        path:'/auth-email',
        name:'AuthEmail',
        meta:{
            title:'邮箱认证',
            content:{
                keywords:'邮箱认证',
                description:'邮箱认证'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/email_auth'],resolve)
    },
    {
        path:'/auth-phone',
        name:'AuthPhone',
        meta:{
            title:'手机认证',
            content:{
                keywords:'手机认证',
                description:'手机认证'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/phone_auth'],resolve)
    },
    {
        path:'/edit-phone',
        name:'EditPhone',
        meta:{
            title:'更改手机',
            content:{
                keywords:'更改手机',
                description:'更改手机'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/edit_phone'],resolve)
    },
    {
        path:'/auth-google',
        name:'AuthGoole',
        meta:{
            title:'设置谷歌认证',
            content:{
                keywords:'设置谷歌认证',
                description:'设置谷歌认证'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/google_auth'],resolve)
    },
    {
        path:'/auth-trade',
        name:'AuthTrade',
        meta:{
            title:'设置交易密码',
            content:{
                keywords:'设置交易密码',
                description:'设置交易密码'
            },
            keepAlive:false,
            permission:true
        },
        component:resolve => require(['@/views/mine/safty/trade_auth'],resolve)
    },
]