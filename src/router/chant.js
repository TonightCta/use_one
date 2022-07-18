export default [
    {
        path: '/chant-center',
        name: 'ChantCenter',
        meta: {
            title: '商家主页',
            content: {
                keywords: '商家主页',
                description: '商家主页'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/chant/chant_center'], resolve)
    },
    {
        path: '/chant-application',
        name: 'ChantApplication',
        meta: {
            title: '商家申请',
            content: {
                keywords: '商家申请',
                description: '商家申请'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/chant/application_chant'], resolve)
    },
    {
        path: '/application-step',
        name: 'ApplicationStep',
        meta: {
            title: '商家认证',
            content: {
                keywords: '商家认证',
                description: '商家认证'
            },
            keepAlive: false,
            permission: true
        },
        component: resolve => require(['@/views/chant/application_step'], resolve)
    },
]