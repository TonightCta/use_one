import Vue from 'vue'
import { getToken } from '@/utils/auth'
import VueRouter from 'vue-router'

// import column from './column'
import order from './order'
import login from './login'
import ad from './ad'
import bankCard from './bankCard'

import Home from '@/views/index'
Vue.use(VueRouter)

const routes = [
    // {
    //     path: '*',
    //     name: '404',
    //     component: resolve => require(['@/views/Error/404.vue'], resolve)
    // },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Home,
        children: [
            {
                path: "/index",
                name: "index",
                meta: {
                    title: '首页',
                    content: {
                        keywords: '首页',
                        description: '首页'
                    },
                    keepAlive: true,
                    permission: false
                },
                component: resolve => require(['@/views/home/index'], resolve)
            },
            {
                path: '/order',
                component: resolve => require(['@/views/order/index'], resolve),
                children: [
                    {
                        path: "/order",
                        name: "order",
                        meta: {
                            title: '订单-进行中',
                            content: {
                                keywords: '订单-进行中',
                                description: '订单-进行中'
                            },
                            keepAlive: true,
                            permission: true
                        },
                        component: resolve => require(['@/views/order/ongoing'], resolve)
                    },
                    {
                        path: "/order/hasended",
                        name: "orderHasEnded",
                        meta: {
                            title: '订单-已结束',
                            content: {
                                keywords: '订单-已结束',
                                description: '订单-已结束'
                            },
                            keepAlive: true,
                            permission: true
                        },
                        component: resolve => require(['@/views/order/HasEnded'], resolve)
                    }
                ],
            },
            {
                path: "/ad",
                name: "ad",
                meta: {
                    title: '广告',
                    content: {
                        keywords: '广告',
                        description: '广告'
                    },
                    keepAlive: true,
                    permission: true
                },
                component: resolve => require(['@/views/ad/index'], resolve)
            },
            {
                path: "/mine",
                name: "mine",
                meta: {
                    title: '我的',
                    content: {
                        keywords: '我的',
                        description: '我的'
                    },
                    keepAlive: true,
                    permission: true
                },
                component: resolve => require(['@/views/mine/index'], resolve)
            }
        ]
    },
    {
        path: '/language',
        name: 'language',
        meta: {
            title: '设置语言',
            content: {
                keywords: '设置语言',
                description: '设置语言'
            }
        },
        component: resolve => require(['@/views/language/index'], resolve)
    },
    ...order,
    ...login,
    ...ad,
    ...bankCard
]

const router = new VueRouter({
    mode: "history",//hash history
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//页面头部进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    easing: "ease", // 动画方式
    speed: 600, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
})

const updateTitle = to => {
    let { keywords, description } = "";
    if (to.meta.title) {
        document.title = keywords = description = to.meta.title;
    }
    if (to.meta.content) {
        keywords = to.meta.content.keywords;
        description = to.meta.content.description;
    }
    document.querySelector('meta[name="keywords"]').setAttribute('content', keywords);
    document.querySelector('meta[name="description"]').setAttribute('content', description);
}

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.permission) {
        const role = getToken();
        if (role) {
            updateTitle(to);
            next()
        } else {
            router.push("/login?ReturnUrl=" + to.path);
            NProgress.done();
        }
    } else {
        next()
    }
});

router.afterEach(() => {
    NProgress.done();
})

export default router
