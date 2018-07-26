import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	choosedAddress: null,//选择地址
	addressIndex: null,//选择地址的索引值
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})