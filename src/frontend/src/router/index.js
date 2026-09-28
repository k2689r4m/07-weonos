import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import LoginView from '../views/LoginView.vue';
import MainDashboard from '../views/MainDashboard.vue';
import Scraping from '../views/Scraping.vue';
import ScrapingDetail from '../views/ScrapingDetail.vue';
import ScrapingDetail2 from '../views/ScrapingDetail2.vue';

import MapSearch from '../views/MapSearch.vue';
import MapDetail from '../views/MapDetail.vue';
import MapWrite from '../views/MapWrite.vue';
import UserAdmin from '../views/UserAdmin.vue';
import UserAdmin2 from '../views/UserAdmin2.vue';
import WorkAdmin from '../views/WorkAdmin.vue';
import SystemAdmin from '../views/SystemAdmin.vue';
import SystemAdmin1 from '../views/SystemAdmin1.vue';
import SystemAdmin2 from '../views/SystemAdmin2.vue';
import SystemAdmin3 from '../views/SystemAdmin3.vue';
import SystemAdmin4 from '../views/SystemAdmin4.vue';
import SystemAdmin5 from '../views/SystemAdmin5.vue';
import SystemAdmin6 from '../views/SystemAdmin6.vue';
import SystemAdmin7 from '../views/SystemAdmin7.vue';
import SystemAdmin8 from '../views/SystemAdmin8.vue';
import SystemAdmin9 from '../views/SystemAdmin9.vue';
import SystemAdmin9Detail from '../views/SystemAdmin9Detail.vue';
import SystemAdmin10 from '../views/SystemAdmin10.vue';
import SystemAdmin11 from '../views/SystemAdmin11.vue';
import SystemAdmin12 from '../views/SystemAdmin12.vue';
import SystemAdmin13 from '../views/SystemAdmin13.vue';
import TotalSearch from '../views/TotalSearch.vue';
import PrintPage from '../views/PrintPage.vue';
import PrintPage2 from '../views/PrintPage2.vue';
import RentPrintPage from '../views/RentPrintPage.vue';
import RentPrintPage2 from '../views/RentPrintPage2.vue';
import UserDetail from '../views/UserDetail.vue';
import LeaseMapSearch from '../views/LeaseMapSearch.vue';
import LeaseUserAdmin from '../views/LeaseUserAdmin.vue';
import LeaseUserAdmin2 from '../views/LeaseUserAdmin2.vue';
import LeaseSearch from '../views/LeaseSearch.vue';
import LeaseAdmin from '../views/LeaseAdmin.vue';
import MessageBox from '../views/MessageBox.vue';
import LeaseMapDetail from '../views/LeaseMapDetail.vue';
import LeaseMapWrite from '../views/LeaseMapWrite.vue';
import LeaseUserDetail from '../views/LeaseUserDetail.vue';

import MapSearch2 from '../views/MapSearch2.vue';
import LeaseMapSearch2 from '../views/LeaseMapSearch2.vue';

import Post from '../views/Post.vue';

import Test1 from '../views/Test1.vue';
import PrintPageEX from '@/views/PrintPageEX.vue';

