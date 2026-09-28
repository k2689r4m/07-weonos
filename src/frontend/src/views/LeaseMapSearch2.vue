<template>
	<div class="content">
		<div class="section">
			<div class="search-top">
				<div class="left">
					<label class="input-label">검색키워드</label>
					<input
						class="form-control"
						type="text"
						placeholder="물건명, 주소, 소유자, 전소유자, 전화번호"
						v-model="searchOptions_.keyword"
						@keyup.enter="btnSearch"
					/>
					<label class="input-label">매물상태</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.state.st" @change="btnStOption" />
						<span class="checkbox"></span>
						<span class="text">전체</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.state.st_" :value="'ready'" />
						<span class="checkbox"></span>
						<span class="text">준비</span>
					</label>

					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.state.st_" :value="'done'" />
						<span class="checkbox"></span>
						<span class="text">매물</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.state.st_" :value="'hold'" />
						<span class="checkbox"></span>
						<span class="text">보류</span>
					</label>
					<label class="input-checkbox">
						<input type="checkbox" v-model="searchOptions_.state.st_" :value="'sell'" />
						<span class="checkbox"></span>
						<span class="text">임대완료</span>
					</label>
				</div>
				<div class="right">
					<button type="button" class="btn search" @click="btnSearch"><b-icon-search /></button>
					<button type="button" class="btn list" @click="isDetailSearchPopupShow = true">
						<b-icon-funnel-fill />
					</button>
				</div>
			</div>
			<div class="map-wrap">
				<!-- <div id="map" class="map"></div> -->
				<div class="map" :class="{ active: isMapListActive }">
					<!-- 0130 매물상세 -->

					<naver-map
						:mapOptions="mapOptions"
						:initLayers="initLayers"
						@onLoad="onLoadMap($event)"
						@idle="onDrawMarker(false)"
						@zoom_changed="onZoomChanged($event)"
					>
						<naver-marker
							v-for="(item, idx) in itemList"
							:key="'1_' + item.bid + '_' + idx"
							:latitude="item.pt.y"
							:longitude="item.pt.x"
							@onLoad="onLoadMarker($event, item)"
						>
						</naver-marker>
						<naver-marker
							v-for="(item, idx) in itemDongList"
							:key="'2_' + item[0].id + '_' + idx"
							:latitude="item[0].pt.y"
							:longitude="item[0].pt.x"
							@onLoad="onLoadDongMarker($event, item)"
						>
						</naver-marker>
						<naver-marker
							v-for="(item, idx) in itemGuList"
							:key="'3_' + item[0].id + '_' + idx"
							:latitude="item[0].pt.y"
							:longitude="item[0].pt.x"
							@onLoad="onLoadDongMarker($event, item)"
						>
						</naver-marker>
						<naver-marker
							v-for="(item, idx) in itemSidoList"
							:key="'4_' + item[0].id + '_' + idx"
							:latitude="item[0].pt.y"
							:longitude="item[0].pt.x"
							@onLoad="onLoadDongMarker($event, item)"
						>
						</naver-marker>
						<naver-polygon
							v-for="(item, idx) in itemBizList"
							:key="'5_' + item.id + '_' + idx"
							:paths="item.pos"
							:strokeColor="'red'"
							:strokeWeight="5"
							@onLoad="onLoadPolygon($event)"
							@mouseover="onMouseupPolygon($event, item.name)"
							@mouseout="onMouseoutPolygon($event)"
						/>
					</naver-map>

					<div class="map-btn">
						<button type="button" class="btn" @click="btnZoomLevel(1)"><b-icon-plus-lg /></button>
						<button type="button" class="btn" @click="btnZoomLevel(-1)"><b-icon-dash-lg /></button>
						<button type="button" class="btn" v-bind:class="{ active: isCad }" @click="btnMapType()">지적도</button>
						<button
							type="button"
							class="btn"
							v-bind:class="{ active: isBizActive }"
							@click="btnBizActive(!isBizActive)"
						>
							상권
						</button>
					</div>

					<button type="button" class="btn btn-fold" @click="btnMapListActive(!isMapListActive)">
						<b-icon-chevron-right v-if="!isMapListActive" />
						<b-icon-chevron-left v-else />
					</button>
				</div>
				<span v-show="isTooltipShow" class="map-tooltip">{{ tooltipName }}</span>
				<div class="map-list" :class="{ active: !isMapListActive }">
					<div class="section-tit">물건목록</div>
					<div class="table-wrap">
						<table class="table">
							<colgroup>
								<col width="10%" />
								<col width="40%" />
								<col width="10%" />
								<col width="10%" />
								<col width="10%" />
								<col width="10%" />
								<col width="10%" />
								<col width="10%" />
							</colgroup>
							<tr class="sticky">
								<th>상태</th>
								<th>물건명</th>
								<th>임대면적</th>
								<th>전용면적</th>
								<th>보증금</th>
								<th>월임대료</th>
								<th>관리비</th>
								<th>월고정비</th>
							</tr>
							<tr
								v-for="item in pageItemList"
								:key="'list_' + item.bid"
								@click="btnItemPage(item.pt.x, item.pt.y, 21, item.bid)"
								v-bind:class="{ bg: item.bid == isInfo }"
							>
								<td
									v-bind:class="{
										'text-primary': item.state == 'done',
										'text-secondary': item.state == 'ready',
										'text-dark': item.state == 'hold',
										'text-danger': item.state == 'sell',
									}"
								>
									{{ $ITEM_STATE2[item.state] }}
								</td>
								<td>{{ item.building_name }}</td>
								<td>{{ item.rent_area_py }}py<br />{{ item.rent_area_m2 }}㎡</td>
								<td>{{ item.net_area_py }}py<br />{{ item.net_area_m2 }}㎡</td>
								<td>{{ formatMoney(item.deposit, this.MONEY_FORMAT_TYPE.MUCH) }}</td>
								<td>{{ formatMoney(item.monthly_rent, this.MONEY_FORMAT_TYPE.MUCH) }}</td>
								<td>{{ formatMoney(item.main_fee, this.MONEY_FORMAT_TYPE.MUCH) }}</td>
								<td>{{ formatMoney(item.monthly_fixed, MONEY_FORMAT_TYPE.MUCH) }}</td>
							</tr>
						</table>
					</div>

					<ul class="pagination b-pagination pagination-sm" v-if="pageData != null && pageData.list.length">
						<li class="page-item" v-bind:class="{ disabled: 1 == page }">
							<button type="button" class="page-link" @click="getItemPage(1)">
								<b-icon-chevron-double-left />
							</button>
						</li>

						<li class="page-item" v-bind:class="{ disabled: pageData.first == null }">
							<button
								type="button"
								class="page-link"
								@click="pageData.first !== null ? getItemPage(pageData.first) : ''"
							>
								<b-icon-chevron-left />
							</button>
						</li>
						<li
							v-for="pg in pageData.list"
							v-bind:key="'pg_' + pg"
							class="page-item"
							v-bind:class="{ active: pageData.currentPage == pg }"
						>
							<button type="button" class="page-link" @click="getItemPage(pg)">{{ pg }}</button>
						</li>
						<li class="page-item" v-bind:class="{ disabled: pageData.end == null }">
							<button type="button" class="page-link" @click="pageData.end !== null ? getItemPage(pageData.end) : ''">
								<b-icon-chevron-right />
							</button>
						</li>

						<li class="page-item" v-bind:class="{ disabled: pageData.totalPage == page }">
							<button type="button" class="page-link" @click="getItemPage(pageData.totalPage)">
								<b-icon-chevron-double-right />
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div v-if="isDetailSearchPopupShow" class="popup-wrap">
		<div class="dim" @click="isDetailSearchPopupShow = false"></div>
		<div class="popup lg">
			<div class="popup-tit">
				상세검색
				<button type="button" class="btn btn-close" @click="isDetailSearchPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<colgroup>
						<col width="5%" />
						<col width="11%" />
						<col width="5%" />
						<col width="11%" />
						<col width="5%" />
						<col width="11%" />
						<col width="5%" />
						<col width="11%" />
						<col width="5%" />
						<col width="11%" />
						<col width="5%" />
						<col width="11%" />
					</colgroup>
					<tr>
						<th>검색키워드</th>
						<td colspan="3">
							<input
								class="form-control"
								type="text"
								placeholder="물건명, 주소, 소유자, 전소유자, 전화번호"
								v-model="searchOptions_.keyword"
							/>
						</td>
						<th>매물상태</th>
						<td colspan="3">
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.state.st" @change="btnStOption" />
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.state.st_" :value="'ready'" />
								<span class="checkbox"></span>
								<span class="text">준비</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.state.st_" :value="'done'" />
								<span class="checkbox"></span>
								<span class="text">매물</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.state.st_" :value="'hold'" />
								<span class="checkbox"></span>
								<span class="text">보류</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.state.st_" :value="'sell'" />
								<span class="checkbox"></span>
								<span class="text">임대완료</span>
							</label>
						</td>
						<th>전화번호</th>
						<td colspan="3">
							<input class="form-control" type="text" v-model="searchOptions_.phone" />
						</td>
					</tr>
					<tr>
						<th>물건명</th>
						<td colspan="3">
							<input class="form-control" type="text" placeholder="물건명" v-model="searchOptions_.bName" />
						</td>
						<th>상태</th>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.stList" :value="'A'" />
								<span class="checkbox"></span>
								<span class="text">A</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.stList" :value="'B'" />
								<span class="checkbox"></span>
								<span class="text">B</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.stList" :value="'C'" />
								<span class="checkbox"></span>
								<span class="text">C</span>
							</label>
						</td>
						<th>물건번호</th>
						<td>
							<input class="form-control" type="number" placeholder="물건번호" v-model="searchOptions_.bId" />
						</td>
						<th>매물종류</th>
						<td colspan="3">
							<VueMultiselect
								v-model="searchOptions_.cateList"
								tag-placeholder="Add this as new tag"
								placeholder="매물종류"
								label="name"
								track-by="id"
								:options="bdCateList"
								:multiple="true"
								:taggable="true"
								deselect-label="Can't remove this value"
							>
								<template v-slot:tag="{ option, remove }">
									<span class="custom__tag">
										<span>
											{{ option.name }}
										</span>
										<span class="custom__remove" @click="remove(option)">&times;</span>
									</span>
								</template>

								<template v-slot:option="props">
									<div class="option__desc">
										<span class="option__title">{{ props.option.name }}</span>
									</div>
								</template>
							</VueMultiselect>
						</td>
					</tr>
					<tr>
						<th>소유자명</th>
						<td colspan="3">
							<input class="form-control" type="text" placeholder="소유자명" v-model="searchOptions_.oName" />
						</td>
						<th>전소유자명</th>
						<td colspan="3">
							<input class="form-control" type="text" placeholder="전소유자명" v-model="searchOptions_.preOName" />
						</td>
						<th>임대완료일</th>
						<td colspan="3">
							<input class="form-control xsm" type="date" v-model="searchOptions_.sellDate_S" />
							<b-icon-arrow-up />
							<input class="form-control xsm" type="date" v-model="searchOptions_.sellDate_E" />
							<b-icon-arrow-down />
						</td>
					</tr>
					<tr>
						<th>용도지역</th>
						<!-- v-model="searchOptions_.useList" -->
						<td colspan="3">
							<VueMultiselect
								v-model="searchOptions_.useList"
								tag-placeholder="Add this as new tag"
								placeholder="용도지역"
								label="name"
								track-by="id"
								:options="useAreaList"
								:multiple="true"
								:taggable="true"
								deselect-label="Can't remove this value"
							>
								<template v-slot:tag="{ option, remove }">
									<span class="custom__tag">
										<span>
											{{ option.name }}
										</span>
										<span class="custom__remove" @click="remove(option)">&times;</span>
									</span>
								</template>

								<template v-slot:option="props">
									<div class="option__desc">
										<span class="option__title">{{ props.option.name }}</span>
									</div>
								</template>
							</VueMultiselect>
							<!-- <select class="form-control">
								<option></option>
							</select> -->
						</td>
						<th>보증금</th>
						<td colspan="3">
							<input class="form-control xsm" type="number" placeholder="억이상" v-model="searchOptions_.deposit_S" />
							<input class="form-control xsm" type="number" placeholder="억이하" v-model="searchOptions_.deposit_E" />
						</td>
						<th>리모델링일</th>
						<td colspan="3">
							<input class="form-control xsm" type="date" v-model="searchOptions_.remodelDate_S" />
							<b-icon-arrow-up />
							<input class="form-control xsm" type="date" v-model="searchOptions_.remodelDate_E" />
							<b-icon-arrow-down />
						</td>
					</tr>
					<tr>
						<th>임대면적</th>
						<td colspan="3">
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이상"
								v-model="searchOptions_.rent_py_S"
								@keyup="searchOptions_.rent_area_S = $py_m2_ex(searchOptions_.rent_py_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이하"
								v-model="searchOptions_.rent_py_E"
								@keyup="searchOptions_.rent_area_E = $py_m2_ex(searchOptions_.rent_py_E)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이상"
								v-model="searchOptions_.rent_area_S"
								@keyup="searchOptions_.rent_py_S = $m2_py_ex(searchOptions_.rent_area_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이하"
								v-model="searchOptions_.rent_area_E"
								@keyup="searchOptions_.rent_py_E = $m2_py_ex(searchOptions_.rent_area_E)"
							/>
						</td>
						<th>월고정비</th>
						<td colspan="3">
							<input
								class="form-control xsm"
								type="number"
								placeholder="만원이상"
								v-model="searchOptions_.monthly_fixed_S"
							/>
							<input
								class="form-control xsm"
								type="number"
								placeholder="만원이하"
								v-model="searchOptions_.monthly_fixed_E"
							/>
						</td>
						<th>준공일자</th>
						<td colspan="3">
							<input class="form-control xsm" type="date" v-model="searchOptions_.buildDate_S" />
							<b-icon-arrow-up />
							<input class="form-control xsm" type="date" v-model="searchOptions_.buildDate_E" />
							<b-icon-arrow-down />
						</td>
					</tr>
					<tr>
						<th>전용면적</th>
						<td colspan="3">
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이상"
								v-model="searchOptions_.net_py_S"
								@keyup="searchOptions_.net_area_S = $py_m2_ex(searchOptions_.net_py_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이하"
								v-model="searchOptions_.net_py_E"
								@keyup="searchOptions_.net_area_E = $py_m2_ex(searchOptions_.net_py_E)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이상"
								v-model="searchOptions_.net_area_S"
								@keyup="searchOptions_.net_py_S = $m2_py_ex(searchOptions_.net_area_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이하"
								v-model="searchOptions_.net_area_E"
								@keyup="searchOptions_.net_py_E = $m2_py_ex(searchOptions_.net_area_E)"
							/>
						</td>
						<th>도로너비</th>
						<td colspan="3">
							<input class="form-control xsm" type="number" v-model="searchOptions_.roadWide_S" />
							<b-icon-arrow-up />
							<input class="form-control xsm" type="number" v-model="searchOptions_.roadWide_E" />
							<b-icon-arrow-down />
							<br />
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.roadConer" :true-value="'Y'" :false-value="''" />
								<span class="checkbox"></span>
								<span class="text">코너</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.roadDual" :true-value="'Y'" :false-value="''" />
								<span class="checkbox"></span>
								<span class="text">양면</span>
							</label>
						</td>
						<th>평당임대료</th>
						<td>
							<input class="form-control xsm" type="number" v-model="searchOptions_.rent_py_price" />
							<b-icon-arrow-down />
						</td>
						<th>주차방식/대수</th>
						<td>
							<select class="form-control select xsm" v-model="searchOptions_.parking_st">
								<option :value="null">선택</option>
								<option :value="true">유료</option>
								<option :value="false">무료</option>
							</select>
							<template v-if="searchOptions_.parking_st == true">
								<input class="form-control xsm" type="number" v-model="searchOptions_.fee_paring" />
								<b-icon-arrow-up />
							</template>
							<template v-else-if="searchOptions_.parking_st == false">
								<input class="form-control xsm" type="number" v-model="searchOptions_.free_parking" />
								<b-icon-arrow-up />
							</template>
						</td>
					</tr>
					<tr>
						<th>주변역</th>
						<td>
							<input class="form-control xsm" type="text" v-model="searchOptions_.sub" />
						</td>
						<th>거리</th>
						<td>
							<input class="form-control xsm" type="text" v-model="searchOptions_.dis" />
							<b-icon-arrow-down />
						</td>
						<th>도로명</th>
						<td>
							<input class="form-control xsm" type="text" v-model="searchOptions_.roadName" />
						</td>
						<th>담당자</th>
						<td>
							<select class="form-control select xsm" v-model="searchOptions_.memUid">
								<option value="">담당자 선택</option>
								<option v-for="m in memList" :key="m.mem_uid" :value="m.mem_uid">
									{{ m.mem_name }} {{ m.mem_rank_name }}
								</option>
							</select>
						</td>
						<th>E/V</th>
						<td colspan="3">
							<input type="text" class="form-control" />
						</td>
					</tr>
					<tr>
						<th>층수</th>
						<td colspan="3">
							<input class="form-control xsm" type="text" placeholder="층이상" v-model="searchOptions_.floor_S" />
							<input class="form-control xsm" type="text" placeholder="층이하" v-model="searchOptions_.floor_E" />
						</td>
						<th>매물등록일자</th>
						<td colspan="3">
							<input class="form-control xsm" type="date" v-model="searchOptions_.regDate_S" />
							<b-icon-arrow-up />
							<input class="form-control xsm" type="date" v-model="searchOptions_.regDate_E" />
							<b-icon-arrow-down />
						</td>
						<th>인테리어</th>
						<td colspan="3">
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.interior_type" :value="'need'" />
								<span class="checkbox"></span>
								<span class="text">필요</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.interior_type" :value="'good'" />
								<span class="checkbox"></span>
								<span class="text">양호</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.interior_type" :value="'demo'" />
								<span class="checkbox"></span>
								<span class="text">철거필요</span>
							</label>
						</td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-btn btn-secondary" @click="clearSearch">초기화</button>
					<button type="button" class="btn btn-primary" @click="btnSearch">검색</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import MapDetail from '@/views/MapDetail.vue';
