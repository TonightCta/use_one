export default [
    {
        path: '/setting',
        name: 'Setting',
        meta: {
            title: '设置',
            content: {
                keywords: '设置',
                description: '设置'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/setting/index'], resolve)
    },
    {
        path: '/choose-amount-way',
        name: 'AmountWay',
        meta: {
            title: '计价方式',
            content: {
                keywords: '计价方式',
                description: '计价方式'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/setting/chose_amount_way'], resolve)
    },
]