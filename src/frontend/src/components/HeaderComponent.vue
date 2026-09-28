<template>
	<div class="spinner-border--wrap" v-if="isLoading">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div class="header">
		<div class="left">
			<!-- <button @click="testImg">1111111</button> -->
			<h1 class="header-logo" @click="btnMain">부동산중개주식회사</h1>
			<ul class="header-menu">
				<li class="header-menu--item">
					<router-link
						type="button"
						class="btn menu"
						to="/MapSearch"
						v-bind:class="{ on: currentRouteName == 'MapSearch' }"
					>
						매매지도
					</router-link>
					<!-- <router-link
						type="button"
						class="btn menu"
						to="/LeaseMapSearch"
						v-bind:class="{ on: currentRouteName == 'LeaseMapSearch' }"
					>
						임대지도
					</router-link> -->
					<router-link
						type="button"
						class="btn menu"
						to="/TotalSearch"
						v-bind:class="{ on: currentRouteName == 'TotalSearch' }"
					>
						매매검색
					</router-link>
					<!-- <router-link
						type="button"
						class="btn menu"
						to="/LeaseSearch"
						v-bind:class="{ on: currentRouteName == 'LeaseSearch' }"
					>
						임대검색
					</router-link> -->
					<router-link
						type="button"
						class="btn menu"
						to="/UserAdmin"
						v-bind:class="{ on: currentRouteName == 'UserAdmin' }"
					>
						매매고객
					</router-link>
					<!-- <router-link
						type="button"
						class="btn menu"
						to="/LeaseUserAdmin"
						v-bind:class="{ on: currentRouteName == 'LeaseUserAdmin' }"
					>
						임대고객
					</router-link> -->
					<router-link
						type="button"
						class="btn menu"
						to="/WorkAdmin"
						v-bind:class="{ on: currentRouteName == 'WorkAdmin' }"
					>
						매매작업
					</router-link>
					<!-- <router-link
						type="button"
						class="btn menu"
						to="/LeaseAdmin"
						v-bind:class="{ on: currentRouteName == 'LeaseAdmin' }"
					>
						임대작업
					</router-link> -->
					<!-- <router-link
						type="button"
						class="btn menu"
						to="/Scraping"
						v-bind:class="{ on: currentRouteName == 'Scraping' }"
					>
						신규물건
					</router-link> -->
					<router-link
						type="button"
						class="btn menu"
						to="/SystemAdmin"
						v-bind:class="{ on: currentRouteName == 'SystemAdmin' }"
						v-if="$store.getters.getUserInfo.mem_type == 'master'"
					>
						시스템관리
					</router-link>
				</li>
			</ul>
		</div>
		<div class="right">
			<button type="button" class="btn menu" @click="btnOnCreateMap()">신규물건등록</button>
			<router-link type="button" class="btn menu" to="/Post"> 쪽지함 {{ postList.length }}</router-link>
			<div class="user">
				<b-icon-person-fill />
				{{ $store.getters.getGuest ? 'GUEST' : $store.getters.getUserInfo.mem_name }} 님({{
					$store.getters.getUserInfo.mem_id
				}})
				<button type="button" class="btn btn-light btn-sm" @click="btnLogout">로그아웃</button>
			</div>
		</div>
		<div v-if="isNewRegisterPopupShow" class="popup-wrap">
			<div class="dim" @click="isNewRegisterPopupShow = false"></div>
			<div class="popup md">
				<div class="popup-tit">
					신규물건등록
					<button type="button" class="btn btn-close" @click="isNewRegisterPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<div class="tab-btn sm">
						<button type="button" class="btn tab" v-bind:class="{ active: isRent == false }" @click="initData(false)">
							매매
						</button>
						<!-- <button type="button" class="btn tab" v-bind:class="{ active: isRent == true }" @click="initData(true)">
							임대
						</button> -->
					</div>
					<div class="search-top mb-2">
						<div class="left">
							<label class="input-label">주소입력</label>
							<!-- <select class="form-control select sm m-r--1">
								<option>전체</option>
							</select>
							<select class="form-control select sm m-r--1">
								<option>전체</option>
							</select>
							<select class="form-control select sm m-r--1">
								<option>전체</option>
							</select>
							<select class="form-control select xsm m-r--1">
								<option>제목</option>
							</select> 
							<input type="text" class="form-control xsm m-r--1" placeholder="번" />
							<input type="text" class="form-control xsm m-r--1" placeholder="지" /> -->

							<input type="text" class="form-control" placeholder="주소" v-model="adr" @keyup.enter="searchAddress" />
							<button type="button" class="btn btn-primary btn-sm" @click="searchAddress">검색</button>
						</div>
					</div>
					<div class="tab-con" v-if="adrList.length">
						<div class="table-wrap">
							<table class="table sm mt-2">
								<colgroup>
									<col width="5%" />
									<col width="45%" />
									<col width="45%" />
									<col width="5%" />
								</colgroup>
								<tr>
									<th>no</th>
									<th>지번주소</th>
									<th>도로명주소</th>
									<th>선택</th>
								</tr>
								<tr v-for="(isAdr, idx) in adrList" :key="'adrList_' + idx">
									<td>{{ idx + 1 }}</td>
									<td>{{ isAdr.jibunAddress }}</td>
									<td>{{ isAdr.roadAddress }}</td>
									<td>
										<button type="button" class="btn btn-sm" @click="resultAddress(isAdr)">선택</button>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<br />
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<tr>
							<th>도로명주소</th>
							<td>{{ roadAddress }}</td>
						</tr>
						<tr>
							<th>지번주소</th>
							<td>{{ jibunAddress }}</td>
						</tr>
						<tr>
							<th>물건명</th>
							<td><input type="text" class="form-control" v-model="bName" /></td>
						</tr>
					</table>
					<div class="map sm mt-2"><div id="createMap"></div></div>
					<div v-if="itemList.length">
						<div class="tab-con">
							<div class="table-wrap">
								<table class="table sm mt-2" v-if="!isRent">
									<colgroup>
										<col width="15%" />
										<col width="10%" />
										<col width="5%" />
										<col width="30%" />
										<col width="10%" />
										<col width="30%" />
										<col width="10%" />
										<col width="10%" />
										<col width="10%" />
									</colgroup>
									<tr>
										<th>등록일시</th>
										<th>물건번호</th>
										<th>상태</th>
										<th>물건명</th>
										<th>소유자</th>
										<th>주소</th>
										<th>대지(평)</th>
										<th>연면적(평)</th>
										<th>매매가</th>
									</tr>
									<tr v-for="item in itemList" :key="'setting_' + item.ind_cfg_uid">
										<td>{{ $dateFormat(item.reg_date) }}</td>
										<td>{{ item.building_uid }}</td>
										<td>{{ $ITEM_STATE[item.sell_status] }}</td>
										<td>{{ item.building_name }}</td>
										<td>{{ item.owner_name }}</td>
										<td>{{ item.jibun_addr }}</td>
										<td>{{ item.land_size_p }}</td>
										<td>{{ item.total_size_p }}</td>
										<td>{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
									</tr>
								</table>
								<table class="table sm mt-2" v-else>
									<colgroup>
										<col width="15%" />
										<col width="10%" />
										<col width="5%" />
										<col width="30%" />
										<col width="10%" />
										<col width="10%" />
										<col width="30%" />
										<col width="10%" />
										<col width="10%" />
										<col width="10%" />
									</colgroup>
									<tr>
										<th>등록일시</th>
										<th>물건번호</th>
										<th>상태</th>
										<th>물건명</th>
										<th>소유자</th>
										<th>층 정보</th>
										<th>주소</th>
										<th>대지(평)</th>
										<th>연면적(평)</th>
										<th>보증금</th>
										<th>월세</th>
									</tr>
									<tr v-for="item in itemList" :key="'setting_' + item.ind_cfg_uid">
										<td>{{ $dateFormat(item.reg_date) }}</td>
										<td>{{ item.building_uid }}</td>
										<td>{{ $ITEM_STATE[item.sell_status] }}</td>
										<td>{{ item.building_name }}</td>
										<td>{{ item.owner_name }}</td>
										<td>{{ item.floor_info }}</td>
										<td>{{ item.jibun_addr }}</td>
										<td>{{ item.land_size_p }}</td>
										<td>{{ item.total_size_p }}</td>
										<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
										<td>{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="btn-wrap">
						<button v-if="itemList.length" type="button" class="btn btn-sm btn-danger" @click="btnOnCreate()">
							중복물건등록
						</button>
						<button v-else type="button" class="btn btn-sm btn-primary" @click="btnOnCreate()">물건등록</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isId !== false" class="popup-wrap">
			<div class="dim" @click="isId = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					쪽지내용보기
					<button type="button" class="btn btn-close" @click="isId = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<tr>
							<th>보낸사람</th>
							<td>
								{{ postList[isId].reg_mem_name }} {{ postList[isId].reg_mem_rank_name }} ({{
									$datetimeFormat(postList[isId].reg_date)
								}})
							</td>
						</tr>
						<tr>
							<th>받는사람</th>
							<td>
								{{ postList[isId].recv_mem_name }} {{ postList[isId].recv_mem_rank_name }} ({{
									$datetimeFormat(postList[isId].recv_date)
								}})
							</td>
						</tr>
						<tr>
							<th>제목</th>
							<td>
								{{ postList[isId].title }}
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
								<div class="text-pre" v-html="postList[isId].memo.replace('\n', '<br />')"></div>
							</td>
						</tr>
						<tr>
							<th>연결링크</th>
							<td>
								<button
									v-if="postList[isId].link_uid"
									type="button"
									class="btn btn-xsm btn-secondary"
									@click="btnOnDetail(postList[isId].link_uid, postList[isId].link_type)"
								>
									<b-icon-link-45deg />{{ postList[isId].link_type == 'building' ? '매매' : '임대'
									}}{{ postList[isId].building_name }}
								</button>
							</td>
						</tr>
						<tr v-if="postList[isId].files.length >= 1">
							<th :rowspan="postList[isId].files.length">파일</th>
							<td>
								<button type="button" class="btn btn-xsm btn-light" @click="downFile(postList[isId].files[0])">
									<b-icon-download />{{ postList[isId].files[0].org_name }}
								</button>
							</td>
						</tr>
						<tr v-if="postList[isId].files.length >= 2">
							<td>
								<button type="button" class="btn btn-xsm btn-light" @click="downFile(postList[isId].files[1])">
									<b-icon-download />{{ postList[isId].files[1].org_name }}
								</button>
							</td>
						</tr>
						<tr v-if="postList[isId].files.length >= 3">
							<td>
								<button type="button" class="btn btn-xsm btn-light" @click="downFile(postList[isId].files[2])">
									<b-icon-download />{{ postList[isId].files[2].org_name }}
								</button>
							</td>
						</tr>
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-secondary" @click="isId = false">취소</button>
						<button type="button" class="btn btn-sm btn-success" @click="btnOnDelete(postList[isId])">삭제</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'HeaderComponent',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	data() {
		return {
			map: null,
			marker: null,
			mapType: null,

			bName: '',
			adrList: [],
			adr: '',
			roadAddress: '',
			jibunAddress: '',
			zonecode: null,
			point: null,
			mode: true,
			isRent: false,
			itemList: [],

			postList: [],
			isId: false,

			isNewRegisterPopupShow: false,

			isLoading: false,
		};
	},
	watch: {
		$route(to, form) {
			if (to.path !== form.path && to.path != '/Post') {
				this.getPostCk();
			}
		},
	},
	created() {
		window.resultAddress = this.resultAddress;
		window.setAdr = this.setAdr;

		// this.$loadScript(
		// 	'https://https://openapi.map.naver.com/openapi/v3/maps.js?clientId=' +
		// 		process.env.VUE_APP_NAVER_API_ID +
		// 		'&submodules=geocoder',
		// )
		// 	.then(() => {})
		// 	.catch(() => {});

		this.getUser();
	},
	updated() {},
	methods: {
		getPostCk() {
			this.$apiGET('/admin/api/post/get/ck').then(data => {
				if (data && data.length) {
					this.postList = data;

					alert('새로운 쪽지가 있습니다.');

					this.btnOnPostDetail(0);
				}
			});
		},
		downFile(item) {
			this.$apiDOWN('/admin/api/post/file/get?id=' + item.id).then(re => {
				const url = window.URL.createObjectURL(new Blob([re]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', item.org_name); //or any other extension
				document.body.appendChild(link);
				link.click();
			});
		},
		btnOnDetail(id, type) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (type == 'building') {
				window.open('MapDetail/' + id, '', attr);
			} else if (type == 'rent_building') {
				window.open('LeaseMapDetail/' + id, '', attr);
			}
		},
		btnOnPostDetail(idx) {
			this.$apiPOST('/admin/api/post/recv', { pid: this.postList[idx].post_uid }).then(() => {
				this.postList[idx].recv_date = this.$datetimeNowFormat();
				this.isId = idx;
			});
		},
		btnOnDelete(item) {
			this.$apiPOST('/admin/api/post/delete', { pid: item.post_uid, postMode: 'recv' }).then(() => {
				this.isId = false;
				this.postList.splice(0, 1);
			});
		},
		getUser() {
			this.$apiGET('/admin/api/user/info').then(re => {
				if (re) {
					this.$store.dispatch('callSetUserInfo', re);
				}
			});
		},
		btnMain() {
			this.$router.push({ name: 'MainDashboard' });
		},
		btnLogout() {
			this.$apiLOGOUT('/admin/api/logout');
		},
		btnOnCreateMap() {
			this.$loadScript(
				'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
					process.env.VUE_APP_NAVER_API_ID +
					'&submodules=geocoder',
			)
				.then(() => {
					this.marker?.setMap(null);
					this.mapType = new window.naver.maps.CadastralLayer();
					this.initData(false);

					this.isNewRegisterPopupShow = true;
					this.$nextTick(() => {
						this.loadMap();
					});
				})
				.catch(() => {});
		},
		loadMap() {
			this.map = new window.naver.maps.Map('createMap', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 19,
			});

			this.mapType.setMap(this.map);
		},
		searchAddress() {
			window.naver.maps.Service.geocode({ address: this.adr }, function (status, re) {
				if (status === window.naver.maps.Service.Status.ERROR) {
					alert('Something wrong!');
					return;
				}
				if (!re.result.total) {
					alert('검색결과가 없습니다.');
					return;
				}

				window.setAdr(re.v2.addresses);

				// window.resultAddress(re.v2.addresses[0]);
			});
		},
		setAdr(addresses) {
			this.adrList = addresses;
		},
		resultAddress(item_) {
			this.marker?.setMap(null);
			this.jibunAddress = '';
			this.roadAddress = '';
			this.zonecode = null;

			let item = JSON.parse(JSON.stringify(item_));

			if (item.jibunAddress.indexOf(item.addressElements[6].longName) != -1) {
				let str = item.jibunAddress.split(' ');

				for (let i = 0; i < str.length; i++) {
					if (str[i] == item.addressElements[6].longName) {
						str.splice(i, 1);

						item.jibunAddress = str.join(' ');
					}
				}
			}
			item.jibunAddress = item.jibunAddress.replace('서울특별시', '서울시');
			this.jibunAddress = item.jibunAddress;

			if (item.roadAddress.indexOf(item.addressElements[6].longName) != -1) {
				let str = item.roadAddress.split(' ');

				for (let i = 0; i < str.length; i++) {
					if (str[i] == item.addressElements[6].longName) {
						str.splice(i, 1);

						item.roadAddress = str.join(' ');
					}
				}
			}

			item.roadAddress = item.roadAddress.replace('서울특별시', '서울시');
			this.roadAddress = item.roadAddress;

			if (this.roadAddress) {
				this.roadAddress += '(' + item.addressElements[2].longName + ')';
			}

			this.point = { x: item.x, y: item.y };
			this.zonecode = item.addressElements[8].longName == '' ? 0 : Number(item.addressElements[8].longName);

			this.map.setCenter({ lat: this.point.y, lng: this.point.x });

			this.marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.point.y, this.point.x),
				map: this.map,
			});

			// this.$apiGET(
			// 	'http://api.vworld.kr/req/search?key=CDE0B5E6-CF04-329E-BAF4-98B109A462A6&request=search&type=address&category=parcel&query=군서리 100-32',
			// ).then(re => {
			// 	console.log(re);
			// });
		},
		btnOnCreate() {
			if (!this.roadAddress && !this.jibunAddress) {
				alert('주소를 선택해주세요.');
				return;
			}

			this.isLoading = true;
			this.$apiPOST('/admin/api/create/building', {
				zonecode: this.zonecode,
				road_addr: this.roadAddress,
				jibun_addr: this.jibunAddress,
				lat: this.point.y,
				lng: this.point.x,
				name: this.bName,
				mode: this.mode,
				isRent: this.isRent,
			}).then(re => {
				if (re == false) {
					this.isLoading = false;
					return;
				}

				if (!re.st && re.item?.length) {
					this.itemList = re.item;
					this.mode = false;
					alert('등록하려는 물건과 동일주소의 물건이 존재합니다.');
					this.isLoading = false;
					return;
				}

				this.bName = '';
				this.adr = '';
				this.roadAddress = '';
				this.jibunAddress = '';
				this.zonecode = null;
				this.point = null;
				this.mode = true;
				this.isRent = false;
				this.itemList = [];

				this.isNewRegisterPopupShow = false;

				alert('등록 완료');

				this.isLoading = false;
			});
		},
		initData(st) {
			this.bName = '';
			this.adr = '';
			this.roadAddress = '';
			this.jibunAddress = '';
			this.zonecode = null;
			this.point = null;
			this.mode = true;
			this.itemList = [];
			this.adrList = [];

			this.isRent = st;
		},
	},
};
</script>