import { NaverMap, NaverMarker, NaverPolygon } from 'vue3-naver-maps';
import VueMultiselect from 'vue-multiselect';
// import axios from 'axios';/

export default {
	name: 'LeaseMapSearch',
	components: {
		NaverMap,
		NaverMarker,
		NaverPolygon,
		VueMultiselect,
		// NaverInfoWindow,
	},
	data() {
		return {
			map: null,
			mapType: null,
			marker: {},
			marker2: null,
			polygon: null,
			infoWindow: null,
			infoList: [],
			isInfo: null,
			isCad: false, //지적도

			thisItem: null,
			itemList: [],
			itemDongList: [],
			itemGuList: [],
			itemSidoList: [],
			itemBizList: [],

			pageItemList: [],

			zoom: 18,

			mapOptions: {
				latitude: 37.51347, // 지도 중앙 위도
				longitude: 127.041722, // 지도 중앙 경도
				zoom: 18,
				zoomControl: false,
				zoomControlOptions: { position: 'TOP_RIGHT' },
			},
			initLayers: ['BACKGROUND', 'BACKGROUND_DETAIL', 'POI_KOREAN', 'TRANSIT', 'ENGLISH'],

			isMapListActive: false,
			isDetailSearchPopupShow: false,
			isBizActive: false,
			isDetailPopupShow: false,

			MONEY_FORMAT_TYPE: {
				LITTLE: 'LITTLE',
				MUCH: 'MUCH',
				LOAN: 'LOAN',
				RANGE: 'RANGE',
				TAX: 'TAX',
				MOBILE: 'MOBILE',
				MOBILE2: 'MOBILE2',
			},

			searchOptions: {
				mode: 0,
				keyword: '',
				state: {
					st: false,
					st_: ['done'],
				},
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				roadWide_S: '', //도로너비
				roadWide_E: '',
				roadConer: '', //코너
				roadDual: '', //양면
				roadName: '', //도로명
				memUid: '', //담당자
				regDate_S: '', //매물등록일자
				regDate_E: '',
				phone: '', //전화번호
				cateList: [], //매물종류
				sellDate_S: '', //매매일자
				sellDate_E: '',
				remodelDate_S: '', //리모델링일
				remodelDate_E: '',
				buildDate_S: '', //준공일자
				buildDate_E: '',

				rent_area_S: '',
				rent_area_E: '',
				net_area_S: '',
				net_area_E: '',
				rent_py_S: '',
				rent_py_E: '',
				net_py_S: '',
				net_py_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_fixed_S: '',
				monthly_fixed_E: '',
				rent_py_price: '',
				parking_st: null,
				free_parking: '',
				fee_paring: '',
				interior_type: [],
			},
			searchOptions_: {
				mode: 0,
				keyword: '',
				state: {
					st: false,
					st_: ['done'],
				},
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				roadWide_S: '', //도로너비
				roadWide_E: '',
				roadConer: '', //코너
				roadDual: '', //양면
				roadName: '', //도로명
				memUid: '', //담당자
				regDate_S: '', //매물등록일자
				regDate_E: '',
				phone: '', //전화번호
				cateList: [], //매물종류
				sellDate_S: '', //매매일자
				sellDate_E: '',
				remodelDate_S: '', //리모델링일
				remodelDate_E: '',
				buildDate_S: '', //준공일자
				buildDate_E: '',

				rent_area_S: '',
				rent_area_E: '',
				net_area_S: '',
				net_area_E: '',
				rent_py_S: '',
				rent_py_E: '',
				net_py_S: '',
				net_py_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_fixed_S: '',
				monthly_fixed_E: '',
				rent_py_price: '',
				parking_st: null,
				free_parking: '',
				fee_paring: '',
				interior_type: [],
			},
			isTooltipShow: false,
			tooltipName: '',

			page: 1,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,
			pageData: null,

			onTg: true,

			bdCateList: [],
			useAreaList: [],
			teamList: [],
			cateList: [],
			memList: [],
		};
	},
	updated() {},
	created() {
		window.setZoom = this.setZoom;
		window.getItem = this.getItem;
		window.btnInfoNext = this.btnInfoNext;
		window.closeInfo = this.closeInfo;
		window.openDetail = this.openDetail;

		this.searchOptions.bId = this.$route.query.isId;
		this.searchOptions_.bId = this.$route.query.isId;
		this.searchOptions.state.st_ = [this.$route.query.st];
		this.searchOptions_.state.st_ = [this.$route.query.st];

		this.getItemPage(this.page);
		this.init();
	},
	mounted() {
		const mapTooltip = document.querySelector('.map-tooltip');
		document.addEventListener('mousemove', e => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			mapTooltip.style.left = mouseX + 20 + 'px';
			mapTooltip.style.top = mouseY + 20 + 'px';
		});
	},
	methods: {
		init() {
			this.$apiGET('/admin/api/map/bdCate').then(data => {
				this.bdCateList = data;
			});
			this.$apiGET('/admin/api/map/useArea').then(data => {
				this.useAreaList = data;
			});
			// this.$apiGET('/admin/api/map/team').then(data => {
			// 	this.teamList = data;
			// });
			this.$apiGET('/admin/api/mem/code?part=team').then(data => {
				this.teamList = data;
			});
			this.$apiGET('/admin/api/mem/code?part=team_cate').then(data => {
				this.cateList = data;
			});
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		addTag(newTag) {
			const tag = {
				name: newTag,
				code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
			};
			this.options.push(tag);
			this.value.push(tag);
		},
		removeItemList(itemList_) {
			for (const [key] of Object.entries(this.marker)) {
				let fg = false;
				for (let i = 0; i < itemList_.length; i++) {
					if (key == itemList_[i].bid) {
						fg = true;
					}
				}

				if (!fg) {
					delete this.marker[key];
				}
			}
		},
		setZoom(lng, lat, level, fg) {
			this.map.setCenter({ lat: lat, lng: lng });
			// this.map.setZoom(17, true);
			this.map.setZoom(level, fg);
		},
		closeInfo(e) {
			if (e) {
				if (e.stopPropagation) e.stopPropagation();
				else e.cancelBubble = true; // IE 대응
			}

			this.isInfo = null;
			if (this.infoWindow && this.infoWindow.getMap()) {
				this.infoWindow.close();
			}
		},
		onZoomChanged() {},
		async onDrawMarker(fg) {
			const pos = this.map.getBounds();
			const zoom = this.map.getZoom();

			if (zoom <= 11) {
				this.itemList = [];
				this.itemDongList = [];
				this.itemGuList = [];
				this.itemBizList = [];
				this.closeInfo();
				this.isInfo = null;
				this.getItemSidoList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng);
			} else if (zoom >= 12 && zoom <= 14) {
				this.itemList = [];
				this.itemDongList = [];
				this.itemSidoList = [];
				this.itemBizList = [];
				this.closeInfo();
				this.isInfo = null;
				this.getItemGuList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng);
			} else if (zoom >= 15 && zoom <= 16) {
				this.itemList = [];
				this.itemGuList = [];
				this.itemSidoList = [];
				this.itemBizList = [];
				this.closeInfo();
				this.isInfo = null;
				this.getItemDongList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng);
			} else if (zoom >= 17) {
				this.itemDongList = [];
				this.itemGuList = [];
				this.itemSidoList = [];
				await this.getItemList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng, fg);
				if (this.isBizActive) {
					this.getItemBizList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng);
				} else {
					this.itemBizList = [];
				}
			}
		},
		onLoadMap(mapObject) {
			this.map = mapObject;
			this.map.setSize({ width: '1371px', height: '1024px' });

			const pos = this.map.getBounds();
			this.getItemList(pos._min._lat, pos._max._lat, pos._min._lng, pos._max._lng, false);

			this.mapType = new window.naver.maps.CadastralLayer();
		},
		onLoadInfoWindow(infoWindowObject) {
			this.infoWindow = infoWindowObject;
		},
		onLoadMarker(markerObject, item) {
			// this.marker = markerObject;
			this.marker[item.bid] = markerObject;

			const deposit = this.formatMoney(item.deposit, this.MONEY_FORMAT_TYPE.LOAN);
			const monthly_fixed = this.formatMoney(item.monthly_fixed, this.MONEY_FORMAT_TYPE.LOAN);
			const rent_area_py = item.rent_area_py;

			let stColor = '';
			//준비 진화색 2, 매물 파란 1, 보류 연회 3, 매각 빨간 4
			if (item.state == 'done') {
				stColor = 'type-1';
			} else if (item.state == 'ready') {
				stColor = 'type-2';
			} else if (item.state == 'hold') {
				stColor = 'type-3';
			} else if (item.state == 'sell') {
				stColor = 'type-4';
			}

			this.marker[item.bid].setIcon({
				icon: 'HtmlIcon',
				content: `<div class="map-pin ${stColor} line" onClick="window.getItem(${item.bid})">
									<p>보<span class="count">${deposit}</span></p>
									<p>월고정<span class="count">${monthly_fixed}</span></p>
									<p>임대<span class="count">${rent_area_py}</span></p>
								</div>`,
			});

			// vue.marker.setIcon({
			// 	content: `<div  class="count sm"
			//     style="left: 20px; top: 20px"
			//     onClick="window.listSelect('${item.Id}')">${item.AvailCount}</div>`,
			// });
		},
		onLoadDongMarker(markerObject, item) {
			this.marker2 = markerObject;
			// console.log(item);

			let str = '';
			let cnt = 0;

			for (let i = 0; i < item.length; i++) {
				str += `<p class="text">${this.$ITEM_STATE2[item[i].state]} ${item[i].cnt}건</p>`;
				cnt += item[i].cnt;
			}

			this.marker2.setIcon({
				content: `<div class="map-circle" onClick="window.setZoom(${item[0].pt.x},${item[0].pt.y},17,${true})">
								<p class="count">${cnt}</p>
								<p class="text">${item[0].name}</p>
							${str}
						</div>`,
			});
		},
		onLoadPolygon(polygonObject) {
			this.polygon = polygonObject;

			this.polygon.setOptions({
				fillColor: 'red',
				fillOpacity: 0.3,
				strokeColor: 'red',
				strokeOpacity: 0.6,
				clickable: true,
			});
		},
		onMouseupPolygon(ev, name) {
			this.tooltipName = name;
			this.isTooltipShow = true;
			//document.querySelector('.map-tooltip').style.left = ev.point.x + 'px';
			//document.querySelector('.map-tooltip').style.top = ev.point.y + 'px';
			ev.overlay.setOptions({
				strokeWeight: 3.5,
			});
		},
		onMouseoutPolygon(ev) {
			this.isTooltipShow = false;
			ev.overlay.setOptions({
				strokeWeight: 1,
			});
		},
		openDetail(cid) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('LeaseMapDetail/' + cid, '', attr);
		},
		getItem(bid) {
			this.isInfo = null;

			// if (this.infoWindow && this.infoWindow.getMap()) {
			// 	this.infoWindow.close();
			// }
			this.infoList = [];
			for (const [key, value] of Object.entries(this.marker)) {
				if (this.objCompare(value.position, this.marker[bid].position)) {
					this.infoList.push(Number(key));
				}
			}

			const idx = this.infoList.indexOf(bid);

			let but = '';

			if (idx != 0) {
				but += `<button type="button" class="btn" onClick="window.btnInfoNext(event, ${this.infoList[idx - 1]})">
					<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path></svg>
					</button>`;
			}
			but += `${idx + 1}`;
			if (idx + 1 != this.infoList.length) {
				but += `<button type="button" class="btn" onClick="window.btnInfoNext(event, ${this.infoList[idx + 1]})">
					<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>
					</button>`;
			}
			let imgUrl = process.env.VUE_APP_HOST_FRONT + '/users/item/image2?id=';

			this.$apiGET('/admin/api/map/getItem2?bid=' + bid).then(data => {
				this.thisItem = data;
				imgUrl += data.img;
				this.infoWindow = new window.naver.maps.InfoWindow({
					disableAnchor: true,
					backgroundColor: 'transparent',
					pixelOffset: new window.naver.maps.Point(0, -58),
					borderWidth: 0,
					content: `<div class="map-detail" onClick="window.openDetail(${bid})">
										<div class="top">
											${this.thisItem.building_name} ${this.thisItem.floor_info}
											<button type="button" class="btn btn-close" onClick="window.closeInfo(event)"><b-icon-x-lg /></button>
										</div>
										<div class="con">
											<div class="img-wrap">
												<img src="${imgUrl}" width="100" height="100" alt="" />
											</div>
											<div class="text">
												<p><strong>임대면적 : </strong>${this.thisItem.rent_area_m2}㎡ (${this.thisItem.rent_area_py}py)</p>
												<p><strong>전용면적 : </strong>${this.thisItem.net_area_m2}㎡ (${this.thisItem.net_area_py}py)</p>
												<p><strong>보증금 : </strong>${this.formatMoney(this.thisItem.deposit, this.MONEY_FORMAT_TYPE.LOAN)}</p>
												<p><strong>월임대료 : </strong>${this.formatMoney(this.thisItem.monthly_rent, this.MONEY_FORMAT_TYPE.LOAN)}</p>
												<p><strong>관리비 : </strong>${this.formatMoney(this.thisItem.main_fee, this.MONEY_FORMAT_TYPE.LOAN)}</p>
												<p><strong>월고정비 : </strong>${this.formatMoney(this.thisItem.monthly_fixed, this.MONEY_FORMAT_TYPE.LOAN)}</p>
											</div>
										</div>

										<div class="btn-wrap">${but}</div>
									</div>`,
				});

				this.isInfo = bid;
				this.infoWindow.open(this.map, this.marker[bid]);
			});
		},
		getItemPage(pg) {
			this.$apiGET(
				'/admin/api/mapPage2' +
					'?page=' +
					(pg - 1) * this.itemSize +
					'&st_=' +
					this.searchOptions.state.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&mode=' +
					this.searchOptions.mode +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&sub=' +
					this.searchOptions.sub +
					'&dis=' +
					this.searchOptions.dis +
					'&floor_S=' +
					this.searchOptions.floor_S +
					'&floor_E=' +
					this.searchOptions.floor_E +
					'&stList=' +
					this.searchOptions.stList +
					'&bId=' +
					this.searchOptions.bId +
					'&preOName=' +
					this.searchOptions.preOName +
					'&roadWide_S=' +
					this.searchOptions.roadWide_S +
					'&roadWide_E=' +
					this.searchOptions.roadWide_E +
					'&roadConer=' +
					this.searchOptions.roadConer +
					'&roadDual=' +
					this.searchOptions.roadDual +
					'&roadName=' +
					this.searchOptions.roadName +
					'&memUid=' +
					this.searchOptions.memUid +
					'&regDate_S=' +
					this.searchOptions.regDate_S +
					'&regDate_E=' +
					this.searchOptions.regDate_E +
					'&phone=' +
					this.searchOptions.phone +
					'&cateList=' +
					this.searchOptions.cateList +
					'&sellDate_S=' +
					this.searchOptions.sellDate_S +
					'&sellDate_E=' +
					this.searchOptions.sellDate_E +
					'&remodelDate_S=' +
					this.searchOptions.remodelDate_S +
					'&remodelDate_E=' +
					this.searchOptions.remodelDate_E +
					'&buildDate_S=' +
					this.searchOptions.buildDate_S +
					'&buildDate_E=' +
					this.searchOptions.buildDate_E +
					'&rent_area_S=' +
					this.searchOptions.rent_area_S +
					'&rent_area_E=' +
					this.searchOptions.rent_area_E +
					'&net_area_S=' +
					this.searchOptions.net_area_S +
					'&net_area_E=' +
					this.searchOptions.net_area_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_fixed_S=' +
					this.searchOptions.monthly_fixed_S +
					'&monthly_fixed_E=' +
					this.searchOptions.monthly_fixed_E +
					'&rent_py_price=' +
					this.searchOptions.rent_py_price +
					'&free_parking=' +
					this.searchOptions.free_parking +
					'&fee_paring=' +
					this.searchOptions.fee_paring +
					'&interior_type=' +
					this.searchOptions.interior_type,
			).then(data => {
				this.pageItemList = data.item;
				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);

				if (this.onTg) {
					this.onTg = false;
					this.clearSearch();
					this.$nextTick(() => {
						setTimeout(
							function () {
								this.btnItemPage(this.pageItemList[0].pt.x, this.pageItemList[0].pt.y, 21, this.pageItemList[0].bid);
							}.bind(this),
							250,
						);
					});
				}
			});
		},
		async getItemList(lat_min, lat_max, lng_min, lng_max, fg) {
			await this.$apiGET(
				'/admin/api/map2?lat_min=' +
					lat_min +
					'&lat_max=' +
					lat_max +
					'&lng_min=' +
					lng_min +
					'&lng_max=' +
					lng_max +
					'&st_=' +
					this.searchOptions.state.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&mode=' +
					this.searchOptions.mode +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&sub=' +
					this.searchOptions.sub +
					'&dis=' +
					this.searchOptions.dis +
					'&floor_S=' +
					this.searchOptions.floor_S +
					'&floor_E=' +
					this.searchOptions.floor_E +
					'&stList=' +
					this.searchOptions.stList +
					'&bId=' +
					this.searchOptions.bId +
					'&preOName=' +
					this.searchOptions.preOName +
					'&roadWide_S=' +
					this.searchOptions.roadWide_S +
					'&roadWide_E=' +
					this.searchOptions.roadWide_E +
					'&roadConer=' +
					this.searchOptions.roadConer +
					'&roadDual=' +
					this.searchOptions.roadDual +
					'&roadName=' +
					this.searchOptions.roadName +
					'&memUid=' +
					this.searchOptions.memUid +
					'&regDate_S=' +
					this.searchOptions.regDate_S +
					'&regDate_E=' +
					this.searchOptions.regDate_E +
					'&phone=' +
					this.searchOptions.phone +
					'&cateList=' +
					this.searchOptions.cateList +
					'&sellDate_S=' +
					this.searchOptions.sellDate_S +
					'&sellDate_E=' +
					this.searchOptions.sellDate_E +
					'&remodelDate_S=' +
					this.searchOptions.remodelDate_S +
					'&remodelDate_E=' +
					this.searchOptions.remodelDate_E +
					'&buildDate_S=' +
					this.searchOptions.buildDate_S +
					'&buildDate_E=' +
					this.searchOptions.buildDate_E +
					'&rent_area_S=' +
					this.searchOptions.rent_area_S +
					'&rent_area_E=' +
					this.searchOptions.rent_area_E +
					'&net_area_S=' +
					this.searchOptions.net_area_S +
					'&net_area_E=' +
					this.searchOptions.net_area_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_fixed_S=' +
					this.searchOptions.monthly_fixed_S +
					'&monthly_fixed_E=' +
					this.searchOptions.monthly_fixed_E +
					'&rent_py_price=' +
					this.searchOptions.rent_py_price +
					'&free_parking=' +
					this.searchOptions.free_parking +
					'&fee_paring=' +
					this.searchOptions.fee_paring +
					'&interior_type=' +
					this.searchOptions.interior_type,
			).then(data => {
				this.removeItemList(data);
				if (fg) {
					this.itemList = data;
				} else if (this.itemList.length > 250) {
					setTimeout(
						function () {
							this.itemList = data;
						}.bind(this),
						250,
					);
				} else if (this.itemList.length > 100) {
					setTimeout(
						function () {
							this.itemList = data;
						}.bind(this),
						100,
					);
				} else {
					this.itemList = data;
				}
			});
		},
		getItemDongList(lat_min, lat_max, lng_min, lng_max) {
			this.$apiGET(
				'/admin/api/map2/dong?lat_min=' +
					lat_min +
					'&lat_max=' +
					lat_max +
					'&lng_min=' +
					lng_min +
					'&lng_max=' +
					lng_max +
					'&st_=' +
					this.searchOptions.state.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&mode=' +
					this.searchOptions.mode +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&sub=' +
					this.searchOptions.sub +
					'&dis=' +
					this.searchOptions.dis +
					'&floor_S=' +
					this.searchOptions.floor_S +
					'&floor_E=' +
					this.searchOptions.floor_E +
					'&stList=' +
					this.searchOptions.stList +
					'&bId=' +
					this.searchOptions.bId +
					'&preOName=' +
					this.searchOptions.preOName +
					'&roadWide_S=' +
					this.searchOptions.roadWide_S +
					'&roadWide_E=' +
					this.searchOptions.roadWide_E +
					'&roadConer=' +
					this.searchOptions.roadConer +
					'&roadDual=' +
					this.searchOptions.roadDual +
					'&roadName=' +
					this.searchOptions.roadName +
					'&memUid=' +
					this.searchOptions.memUid +
					'&regDate_S=' +
					this.searchOptions.regDate_S +
					'&regDate_E=' +
					this.searchOptions.regDate_E +
					'&phone=' +
					this.searchOptions.phone +
					'&cateList=' +
					this.searchOptions.cateList +
					'&sellDate_S=' +
					this.searchOptions.sellDate_S +
					'&sellDate_E=' +
					this.searchOptions.sellDate_E +
					'&remodelDate_S=' +
					this.searchOptions.remodelDate_S +
					'&remodelDate_E=' +
					this.searchOptions.remodelDate_E +
					'&buildDate_S=' +
					this.searchOptions.buildDate_S +
					'&buildDate_E=' +
					this.searchOptions.buildDate_E +
					'&rent_area_S=' +
					this.searchOptions.rent_area_S +
					'&rent_area_E=' +
					this.searchOptions.rent_area_E +
					'&net_area_S=' +
					this.searchOptions.net_area_S +
					'&net_area_E=' +
					this.searchOptions.net_area_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_fixed_S=' +
					this.searchOptions.monthly_fixed_S +
					'&monthly_fixed_E=' +
					this.searchOptions.monthly_fixed_E +
					'&rent_py_price=' +
					this.searchOptions.rent_py_price +
					'&free_parking=' +
					this.searchOptions.free_parking +
					'&fee_paring=' +
					this.searchOptions.fee_paring +
					'&interior_type=' +
					this.searchOptions.interior_type,
			).then(data => {
				this.itemDongList = this.groupBy(data, 'code');
			});
		},
		getItemGuList(lat_min, lat_max, lng_min, lng_max) {
			this.$apiGET(
				'/admin/api/map2/gu?lat_min=' +
					lat_min +
					'&lat_max=' +
					lat_max +
					'&lng_min=' +
					lng_min +
					'&lng_max=' +
					lng_max +
					'&st_=' +
					this.searchOptions.state.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&mode=' +
					this.searchOptions.mode +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&sub=' +
					this.searchOptions.sub +
					'&dis=' +
					this.searchOptions.dis +
					'&floor_S=' +
					this.searchOptions.floor_S +
					'&floor_E=' +
					this.searchOptions.floor_E +
					'&stList=' +
					this.searchOptions.stList +
					'&bId=' +
					this.searchOptions.bId +
					'&preOName=' +
					this.searchOptions.preOName +
					'&roadWide_S=' +
					this.searchOptions.roadWide_S +
					'&roadWide_E=' +
					this.searchOptions.roadWide_E +
					'&roadConer=' +
					this.searchOptions.roadConer +
					'&roadDual=' +
					this.searchOptions.roadDual +
					'&roadName=' +
					this.searchOptions.roadName +
					'&memUid=' +
					this.searchOptions.memUid +
					'&regDate_S=' +
					this.searchOptions.regDate_S +
					'&regDate_E=' +
					this.searchOptions.regDate_E +
					'&phone=' +
					this.searchOptions.phone +
					'&cateList=' +
					this.searchOptions.cateList +
					'&sellDate_S=' +
					this.searchOptions.sellDate_S +
					'&sellDate_E=' +
					this.searchOptions.sellDate_E +
					'&remodelDate_S=' +
					this.searchOptions.remodelDate_S +
					'&remodelDate_E=' +
					this.searchOptions.remodelDate_E +
					'&buildDate_S=' +
					this.searchOptions.buildDate_S +
					'&buildDate_E=' +
					this.searchOptions.buildDate_E +
					'&rent_area_S=' +
					this.searchOptions.rent_area_S +
					'&rent_area_E=' +
					this.searchOptions.rent_area_E +
					'&net_area_S=' +
					this.searchOptions.net_area_S +
					'&net_area_E=' +
					this.searchOptions.net_area_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_fixed_S=' +
					this.searchOptions.monthly_fixed_S +
					'&monthly_fixed_E=' +
					this.searchOptions.monthly_fixed_E +
					'&rent_py_price=' +
					this.searchOptions.rent_py_price +
					'&free_parking=' +
					this.searchOptions.free_parking +
					'&fee_paring=' +
					this.searchOptions.fee_paring +
					'&interior_type=' +
					this.searchOptions.interior_type,
			).then(data => {
				this.itemGuList = this.groupBy(data, 'code');
			});
		},
		getItemSidoList(lat_min, lat_max, lng_min, lng_max) {
			this.$apiGET(
				'/admin/api/map2/sido?lat_min=' +
					lat_min +
					'&lat_max=' +
					lat_max +
					'&lng_min=' +
					lng_min +
					'&lng_max=' +
					lng_max +
					'&st_=' +
					this.searchOptions.state.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&mode=' +
					this.searchOptions.mode +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&sub=' +
					this.searchOptions.sub +
					'&dis=' +
					this.searchOptions.dis +
					'&floor_S=' +
					this.searchOptions.floor_S +
					'&floor_E=' +
					this.searchOptions.floor_E +
					'&stList=' +
					this.searchOptions.stList +
					'&bId=' +
					this.searchOptions.bId +
					'&preOName=' +
					this.searchOptions.preOName +
					'&roadWide_S=' +
					this.searchOptions.roadWide_S +
					'&roadWide_E=' +
					this.searchOptions.roadWide_E +
					'&roadConer=' +
					this.searchOptions.roadConer +
					'&roadDual=' +
					this.searchOptions.roadDual +
					'&roadName=' +
					this.searchOptions.roadName +
					'&memUid=' +
					this.searchOptions.memUid +
					'&regDate_S=' +
					this.searchOptions.regDate_S +
					'&regDate_E=' +
					this.searchOptions.regDate_E +
					'&phone=' +
					this.searchOptions.phone +
					'&cateList=' +
					this.searchOptions.cateList +
					'&sellDate_S=' +
					this.searchOptions.sellDate_S +
					'&sellDate_E=' +
					this.searchOptions.sellDate_E +
					'&remodelDate_S=' +
					this.searchOptions.remodelDate_S +
					'&remodelDate_E=' +
					this.searchOptions.remodelDate_E +
					'&buildDate_S=' +
					this.searchOptions.buildDate_S +
					'&buildDate_E=' +
					this.searchOptions.buildDate_E +
					'&rent_area_S=' +
					this.searchOptions.rent_area_S +
					'&rent_area_E=' +
					this.searchOptions.rent_area_E +
					'&net_area_S=' +
					this.searchOptions.net_area_S +
					'&net_area_E=' +
					this.searchOptions.net_area_E +
					'&deposit_S=' +
					this.searchOptions.deposit_S +
					'&deposit_E=' +
					this.searchOptions.deposit_E +
					'&monthly_fixed_S=' +
					this.searchOptions.monthly_fixed_S +
					'&monthly_fixed_E=' +
					this.searchOptions.monthly_fixed_E +
					'&rent_py_price=' +
					this.searchOptions.rent_py_price +
					'&free_parking=' +
					this.searchOptions.free_parking +
					'&fee_paring=' +
					this.searchOptions.fee_paring +
					'&interior_type=' +
					this.searchOptions.interior_type,
			).then(data => {
				this.itemSidoList = this.groupBy(data, 'code');
			});
		},
		getItemBizList(lat_min, lat_max, lng_min, lng_max) {
			this.$apiGET(
				'/admin/api/map/biz?lat_min=' + lat_min + '&lat_max=' + lat_max + '&lng_min=' + lng_min + '&lng_max=' + lng_max,
			).then(data => {
				// this.itemBizList = data;
				// console.log(data[0].geo[0]);
				// console.log(Object.entries(data[0].geo[0]));
				if (data.length) {
					for (let i = 0; i < data.length; i++) {
						let tt = [];
						if (data[i].geo.length) {
							for (let ii = 0; ii < data[i].geo[0].length; ii++) {
								tt.push(Object.values(data[i].geo[0][ii]));
							}
							data[i].pos = tt;
						}
					}
				}

				this.itemBizList = data;
			});
		},
		async btnItemPage(lng, lat, level, bid) {
			this.setZoom(lng, lat, level, false);
			await this.onDrawMarker(true);
			this.getItem(bid);
		},
		btnMapListActive(st) {
			this.isMapListActive = st;

			if (this.isMapListActive) {
				this.map.setSize({ width: '1828px', height: '1024px' });
				// this.map.refresh();
				// <!-- 1828 1371px-->
			} else {
				this.map.setSize({ width: '1371px', height: '1024px' });
			}
		},
		btnInfoNext(e, bid) {
			if (e.stopPropagation) e.stopPropagation();
			else e.cancelBubble = true; // IE 대응
			this.getItem(bid);
		},
		btnBizActive(st) {
			this.isBizActive = st;
			// console.log(st);
			this.onDrawMarker(false);
		},
		btnZoomLevel(st) {
			this.map.setZoom(this.map.getZoom() + st, true);
		},
		btnMapType() {
			this.isCad = !this.isCad;

			if (this.isCad) {
				this.mapType.setMap(this.map);
			} else {
				this.mapType.setMap(null);
			}
		},
		btnStOption() {
			if (this.searchOptions_.state.st) {
				this.searchOptions_.state.st_ = ['sell', 'ready', 'hold', 'done'];
			} else {
				this.searchOptions_.state.st_ = [];
			}
		},
		btnSearch() {
			if (this.searchOptions_.parking_st == true) {
				this.searchOptions_.free_parking = '';
			} else if (this.searchOptions_.parking_st == false) {
				this.searchOptions_.fee_paring = '';
			} else {
				this.searchOptions_.free_parking = '';
				this.searchOptions_.fee_paring = '';
			}

			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));

			if (this.infoWindow && this.infoWindow.getMap()) {
				this.infoWindow.close();
			}
			this.isInfo = null;

			let st_ = false;
			for (const [key, value] of Object.entries(this.searchOptions_)) {
				if (!(key == 'mode' || key == 'state')) {
					// console.log(`${key}: ${this.isEmpty(value)}`);
					if (this.isEmpty(value)) {
						st_ = true;
						break;
					}
				}
			}

			if (st_) {
				this.searchOptions.mode = 1;
			} else {
				this.searchOptions.mode = 0;
			}

			// console.log(this.searchOptions.useList);
			this.searchOptions.useList = [];
			for (let i = 0; i < this.searchOptions_.useList.length; i++) {
				this.searchOptions.useList.push(this.searchOptions_.useList[i].id);
			}

			this.searchOptions.cateList = [];
			for (let i = 0; i < this.searchOptions_.cateList.length; i++) {
				this.searchOptions.cateList.push(this.searchOptions_.cateList[i].id);
			}

			// roadWide_S; //도로너비
			if (this.searchOptions.roadWide_S == '' && this.searchOptions.roadWide_E != '') {
				this.searchOptions.roadWide_S = 0;
			} else if (this.searchOptions.roadWide_S != '' && this.searchOptions.roadWide_E == '') {
				this.searchOptions.roadWide_E = 32767;
			}

			// sellDate_S; //매매일자
			if (this.searchOptions.sellDate_S == '' && this.searchOptions.sellDate_E != '') {
				this.searchOptions.sellDate_S = '1900-01-01';
			} else if (this.searchOptions.sellDate_S != '' && this.searchOptions.sellDate_E == '') {
				this.searchOptions.sellDate_E = '2999-01-01';
			}

			// remodelDate_S; //리모델링일
			if (this.searchOptions.remodelDate_S == '' && this.searchOptions.remodelDate_E != '') {
				this.searchOptions.remodelDate_S = '1900-01-01';
			} else if (this.searchOptions.remodelDate_S != '' && this.searchOptions.remodelDate_E == '') {
				this.searchOptions.remodelDate_E = '2999-01-01';
			}

			// buildDate_S; //준공일자
			if (this.searchOptions.buildDate_S == '' && this.searchOptions.buildDate_E != '') {
				this.searchOptions.buildDate_S = '1900-01-01';
			} else if (this.searchOptions.buildDate_S != '' && this.searchOptions.buildDate_E == '') {
				this.searchOptions.buildDate_E = '2999-01-01';
			}

			//regDate_S; //매물등록일자
			if (this.searchOptions.regDate_S == '' && this.searchOptions.regDate_E != '') {
				this.searchOptions.regDate_S = '1900-01-01';
			} else if (this.searchOptions.regDate_S != '' && this.searchOptions.regDate_E == '') {
				this.searchOptions.regDate_E = '2999-01-01';
			}

			// floor_S; //층수
			if (this.searchOptions.floor_S == '' && this.searchOptions.floor_E != '') {
				this.searchOptions.floor_S = 0;
			} else if (this.searchOptions.floor_S != '' && this.searchOptions.floor_E == '') {
				this.searchOptions.floor_E = 999;
			}

			// deposit_S;	//보증금
			if (this.searchOptions.deposit_S == '' && this.searchOptions.deposit_E != '') {
				this.searchOptions.deposit_S = 0;
			} else if (this.searchOptions.deposit_S != '' && this.searchOptions.deposit_E == '') {
				this.searchOptions.deposit_E = 99999999;
			}

			// monthly_fixed_S;	//월세
			if (this.searchOptions.monthly_fixed_S == '' && this.searchOptions.monthly_fixed_E != '') {
				this.searchOptions.monthly_fixed_S = 0;
			} else if (this.searchOptions.monthly_fixed_S != '' && this.searchOptions.monthly_fixed_E == '') {
				this.searchOptions.monthly_fixed_E = 99999999;
			}

			// rent_area_S; //임대면적
			if (this.searchOptions.rent_area_S == '' && this.searchOptions.rent_area_E != '') {
				this.searchOptions.rent_area_S = 0;
			} else if (this.searchOptions.rent_area_S != '' && this.searchOptions.rent_area_E == '') {
				this.searchOptions.rent_area_E = 99999999;
			}

			// net_area_S; //전용면적
			if (this.searchOptions.net_area_S == '' && this.searchOptions.net_area_E != '') {
				this.searchOptions.net_area_S = 0;
			} else if (this.searchOptions.net_area_S != '' && this.searchOptions.net_area_E == '') {
				this.searchOptions.net_area_E = 99999999;
			}

			this.page = 1;
			// this.map.refresh();
			this.itemList = [];
			this.itemDongList = [];
			this.itemGuList = [];
			this.itemSidoList = [];
			this.itemBizList = [];
			this.getItemPage(this.page);
			this.onDrawMarker(false);
			this.isDetailSearchPopupShow = false;
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
		clearSearch() {
			this.searchOptions_ = {
				mode: 0,
				keyword: '',
				state: {
					st: false,
					st_: ['done'],
				},
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				roadWide_S: '', //도로너비
				roadWide_E: '',
				roadConer: '', //코너
				roadDual: '', //양면
				roadName: '', //도로명
				memUid: '', //담당자
				regDate_S: '', //매물등록일자
				regDate_E: '',
				phone: '', //전화번호
				cateList: [], //매물종류
				sellDate_S: '', //매매일자
				sellDate_E: '',
				remodelDate_S: '', //리모델링일
				remodelDate_E: '',
				buildDate_S: '', //준공일자
				buildDate_E: '',

				rent_area_S: '',
				rent_area_E: '',
				net_area_S: '',
				net_area_E: '',
				rent_py_S: '',
				rent_py_E: '',
				net_py_S: '',
				net_py_E: '',
				deposit_S: '',
				deposit_E: '',
				monthly_fixed_S: '',
				monthly_fixed_E: '',
				rent_py_price: '',
				parking_st: null,
				free_parking: '',
				fee_paring: '',
				interior_type: [],
			};
		},
		numberToKorean(number) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		formatMoney(e, t, a) {
			return this.c(e, t, !0, a);
		},
		formatMoneyBasedOnWon(e, t, a) {
			var r = e;
			return 'string' == typeof e && (r = parseInt(e, 10)), this.c(r, t, !1, a);
		},
		c(e, t, a, r) {
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
				case this.MONEY_FORMAT_TYPE.MUCH:
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
				case this.MONEY_FORMAT_TYPE.LITTLE:
					if (0 === l) {
						o = '0';
						break;
					}
					s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += m.toLocaleString());
					break;
				case this.MONEY_FORMAT_TYPE.LOAN:
					if (0 === l) {
						o = '0';
						break;
					}
					s > 0 && (o = s.toLocaleString() + '억'),
						m > 0 && (o += m.toLocaleString() + '만'),
						p > 0 && (o += p.toLocaleString() + '원');
					break;
				case this.MONEY_FORMAT_TYPE.TAX:
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
				case this.MONEY_FORMAT_TYPE.MOBILE:
					if (0 === l) {
						o = '0';
						break;
					}
					s > 0 && (o = s.toLocaleString() + '억'), m > 0 && (o += o ? ' ' + m.toLocaleString() : m.toLocaleString());
					break;
				case this.MONEY_FORMAT_TYPE.MOBILE2:
					if (0 === l) {
						o = '0';
						break;
					}
					s > 0 && (o = s.toLocaleString() + '억'),
						m > 0 && (o += o ? ' ' + m.toLocaleString() + '만' : m.toLocaleString() + '만');
			}
			return i && (o = '-' + o), o;
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
	},
};
</script>

<style>
.infowindow-style {
	color: black;
	background-color: white;
	text-align: center;
	font-weight: 600;
	font-size: 20px;
	padding: 6px 8px;
}
</style>
