<template>
	<div class="content">
		<div class="section">
			<div class="col-2">
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
							<input type="checkbox" v-model="searchOptions_.st" @change="btnStOption" />
							<span class="checkbox"></span>
							<span class="text">전체</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.st_" :value="'ready'" />
							<span class="checkbox"></span>
							<span class="text">준비</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.st_" :value="'done'" />
							<span class="checkbox"></span>
							<span class="text">매물</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.st_" :value="'hold'" />
							<span class="checkbox"></span>
							<span class="text">보류</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.st_" :value="'sell'" />
							<span class="checkbox"></span>
							<span class="text">매각</span>
						</label>
					</div>
					<div class="right">
						<button type="button" class="btn search" @click="btnSearch"><b-icon-search /></button>
						<button type="button" class="btn list" @click="isDetailSearchPopupShow = true">
							<b-icon-funnel-fill />
						</button>
					</div>
				</div>
				<div class="section">
					<div class="section-tit">열람목록</div>
					<div class="table-wrap">
						<table class="table click">
							<colgroup>
								<col width="10%" />
								<col width="10%" />
								<col width="20%" />
								<col width="50%" />
								<col width="10%" />
							</colgroup>
							<tr class="sticky">
								<th>상태</th>
								<th>물건번호</th>
								<th>물건명</th>
								<th>주소</th>
								<th>삭제</th>
							</tr>
							<tr
								v-for="(c, idx) in countList"
								:key="'count_' + c.building_view_log_uid"
								@click="btnOnDetail(c.building_uid, idx, 'count')"
							>
								<td>{{ $ITEM_STATE[c.sell_status] }}</td>
								<td>{{ c.building_uid }}</td>
								<td>{{ c.building_name }}</td>
								<td>{{ c.jibun_addr }}<br />{{ c.road_addr }}</td>
								<td>
									<button type="button" class="btn" @click.stop="btnDelCount(c.building_view_log_uid)">
										<b-icon-trash />
									</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">
				물건목록
				<span class="sub">검색결과 : {{ totalCount }}건</span>
				<div class="right">
					<button type="button" class="btn btn-xxsm btn-secondary" @click="callSMS">SMS</button>&nbsp;
					<button type="button" class="btn btn-xxsm btn-secondary" @click="btnOnBriefing">브리핑 대기 물건 저장</button>
				</div>
			</div>
			<div class="table-wrap">
				<table class="table sm click">
					<colgroup>
						<col width="2%" />
						<col width="3%" />
						<col width="5%" />
						<col width="10%" />
						<col width="20%" />
						<col width="10%" />
						<col width="5%" />
						<col width="5%" />
						<col width="5%" />
						<col width="5%" />
						<col width="5%" />
						<col width="5%" />
						<col width="15%" />
						<col width="5%" />
					</colgroup>
					<tr>
						<th>
							<label class="input-checkbox">
								<input type="checkbox" v-model="brifSt" @change="btnOnAddBrif" />
								<span class="checkbox"></span>
							</label>
						</th>
						<th>상태</th>
						<th>물건번호</th>
						<th>물건명</th>
						<th>주소</th>
						<th>용도지역</th>
						<th>대지(평)</th>
						<th>연면적(평)</th>
						<th>매매가(만)</th>
						<th>보증금</th>
						<th>월임대료</th>
						<th>연수익률</th>
						<th>주변역</th>
						<th>도로사항</th>
						<th>지도보기</th>
					</tr>
					<tr
						v-for="(item, idx) in itemList"
						:key="'total_' + item.building_uid"
						@click="btnOnDetail(item.building_uid, idx, 'total')"
					>
						<td @click.stop>
							<label class="input-checkbox">
								<input type="checkbox" v-model="item.brifSt" />
								<span class="checkbox"></span>
							</label>
						</td>
						<td>
							<span
								v-bind:class="{
									'txt-c--blue': item.sell_status == 'done',
									'txt-c--grey': item.sell_status == 'ready',
									'txt-c--red': item.sell_status == 'sell',
								}"
							>
								{{ $ITEM_STATE[item.sell_status] }}
							</span>
						</td>
						<td>{{ item.building_uid }}</td>
						<td>{{ item.building_name }}</td>
						<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>
						<td>{{ item.cfg_val1 }}</td>
						<td>{{ item.land_size_p }}</td>
						<td>{{ item.total_size_p }}</td>

						<td>{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
						<td>{{ $formatMoney(item.ex_sum_rent_deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
						<td>{{ $formatMoney(item.ex_sum_rent_money, $MONEY_FORMAT_TYPE.LOAN) }}</td>
						<td>{{ item.total_income_rate }}</td>
						<td>{{ item.substation }}</td>
						<td>
							<template v-if="item.roadwide_1">{{ item.roadwide_1 }}m </template>
							<template v-if="item.roadwide_2">, {{ item.roadwide_2 }}m </template>
							<template v-if="item.roadwide_3">, {{ item.roadwide_3 }}m </template>
							<template v-if="item.roadwide_4">, {{ item.roadwide_4 }}m </template>
						</td>
						<td>
							<button type="button" class="btn map1" @click.stop="$openNaverMap(item.jibun_addr)"></button>
							<button type="button" class="btn map2" @click.stop="$openDaumMap(item.jibun_addr)"></button>
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
								<input type="checkbox" v-model="searchOptions_.st" @change="btnStOption" />
								<span class="checkbox"></span>
								<span class="text">전체</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.st_" :value="'ready'" />
								<span class="checkbox"></span>
								<span class="text">준비</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.st_" :value="'done'" />
								<span class="checkbox"></span>
								<span class="text">매물</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.st_" :value="'hold'" />
								<span class="checkbox"></span>
								<span class="text">보류</span>
							</label>
							<label class="input-checkbox">
								<input type="checkbox" v-model="searchOptions_.st_" :value="'sell'" />
								<span class="checkbox"></span>
								<span class="text">매각</span>
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
						<th>매매일자</th>
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
						<th>매물금액</th>
						<td colspan="3">
							<input class="form-control xsm" type="number" placeholder="억이상" v-model="searchOptions_.sellPrice_S" />
							<input class="form-control xsm" type="number" placeholder="억이하" v-model="searchOptions_.sellPrice_E" />
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
						<th>대지평수</th>
						<td colspan="3">
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이상"
								v-model="searchOptions_.lp_S"
								@keyup="searchOptions_.lm_S = $py_m2_ex(searchOptions_.lp_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이하"
								v-model="searchOptions_.lp_E"
								@keyup="searchOptions_.lm_E = $py_m2_ex(searchOptions_.lp_E)"
							/>
							<br />
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이상"
								v-model="searchOptions_.lm_S"
								@keyup="searchOptions_.lp_S = $m2_py_ex(searchOptions_.lm_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이하"
								v-model="searchOptions_.lm_E"
								@keyup="searchOptions_.lp_E = $m2_py_ex(searchOptions_.lm_E)"
							/>
						</td>
						<th>건물평수</th>
						<td colspan="3">
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이상"
								v-model="searchOptions_.sizeP_S"
								@keyup="searchOptions_.sizeM_S = $py_m2_ex(searchOptions_.sizeP_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="평이하"
								v-model="searchOptions_.sizeP_E"
								@keyup="searchOptions_.sizeM_E = $py_m2_ex(searchOptions_.sizeP_E)"
							/>
							<br />
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이상"
								v-model="searchOptions_.sizeM_S"
								@keyup="searchOptions_.sizeP_S = $m2_py_ex(searchOptions_.sizeM_S)"
							/>
							<input
								class="form-control xsm"
								type="text"
								placeholder="㎡이하"
								v-model="searchOptions_.sizeM_E"
								@keyup="searchOptions_.sizeP_E = $m2_py_ex(searchOptions_.sizeM_E)"
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
						<th>연수익률</th>
						<td colspan="3">
							<input class="form-control xsm" type="number" v-model="searchOptions_.er_S" />
							%<b-icon-arrow-up />
							<input class="form-control xsm" type="number" v-model="searchOptions_.er_E" />
							%<b-icon-arrow-down />
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
						<th>토지평단가</th>
						<td>
							<input class="form-control xsm" type="number" v-model="searchOptions_.landSizePy" />
							<b-icon-arrow-down />
						</td>
						<th>연면적평단가</th>
						<td>
							<input class="form-control xsm" type="number" v-model="searchOptions_.totalSizePy" />
							<b-icon-arrow-down />
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
						<!-- v-model="searchOptions_.memUid" -->
						<td>
							<select class="form-control select xsm" v-model="searchOptions_.memUid">
								<option value="">담당자 선택</option>
								<option v-for="m in memList" :key="m.mem_uid" :value="m.mem_uid">
									{{ m.mem_name }} {{ m.mem_rank_name }}
								</option>
							</select>
						</td>
						<th>부서/팀</th>
						<!-- v-model="searchOptions_.teamId" -->
						<td colspan="3">
							<select
								v-model="searchOptions_.teamId"
								class="form-control xsm select"
								@change="searchOptions_.cateId = ''"
							>
								<option value="" selected>부서</option>
								<option :value="t.ind_cfg_uid" :key="'team_' + t.ind_cfg_uid" v-for="t in teamList">
									{{ t.cfg_val1 }}
								</option>
							</select>
							<select v-model="searchOptions_.cateId" class="form-control xsm select">
								<option value="" selected>팀</option>
								<template v-for="t in cateList" :key="'level_' + t.ind_cfg_uid">
									<option :value="t.ind_cfg_uid" v-if="t.refTeamId == searchOptions_.teamId">
										{{ t.cfg_val1 }}
									</option>
								</template>
							</select>
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
						<th></th>
						<td colspan="3"></td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-btn btn-secondary" @click="clearSearch">초기화</button>
					<button type="button" class="btn btn-primary" @click="btnSearch">검색</button>
				</div>
			</div>
		</div>
	</div>

	<!-- <div v-if="isDetailPopupShow" class="popup-wrap">
		<div class="dim"></div>
		<div class="popup full">
			<div class="popup-tit">
				상세
				<button type="button" class="btn btn-close" @click="isDetailPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<MapDetail @get_count="getCountList" :bid="this.isDetailPopupShow" />
			</div>
		</div>
	</div> -->
</template>

<script>
// import MapDetail from '@/views/MapDetail.vue';
import VueMultiselect from 'vue-multiselect';
export default {
	name: 'TotalSearch',
	components: { VueMultiselect },
	data() {
		return {
			itemList: [],
			isDetailSearchPopupShow: false,
			isDetailPopupShow: false,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,

			searchOptions: {
				keyword: '',
				st_: ['done'],
				st: false,
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역
				lp_S: '', //대지평수
				lp_E: '',
				lm_S: '', //대지면적
				lm_E: '',
				er_S: '', //연수익률
				er_E: '',
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				sellPrice_S: '', //매물금액
				sellPrice_E: '',
				sizeP_S: '', //건물평수
				sizeP_E: '',
				sizeM_S: '', //건물면적
				sizeM_E: '',
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
				landSizePy: '', //토지평단가
				totalSizePy: '', //연면적평단가
				teamId: '', //부서/팀
				cateId: '', //팀
				userId: '',
				userId2: '',
			},
			searchOptions_: {
				keyword: '',
				st_: ['done'],
				st: false,
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역

				lp_S: '', //대지평수
				lp_E: '',
				lm_S: '', //대지면적
				lm_E: '',

				er_S: '', //연수익률
				er_E: '',
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				sellPrice_S: '', //매물금액
				sellPrice_E: '',

				sizeP_S: '', //건물평수
				sizeP_E: '',
				sizeM_S: '', //건물면적
				sizeM_E: '',

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
				landSizePy: '', //토지평단가
				totalSizePy: '', //연면적평단가
				teamId: '', //부서/팀
				cateId: '', //팀
				userId: '',
			},
			bdCateList: [],
			useAreaList: [],
			teamList: [],
			countList: [],
			cateList: [],
			memList: [],

			brifSt: false,
			brifList: [],

			moreInfo: {
				mode: null,
				s: null,
				e: null,
				userId: null,
			},
		};
	},
	created() {
		if (Object.prototype.hasOwnProperty.call(this.$route.query, 'mode')) {
			this.moreInfo.mode = this.$route.query.mode;
		}

		if (Object.prototype.hasOwnProperty.call(this.$route.query, 'userId')) {
			this.moreInfo.userId = this.$route.query.userId;

			if (this.moreInfo.mode == 'done' || this.moreInfo.mode == 'week') {
				this.searchOptions.memUid = this.$route.query.userId;
				this.searchOptions_.memUid = this.$route.query.userId;
			} else {
				this.searchOptions.userId = this.$route.query.userId;
				this.searchOptions_.userId = this.$route.query.userId;
			}
		}

		if (
			Object.prototype.hasOwnProperty.call(this.$route.query, 's') &&
			Object.prototype.hasOwnProperty.call(this.$route.query, 'e')
		) {
			this.moreInfo.s = this.$route.query.s;
			this.moreInfo.e = this.$route.query.e;

			this.searchOptions.regDate_S = this.moreInfo.s;
			this.searchOptions_.regDate_S = this.moreInfo.s;
			this.searchOptions.regDate_E = this.moreInfo.e;
			this.searchOptions_.regDate_E = this.moreInfo.e;
		}

		if (this.moreInfo.mode == 'all') {
			this.searchOptions.st_ = ['sell', 'ready', 'hold', 'done'];
			this.searchOptions_.st_ = ['sell', 'ready', 'hold', 'done'];
		} else if (this.moreInfo.mode == 'done') {
			this.searchOptions.st_ = ['done'];
			this.searchOptions_.st_ = ['done'];
		} else if (this.moreInfo.mode == 'week') {
			this.searchOptions.st_ = ['done'];
			this.searchOptions_.st_ = ['done'];
		}

		this.init();
	},
	methods: {
		init() {
			this.$apiGET('/admin/api/map/bdCate').then(data => {
				this.bdCateList = data;
			});
			this.$apiGET('/admin/api/map/useArea').then(data => {
				this.useAreaList = data;
			});
			this.$apiGET('/admin/api/mem/code?part=team').then(data => {
				this.teamList = data;
			});
			this.$apiGET('/admin/api/mem/code?part=team_cate').then(data => {
				this.cateList = data;
			});
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
			this.getItemList(1);
			this.getCountList();
		},
		getCountList() {
			this.$apiGET('/admin/api/detail/countList').then(data => {
				this.countList = data;
				this.countList.push('1');
				this.countList.pop();
			});
		},
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/total?' +
					'page=' +
					(pg - 1) * this.itemSize +
					'&st_=' +
					this.searchOptions.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&lp_S=' +
					this.searchOptions.lp_S +
					'&lp_E=' +
					this.searchOptions.lp_E +
					'&er_S=' +
					this.searchOptions.er_S +
					'&er_E=' +
					this.searchOptions.er_E +
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
					'&sellPrice_S=' +
					this.searchOptions.sellPrice_S +
					'&sellPrice_E=' +
					this.searchOptions.sellPrice_E +
					'&sizeP_S=' +
					this.searchOptions.sizeP_S +
					'&sizeP_E=' +
					this.searchOptions.sizeP_E +
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
					'&landSizePy=' +
					this.searchOptions.landSizePy +
					'&totalSizePy=' +
					this.searchOptions.totalSizePy +
					'&teamId=' +
					this.searchOptions.teamId +
					'&userId=' +
					this.searchOptions.userId,
			).then(data => {
				for (let i = 0; i < data.item.length; i++) {
					data.item[i].brifSt = false;
				}

				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		btnSearch() {
			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));

			this.searchOptions.useList = [];
			for (let i = 0; i < this.searchOptions_.useList.length; i++) {
				this.searchOptions.useList.push(this.searchOptions_.useList[i].id);
			}

			this.searchOptions.cateList = [];
			for (let i = 0; i < this.searchOptions_.cateList.length; i++) {
				this.searchOptions.cateList.push(this.searchOptions_.cateList[i].id);
			}

			// lp_S; //대지평수
			if (this.searchOptions.lp_S == '' && this.searchOptions.lp_E != '') {
				this.searchOptions.lp_S = 0;
			} else if (this.searchOptions.lp_S != '' && this.searchOptions.lp_E == '') {
				this.searchOptions.lp_E = 99999999;
			}

			// er_S; //연수익률
			if (this.searchOptions.er_S == '' && this.searchOptions.er_E != '') {
				this.searchOptions.er_S = 0;
			} else if (this.searchOptions.er_S != '' && this.searchOptions.er_E == '') {
				this.searchOptions.er_E = 999;
			}

			// floor_S; //층수
			if (this.searchOptions.floor_S == '' && this.searchOptions.floor_E != '') {
				this.searchOptions.floor_S = 0;
			} else if (this.searchOptions.floor_S != '' && this.searchOptions.floor_E == '') {
				this.searchOptions.floor_E = 999;
			}

			// sellPrice_S;	//매물금액
			if (this.searchOptions.sellPrice_S == '' && this.searchOptions.sellPrice_E != '') {
				this.searchOptions.sellPrice_S = 0;
			} else if (this.searchOptions.sellPrice_S != '' && this.searchOptions.sellPrice_E == '') {
				this.searchOptions.sellPrice_E = 99999999;
			}

			// sizeP_S;	//건물평수
			if (this.searchOptions.sizeP_S == '' && this.searchOptions.sizeP_E != '') {
				this.searchOptions.sizeP_S = 0;
			} else if (this.searchOptions.sizeP_S != '' && this.searchOptions.sizeP_E == '') {
				this.searchOptions.sizeP_E = 99999999;
			}

			// roadWide_S; //도로너비
			if (this.searchOptions.roadWide_S == '' && this.searchOptions.roadWide_E != '') {
				this.searchOptions.roadWide_S = 0;
			} else if (this.searchOptions.roadWide_S != '' && this.searchOptions.roadWide_E == '') {
				this.searchOptions.roadWide_E = 32767;
			}

			//regDate_S; //매물등록일자
			if (this.searchOptions.regDate_S == '' && this.searchOptions.regDate_E != '') {
				this.searchOptions.regDate_S = '1900-01-01';
			} else if (this.searchOptions.regDate_S != '' && this.searchOptions.regDate_E == '') {
				this.searchOptions.regDate_E = '2999-01-01';
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

			this.page = 1;
			this.getItemList(this.page);

			this.isDetailSearchPopupShow = false;
		},
		btnStOption() {
			if (this.searchOptions_.st) {
				this.searchOptions_.st_ = ['sell', 'ready', 'hold', 'done'];
			} else {
				this.searchOptions_.st_ = [];
			}
		},
		clearSearch() {
			this.searchOptions_ = {
				keyword: '',
				st_: ['done'],
				st: false,
				bName: '', //물건명
				oName: '', //소유자명
				useList: [], //용도지역

				lp_S: '', //대지평수
				lp_E: '',
				lm_S: '', //대지면적
				lm_E: '',

				er_S: '', //연수익률
				er_E: '',
				sub: '', //주변역
				dis: '', //거리
				floor_S: '', //층수
				floor_E: '',
				stList: [], //상태
				bId: '', //물건번호
				preOName: '', //전소유자명
				sellPrice_S: '', //매물금액
				sellPrice_E: '',

				sizeP_S: '', //건물평수
				sizeP_E: '',
				sizeM_S: '', //건물면적
				sizeM_E: '',

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
				landSizePy: '', //토지평단가
				totalSizePy: '', //연면적평단가
				teamId: '', //부서/팀
				cateId: '', //팀
				userId: '',
			};
		},
		// btnOnDetail(id) {
		// 	this.isDetailPopupShow = id;
		// },
		btnOnDetail(cid, idx, mode) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (mode == 'total') {
				this.$apiGET(
					'/admin/api/total/count?' +
						'page=' +
						1 +
						'&st_=' +
						this.searchOptions.st_ +
						'&keyword=' +
						this.searchOptions.keyword +
						'&bName=' +
						this.searchOptions.bName +
						'&oName=' +
						this.searchOptions.oName +
						'&useList=' +
						this.searchOptions.useList +
						'&lp_S=' +
						this.searchOptions.lp_S +
						'&lp_E=' +
						this.searchOptions.lp_E +
						'&er_S=' +
						this.searchOptions.er_S +
						'&er_E=' +
						this.searchOptions.er_E +
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
						'&sellPrice_S=' +
						this.searchOptions.sellPrice_S +
						'&sellPrice_E=' +
						this.searchOptions.sellPrice_E +
						'&sizeP_S=' +
						this.searchOptions.sizeP_S +
						'&sizeP_E=' +
						this.searchOptions.sizeP_E +
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
						'&landSizePy=' +
						this.searchOptions.landSizePy +
						'&totalSizePy=' +
						this.searchOptions.totalSizePy +
						'&teamId=' +
						this.searchOptions.teamId +
						'&userId=' +
						this.searchOptions.userId,
				).then(data => {
					let idList = [];

					for (let i = 0; i < data.length; i++) {
						idList.push(data[i].building_uid);
					}

					const pageCnt = this.$store.state.pageCnt++;

					this.$store.dispatch('callSetPage', { idx: pageCnt, idList: idList });

					window.open(
						'MapDetail/' +
							cid +
							'?pageIdx=' +
							pageCnt +
							'&idx=' +
							(idx + 1 + (this.page - 1) * this.itemSize) +
							'&totalCount=' +
							this.totalCount +
							'&mode=' +
							mode,
						'',
						attr,
					);
				});
			} else if (mode == 'count') {
				let idList = [];

				for (let i = 0; i < this.countList.length; i++) {
					idList.push(this.countList[i].building_uid);
				}

				window.open(
					'MapDetail/' +
						cid +
						'?idx=' +
						(idx + 1) +
						'&totalCount=' +
						this.countList.length +
						'&idList=' +
						idList +
						'&mode=' +
						mode,
					'',
					attr,
				);
			}

			// console.log(openWin);
		},
		btnDelCount(id) {
			this.$apiPOST('/admin/api/detail/countList', { viewId: id }).then(data => {
				if (data) {
					this.getCountList();
				}
			});
		},
		btnOnBriefing() {
			this.brifList = [];
			let st = false;

			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].brifSt) {
					this.brifList.push(this.itemList[i].building_uid);
					st = true;
				}
			}

			if (!st) {
				alert('브리핑 대기 물건을 1개 이상 선택하세요.');
				return;
			}

			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('UserAdmin2?brifList=' + this.brifList, '', attr);
		},
		btnOnAddBrif() {
			for (let i = 0; i < this.itemList.length; i++) {
				if (this.brifSt) {
					this.itemList[i].brifSt = true;
				} else {
					this.itemList[i].brifSt = false;
				}
			}
		},
		callSMS() {
			if (!confirm('검색결과 기준 매도자들에게 매각 의사 문자를 보냅니다.')) {
				return;
			}

			this.$apiGET(
				'/admin/api/sms?' +
					'&st_=' +
					this.searchOptions.st_ +
					'&keyword=' +
					this.searchOptions.keyword +
					'&bName=' +
					this.searchOptions.bName +
					'&oName=' +
					this.searchOptions.oName +
					'&useList=' +
					this.searchOptions.useList +
					'&lp_S=' +
					this.searchOptions.lp_S +
					'&lp_E=' +
					this.searchOptions.lp_E +
					'&er_S=' +
					this.searchOptions.er_S +
					'&er_E=' +
					this.searchOptions.er_E +
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
					'&sellPrice_S=' +
					this.searchOptions.sellPrice_S +
					'&sellPrice_E=' +
					this.searchOptions.sellPrice_E +
					'&sizeP_S=' +
					this.searchOptions.sizeP_S +
					'&sizeP_E=' +
					this.searchOptions.sizeP_E +
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
					'&landSizePy=' +
					this.searchOptions.landSizePy +
					'&totalSizePy=' +
					this.searchOptions.totalSizePy +
					'&teamId=' +
					this.searchOptions.teamId +
					'&userId=' +
					this.searchOptions.userId,
			).then(re => {
				if (re.st) {
					alert('전송 완료');
				} else {
					alert(re.msg);
				}
			});
		},
	},
};
</script>

<style></style>
