/* eslint-disable */ 
import dayjs from 'dayjs';
import axios from 'axios';
import router from './router';
import store from './store';
import imageCompression from 'browser-image-compression';
import ImageResize from 'image-resize';
import html2canvas from 'html2canvas';
import 'dayjs/locale/ko';
// import _ from 'lodash';
var weekday = require('dayjs/plugin/weekday');
dayjs.locale('ko');
dayjs.extend(weekday);

axios.defaults.headers.common.Accept = 'application/json';

const ITEM_STATE = { sell: '매각', ready: '준비', hold: '보류', done: '매물' };
const ITEM_STATE2 = { sell: '임대완료', ready: '준비', hold: '보류', done: '매물' };

const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

const COM_INFO = {
	MEM_RANK: 'mem_rank',
	TEAM: 'team',
	TEAM_CATE: 'team_cate',
	EXPERT_PART: 'expert_part',
	mem_rank: '직급',
	team: '부서',
	team_cate: '팀',
	expert_part: '전문분야',
};

const BUILDING_INFO = {
	BD_CATE: 'bd_cate',
	USE_AREA: 'use_area',
	STRUCTURE: 'structure',
	GMOK: 'gmok',
	PARK_TYPE: 'park_type',
	HEAT_TYPE: 'heat_type',
	WORK_TYPE: 'work_type',
	bd_cate: '매물종류',
	use_area: '용도지역',
	structure: '건물구조',
	gmok: '지목',
	park_type: '주차방식',
	heat_type: '냉/난방',
	work_type: '작업구분',
};

const MONEY_FORMAT_TYPE = {
	LITTLE: 'LITTLE',
	MUCH: 'MUCH',
	LOAN: 'LOAN',
	RANGE: 'RANGE',
	TAX: 'TAX',
	MOBILE: 'MOBILE',
	MOBILE2: 'MOBILE2',
};

const CLIENT_PHONE_REASON = ['매각 유무 확인', '네고 시도', 'AB해제 시도', '직접입력'];

const CLIENT_LOG_TYPE = {
	mgr_level: '관리등급변경',
	chg_mgr: '관리자변경',
	chg_mobile: '휴대폰변경',
	client_type: '고객분류변경',
	etc: '기타',
};

const LOG_CHG_INFO = {
	sell_status: '진행상태',
	chk_status: '상태',
	open_flag: '공개여부',
	building_price: '건물가',
	building_price_py_price: '건물평당가격',
	land_size_p: '대지면적',
	land_size_m2: '대지면적',
	use_area_uid: '용도지역',
	substation: '주변역',
	substation_distance: '주변역거리',
	public_land_price: '공시지가',
	public_land_price_py_price: '평당공시지가',
	roadwide: '도로사항',
	total_size_p: '연면적',
	total_size_m2: '연면적',
	build_size_p: '건물면적',
	build_size_m2: '건물면적',
	floor_cnt_B: '지하층수',
	floor_cnt_F: '지상층수',
	build_date: '준공일자',
	remodel_date: '리모델링',
	bl_ratio: '건폐율',
	fa_ratio: '용적률',
	park_type_uid: '주차방식',
	park_cnt_law: '법정주차',
	park_cnt_real: '실제주차',
	heat_type_uid: '냉/난방방식',
	ev_cnt: '승강기수',
	delete: '물건삭제',
	un_del: '물건삭제',
	ins_price: '입금가',
	sell_price: '매매금액',
	building_mem_uid: '담당자',
	building_name: '물건명',
	building_addr: '물건주소',
	ex_sum_rent_deposit: '보증금',
	ex_sum_rent_money: '월임대료',
	ex_sum_mgr_fee: '관리비',
	ex_sum_mgr_fee_out: '관리비지출',
	owner_info: '소유자정보',
	toss_building_mem_uid: '위탁관리지정',
	memo: '특징',
	cont_pay_date: '계약일',
	balance_date: '잔금일',
	mid_pay_date: '중도금',
	working_status: '작업상태',

	deposit: '임대 보증금',
	net_area: '전용면적',
	monthly_rent: '임대 월임대료',
	main_fee: '임대 관리비',
	floor_info: '임대 층정보',
	free_parking: '무료주차대수',
	fee_paring: '유로주차대수',
	in_status: '임대 입주현황',
	bathroom_type: '화장실유형',
	rent_area: '임대면적',
	interior_type: '인테리어',
	rent_free: '렌트프리',
};

