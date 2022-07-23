export default [
    {
        path: '/pleasepayment',
        name: 'pleasePayment',
        meta: {
            title: '请付款',
            content: {
                keywords: '请付款',
                description: '请付款'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/order/PleasePayment'], resolve)
    },
    {
        path: '/payment',
        name: 'payment',
        meta: {
            title: '请向卖家付款',
            content: {
                keywords: '请向卖家付款',
                description: '请向卖家付款'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/order/payment'], resolve)
    },
    {
        path: '/waitingforclearance/:id',
        name: 'WaitingForClearance',
        meta: {
            title: '等待对方放行',
            content: {
                keywords: '等待对方放行',
                description: '等待对方放行'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/order/WaitingForClearance'], resolve)
    },
    {
        path: '/waitingforpayment/:id',
        name: 'WaitingForPayment',
        meta: {
            title: '等待对方付款',
            content: {
                keywords: '等待对方付款',
                description: '等待对方付款'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/order/WaitingForPayment'], resolve)
    },
]