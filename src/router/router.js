import App from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const growingEnvironment = r => require.ensure([], () => r(require('../page/home/growingEnvironment')), 'growingEnvironment')
const feedingSituation = r => require.ensure([], () => r(require('../page/home/feedingSituation')), 'feedingSituation')
const healthIndicators = r => require.ensure([], () => r(require('../page/home/healthIndicators')), 'healthIndicators')
const productIntroduction = r => require.ensure([], () => r(require('../page/home/productIntroduction')), 'productIntroduction')
const goods = r => require.ensure([], () => r(require('../page/goods/goods')), 'goods')
const cart = r => require.ensure([], () => r(require('../page/cart/cart')), 'cart')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const allOrder = r => require.ensure([], () => r(require('../page/order/children/all')), 'order')
const unpaid = r => require.ensure([], () => r(require('../page/order/children/unpaid')), 'order')
const undelivery = r => require.ensure([], () => r(require('../page/order/children/undelivery')), 'order')
const delivered = r => require.ensure([], () => r(require('../page/order/children/delivered')), 'order')
const completed = r => require.ensure([], () => r(require('../page/order/children/completed')), 'order')
const orderDetail = r => require.ensure([], () => r(require('../page/order/children/orderDetail')), 'orderDetail')
const orderTrack = r => require.ensure([], () => r(require('../page/order/children/orderTrack')), 'orderTrack')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const address = r => require.ensure([], () => r(require('../page/profile/children/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/children/children/add')), 'add')
const addDetail = r => require.ensure([], () => r(require('../page/profile/children/children/children/children/addDetail')), 'addDetail')
const coupon = r => require.ensure([], () => r(require('../page/profile/children/coupon')), 'coupon')
const aboutUs = r => require.ensure([], () => r(require('../page/home/aboutUs')), 'aboutUs')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    meta: {title: '链上优品'},
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页
        {
            path: '/home',
            component: home
        },
        //生产环境
        {
            path: '/growing-environment',
            component: growingEnvironment,
            name: 'growingEnvironment'
        },
        //饲养情况
        {
            path: '/feeding-situation',
            component: feedingSituation,
            name: 'feedingSituation'
        },
        //健康指标
        {
            path: '/health-indicators',
            component: healthIndicators,
            name: 'healthIndicators'
        },
        //商品介绍
        {
            path: '/product-introduction',
            component: productIntroduction,
            name: 'productIntroduction'
        },
        //商品详情
        {
            path: '/goods/:goodsid',
            component: goods
        },
        //购物车
        {
            path: '/cart',
            component: cart
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component: confirmOrder
        },
        //个人信息页
        {
            path: '/profile',
            component: profile,
            children: [{
                path: 'info', //个人信息详情页
                component: info,
                children: [{
                    path: 'address',
                    component: address,     //编辑地址
                    name: 'addressList',
                    children:[{
                        path:'add',
                        component:add,
                        name: 'editAddress',
                        children:[{
                            path:'addDetail',
                            component:addDetail
                        }]
                    }]
                }]
            }]
        },
        // 关于我们
        {
            path: '/aboutUs',
            component: aboutUs
        },
        //订单列表页
        {
            path: '/order',
            component: order,
            children: [{
                path: 'orderDetail', //订单详情页
                component: orderDetail
            },{
                path: 'orderTrack',
                component: orderTrack
            },{
                path: '',
                component: allOrder, //全部订单
                name: 'all'
            },{
                path: 'unpaid',
                component: unpaid, //待支付订单
                name: 'unpaid'
            },{
                path: 'undelivery',
                component: undelivery, //未发货
                name: 'undelivery'
            },{
                path: 'delivered',
                component: delivered, // 已发货
                name: 'delivered'
            },{
                path: 'completed',
                component: completed, //已完成
                name: 'completed'
            }]
        },
        {
            path: '/coupon',
            component: coupon,
        }
    ]
}]