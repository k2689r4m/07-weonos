<template>
	<div class="wrap">
		<div class="spinner-border--wrap" v-if="isLoading">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div class="content">
			<div class="detail-page" v-if="item">
				<div class="detail-page--top">
					<div class="left">
						<div class="state">
							<span class="date">{{ $dateFormat(item.con_date) }}</span>
							<p class="name">{{ item.tradeTypeName }}</p>
						</div>
					</div>
					<div class="info">
						<div class="top"><b-icon-journal-text /> 물건번호 : {{ item.item_id }}</div>
						<div class="bottom">
							{{ item.realestateTypeName }} {{ item.buildingTypeName ? '(' + item.buildingTypeName + ')' : '' }}
						</div>
					</div>
					<div class="input-box">
						<label class="label">태그</label>
						<input type="text" class="form-control" v-model="item.tagList" readonly style="width: 500px" />
					</div>
					<div class="page">
						<button type="button" class="btn first" @click="getTotal('first')"><b-icon-chevron-double-left /></button>
						<button type="button" class="btn prev" @click="getTotal('prev')"><b-icon-chevron-left /></button>
						<input type="text" class="form-control" v-model="searchInfo.idx" @keyup.enter="getTotal('sel_idx')" />
						&nbsp;&nbsp;/&nbsp;&nbsp;
						<input
							type="text"
							class="form-control"
							v-model="searchInfo.totalCount"
							disabled
							style="background-color: white"
						/>
						<button type="button" class="btn next" @click="getTotal('next')"><b-icon-chevron-right /></button>
						<button type="button" class="btn last" @click="getTotal('last')"><b-icon-chevron-double-right /></button>
					</div>
					<div class="right">
						<div class="bottom">
							<button type="button" class="btn btn-lg btn-secondary" @click="$openNaver(item.item_id)">실매물</button>
							<button type="button" class="btn btn-lg btn-primary" @click="saveBuilding">매물저장</button>
						</div>
					</div>
				</div>
				<div class="detail-page--con">
					<div class="left">
						<div class="con">
							<div class="tit">
								주소
								<button
									type="button"
									class="btn map2"
									@click.stop="$openDaumMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
								<button
									type="button"
									class="btn map1"
									@click.stop="$openNaverMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
							</div>
							<div class="text">{{ item.exposureAddress }} {{ item.jibunAddress }} {{ item.etcAddress }}</div>
						</div>
						<div class="con">
							<div class="tit">금액정보</div>
							<table class="table type-input">
								<colgroup>
									<col width="35%" />
									<col width="65%" />
								</colgroup>
								<tr>
									<th>보증금</th>
									<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>월세</th>
									<td>{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>전용률</th>
									<td>{{ item.ex_rate }}%</td>
								</tr>
								<tr>
									<th>융자금</th>
									<td>
										{{ item.loan }}
									</td>
								</tr>
								<tr>
									<th>월관리비</th>
									<td>{{ $formatMoney(item.main_fee / 10000, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">토지정보</div>
							<table class="table type-input">
								<colgroup>
									<col width="35%" />
									<col width="65%" />
								</colgroup>
								<tr>
									<th>대지면적</th>
									<td>
										{{ item.groundSpace_m2 }}㎡ <strong>[{{ item.groundSpace_py }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>용도지역</th>
									<td>{{ item.area_use }}</td>
								</tr>
								<tr>
									<th>주변역</th>
									<td>{{ item.subway }}{{ item.subway_dis ? ' (' + item.subway_dis + 'm' + ')' : '' }}</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">건축물정보</div>
							<table class="table type-input">
								<colgroup>
									<col width="35%" />
									<col width="65%" />
								</colgroup>
								<tr>
									<th>연면적</th>
									<td>
										{{ item.totalSpace_m2 }}㎡ <strong>[{{ item.totalSpace_py }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>건축면적</th>
									<td>
										{{ item.buildingSpace_m2 }}㎡ <strong>[{{ item.buildingSpace_py }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>전용면적</th>
									<td>
										{{ item.net_area_m2 }}㎡ <strong>[{{ item.net_area_py }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>임대면적</th>
									<td>
										{{ item.rent_area_m2 }}㎡ <strong>[{{ item.rent_area_py }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>{{ item.building_date_type ? item.building_date_type : '사용승인일' }}</th>
									<td>{{ $dateFormat(item.building_date) }}</td>
								</tr>
								<tr>
									<th>건폐율/용적률</th>
									<td>{{ item.buildingCoverageRatio }}%/{{ item.floorAreaRatio }}%</td>
								</tr>
								<tr>
									<th>주차대수</th>
									<td>{{ item.parking_total ? item.parking_total + ' 대' : '' }}</td>
								</tr>
								<tr>
									<th>건축물용도</th>
									<td>{{ item.lawUsage }}</td>
								</tr>
								<tr>
									<th>주구조</th>
									<td>{{ item.structure }}</td>
								</tr>
								<tr>
									<th>해당층/총층</th>
									<td>{{ item.floor_cur }} / {{ item.floor_max }} 층</td>
								</tr>
								<tr>
									<th>난방</th>
									<td>{{ item.heating }}/{{ item.heating_type }}</td>
								</tr>
								<tr>
									<th>냉방시설</th>
									<td>{{ item.cooling }}</td>
								</tr>

								<tr>
									<th>보안시설</th>
									<td>{{ item.securityFacilities }}</td>
								</tr>
								<tr>
									<th>기타시설</th>
									<td>{{ item.etc }}</td>
								</tr>

								<tr>
									<th>현재용도</th>
									<td>{{ item.sectors }}</td>
								</tr>
								<tr>
									<th>추천용도</th>
									<td>{{ item.su_sectors }}</td>
								</tr>
								<tr>
									<th>입주가능일</th>
									<td>{{ $dateFormat(item.in_date) }} {{ item.in_date_type }} {{ item.in_date_st }}</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="center">
						<div class="con">
							<div class="tit">특징</div>
							<div class="feature">
								<div class="left">
									<div id="pano" style="width: 100%; height: 500px"></div>
								</div>
								<div class="right">
									<div id="map"></div>
								</div>
							</div>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button type="button" class="btn tab active">존재매물</button>
							</div>
							<div class="table-wrap">
								<table class="table click">
									<tr>
										<th>상태</th>
										<th>물건번호</th>
										<th>물건명</th>
										<th>주소</th>
										<th>계약/전용(평)</th>
										<th>보증금(만)</th>
										<th>월고정비</th>
										<th>주변역</th>
									</tr>
									<tr
										v-for="item_ in buildnigList"
										:key="'de_' + item_.building_uid"
										@click="btnOnDetail(item_.building_uid)"
									>
										<td>{{ $ITEM_STATE[item_.sell_status] }}</td>
										<td>{{ item_.building_uid }}</td>
										<td>{{ item_.building_name }}</td>
										<td>{{ item_.jibun_addr }}<br />{{ item_.road_addr }}</td>

										<td>{{ item_.rent_area_py }} / {{ item_.net_area_py }}</td>
										<td>{{ $formatMoney(item_.deposit, $MONEY_FORMAT_TYPE.MUCH) }}</td>
										<td>{{ $formatMoney(item_.monthly_fixed, $MONEY_FORMAT_TYPE.MUCH) }}</td>
										<td>{{ item_.substation }}</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export default {
	name: 'ScrapingDetail',
	components: {},
	data() {
		return {
			bid: null,
			map: null,
			marker: null,
			marker2: null,
			pano: null,

			item: null,
			rentList: [],
			floorList: [],
			mgrLogList: [],
			clientLogList: [],
			clientTypeList: [],
			viewObj: {},
			searchOptions: {
				type: '',
				keyword: '',
			},
			multSettings: {
				placeholderText: '매물종류',
				searchText: '결과 없음',
				searchPlaceholder: '검색',
			},
			multData: [
				{ text: 'Value 1', value: 1 },
				{ text: 'Value 2', value: 2 },
				{ text: 'Value 3', value: 3 },
			],

			buildnigList: [],

			isLoading: false,

			searchInfo: null,
		};
	},
	mounted() {},
	created() {
		this.bid = this.$route.params.id;

		this.$loadScript(
			'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
				process.env.VUE_APP_NAVER_API_ID +
				'&submodules=panorama',
		)
			.then(() => {})
			.catch(() => {});

		this.searchInfo = this.$route.query;

		this.init();
	},
	methods: {
		init() {
			this.map = null;
			this.marker = null;
			this.marker2 = null;
			this.item = null;

			this.getItem();
		},

		getItem() {
			this.$apiGET('/admin/api/sc/item?id=' + this.bid).then(data => {
				data.isRent = true;

				this.item = data;

				this.getbuilding(this.item.pnu);
				this.$nextTick(() => {
					setTimeout(
						function () {
							this.loadMap();
						}.bind(this),
						250,
					);
				});
				// setTimeout(
				// 	function () {
				// 		this.loadMap();
				// 	}.bind(this),
				// 	250,
				// );
			});
		},
		getbuilding(pnu) {
			this.$apiGET('/admin/api/sc/item/building2?pnu=' + pnu).then(data => {
				this.buildnigList = data;
			});
		},
		saveBuilding() {
			this.isLoading = true;
			this.$apiPOST('/admin/api/sc/create/building', this.item).then(re => {
				if (re.st) {
					alert('저장 완료');
					this.isLoading = false;
					this.$router.push({ path: '/LeaseMapDetail/' + re.item });
				} else {
					alert(re.msg);
					this.isLoading = false;
				}
			});
		},

		loadMap() {
			this.map = new window.naver.maps.Map('map', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 18,
			});
			this.map.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			this.map.setSize({ width: '812px', height: '500px' });
			this.marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.map,
			});

			this.pano = new window.naver.maps.Panorama('pano', {
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
			});

			this.marker2 = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.pano,
			});

			window.naver.maps.Event.addListener(this.pano, 'init', function () {
				this.marker2.setMap(this.pano);

				var proj = this.pano.getProjection();
				var lookAtPov = proj.fromCoordToPov(this.marker2.getPosition());
				if (lookAtPov) {
					this.pano.setPov(lookAtPov);
				}
			});
		},
		btnOnDetail(cid) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('/LeaseMapDetail/' + cid, '', attr);
		},
		getTotal(act_type) {
			switch (act_type) {
				case 'first': //  맨처음      : idx = 1로 변경한다.
					if (this.searchInfo.idx == 1) {
						alert('처음입니다.');
						return;
					}
					this.searchInfo.idx = 1;
					break;
				case 'prev': //  이전        : 현재 idx = idx - 1 로 변경한다.
					if (this.searchInfo.idx == 1) {
						alert('처음입니다.');
						return;
					}
					this.searchInfo.idx--;
					break;
				case 'next': //  다음        : 현재 idx = idx + 1 로 변경한다.
					if (this.searchInfo.idx == this.searchInfo.totalCount) {
						alert('마지막입니다.');
						return;
					}
					this.searchInfo.idx++;
					break;
				case 'last': //  마지막      : 현재 idx = 마지막으로 변경한다.
					if (this.searchInfo.idx == this.searchInfo.totalCount) {
						alert('마지막입니다.');
						return;
					}
					this.searchInfo.idx = this.searchInfo.totalCount;
					break;
			}

			this.$apiGET(
				'/admin/api/sc/server/item/count?tradeTypeName=' +
					this.searchInfo.tradeTypeName +
					'&realestateTypeName=' +
					this.searchInfo.realestateTypeName +
					'&exposureAddress=' +
					this.searchInfo.exposureAddress +
					'&dealPrice_ST=' +
					this.searchInfo.dealPrice_ST +
					'&deposit_ST=' +
					this.searchInfo.deposit_ST +
					'&monthly_rent_ST=' +
					this.searchInfo.monthly_rent_ST +
					'&dealPrice_S=' +
					this.searchInfo.dealPrice_S +
					'&dealPrice_E=' +
					this.searchInfo.dealPrice_E +
					'&deposit_S=' +
					this.searchInfo.deposit_S +
					'&deposit_E=' +
					this.searchInfo.deposit_E +
					'&monthly_rent_S=' +
					this.searchInfo.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchInfo.monthly_rent_E +
					'&totalSpace_ST=' +
					this.searchInfo.totalSpace_ST +
					'&groundSpace_ST=' +
					this.searchInfo.groundSpace_ST +
					'&rent_area_ST=' +
					this.searchInfo.rent_area_ST +
					'&net_area_ST=' +
					this.searchInfo.net_area_ST +
					'&totalSpace_py_S=' +
					this.searchInfo.totalSpace_py_S +
					'&totalSpace_py_E=' +
					this.searchInfo.totalSpace_py_E +
					'&groundSpace_py_S=' +
					this.searchInfo.groundSpace_py_S +
					'&groundSpace_py_E=' +
					this.searchInfo.groundSpace_py_E +
					'&rent_area_py_S=' +
					this.searchInfo.rent_area_py_S +
					'&rent_area_py_E=' +
					this.searchInfo.rent_area_py_E +
					'&net_area_py_S=' +
					this.searchInfo.net_area_py_S +
					'&net_area_py_E=' +
					this.searchInfo.net_area_py_E +
					'&page=' +
					(this.searchInfo.idx - 1),
			).then(data => {
				this.bid = data.id;
				this.init();
				this.$router.push({ path: '/ScrapingDetail2/' + this.bid, query: this.searchInfo });
			});
		},
	},
};
</script>

<style lang="scss"></style>
