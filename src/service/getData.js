import fetch from '../config/fetch'

/**
 * 查询首页数据
 */

export const homeIndex = () => fetch('/home/index', {
});

export const login_oa = () => fetch('/oa/login_oa');

/**
 * 添加购物车
 * @param {商品id} productId 
 */

export const addToCart = productId => fetch('carts/products' + productId, {

}, 'POST')


/**
 * 获取首页热卖商品
 */

export const hotgoods = (page, size) => fetch('/wx/home/index', {
	'page': page,
	'size': size
});

/**
 * 获取首页热门城市
 */

export const hotcity = (page, size) => fetch('/wx/wx/photo/list', {

});

/**
 * 查询商品列表
 */

export const productList = (brandId, page, size) => fetch('/youpin/wx/product/list', {
	brandId: brandId,
	page: page,
	size: size
});


/**
 * 根据商品id查询商品详情
 */
export const findProduct = (proId) => fetch('/youpin/wx/product/findProduct', {
	proId: proId
});


/**
 * 查询用户购物车
 */
export const findCart = (page, size) => fetch('/youpin/wx/cart/findCart', {
	page: page,
	size: size
});


/**
 * 添加购物车
 */
export const addCart = (youpinCar, productId, number) => fetch('/youpin/wx/cart/add', {
	youpinCar: youpinCar,
	productId: productId,
	number:  number
}, 'POST');


/**
 * 地址列表查询
 */
export const getAddressList = () => fetch('/youpin/wx/address');


/**
 * 地址详情
 */
export const getAddressDetail = (addressid) => fetch('/youpin/wx/address/' + addressid);


/**
 * 添加或更新收货地址
 */

export const postAddAddress = (name, provinceId, cityId, districtId, mobile, address) => fetch('/youpin/wx/address', {
	name,
	provinceId,
	cityId,
	districtId,
	mobile,
	address
}, 'POST');


/**
* 删除收货地址
*/

export const deleteAddress = (addressid) => fetch( '/youpin/wx/address/' + addressid, {}, 'DELETE')


/**
 * 微信授权登陆
 */

export const login_oa = () => fetch('/youpin/wx/oa/login_oa');


/**
 * 提交订单
 */

export const submitOrder = ({cartIds, addressId}) => fetch('/youpin/wx/order/submit', {
	cartIds: cartIds,
	addressId: addressId
}, 'POST');


/**
 * 确认收货
 */

export const confirmOrder = ({orderId}) => fetch('/youpin/wx/order/confirm', {
	orderId: orderId
}, 'POST');


/**
 * 预付款
 */

export const prepayOrder = ({orderId}) => fetch('/youpin/wx/order/prepay', {
	orderId: orderId
}, 'POST');


/**
 * 获取订单列表
 *  showType 0:全部，1：待付款，2：待发货，3：待收货，4：待评价
 */

export const getOrderList = (page, size, showType) => fetch('/youpin/wx/order', {
	page: page,
	size: size,
	showType: showType
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (orderid) => fetch('/youpin/wx/order/' + orderid);