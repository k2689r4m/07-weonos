<template>
	<div class="content">
		<div v-if="item" class="print-wrap">
			<div class="print-left">
				<!-- <select class="form-control select sm mb-3">
					<option>물건</option>
				</select> -->
				<div class="section-tit">슬라이드 선택/제외</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opAll" @change="setAllCheck" />
									<span class="checkbox"></span>
								</label>
							</th>
							<th>구분</th>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[0]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>INTRO</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[1]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>물건개요</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[2]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>임대정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[3]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축물정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[4]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축 내/외부 사진</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[5]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>지도</td>
						</tr>
					</table>
				</div>
				<div class="section-tit mt-4">사진 선택/제외</div>
				<ul class="table-list">
					<li class="table-list--item" v-for="(op, idx) in item.imgObjList" :key="'opp_' + idx">
						<div class="check">
							<label class="input-checkbox">
								<input type="checkbox" v-model="op.st" @change="updateId" :disabled="!opList[4]" />
								<span class="checkbox"></span>
							</label>
						</div>
						<div class="name">{{ op.name }}</div>
					</li>
				</ul>
				<!-- <img :src="this.img" /> -->
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-secondary" @click="copyChartImg">출력</button>
				</div>
			</div>
			<div class="print-right">
				<!-- 1. 인트로 -->
				<div v-if="opList[0]" id="capture_1" name="capture" class="print-section cover">
					<div class="tit">
						<!-- <div class="top">Information Memorandum</div> -->
						<div class="middle">{{ item.building_name }}</div>
						<!-- <input type="text" class="text-center middle" value="(C)방이동 삼정빌딩" /> -->
						<div class="bottom">{{ item.jibun_addr }}</div>
					</div>
					<div class="logo"></div>
					<!-- <ol class="list">
						<li v-for="(i, idx) in indexList" :key="'index__' + idx" class="list-item">
							<span class="num">{{ i.idx }}</span> {{ i.name }}
						</li>
					</ol>
					<div class="bottom-text">
						본 Teaser는 WE'ONUS 가 제공하는 자료입니다.<br />
						본 Teaser는 자산의 계략적인 정보, 위치 등을 포함하고 있습니다.<br />
						본 건과 관련하여 궁금하신 사항이 있으실 경우에는<br />
						담당자에게 연락 부탁드립니다.
					</div> -->
				</div>
				<!-- 2. 물건개요 -->
				<div v-if="opList[1]" id="capture_2" name="capture" class="print-section flex1-2">
					<div class="print-tit">OVERVIEW(개요)</div>
					<div class="left">
						<div class="img-wrap"><img :src="item.img" alt="" style="width: 369px; height: 455px" /></div>
						<div class="map-wrap" id="map_0"></div>
					</div>
					<div class="right">
						<div class="flex">
							<div>
								<div class="section-tit">임대정보</div>
								<div class="table-wrap">
									<table class="table type-input text-left">
										<colgroup>
											<col width="20%" />
											<col width="30%" />
											<col width="20%" />
											<col width="30%" />
										</colgroup>
										<tr>
											<th>주소</th>
											<td colspan="3">{{ item.jibun_addr }}</td>
										</tr>
										<tr>
											<th>보증금</th>
											<td colspan="3" class="txt-c--red">{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
										</tr>
										<tr>
											<th>월임대료</th>
											<td colspan="3" class="txt-c--red">
												{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}
											</td>
										</tr>
										<tr>
											<th>관리비</th>
											<td colspan="3">{{ $formatMoney(item.main_fee, $MONEY_FORMAT_TYPE.LOAN) }}</td>
										</tr>
										<tr>
											<th>월고정비</th>
											<td colspan="3" class="txt-c--red">
												{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.LOAN) }}
											</td>
										</tr>
										<tr>
											<th>전용면적</th>
											<td class="txt-c--red">{{ item.net_area_py }}평</td>
											<th>전용률</th>
											<td>{{ item.ex_rate }}%</td>
										</tr>
										<tr>
											<th>임대면적</th>
											<td colspan="3">{{ item.rent_area_py }}평</td>
										</tr>
										<tr>
											<th>평당임대료</th>
											<td colspan="3" class="txt-c--red">
												{{ $formatMoney(item.rent_py_price, $MONEY_FORMAT_TYPE.LOAN) }}
											</td>
										</tr>
										<tr>
											<th>층정보</th>
											<td>{{ item.floor_info }}</td>
											<th>입주현황</th>
											<td>{{ item.in_status }}</td>
										</tr>
										<tr>
											<th>무료 주차대수</th>
											<td>{{ item.free_parking }}</td>
											<th>유료 주차대수</th>
											<td>{{ item.fee_paring }}</td>
										</tr>
										<tr>
											<th>화장실 유형</th>
											<td colspan="3">{{ item.bathroom_type }}</td>
										</tr>
										<tr>
											<th>인테리어</th>
											<td colspan="3">{{ $INTERIOR_TYPE[item.interior_type] }}</td>
										</tr>
										<tr>
											<th>렌트프리</th>
											<td colspan="3">
												<template v-if="item.rent_free == 'selet'"> {{ item.rent_free_month }}개월 </template>
												<template v-else>{{ $RENT_FREE[item.rent_free] }}</template>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div>
								<div class="section-tit">토지정보</div>
								<div class="table-wrap">
									<table class="table type-input text-left">
										<colgroup>
											<col width="50%" />
											<col width="50%" />
										</colgroup>
										<tr>
											<th class="txt-c--red">주변역</th>
											<td class="txt-c--red">{{ item.substation }}</td>
										</tr>
										<tr>
											<th class="txt-c--red">거리</th>
											<td class="txt-c--red">{{ item.substation_distance ? item.substation_distance + 'm' : '' }}</td>
										</tr>
										<tr>
											<th>대지면적</th>
											<td>{{ item.land_size_m2 }}㎡</td>
										</tr>
										<tr>
											<th>도로사항</th>
											<td>
												<template v-if="item.roadwide_1">{{ item.roadwide_1 }}m</template>
												<template v-if="item.roadwide_2">,{{ item.roadwide_2 }}m</template>
												<template v-if="item.roadwide_3">,{{ item.roadwide_3 }}m</template>
												<template v-if="item.roadwide_4">,{{ item.roadwide_4 }}m</template>
												<template v-if="item.chk_road_coner == 'Y'">,코너</template>
												<template v-if="item.chk_road_dual == 'Y'">,양면</template>
												&nbsp;
												<template v-if="item.road_name">[{{ item.road_name }}]</template>
											</td>
										</tr>
									</table>
								</div>
								<div class="section-tit mt-4">건축물정보</div>
								<div class="table-wrap">
									<table class="table type-input text-left">
										<colgroup>
											<col width="50%" />
											<col width="50%" />
										</colgroup>
										<tr>
											<th>준공연도/리모델링</th>
											<td>
												{{ $dateFormat(item.build_date) }}
												{{ item.remodel_date ? '/ ' + $dateFormat(item.remodel_date) : '' }}
											</td>
										</tr>
										<tr>
											<th class="txt-c--red">승강기</th>
											<td class="txt-c--red">{{ item.ev_cnt ? item.ev_cnt + '대' : '' }}</td>
										</tr>
										<tr>
											<th>냉/난방식</th>
											<td>{{ item.heat_type_name }}</td>
										</tr>
										<tr>
											<th>규모</th>
											<td>
												{{ $getFloorString(item.floor_cnt_B, item.floor_cnt_F) }}
											</td>
										</tr>
										<tr>
											<th>주차방식/대수</th>
											<td>
												<template v-if="item.park_cnt_law">
													<template v-if="item.park_type_name">{{ item.park_type_name }} /</template> 법정
													{{ item.park_cnt_law }}대
												</template>
											</td>
										</tr>
										<tr>
											<th>연면적</th>
											<td colspan="3">{{ item.total_size_m2 }}㎡ [{{ item.total_size_p }}평]</td>
										</tr>
										<tr>
											<th>건축면적</th>
											<td colspan="3">{{ item.build_size_m2 }}㎡ [{{ item.build_size_p }}평]</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="section-tit mt-4">특징</div>
						<ul class="dot-list box-line">
							<div v-html="item.memo.split('\n').join('<br />')"></div>
						</ul>
					</div>
				</div>
				<!-- 3. 임대정보 -->
				<div v-if="opList[2]" id="capture_3" name="capture" class="print-section">
					<div class="print-tit">STACKING PLAN</div>
					<div class="chart-wrap">
						<div class="tit">임대율100%</div>
						<LineChart2 v-if="rentRateSt" :chartData="rentRate" width="1008" height="40"></LineChart2>
					</div>
					<div class="chart-wrap">
						<div class="tit">임차업종 비중</div>
						<LineChart v-if="rentRateListSt" :chartData="rentRateList" width="1008" height="40"></LineChart>
					</div>
					<div class="table-wrap">
						<table class="table sm">
							<thead>
								<tr>
									<th>층</th>
									<th>임대면적(㎡)</th>
									<th>임대면적(평)</th>
									<th>사용현황(임대면적 기준)</th>
									<th>보증금</th>
									<th>월임대료</th>
									<th>관리비</th>
									<th>비고</th>
								</tr>
							</thead>
							<tbody>
								<tr :key="'rent_' + rent.building_rent_uid" v-for="rent in rentList">
									<th>{{ rent.rent_floor }}</th>
									<td>{{ rent.rent_size_m2 }}</td>
									<td>{{ rent.rent_size_p }}</td>
									<td>{{ $filters.money(rent.rent_usage) }}</td>
									<td>{{ $filters.money(rent.rent_deposit) }}</td>
									<td>{{ $filters.money(rent.rent_money) }}</td>
									<td>{{ rent.mgr_fee ? $filters.money(rent.mgr_fee) : 0 }}</td>
									<td>{{ rent.memo }}</td>
								</tr>
								<tr>
									<th class="bg-blue">합계</th>
									<td class="bg-blue">{{ $filters.money(totalData.m2) }}</td>
									<td class="bg-blue">{{ $filters.money(totalData.py) }}</td>
									<td class="bg-blue"></td>
									<td class="bg-blue">{{ $filters.money(totalData.deposit) }}</td>
									<td class="bg-blue">{{ $filters.money(totalData.money) }}</td>
									<td class="bg-blue">{{ $filters.money(totalData.mgr) }}</td>
									<td class="bg-blue"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-text">※ 임대차계약서 상 임대면적의 총합과 건축물대장 상 연면적이 다소 차이가 있음</div>
				</div>
				<!-- 4. 건축물정보 -->
				<div v-if="opList[3]" id="capture_4" name="capture" class="print-section">
					<div class="print-tit">BUILDING REGISTER</div>
					<div class="table-wrap">
						<table class="table sm">
							<thead>
								<tr>
									<th>층</th>
									<th>면적(㎡)</th>
									<th>평수</th>
									<th>층별용도</th>
								</tr>
							</thead>
							<tbody>
								<tr :key="'floor_' + floor.building_floor_uid" v-for="floor in floorList">
									<td>{{ floor.flrNoNm }}</td>
									<td>{{ floor.area_m2 }}</td>
									<td>{{ floor.area_py }}</td>
									<td>{{ floor.name }}</td>
								</tr>
								<tr>
									<td class="bg-blue">합계</td>
									<td class="bg-blue">{{ totalFloorData.m2 }}</td>
									<td class="bg-blue">{{ totalFloorData.py }}</td>
									<td class="bg-blue"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!-- 5. 건물 내/외부 (사진 여러개)-->
				<template v-if="opList[4]">
					<div
						v-for="(pic, idx) in item.imgObj"
						:id="'picture_' + idx"
						:key="'picture_' + idx"
						class="print-section flex"
						name="capture"
					>
						<div class="print-tit">PHOTO</div>
						<template v-for="(i, ii) in pic" :key="idx + '_' + ii + '_' + 'pic'">
							<div v-if="(ii = 0)" class="left">
								<div class="section-tit">{{ i.name }}</div>
								<div class="img-wrap">
									<img :src="i.img" alt="" style="width: 540px; height: 650px" />
								</div>
							</div>
							<div v-else class="right">
								<div class="section-tit">{{ i.name }}</div>
								<div class="img-wrap">
									<img :src="i.img" alt="" style="width: 540px; height: 650px" />
								</div>
							</div>
						</template>
					</div>
				</template>
				<!-- 6. 지도 -->
				<div v-show="opList[5]" id="capture_5" name="capture" class="print-section flex">
					<div class="left">
						<div class="print-tit">MAP</div>
						<div id="map_1"></div>
					</div>
					<div class="right">
						<div class="print-tit">MAP</div>
						<div id="map_2"></div>
					</div>
				</div>

				<!-- 7. end -->
				<div name="capture" id="capture_99" class="print-section cover end">
					<ul class="info">
						<li class="info-item name">
							<span class="text">
								<strong>{{ userInfo.mem_name }}</strong> {{ userInfo.mem_rank_name }}
							</span>
						</li>
						<li class="info-item">
							<label class="label">M.</label>
							<span class="text">{{ userInfo.mem_mobile }}</span>
						</li>
						<li class="info-item">
							<label class="label">T.</label>
							<span class="text">02-6956-2791</span>
						</li>
						<li class="info-item">
							<label class="label">E.</label>
							<span class="text">{{ userInfo.mem_email }}</span>
						</li>
						<li class="info-item">
							<label class="label">F.</label>
							<span class="text">02-6956-2791</span>
						</li>
						<li class="info-item">
							<span class="text">서울특별시 강남구 도산대로26길 20, 1층(논현동, NEWTURN빌딩)</span>
						</li>
					</ul>
					<div class="bottom-text">
						본 Teaser는 본 건 투자를 위한 기본적인 정보를 제공할 목적으로 작성되었습니다. Teaser의 세부적인 내용은 추후
						진행사항에 따라 수정되거나 변경될 수 있고, WEONUS 는 내용에 대해 어떠한 책임도 부담하지 않습니다.<br />
						또한 Teaser에서 제공한 정보는 어떠한 제약의 근거로 사용될 수 없습니다. Teaser의 어떠한 부분도 매도자 및
						WEONUS의 사전 동의 없이 외부에 복사, 인용, 재배포 및 유통될 수 없습니다.
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from '../components/LineChart.vue';
import LineChart2 from '../components/LineChart2.vue';

