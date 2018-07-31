import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	choosedAddress: undefined,//选择地址
	addressIndex: null,//选择地址的索引值
	userInfo: {
		user_id: 1
	},
	cart_num: 0 //购物车中商品种类个数
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})