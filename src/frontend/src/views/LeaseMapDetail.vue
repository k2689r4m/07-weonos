<template>
	<div class="wrap">
		<div class="content">
			<div class="detail-page" v-if="item">
				<div class="detail-page--top">
					<div class="left">
						<div
							class="state"
							v-bind:class="{
								'bg-grey': item.sell_status == 'hold',
								'bg-lgrey': item.sell_status == 'ready',
								'bg-red': item.sell_status == 'sell',
							}"
						>
							<span class="date">{{ $dateFormat(item.reg_date) }}</span>
							<span class="date">
								<template v-if="item.sell_status == 'done'">
									{{ $dateFormat(item.done_date_time) }}
								</template>
								<template v-else>&nbsp;</template>
							</span>
							<p
								class="name"
								v-bind:class="{
									'text-secondary': item.sell_status == 'ready',
									'text-dark': item.sell_status == 'hold',
									'text-danger': item.sell_status == 'sell',
								}"
							>
								{{ $ITEM_STATE2[item.sell_status] }}
							</p>
						</div>
					</div>
					<div class="info">
						<div class="top">
							<b-icon-journal-text /> 물건번호 : {{ item.building_uid }}
							<button
								type="button"
								class="btn btn-sm"
								v-bind:class="{ 'btn-primary': item.chk_status == 'A', 'btn-secondary': item.chk_status != 'A' }"
							>
								A
							</button>
							<button
								type="button"
								class="btn btn-sm"
								v-bind:class="{ 'btn-primary': item.chk_status == 'B', 'btn-secondary': item.chk_status != 'B' }"
							>
								B
							</button>
							<button
								type="button"
								class="btn btn-sm"
								v-bind:class="{ 'btn-primary': item.chk_status == 'C', 'btn-secondary': item.chk_status != 'C' }"
							>
								C
							</button>
						</div>
						<div class="bottom">{{ item.building_name }}</div>
					</div>
					<div class="count">
						<div class="box">
							조회
							<span class="num"
								><span class="txt-c--blue">{{ viewObj.today_view_cnt }}</span> / {{ viewObj.max_view_cnt }}</span
							>
						</div>
						<div class="box">
							출력
							<span class="num"
								><span class="txt-c--blue">{{ viewObj.today_print_cnt }}</span> / {{ viewObj.max_print_cnt }}</span
							>
						</div>
					</div>
					<div class="input-box">
						<label class="label">종류</label>
						<input type="text" class="form-control" v-model="multData" readonly />
						<label class="label">담당자</label>
						<input
							type="text"
							class="form-control"
							:value="item.building_mem_name + ' ' + item.building_mem_rank_name"
							readonly
						/>
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
						<div class="top">
							<button type="button" class="btn btn-sm btn-outline-secondary" @click="isPopupShow2 = true">
								<b-icon-file-earmark />&nbsp;첨부파일
							</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" @click="btnOnPrint">
								<b-icon-printer />&nbsp;출력
							</button>
						</div>
						<div class="bottom">
							<button type="button" class="btn btn-sm btn-secondary" @click="goEdit">편집모드</button>
							<button type="button" class="btn btn-sm btn-primary">브리핑대기물건저장</button>
						</div>
					</div>
				</div>
				<div class="detail-page--con">
					<div class="left">
						<div class="con">
							<div class="tit">
								주소
								<button
									v-for="link in linkList"
									:key="'linL_' + link.bid"
									type="button"
									class="btn btn-xxsm btn-dark"
									@click="btnOnDetail2(link.bid)"
								>
									<b-icon-link-45deg />
									{{ link.building_name }}
								</button>

								<button type="button" class="btn btn-xxsm btn-secondary" @click="isPopupShow5 = true">
									<b-icon-filter-square-fill />
								</button>
								<button type="button" class="btn btn-xxsm btn-secondary" @click="btnOnDetail">지도검색</button>
								<button type="button" class="btn map2" @click.stop="$openDaumMap(item.jibun_addr)"></button>
								<button type="button" class="btn map1" @click.stop="$openNaverMap(item.jibun_addr)"></button>
							</div>
							<div class="text">{{ jinbun_addr }}</div>
						</div>
						<div class="con">
							<div class="tit">
								금액정보
								<button type="button" class="btn icon" @click="$reloadPage()"><b-icon-arrow-repeat /></button>
							</div>
							<table class="table type-input">
								<colgroup>
									<col width="20%" />
									<col width="30%" />
									<col width="20%" />
									<col width="30%" />
								</colgroup>
								<tr>
									<th>보증금</th>
									<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.LOAN) }}</td>
									<th>월임대료</th>
									<td>{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>관리비</th>
									<td>{{ $formatMoney(item.main_fee, $MONEY_FORMAT_TYPE.LOAN) }}</td>
									<th>월고정비</th>
									<td>{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>임대면적</th>
									<td>{{ item.rent_area_m2 }}㎡ / {{ item.rent_area_py }}평</td>
									<th>평당 임대료</th>
									<td>{{ $formatMoney(item.rent_py_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>전용면적</th>
									<td>{{ item.net_area_m2 }}㎡ / {{ item.net_area_py }}평</td>
									<th>전용률</th>
									<td>{{ item.ex_rate }}%</td>
								</tr>
							</table>
							<table class="table type-input mt-2">
								<colgroup>
									<col width="35%" />
									<col width="65%" />
								</colgroup>
								<tr>
									<th>입주현황</th>
									<td>
										{{ item.in_status }}
									</td>
								</tr>
								<tr>
									<th>무료 주차대수</th>
									<td>{{ item.free_parking }} 대</td>
								</tr>
								<tr>
									<th>유료 주차대수</th>
									<td>{{ item.fee_paring }} 대</td>
								</tr>
								<tr>
									<th>화장실 유형</th>
									<td>
										{{ item.bathroom_type }}
									</td>
								</tr>
								<tr>
									<th>인테리어</th>
									<td>
										{{ $INTERIOR_TYPE[item.interior_type] }}
									</td>
								</tr>
								<tr>
									<th>렌트프리</th>
									<td>
										<template v-if="item.rent_free == 'selet'"> {{ item.rent_free_month }}개월 </template>
										<template v-else>{{ $RENT_FREE[item.rent_free] }}</template>
									</td>
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
										{{ item.land_size_m2 }}㎡ <strong>[{{ item.land_size_p }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>용도지역</th>
									<td>{{ item.cfg_val1 }}</td>
								</tr>
								<tr>
									<th>주변역/거리</th>
									<td>{{ item.substation }} [{{ item.substation_distance }}m]</td>
								</tr>
								<tr>
									<th>공시지가합계</th>
									<td>
										{{ item.public_land_price }} 만원 [평당:{{ item.public_land_price_py_price }}만원] [ 2022년 기준 ]
									</td>
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
										<br />
										<template v-if="item.road_name">[{{ item.road_name }}]</template>
									</td>
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
										{{ item.total_size_m2 }}㎡ <strong>[{{ item.total_size_p }}평]</strong>
									</td>
								</tr>
								<tr>
									<th>건축면적</th>
									<td>{{ item.build_size_m2 }}㎡ [{{ item.build_size_p }}평]</td>
								</tr>
								<tr>
									<th>규모</th>
									<td>{{ $getFloorString(this.item.floor_cnt_B, this.item.floor_cnt_F) }}</td>
									<!-- 철근콘크리트구조 추가 해야함 -->
								</tr>
								<tr>
									<th>준공연도/리모델링</th>
									<td>
										{{ $dateFormat(this.item.build_date) }}
										<template v-if="$dateFormat(this.item.remodel_date)">
											/ {{ $dateFormat(this.item.remodel_date) }}
										</template>
									</td>
								</tr>
								<tr>
									<th>건폐율/용적률</th>
									<td>{{ item.bl_ratio }}%/{{ item.fa_ratio }}%</td>
								</tr>
								<tr>
									<th>주차방식/대수</th>
									<td>
										<template v-if="item.park_type_name">{{ item.park_type_name }} /</template>
										법정 : {{ item.park_cnt_law }}대
									</td>
								</tr>
								<tr>
									<th>냉/난방식</th>
									<td>{{ item.heat_type_name }}</td>
								</tr>
								<tr>
									<th>승강기</th>
									<td>{{ item.ev_cnt }}대</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">대출/비용계산기</div>
							<table class="table type-input">
								<colgroup>
									<col width="18%" />
									<col width="32%" />
									<col width="18%" />
									<col width="32%" />
								</colgroup>
								<tr>
									<th>대출금액</th>
									<td>
										<money3 class="form-control sm" v-model="calcInfo.loan_money" v-bind="$MONEY1"></money3>
										<span>&nbsp;만&nbsp;</span>
									</td>
									<th>대출금리</th>
									<td>
										<money3 class="form-control sm" v-model="calcInfo.loan_rate" v-bind="$MONEY2"></money3>
										<span>&nbsp;%&nbsp;</span>
									</td>
								</tr>
							</table>
							<div class="text-center m-2">
								<button type="button" class="btn btn-xxsm btn-secondary" @click="calcLoan">계산하기</button>
							</div>
							<table class="table type-input">
								<colgroup>
									<col width="18%" />
									<col width="32%" />
									<col width="18%" />
									<col width="32%" />
								</colgroup>
								<tr>
									<th>연이자액</th>
									<td>
										<money3
											class="form-control sm"
											v-model="calcInfo.year_loan_money"
											v-bind="$MONEY1"
											readonly
										></money3>
										<span>&nbsp;만&nbsp;</span>
									</td>
									<th>
										구입자금
										<span class="tooltip-wrap">
											<span class="tooltip-btn">?</span>
											<span class="tooltip-con">매매금액에서 보증금과 대출금액을 뺀 값입니다.</span>
										</span>
									</th>
									<td>
										<money3 class="form-control sm" v-model="calcInfo.buy_money" v-bind="$MONEY1" readonly></money3>
										<span>&nbsp;만&nbsp;</span>
									</td>
								</tr>
								<tr>
									<th>월이자액</th>
									<td>
										<money3
											class="form-control sm"
											v-model="calcInfo.month_loan_money"
											v-bind="$MONEY1"
											readonly
										></money3>
										<span>&nbsp;만&nbsp;</span>
									</td>
									<th>
										대부비율
										<span class="tooltip-wrap">
											<span class="tooltip-btn">?</span>
											<span class="tooltip-con">매매금액에 대한 대출금액의 비율입니다.</span>
										</span>
									</th>
									<td>
										<money3
											class="form-control sm"
											v-model="calcInfo.loan_buy_money_per"
											v-bind="$MONEY2"
											readonly
										></money3>
										<span>&nbsp;%&nbsp;</span>
									</td>
								</tr>
								<tr>
									<th>
										월순수입
										<span class="tooltip-wrap">
											<span class="tooltip-btn">?</span>
											<span class="tooltip-con">월총수익에서 월이자액을 뺀 값입니다.</span>
										</span>
									</th>
									<td>
										<money3
											class="form-control sm"
											v-model="calcInfo.month_earn_money"
											v-bind="$MONEY1"
											readonly
										></money3>
										<span>&nbsp;만&nbsp;</span>
									</td>
									<th>
										레버리지
										<span class="tooltip-wrap">
											<span class="tooltip-btn">?</span>
											<span class="tooltip-con">총수익에서 금융비용을 제한 값을 자기자본으로 나눈 값입니다.</span>
										</span>
									</th>
									<td>
										<money3
											class="form-control sm"
											v-model="calcInfo.leverage_earn_rate"
											v-bind="$MONEY2"
											readonly
										></money3>
										<span>&nbsp;%&nbsp;</span>
									</td>
								</tr>
							</table>
							<p class="txt-size--sm mt-1">
								※ 간단한 대출정보 계산기입니다. 실제 대출 정보와는 다소 차이가 있을 수 있습니다.
							</p>
						</div>
					</div>
					<div class="center">
						<div class="con">
							<div class="tit">특징</div>
							<div class="feature">
								<div class="left">
									<template v-if="imgSt">
										<swiper :pagination="true" :autoHeight="true" :zoom="true" :modules="modules">
											<swiper-slide v-for="(item, idx) in imgList" :key="'iiimmg_' + idx">
												<div class="swiper-zoom-container">
													<img :src="item" alt="" style="max-width: 384px; max-height: 500px" />
												</div>
											</swiper-slide>
										</swiper>
									</template>
									<template v-else>
										<div id="pano" style="width: 100%; height: 500px"></div>
									</template>
								</div>
								<div class="right">
									<div id="map"></div>
								</div>
							</div>
							<div class="text" v-html="item.memo.split('\n').join('<br />')"></div>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab1 == false }"
									@click="typeTab1 = false"
								>
									임대차내역
								</button>
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab1 == true }"
									@click="typeTab1 = true"
								>
									건축물대장
								</button>
							</div>
							<div class="tab-con">
								<table v-if="typeTab1 == false" class="table type-input">
									<tr>
										<th>층</th>
										<th>임대</th>
										<th>용도</th>
										<th>보증금</th>
										<th>월세</th>
										<th>관리비</th>
										<th>만기</th>
										<th>비고</th>
										<th>평당임대료</th>
									</tr>
									<tr :key="'rent_' + rent.building_rent_uid" v-for="rent in rentList">
										<td class="text-center">{{ rent.rent_floor }}</td>
										<td class="text-center">{{ rent.rent_size_p }}</td>
										<td class="text-center">{{ rent.rent_usage }}</td>
										<td class="text-center">{{ rent.rent_deposit }}</td>
										<td class="text-center">{{ rent.rent_money }}</td>
										<td class="text-center">{{ rent.mgr_fee }}</td>
										<td class="text-center">{{ rent.end_date }}</td>
										<td class="text-center">{{ rent.memo }}</td>
										<td class="text-center">{{ rent.rent_ni }}</td>
										<!-- except_flag -->
									</tr>
								</table>
								<table v-else class="table type-input">
									<tr>
										<th>층</th>
										<th>면적</th>
										<th>평수</th>
										<th>층별용도</th>
									</tr>
									<tr :key="'floor_' + floor.building_floor_uid" v-for="floor in floorList">
										<td class="text-center">{{ floor.flrNoNm }}</td>
										<td class="text-center">{{ floor.area_m2 }}</td>
										<td class="text-center">{{ floor.area_py }}</td>
										<td class="text-center">{{ floor.name }}</td>
										<!-- chk_except -->
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="right">
						<div class="con">
							<div class="tab-btn">
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab3 == false }"
									@click="typeTab3 = false"
								>
									소유자정보
								</button>
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab3 == true }"
									@click="typeTab3 = true"
								>
									전소유자
								</button>
							</div>
							<div class="tab-con">
								<table v-if="typeTab3 == false" class="table type-input">
									<colgroup>
										<col width="35%" />
										<col width="65%" />
									</colgroup>
									<tr>
										<th>성명</th>
										<td>{{ item.owner_name }}</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.owner_home_phone }}
												<template v-if="item.owner_home_phone_memo">({{ item.owner_home_phone_memo }})</template>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.owner_office_phone }}
												<template v-if="item.owner_office_phone_memo">({{ item.owner_office_phone_memo }})</template>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.owner_mobile_1 }}
												<template v-if="item.owner_mobile_1_memo">({{ item.owner_mobile_1_memo }})</template>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
								</table>
								<table v-else class="table type-input">
									<colgroup>
										<col width="35%" />
										<col width="65%" />
									</colgroup>
									<tr>
										<th>성명</th>
										<td>{{ item.pre_owner_name }}</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.pre_owner_home_phone }}
												<template v-if="item.pre_owner_home_phone_memo"
													>({{ item.pre_owner_home_phone_memo }})</template
												>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.pre_owner_office_phone }}
												<template v-if="item.pre_owner_office_phone_memo"
													>({{ item.pre_owner_office_phone_memo }})</template
												>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<template v-if="memType || phoneView">
												{{ item.pre_owner_mobile_1 }}
												<template v-if="item.pre_owner_mobile_1_memo">({{ item.pre_owner_mobile_1_memo }})</template>
											</template>
											<template v-else>
												xxx
												<button type="button" class="btn icon" @click="isPopupShow1 = true">
													<b-icon-search />
												</button>
											</template>
										</td>
									</tr>
								</table>
								<div class="text mt-2">
									<div v-html="item.owner_memo.split('\n').join('<br />')"></div>
								</div>
							</div>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab2 == false }"
									@click="typeTab2 = false"
								>
									작업내역
								</button>
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: typeTab2 == true }"
									@click="typeTab2 = true"
								>
									변경내역
								</button>
							</div>
							<div v-if="typeTab2 == false" class="tab-con">
								<div class="input-top">
									<select v-model="searchOptions.type" class="form-control select">
										<option v-for="c in clientTypeList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.ind_cfg_uid">
											{{ c.name }}
										</option>
									</select>
									<input type="text" class="form-control" v-model="searchOptions.keyword" @keyup.enter="addClientLog" />
								</div>
								<table class="table type-input">
									<colgroup>
										<col width="35%" />
										<col width="65%" />
									</colgroup>
									<tr>
										<th>일시</th>
										<th>구분</th>
										<th>작업자</th>
									</tr>
									<template :key="'clientlog_' + log.client_log_uid" v-for="log in clientLogList">
										<tr>
											<td v-bind:class="{ 'tr-counsel-color': log.counsel_type_name == '지시' }">
												<strong>
													{{ $dateToFormat(log.date, 'MM-DD') }}
													<span style="color: #65af7e">{{ $dateToFormat(log.date, 'ddd') }}</span>
													{{ $dateToFormat(log.date, 'hh:mm') }}
												</strong>
											</td>
											<td v-bind:class="{ 'tr-counsel-color': log.counsel_type_name == '지시' }">
												{{ log.counsel_type_name }}
											</td>
											<td v-bind:class="{ 'tr-counsel-color': log.counsel_type_name == '지시' }">{{ log.mem_name }}</td>
										</tr>
										<tr>
											<td v-bind:class="{ 'tr-counsel-color': log.counsel_type_name == '지시' }" colspan="3">
												{{ log.memo }}
												<button
													v-if="$checkPer(log.reg_mem_uid)"
													type="button"
													class="btn icon red"
													@click="btnClientLogDel(log.client_log_uid)"
												>
													<b-icon-trash />
												</button>
											</td>
										</tr>
									</template>
								</table>
							</div>
							<div v-else class="tab-con">
								<table class="table type-input">
									<colgroup>
										<col width="35%" />
										<col width="65%" />
									</colgroup>
									<tr>
										<th>일시</th>
										<th>구분</th>
										<th>작업자</th>
									</tr>
									<template :key="'mgrlog_' + log.mgr_log_uid" v-for="log in mgrLogList">
										<tr>
											<td>
												<strong>
													{{ $dateToFormat(log.date, 'MM-DD') }}
													<span style="color: #65af7e">{{ $dateToFormat(log.date, 'ddd') }}</span>
													{{ $dateToFormat(log.date, 'hh:mm') }}
												</strong>
											</td>
											<td>{{ $LOG_CHG_INFO[log.sub_type_key] }}</td>
											<td>{{ log.mem_name }}</td>
										</tr>
										<tr>
											<td colspan="3">
												{{ log.memo }}
												<button
													v-if="$checkPer(log.reg_mem_uid)"
													type="button"
													class="btn icon red"
													@click="btnMgrLogDel(log.mgr_log_uid)"
												>
													<b-icon-trash />
												</button>
											</td>
										</tr>
									</template>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow1" class="popup-wrap">
			<div class="dim" @click="isPopupShow1 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					소유자정보확인
					<button type="button" class="btn btn-close" @click="isPopupShow1 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<tr>
							<th>조회사유</th>
							<td>
								<select class="form-control select" v-model="popupData.selectData">
									<option value="" selected>선택</option>
									<option v-for="(i, idx) in $CLIENT_PHONE_REASON" :key="'sdf_' + idx">{{ i }}</option>
								</select>
								<div class="form-wrap" v-if="popupData.selectData == '직접입력'">
									<input class="form-control" type="text" v-model="popupData.data" />
								</div>
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<div class="form-wrap">
									<input
										class="form-control"
										type="password"
										placeholder="비밀번호를 입력하세요."
										v-model="popupData.passwd"
									/>
								</div>
							</td>
						</tr>
					</table>
					<div class="btn-wrap mt-3">
						<button type="button" class="btn btn-md btn-primary" @click="sendPhone">확인</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow2" class="popup-wrap">
			<div class="dim" @click="isPopupShow2 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					첨부파일
					<button type="button" class="btn btn-close" @click="isPopupShow2 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="45%" />
							<col width="45%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>파일명</th>
							<th>다운로드</th>
						</tr>
						<tr v-for="(f, idx) in fileList" :key="'fff_' + f.id">
							<td>{{ idx + 1 }}</td>
							<td>
								{{ f.usr_name }}
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-light" @click="downFile(f.id, f)">
									<b-icon-download />{{ f.org_name }}
								</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow5" class="popup-wrap">
			<div class="dim" @click="isPopupShow5 = false"></div>
			<div class="popup md">
				<div class="popup-tit">
					연결물건합계
					<button type="button" class="btn btn-close" @click="isPopupShow5 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<div class="popup-con">
						<table class="table">
							<colgroup>
								<col width="8%" />
								<col width="12%" />
								<col width="30%" />
								<col width="30%" />
								<col width="20%" />
							</colgroup>
							<tr>
								<th colspan="2">물건명</th>
								<th v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">{{ it.building_name }}</th>
								<th rowspan="2">합계</th>
							</tr>
							<tr>
								<th colspan="2">주소</th>
								<th v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">{{ it.jibun_addr }}</th>
							</tr>
							<tr>
								<th rowspan="11">금액정보</th>
								<th>월임대료</th>
								<td class="txt-c--red" v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.monthly_rent), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue txt-c--red">
									{{ $formatMoney(linkSumObj.sum_monthly_rent, $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
							</tr>
							<tr>
								<th>보증금</th>
								<td class="txt-c--red" v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.deposit), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue txt-c--red">
									{{ $formatMoney(linkSumObj.sum_deposit, $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
							</tr>
							<tr>
								<th>관리비</th>
								<td class="txt-c--red" v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.main_fee), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue txt-c--red">
									{{ $formatMoney(linkSumObj.sum_main_fee, $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
							</tr>
							<tr>
								<th>월고정비</th>
								<td class="txt-c--red" v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.monthly_fixed), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue txt-c--red">
									{{ $formatMoney(linkSumObj.sum_monthly_fixed, $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
							</tr>
							<tr>
								<th>임대면적</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ it.rent_area_m2 }}㎡ <strong>[{{ it.rent_area_py }}평]</strong>
								</td>
								<td class="bg-blue">
									{{ linkSumObj.sum_rent_area_m2.toFixed(2) }}㎡
									<strong>[{{ linkSumObj.sum_rent_area_py.toFixed(2) }}평]</strong>
								</td>
							</tr>
							<tr>
								<th>평당 임대료</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.rent_py_price), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue">
									{{ $formatMoney(linkSumObj.sum_rent_py_price, $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
							</tr>
							<tr>
								<th>전용면적</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ it.net_area_m2 }}㎡ <strong>[{{ it.net_area_py }}평]</strong>
								</td>
								<td class="bg-blue">
									{{ linkSumObj.sum_net_area_m2.toFixed(2) }}㎡
									<strong>[{{ linkSumObj.sum_net_area_py.toFixed(2) }}평]</strong>
								</td>
							</tr>
							<tr>
								<th>전용률</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">{{ it.ex_rate }}%</td>
								<td class="bg-blue">{{ linkSumObj.sum_ex_rate }}%</td>
							</tr>

							<tr>
								<th>토지가격</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.land_price), $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(Number(it.land_size_py_price), $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
								<td class="bg-blue">
									{{ $formatMoney(linkSumObj.sum_land_price, $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(linkSumObj.sum_land_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
							</tr>
							<tr>
								<th>건물가격</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.building_price), $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(Number(it.building_price_py_price), $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
								<td class="bg-blue">
									{{ $formatMoney(linkSumObj.sum_building_price, $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(linkSumObj.sum_building_price_py_price, $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
							</tr>
							<tr>
								<th>연면적평당가격</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.total_size_py_price), $MONEY_FORMAT_TYPE.LOAN) }}
								</td>
								<td class="bg-blue">{{ $formatMoney(linkSumObj.sum_total_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
							</tr>

							<tr>
								<th rowspan="2">토지정보</th>
								<th>대지면적</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ it.land_size_m2 }}㎡ <strong>[{{ it.land_size_p }}평]</strong>
								</td>
								<td class="bg-blue">
									{{ linkSumObj.sum_land_size_m2.toFixed(2) }}㎡
									<strong>[{{ linkSumObj.sum_land_size_p.toFixed(2) }}평]</strong>
								</td>
							</tr>
							<tr>
								<th>공시지가합계</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ $formatMoney(Number(it.public_land_price), $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(Number(it.public_land_price_py_price), $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
								<td class="bg-blue">
									{{ $formatMoney(linkSumObj.sum_public_land_price, $MONEY_FORMAT_TYPE.LOAN) }}(평당
									{{ $formatMoney(linkSumObj.sum_public_land_price_py_price, $MONEY_FORMAT_TYPE.LOAN) }})
								</td>
							</tr>
							<tr>
								<th rowspan="2">건축물정보</th>
								<th>연면적</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ it.total_size_m2 }}㎡ <strong>[{{ it.total_size_p }}평]</strong>
								</td>
								<td class="bg-blue">
									{{ linkSumObj.sum_total_size_m2.toFixed(2) }}㎡
									<strong>[{{ linkSumObj.sum_total_size_p.toFixed(2) }}평]</strong>
								</td>
							</tr>
							<tr>
								<th>건축면적</th>
								<td v-for="(it, idx) in linkSumObj.itemList" :key="'t_1_' + idx">
									{{ it.build_size_m2 }}㎡ <strong>[{{ it.build_size_p }}평]</strong>
								</td>
								<td class="bg-blue">
									{{ linkSumObj.sum_build_size_m2.toFixed(2) }}㎡
									<strong>[{{ linkSumObj.sum_build_size_p.toFixed(2) }}평]</strong>
								</td>
							</tr>
						</table>
						<div class="btn-wrap mt-3">
							<button type="button" class="btn btn-md btn-primary" @click="isPopupShow5 = false">확인</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Zoom, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export default {
	name: 'LeaseMapDetail',
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			bid: null,
			map: null,
			marker: null,
			marker2: null,
			pano: null,
			imgSt: false,
			imgList: [],

			modules: [Zoom, Pagination],
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
			multData: [],

			jinbun_addr: '',

			isPopupShow1: false,
			isPopupShow2: false,
			isPopupShow5: false,
			popupData: {
				selectData: '',
				data: '',
				passwd: '',
			},
			memType: false,
			phoneView: false,

			typeTab1: false,
			typeTab2: false,
			typeTab3: false,

			calcInfo: {
				loan_money: 0,
				loan_rate: 3.5,
				year_loan_money: 0,
				buy_money: 0,
				month_loan_money: 0,
				loan_buy_money_per: 0,
				month_earn_money: 0,
				leverage_earn_rate: 0,
			},

			searchInfo: null,

			fileList: [],

			linkList: [],
			linkSumObj: {
				sum_monthly_rent: 0,
				sum_deposit: 0,
				sum_main_fee: 0,
				sum_monthly_fixed: 0,
				sum_rent_area_m2: 0,
				sum_rent_area_py: 0,
				sum_rent_py_price: 0,
				sum_net_area_m2: 0,
				sum_net_area_py: 0,
				sum_ex_rate: 0,
				sum_land_price: 0,
				sum_land_size_py_price: 0,
				sum_building_price: 0,
				sum_building_price_py_price: 0,
				sum_total_size_py_price: 0,
				sum_land_size_m2: 0,
				sum_land_size_p: 0,
				sum_public_land_price: 0,
				sum_public_land_price_py_price: 0,
				sum_total_size_m2: 0,
				sum_total_size_p: 0,
				sum_build_size_m2: 0,
				sum_build_size_: 0,

				itemList: [],
				item: {},
			},
		};
	},
	mounted() {},
	created() {
		// this.loadMap();
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
	watch: {
		$route(to, form) {
			if (to.path !== form.path) {
				// console.log('변화감지');
				this.$reloadPage();
			}
		},
	},
	methods: {
		init() {
			this.imgSt = false;
			this.imgList = [];
			this.getItem();
			this.getRent();
			this.getFloor();
			this.getMgrLog();
			this.getClientLog();
			this.getClientType();
			this.getView();
			this.getType();
			this.getFileList();
		},
		getFileList() {
			this.$apiGET('/admin/api/up/file2?bid=' + this.bid).then(re => {
				this.fileList = re;
			});
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

			this.item = null;
			if (this.searchInfo.mode == 'total') {
				let idList = this.$store.getters.getPageList[this.$route.query.pageIdx];

				this.bid = idList[this.searchInfo.idx - 1];
				this.$router.push({ path: '/LeaseMapDetail/' + this.bid, query: this.searchInfo });
			} else if (this.searchInfo.mode == 'count') {
				let idList = this.searchInfo.idList.split(',');
				this.bid = idList[this.searchInfo.idx - 1];
				this.init();
				this.$router.push({ path: '/LeaseMapDetail/' + this.bid, query: this.searchInfo });
			} else if (this.searchInfo.mode == 'user_total') {
				this.$apiGET(
					'/admin/api/user/admin/detail/building/count2?' +
						'page=' +
						(this.searchInfo.idx - 1) +
						'&keyword=' +
						this.searchInfo.keyword +
						'&st=' +
						this.searchInfo.st_,
				).then(data => {
					this.bid = data.building_uid;
					this.init();
					this.$router.push({ path: '/LeaseMapDetail/' + this.bid, query: this.searchInfo });
				});
			} else if (this.searchInfo.mode == 'user_count') {
				this.$apiGET('/admin/api/user/admin/detail/count/count2?' + 'page=' + (this.searchInfo.idx - 1)).then(data => {
					this.bid = data.building_uid;
					this.init();
					this.$router.push({ path: '/LeaseMapDetail/' + this.bid, query: this.searchInfo });
				});
			}
		},
		calcLoan() {
			var sell_price = this.item.sell_price; //  매매금액
			var rent_deposit = this.item.ex_sum_rent_deposit; //  보증금합계
			var total_income = this.item.total_income; //  총수익

			console.log(sell_price, rent_deposit, total_income);

			//  연이자액 = 대출금액*대출금리
			this.calcInfo.year_loan_money = Math.round(this.calcInfo.loan_money * (this.calcInfo.loan_rate / 100));

			//  구입자금 = 매매금액 - 보증금 - 대출금액
			this.calcInfo.buy_money = sell_price * 1 - rent_deposit * 1 - this.calcInfo.loan_money * 1;

			//  월이자액 = (대출금액*대출금리)/12
			this.calcInfo.month_loan_money = Math.round(this.calcInfo.year_loan_money / 12);

			//  대부비율 = (대출금액/매매금액)*100
			this.calcInfo.loan_buy_money_per = Math.round((this.calcInfo.loan_money / sell_price) * 100 * 100) / 100;

			//  월순수입 = 총수익 - 월이자액
			this.calcInfo.month_earn_money = total_income - this.calcInfo.month_loan_money;

			// 레버리지수익률 월순수입 * 12 / 구입자금 * 100
			this.calcInfo.leverage_earn_rate =
				Math.round(((this.calcInfo.month_earn_money * 12) / this.calcInfo.buy_money) * 100 * 100) / 100;
		},
		getItem() {
			this.$apiGET('/admin/api/detail/item?bid=' + this.bid + '&isRent=true&isDetail=true').then(data => {
				for (let prop in data) {
					if (data[prop] == null) {
						data[prop] = '';
					}
				}

				this.item = data;
				this.imgSt = false;
				for (let i = 0; i < this.item.imgList.length; i++) {
					if (this.item.imgList[i]) {
						this.imgSt = true;
						this.imgList.push(process.env.VUE_APP_HOST_FRONT + '/users/item/image2?id=' + this.item.imgList[i]);
					}
				}

				if (
					this.item.building_mem_uid == this.$store.getters.getUserInfo.mem_uid ||
					'master' == this.$store.getters.getUserInfo.mem_type
				) {
					this.memType = true;
				}

				this.linkSumObj.item = {
					building_name: data.building_name,
					jibun_addr: data.jibun_addr,

					monthly_rent: data.monthly_rent,
					deposit: data.deposit,
					main_fee: data.main_fee,
					monthly_fixed: data.monthly_fixed,
					rent_area_m2: data.rent_area_m2,
					rent_area_py: data.rent_area_py,
					rent_py_price: data.rent_py_price,
					net_area_m2: data.net_area_m2,
					net_area_py: data.net_area_py,
					ex_rate: data.ex_rate,
					land_price: data.land_price,
					land_size_py_price: data.land_size_py_price,
					building_price: data.building_price,
					building_price_py_price: data.building_price_py_price,
					total_size_py_price: data.total_size_py_price,
					land_size_m2: data.land_size_m2,
					land_size_p: data.land_size_p,
					public_land_price: data.public_land_price,
					public_land_price_py_price: data.public_land_price_py_price,
					total_size_m2: data.total_size_m2,
					total_size_p: data.total_size_p,
					build_size_m2: data.build_size_m2,
					build_size_p: data.build_size_p,
				};

				this.getList();
				this.getLand();

				setTimeout(
					function () {
						this.loadMap();
					}.bind(this),
					250,
				);
			});
		},
		getRent() {
			this.$apiGET('/admin/api/detail/item/rent2?bid=' + this.bid).then(data => {
				this.rentList = data;
			});
		},
		getFloor() {
			this.$apiGET('/admin/api/detail/item/floor2?bid=' + this.bid).then(data => {
				this.floorList = data;
			});
		},
		getLand() {
			this.$apiGET('/admin/api/detail/item/edit/land2?bid=' + this.bid).then(data => {
				let jinbun_addr = '';
				for (let i = 0; i < data.length; i++) {
					if (!data[i].jibun_addr) {
						data.splice(i, 1);
						i--;
					}
				}
				for (let i = 0; i < data.length; i++) {
					if (data[i].jibun_addr) {
						if (i == 0) {
							jinbun_addr += data[i].jibun_addr;
						} else {
							jinbun_addr += ', ' + data[i].jibun_addr;
						}
					}
				}

				if (!jinbun_addr) {
					jinbun_addr = this.item.jibun_addr;
				}

				console.log(jinbun_addr);
				this.jinbun_addr = jinbun_addr;
			});
		},
		getClientLog() {
			this.$apiGET('/admin/api/detail/item/clientlog2?bid=' + this.bid).then(data => {
				this.clientLogList = data;
			});
		},
		addClientLog() {
			this.$apiPOST('/admin/api/client/log/add2', {
				bid: this.bid,
				type: this.searchOptions.type,
				keyword: this.searchOptions.keyword,
				memUid: this.item.building_mem_uid,
			}).then(() => {
				this.searchOptions.keyword = '';
				this.getClientLog();
			});
		},
		getMgrLog() {
			this.$apiGET('/admin/api/detail/item/mgrlog2?bid=' + this.bid).then(data => {
				this.mgrLogList = data;
			});
		},
		getClientType() {
			this.$apiGET('/admin/api/detail/item/clienttype').then(data => {
				this.clientTypeList = data;

				if (this.clientTypeList.length) {
					this.searchOptions.type = this.clientTypeList[0].ind_cfg_uid;
				}
			});
		},
		getView() {
			this.$apiGET('/admin/api/detail/item/view2?bid=' + this.bid).then(data => {
				this.viewObj = data;
			});
		},
		getType() {
			this.$apiGET('/admin/api/setting?part=bd_cate').then(data => {
				const typeList = data;

				this.$apiGET('/admin/api/cate2/get?bid=' + this.bid).then(data => {
					this.multData = [];
					for (let i = 0; i < typeList.length; i++) {
						data.find(d => {
							if (d == typeList[i].ind_cfg_uid.toString()) {
								this.multData.push(typeList[i].cfg_val1);
							}
						});
					}
				});
			});
		},
		loadMap() {
			this.map = new window.naver.maps.Map('map', {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 18,
			});
			this.map.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			this.map.setSize({ width: '504px', height: '500px' });
			this.marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
				map: this.map,
			});

			if (!this.imgSt) {
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
			}
		},
		goEdit() {
			this.$router.push({ name: 'LeaseMapWrite' });
		},
		btnOnPrint() {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('/RentPrintPage?bid=' + this.bid, '', attr);
		},
		btnMgrLogDel(id) {
			this.$apiPOST('/admin/api/mgr/log/del2', {
				id: id,
			}).then(() => {
				this.getMgrLog();
			});
		},
		btnClientLogDel(id) {
			this.$apiPOST('/admin/api/client/log/del2', {
				id: id,
			}).then(() => {
				this.getClientLog();
			});
		},
		sendPhone() {
			if (!this.popupData.selectData) {
				alert('조회사유를 선택하세요.');
				return;
			}

			if (this.popupData.selectData == '직접입력' && !this.popupData.data) {
				alert('조회사유를 입력하세요.');
				return;
			}

			if (!this.popupData.passwd) {
				alert('비밀번호를 입력하세요.');
				return;
			}

			if (this.item.building_uid != this.popupData.passwd) {
				alert('비밀번호가 일치하지 않습니다.');
				return;
			}

			let memo = this.popupData.selectData == '직접입력' ? this.popupData.data : this.popupData.selectData;
			this.$apiPOST('/admin/api/oper/owner/log/add2', { bid: this.bid, memo: memo }).then(() => {
				this.phoneView = true;
				this.isPopupShow1 = false;
			});
		},
		btnOnDetail() {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('/LeaseMapSearch2?isId=' + this.bid + '&st=' + this.item.sell_status, '', attr);
		},
		downFile(id, item) {
			this.$apiDOWN('/admin/api/up/file/item2?id=' + id, item.type).then(re => {
				const url = window.URL.createObjectURL(new Blob([re]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', item.org_name); //or any other extension
				document.body.appendChild(link);
				link.click();
			});
		},
		getList() {
			this.$apiGET('/admin/api/detail/item/b/link2?bid=' + this.bid).then(re => {
				this.linkList = JSON.parse(JSON.stringify(re));

				let itemList = [];

				itemList = itemList.concat(this.linkSumObj.item, JSON.parse(JSON.stringify(re)));

				this.linkSumObj.itemList = [];
				this.linkSumObj.itemList = itemList;

				this.linkSumObj.sum_monthly_rent = 0;
				this.linkSumObj.sum_deposit = 0;
				this.linkSumObj.sum_main_fee = 0;
				this.linkSumObj.sum_monthly_fixed = 0;
				this.linkSumObj.sum_rent_area_m2 = 0;
				this.linkSumObj.sum_rent_area_py = 0;
				this.linkSumObj.sum_rent_py_price = 0;
				this.linkSumObj.sum_net_area_m2 = 0;
				this.linkSumObj.sum_net_area_py = 0;
				this.linkSumObj.sum_ex_rate = 0;
				this.linkSumObj.sum_land_price = 0;
				this.linkSumObj.sum_land_size_py_price = 0;
				this.linkSumObj.sum_building_price = 0;
				this.linkSumObj.sum_building_price_py_price = 0;
				this.linkSumObj.sum_total_size_py_price = 0;
				this.linkSumObj.sum_land_size_m2 = 0;
				this.linkSumObj.sum_land_size_p = 0;
				this.linkSumObj.sum_public_land_price = 0;
				this.linkSumObj.sum_public_land_price_py_price = 0;
				this.linkSumObj.sum_total_size_m2 = 0;
				this.linkSumObj.sum_total_size_p = 0;
				this.linkSumObj.sum_build_size_m2 = 0;
				this.linkSumObj.sum_build_size_p = 0;

				for (let i = 0; i < this.linkSumObj.itemList.length; i++) {
					this.linkSumObj.sum_monthly_rent += Number(this.linkSumObj.itemList[i].monthly_rent);
					this.linkSumObj.sum_deposit += Number(this.linkSumObj.itemList[i].deposit);
					this.linkSumObj.sum_main_fee += Number(this.linkSumObj.itemList[i].main_fee);
					this.linkSumObj.sum_monthly_fixed += Number(this.linkSumObj.itemList[i].monthly_fixed);
					this.linkSumObj.sum_rent_area_m2 += Number(this.linkSumObj.itemList[i].rent_area_m2);
					this.linkSumObj.sum_rent_area_py += Number(this.linkSumObj.itemList[i].rent_area_py);
					this.linkSumObj.sum_rent_py_price += Number(this.linkSumObj.itemList[i].rent_py_price);
					this.linkSumObj.sum_net_area_m2 += Number(this.linkSumObj.itemList[i].net_area_m2);
					this.linkSumObj.sum_net_area_py += Number(this.linkSumObj.itemList[i].net_area_py);
					this.linkSumObj.sum_ex_rate += Number(this.linkSumObj.itemList[i].ex_rate);

					this.linkSumObj.sum_land_price += Number(this.linkSumObj.itemList[i].land_price);
					this.linkSumObj.sum_land_size_py_price += Number(this.linkSumObj.itemList[i].land_size_py_price);
					this.linkSumObj.sum_building_price += Number(this.linkSumObj.itemList[i].building_price);
					this.linkSumObj.sum_building_price_py_price += Number(this.linkSumObj.itemList[i].building_price_py_price);
					this.linkSumObj.sum_total_size_py_price += Number(this.linkSumObj.itemList[i].total_size_py_price);
					this.linkSumObj.sum_land_size_m2 += Number(this.linkSumObj.itemList[i].land_size_m2);
					this.linkSumObj.sum_land_size_p += Number(this.linkSumObj.itemList[i].land_size_p);
					this.linkSumObj.sum_public_land_price += Number(this.linkSumObj.itemList[i].public_land_price);
					this.linkSumObj.sum_public_land_price_py_price += Number(
						this.linkSumObj.itemList[i].public_land_price_py_price,
					);
					this.linkSumObj.sum_total_size_m2 += Number(this.linkSumObj.itemList[i].total_size_m2);
					this.linkSumObj.sum_total_size_p += Number(this.linkSumObj.itemList[i].total_size_p);
					this.linkSumObj.sum_build_size_m2 += Number(this.linkSumObj.itemList[i].build_size_m2);
					this.linkSumObj.sum_build_size_p += Number(this.linkSumObj.itemList[i].build_size_p);
				}
			});
		},
		btnOnDetail2(id) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('/LeaseMapDetail/' + id, '', attr);
		},
	},
};
</script>

<style lang="scss"></style>
