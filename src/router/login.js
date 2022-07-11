export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            content: {
                keywords: '登录',
                description: '登录'
            },
            keepAlive: false,
            permission: false
        },
        component: resolve => require(['@/views/login/index'], resolve)
    },
    {
        path: '/registered',
        name: 'registered',
        meta: {
            title: '注册',
            content: {
                keywords: '注册',
                description: '注册'
            },
            keepAlive: false,
            permission: false
        },
        component: resolve => require(['@/views/login/registered'], resolve)
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        meta: {
            title: '忘记密码',
            content: {
                keywords: '忘记密码',
                description: '忘记密码'
            },
            keepAlive: false,
            permission: false
        },
        component: resolve => require(['@/views/login/ForgotPassword'], resolve)
    },
]