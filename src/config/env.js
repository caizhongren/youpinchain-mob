/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let domainUrl = 'http://192.168.0.146:8889';
let routerMode = 'hash';
let imgBaseUrl;
let appid = 'wx39e1a9f3d6c8cdc5';
let redirect = 'http://youpinlian.datbc.com/youpin/wx/oa/wxCallBack';


if (process.env.NODE_ENV == 'development') {
	imgBaseUrl = 'http://cangdu.org:8001/img/';
	// baseUrl = '/youpin/wx'
	baseUrl = '/wx'

} else if (process.env.NODE_ENV == 'test') {

	imgBaseUrl = 'http://cangdu.org:8001/img/';
	baseUrl = '/youpin/wx';
	domainUrl = 'https://youpinlian.datbc.com';

} else if (process.env.NODE_ENV == 'production') {

	imgBaseUrl = 'http://cangdu.org:8001/img/';
	baseUrl = '/zhenpin/wx';
	domainUrl = 'https://zhenpin.datbc.com';
	appid = 'wx14392deaf538dfef';
	redirect = 'https://zhenpin.datbc.com/zhenpin/wx/oa/wxCallBack';
	
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
	domainUrl,
	appid,
	redirect
}