const INTERIOR_TYPE = {
	need: '필요',
	good: '양호',
	demo: '철거완료',
};

const RENT_FREE = {
	none: '협의',
	confer: '0개월',
};

const CLIENT_TYPE = {
	MANAGE: 'manage',
	NONE: 'none',
	PROPERTY: 'property',
	BLACK: 'black',
	CONTRACT: 'contract',
	manage: '관리',
	none: '미관리',
	property: '부동산',
	black: '블랙',
	contract: '계약',
	lessee: '임차인',
	landlord: '임대인',
	LESSEE: 'lessee',
	LANDLORD: 'landlord',
};

const HIRE_STATUS = {
	Y: '재직',
	N: '퇴사',
};

const MEM_TYPE = {
	master: '관리자',
	admin: '직원',
};

const MONEY1 = {
	masked: false,
	prefix: '',
	suffix: '',
	thousands: ',',
	decimal: '.',
	precision: 0,
	disableNegative: false,
	disabled: false,
	min: null,
	max: null,
	allowBlank: false,
	minimumNumberOfCharacters: 0,
	shouldRound: true,
	focusOnRight: false,
};

const MONEY2 = {
	masked: false,
	prefix: '',
	suffix: '',
	thousands: ',',
	decimal: '.',
	precision: 2,
	disableNegative: false,
	disabled: false,
	min: null,
	max: null,
	allowBlank: false,
	minimumNumberOfCharacters: 0,
	shouldRound: true,
	focusOnRight: false,
};

const IMG_NAME = {
	0: '건물외관',
	1: '건물외관측면',
	2: '외부출입계단',
	3: '건물주차장',
	4: '건물 주출입구',
	5: '건물이면출입구',
	6: '건물외부사진1',
	7: '건물외부사진2',
	8: '건물외부사진3',
	9: '건물외부사진4',
	10: '건물내부사진10',
	11: '건물내부사진11',
	12: '건물내부사진12',
	13: '건물내부사진13',
	14: '건물내부사진14',
	15: '건물내부사진15',
	16: '건물내부사진16',
	17: '건물내부사진17',
	18: '건물내부사진18',
	19: '건물내부사진19',
};

const dataURLtoBlob = dataURL => {
	const [header, base64] = dataURL.split(',');
	const mime = header.match(/:(.*?);/)[1];
	header, base64;
	const binary = atob(base64);
	const len = binary.length;
	const bytes = new Uint8Array(len);

	for (let i = 0; i < len; i++) {
		bytes[i] = binary.charCodeAt(i);
	}

	return new Blob([bytes], { type: mime });
};

