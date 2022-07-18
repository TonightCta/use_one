export default [
    {
        path: '/mine-assets',
        name: 'MineAssets',
        meta: {
            title: '我的资产',
            content: {
                keywords: '我的资产',
                description: '我的资产'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/assets/index'], resolve)
    },
    {
        path: '/assets-details',
        name: 'AssetsDetails',
        meta: {
            title: '资产',
            content: {
                keywords: '资产',
                description: '资产'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/assets/assets_details'], resolve)
    },
    {
        path: '/assets-log',
        name: 'AssetsLog',
        meta: {
            title: '资产详情',
            content: {
                keywords: '资产详情',
                description: '资产详情'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/assets/details_log'], resolve)
    },
    {
        path: '/recharge',
        name: 'Recharge',
        meta: {
            title: '充币',
            content: {
                keywords: '充币',
                description: '充币'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/assets/recharge'], resolve)
    },
    {
        path: '/choose-coin',
        name: 'ChooseCoin',
        meta: {
            title: '充币币种',
            content: {
                keywords: '充币币种',
                description: '充币币种'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/mine/assets/coin_list'], resolve)
    },
]