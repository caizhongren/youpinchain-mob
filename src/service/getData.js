import fetch from '../config/fetch'

/**
 * 查询首页数据
 */

export const homeIndex = () => fetch('/home/index', {
});

/**
 * 
 * @param {商品id} productId 
 * @param {数量} number 
 */
export const addToCart = (productId, number) => fetch('/carts', {
	productId: productId,
	number: number
}, 'POST')


/**
 * 获取首页热卖商品
 * @param {页数} page
 * @param {每页数量} size
 */

export const hotgoods = (page, size) => fetch('/wx/home/index', {
	'page': page,
	'size': size
});

/**
 * 获取首页热门城市
 */

export const hotcity = (page, size) => fetch('/wx/wx/photo/list', {
	page: page,
	size: size
});

/**
 * 查询商品列表
 * @param {品牌id} brandId
 */

export const productList = (page, size, brandId) => fetch('/products', {
	page: page,
	size: size,
	brandId: brandId,
});


/**
 * 根据商品id查询商品详情
 * @param {商品id} proId
 */
export const getProductDetail = (proId) => fetch('/products/' + proId, {
});


/**
 * 查询用户购物车
 */
export const findCart = (page, size) => fetch('/carts', {
	page: page,
	size: size
});

/**
 * 更新购物车
 * @param {购物车Id} cartId
 * @param {数量} number
 */
export const updateCart = (cartId, number) => fetch('/carts/' + cartId, {
	number: number
}, 'PUT');

/**
 * 删除购物车
 */
export const deleteCart = (cartId) => fetch('/carts/' + cartId, {}, 'DELETE');


/**
 * 添加购物车
 * @param {商品id} productId
 * @param {数量} number
 */
export const addCart = (youpinCar, productId, number) => fetch('/carts', {
	productId: productId,
	number: number
}, 'POST');

/**
 * 地址列表查询
 */
export const getDefaultAddress = () => fetch('/addresses/defaultAddress');


/**
 * 地址列表查询
 */
export const getAddressList = () => fetch('/addresses');


/**
 * 地址详情
 */
export const getAddressDetail = (addressId) => fetch('/addresses/' + addressId);


/**
 * 添加收货地址
 */

export const addAddress = (name, provinceId, cityId, areaId, mobile, address) => fetch('/addresses', {
	name,
	provinceId,
	cityId,
	areaId,
	mobile,
	address
}, 'POST');

/**
 * 更新收货地址
 */

export const updateAddress = (addressId, name, provinceId, cityId, areaId, mobile, address) => fetch('/addresses/' + addressId, {
	name,
	provinceId,
	cityId,
	areaId,
	mobile,
	address
}, 'PUT');


/**
* 删除收货地址
*/

export const deleteAddress = (addressId) => fetch('/addresses/' + addressId, {}, 'DELETE')


/**
 * 微信授权登陆
 */

export const login_oa = () => fetch('/oa/login_oa');


/**
 * 提交订单
 */

export const submitOrder = ({ cartIds, addressId }) => fetch('/orders', {
	cartIds: cartIds,
	addressId: addressId
}, 'POST');


/**
 * 确认收货
 */

export const confirmOrder = ({ orderId }) => fetch('/orders/' + orderId + 'confirm', {
}, 'POST');


/**
 * 预付款
 */

export const prepayOrder = ({ orderId }) => fetch('/orders' + orderId + '/prepay', {
}, 'POST');


/**
 * 获取订单列表
 * showType 0:全部，1：待付款，2：待发货，3：待收货，4：待评价
 */

export const getOrderList = (page, size, showType) => fetch('/orders', {
	page: page,
	size: size,
	showType: showType
});


/**
 * 获取订单详情
 */

export const getOrderDetail = (orderId) => fetch('/orders/' + orderId);

/**
 * 取消订单
 */

export const cancelOrder = (orderId) => fetch('/orders/' + orderId, {}, 'DELETE');

/**
 * 申请退款
 */

export const refundOrder = (orderId) => fetch('/orders/' + orderId + 'refund', {}, 'POST');


/**
 * 订单统计
 */

export const orderStat = () => fetch('/orders/stat', {});

/**
 * 查询区域
 */

export const getRegionsList = (parentId) => fetch('/regions', {
	pid: parentId
});


/**
 * 用户信息
 */

export const userInfo = () => fetch('/oa/users/info', {
});