function c(e, t, a, r) {
	if ('number' != typeof e) return '0';

	var l = e,
		o = '',
		i = !1;
	l < 0 && ((l *= -1), (i = !0)), a && (l *= 1e4);
	var s = Math.floor(l / 1e8),
		c = Math.floor(l % 1e8),
		m = Math.floor(c / 1e4),
		p = Math.floor(c % 1e4);
	switch (t) {
		case MONEY_FORMAT_TYPE.MUCH:
			if (0 === l) break;
			var d = void 0;
			if (
				(l >= 1e8
					? ((d = l / 1e8), (o = '억'))
					: l >= 1e7
					? ((d = l / 1e7), (o = '천'))
					: l >= 1e6
					? ((d = l / 1e6), (o = '백'))
					: l >= 1e4
					? ((d = l / 1e4), (o = '만'))
					: l >= 1 && ((d = l), (o = '원')),
				'number' == typeof r)
			) {
				var u = d.toString(),
					E = u.indexOf('.');
				0 === r ? (d = parseInt(d)) : E > 0 && (d = u.slice(0, E + 1 + r));
			}
			o = d + o;
			break;
		case MONEY_FORMAT_TYPE.LITTLE:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += m.toLocaleString());
			break;
		case MONEY_FORMAT_TYPE.LOAN:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += m.toLocaleString() + '만'),
				p > 0 && (o += p.toLocaleString() + '원');
			break;
		case MONEY_FORMAT_TYPE.TAX:
			if (0 === l) {
				o = '-원';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += ' ' + m.toLocaleString() + '만'),
				p > 0 && (o += ' ' + p.toLocaleString()),
				(o += '원'),
				o.trim();
			break;
		case MONEY_FORMAT_TYPE.MOBILE:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += o ? ' ' + m.toLocaleString() : m.toLocaleString());
			break;
		case MONEY_FORMAT_TYPE.MOBILE2:
			if (0 === l) {
				o = '0';
				break;
			}
			s > 0 && (o = s.toLocaleString() + '억'),
				m > 0 && (o += o ? ' ' + m.toLocaleString() + '만' : m.toLocaleString() + '만');
	}
	return i && (o = '-' + o), o;
}
// axios.defaults.headers.common['X-NCP-APIGW-API-KEY-ID'] = 'egpy3fy0c0';
// axios.defaults.headers.common['X-NCP-APIGW-API-KEY'] = 'hUHbBHnw5smY4JLYbecqBNkEMsjaf55rkGSp1iWv';

function base64toFile(base_data, filename) {
	var arr = base_data.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}

// class initOptions {
// 	_canvasOptions = {
// 		fileName: '',
// 		allowTaint: true,
// 		useCORS: true,
// 		logging: true,
// 		height: 0,
// 		width: 0,
// 		scale: 1,
// 		dpi: 600,
// 		scrollX: 0,
// 		scrollY: 0,
// 		fileExtension: 'pdf',
// 	};

// 	constructor(canvasOptions) {
// 		this.canvasOptions = _.merge(this._canvasOptions, canvasOptions);
// 	}

// 	get canvasOptions() {
// 		return this._canvasOptions;
// 	}

// 	set canvasOptions(value) {
// 		this._canvasOptions = _.merge(this._canvasOptions, value);
// 	}
// }

