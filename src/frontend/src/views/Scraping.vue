<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">신규물건</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">주소</label>
					<input class="form-control" type="text" v-model="searchOptions_.exposureAddress" @keyup.enter="btnSearch" />

					<label class="input-label">관리등급</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'상가'" />
						<span class="checkbox"></span>
						<span class="text">상가</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'사무실'" />
						<span class="checkbox"></span>
						<span class="text">사무실</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'건물'" />
						<span class="checkbox"></span>
						<span class="text">건물</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'공장/창고'" />
						<span class="checkbox"></span>
						<span class="text">공장/창고</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'단독/다가구'" />
						<span class="checkbox"></span>
						<span class="text">단독/다가구</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'토지'" />
						<span class="checkbox"></span>
						<span class="text">토지</span>
					</label>
					<button type="button" class="btn list" @click="isDetailSearchPopupShow = true">
						<b-icon-funnel-fill />
					</button>
					<button type="button" class="btn search" @click="btnSearch"><b-icon-search /></button>
				</div>
				<div class="right"></div>
			</div>
		</div>
		<div class="section">
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					매매
				</button>
				<!-- <button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					임대
				</button> -->
				<div class="right">
					<button type="button" class="btn btn-sm btn-secondary" @click="getServerInfo">설정</button>
					<!-- <input class="form-control" type="text" placeholder="연락처" /> -->
					<!-- <button type="button" class="btn btn-sm btn-secondary">검색</button> -->
				</div>
			</div>
			<div class="tab-con">
				<div class="table-wrap">
					<table v-if="searchOptions.tradeTypeName == '매매'" class="table click">
						<colgroup>
							<col width="3%" />
							<col width="2%" />
							<col width="5%" />
							<col width="10%" />
							<col width="5%" />
							<col width="10%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>타입</th>
							<th>종류</th>

							<th>주소</th>
							<th>지번</th>
							<th>상세주소</th>

							<th>연면적(평)</th>
							<th>대지(평)</th>
							<th>매매가</th>
							<th>관리비</th>
							<th>주변역</th>
							<th>매물존재</th>
							<th>지도보기</th>
							<th>네이버</th>
						</tr>
						<tr
							v-for="(item, idx) in itemList"
							:key="'useradmin_' + item.client_uid"
							@click="btnOnDetail(item.id, idx)"
						>
							<td>{{ item.id }}</td>
							<td>{{ item.tradeTypeName }}</td>
							<td>{{ item.realestateTypeName }}</td>
							<td>{{ item.exposureAddress }}</td>
							<td>{{ item.jibunAddress }}</td>
							<td>{{ item.etcAddress }}</td>

							<td>{{ item.totalSpace_py }}</td>
							<td>{{ item.groundSpace_py }}</td>

							<td>{{ $formatMoney(item.dealPrice, $MONEY_FORMAT_TYPE.LOAN) }}</td>
							<td>{{ $formatMoney(item.main_fee / 10000, $MONEY_FORMAT_TYPE.LOAN) }}</td>

							<td>{{ item.subway }}{{ item.subway_dis ? ' (' + item.subway_dis + 'm' + ')' : '' }}</td>
							<td>{{ item.ck == 'Y' ? '존재함' : '' }}</td>
							<td>
								<button
									type="button"
									class="btn map1"
									@click.stop="$openNaverMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
								<button
									type="button"
									class="btn map2"
									@click.stop="$openDaumMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
							</td>
							<td>
								<button type="button" class="btn map3" @click.stop="$openNaver(item.item_id)"></button>
							</td>
						</tr>
					</table>
					<table v-else-if="searchOptions.tradeTypeName == '월세'" class="table click">
						<colgroup>
							<col width="3%" />
							<col width="2%" />
							<col width="5%" />
							<col width="10%" />
							<col width="5%" />
							<col width="10%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
							<col width="5%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>타입</th>
							<th>종류</th>

							<th>주소</th>
							<th>지번</th>
							<th>상세주소</th>

							<th>계약면적(평)</th>
							<th>전용면적(평)</th>

							<th>보증금</th>
							<th>월세</th>

							<th>관리비</th>
							<th>주변역</th>
							<th>매물존재</th>
							<th>지도보기</th>
							<th>네이버</th>
						</tr>
						<tr
							v-for="(item, idx) in itemList"
							:key="'useradmin_' + item.client_uid"
							@click="btnOnDetail2(item.id, idx)"
						>
							<td>{{ item.id }}</td>
							<td>{{ item.tradeTypeName }}</td>
							<td>{{ item.realestateTypeName }}</td>
							<td>{{ item.exposureAddress }}</td>
							<td>{{ item.jibunAddress }}</td>
							<td>{{ item.etcAddress }}</td>

							<td>{{ item.rent_area_py }}</td>
							<td>{{ item.net_area_py }}</td>

							<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
							<td>{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}</td>

							<td>{{ $formatMoney(item.main_fee / 10000, $MONEY_FORMAT_TYPE.LOAN) }}</td>

							<td>{{ item.subway }}{{ item.subway_dis ? ' (' + item.subway_dis + 'm' + ')' : '' }}</td>
							<td>{{ item.st == 'Y' ? '존재함' : '' }}</td>
							<td>
								<button
									type="button"
									class="btn map1"
									@click.stop="$openNaverMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
								<button
									type="button"
									class="btn map2"
									@click.stop="$openDaumMap(item.exposureAddress + ' ' + item.jibunAddress)"
								></button>
							</td>
							<td>
								<button type="button" class="btn map3" @click.stop="$openNaver(item.item_id)"></button>
							</td>
						</tr>
					</table>
				</div>

				<ul class="pagination b-pagination pagination-sm" v-if="pageData != null && pageData.list.length">
					<li class="page-item" v-bind:class="{ disabled: 1 == page }">
						<button type="button" class="page-link" @click="getItemList(1)">
							<b-icon-chevron-double-left />
						</button>
					</li>

					<li class="page-item" v-bind:class="{ disabled: pageData.first == null }">
						<button type="button" class="page-link" @click="pageData.first !== null ? getItemList(pageData.first) : ''">
							<b-icon-chevron-left />
						</button>
					</li>
					<li
						v-for="pg in pageData.list"
						v-bind:key="'pg_' + pg"
						class="page-item"
						v-bind:class="{ active: pageData.currentPage == pg }"
					>
						<button type="button" class="page-link" @click="getItemList(pg)">{{ pg }}</button>
					</li>
					<li class="page-item" v-bind:class="{ disabled: pageData.end == null }">
						<button type="button" class="page-link" @click="pageData.end !== null ? getItemList(pageData.end) : ''">
							<b-icon-chevron-right />
						</button>
					</li>

					<li class="page-item" v-bind:class="{ disabled: pageData.totalPage == page }">
						<button type="button" class="page-link" @click="getItemList(pageData.totalPage)">
							<b-icon-chevron-double-right />
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div v-if="isDetailSearchPopupShow" class="popup-wrap">
		<div class="dim" @click="isDetailSearchPopupShow = false"></div>
		<div class="popup sm">
			<div class="popup-tit">
				상세검색
				<button type="button" class="btn btn-close" @click="isDetailSearchPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<colgroup>
						<col width="5%" />
						<col width="11%" />
					</colgroup>
					<tr>
						<th>주소</th>
						<td colspan="3">
							<input class="form-control" type="text" placeholder="주소" v-model="searchOptions_.exposureAddress" />
						</td>
					</tr>
					<tr>
						<th>종류</th>
						<td colspan="3">
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'상가'" />
								<span class="checkbox"></span>
								<span class="text">상가</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'사무실'" />
								<span class="checkbox"></span>
								<span class="text">사무실</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'건물'" />
								<span class="checkbox"></span>
								<span class="text">건물</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'공장/창고'" />
								<span class="checkbox"></span>
								<span class="text">공장/창고</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'단독/다가구'" />
								<span class="checkbox"></span>
								<span class="text">단독/다가구</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.realestateTypeName" :value="'토지'" />
								<span class="checkbox"></span>
								<span class="text">토지</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>매매가</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.dealPrice_S" />만 &nbsp; ~ &nbsp;
							<input type="number" class="form-control xxsm" v-model="searchOptions_.dealPrice_E" />만
						</td>
					</tr>
					<tr>
						<th>보증금</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.deposit_S" />만 &nbsp; ~ &nbsp;
							<input type="number" class="form-control xxsm" v-model="searchOptions_.deposit_E" />만
						</td>
					</tr>
					<tr>
						<th>월세</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.monthly_rent_S" />만 &nbsp; ~
							&nbsp; <input type="number" class="form-control xxsm" v-model="searchOptions_.monthly_rent_E" />만
						</td>
					</tr>
					<tr>
						<th>연면적(평)</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.totalSpace_py_S" />평 &nbsp; ~
							&nbsp; <input type="number" class="form-control xxsm" v-model="searchOptions_.totalSpace_py_E" />평
						</td>
					</tr>
					<tr>
						<th>대지면적(평)</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.groundSpace_py_S" />평 &nbsp; ~
							&nbsp; <input type="number" class="form-control xxsm" v-model="searchOptions_.groundSpace_py_E" />평
						</td>
					</tr>
					<tr>
						<th>계약면적(평)</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.rent_area_py_S" />평 &nbsp; ~
							&nbsp; <input type="number" class="form-control xxsm" v-model="searchOptions_.rent_area_py_E" />평
						</td>
					</tr>
					<tr>
						<th>전용면적(평)</th>
						<td>
							<input type="number" class="form-control xxsm" v-model="searchOptions_.net_area_py_S" />평 &nbsp; ~ &nbsp;
							<input type="number" class="form-control xxsm" v-model="searchOptions_.net_area_py_E" />평
						</td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-btn btn-secondary" @click="clearInfo">초기화</button>
					<button type="button" class="btn btn-primary" @click="btnSearch">검색</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="isRegisterPopupShow" class="popup-wrap">
		<div class="dim" @click="isRegisterPopupShow = false"></div>
		<div class="popup sm">
			<div class="popup-tit">
				스크랩핑 설정
				<button type="button" class="btn btn-close" @click="isRegisterPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<tr>
						<th>상태</th>
						<td v-if="serverInfo.st == 'start'">진행중</td>
						<td v-else-if="serverInfo.st == 'init'">초기화중</td>
						<td v-else-if="serverInfo.st == 'stop'">중지</td>
					</tr>
					<tr>
						<th>매물타입</th>
						<td>
							<label v-for="(item, idx) in serverInfo.types" :key="'ttpye' + idx" class="input-checkbox">
								<input type="checkbox" v-model="item.typeValue" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">{{ item.typeKor }}</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>매물종류</th>
						<td>
							<label v-for="(item, idx) in serverInfo.filters" :key="'tffit' + idx" class="input-checkbox">
								<input type="checkbox" v-model="item.typeValue" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">{{ item.typeKor }}</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>매매가</th>
						<td v-if="serverInfo.filterOption.dprc.length">
							<label class="input-checkbox">
								<input
									type="checkbox"
									v-model="serverInfo.filterOption.dprc[2].typeValue"
									true-value="Y"
									false-value="N"
								/>
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>

							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.dprc[0].typeValue"
								v-bind="$MONEY1"
							></money3
							>만 &nbsp; ~ &nbsp;
							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.dprc[1].typeValue"
								v-bind="$MONEY1"
							></money3
							>만
						</td>
					</tr>
					<tr>
						<th>보증금</th>
						<td v-if="serverInfo.filterOption.wprc.length">
							<label class="input-checkbox">
								<input
									type="checkbox"
									v-model="serverInfo.filterOption.wprc[2].typeValue"
									true-value="Y"
									false-value="N"
								/>
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>

							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.wprc[0].typeValue"
								v-bind="$MONEY1"
							></money3
							>만 &nbsp; ~ &nbsp;
							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.wprc[1].typeValue"
								v-bind="$MONEY1"
							></money3
							>만
						</td>
					</tr>
					<tr>
						<th>월세</th>
						<td v-if="serverInfo.filterOption.rprc.length">
							<label class="input-checkbox">
								<input
									type="checkbox"
									v-model="serverInfo.filterOption.rprc[2].typeValue"
									true-value="Y"
									false-value="N"
								/>
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>

							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.rprc[0].typeValue"
								v-bind="$MONEY1"
							></money3
							>만 &nbsp; ~ &nbsp;
							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.rprc[1].typeValue"
								v-bind="$MONEY1"
							></money3
							>만
						</td>
					</tr>
					<tr>
						<th>면적</th>
						<td v-if="serverInfo.filterOption.spc.length">
							<label class="input-checkbox">
								<input
									type="checkbox"
									v-model="serverInfo.filterOption.spc[2].typeValue"
									true-value="Y"
									false-value="N"
								/>
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>

							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.spc[0].typeValue"
								v-bind="$MONEY1"
							></money3
							>평 &nbsp; ~ &nbsp;
							<money3
								class="form-control xxsm"
								v-model="serverInfo.filterOption.spc[1].typeValue"
								v-bind="$MONEY1"
							></money3
							>평
						</td>
					</tr>

					<tr v-for="(item, idx) in serverInfo.adr" :key="'adrll_' + idx">
						<th>지역</th>
						<td>
							<select
								class="form-control select xsm"
								v-model="serverInfo.seletAdr[idx].adr1"
								@change="selectAdr(serverInfo.seletAdr[idx], idx)"
							>
								<option :value="null">구 선택</option>
								<option v-for="a1 in item.adr1" :key="'a1_' + idx + '_' + a1.cortarno" :value="a1.cortarno">
									{{ a1.name }}
								</option>
							</select>
							<select class="form-control select xsm" v-model="serverInfo.seletAdr[idx].adr2">
								<option :value="'all'">전체 선택</option>
								<option v-for="a2 in item.adr2" :key="'a2_' + idx + '_' + a2.cortarno" :value="a2.cortarno">
									{{ a2.name }}
								</option>
							</select>
							<button type="button" class="btn icon" v-if="serverInfo.adr.length == idx + 1" @click="addAdr">
								<b-icon-plus />
							</button>
							<button type="button" class="btn icon" v-if="serverInfo.adr.length != 1" @click="delAdr(idx)">
								<b-icon-dash />
							</button>
						</td>
					</tr>

					<!-- {{
						this.serverInfo.seletAdr
					}} -->
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-danger" @click="btnOnReset">초기화</button>

					<button type="button" class="btn btn-sm btn-secondary" @click="isRegisterPopupShow = false">취소</button>
					<button
						v-if="serverInfo.st == 'start'"
						type="button"
						class="btn btn-sm btn-warning"
						@click="btnOnServer('stop')"
					>
						중지
					</button>
					<button
						v-else-if="serverInfo.st == 'stop'"
						type="button"
						class="btn btn-sm btn-primary"
						@click="btnOnServer('start')"
					>
						시작
					</button>
					<button type="button" class="btn btn-sm btn-success" @click="btnOnServer('init')">저장/시작</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserAdmin',
	components: {},
	data() {
		return {
			itemList: [],
			menuType: 1,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,

			isRegisterPopupShow: false,
			isDetailSearchPopupShow: false,

			st: true,
			searchOptions: {
				tradeTypeName: '매매',
				realestateTypeName: ['상가', '사무실', '건물', '공장/창고', '단독/다가구', '토지'],
				exposureAddress: '',

				dealPrice_ST: 'Y',
				deposit_ST: 'Y',
				monthly_rent_ST: 'Y',
				dealPrice_S: '',
				dealPrice_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_rent_S: '',
				monthly_rent_E: '',
				totalSpace_ST: 'Y',
				groundSpace_ST: 'Y',
				rent_area_ST: 'Y',
				net_area_ST: 'Y',
				totalSpace_py_S: '',
				totalSpace_py_E: '',
				groundSpace_py_S: '',
				groundSpace_py_E: '',
				rent_area_py_S: '',
				rent_area_py_E: '',
				net_area_py_S: '',
				net_area_py_E: '',
			},

			searchOptions_: {
				tradeTypeName: '매매',
				realestateTypeName: ['상가', '사무실', '건물', '공장/창고', '단독/다가구', '토지'],
				exposureAddress: '',

				dealPrice_ST: 'Y',
				deposit_ST: 'Y',
				monthly_rent_ST: 'Y',

				dealPrice_S: '',
				dealPrice_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_rent_S: '',
				monthly_rent_E: '',

				totalSpace_ST: 'Y', //연면적
				groundSpace_ST: 'Y', //대지면적
				rent_area_ST: 'Y', //계약면적
				net_area_ST: 'Y', //전용면적

				totalSpace_py_S: '', //연면적
				totalSpace_py_E: '',
				groundSpace_py_S: '', //대지면적
				groundSpace_py_E: '',
				rent_area_py_S: '', //계약면적
				rent_area_py_E: '',
				net_area_py_S: '', //전용면적
				net_area_py_E: '',
			},

			serverInfo: {
				st: 'stop',
				types: [],
				filters: [],
				filterOption: {
					dprc: [], //매매가
					wprc: [], //보증금
					rprc: [], //월세
					spc: [], //면적
				},
				adr: [],
				seletAdr: [],
			},
		};
	},
	updated() {},
	created() {
		this.getItemList(1);
	},
	methods: {
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/sc/server/item?tradeTypeName=' +
					this.searchOptions.tradeTypeName +
					'&realestateTypeName=' +
					this.searchOptions.realestateTypeName +
					'&exposureAddress=' +
					this.searchOptions.exposureAddress +
					'&dealPrice_ST=' +
					this.searchOptions.dealPrice_ST +
					'&deposit_ST=' +
					this.searchOptions.deposit_ST +
					'&monthly_rent_ST=' +
					this.searchOptions.monthly_rent_ST +
					'&dealPrice_S=' +
					this.searchOptions.dealPrice_S +
					'&dealPrice_E=' +
					this.searchOptions.dealPrice_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_rent_S=' +
					this.searchOptions.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchOptions.monthly_rent_E +
					'&totalSpace_ST=' +
					this.searchOptions.totalSpace_ST +
					'&groundSpace_ST=' +
					this.searchOptions.groundSpace_ST +
					'&rent_area_ST=' +
					this.searchOptions.rent_area_ST +
					'&net_area_ST=' +
					this.searchOptions.net_area_ST +
					'&totalSpace_py_S=' +
					this.searchOptions.totalSpace_py_S +
					'&totalSpace_py_E=' +
					this.searchOptions.totalSpace_py_E +
					'&groundSpace_py_S=' +
					this.searchOptions.groundSpace_py_S +
					'&groundSpace_py_E=' +
					this.searchOptions.groundSpace_py_E +
					'&rent_area_py_S=' +
					this.searchOptions.rent_area_py_S +
					'&rent_area_py_E=' +
					this.searchOptions.rent_area_py_E +
					'&net_area_py_S=' +
					this.searchOptions.net_area_py_S +
					'&net_area_py_E=' +
					this.searchOptions.net_area_py_E +
					'&page=' +
					(pg - 1) * this.itemSize,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		getServerInfo() {
			this.$apiGET('/admin/api/sc/server/info').then(data => {
				this.serverInfo.st = data.st;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=type').then(data => {
				this.serverInfo.types = data;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=filter').then(data => {
				this.serverInfo.filters = data;
				this.isRegisterPopupShow = true;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=dprc').then(data => {
				this.serverInfo.filterOption.dprc = data;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=wprc').then(data => {
				this.serverInfo.filterOption.wprc = data;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=rprc').then(data => {
				this.serverInfo.filterOption.rprc = data;
			});

			this.$apiGET('/admin/api/sc/server/filter?type=spc').then(data => {
				this.serverInfo.filterOption.spc = data;
			});

			this.serverInfo.adr = [];
			this.serverInfo.seletAdr = [];
			this.getAdr();
		},
		getAdr() {
			this.$apiGET('/admin/api/sc/server/adrst1').then(adr1 => {
				for (let i = 0; i < adr1.length; i++) {
					this.$apiGET('/admin/api/sc/server/adrst2?adr=' + adr1[i].cortarno).then(adr2 => {
						this.$apiGET('/admin/api/sc/server/adr1').then(aa1 => {
							this.$apiGET('/admin/api/sc/server/adr2?cortarno=' + adr1[i].cortarno).then(aa2 => {
								if (adr2.length == aa2.length) {
									this.serverInfo.adr.push({ adr1: aa1, adr2: aa2 });
									this.serverInfo.seletAdr.push({ adr1: adr1[i].cortarno, adr2: 'all' });
								} else {
									for (let ii = 0; ii < adr2.length; ii++) {
										this.serverInfo.adr.push({ adr1: aa1, adr2: aa2 });
										this.serverInfo.seletAdr.push({ adr1: adr1[i].cortarno, adr2: adr2[ii].cortarno });
									}
								}
							});
						});
					});
				}
			});
		},
		addAdr() {
			this.$apiGET('/admin/api/sc/server/adr1').then(data => {
				this.serverInfo.adr.push({ adr1: data, adr2: {} });
				this.serverInfo.seletAdr.push({ adr1: null, adr2: 'all' });
			});
		},
		selectAdr(adr, idx) {
			this.$apiGET('/admin/api/sc/server/adr2?cortarno=' + adr.adr1).then(data => {
				adr.adr2 = 'all';
				this.serverInfo.adr[idx].adr2 = data;
			});
		},
		delAdr(idx) {
			this.serverInfo.adr.splice(idx, 1);
			this.serverInfo.seletAdr.splice(idx, 1);
		},

		btnOnServer(st) {
			if (st == 'start' || st == 'stop') {
				this.$apiPOST('/admin/api/sc/server/info/onOff', { st: st }).then(() => {
					this.isRegisterPopupShow = false;
				});
			} else if (st == 'init') {
				let filterOptionList = [];

				filterOptionList = filterOptionList.concat(
					this.serverInfo.filterOption.dprc,
					this.serverInfo.filterOption.wprc,
					this.serverInfo.filterOption.rprc,
					this.serverInfo.filterOption.spc,
				);

				const A1 = this.serverInfo.types[0].typeValue;
				const B2 = this.serverInfo.types[1].typeValue;
				const filters = this.serverInfo.filters;
				// const filters = this.serverInfo.filters.join();

				if (A1 == 'N' && B2 == 'N') {
					alert('[매물타입] 최소 1개 선택은 필수입니다.');
					return;
				}

				let cnt = 0;
				for (let i = 0; i < filters.length; i++) {
					if (filters[i].typeValue == 'Y') {
						cnt = 1;
						break;
					}
				}

				if (!cnt) {
					alert('[매물종류] 최소 1개 선택은 필수입니다.');
					return;
				}

				if (!this.serverInfo.seletAdr.length) {
					alert('[지역] 최소 1개 선택은 필수입니다.');
					return;
				}

				for (let i = 0; i < this.serverInfo.seletAdr.length; i++) {
					if (this.serverInfo.seletAdr[i].adr1 == null) {
						alert('[구] 선택은 필수입니다.');
						return;
					}
				}

				this.$apiPOST('/admin/api/sc/server/adr', { adrList: this.serverInfo.seletAdr }).then(() => {
					this.$apiPOST('/admin/api/sc/server/filter', { filters: this.serverInfo.types }).then(() => {
						this.$apiPOST('/admin/api/sc/server/filter', { filters: this.serverInfo.filters }).then(() => {
							this.$apiPOST('/admin/api/sc/server/filter', { filters: filterOptionList }).then(() => {
								this.isRegisterPopupShow = false;
							});
						});
					});
				});
			}
		},
		btnOnReset() {
			if (confirm('신규물건 데이터를 초기화하시겠습니까?') == true) {
				this.$apiPOST('/admin/api/sc/server/reset').then(() => {
					this.$router.go(this.$router.currentRoute);
				});
			}
		},

		clearInfo() {
			this.searchOptions_ = {
				tradeTypeName: '매매',
				realestateTypeName: ['상가', '사무실', '건물', '공장/창고', '단독/다가구', '토지'],
				exposureAddress: '',

				dealPrice_ST: 'Y',
				deposit_ST: 'Y',
				monthly_rent_ST: 'Y',

				dealPrice_S: '',
				dealPrice_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_rent_S: '',
				monthly_rent_E: '',

				totalSpace_ST: 'Y', //연면적
				groundSpace_ST: 'Y', //대지면적
				rent_area_ST: 'Y', //계약면적
				net_area_ST: 'Y', //전용면적

				totalSpace_py_S: '', //연면적
				totalSpace_py_E: '',
				groundSpace_py_S: '', //대지면적
				groundSpace_py_E: '',
				rent_area_py_S: '', //계약면적
				rent_area_py_E: '',
				net_area_py_S: '', //전용면적
				net_area_py_E: '',
			};
		},
		changeMenu(menu) {
			this.clearInfo();

			if (menu == 1) {
				this.searchOptions.tradeTypeName = '매매';
			} else if (menu == 2) {
				this.searchOptions.tradeTypeName = '월세';
			}

			this.getItemList(1);
			this.menuType = menu;
		},
		btnSearch() {
			this.searchOptions_.tradeTypeName = this.searchOptions.tradeTypeName;
			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));
			this.isDetailSearchPopupShow = false;
			this.getItemList(1);
		},

		btnOnDetail(id, idx) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open(
				'ScrapingDetail/' +
					id +
					'?tradeTypeName=' +
					this.searchOptions.tradeTypeName +
					'&realestateTypeName=' +
					this.searchOptions.realestateTypeName +
					'&exposureAddress=' +
					this.searchOptions.exposureAddress +
					'&dealPrice_ST=' +
					this.searchOptions.dealPrice_ST +
					'&deposit_ST=' +
					this.searchOptions.deposit_ST +
					'&monthly_rent_ST=' +
					this.searchOptions.monthly_rent_ST +
					'&dealPrice_S=' +
					this.searchOptions.dealPrice_S +
					'&dealPrice_E=' +
					this.searchOptions.dealPrice_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_rent_S=' +
					this.searchOptions.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchOptions.monthly_rent_E +
					'&totalSpace_ST=' +
					this.searchOptions.totalSpace_ST +
					'&groundSpace_ST=' +
					this.searchOptions.groundSpace_ST +
					'&rent_area_ST=' +
					this.searchOptions.rent_area_ST +
					'&net_area_ST=' +
					this.searchOptions.net_area_ST +
					'&totalSpace_py_S=' +
					this.searchOptions.totalSpace_py_S +
					'&totalSpace_py_E=' +
					this.searchOptions.totalSpace_py_E +
					'&groundSpace_py_S=' +
					this.searchOptions.groundSpace_py_S +
					'&groundSpace_py_E=' +
					this.searchOptions.groundSpace_py_E +
					'&rent_area_py_S=' +
					this.searchOptions.rent_area_py_S +
					'&rent_area_py_E=' +
					this.searchOptions.rent_area_py_E +
					'&net_area_py_S=' +
					this.searchOptions.net_area_py_S +
					'&net_area_py_E=' +
					this.searchOptions.net_area_py_E +
					'&idx=' +
					(idx + 1 + (this.page - 1) * this.itemSize) +
					'&totalCount=' +
					this.totalCount,
				'',
				attr,
			);
		},
		btnOnDetail2(id, idx) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open(
				'ScrapingDetail2/' +
					id +
					'?tradeTypeName=' +
					this.searchOptions.tradeTypeName +
					'&realestateTypeName=' +
					this.searchOptions.realestateTypeName +
					'&exposureAddress=' +
					this.searchOptions.exposureAddress +
					'&dealPrice_ST=' +
					this.searchOptions.dealPrice_ST +
					'&deposit_ST=' +
					this.searchOptions.deposit_ST +
					'&monthly_rent_ST=' +
					this.searchOptions.monthly_rent_ST +
					'&dealPrice_S=' +
					this.searchOptions.dealPrice_S +
					'&dealPrice_E=' +
					this.searchOptions.dealPrice_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_rent_S=' +
					this.searchOptions.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchOptions.monthly_rent_E +
					'&totalSpace_ST=' +
					this.searchOptions.totalSpace_ST +
					'&groundSpace_ST=' +
					this.searchOptions.groundSpace_ST +
					'&rent_area_ST=' +
					this.searchOptions.rent_area_ST +
					'&net_area_ST=' +
					this.searchOptions.net_area_ST +
					'&totalSpace_py_S=' +
					this.searchOptions.totalSpace_py_S +
					'&totalSpace_py_E=' +
					this.searchOptions.totalSpace_py_E +
					'&groundSpace_py_S=' +
					this.searchOptions.groundSpace_py_S +
					'&groundSpace_py_E=' +
					this.searchOptions.groundSpace_py_E +
					'&rent_area_py_S=' +
					this.searchOptions.rent_area_py_S +
					'&rent_area_py_E=' +
					this.searchOptions.rent_area_py_E +
					'&net_area_py_S=' +
					this.searchOptions.net_area_py_S +
					'&net_area_py_E=' +
					this.searchOptions.net_area_py_E +
					'&idx=' +
					(idx + 1 + (this.page - 1) * this.itemSize) +
					'&totalCount=' +
					this.totalCount,
				'',
				attr,
			);
		},
	},
};
</script>

<style></style>
