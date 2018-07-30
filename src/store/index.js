import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	choosedAddress: {},//选择地址
	addressIndex: null,//选择地址的索引值
	userInfo: {
		user_id: 1
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})