const methods = {
	reloadPage() {
		window.location.reload();
	},

	py_m2_ex: val => {
		return val == '' ? '' : Number((val * PY_M2_EX).toFixed(2));
	},

	m2_py_ex: val => {
		return val == '' ? '' : Number((val * M2_PY_EX).toFixed(2));
	},
	openNaver: id => {
		var pop = window.open(
			'https://m.land.naver.com/article/info/' + id,
			'pop_naver',
			'left=104,top=0,width=1920, height=1420,scrolling=yes,scrollbars=yes',
		);
		if (pop) {
			pop.focus();
		}
	},

	openNaverMap: jibun_addr => {
		var pop = window.open(
			'http://map.naver.com/index.nhn?query=' + jibun_addr,
			'pop_naver',
			'left=104,top=0,width=1920, height=1420,scrolling=yes,scrollbars=yes',
		);
		if (pop) {
			pop.focus();
		}
	},
	openDaumMap: jibun_addr => {
		var pop = window.open(
			'http://map.daum.net/?q=' + jibun_addr,
			'pop_daum',
			'left=104,top=0,width=1920, height=1420,scrolling=yes,scrollbars=yes',
		);
		if (pop) {
			pop.focus();
		}
	},

	exportPrint: async elementList => {
		try {
			const canvasOptions = {
				fileName: '',
				allowTaint: false,
				useCORS: true,
				logging: false,
				scale: 4,
				dpi: 300,
				scrollX: 0,
				scrollY: 0,
				// fileExtension: 'pdf',
			};

			const my_window = window.open('', '', `width=${canvasOptions.width},height=${canvasOptions.height}`);
			const style = document.createElement('style');
			// html, body { -webkit-print-color-adjust:exact; width: 210mm; height: 297mm; }
			style.textContent = `
				body { margin: 0px;}
				@media print {
					html, body { -webkit-print-color-adjust:exact; width: 297mm; height: 210mm; 
					
					}
					table { page-break-inside:auto; }
					tr    { page-break-inside:avoid; page-break-after:auto; }
					thead { display:table-header-group; }
					tfoot { display:table-footer-group; }
				}
				@page { size: A4 landscape; margin:0px; }   
				`;
			// @page { size: A4 portrait; margin:0; }   //A4 세로 출력
			// @page { size: A4 landscape; margin:0; }   //A4 가로 출력

			const newDiv = document.createElement('div');

			for (let i = 0; i < elementList.length; i++) {
				console.log(elementList[i]);
				let elementDOM = document.getElementById(elementList[i]);
				console.log(elementDOM);

				const canvas = await html2canvas(elementDOM, canvasOptions);

				newDiv.appendChild(canvas);
			}

			my_window.document.head.appendChild(style);
			my_window.document.body.appendChild(newDiv);

			// my_window.focus();
			// my_window.print();
			// my_window.close();
		} catch (e) {
			console.log(e);
		}
	},

	dateToFormat: (date, format) => {
		return dayjs(date).format(format);
	},

	dateWeekFormat: () => {
		return { s: dayjs().weekday(1).format('YYYY-MM-DD'), e: dayjs().weekday(7).format('YYYY-MM-DD') };
	},

	dateNowFormat: () => {
		return { s: dayjs().format('YYYY-MM-DD'), e: dayjs().format('YYYY-MM-DD') };
	},

	dateNowFormat2: () => {
		return dayjs().format('YYYY-MM-DD');
	},

	dateWorkingFormat: () => {
		return dayjs().add(13, 'day').format('YYYY년 MM월 DD일');
	},


	datetimeNowFormat: () => {
		return dayjs().format('YYYY-MM-DD hh:mm:ss');
	},

	datetimeFormat: day => {
		if (typeof day != 'string') {
			return null;
		} else if (day == '0000-00-00' || day == null || !day.length) {
			return null;
		} else {
			return dayjs(day).format('MM-DD hh:mm');
		}
	},

	dateKorFormat: day => {
		if (typeof day != 'string') {
			return '';
		} else if (day == '0000-00-00' || day == null || !day.length) {
			return '';
		} else {
			return dayjs(day).format('YYYY년MM월DD일');
		}
	},

	dateFormat: day => {
		if (typeof day != 'string') {
			return null;
		} else if (day == '0000-00-00' || day == null || !day.length) {
			return null;
		} else {
			return dayjs(day).format('YYYY-MM-DD');
		}
	},

	dateFormat2: day => {
		if (typeof day != 'string') {
			return '';
		} else if (day == '0000-00-00' || day == null || !day.length) {
			return '';
		} else {
			return dayjs(day).format('YYYY.MM.DD');
		}
	},

	dateSub: day => {
		const masTime = new Date(day);
		const todayTime = new Date();
		todayTime.setHours(0, 0, 0, 0);
		const diff = masTime - todayTime;
		const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (diffDay < 0) {
			return '';
		} else if (diffDay == 0) {
			return '오늘까지';
		} else {
			return 'D-' + diffDay;
		}
	},

	getFloorString(f_B, f_F) {
		let floor_string = '';
		if (f_B > 0) {
			floor_string = '지하' + f_B + '층';
		}
		if (f_F > 0) {
			if (floor_string != '') {
				floor_string += '/';
			}
			floor_string += '지상' + f_F + '층';
		}
		return floor_string;
	},

	getFloorString3(f_B, f_F) {
		let floor_string = '';
		if (f_B > 0) {
			floor_string = 'B' + f_B;
		}
		if (f_F > 0) {
			if (floor_string != '') {
				floor_string += '-';
			}
			floor_string += f_F;
		}
		return floor_string;
	},

	numberToKorean(number) {
		if (number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		} else {
			return 0;
		}
	},
	formatMoney(e, t, a) {
		return c(e, t, !0, a);
	},
	formatMoneyBasedOnWon(e, t, a) {
		var r = e;
		return 'string' == typeof e && (r = parseInt(e, 10)), c(r, t, !1, a);
	},

	groupBy(data, key) {
		return data.reduce(function (carry, el) {
			var group = el[key];

			if (carry[group] === undefined) {
				carry[group] = [];
			}

			carry[group].push(el);
			return carry;
		}, {});
	},
	isEmpty(value) {
		if (
			value == '' ||
			value == null ||
			value == undefined ||
			(value != null && typeof value == 'object' && !Object.keys(value).length)
		) {
			return false;
		} else {
			return true;
		}
	},
	pageDataSetting(total, limit, block, page) {
		this.isAllCheck = false;
		const totalPage = Math.ceil(total / limit);
		let currentPage = page;
		const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null;
		const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null;

		let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1;
		let endIndex = startIndex + block > totalPage ? totalPage : startIndex + block - 1;
		let list = [];
		for (let index = startIndex; index <= endIndex; index++) {
			list.push(index);
		}
		return { first, end, list, currentPage, totalPage };
	},
	objCompare(pt1, pt2) {
		if (pt1.x === pt2.x && pt1.y === pt2.y) {
			return true;
		}
		return false;
	},

	apiGET: async _path => {
		const path = process.env.VUE_APP_HOST_BACK + _path;

		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.get(path);

			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.get(path);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				if (e.response.data.message) {
					alert(msg);
				}
			}
		}
	},

	apiPOST: async (_path, param) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;

		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.post(path, param);
			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.post(path, param);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 400) {
				if (e.response?.data?.errors?.length) {
					alert(e.response?.data.errors[0].msg);
				}
				return false;
			} else if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				if (e.response.data.message) {
					alert(msg);
				}
			}
			return;
		}
	},

	apiLOGIN: async (_path, param) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;

		try {
			const re = await axios.post(path, param);

			axios.defaults.headers.common.authorization = 'Bearer ' + re.data.token.accessToken;
			axios.defaults.headers.common.refresh = 'Bearer ' + re.data.refreshToken;

			store.dispatch('callSetToken', {
				accessToken: 'Bearer ' + re.data.token.accessToken,
				refreshToken: 'Bearer ' + re.data.token.refreshToken,
			});

			store.dispatch('callSetGuest', param.guest);

			// axios.defaults.headers.common.authorization = re.headers.authorization;
			// axios.defaults.headers.common.refresh = re.headers.refresh;

			// store.dispatch('callSetToken', { accessToken: re.headers.authorization, refreshToken: re.headers.refresh });

			router.push({
				name: 'MainDashboard',
			});

			return re.data;
		} catch (e) {
			if (e.response.data.message) {
				alert(e.response.data.message);
			}
			return;
		}
	},

	apiLOGOUT: async (_path, param) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;
		try {
			const re = await axios.post(path, param);

			store.dispatch('callSetToken', { accessToken: '', refreshToken: '' });

			router.push({
				name: 'LoginView',
			});

			return re.data;
		} catch (e) {
			if (e.response.data.message) {
				alert(e.response.data.message);
			}
			return;
		}
	},

	apiIMG: async (_path, param, imgList) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;
		let msg = '잠시후 다시 시도 해주세요.';

		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1280,
			useWebWorker: true,
		};

		try {
			const header = { 'Content-Type': 'multipart/form-data' };
			let form = new FormData();
			// let img = files;

			form.append('bid', param);

			for (let i = 0; i < imgList.length; i++) {
				let file = imgList[i].file;

				if (!(file instanceof File || file instanceof Blob)) {
					form.append('images', imgList[i].file);
				} else {
					const compressedFile = await imageCompression(imgList[i].file, options);
					form.append('images', compressedFile);
				}

				if (!imgList[i].src && imgList[i].fileSrc) {
					//신규
					form.append('info_' + i, 0);
				} else if (imgList[i].src && imgList[i].fileSrc) {
					//수정
					form.append('info_' + i, 1);
				} else {
					//idle
					form.append('info_' + i, -1);
				}
			}

			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.post(path, form, header);
			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.post(path, form, header);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 400) {
				if (e.response?.data?.errors?.length) {
					alert(e.response?.data.errors[0].msg);
				}
				return false;
			} else if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				console.log(e);
				if (e.response.data.message) {
					alert(msg);
				}
			}
			return;
		}
	},

	apiFILE: async (_path, param, fileObj, fileName) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;
		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const header = { 'Content-Type': 'multipart/form-data' };
			let form = new FormData();
			// let img = files;

			form.append('bid', param);
			form.append('fileName', fileName);
			form.append('file', fileObj);

			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.post(path, form, header);
			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.post(path, form, header);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 400) {
				if (e.response?.data?.errors?.length) {
					alert(e.response?.data.errors[0].msg);
				}
				return false;
			} else if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				if (e.response.data.message) {
					alert(msg);
				}
			}
			return;
		}
	},

	apiPOST_ADD: async (_path, param) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;
		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const header = { 'Content-Type': 'multipart/form-data' };
			let form = new FormData();
			// let img = files;

			form.append('title', param.title);
			form.append('memo', param.memo);
			form.append('memList', param.memList);

			// console.log(param.fileObj[]);

			for (let i = 0; i < param.fileObj.length; i++) {
				form.append('files', param.fileObj[i]);
			}

			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.post(path, form, header);
			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.post(path, form, header);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 400) {
				if (e.response?.data?.errors?.length) {
					alert(e.response?.data.errors[0].msg);
				}
				return false;
			} else if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				if (e.response.data.message) {
					alert(msg);
				}
			}
			return;
		}
	},

	apiDOWN: async (_path, fileType) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;

		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const re = await axios.get(path, {
				responseType: 'arraybuffer',
				headers: {
					'Content-Type': 'application/json',
					Accept: fileType,
				},
			});

			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.get(path);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				if (e.response.data.message) {
					alert(msg);
				}
			}
		}
	},

	imgResize: async file => {
		var imageResize = new ImageResize({
			format: 'png',
			quality: 0.6,
		});

		let _base64 = await imageResize.play(file);
		let _file = base64toFile(_base64, file.name);

		return { file: _file, base64: _base64 };
	},

	checkPer(mid) {
		// console.log(store.getters.getUserInfo.mem_uid, mid);
		if (store.getters.getUserInfo.mem_uid == mid || store.getters.getUserInfo.mem_type == 'master') {
			return true;
		} else {
			return false;
		}
	},

	fileToBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async () => {
				try {
					resolve(reader.result);
				} catch (error) {
					reject(null);
				}
			};

			reader.onerror = async () => {
				reject(null);
			};
		});
	},

	apiPDF: async (_path, param) => {
		const path = process.env.VUE_APP_HOST_BACK + _path;

		let msg = '잠시후 다시 시도 해주세요.';
		try {
			const header = { 'Content-Type': 'multipart/form-data', responseType: 'blob' };
			const storeToken = store.getters.getToken;

			if (storeToken) {
				axios.defaults.headers.common.authorization = storeToken.accessToken;
				axios.defaults.headers.common.refresh = storeToken.refreshToken;
			}

			const mapImages = [];
			const mapEls = document.querySelectorAll('[id^="map_"]');

			for (const el of mapEls) {
				const canvas = await html2canvas(el, {
					useCORS: true,
					backgroundColor: null,
					scale: 2, // ⭐ PDF 해상도용
				});

				mapImages.push({
					id: el.id,
					image: canvas.toDataURL('image/png'),
				});
			}
			let form = new FormData();
			form.append('url', param.url);
			form.append('idList', JSON.stringify(param.idList));
			form.append('name', param.name);
			form.append('stroage', JSON.stringify(param.stroage));
			mapImages.forEach((item, idx) => {
				if (item.image === 'data:,') {
					return;
				}
				idx;
				form.append('files', dataURLtoBlob(item.image), `${item.id}.png`);
			});

			const re = await axios.post(path, form, header);
			const blob = new Blob([re.data], { type: 'application/pdf' });
			const link = document.createElement('a');
			
			link.href = URL.createObjectURL(blob);
			link.download = `${param.name}.pdf`;
			link.click();

			if (re.data.status == 402) {
				const ref = await axios.get(process.env.VUE_APP_HOST_BACK + '/users/refresh');
				axios.defaults.headers.common.authorization = ref.data.data.accessToken;
				axios.defaults.headers.common.refresh = ref.data.data.refreshToken;

				store.dispatch('callSetToken', {
					accessToken: ref.data.data.accessToken,
					refreshToken: ref.data.data.refreshToken,
				});

				const re_ = await axios.post(path, param);
				return re_.data;
			} else {
				return re.data;
			}
		} catch (e) {
			if (e.response?.status == 400) {
				if (e.response?.data?.errors?.length) {
					alert(e.response?.data.errors[0].msg);
				}
				return false;
			} else if (e.response?.status == 401) {
				axios.defaults.headers.common.authorization = '';
				axios.defaults.headers.common.refresh = '';

				router.push({
					name: 'LoginView',
				});
				return;
			} else {
				console.log(e);
				if (e.response.data.message) {
					alert(msg);
				}
			}
			return;
		}
	},

	shortAdr(addr) {
		if (!addr) return '';
	
		const cityMap = {
			// 특별시 / 광역시
			'서울특별시': '서울',
			'부산광역시': '부산',
			'대구광역시': '대구',
			'인천광역시': '인천',
			'광주광역시': '광주',
			'대전광역시': '대전',
			'울산광역시': '울산',
			'세종특별자치시': '세종',
	
			// 도
			'경기도': '경기',
			'강원도': '강원',
			'충청북도': '충북',
			'충청남도': '충남',
			'전라북도': '전북',
			'전라남도': '전남',
			'경상북도': '경북',
			'경상남도': '경남',
			'제주특별자치도': '제주'
		};
	
		let result = addr;
	
		// 시/도 축약
		Object.entries(cityMap).forEach(([full, short]) => {
			result = result.replace(full, short);
		});
	
		// ○○도 → ○○
		result = result.replace(/([가-힣]+)도/g, '$1');
	
		// 번지 제거
		result = result.replace(/번지/g, '');
	
		// 공백 정리
		result = result.replace(/\s+/g, ' ').trim();
	
		return result;
	},
};