const routes = [
	{
		path: '/test1',
		name: 'Test1',
		component: Test1,
	},
	{
		path: '/',
		name: 'MainDashboard',
		component: MainDashboard,
	},
	{
		path: '/Post',
		name: 'Post',
		component: Post,
	},
	{
		path: '/Scraping',
		name: 'Scraping',
		component: Scraping,
	},
	{
		path: '/ScrapingDetail/:id',
		name: 'ScrapingDetail',
		component: ScrapingDetail,
	},
	{
		path: '/ScrapingDetail2/:id',
		name: 'ScrapingDetail2',
		component: ScrapingDetail2,
	},
	{
		path: '/LoginView',
		name: 'LoginView',
		component: LoginView,
		meta: { unauthorized: true },
	},
	{
		path: '/MapSearch',
		name: 'MapSearch',
		component: MapSearch,
	},
	{
		path: '/MapSearch2',
		name: 'MapSearch2',
		component: MapSearch2,
	},
	{
		path: '/MapDetail/:id',
		name: 'MapDetail',
		component: MapDetail,
	},
	{
		path: '/LeaseMapDetail/:id',
		name: 'LeaseMapDetail',
		component: LeaseMapDetail,
	},
	{
		path: '/UserAdmin',
		name: 'UserAdmin',
		component: UserAdmin,
	},
	{
		path: '/UserAdmin2',
		name: 'UserAdmin2',
		component: UserAdmin2,
	},
	{
		path: '/UserDetail/:id',
		name: 'UserDetail',
		component: UserDetail,
		meta: { client: true },
	},
	{
		path: '/WorkAdmin',
		name: 'WorkAdmin',
		component: WorkAdmin,
	},
	{
		path: '/SystemAdmin',
		name: 'SystemAdmin',
		component: SystemAdmin,
		meta: { master: true },
		children: [
			{
				path: '',
				component: SystemAdmin1,
				name: 'SystemAdmin1',
			},
			{
				path: 'SystemAdmin2',
				component: SystemAdmin2,
				name: 'SystemAdmin2',
			},
			{
				path: 'SystemAdmin3',
				component: SystemAdmin3,
				name: 'SystemAdmin3',
			},
			{
				path: 'SystemAdmin4',
				component: SystemAdmin4,
				name: 'SystemAdmin4',
			},
			{
				path: 'SystemAdmin5',
				component: SystemAdmin5,
				name: 'SystemAdmin5',
			},
			{
				path: 'SystemAdmin6',
				component: SystemAdmin6,
				name: 'SystemAdmin6',
			},
			{
				path: 'SystemAdmin7',
				component: SystemAdmin7,
				name: 'SystemAdmin7',
			},
			{
				path: 'SystemAdmin8',
				component: SystemAdmin8,
				name: 'SystemAdmin8',
			},
			{
				path: 'SystemAdmin9',
				component: SystemAdmin9,
				name: 'SystemAdmin9',
			},
			{
				path: 'SystemAdmin9Detail/:id',
				component: SystemAdmin9Detail,
				name: 'SystemAdmin9Detail',
			},
			{
				path: 'SystemAdmin10',
				component: SystemAdmin10,
				name: 'SystemAdmin10',
			},
			{
				path: 'SystemAdmin10',
				component: SystemAdmin10,
				name: 'SystemAdmin10',
			},
			{
				path: 'SystemAdmin11',
				component: SystemAdmin11,
				name: 'SystemAdmin11',
			},
			{
				path: 'SystemAdmin12',
				component: SystemAdmin12,
				name: 'SystemAdmin12',
			},
			{
				path: 'SystemAdmin13',
				component: SystemAdmin13,
				name: 'SystemAdmin13',
			},
		],
	},
	{
		path: '/MapWrite/:id',
		name: 'MapWrite',
		component: MapWrite,
	},
	{
		path: '/LeaseMapWrite/:id',
		name: 'LeaseMapWrite',
		component: LeaseMapWrite,
	},
	{
		path: '/TotalSearch',
		name: 'TotalSearch',
		component: TotalSearch,
	},
	{
		path: '/PrintPage',
		name: 'PrintPage',
		component: PrintPage,
	},
	{
		path: '/PrintPageEX',
		name: 'PrintPageEX',
		component: PrintPageEX,
	},
	{
		path: '/PrintPage2',
		name: 'PrintPage2',
		component: PrintPage2,
	},
	{
		path: '/RentPrintPage',
		name: 'RentPrintPage',
		component: RentPrintPage,
	},
	{
		path: '/RentPrintPage2',
		name: 'RentPrintPage2',
		component: RentPrintPage2,
	},
	{
		path: '/LeaseMapSearch',
		name: 'LeaseMapSearch',
		component: LeaseMapSearch,
	},
	{
		path: '/LeaseMapSearch2',
		name: 'LeaseMapSearch2',
		component: LeaseMapSearch2,
	},
	{
		path: '/LeaseUserAdmin',
		name: 'LeaseUserAdmin',
		component: LeaseUserAdmin,
	},
	{
		path: '/LeaseUserAdmin2',
		name: 'LeaseUserAdmin2',
		component: LeaseUserAdmin2,
	},
	{
		path: '/LeaseUserDetail/:id',
		name: 'LeaseUserDetail',
		component: LeaseUserDetail,
		meta: { rent_client: true },
	},
	{
		path: '/LeaseSearch',
		name: 'LeaseSearch',
		component: LeaseSearch,
	},
	{
		path: '/LeaseAdmin',
		name: 'LeaseAdmin',
		component: LeaseAdmin,
	},
	{
		path: '/MessageBox',
		name: 'MessageBox',
		component: MessageBox,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const storeToken = store.getters.getToken;
	const tk = localStorage.getItem('access_token');

	if (to.matched.some(record => record.meta.unauthorized)) {
		return next();
	} else if (to.matched.some(record => record.meta.master)) {
		const level = store.getters.getUserInfo.mem_type;
		if ('master' == level) {
			return next();
		}
	} else if (to.matched.some(record => record.meta.client)) {
		const level = store.getters.getUserInfo.mem_type;
		if ('master' == level || 'Y' == store.getters.getUserInfo.client_view) {
			return next();
		}
		alert('접근권한이 없습니다.');
		window.close();
		return;
	} else if (to.matched.some(record => record.meta.rent_client)) {
		const level = store.getters.getUserInfo.mem_type;
		if ('master' == level || 'Y' == store.getters.getUserInfo.rent_client_view) {
			return next();
		}
		alert('접근권한이 없습니다.');
		window.close();
		return;
	} else if (storeToken || tk) {
		return next();
	}

	// alert('로그인 해주세요');
	return next('/LoginView');
});

export default router;
