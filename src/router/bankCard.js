export default [
    {
        path: '/bankcard',
        name: 'bankCard',
        meta: {
            title: '收款方式管理',
            content: {
                keywords: '收款方式管理',
                description: '收款方式管理'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/bankCard/index'], resolve)
    },
    {
        path: '/bankcard/addtype',
        name: 'bankcardAddType',
        meta: {
            title: '添加类型选择',
            content: {
                keywords: '添加类型选择',
                description: '添加类型选择'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/bankCard/addType'], resolve)
    },
    {
        path: '/bankcard/operation',
        name: 'BankCardAdd',
        meta: {
            title: '添加银行卡',
            content: {
                keywords: '添加银行卡',
                description: '添加银行卡'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/bankCard/addUpdate'], resolve)
    },
    {
        path: '/bankcard/operation/:id',
        name: 'BankCardUpdate',
        meta: {
            title: '银行卡修改',
            content: {
                keywords: '银行卡修改',
                description: '银行卡修改'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/bankCard/addUpdate'], resolve)
    },
]