export default {
	install(Vue) {
		Vue.config.globalProperties.$reloadPage = methods.reloadPage;
		Vue.config.globalProperties.$m2_py_ex = methods.m2_py_ex;
		Vue.config.globalProperties.$py_m2_ex = methods.py_m2_ex;
		Vue.config.globalProperties.$dateNowFormat = methods.dateNowFormat;
		Vue.config.globalProperties.$dateNowFormat2 = methods.dateNowFormat2;
		Vue.config.globalProperties.$dateWorkingFormat = methods.dateWorkingFormat;
		Vue.config.globalProperties.$dateWeekFormat = methods.dateWeekFormat;
		Vue.config.globalProperties.$openNaver = methods.openNaver;
		Vue.config.globalProperties.$openNaverMap = methods.openNaverMap;
		Vue.config.globalProperties.$openDaumMap = methods.openDaumMap;
		Vue.config.globalProperties.$CLIENT_PHONE_REASON = CLIENT_PHONE_REASON;
		Vue.config.globalProperties.$INTERIOR_TYPE = INTERIOR_TYPE;
		Vue.config.globalProperties.$RENT_FREE = RENT_FREE;
		Vue.config.globalProperties.$IMG_NAME = IMG_NAME;
		Vue.config.globalProperties.$MONEY1 = MONEY1;
		Vue.config.globalProperties.$MONEY2 = MONEY2;
		Vue.config.globalProperties.$M2_PY_EX = M2_PY_EX;
		Vue.config.globalProperties.$PY_M2_EX = PY_M2_EX;
		Vue.config.globalProperties.$ITEM_STATE = ITEM_STATE;
		Vue.config.globalProperties.$ITEM_STATE2 = ITEM_STATE2;
		Vue.config.globalProperties.$CLIENT_LOG_TYPE = CLIENT_LOG_TYPE;
		Vue.config.globalProperties.$CLIENT_TYPE = CLIENT_TYPE;
		Vue.config.globalProperties.$COM_INFO = COM_INFO;
		Vue.config.globalProperties.$BUILDING_INFO = BUILDING_INFO;
		Vue.config.globalProperties.$MEM_TYPE = MEM_TYPE;
		Vue.config.globalProperties.$HIRE_STATUS = HIRE_STATUS;
		Vue.config.globalProperties.$LOG_CHG_INFO = LOG_CHG_INFO;
		Vue.config.globalProperties.$MONEY_FORMAT_TYPE = MONEY_FORMAT_TYPE;
		Vue.config.globalProperties.$datetimeFormat = methods.datetimeFormat;
		Vue.config.globalProperties.$dateToFormat = methods.dateToFormat;
		Vue.config.globalProperties.$dateFormat = methods.dateFormat;
		Vue.config.globalProperties.$dateFormat2 = methods.dateFormat2;
		Vue.config.globalProperties.$datetimeNowFormat = methods.datetimeNowFormat;
		Vue.config.globalProperties.$dateSub = methods.dateSub;
		Vue.config.globalProperties.$getFloorString = methods.getFloorString;
		Vue.config.globalProperties.$getFloorString3 = methods.getFloorString3;
		Vue.config.globalProperties.$numberToKorean = methods.numberToKorean;
		Vue.config.globalProperties.$formatMoney = methods.formatMoney;
		Vue.config.globalProperties.$formatMoneyBasedOnWon = methods.formatMoneyBasedOnWon;
		Vue.config.globalProperties.$groupBy = methods.groupBy;
		Vue.config.globalProperties.$isEmpty = methods.isEmpty;
		Vue.config.globalProperties.$pageDataSetting = methods.pageDataSetting;
		Vue.config.globalProperties.$objCompare = methods.objCompare;
		Vue.config.globalProperties.$apiGET = methods.apiGET;
		Vue.config.globalProperties.$apiDOWN = methods.apiDOWN;
		Vue.config.globalProperties.$apiPOST = methods.apiPOST;
		Vue.config.globalProperties.$apiLOGIN = methods.apiLOGIN;
		Vue.config.globalProperties.$apiLOGOUT = methods.apiLOGOUT;
		Vue.config.globalProperties.$apiIMG = methods.apiIMG;
		Vue.config.globalProperties.$apiFILE = methods.apiFILE;
		Vue.config.globalProperties.$apiPOST_ADD = methods.apiPOST_ADD;
		Vue.config.globalProperties.$imgResize = methods.imgResize;
		Vue.config.globalProperties.$exportPrint = methods.exportPrint;
		Vue.config.globalProperties.$dateKorFormat = methods.dateKorFormat;
		Vue.config.globalProperties.$checkPer = methods.checkPer;
		Vue.config.globalProperties.$fileToBase64 = methods.fileToBase64;
		Vue.config.globalProperties.$apiPDF = methods.apiPDF;
		Vue.config.globalProperties.$shortAdr = methods.shortAdr;
	},
};
