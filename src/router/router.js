import App from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const growingEnvironment = r => require.ensure([], () => r(require('../page/home/growingEnvironment')), 'growingEnvironment')
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
const address = r => require.ensure([], () => r(require('../page/profile/children/address')), 'address')
const add = r => require.ensure([], () => r(require('../page/profile/children/add')), 'add')
const coupon = r => require.ensure([], () => r(require('../page/profile/children/coupon')), 'coupon')
const aboutUs = r => require.ensure([], () => r(require('../page/home/aboutUs')), 'aboutUs')
const BountyPlan = r => require.ensure([], () => r(require('../page/activity/bounty/bountyPlan')), 'bountyPlan')
const BountyHome = r => require.ensure([], () => r(require('../page/activity/bounty/children/home')), 'bountyHome')
const BountyUserCenter = r => require.ensure([], () => r(require('../page/activity/bounty/children/userCenter')), 'bountyUserCenter')
const userCenterHome = r => require.ensure([], () => r(require('../page/activity/bounty/children/userCenterHome')), 'userCenterHome')
const GoldRecord = r => require.ensure([], () => r(require('../page/activity/bounty/children/record')), 'goldRecord')
const Invite = r => require.ensure([], () => r(require('../page/activity/bounty/children/invite')), 'invite')
const Waiter = r => require.ensure([], () => r(require('../page/activity/bounty/children/waiter')), 'waiter')
const BountyTask = r => require.ensure([], () => r(require('../page/activity/bounty/children/bountyTask')), 'bountyTask')
const PickGoldTask = r => require.ensure([], () => r(require('../page/activity/bounty/children/pickGoldTask')), 'pickGoldTask')
const Auction = r => require.ensure([], () => r(require('../page/activity/auction/auction')), 'auction')
const AuctionHome = r => require.ensure([], () => r(require('../page/activity/auction/children/home')), 'auctionHome')
const Record = r => require.ensure([], () => r(require('../page/activity/auction/children/record')), 'Record')
const MyAuction = r => require.ensure([], () => r(require('../page/activity/auction/children/myAuction')), 'myAuction')
const Sharing = r => require.ensure([], () => r(require('../page/activity/auction/children/sharing')), 'sharing')
const SharingLanding = r => require.ensure([], () => r(require('../page/activity/auction/children/sharingLanding')), 'sharingLanding')
const RewardExchange = r => require.ensure([], () => r(require('../page/activity/auction/children/rewardExchange')), 'rewardExchange')
const Lottery = r => require.ensure([], () => r(require('../page/activity/auction/children/lottery')), 'lottery')


export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    meta: {title: '链上臻品'},
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
        //生产环境、饲养情况、健康指标、商品介绍
        {
            path: '/growing-environment',
            component: growingEnvironment,
            name: 'growingEnvironment'
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
        },
        {
            path: 'address',
            component: address,  //地址管理
            name: 'addressList'
        },
        {
            path:'add',
            component:add,     //编辑地址
            name: 'editAddress'
        },
        // 关于我们
        {
            path: '/aboutUs',
            component: aboutUs
        },
        //订单列表页
        {
            path: 'orderTrack',
            component: orderTrack
        },
        {
            path: 'orderDetail/:orderId', //订单详情页
            component: orderDetail
        },
        {
            path: '/order',
            component: order,
            children: [{
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
        },
        {
            path: '/bountyPlan',
            component: BountyPlan,
            meta: {title: '赏金计划'},
            children: [
                {
                    path: '',
                    component: BountyHome,
                    name: 'BountyHome',
                    meta: {title: '赏金计划'}
                }, {
                    path: 'task',
                    component: BountyTask,
                    name: 'BountyTask',
                    meta: {title: '淘金任务'}
                }, 
                {
                    path: 'PickGoldTask/:id',
                    component: PickGoldTask,
                    name: 'PickGoldTask',
                    meta: {title: '拣金任务'}
                },
                {
                    path: 'invite/:invitationsSum',
                    component: Invite,
                    name: 'Invite',
                    meta: {title: '邀请好友'}
                }, {
                    path: 'waiter',
                    component: Waiter,
                    name: 'Waiter',
                    meta: {title: '添加客服'}
                }, {
                    path: 'userCenter',
                    component: BountyUserCenter,
                    name: 'BountyUserCenter',
                    meta: {title: '个人中心'},
                    children: [
                        {
                            path: '',
                            component: userCenterHome,
                            name: 'userCenterHome'
                        }, {
                            path: 'goldRecord/:type',
                            component: GoldRecord,
                            name: 'GoldRecord'
                        }
                    ]
                }
            ]
        },
        {
            path: '/auction',
            component: Auction,
            children: [
                {
                    path: '',
                    component: AuctionHome,
                    meta: {title: '限时拍卖'}
                },
                {
                    path: 'record/:type',
                    component: Record
                },
                {
                    path: 'sharing',
                    component: Sharing,
                    meta: {title: '分享助力'}
                },
                {
                    path: 'sharingLanding',
                    component: SharingLanding,
                    meta: {title: '分享落地页'}
                },
                {
                    path: 'rewardExchange',
                    component: RewardExchange,
                    meta: {title: '奖励兑换'}
                },
                {
                    path: 'lottery',
                    component: Lottery,
                    meta: {title: '限时抽奖'}
                }
            ]
        }
    ]
}]