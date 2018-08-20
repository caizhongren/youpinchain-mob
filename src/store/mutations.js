import {
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
} from './mutation-types.js'


export default {
	//确认订单页添加新的的地址
	[CONFIRM_ADDRESS](state, newAddress) {
		state.newAddress.push(newAddress);
	},
	//选择的地址
	[CHOOSE_ADDRESS](state, {
		address,
		index
	}) {
		state.choosedAddress = address;
		state.addressIndex = index;
	},
}
