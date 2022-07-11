export default [
    {
        path: '/advertisingfordetails/:id',
        name: 'AdvertisingForDetails',
        meta: {
            title: '广告详情',
            content: {
                keywords: '广告详情',
                description: '广告详情'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/ad/AdvertisingForDetails'], resolve)
    },
    {
        path: '/release',
        name: 'release',
        meta: {
            title: '发布广告',
            content: {
                keywords: '发布广告',
                description: '发布广告'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/ad/release'], resolve)
    },
]