export default {
	name: 'PrintPage',
	components: {
		LineChart,
		LineChart2,
	},
	data() {
		return {
			bid: null,

			map: null,
			marker: null,

			map_1: null,
			marker_1: null,

			map_2: null,
			marker_2: null,
			mapType: null,

			indexList: [],
			capIdList: [],

			opAll: true,
			opList: [true, true, true, true, true, true],

			item: null,
			rentList: [],
			floorList: [],
			totalData: {
				m2: 0,
				py: 0,
				deposit: 0,
				money: 0,
				mgr: 0,
			},

			totalFloorData: {
				m2: 0,
				py: 0,
			},

			rentRate: {
				labels: ['임대율'],
				datasets: [
					{
						label: '임대율',
						data: [0],
						backgroundColor: '#f87979',
					},
				],
			},
			rentRateSt: false,
			rentRateList: {
				labels: ['임대'],
				datasets: [],
			},
			rentRateListSt: false,

			userInfo: {},
		};
	},
	created() {
		this.bid = this.$route.query.bid;

		this.$loadScript(
			'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
				process.env.VUE_APP_NAVER_API_ID +
				'&submodules=panorama',
		)
			.then(() => {})
			.catch(() => {});

		this.init();
	},
	methods: {
		init() {
			this.getItem();
			this.getRent();
			this.getFloor();
			this.getUser();
		},
		getUser() {
			this.$apiGET('/admin/api/user/info').then(re => {
				console.log(re);
				this.userInfo = re;
				// if (re) {
				// 	this.$store.dispatch('callSetUserInfo', re);
				// }
			});
		},
		loadMap() {
			this.map = new window.naver.maps.Map('map_0', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 16,
			});
			this.map.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			// this.map.setSize({ width: '369px', height: '270px' });
			this.marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.map,
			});

			this.map_1 = new window.naver.maps.Map('map_1', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 16,
			});
			this.map_1.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			this.map_1.setSize({ width: '550px', height: '690px' });
			this.marker_1 = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.map_1,
			});

			this.mapType = new window.naver.maps.CadastralLayer();

			this.map_2 = new window.naver.maps.Map('map_2', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 18,
			});

			this.mapType.setMap(this.map_2);

			this.map_2.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			this.map_2.setSize({ width: '550px', height: '690px' });
			this.marker_2 = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.map_2,
			});
		},
		async copyChartImg() {
			this.$apiPOST('/admin/api/detail/item/print2', { bidList: [this.bid] }).then(() => {});

			await this.$exportPrint(this.capIdList);
		},
		getItem() {
			this.$apiGET('/admin/api/detail/item?bid=' + this.bid + '&isRent=true').then(data => {
				for (let prop in data) {
					if (data[prop] == null) {
						data[prop] = '';
					}
				}

				data.img = null;

				//썸네일
				for (let i = 0; i < data.imgList.length; i++) {
					if (data.imgList[i]) {
						data.img = process.env.VUE_APP_HOST_FRONT + '/users/item/image2?id=' + data.imgList[i];
						break;
					}
				}

				//이미지 리스트
				let imgObjList = [];
				for (let i = 0; i < data.imgList.length; i++) {
					if (data.imgList[i]) {
						imgObjList.push({
							name: this.$IMG_NAME[i],
							img: process.env.VUE_APP_HOST_FRONT + '/users/item/image2?id=' + data.imgList[i],
							st: true,
						});
					}
				}
				data.imgObjList = imgObjList;

				let imgObj = [];
				for (let i = 0; i < imgObjList.length; i += 2) {
					imgObj.push(imgObjList.slice(i, i + 2));
				}

				data.imgObj = imgObj;

				this.item = data;

				this.capIdList = [];
				this.$nextTick(() => {
					const idList = document.getElementsByName('capture');
					for (let i = 0; i < idList.length; i++) {
						this.capIdList.push(idList[i].id);
					}
				});

				this.indexList = [];
				let idx = 1;
				for (let i = 1; i < this.opList.length; i++) {
					if (this.opList[i]) {
						if (i == 1) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '물건개요',
							});
						} else if (i == 2) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '임대정보',
							});
						} else if (i == 3) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '건축물정보',
							});
						} else if (i == 4) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '건축 내/외부 사진',
							});
						} else if (i == 5) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '지도',
							});
						}
						idx++;
					}
				}

				setTimeout(
					function () {
						this.loadMap();
					}.bind(this),
					250,
				);
			});
		},
		updateId() {
			let data = JSON.parse(JSON.stringify(this.item));

			//이미지 리스트
			let imgObjList = [];
			for (let i = 0; i < data.imgObjList.length; i++) {
				if (data.imgObjList[i].st) {
					imgObjList.push(data.imgObjList[i]);
				}
			}

			let imgObj = [];
			for (let i = 0; i < imgObjList.length; i += 2) {
				imgObj.push(imgObjList.slice(i, i + 2));
			}

			this.item.imgObj = imgObj;

			this.capIdList = [];
			this.$nextTick(() => {
				const idList = document.getElementsByName('capture');
				for (let i = 0; i < idList.length; i++) {
					this.capIdList.push(idList[i].id);
				}
			});

			this.indexList = [];
			let idx = 1;
			for (let i = 1; i < this.opList.length; i++) {
				if (this.opList[i]) {
					if (i == 1) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '물건개요',
						});
					} else if (i == 2) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '임대정보',
						});
					} else if (i == 3) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '건축물정보',
						});
					} else if (i == 4) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '건축 내/외부 사진',
						});
					} else if (i == 5) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '지도',
						});
					}
					idx++;
				}
			}
		},
		getRent() {
			this.$apiGET('/admin/api/detail/item/rent2?bid=' + this.bid).then(data => {
				this.rentList = data;
				let m2 = 0;
				let py = 0;
				let deposit = 0;
				let money = 0;
				let mgr = 0;

				let cnt = data.length;
				let sumCnt = 0;

				for (let i = 0; i < this.rentList.length; i++) {
					if (data[i].rent_money) {
						sumCnt++;
					}

					// if (this.rentList[i].except_flag != 'Y') {
					m2 += Number(this.rentList[i].rent_size_m2);
					py += Number(this.rentList[i].rent_size_p);
					deposit += Number(this.rentList[i].rent_deposit);
					money += Number(this.rentList[i].rent_money);
					mgr += Number(this.rentList[i].mgr_fee);
					// }
				}

				if (cnt) {
					this.rentRate.datasets[0].data[0] = Number(((sumCnt / cnt) * 10 * 10).toFixed(2));
				} else {
					this.rentRate.datasets[0].data[0] = 0;
				}

				const rentGroup = this.$groupBy(data, 'rent_usage');
				for (let prop in rentGroup) {
					const curCnt = rentGroup[prop].length;
					this.rentRateList.datasets.push({
						label: prop,
						data: [Number(((curCnt / cnt) * 100).toFixed(2))],
					});
				}

				this.rentRateSt = true;
				this.rentRateListSt = true;

				this.totalData.m2 = m2.toFixed(2);
				this.totalData.py = py.toFixed(2);
				this.totalData.deposit = deposit;
				this.totalData.money = money;
				this.totalData.mgr = mgr;
			});
		},
		getFloor() {
			this.$apiGET('/admin/api/detail/item/floor2?bid=' + this.bid).then(data => {
				this.floorList = data;
				let m2 = 0;
				let py = 0;

				for (let i = 0; i < this.floorList.length; i++) {
					m2 += Number(this.floorList[i].area_m2);
					py += Number(this.floorList[i].area_py);
				}

				this.totalFloorData.m2 = m2.toFixed(2);
				this.totalFloorData.py = py.toFixed(2);
			});
		},
		setAllCheck() {
			for (let i = 0; i < this.opList.length; i++) {
				this.opList[i] = this.opAll;
			}
			this.updateId();
		},
	},
};
</script>

<style lang="scss"></style>
