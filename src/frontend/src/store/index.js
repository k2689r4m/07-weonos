import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
	state: {
		token: { accessToken: '', refreshToken: '' },
		userInfo: { mem_id: null, mem_name: null, mem_type: null, mem_uid: null, client_view: 'N', rent_client_view: 'N' },
		guest: false,
		postST: false,
		pageList: [],
		pageCnt: 1,
	},
	mutations: {
		setToken(state, data) {
			state.token = data;
		},
		setUserInfo(state, data) {
			state.userInfo.mem_id = data.mem_id;
			state.userInfo.mem_name = data.mem_name;
			state.userInfo.mem_type = data.mem_type;
			state.userInfo.mem_uid = data.mem_uid;
			state.userInfo.client_view = data.client_view;
			state.userInfo.rent_client_view = data.rent_client_view;
		},
		setPostST(state, data) {
			state.postST = data;
		},
		setPage(state, data) {
			state.pageList[data.idx] = data.idList;
		},
		setGuest(state, data) {
			state.guest = data;
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		callSetToken({ state, commit }, data) {
			commit('setToken', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetUserInfo({ state, commit }, data) {
			commit('setUserInfo', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetPostST({ state, commit }, data) {
			commit('setPostST', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetPage({ state, commit }, data) {
			commit('setPage', data);
		},

		// eslint-disable-next-line no-unused-vars
		callSetGuest({ state, commit }, data) {
			commit('setGuest', data);
		},
	},
	getters: {
		getToken(state) {
			if (state.token.accessToken && state.token.refreshToken) {
				return { accessToken: state.token.accessToken, refreshToken: state.token.refreshToken };
			} else {
				return false;
			}
		},

		getUserInfo(state) {
			if (state.userInfo.mem_id) {
				return state.userInfo;
			} else {
				return { mem_id: null, mem_name: null, mem_type: null, mem_uid: null, client_view: 'N', rent_client_view: 'N' };
			}
		},

		getPostST(state) {
			return state.postST;
		},

		getPageList(state) {
			return state.pageList;
		},

		getGuest(state) {
			return state.guest;
		},
	},
	modules: {},
	plugins: [createPersistedState({ key: 'vuexStore', storage: window.sessionStorage })],
});
