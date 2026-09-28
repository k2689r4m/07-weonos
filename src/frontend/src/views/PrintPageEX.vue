<template>
	<div class="content">
		<div v-if="item" class="print-wrap">
			<div class="print-left">
				<!-- <select class="form-control select sm mb-3">
					<option>물건</option>
				</select> -->
				<div class="section-tit">
					슬라이드 선택/제외
					<button type="button" class="btn btn-xxsm btn-secondary right" @click="btnOnEx">매매사례</button>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opAll" @change="setAllCheck(0)" />
									<span class="checkbox"></span>
								</label>
							</th>
							<th>구분</th>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[0].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>INTRO</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[19].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>목차</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[1].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>물건개요</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[2].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>임대정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[3].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축물정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[4].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축 내/외부 사진</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[5].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>지도</td>
						</tr>
					</table>
					<br />
					<table class="table">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opAll2" @change="setAllCheck(1)" />
									<span class="checkbox"></span>
								</label>
							</th>
							<th>사례</th>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[6].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>인근매각사례 TYPE A</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[7].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>인근매각사례 TYPE B</td>
						</tr>
						<!-- <tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[8].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>상세</td>
						</tr> -->
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[9].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>인근 VIEW</td>
						</tr>
						<!-- <tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[10].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>주변 사진 TYPE 2</td>
						</tr> -->

						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[11].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>현재 수익률</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[12].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>레버리지 수익률 및 필요자금 산출</td>
						</tr>
						<!-- <tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[13].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>자금조달계획</td>
						</tr> -->
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[13].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>예상임대수익 및 MD구성</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[14].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>대출 비중에 따른 필요자금 분석</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[15].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>세전/세후 매각차익 분석(법인 기준)</td>
						</tr>

						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[16].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>
								추가 사진 - 1
								<input type="file" class="p-0 m-l--2" accept="image/*" @change="fileFile2($event, 0)" />
							</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[17].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>
								추가 사진 - 2
								<input type="file" class="p-0 m-l--2" accept="image/*" @change="fileFile2($event, 1)" />
							</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[18].st" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>
								추가 사진 - 3
								<input type="file" class="p-0 m-l--2" accept="image/*" @change="fileFile2($event, 2)" />
							</td>
						</tr>
					</table>
				</div>
				<div class="section-tit mt-4">사진 선택/제외</div>
				<ul class="table-list">
					<li class="table-list--item" v-for="(op, idx) in item.imgObjList" :key="'opp_' + idx">
						<div class="check">
							<label class="input-checkbox">
								<input type="checkbox" v-model="op.st" @change="updateId" :disabled="!opList[4].st" />
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
			<div class="print-right" id="main_print">
				<!-- 1. 인트로 -->
				<div v-if="opList[0].st" id="capture_1" name="capture" class="print-section cover type2">
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

					<div class="bottom-text">
						<h3>Disclaimers</h3>
						본매입제안서의목적은해당부동산에대한이해를높이고자제공되는것으로서,
						본소개서이용자가투자의사결정에대한근거자료로이용될목적으로작성된것은아닙니다.
						따라서이러한목적이외의어떠한목적으로도이용되어서는안됩니다.
						본매입제안서는법적으로제출되거나등록되지아니하였으며, 어떠한법률에의하여도승인된것이아닙니다.<br />
						The purpose of this leasing flyer is to enhance understanding of the property, and it is not intended to
						serve as a basis for investment decisions by the recipient. Therefore, it shall not be used for any purpose
						other than this purpose. This leasing flyer has not been legally submitted or registered, nor has it been
						approved by any law.<br />
					</div>
				</div>

				<div v-if="opList[19].st" id="capture_19" name="capture" class="print-section">
					<div class="print-tit">목차</div>
					<ol class="list index-list">
						<li v-for="(i, idx) in indexList" :key="'index__' + idx" class="list-item">
							<span class="num">{{ i.idx }}</span> {{ i.title }}
						</li>
					</ol>
				</div>

				<!-- 2. 물건개요 -->
				<div v-if="opList[1].st" id="capture_2" name="capture" class="print-section flex">
					<div class="print-tit">
						<template v-if="opList[1].edit">
							<input
								class=""
								type="text"
								v-model="opList[1].title"
								@keyup.enter="(opList[1].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[1].edit = true">
								{{ opList[1].title }}
							</div>
						</template>
					</div>
					<div class="left">
						<div class="bottom">
							<div class="sub">{{ item.building_name }}</div>
							<div class="table-wrap">
								<table class="table text-left type-input" style="font-size: 10px">
									<colgroup>
										<col width="30%" />
										<col width="70%" />
									</colgroup>
									<tr>
										<th>소재지</th>
										<td>{{ item.jibun_addr }}</td>
									</tr>

									<tr>
										<th class="txt-c--red" style="font-size: 13px">매매금액</th>
										<td class="txt-c--red" style="font-size: 13px">
											{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}
										</td>
									</tr>
									<tr>
										<th>건물가격</th>
										<td>
											<span class="float-start p-0">{{
												$formatMoney(item.building_price, $MONEY_FORMAT_TYPE.LOAN)
											}}</span>
											<span class="float-end p-0">
												[평당:{{ $formatMoney(item.building_price_py_price, $MONEY_FORMAT_TYPE.LOAN) }}]
											</span>
										</td>
									</tr>

									<tr>
										<th class="txt-c--red">대지면적</th>
										<td class="txt-c--red">
											<span class="float-start p-0"> {{ item.land_size_m2 }}㎡({{ item.land_size_p }}평) </span>
											<span class="float-end p-0">
												[평당:{{ $formatMoney(item.land_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }}]
											</span>
										</td>
									</tr>
									<tr>
										<th>공시지가</th>
										<td>
											<span class="float-start p-0">
												{{ $formatMoney(item.public_land_price, $MONEY_FORMAT_TYPE.LOAN) }}
											</span>
											<span class="float-end p-0">
												[평당:{{ $formatMoney(item.public_land_price_py_price, $MONEY_FORMAT_TYPE.LOAN) }}]
											</span>
										</td>
									</tr>
									<tr>
										<th>용도지역</th>
										<td>{{ item.cfg_val1 }}</td>
									</tr>
									<tr>
										<th class="txt-c--red">준공년도 / 리모델링</th>
										<td class="txt-c--red">
											{{ $dateKorFormat(item.build_date) + ' / ' + $dateKorFormat(item.remodel_date) }}
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">연면적</th>
										<td class="txt-c--red">
											<span class="float-start p-0">{{ item.total_size_m2 }}㎡({{ item.total_size_p }}평)</span>
											<span class="float-end p-0">
												[평당:{{ $formatMoney(item.total_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }}]
											</span>
										</td>
									</tr>
									<tr>
										<th>건축면적</th>
										<td>
											<span class="float-start p-0">{{ item.build_size_m2 }}㎡({{ item.build_size_p }}평)</span>
											<span class="float-end p-0">
												[평당:{{
													$formatMoney(Math.floor(item.sell_price / item.build_size_p), $MONEY_FORMAT_TYPE.LOAN)
												}}]
											</span>
										</td>
									</tr>
									<tr>
										<th>건페율 / 용적률</th>
										<td>{{ item.bl_ratio }}%/{{ item.fa_ratio }}%</td>
									</tr>
									<tr>
										<th class="txt-c--red">규모</th>
										<td class="txt-c--red">{{ $getFloorString(item.floor_cnt_B, item.floor_cnt_F) }}</td>
									</tr>
									<tr>
										<th>주용도</th>
										<td>{{ item.main_purpose }}</td>
									</tr>
									<tr>
										<th class="txt-c--red">보증금 / 월세</th>
										<td class="txt-c--red">
											{{ $formatMoney(item.ex_sum_rent_deposit, $MONEY_FORMAT_TYPE.LOAN) }} /
											{{ $formatMoney(item.ex_sum_rent_money, $MONEY_FORMAT_TYPE.LOAN) }}
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">수익률</th>
										<td class="txt-c--red">{{ item.total_income_rate }}%</td>
									</tr>
									<tr>
										<th>엘리베이터</th>
										<td>{{ item.ev_cnt }}대</td>
									</tr>
									<tr>
										<th>주차대수</th>
										<td>
											<template v-if="item.park_type_name">{{ item.park_type_name }} /</template> 법정 :
											{{ item.park_cnt_law }}대
										</td>
									</tr>
								</table>
							</div>
							<div class="section-tit mt-4" style="margin-bottom: 0px">특징</div>
							<ul class="dot-list box-line">
								<div v-html="item.memo.split('\n').join('<br />')"></div>
								<!-- {{
									item.memo
								}} -->
								<!-- <div class="text-pre" v-html="postList[isId].memo.replace('\n', '<br />')"></div> -->
							</ul>
						</div>
					</div>
					<div class="right ms-2">
						<div class="img-wrap">
							<img :src="item.img" alt="" style="width: 560px; height: 690px" />
						</div>
					</div>
				</div>
				<!-- 3. 임대정보 -->
				<div v-if="opList[2].st" id="capture_3" name="capture" class="print-section">
					<div class="print-tit">
						<template v-if="opList[2].edit">
							<input
								class=""
								type="text"
								v-model="opList[2].title"
								@keyup.enter="(opList[2].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[2].edit = true">
								{{ opList[2].title }}
							</div>
						</template>
					</div>
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
									<th>평당임대료</th>
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
									<td>{{ $filters.money(rent.rent_ni) }}</td>
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
									<td class="bg-blue">{{ $filters.money(totalData.rent_ni) }}</td>
									<td class="bg-blue"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="table-text">※ 임대차계약서 상 임대면적의 총합과 건축물대장 상 연면적이 다소 차이가 있음</div>
				</div>
				<!-- 4. 건축물정보 -->
				<div v-if="opList[3].st" id="capture_4" name="capture" class="print-section">
					<div class="print-tit">
						<template v-if="opList[3].edit">
							<input
								class=""
								type="text"
								v-model="opList[3].title"
								@keyup.enter="(opList[3].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[3].edit = true">
								{{ opList[3].title }}
							</div>
						</template>
					</div>
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
				<template v-if="opList[4].st">
					<div
						v-for="(pic, idx) in item.imgObj"
						:id="'picture_' + idx"
						:key="'picture_' + idx"
						class="print-section flex"
						name="capture"
					>
						<div class="print-tit">
							<template v-if="opList[4].edit">
								<input
									class=""
									type="text"
									v-model="opList[4].title"
									@keyup.enter="(opList[4].edit = false), updateIndex()"
								/>
							</template>
							<template v-else>
								<div @click="opList[4].edit = true">
									{{ opList[4].title }}
								</div>
							</template>
						</div>
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
				<div v-show="opList[5].st" id="capture_5" name="capture" class="print-section flex">
					<div class="left">
						<div class="print-tit">
							<template v-if="opList[5].edit">
								<input
									class=""
									type="text"
									v-model="opList[5].title"
									@keyup.enter="(opList[5].edit = false), updateIndex()"
								/>
							</template>
							<template v-else>
								<div @click="opList[5].edit = true">
									{{ opList[5].title }}
								</div>
							</template>
						</div>
						<div id="map_1"></div>
					</div>
					<div class="right">
						<div id="map_2"></div>
					</div>
				</div>

				<!-- 1/11 추가 -->
				<!-- 인근매각사례 A -->
				<div v-show="opList[6].st" class="print-section" id="capture_6" name="capture">
					<div class="print-tit">
						<template v-if="opList[6].edit">
							<input
								class=""
								type="text"
								v-model="opList[6].title"
								@keyup.enter="(opList[6].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[6].edit = true">
								{{ opList[6].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop($event, 'ex_1')" id="con_ex_1">
						<div class="map-wrap" style="height: 100%" id="map_ex_1"></div>
						<div class="table-wrap">
							<table class="table" v-for="(i, idx) in linkDataList.slice(0, 4)" :key="'a_1_' + i.building_uid">
								<colgroup>
									<col width="100px" />
									<col width="auto" />
									<col width="auto" />
								</colgroup>
								<!-- <tr>
								</tr> -->
								<tr>
									<template v-if="idx == 0">
										<td rowspan="6" class="p-0">
											<img :src="i.veiwSrc[0]" @click="btnOnDetail(i.building_uid, 'count')" />
										</td>
									</template>
									<template v-else>
										<td rowspan="7" class="p-0">
											<img :src="i.veiwSrc[0]" @click="btnOnDetail(i.building_uid, 'count')" />
										</td>
									</template>
								</tr>
								<tr>
									<th colspan="2">
										<template v-if="idx == 0">
											<strong class="txt-c--red">매매진행 물건</strong>
										</template>
										<template v-else>
											{{ '매각사례 ' + idx }}
										</template>
										<!-- {{ idx == 0 ? '매매진행 물건' : '매각사례 ' + idx }} -->
									</th>
								</tr>
								<tr>
									<th>주소</th>
									<td>{{ i.jibun_addr }}</td>
								</tr>
								<tr>
									<th>매매금액</th>
									<td>{{ $formatMoney(i.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr>
									<th>토지평당</th>
									<td class="txt-strong">
										{{ $formatMoney(i.land_size_py_price, $MONEY_FORMAT_TYPE.TAX) }}
									</td>
								</tr>
								<tr>
									<th>용도지역</th>
									<td>{{ i.cfg_val1 }}</td>
								</tr>
								<tr v-if="idx != 0">
									<th>거래일</th>
									<td @click="exData[50].st1 = true">
										<template v-if="exData[50].st1">
											<input
												class="p-0 border"
												type="text"
												v-model="exData[50].val1[idx]"
												@keyup.enter="exData[50].st1 = false"
											/>
										</template>
										<template v-else> {{ exData[50].val1[idx] }}</template>
									</td>
								</tr>
							</table>
						</div>
						<div v-for="(i, idx) in exMap['ex_1'].imgData" :key="'ma_1_' + i.building_uid">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_1')"
								:ref="'grap_ex_1_' + idx"
								v-show="i.imgIdx != null"
							>
								<span class="img-title">{{ idx == 0 ? 'M' : idx }} : {{ $IMG_NAME[i.imgIdx] }}</span>
								<img class="img" :src="i.veiwSrc[i.imgIdx]" alt="" />
								<button type="button" class="img-delete" @click="i.imgIdx = null">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_1'].imgData"
							:key="'line__' + i.id"
							:id="'line_ex_1' + idx"
							v-show="i.imgIdx != null"
						></div>
					</div>
				</div>

				<!-- 인근매각사례 A -->
				<div v-show="opList[6].st && 4 < linkDataList.length" class="print-section" id="capture_6_ex" name="capture">
					<div class="print-tit">
						<template v-if="opList[6].edit">
							<input
								class=""
								type="text"
								v-model="opList[6].title"
								@keyup.enter="(opList[6].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[6].edit = true">
								{{ opList[6].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop($event, 'ex_1_ex')" id="con_ex_1_ex">
						<div class="map-wrap" style="height: 100%" id="map_ex_1_ex"></div>
						<div class="table-wrap">
							<table class="table" v-for="(i, idx) in linkDataList.slice(4)" :key="'a_1_' + i.building_uid">
								<colgroup>
									<col width="100px" />
									<col width="auto" />
									<col width="auto" />
								</colgroup>
								<tr>
									<template v-if="idx == 4">
										<td rowspan="6" class="p-0">
											<img :src="i.veiwSrc[0]" @click="btnOnDetail(i.building_uid, 'count')" />
										</td>
									</template>
									<template v-else>
										<td rowspan="7" class="p-0">
											<img :src="i.veiwSrc[0]" @click="btnOnDetail(i.building_uid, 'count')" />
										</td>
									</template>
								</tr>
								<tr>
									<th colspan="2">{{ '매각사례 ' + (idx + 4) }}</th>
								</tr>
								<tr>
									<th>주소</th>
									<td>{{ i.jibun_addr }}</td>
								</tr>
								<tr>
									<th>매매금액</th>
									<td>{{ $formatMoney(i.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}</td>
								</tr>
								<tr class="txt-strong">
									<th>토지평당</th>
									<td>{{ $formatMoney(i.land_size_py_price, $MONEY_FORMAT_TYPE.TAX) }}</td>
								</tr>
								<tr>
									<th>용도지역</th>
									<td>{{ i.cfg_val1 }}</td>
								</tr>
								<tr v-if="idx != 4">
									<th>거래일</th>
									<td @click="exData[50].st1 = true">
										<template v-if="exData[50].st1">
											<input
												class="p-0 border"
												type="text"
												v-model="exData[50].val1[idx + 4]"
												@keyup.enter="exData[50].st1 = false"
											/>
										</template>
										<template v-else> {{ exData[50].val1[idx + 4] }}</template>
									</td>
								</tr>
							</table>
						</div>
						<div v-for="(i, idx) in exMap['ex_1_ex'].imgData" :key="'ma_2_' + i.idx">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_1_ex')"
								:ref="'grap_ex_1_ex_' + idx"
								v-show="i.imgIdx != null"
							>
								<span class="img-title">{{ idx == 0 ? 'M' : idx }} : {{ $IMG_NAME[i.imgIdx] }}</span>
								<img class="img" :src="i.veiwSrc[i.imgIdx]" alt="" />
								<button type="button" class="img-delete" @click="i.imgIdx = null">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_1_ex'].imgData"
							:key="'line__' + i.id"
							:id="'line_ex_1_ex' + idx"
							v-show="i.imgIdx != null"
						></div>
					</div>
				</div>

				<!-- 인근매각사례 B -->
				<div v-show="opList[7].st" class="print-section" id="capture_7" name="capture">
					<div class="print-tit">
						<template v-if="opList[7].edit">
							<input
								class=""
								type="text"
								v-model="opList[7].title"
								@keyup.enter="(opList[7].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[7].edit = true">
								{{ opList[7].title }}
							</div>
						</template>
					</div>
					<div class="top">
						<div class="left" style="flex: 2" @dragover.prevent @drop="handleDrop($event, 'ex_2')" id="con_ex_2">
							<div class="map-wrap m-b--2" style="width: 100%; height: 430px; background: #ccc" id="map_ex_2">지도</div>

							<div v-for="(i, idx) in exMap['ex_2'].imgData" :key="'ma_3_' + i.idx">
								<div
									class="img-wrap"
									:style="{
										top: i.top + 'px',
										right: i.right + 'px',
										position: 'absolute',
									}"
									:draggable="true"
									@dragstart="handleDragStart($event, idx, 'ex_2')"
									:ref="'grap_ex_2_' + idx"
									v-show="i.imgIdx != null"
								>
									<span class="img-title">{{ idx == 0 ? 'M' : idx }} : {{ $IMG_NAME[i.imgIdx] }}</span>
									<img class="img" :src="i.veiwSrc[i.imgIdx]" alt="" />
									<button type="button" class="img-delete" @click="i.imgIdx = null">&times;</button>
								</div>
							</div>
							<div
								style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
								v-for="(i, idx) in exMap['ex_2'].imgData"
								:key="'line__' + i.id"
								:id="'line_ex_2' + idx"
								v-show="i.imgIdx != null"
							></div>
						</div>
						<div class="right ms-2" style="flex: 1">
							<div class="textarea-wrap">
								<template v-if="opList[7].data.moreST">
									<textarea
										class="textarea border-red"
										rows="30"
										v-model="opList[7].data.more"
										@keyup.esc="opList[7].data.moreST = false"
									></textarea>
								</template>
								<template v-else>
									<div
										v-html="opList[7].data.more.split('\n').join('<br />')"
										@click="opList[7].data.moreST = true"
										class="textarea type-text"
									></div>
								</template>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="table-wrap">
							<table class="table sm">
								<thead>
									<tr>
										<th></th>
										<th v-for="(i, idx) in linkDataList" :key="'a_1_' + i.idx">
											<!-- {{ idx == 0 ? '본건물' : '주소' + idx }} -->

											<template v-if="idx == 0">
												<strong class="txt-c--red">매매진행 물건</strong>
											</template>
											<template v-else>
												{{ '매각사례 ' + idx }}
											</template>
										</th>
										<!-- <th>주소1</th>
										<th>주소2</th>
										<th>주소3</th>
										<th>주소4</th>
										<th>주소5</th>
										<th>주소6</th> -->
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>주소</th>
										<td v-for="i in linkDataList" :key="'a_11_' + i.building_uid">
											{{ i.jibun_addr }}
										</td>
									</tr>
									<tr>
										<th>매매금액</th>
										<td v-for="i in linkDataList" :key="'a_2_' + i.building_uid">
											{{ $formatMoney(i.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}
										</td>
									</tr>
									<tr>
										<th>대지면적</th>
										<td v-for="i in linkDataList" :key="'a_3_' + i.building_uid">
											{{ i.land_size_m2 }}㎡({{ i.land_size_p }}평)
										</td>
									</tr>
									<tr class="txt-strong">
										<th>토지평당</th>
										<td v-for="i in linkDataList" :key="'a_4_' + i.building_uid">
											{{ $formatMoney(i.land_size_py_price, $MONEY_FORMAT_TYPE.TAX) }}
										</td>
									</tr>
									<tr>
										<th>준공연도</th>
										<td v-for="i in linkDataList" :key="'a_5_' + i.building_uid">{{ $dateKorFormat(i.build_date) }}</td>
									</tr>
									<tr>
										<th>용도지역</th>
										<td v-for="i in linkDataList" :key="'a_6_' + i.building_uid">{{ i.cfg_val1 }}</td>
									</tr>
									<tr>
										<th>거래일</th>
										<td v-for="(i, idx) in linkDataList" :key="'a_7_' + i.building_uid" @click="exData[50].st2 = true">
											<template v-if="exData[50].st2">
												<input
													class="p-0 border"
													type="text"
													v-model="exData[50].val2[idx]"
													@keyup.enter="exData[50].st2 = false"
												/>
											</template>
											<template v-else> {{ exData[50].val2[idx] }}</template>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<!-- 인근 VIEW -->
				<div v-show="opList[8].st" class="print-section" id="capture_8" name="capture">
					<div class="print-tit">
						<template v-if="opList[8].edit">
							<input
								class=""
								type="text"
								v-model="opList[8].title"
								@keyup.enter="(opList[8].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[8].edit = true">
								{{ opList[8].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop($event, 'ex_3')" id="con_ex_3">
						<!-- {{ item.imgObj[0][0].img }} -->
						<!-- <div class="map-wrap" style="background-color: #ccc; height: 100%" id="map_ex_1"></div> -->
						<div class="map-wrap" style="height: 100%" id="map_ex_3"></div>
						<div class="table-wrap">
							<table class="table mb-8" v-for="(i, idx) in linkDataList.slice(0, 6)" :key="'b_2_' + i.building_uid">
								<tr>
									<th>{{ idx == 0 ? '본건물' : '주소' + idx }}</th>
									<td>{{ i.jibun_addr }}</td>
								</tr>
								<tr>
									<th>대지면적</th>
									<td>{{ i.land_size_p }}평</td>
								</tr>
								<tr>
									<th>거래시점</th>
									<td>{{ $dateKorFormat(i.done_date_time) }}</td>
								</tr>
								<tr>
									<th>매매가</th>
									<td>
										{{ $formatMoney(i.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}
										<strong class="txt-c--red"
											>(평당 약 {{ $formatMoney(i.land_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }})</strong
										>
									</td>
								</tr>
							</table>
						</div>
						<div v-for="(i, idx) in exMap['ex_3'].imgData" :key="'ma_4_' + i.building_uid">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_3')"
								:ref="'grap_ex_3_' + idx"
								v-show="i.imgIdx != null"
							>
								<span class="img-title">{{ idx == 0 ? 'M' : idx }} : {{ $IMG_NAME[i.imgIdx] }}</span>
								<img class="img" :src="i.veiwSrc[i.imgIdx]" alt="" />
								<button type="button" class="img-delete" @click="i.imgIdx = null">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_3'].imgData"
							:key="'line__' + i.id"
							:id="'line_ex_3' + idx"
							v-show="i.imgIdx != null"
						></div>
					</div>
				</div>

				<!-- 인근 VIEW -->
				<div v-show="opList[8].st && 6 < linkDataList.length" class="print-section" id="capture_8_ex" name="capture">
					<div class="print-tit">
						<template v-if="opList[8].edit">
							<input
								class=""
								type="text"
								v-model="opList[8].title"
								@keyup.enter="(opList[8].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[8].edit = true">
								{{ opList[8].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop($event, 'ex_3_ex')" id="con_ex_3_ex">
						<!-- {{ item.imgObj[0][0].img }} -->
						<!-- <div class="map-wrap" style="background-color: #ccc; height: 100%" id="map_ex_1"></div> -->
						<div class="map-wrap" style="height: 100%" id="map_ex_3_ex"></div>
						<div class="table-wrap">
							<table class="table mb-8" v-for="(i, idx) in linkDataList.slice(6)" :key="'b_2_' + i.building_uid">
								<tr>
									<th>{{ idx == 0 ? '본건물' : '주소' + idx }}</th>
									<td>{{ i.jibun_addr }}</td>
								</tr>
								<tr>
									<th>대지면적</th>
									<td>{{ i.land_size_p }}평</td>
								</tr>
								<tr>
									<th>거래시점</th>
									<td>{{ $dateKorFormat(i.done_date_time) }}</td>
								</tr>
								<tr>
									<th>매매가</th>
									<td>
										{{ $formatMoney(i.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}
										<strong class="txt-c--red"
											>(평당 약 {{ $formatMoney(i.land_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }})</strong
										>
									</td>
								</tr>
							</table>
						</div>
						<div v-for="(i, idx) in exMap['ex_3_ex'].imgData" :key="'ma_5_' + i.building_uid">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_3_ex')"
								:ref="'grap_ex_3_ex_' + idx"
								v-show="i.imgIdx != null"
							>
								<span class="img-title">{{ idx == 0 ? 'M' : idx }} : {{ $IMG_NAME[i.imgIdx] }}</span>
								<img class="img" :src="i.veiwSrc[i.imgIdx]" alt="" />
								<button type="button" class="img-delete" @click="i.imgIdx = null">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_3_ex'].imgData"
							:key="'line__' + i.id"
							:id="'line_ex_3_ex' + idx"
							v-show="i.imgIdx != null"
						></div>
					</div>
				</div>

				<!-- 인근 VIEW2 -->
				<div v-show="opList[9].st" class="print-section" id="capture_9" name="capture">
					<div class="print-tit">
						<template v-if="opList[9].edit">
							<input
								class=""
								type="text"
								v-model="opList[9].title"
								@keyup.enter="(opList[9].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[9].edit = true">
								{{ opList[9].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop2($event, 'ex_4')" id="con_ex_4">
						<div class="map-wrap" style="height: 100%" id="map_ex_4"></div>
						<div v-for="(i, idx) in exMap['ex_4'].imgData2" :key="'ma_6_' + i.building_uid">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_4')"
								:ref="'grap_ex_4_' + idx"
							>
								<span class="img-title">{{ i.title }}</span>
								<img class="img" :src="i.imgSrc" alt="" />
								<button type="button" class="img-delete" @click="imgDelSave(exMap['ex_4'], idx)">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_4'].imgData2"
							:key="'line__' + i.id"
							:id="'line_ex_4' + idx"
						></div>
					</div>
				</div>

				<!-- 인근 VIEW2 -->
				<div v-show="opList[10].st" class="print-section" id="capture_10" name="capture">
					<div class="print-tit">
						<template v-if="opList[10].edit">
							<input
								class=""
								type="text"
								v-model="opList[10].title"
								@keyup.enter="(opList[10].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[10].edit = true">
								{{ opList[10].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap type2" @dragover.prevent @drop="handleDrop2($event, 'ex_5')" id="con_ex_5">
						<div class="map-wrap" style="height: 100%" id="map_ex_5"></div>
						<div class="table-wrap">
							<table class="table" v-for="(i, idx) in exMap['ex_5'].imgData2" :key="'ma_7_' + idx">
								<colgroup>
									<col width="100px" />
									<col width="auto" />
									<col width="auto" />
								</colgroup>
								<tr>
									<th>번호</th>
									<td>{{ idx + 1 }}</td>
								</tr>
								<tr>
									<th>제목</th>
									<td>{{ i.title }}</td>
								</tr>
								<tr>
									<th>내용</th>
									<td>
										<v-html v-model="i.more"> </v-html>
									</td>
								</tr>
							</table>
						</div>
						<div v-for="(i, idx) in exMap['ex_5'].imgData2" :key="'ma_7_' + i.building_uid">
							<div
								class="img-wrap"
								:style="{
									top: i.top + 'px',
									right: i.right + 'px',
									position: 'absolute',
								}"
								:draggable="true"
								@dragstart="handleDragStart($event, idx, 'ex_5')"
								:ref="'grap_ex_5_' + idx"
							>
								<span class="img-title">{{ i.title }}</span>
								<img class="img" :src="i.imgSrc" alt="" />
								<button type="button" class="img-delete" @click="imgDelSave(exMap['ex_5'], idx)">&times;</button>
							</div>
						</div>
						<div
							style="position: absolute; background: red; height: 1.5px; transform-origin: left center"
							v-for="(i, idx) in exMap['ex_5'].imgData2"
							:key="'line__' + i.id"
							:id="'line_ex_5' + idx"
						></div>
					</div>
				</div>

				<!-- 현재 수익률 -->
				<div
					v-if="opList[11].st"
					class="print-section"
					id="capture_11"
					name="capture"
					style="display: flex; flex-direction: column"
				>
					<div class="print-tit">
						<template v-if="opList[11].edit">
							<input
								class=""
								type="text"
								v-model="opList[11].title"
								@keyup.enter="(opList[11].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[11].edit = true">
								{{ opList[11].title }}
							</div>
						</template>
					</div>
					<div class="top" style="flex: 1">
						<div class="layer-wrap type2" style="height: 100%">
							<div style="flex: 1; margin-right: 20px">
								<div class="table-tit right">
									<span class="unit">[단위: 만원]</span>
								</div>
								<div class="table-wrap" style="margin-right: 10px">
									<table class="table">
										<tr>
											<th>층</th>
											<th>면적(평)</th>
											<th>용도</th>
											<th>보증금</th>
											<th>임대료</th>
											<th>관리비</th>
											<th>NI</th>
										</tr>
										<tr v-for="(r, idx) in rentList" :key="'rrr_' + idx">
											<td>{{ r.rent_floor }}</td>
											<td>
												{{
													Number(r.rent_size_p).toLocaleString('en-US', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})
												}}
											</td>
											<td>{{ r.rent_usage }}</td>
											<td>{{ Number(r.rent_deposit).toLocaleString() }}</td>
											<td>{{ Number(r.rent_money).toLocaleString() }}</td>
											<td>{{ r.mgr_fee }}</td>
											<td>{{ r.rent_ni }}</td>
										</tr>
										<tr class="txt-strong">
											<td>합계</td>
											<td>
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_size_p) ?? 0), 0),
													).toLocaleString('en-US', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})
												}}
											</td>
											<td></td>
											<td>
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_deposit) ?? 0), 0),
													).toLocaleString()
												}}
											</td>
											<td>
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
													).toLocaleString()
												}}
											</td>
											<td>
												{{
													Number(rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)).toLocaleString()
												}}
											</td>
											<td>
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_ni) ?? 0), 0) / rentList.length,
													).toLocaleString('en-US', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})
												}}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div style="flex: 1">
								<div class="table-tit right">
									<span class="unit">[단위: 만원]</span>
								</div>
								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th colspan="2">No</th>
											<th>금액</th>
											<th>비고</th>
										</tr>
										<tr>
											<td colspan="2">① 매매금액</td>
											<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
											<td @click="exData[0].st2 = true">
												<template v-if="exData[0].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[0].val2"
														@keyup.enter="exData[0].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[0].val2 }}
												</template>
											</td>
										</tr>
										<!-- <tr>
											<td colspan="2">② 건축 비용</td>
											<td class="txt-right" @click="exData[1].st1 = true">
												<template v-if="exData[1].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[1].val1"
														@keyup.enter="exData[1].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[1].val1).toLocaleString() }}
												</template>
											</td>
											<td @click="exData[1].st2 = true">
												<template v-if="exData[1].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[1].val2"
														@keyup.enter="exData[1].st2 = false"
													/>
												</template>
												<template v-else>{{ exData[1].val2 }}</template>
											</td>
										</tr> -->
										<!-- <tr>
											<td colspan="2">③ 총 투자금액</td>
											<td class="txt-right">
												{{ Number(exData[1].val1 + item.sell_price).toLocaleString() }}
											</td>
											<td @click="exData[2].st2 = true">
												<template v-if="exData[2].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[2].val2"
														@keyup.enter="exData[2].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[2].val2 }}
												</template>
											</td>
										</tr> -->
										<tr>
											<td colspan="2">② 보증금</td>
											<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
											<td @click="exData[3].st2 = true">
												<template v-if="exData[3].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[3].val2"
														@keyup.enter="exData[3].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[3].val2 }}
												</template>
											</td>
										</tr>
										<!-- <tr>
											<td colspan="2">⑤ 대출원금</td>
											<td class="txt-right" @click="exData[4].st1 = true">
												<template v-if="exData[4].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[4].val1"
														@keyup.enter="exData[4].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[4].val1).toLocaleString() }}
												</template>
											</td>
											<td @click="exData[4].st2 = true">
												<template v-if="exData[4].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[4].val2"
														@keyup.enter="exData[4].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[4].val2 }}
												</template>
											</td>
										</tr> -->
										<tr>
											<td colspan="2">③ 매입금액</td>
											<td class="txt-right">
												{{
													Number(
														exData[1].val1 + item.sell_price - item.ex_sum_rent_deposit - exData[4].val1,
													).toLocaleString()
												}}
											</td>
											<td @click="exData[5].st2 = true">
												<template v-if="exData[5].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[5].val2"
														@keyup.enter="exData[5].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[5].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<th rowspan="4">월수익</th>
											<td>④ 임대료</td>
											<td class="txt-right">
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
													).toLocaleString()
												}}
											</td>
											<td @click="exData[6].st2 = true">
												<template v-if="exData[6].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[6].val2"
														@keyup.enter="exData[6].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[6].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td>⑤ 관리비</td>
											<td class="txt-right">
												{{
													Number(rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)).toLocaleString()
												}}
											</td>
											<td @click="exData[7].st2 = true">
												<template v-if="exData[7].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[7].val2"
														@keyup.enter="exData[7].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[7].val2 }}
												</template>
											</td>
										</tr>

										<tr>
											<td>⑥ 관리비 지출</td>
											<td class="txt-right">
												{{ Number(item.ex_sum_mgr_fee_out).toLocaleString() }}
											</td>
											<td @click="exData[8].st1 = true">
												<template v-if="exData[8].st1">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[8].val1"
														@keyup.enter="exData[8].st1 = false"
													/>
												</template>
												<template v-else> {{ exData[8].val1 }} </template>
											</td>
										</tr>

										<tr>
											<td>⑦ 월 수익합계</td>
											<td class="txt-right">
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0) -
															item.ex_sum_mgr_fee_out,
													).toLocaleString()
												}}
											</td>
											<td @click="exData[9].st2 = true">
												<template v-if="exData[9].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[9].val2"
														@keyup.enter="exData[9].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[9].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2">⑧ 연 총수익금</td>
											<td class="txt-right">
												{{
													Number(
														(rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
															12 -
															item.ex_sum_mgr_fee_out * 12,
													).toLocaleString()
												}}
											</td>
											<td @click="exData[10].st2 = true">
												<template v-if="exData[10].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[10].val2"
														@keyup.enter="exData[10].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[10].val2 }}
												</template>
											</td>
										</tr>
										<tr class="txt-strong">
											<td colspan="2">⑨ 연 수익률</td>
											<td class="txt-right txt-c--red">
												{{
													// (
													// 	(((rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
													// 		rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
													// 		12 -
													// 		item.ex_sum_mgr_fee_out * 12) /
													// 		item.ex_sum_rent_deposit) *
													// 	-1 *
													// 	100
													// ).toLocaleString('en-US', {
													// 	minimumFractionDigits: 2,
													// 	maximumFractionDigits: 2,
													// })

													Number(
														(((rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
															12 -
															item.ex_sum_mgr_fee_out * 12) /
															(item.sell_price - item.ex_sum_rent_deposit)) *
															100,
													).toLocaleString('en-US', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})
												}}
												%
											</td>
											<td @click="exData[11].st2 = true">
												<template v-if="exData[11].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[11].val2"
														@keyup.enter="exData[11].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[11].val2 }}
												</template>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom" style="flex: 1">
						<div class="table-wrap" style="height: 100%">
							<table style="height: 100%" class="table">
								<colgroup>
									<col width="10%" />
									<col width="90%" />
								</colgroup>
								<tr>
									<th>설명</th>
									<td>
										<template v-if="exData[29].st1">
											<textarea
												style="height: 100%"
												class="textarea border-red"
												v-model="exData[29].val1"
												@keyup.esc="exData[29].st1 = false"
											></textarea>
										</template>
										<template v-else>
											<div
												style="height: 100%"
												v-html="exData[29].val1.split('\n').join('<br />')"
												@click="exData[29].st1 = true"
												class="textarea type-text txt-left"
											></div>
										</template>
									</td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				<!-- 레버리지 수익률 및 필요자금 산출 -->
				<div v-if="opList[12].st" class="print-section" id="capture_12" name="capture">
					<div class="print-tit">
						<template v-if="opList[12].edit">
							<input
								class=""
								type="text"
								v-model="opList[12].title"
								@keyup.enter="(opList[12].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[12].edit = true">
								{{ opList[12].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<div class="row">
							<div class="col-6">
								<div class="table-tit">
									레버리지 수익률
									<span class="unit">[단위: 만원]</span>
								</div>
								<div class="table-wrap" style="overflow: hidden">
									<table class="table type-left">
										<tr>
											<th colspan="2">No</th>
											<th>금액</th>
											<th>비고</th>
										</tr>
										<tr>
											<td colspan="2">① 매매금액</td>
											<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
											<td @click="exData[0].st2 = true">
												<template v-if="exData[0].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[0].val2"
														@keyup.enter="exData[0].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[0].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2">② 건축 비용</td>
											<td class="txt-right" @click="exData[1].st1 = true">
												<template v-if="exData[1].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[1].val1"
														@keyup.enter="exData[1].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[1].val1).toLocaleString() }}
												</template>
											</td>
											<td @click="exData[1].st2 = true">
												<template v-if="exData[1].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[1].val2"
														@keyup.enter="exData[1].st2 = false"
													/>
												</template>
												<template v-else>{{ exData[1].val2 }}</template>
											</td>
										</tr>
										<!-- <tr>
											<td colspan="2">③ 총 투자금액</td>
											<td class="txt-right">
												{{ Number(exData[1].val1 + item.sell_price).toLocaleString() }}
											</td>
											<td @click="exData[2].st2 = true">
												<template v-if="exData[2].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[2].val2"
														@keyup.enter="exData[2].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[2].val2 }}
												</template>
											</td>
										</tr> -->
										<tr>
											<td colspan="2">③ 보증금</td>
											<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
											<td @click="exData[3].st2 = true">
												<template v-if="exData[3].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[3].val2"
														@keyup.enter="exData[3].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[3].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2">④ 대출원금</td>
											<td class="txt-right" @click="exData[18].st1 = true">
												<template v-if="exData[18].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[18].val1"
														@keyup.enter="exData[18].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[18].val1).toLocaleString() }}
												</template>
											</td>
											<td @click="exData[18].st2 = true">
												<template v-if="exData[18].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[18].val2"
														@keyup.enter="exData[18].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[18].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2" class="p-r-5 txt-strong">⑤ 실매입금액</td>
											<td class="txt-right txt-strong">
												{{
													Number(
														item.sell_price + exData[1].val1 - item.ex_sum_rent_deposit - exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td @click="exData[5].st2 = true">
												<template v-if="exData[5].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[5].val2"
														@keyup.enter="exData[5].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[5].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<th rowspan="5">월수익</th>
											<td>⑥ 임대료</td>
											<td class="txt-right">
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
													).toLocaleString()
												}}
											</td>
											<td @click="exData[6].st2 = true">
												<template v-if="exData[6].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[6].val2"
														@keyup.enter="exData[6].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[6].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td>⑦ 관리비</td>
											<td class="txt-right">
												{{
													Number(rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)).toLocaleString()
												}}
											</td>
											<td @click="exData[7].st2 = true">
												<template v-if="exData[7].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[7].val2"
														@keyup.enter="exData[7].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[7].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td>⑧ 관리비 지출</td>
											<td class="txt-right">
												{{ Number(item.ex_sum_mgr_fee_out).toLocaleString() }}
											</td>
											<td @click="exData[49].st1 = true">
												<template v-if="exData[49].st1">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[49].val1"
														@keyup.enter="exData[49].st1 = false"
													/>
												</template>
												<template v-else> {{ exData[49].val1 }} </template>
											</td>
										</tr>
										<tr>
											<td>⑨ 대출 이자</td>
											<td class="txt-right">
												<!-- <template v-if="exData[2].st">
												<input
													class="p-0 border"
													type="number"
													v-model="opList[11].data.loanPrice"
													@keyup.enter="opList[11].data.loanPriceST = false"
												/>
											</template>
											<template v-else>
												<div @click="opList[11].data.loanPriceST = true" class="p-0">
													{{ Number(opList[11].data.loanPrice).toLocaleString() }}
												</div>
											</template> -->
												{{
													Number((exData[8].val2 * exData[18].val1 * 0.01) / 12).toLocaleString('en-US', {
														minimumFractionDigits: 0,
														maximumFractionDigits: 0,
													})
												}}
											</td>
											<td @click="exData[8].st2 = true">
												<template v-if="exData[8].st2">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[8].val2"
														@keyup.enter="exData[8].st2 = false"
													/>%
												</template>
												<template v-else> {{ Number(exData[8].val2).toLocaleString() }} % </template>
											</td>
										</tr>
										<tr>
											<td>⑩ 월 순수익 합계</td>
											<td class="txt-right">
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0) -
															item.ex_sum_mgr_fee_out -
															(exData[8].val2 * exData[18].val1 * 0.01) / 12,
													).toLocaleString('en-US', {
														minimumFractionDigits: 0,
														maximumFractionDigits: 0,
													})
												}}
											</td>
											<td @click="exData[9].st2 = true">
												<template v-if="exData[9].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[9].val2"
														@keyup.enter="exData[9].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[9].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2">⑪ 연 순수익 합계</td>
											<td class="txt-right">
												{{
													Number(
														(rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
															12 -
															exData[8].val2 * exData[18].val1 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td @click="exData[10].st2 = true">
												<template v-if="exData[10].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[10].val2"
														@keyup.enter="exData[10].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[10].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td colspan="2" class="txt-strong txt-c--red">⑫ 연 순수익률</td>
											<td class="txt-right txt-strong txt-c--red">
												{{
													Number(
														(((rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
															12 -
															exData[8].val2 * exData[18].val1 * 0.01) /
															(item.sell_price + exData[1].val1 - item.ex_sum_rent_deposit - exData[18].val1)) *
															100,
													).toLocaleString('en-US', {
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													})
												}}
												%
											</td>
											<td @click="exData[11].st2 = true">
												<template v-if="exData[11].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[11].val2"
														@keyup.enter="exData[11].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[11].val2 }}
												</template>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="col-6">
								<div class="table-tit">
									필요자금 산출
									<span class="unit">[단위: 만원]</span>
								</div>
								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th>No</th>
											<th>금액</th>
											<th colspan="2">비고</th>
										</tr>
										<tr>
											<td>① 매매금액</td>
											<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
											<td colspan="2" @click="exData[12].st2 = true">
												<template v-if="exData[12].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[12].val2"
														@keyup.enter="exData[12].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[12].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td>② 취득세</td>
											<td class="txt-right" @click="exData[13].st1 = true">
												<!-- <template v-if="exData[13].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[13].val1"
														@keyup.enter="exData[13].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[13].val1 * exData[13].val2).toLocaleString() }}
												</template> -->
												{{ Number(item.sell_price * exData[13].val2 * 0.01).toLocaleString() }}
											</td>
											<td>취득세율</td>
											<td @click="exData[13].st2 = true">
												<template v-if="exData[13].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[13].val2"
														@keyup.enter="exData[13].st2 = false"
													/>
													%
												</template>
												<template v-else> {{ exData[13].val2 }} % </template>
											</td>
										</tr>
										<tr>
											<td>③ 법무사비용</td>
											<td class="txt-right" @click="exData[14].st1 = true">
												{{ Number(item.sell_price * exData[14].val2 * 0.01).toLocaleString() }}
											</td>
											<td>채권할인율에 따라 변동 될 수 있음</td>
											<td @click="exData[14].st2 = true">
												<template v-if="exData[14].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[14].val2"
														@keyup.enter="exData[14].st2 = false"
													/>
													%
												</template>
												<template v-else> {{ exData[14].val2 }} % </template>
											</td>
										</tr>
										<tr>
											<td>④ 중개수수료</td>
											<td class="txt-right" @click="exData[15].st1 = true">
												{{ Number(item.sell_price * exData[15].val2 * 0.01).toLocaleString() }}
											</td>
											<td>부가세별도</td>
											<td @click="exData[15].st2 = true">
												<template v-if="exData[15].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[15].val2"
														@keyup.enter="exData[15].st2 = false"
													/>
													%
												</template>
												<template v-else> {{ exData[15].val2 }} % </template>
											</td>
										</tr>
										<tr>
											<td>⑤ 보증금</td>
											<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
											<td colspan="2" @click="exData[16].st2 = true">
												<template v-if="exData[16].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[16].val2"
														@keyup.enter="exData[16].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[16].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td class="txt-strong">⑥ 투입금액</td>
											<td class="txt-right txt-strong" @click="exData[17].st1 = true">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit,
													).toLocaleString()
												}}
											</td>
											<td colspan="2" @click="exData[17].st2 = true">
												<template v-if="exData[17].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[17].val2"
														@keyup.enter="exData[17].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[17].val2 }}
												</template>
											</td>
										</tr>
										<tr>
											<td>⑦ 대출원금</td>
											<td class="txt-right" @click="exData[18].st1 = true">
												<template v-if="exData[18].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[18].val1"
														@keyup.enter="exData[18].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[18].val1).toLocaleString() }}
												</template>
											</td>
											<td>매매금액 대비 대출 비중</td>
											<td>{{ Number((exData[18].val1 / item.sell_price) * 100).toLocaleString() }} %</td>
										</tr>
										<tr>
											<td class="txt-strong txt-c--red">실제필요자금</td>
											<td class="txt-right txt-strong txt-c--red" @click="exData[19].st1 = true">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td colspan="2" @click="exData[19].st2 = true">
												<template v-if="exData[19].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[19].val2"
														@keyup.enter="exData[19].st2 = false"
													/>
												</template>
												<template v-else>
													{{ exData[19].val2 }}
												</template>
											</td>
										</tr>
										<!-- 
										<tr>
											<th colspan="4"></th>
										</tr>
										<tr>
											<td>임대료 수익</td>
											<td>
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
													).toLocaleString()
												}}
											</td>
											<td colspan="2" @click="exData[22].st2 = true">
												<template v-if="exData[22].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[22].val2"
														@keyup.enter="exData[22].st2 = false"
													/>
												</template>
												<template v-else> {{ exData[22].val2 }} </template>
											</td>
										</tr>
										<tr>
											<td>관리비 수익</td>
											<td class="txt-right">
												{{
													Number(rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)).toLocaleString()
												}}
											</td>
											<td colspan="2" @click="exData[23].st2 = true">
												<template v-if="exData[23].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[23].val2"
														@keyup.enter="exData[23].st2 = false"
													/>
												</template>
												<template v-else> {{ exData[23].val2 }} </template>
											</td>
										</tr>
										<tr>
											<td>관리비 지출</td>
											<td class="txt-right" @click="exData[20].st1 = true">
												<template v-if="exData[20].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[20].val1"
														@keyup.enter="exData[20].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[20].val1).toLocaleString() }}
												</template>
											</td>
											<td colspan="2" @click="exData[24].st2 = true">
												<template v-if="exData[24].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[24].val2"
														@keyup.enter="exData[24].st2 = false"
													/>
												</template>
												<template v-else> {{ exData[24].val2 }} </template>
											</td>
										</tr>
										<tr>
											<td style="width: 30%">월 이자</td>
											<td style="width: 20%" class="txt-right">
												{{
													Number((exData[21].val2 * 0.01 * (item.sell_price * exData[18].val2 * 0.01)) / 12)
														.toFixed(2)
														.toLocaleString()
												}}
											</td>
											<td style="width: 40%">대출 이자율</td>
											<td style="width: 20%" @click="exData[21].st2 = true">
												<template v-if="exData[21].st2">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[21].val2"
														@keyup.enter="exData[21].st2 = false"
													/>%
												</template>
												<template v-else> {{ Number(exData[21].val2).toLocaleString() }} % </template>
											</td>
										</tr>
										<tr>
											<td><strong class="txt-c--red">월+관-이자-기타관리비</strong></td>
											<td class="txt-right">
												{{
													Number(
														rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0) -
															(exData[20].val1 -
																(exData[21].val2 * 0.01 * (item.sell_price * exData[18].val2 * 0.01)) / 12),
													).toLocaleString()
												}}
											</td>
											<td colspan="2" @click="exData[25].st2 = true">
												<template v-if="exData[25].st2">
													<input
														class="p-0 border"
														type="text"
														v-model="exData[25].val2"
														@keyup.enter="exData[25].st2 = false"
													/>
												</template>
												<template v-else> {{ exData[25].val2 }} </template>
											</td>
										</tr> -->
									</table>
								</div>
							</div>
							<div class="col-12 mt-5">
								<!-- <div class="top"> -->
								<div class="row">
									<!-- <div class="col-6">
										<div class="layer-wrap">
											<div class="table-wrap">
												<table class="table type-left">
													<tr>
														<th colspan="3">자금조달계획 [단위:만원]</th>
													</tr>
													<tr>
														<td rowspan="5">취득가액</td>
														<td>매입금액</td>
														<td>
															{{ Number(item.sell_price).toLocaleString() }}
														</td>
													</tr>
													<tr>
														<td style="width: 50%" @click="exData[26].st1 = true">
															<template v-if="exData[26].st1">
																<input
																	class="p-0 border"
																	type="number"
																	v-model="exData[26].val1"
																	@keyup.enter="exData[26].st1 = false"
																/>
															</template>
															<template v-else>
																취득세(매입금액의 {{ Number(exData[26].val1).toLocaleString() }}%)
															</template>
														</td>
														<td style="width: 50%">
															{{ Number(item.sell_price * exData[26].val1 * 0.01).toLocaleString() }}
														</td>
													</tr>
													<tr>
														<td style="width: 50%" @click="exData[27].st1 = true">
															<template v-if="exData[27].st1">
																<input
																	class="p-0 border"
																	type="number"
																	v-model="exData[27].val1"
																	@keyup.enter="exData[27].st1 = false"
																/>
															</template>
															<template v-else>
																중개수수료(매입금액의 {{ Number(exData[27].val1).toLocaleString() }}%)
															</template>
														</td>
														<td style="width: 50%">
															{{ Number(item.sell_price * exData[27].val1 * 0.01).toLocaleString() }}
														</td>
													</tr>
													<tr>
														<td>현 보증금</td>
														<td>{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
													</tr>
													<tr>
														<td>합계</td>
														<td>
															{{
																Number(
																	item.sell_price +
																		item.sell_price * exData[26].val1 * 0.01 +
																		item.sell_price * exData[27].val1 * 0.01 -
																		item.ex_sum_rent_deposit,
																).toLocaleString()
															}}
														</td>
													</tr>
													<tr>
														<th colspan="3"></th>
													</tr>
													<tr>
														<td colspan="2">매입 시 대출금액</td>
														<td colspan="2" @click="exData[28].st1 = true">
															<template v-if="exData[28].st1">
																<input
																	class="p-0 border"
																	type="text"
																	v-model="exData[28].val1"
																	@keyup.enter="exData[28].st1 = false"
																/>
															</template>
															<template v-else> {{ Number(exData[28].val1).toLocaleString() }} </template>
														</td>
													</tr>
													<tr>
														<td colspan="2">필요현금</td>
														<td>
															{{
																Number(
																	item.sell_price +
																		item.sell_price * exData[26].val1 * 0.01 +
																		item.sell_price * exData[27].val1 * 0.01 -
																		item.ex_sum_rent_deposit -
																		exData[28].val1,
																).toLocaleString()
															}}
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div> -->
									<div class="col-12">
										<div class="table-wrap">
											<table class="table">
												<colgroup>
													<col width="20%" />
													<col width="80%" />
												</colgroup>
												<tr>
													<th>설명</th>
													<td>
														<template v-if="exData[30].st1">
															<textarea
																class="textarea border-red"
																rows="13"
																v-model="exData[30].val1"
																@keyup.esc="exData[30].st1 = false"
															></textarea>
														</template>
														<template v-else>
															<div
																v-html="exData[30].val1.split('\n').join('<br />')"
																@click="exData[30].st1 = true"
																class="textarea type-text txt-left"
																style="height: 212px"
															></div>
														</template>
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
							<!-- <div class="bottom">
									<div class="table-wrap">
										<table class="table">
											<tr>
												<th>설명</th>
												<td>- 설명텍스트</td>
											</tr>
										</table>
									</div>
								</div> -->
							<!-- </div> -->
						</div>
					</div>
				</div>
				<!-- <div v-if="opList[12].st" class="print-section">
					<div class="print-tit">임대 수익률 및 자금계획 (이어서 다음 테이블)</div>
					<div class="layer-wrap">
						<div class="table-tit">
							예상 자금 계획(대출 이용 전)
							<span class="unit">(만원)</span>
						</div>
						<div class="table-wrap">
							<table class="table type-left">
								<tr>
									<th colspan="2">No</th>
									<th>금액(만원)</th>
									<th>비고</th>
								</tr>
								<tr>
									<td colspan="2">① 매매가격</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="2">② 건축 비용</td>
									<td class="txt-right">-</td>
									<td>완성형 건물</td>
								</tr>
								<tr>
									<td colspan="2">③ 총 투자금액</td>
									<td class="txt-right">830,000</td>
									<td>① + ②</td>
								</tr>
								<tr>
									<td colspan="2">④ 보증금</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="2">⑤ 대출원금</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="2">⑥ 실투자액</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<th rowspan="4">월수익</th>
									<td>⑦ 월 임대 수익</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td>⑧ 관리비</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td>⑨ 월 이자</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td>⑩ 월 수익합계</td>
									<td class="txt-right">830,000</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="2">⑪ 연 총수익금</td>
									<td class="txt-right">30,000</td>
									<td></td>
								</tr>
								<tr>
									<td colspan="2">⑫ 연 수익률</td>
									<td class="txt-right"><strong class="txt-c--red">30,000</strong></td>
									<td></td>
								</tr>
							</table>
						</div>
					</div>
				</div> -->
				<!-- <div v-if="opList[13].st" class="print-section">
					<div class="print-tit">자금조달계획</div>
					<div class="top">
						<div class="layer-wrap">
							<div class="table-wrap">
								<table class="table type-left">
									<tr>
										<th>자금조달계획 [단위:만원]</th>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="table-wrap">
							<table class="table">
								<tr>
									<th>설명</th>
									<td>- 설명텍스트</td>
								</tr>
							</table>
						</div>
					</div>
				</div> -->

				<!-- 예상임대수익 및 MD구성 -->
				<div v-if="opList[13].st" class="print-section" id="capture_13" name="capture">
					<div class="print-tit">
						<template v-if="opList[13].edit">
							<input
								class=""
								type="text"
								v-model="opList[13].title"
								@keyup.enter="(opList[13].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[13].edit = true">
								{{ opList[13].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap" style="display: flex; flex-direction: column">
						<div class="table-tit right">
							<span class="unit">[단위: 만원]</span>
						</div>
						<div class="table-wrap" style="flex: 1; overflow: visible">
							<table class="table" style="height: 100%">
								<tr>
									<th style="width: 7%">층</th>
									<th style="width: 7%">면적(평)</th>
									<th style="width: 33%">추천업종</th>

									<th style="width: 7%">보증금</th>

									<th style="width: 7%">월세</th>
									<th style="width: 7%">관리비</th>

									<th style="width: 7%">NI</th>
									<th style="width: 25%">비고</th>
								</tr>
								<tr v-for="(i, idx) in exFloorList" :key="'fffff_' + idx" @click="i.st = true">
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="text"
												v-model="i.flrNoNm"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ i.flrNoNm }}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="number"
												v-model="i.rentPy"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{
												Number(i.rentPy).toLocaleString('en-US', {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})
											}}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="text"
												v-model="i.use"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ i.use }}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="number"
												v-model="i.deposit"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ Number(i.deposit).toLocaleString() }}
										</template>
									</td>

									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="number"
												v-model="i.money"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ Number(i.money).toLocaleString() }}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="number"
												v-model="i.mgrFee"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ Number(i.mgrFee).toLocaleString() }}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="number"
												v-model="i.rent_ni"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{
												Number(i.rent_ni).toLocaleString('en-US', {
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												})
											}}
										</template>
									</td>
									<td>
										<template v-if="i.st">
											<input
												class="p-0 border"
												type="text"
												v-model="i.memo"
												@keyup.enter="i.st = false"
												@keyup="flrAddDel($event, idx)"
											/>
										</template>
										<template v-else>
											{{ i.memo }}
										</template>
									</td>
								</tr>
								<tr class="txt-strong">
									<td>합계</td>
									<td>
										{{
											Number(exFloorList.reduce((sum, item) => sum + (Number(item.rentPy) ?? 0), 0)).toLocaleString(
												'en-US',
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												},
											)
										}}
									</td>
									<td>-</td>

									<td>
										{{
											Number(exFloorList.reduce((sum, item) => sum + (Number(item.deposit) ?? 0), 0)).toLocaleString()
										}}
									</td>
									<td>
										{{ Number(exFloorList.reduce((sum, item) => sum + (Number(item.money) ?? 0), 0)).toLocaleString() }}
									</td>
									<td>
										{{
											Number(exFloorList.reduce((sum, item) => sum + (Number(item.mgrFee) ?? 0), 0)).toLocaleString()
										}}
									</td>
									<td>
										{{
											Number(exFloorList.reduce((sum, item) => sum + (Number(item.rent_ni) ?? 0), 0)).toLocaleString()
										}}
									</td>
									<td>-</td>
								</tr>
							</table>
						</div>

						<div class="m-t--4"></div>
						<template v-if="exData[31].st1">
							<textarea
								class="textarea border-red"
								v-model="exData[31].val1"
								@keyup.esc="exData[31].st1 = false"
								style="flex: 1"
							></textarea>
						</template>
						<template v-else>
							<div
								v-html="exData[31].val1.split('\n').join('<br />')"
								@click="exData[31].st1 = true"
								class="textarea type-text"
								style="flex: 1"
							></div>
						</template>
					</div>
				</div>

				<!-- 대출 비중에 따른 필요자금 분석 -->
				<div v-if="opList[14].st" class="print-section" id="capture_14" name="capture">
					<div class="print-tit">
						<template v-if="opList[14].edit">
							<input
								class=""
								type="text"
								v-model="opList[14].title"
								@keyup.enter="(opList[14].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[14].edit = true">
								{{ opList[14].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<div class="row">
							<div class="col-6">
								<div class="top">
									<div class="layer-wrap">
										<div class="table-wrap">
											<table class="table type-left">
												<tr>
													<th>1. 대출 {{ Number(exData[51].val2).toLocaleString() }}%</th>
												</tr>
											</table>
										</div>
									</div>
								</div>
								<div class="bottom">
									<div class="table-tit">
										필요자금 산출
										<span class="unit">[단위: 만원]</span>
									</div>

									<div class="table-wrap">
										<table class="table type-left">
											<tr>
												<th>No</th>
												<th>금액</th>
												<th colspan="2">비고</th>
											</tr>
											<tr>
												<td>① 매매금액</td>
												<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
												<td colspan="2" @click="exData[12].st2 = true">
													<template v-if="exData[12].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[12].val2"
															@keyup.enter="exData[12].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[12].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>② 취득세</td>
												<td class="txt-right" @click="exData[13].st1 = true">
													<!-- <template v-if="exData[13].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[13].val1"
														@keyup.enter="exData[13].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[13].val1 * exData[13].val2).toLocaleString() }}
												</template> -->
													{{ Number(item.sell_price * exData[13].val2 * 0.01).toLocaleString() }}
												</td>
												<td>취득세율</td>
												<td @click="exData[13].st2 = true">
													<template v-if="exData[13].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[13].val2"
															@keyup.enter="exData[13].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[13].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>③ 법무사비용</td>
												<td class="txt-right" @click="exData[14].st1 = true">
													{{ Number(item.sell_price * exData[14].val2 * 0.01).toLocaleString() }}
												</td>
												<td>채권할인율에 따라 변동 될 수 있음</td>
												<td @click="exData[14].st2 = true">
													<template v-if="exData[14].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[14].val2"
															@keyup.enter="exData[14].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[14].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>④ 중개수수료</td>
												<td class="txt-right" @click="exData[15].st1 = true">
													{{ Number(item.sell_price * exData[15].val2 * 0.01).toLocaleString() }}
												</td>
												<td>부가세별도</td>
												<td @click="exData[15].st2 = true">
													<template v-if="exData[15].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[15].val2"
															@keyup.enter="exData[15].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[15].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>⑤ 보증금</td>
												<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
												<td colspan="2" @click="exData[16].st2 = true">
													<template v-if="exData[16].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[16].val2"
															@keyup.enter="exData[16].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[16].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td class="txt-strong">⑥ 투입금액</td>
												<td class="txt-right txt-strong" @click="exData[17].st1 = true">
													{{
														Number(
															item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit,
														).toLocaleString()
													}}
												</td>
												<td colspan="2" @click="exData[17].st2 = true">
													<template v-if="exData[17].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[17].val2"
															@keyup.enter="exData[17].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[17].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>⑦ 대출원금</td>
												<td class="txt-right" @click="exData[51].st1 = true">
													<template v-if="exData[51].st1">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[51].val1"
															@keyup.enter="exData[51].st1 = false"
															@change="exData[51].val2 = (exData[51].val1 / item.sell_price) * 100"
														/>
													</template>
													<template v-else>
														{{ Number(exData[51].val1).toLocaleString() }}
													</template>
												</td>
												<td>매매금액 대비 대출 비중</td>
												<td @click="exData[51].st2 = true">
													<template v-if="exData[51].st2">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[51].val2"
															@keyup.enter="exData[51].st2 = false"
															@change="exData[51].val1 = item.sell_price * exData[51].val2 * 0.01"
														/>
													</template>
													<template v-else>
														<!-- exData[51].val2 / item.sell_price) * 100 -->
														{{ Number(exData[51].val2).toLocaleString() }}
														%
													</template>
												</td>
											</tr>
											<tr>
												<td class="txt-strong txt-c--red">실제필요자금</td>
												<td class="txt-right txt-strong txt-c--red" @click="exData[19].st1 = true">
													{{
														Number(
															item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[51].val1,
														).toLocaleString()
													}}
												</td>
												<td colspan="2" @click="exData[19].st2 = true">
													<template v-if="exData[19].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[19].val2"
															@keyup.enter="exData[19].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[19].val2 }}
													</template>
												</td>
											</tr>
										</table>
									</div>

									<div class="table-tit">레버리지 수익률</div>
									<div class="table-wrap" style="overflow: hidden">
										<table class="table type-left">
											<tr>
												<th colspan="2">No</th>
												<th>금액</th>
												<th>비고</th>
											</tr>
											<tr>
												<th rowspan="5">월수익</th>
												<td>① 임대료</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
														).toLocaleString()
													}}
												</td>
												<td @click="exData[6].st2 = true">
													<template v-if="exData[6].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[6].val2"
															@keyup.enter="exData[6].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[6].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>② 관리비</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0),
														).toLocaleString()
													}}
												</td>
												<td @click="exData[7].st2 = true">
													<template v-if="exData[7].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[7].val2"
															@keyup.enter="exData[7].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[7].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>③ 관리비 지출</td>
												<td class="txt-right">
													{{ Number(item.ex_sum_mgr_fee_out).toLocaleString() }}
												</td>
												<td @click="exData[49].st1 = true">
													<template v-if="exData[49].st1">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[49].val1"
															@keyup.enter="exData[49].st1 = false"
														/>
													</template>
													<template v-else> {{ exData[49].val1 }} </template>
												</td>
											</tr>
											<tr>
												<td>④ 대출 이자</td>
												<td class="txt-right">
													{{
														Number((exData[53].val2 * exData[51].val1 * 0.01) / 12).toLocaleString('en-US', {
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														})
													}}
												</td>
												<td @click="exData[53].st2 = true">
													<template v-if="exData[53].st2">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[53].val2"
															@keyup.enter="exData[53].st2 = false"
														/>%
													</template>
													<template v-else> {{ Number(exData[53].val2).toLocaleString() }} % </template>
												</td>
											</tr>
											<tr>
												<td>⑤ 월 순수익 합계</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0) -
																item.ex_sum_mgr_fee_out -
																(exData[53].val2 * exData[51].val1 * 0.01) / 12,
														).toLocaleString('en-US', {
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														})
													}}
												</td>
												<td @click="exData[9].st2 = true">
													<template v-if="exData[9].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[9].val2"
															@keyup.enter="exData[9].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[9].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td colspan="2">⑥ 연 순수익 합계</td>
												<td class="txt-right">
													{{
														Number(
															(rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
																12 -
																exData[53].val2 * exData[51].val1 * 0.01,
														).toLocaleString()
													}}
												</td>
												<td @click="exData[10].st2 = true">
													<template v-if="exData[10].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[10].val2"
															@keyup.enter="exData[10].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[10].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td colspan="2" class="txt-strong txt-c--red">⑦ 연 순수익률</td>
												<td class="txt-right txt-strong txt-c--red">
													{{
														Number(
															(((rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
																12 -
																exData[53].val2 * exData[51].val1 * 0.01) /
																(item.sell_price + exData[1].val1 - item.ex_sum_rent_deposit - exData[51].val1)) *
																100,
														).toLocaleString('en-US', {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})
													}}
													%
												</td>
												<td @click="exData[11].st2 = true">
													<template v-if="exData[11].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[11].val2"
															@keyup.enter="exData[11].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[11].val2 }}
													</template>
												</td>
											</tr>
										</table>
									</div>
								</div>
							</div>
							<div class="col-6">
								<div class="top">
									<div class="layer-wrap">
										<div class="table-wrap">
											<table class="table type-left">
												<tr>
													<th>2. 대출 {{ Number(exData[52].val2).toLocaleString() }}%</th>
												</tr>
											</table>
										</div>
									</div>
								</div>
								<div class="bottom">
									<div class="table-tit">
										필요자금 산출
										<span class="unit">[단위: 만원]</span>
									</div>

									<div class="table-wrap">
										<table class="table type-left">
											<tr>
												<th>No</th>
												<th>금액</th>
												<th colspan="2">비고</th>
											</tr>
											<tr>
												<td>① 매매금액</td>
												<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
												<td colspan="2" @click="exData[12].st2 = true">
													<template v-if="exData[12].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[12].val2"
															@keyup.enter="exData[12].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[12].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>② 취득세</td>
												<td class="txt-right" @click="exData[13].st1 = true">
													<!-- <template v-if="exData[13].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[13].val1"
														@keyup.enter="exData[13].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[13].val1 * exData[13].val2).toLocaleString() }}
												</template> -->
													{{ Number(item.sell_price * exData[13].val2 * 0.01).toLocaleString() }}
												</td>
												<td>취득세율</td>
												<td @click="exData[13].st2 = true">
													<template v-if="exData[13].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[13].val2"
															@keyup.enter="exData[13].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[13].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>③ 법무사비용</td>
												<td class="txt-right" @click="exData[14].st1 = true">
													{{ Number(item.sell_price * exData[14].val2 * 0.01).toLocaleString() }}
												</td>
												<td>채권할인율에 따라 변동 될 수 있음</td>
												<td @click="exData[14].st2 = true">
													<template v-if="exData[14].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[14].val2"
															@keyup.enter="exData[14].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[14].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>④ 중개수수료</td>
												<td class="txt-right" @click="exData[15].st1 = true">
													{{ Number(item.sell_price * exData[15].val2 * 0.01).toLocaleString() }}
												</td>
												<td>부가세별도</td>
												<td @click="exData[15].st2 = true">
													<template v-if="exData[15].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[15].val2"
															@keyup.enter="exData[15].st2 = false"
														/>
														%
													</template>
													<template v-else> {{ exData[15].val2 }} % </template>
												</td>
											</tr>
											<tr>
												<td>⑤ 보증금</td>
												<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
												<td colspan="2" @click="exData[16].st2 = true">
													<template v-if="exData[16].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[16].val2"
															@keyup.enter="exData[16].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[16].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td class="txt-strong">⑥ 투입금액</td>
												<td class="txt-right txt-strong" @click="exData[17].st1 = true">
													{{
														Number(
															item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit,
														).toLocaleString()
													}}
												</td>
												<td colspan="2" @click="exData[17].st2 = true">
													<template v-if="exData[17].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[17].val2"
															@keyup.enter="exData[17].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[17].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>⑦ 대출원금</td>
												<td class="txt-right" @click="exData[52].st1 = true">
													<template v-if="exData[52].st1">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[52].val1"
															@keyup.enter="exData[52].st1 = false"
															@change="exData[52].val2 = (exData[52].val1 / item.sell_price) * 100"
														/>
													</template>
													<template v-else>
														{{ Number(exData[52].val1).toLocaleString() }}
													</template>
												</td>
												<td>매매금액 대비 대출 비중</td>
												<td @click="exData[52].st2 = true">
													<template v-if="exData[52].st2">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[52].val2"
															@keyup.enter="exData[52].st2 = false"
															@change="exData[52].val1 = item.sell_price * exData[52].val2 * 0.01"
														/>
													</template>
													<template v-else>
														<!-- exData[52].val2 / item.sell_price) * 100 -->
														{{ Number(exData[52].val2).toLocaleString() }}
														%
													</template>
												</td>
											</tr>
											<tr>
												<td class="txt-strong txt-c--red">실제필요자금</td>
												<td class="txt-right txt-strong txt-c--red" @click="exData[19].st1 = true">
													{{
														Number(
															item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[52].val1,
														).toLocaleString()
													}}
												</td>
												<td colspan="2" @click="exData[19].st2 = true">
													<template v-if="exData[19].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[19].val2"
															@keyup.enter="exData[19].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[19].val2 }}
													</template>
												</td>
											</tr>
										</table>
									</div>

									<div class="table-tit">레버리지 수익률</div>
									<div class="table-wrap" style="overflow: hidden">
										<table class="table type-left">
											<tr>
												<th colspan="2">No</th>
												<th>금액</th>
												<th>비고</th>
											</tr>
											<tr>
												<th rowspan="5">월수익</th>
												<td>① 임대료</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0),
														).toLocaleString()
													}}
												</td>
												<td @click="exData[6].st2 = true">
													<template v-if="exData[6].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[6].val2"
															@keyup.enter="exData[6].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[6].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>② 관리비</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0),
														).toLocaleString()
													}}
												</td>
												<td @click="exData[7].st2 = true">
													<template v-if="exData[7].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[7].val2"
															@keyup.enter="exData[7].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[7].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td>③ 관리비 지출</td>
												<td class="txt-right">
													{{ Number(item.ex_sum_mgr_fee_out).toLocaleString() }}
												</td>
												<td @click="exData[49].st1 = true">
													<template v-if="exData[49].st1">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[49].val1"
															@keyup.enter="exData[49].st1 = false"
														/>
													</template>
													<template v-else> {{ exData[49].val1 }} </template>
												</td>
											</tr>
											<tr>
												<td>④ 대출 이자</td>
												<td class="txt-right">
													{{
														Number((exData[54].val2 * exData[52].val1 * 0.01) / 12).toLocaleString('en-US', {
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														})
													}}
												</td>
												<td @click="exData[54].st2 = true">
													<template v-if="exData[54].st2">
														<input
															class="p-0 border"
															type="number"
															v-model="exData[54].val2"
															@keyup.enter="exData[54].st2 = false"
														/>%
													</template>
													<template v-else> {{ Number(exData[54].val2).toLocaleString() }} % </template>
												</td>
											</tr>
											<tr>
												<td>⑤ 월 순수익 합계</td>
												<td class="txt-right">
													{{
														Number(
															rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0) -
																item.ex_sum_mgr_fee_out -
																(exData[54].val2 * exData[52].val1 * 0.01) / 12,
														).toLocaleString('en-US', {
															minimumFractionDigits: 0,
															maximumFractionDigits: 0,
														})
													}}
												</td>
												<td @click="exData[9].st2 = true">
													<template v-if="exData[9].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[9].val2"
															@keyup.enter="exData[9].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[9].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td colspan="2">⑥ 연 순수익 합계</td>
												<td class="txt-right">
													{{
														Number(
															(rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
																12 -
																exData[54].val2 * exData[52].val1 * 0.01,
														).toLocaleString()
													}}
												</td>
												<td @click="exData[10].st2 = true">
													<template v-if="exData[10].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[10].val2"
															@keyup.enter="exData[10].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[10].val2 }}
													</template>
												</td>
											</tr>
											<tr>
												<td colspan="2" class="txt-strong txt-c--red">⑦ 연 순수익률</td>
												<td class="txt-right txt-strong txt-c--red">
													{{
														Number(
															(((rentList.reduce((sum, item) => sum + (Number(item.rent_money) ?? 0), 0) +
																rentList.reduce((sum, item) => sum + (Number(item.mgr_fee) ?? 0), 0)) *
																12 -
																exData[54].val2 * exData[52].val1 * 0.01) /
																(item.sell_price + exData[1].val1 - item.ex_sum_rent_deposit - exData[52].val1)) *
																100,
														).toLocaleString('en-US', {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})
													}}
													%
												</td>
												<td @click="exData[11].st2 = true">
													<template v-if="exData[11].st2">
														<input
															class="p-0 border"
															type="text"
															v-model="exData[11].val2"
															@keyup.enter="exData[11].st2 = false"
														/>
													</template>
													<template v-else>
														{{ exData[11].val2 }}
													</template>
												</td>
											</tr>
										</table>
									</div>
								</div>
							</div>

							<div class="col-12 mt-3">
								<div class="table-wrap">
									<table class="table">
										<colgroup>
											<col width="10%" />
											<col width="90%" />
										</colgroup>
										<tr>
											<th>설명</th>
											<td>
												<template v-if="exData[55].st1">
													<textarea
														class="textarea border-red"
														rows="5"
														v-model="exData[55].val1"
														@keyup.esc="exData[55].st1 = false"
													></textarea>
												</template>
												<template v-else>
													<div
														v-html="exData[55].val1.split('\n').join('<br />')"
														@click="exData[55].st1 = true"
														class="textarea type-text txt-left"
														style="height: 100px"
													></div>
												</template>
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 세전/세후 매각차익 분석(법인 기준) -->
				<div v-if="opList[15].st" class="print-section" id="capture_15" name="capture">
					<div class="print-tit">
						<template v-if="opList[15].edit">
							<input
								class=""
								type="text"
								v-model="opList[15].title"
								@keyup.enter="(opList[15].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[15].edit = true">
								{{ opList[15].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<div class="row">
							<div class="col-6">
								<div class="table-tit">
									취득원가
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th style="width: 40%">구분</th>
											<th>금액</th>
										</tr>
										<tr>
											<td>① 매매금액</td>
											<td class="txt-right">{{ Number(item.sell_price).toLocaleString() }}</td>
										</tr>
										<tr>
											<td>② 취득세</td>
											<td class="txt-right">
												{{ Number(item.sell_price * exData[13].val2 * 0.01).toLocaleString() }}
											</td>
										</tr>
										<tr>
											<td>③ 법무사비용</td>
											<td class="txt-right">
												{{ Number(item.sell_price * exData[14].val2 * 0.01).toLocaleString() }}
											</td>
										</tr>
										<tr>
											<td>④ 중개수수료</td>
											<td class="txt-right">
												{{ Number(item.sell_price * exData[15].val2 * 0.01).toLocaleString() }}
											</td>
										</tr>
										<tr>
											<td>⑤ 취득원가</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
										</tr>
									</table>
								</div>

								<div class="table-tit">
									실제투입금액
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th style="width: 40%">구분</th>
											<th>금액</th>
										</tr>
										<tr>
											<td>① 보증금</td>
											<td class="txt-right">{{ Number(item.ex_sum_rent_deposit).toLocaleString() }}</td>
										</tr>
										<tr>
											<td>② 대출원금</td>
											<td class="txt-right" @click="exData[18].st1 = true">
												<template v-if="exData[18].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[18].val1"
														@keyup.enter="exData[18].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[18].val1).toLocaleString() }}
												</template>
											</td>
										</tr>
										<tr>
											<td>③ 실제투입금액</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="col-6">
								<div class="table-tit">
									매각차익 분석
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th style="width: 40%">구분</th>
											<th>금액</th>
										</tr>
										<tr>
											<td>① 취득원가</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
										</tr>
										<tr>
											<td>② 매각금액</td>
											<td class="txt-right" @click="exData[56].st1 = true">
												<template v-if="exData[56].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[56].val1"
														@keyup.enter="exData[56].st1 = false"
													/>
												</template>
												<template v-else>
													{{ Number(exData[56].val1).toLocaleString() }}
												</template>
											</td>
										</tr>
										<tr>
											<td>③ 매각차익</td>
											<td class="txt-right" @click="exData[14].st1 = true">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01),
													).toLocaleString()
												}}
											</td>
										</tr>
									</table>
								</div>

								<div class="table-tit">
									세전 매각차익 분석
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th style="width: 40%">구분</th>
											<th>금액</th>
										</tr>
										<tr>
											<td>① 법무사비용</td>
											<td class="txt-right">
												{{ Number(item.sell_price * exData[14].val2 * 0.01).toLocaleString() }}
											</td>
										</tr>
										<tr>
											<td>② 중개수수료</td>
											<td class="txt-right">
												{{ Number(item.sell_price * exData[15].val2 * 0.01).toLocaleString() }}
											</td>
										</tr>
										<tr>
											<td>③ 세전 매각차익</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
										</tr>
									</table>
								</div>

								<div class="table-tit">
									세후 매각차익 분석
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap">
									<table class="table type-left">
										<tr>
											<th style="width: 40%">구분</th>
											<th>금액</th>
										</tr>
										<tr>
											<td>① 법인세율</td>
											<td class="txt-right" @click="exData[57].st1 = true">
												<template v-if="exData[57].st1">
													<input
														class="p-0 border"
														type="number"
														v-model="exData[57].val1"
														@keyup.enter="exData[57].st1 = false"
													/>
												</template>
												<template v-else>
													{{
														Number(exData[57].val1).toLocaleString('en-US', {
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														})
													}}
													%
												</template>
											</td>
										</tr>
										<tr>
											<td>② 법인세</td>
											<td class="txt-right">
												{{
													Number(
														(exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) *
															exData[57].val1 *
															0.01,
													).toLocaleString()
												}}
											</td>
										</tr>
										<tr>
											<td>③ 세후 매각차익</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
										</tr>
									</table>
								</div>
							</div>

							<div class="col-12 mt-5">
								<div class="table-tit">
									세전 매각차익 분석
									<span class="unit">[단위: 만원]</span>
								</div>

								<div class="table-wrap" style="text-align: center">
									<table class="table type-left">
										<tr>
											<th style="width: 10%">보유기간</th>
											<th>실제투입금액</th>
											<th>세전 매각차익</th>
											<th>세후 매각차익</th>
											<th>연 세전 수익률(%)</th>
											<th>연 세후 수익률(%)</th>
										</tr>
										<tr>
											<td class="txt-right">1년</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100,
													).toLocaleString()
												}}
												%
											</td>
											<td class="txt-right">
												{{
													Number(
														((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100,
													).toLocaleString()
												}}
												%
											</td>
										</tr>

										<tr>
											<td class="txt-right">2년</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															2,
													).toLocaleString()
												}}
												%
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															2,
													).toLocaleString()
												}}
												%
											</td>
										</tr>

										<tr>
											<td class="txt-right">3년</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															3,
													).toLocaleString()
												}}
												%
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															3,
													).toLocaleString()
												}}
												%
											</td>
										</tr>

										<tr>
											<td class="txt-right">4년</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															4,
													).toLocaleString()
												}}
												%
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															4,
													).toLocaleString()
												}}
												%
											</td>
										</tr>

										<tr>
											<td class="txt-right">5년</td>
											<td class="txt-right">
												{{
													Number(
														item.sell_price +
															item.sell_price * exData[13].val2 * 0.01 +
															item.sell_price * exData[14].val2 * 0.01 +
															item.sell_price * exData[15].val2 * 0.01 -
															item.ex_sum_rent_deposit -
															exData[18].val1,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01,
													).toLocaleString()
												}}
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															5,
													).toLocaleString()
												}}
												%
											</td>
											<td class="txt-right">
												{{
													Number(
														(((exData[56].val1 -
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01) -
															item.sell_price * exData[14].val2 * 0.01 -
															item.sell_price * exData[15].val2 * 0.01 -
															(exData[56].val1 -
																(item.sell_price +
																	item.sell_price * exData[13].val2 * 0.01 +
																	item.sell_price * exData[14].val2 * 0.01 +
																	item.sell_price * exData[15].val2 * 0.01) -
																item.sell_price * exData[14].val2 * 0.01 -
																item.sell_price * exData[15].val2 * 0.01) *
																exData[57].val1 *
																0.01) /
															(item.sell_price +
																item.sell_price * exData[13].val2 * 0.01 +
																item.sell_price * exData[14].val2 * 0.01 +
																item.sell_price * exData[15].val2 * 0.01 -
																item.ex_sum_rent_deposit -
																exData[18].val1)) *
															100) /
															5,
													).toLocaleString()
												}}
												%
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-if="opList[16].st" class="print-section" id="capture_16" name="capture">
					<div class="print-tit">
						<template v-if="opList[16].edit">
							<input
								class=""
								type="text"
								v-model="opList[16].title"
								@keyup.enter="(opList[16].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[16].edit = true">
								{{ opList[16].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<!-- <img :src="item.img" alt="" style="width: 560px; height: 690px" /> -->
						<template v-if="imgPageList[0]">
							<img :src="imgPageList[0]" alt="" style="width: 100%; height: 100%" />
						</template>
						<template v-else> 사진을 추가해주세요. </template>
					</div>
				</div>
				<div v-if="opList[17].st" class="print-section" id="capture_17" name="capture">
					<div class="print-tit">
						<template v-if="opList[17].edit">
							<input
								class=""
								type="text"
								v-model="opList[17].title"
								@keyup.enter="(opList[17].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[17].edit = true">
								{{ opList[17].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<!-- <img :src="item.img" alt="" style="width: 560px; height: 690px" /> -->
						<template v-if="imgPageList[1]">
							<img :src="imgPageList[1]" alt="" style="width: 100%; height: 100%" />
						</template>
						<template v-else> 사진을 추가해주세요. </template>
					</div>
				</div>
				<div v-if="opList[18].st" class="print-section" id="capture_18" name="capture">
					<div class="print-tit">
						<template v-if="opList[18].edit">
							<input
								class=""
								type="text"
								v-model="opList[18].title"
								@keyup.enter="(opList[18].edit = false), updateIndex()"
							/>
						</template>
						<template v-else>
							<div @click="opList[18].edit = true">
								{{ opList[18].title }}
							</div>
						</template>
					</div>
					<div class="layer-wrap">
						<!-- <img :src="item.img" alt="" style="width: 560px; height: 690px" /> -->
						<template v-if="imgPageList[2]">
							<img :src="imgPageList[2]" alt="" style="width: 100%; height: 100%" />
						</template>
						<template v-else> 사진을 추가해주세요. </template>
					</div>
				</div>

				<!-- <div class="print-section">
					<div class="print-tit">신축 개요</div>
					<div class="layer-wrap type2">
						<div class="table-wrap">
							<div class="table-tit">설계개요</div>
							<table class="table">
								<th>구분</th>
								<th>내용</th>
								<th>비고</th>
							</table>
						</div>
						<div class="table-wrap" style="margin-left: 10px">
							<div class="table-tit">층별면적표</div>
							<table class="table">
								<th>구분</th>
								<th>내용</th>
								<th>비고</th>
							</table>
							<ul class="dot-list box-line m-t--2">
								<li class="dot-list--item">설명1</li>
								<li class="dot-list--item">설명2</li>
							</ul>
						</div>
					</div>
				</div> -->

				<!-- 2/10 추가 -->

				<!-- 
				<div class="print-section">
					<div class="print-tit">인근 임대 조사</div>
					<div class="top">
						<div class="layer-wrap type3">
							<div class="map-wrap" style="height: 100%"></div>
							<div class="table-wrap">
								<table class="table">
									<tr>
										<th><span class="num-badge" style="background-color: #a23334; color: #fff">S</span></th>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>연면적(평)</th>
										<th>업종</th>
										<th>보증금</th>
										<th>임대료</th>
										<th>NI</th>
									</tr>
									<tr>
										<td>B1층~2층</td>
										<td>70.38</td>
										<td>2종근생</td>
										<td>2,500</td>
										<td>2,500</td>
										<td>35.3</td>
									</tr>
								</table>
								<table class="table">
									<tr>
										<th><span class="num-badge">1</span></th>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>연면적(평)</th>
										<th>업종</th>
										<th>보증금</th>
										<th>임대료</th>
										<th>NI</th>
									</tr>
									<tr>
										<td>B1층~2층</td>
										<td>70.38</td>
										<td>2종근생</td>
										<td>2,500</td>
										<td>2,500</td>
										<td>35.3</td>
									</tr>
								</table>
								<table class="table">
									<tr>
										<th><span class="num-badge">2</span></th>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>연면적(평)</th>
										<th>업종</th>
										<th>보증금</th>
										<th>임대료</th>
										<th>NI</th>
									</tr>
									<tr>
										<td>B1층~2층</td>
										<td>70.38</td>
										<td>2종근생</td>
										<td>2,500</td>
										<td>2,500</td>
										<td>35.3</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="textarea-wrap"><textarea class="textarea" rows="20"></textarea></div>
					</div>
				</div>

				<div class="print-section">
					<div class="print-tit">인근 임대 사례</div>
					<div class="top">
						<div class="layer-wrap type3">
							<div class="map-wrap" style="height: 100%"></div>
							<div class="table-wrap">
								<table class="table">
									<tr>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>임대평수</th>
										<th>보증금</th>
										<th>월세<br /><span class="txt-size--xsm">(관리비 포함)</span></th>
										<th>평당 임대료</th>
									</tr>
									<tr>
										<th>통임대</th>
										<td>70.38</td>
										<td>400</td>
										<td>2,500</td>
										<td><strong class="txt-c--red">21</strong></td>
									</tr>
								</table>
								<table class="table">
									<tr>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>임대평수</th>
										<th>보증금</th>
										<th>월세<br /><span class="txt-size--xsm">(관리비 포함)</span></th>
										<th>평당 임대료</th>
									</tr>
									<tr>
										<th>통임대</th>
										<td>70.38</td>
										<td>400</td>
										<td>2,500</td>
										<td><strong class="txt-c--red">21</strong></td>
									</tr>
								</table>
								<table class="table">
									<tr>
										<th colspan="5" class="bg">성수동 1가</th>
									</tr>
									<tr>
										<th>층</th>
										<th>임대평수</th>
										<th>보증금</th>
										<th>월세<br /><span class="txt-size--xsm">(관리비 포함)</span></th>
										<th>평당 임대료</th>
									</tr>
									<tr>
										<th>통임대</th>
										<td>70.38</td>
										<td>400</td>
										<td>2,500</td>
										<td><strong class="txt-c--red">21</strong></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
					<div class="bottom type-layer">
						<div class="layer-wrap type3">
							<div style="flex: 3">
								<div class="table-wrap">
									<table class="table">
										<tr>
											<th colspan="5" class="bg">성수동 1가</th>
										</tr>
										<tr>
											<th>층</th>
											<th>임대평수</th>
											<th>보증금</th>
											<th>월세<br /><span class="txt-size--xsm">(관리비 포함)</span></th>
											<th>평당 임대료</th>
										</tr>
										<tr>
											<th>통임대</th>
											<td>70.38</td>
											<td>400</td>
											<td>2,500</td>
											<td><strong class="txt-c--red">21</strong></td>
										</tr>
									</table>
								</div>
								<ul class="dot-list box-line">
									<li class="dot-list--item">설명</li>
									<li class="dot-list--item">설명</li>
									<li class="dot-list--item">설명</li>
								</ul>
							</div>
							<div class="textarea-wrap"><textarea class="textarea" rows="20"></textarea></div>
							//인풋 아니고 설명텍스트면 dot-list
						</div>
					</div>
				</div>

				<div class="print-section">
					<div class="print-tit">주변 임대 시세 예시2</div>
					<div class="layer-wrap type2">
						<div class="map-wrap" style="height: 100%"></div>
						<div class="table-wrap" style="flex: 1.5">
							<table class="table">
								<tr>
									<th><span class="num-badge" style="background-color: #a23334; color: #fff">SITE</span></th>
									<th>임대면적</th>
									<th>전용면적</th>
									<th>보증금</th>
									<th>월세</th>
									<th>관리비</th>
									<th>평당임대료(PY)</th>
								</tr>
								<tr>
									<th>전층</th>
									<td>261</td>
									<td>0</td>
									<td>22,000</td>
									<td>1,400</td>
									<td>0</td>
									<td>5.56</td>
								</tr>
							</table>
							<p class="m-b--4">본 건물 준공년도 1991년 승강기 1대 있음</p>
							<table class="table">
								<tr>
									<th><span class="num-badge">A</span></th>
									<th>임대면적</th>
									<th>전용면적</th>
									<th>보증금</th>
									<th>월세</th>
									<th>관리비</th>
									<th>평당임대료(PY)</th>
								</tr>
								<tr>
									<th>전층</th>
									<td>261</td>
									<td>0</td>
									<td>22,000</td>
									<td>1,400</td>
									<td>0</td>
									<td>5.56</td>
								</tr>
							</table>
							<p class="m-b--4">본 건물 준공년도 1991년 승강기 1대 있음</p>
							<table class="table">
								<tr>
									<th><span class="num-badge">A</span></th>
									<th>임대면적</th>
									<th>전용면적</th>
									<th>보증금</th>
									<th>월세</th>
									<th>관리비</th>
									<th>평당임대료(PY)</th>
								</tr>
								<tr>
									<th>전층</th>
									<td>261</td>
									<td>0</td>
									<td>22,000</td>
									<td>1,400</td>
									<td>0</td>
									<td>5.56</td>
								</tr>
							</table>
							<p class="m-b--4">본 건물 준공년도 1991년 승강기 1대 있음</p>
						</div>
					</div>
				</div>

				
			

				

				 -->

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
							<span class="text">서울특별시 강남구 학동로25길 11, 5층(씨플레이스)</span>
						</li>
					</ul>
					<div class="bottom-text">
						본 Teaser는 본 건 투자를 위한 기본적인 정보를 제공할 목적으로 작성되었습니다. Teaser의 세부적인 내용은 추후
						진행사항에 따라 수정되거나 변경될 수 있고, WEONUS 는 내용에 대해 어떠한 책임도 부담하지 않습니다.<br />
						또한 Teaser에서 제공한 정보는 어떠한 제약의 근거로 사용될 수 없습니다. Teaser의 어떠한 부분도 매도자 및
						WEONUS의 사전 동의 없이 외부에 복사, 인용, 재배포 및 유통될 수 없습니다.
					</div>
				</div>

				<!--

				7. end
				<div name="capture" id="capture_6" class="print-section cover">
					<ul class="info">
						<li class="info-item">
							<label class="label">담당자</label>
							<span class="text">박정훈 차장</span>
						</li>
						<li class="info-item">
							<label class="label">Mobile</label>
							<span class="text">010-3441-5886</span>
						</li>
						<li class="info-item">
							<label class="label">TEL</label>
							<span class="text"></span>
						</li>
						<li class="info-item">
							<label class="label">FAX</label>
							<span class="text">02-111-2222</span>
						</li>
						<li class="info-item">
							<label class="label">E-mail</label>
							<span class="text"></span>
						</li>
						<li class="info-item">
							<span class="text">서울특별시 강남구 도산대로26길 20, 1층(논현동)</span>
						</li>
					</ul>
					<div class="bottom-text">
						본 Teaser는 본건 투자를 위한 기본적인 정보를 제공할 목적으로 작성되었습니다.<br />
						본 Teaser의 내용은 추후 진행사항에 따라 수정되거나 변경될 수 있고,<br />
						내용의 대하여 어떠한 책임도 부담하지 아니합니다. <br />
						또한 본 Teaser에서 제공된 정보는 어떠한 제약의 근거로 사용될 수 없습니다.<br />
						본 Teaser의 어떤 부분도 매도자 및 WEONUS의 사전 서면동의 없이 <br />
						외부에 복사, 인용, 배포, 유통될 수 없습니다.
					</div>
				</div>
				8. 임대 개요
				<div name="capture" id="capture_7" class="print-section flex1-2">
					<div class="left">
						<div class="img-wrap">
							<img src="" alt="" />
						</div>
					</div>
					<div class="right">
						<div class="flex">
							<div>
								<div class="section-tit">임대정보</div>
								<div class="table-wrap">
									<table class="table type-input">
										<colgroup>
											<col width="20%" />
											<col width="30%" />
											<col width="20%" />
											<col width="30%" />
										</colgroup>
										<tr>
											<th>주소</th>
											<td colspan="3">서울특별시</td>
										</tr>
										<tr>
											<th class="txt-c--red">보증금</th>
											<td colspan="3" class="txt-c--red">1만원</td>
										</tr>
										<tr>
											<th class="txt-c--red">월임대료</th>
											<td colspan="3" class="txt-c--red">1만원</td>
										</tr>
										<tr>
											<th>관리비</th>
											<td colspan="3">1만원</td>
										</tr>
										<tr>
											<th class="txt-c--red">월고정비</th>
											<td colspan="3" class="txt-c--red">1만원</td>
										</tr>
										<tr>
											<th class="txt-c--red">전용면적</th>
											<td class="txt-c--red">0평</td>
											<th>전용률</th>
											<td>80%</td>
										</tr>
										<tr>
											<th>임대면적</th>
											<td colspan="3">0평</td>
										</tr>
										<tr>
											<th class="txt-c--red">평당임대료</th>
											<td colspan="3" class="txt-c--red">1만원</td>
										</tr>
										<tr>
											<th>층정보</th>
											<td>1층</td>
											<th>입주현황</th>
											<td>공실</td>
										</tr>
										<tr>
											<th>무료 주차대수</th>
											<td>100평당 1대</td>
											<th>유료 주차대수</th>
											<td>가능</td>
										</tr>
										<tr>
											<th>화장실 유형</th>
											<td colspan="3">각 층 남녀 분리</td>
										</tr>
										<tr>
											<th>인테리어</th>
											<td colspan="3">철거완료</td>
										</tr>
										<tr>
											<th>렌트프리</th>
											<td colspan="3">2개월</td>
										</tr>
									</table>
								</div>
							</div>
							<div>
								<div class="section-tit">토지정보</div>
								<div class="table-wrap">
									<table class="table type-input">
										<colgroup>
											<col width="50%" />
											<col width="50%" />
										</colgroup>
										<tr>
											<th class="txt-c--red">주변역</th>
											<td class="txt-c--red">00역</td>
										</tr>
										<tr>
											<th class="txt-c--red">거리</th>
											<td class="txt-c--red">22m</td>
										</tr>
										<tr>
											<th>대지면적</th>
											<td>00㎡</td>
										</tr>
										<tr>
											<th>도로사항</th>
											<td>00㎡ 코너</td>
										</tr>
									</table>
								</div>
								<div class="section-tit mt-4">건축물정보</div>
								<div class="table-wrap">
									<table class="table type-input">
										<colgroup>
											<col width="50%" />
											<col width="50%" />
										</colgroup>
										<tr>
											<th>준공연도/리모델링</th>
											<td>2022-01-01 / 2022-01-01</td>
										</tr>
										<tr>
											<th class="txt-c--red">승강기</th>
											<td class="txt-c--red">1대</td>
										</tr>
										<tr>
											<th>냉/난방식</th>
											<td>개별 냉/난방</td>
										</tr>
										<tr>
											<th>규모</th>
											<td>지하1층 / 지상10층</td>
										</tr>
										<tr>
											<th>주차방식/대수</th>
											<td>자주식 / 10대</td>
										</tr>
										<tr>
											<th>연면적</th>
											<td>11.11[10평]</td>
										</tr>
										<tr>
											<th>건축면적</th>
											<td>11.11[10평]</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
						<div class="section-tit mt-4">특징</div>
						<ul class="dot-list">
							<li class="dot-list--item">특징1</li>
							<li class="dot-list--item">특징2</li>
							<li class="dot-list--item">특징3</li>
						</ul>
					</div>
				</div>
				9. 비교
				<div name="capture" id="capture_8" class="print-section flex2-1">
					<div class="left">
						<div class="print-tit">COMPARABLE(비교)</div>
						<div class="table-wrap">
							<table class="table type-input">
								<colgroup>
									<col width="25%" />
									<col width="25%" />
									<col width="25%" />
									<col width="25%" />
								</colgroup>
								<tr>
									<th>빌딩명</th>
									<th>ㅇㅇ빌딩</th>
									<th>ㅁㅁ빌딩</th>
									<th>ㅅㅅ빌딩</th>
								</tr>
								<tr>
									<th>사진</th>
									<td>사진</td>
									<td>사진</td>
									<td>사진</td>
								</tr>
								<tr>
									<th>주소</th>
									<td>00시</td>
									<td>00시</td>
									<td>00시</td>
								</tr>
								<tr>
									<th class="txt-c--red">보증금</th>
									<td class="txt-c--red">1만원</td>
									<td class="txt-c--red">1만원</td>
									<td class="txt-c--red">1만원</td>
								</tr>
								<tr>
									<th class="txt-c--red">월임대료</th>
									<td class="txt-c--red">1만원</td>
									<td class="txt-c--red">1만원</td>
									<td class="txt-c--red">1만원</td>
								</tr>
								<tr>
									<th>관리비</th>
									<td>1만원</td>
									<td>1만원</td>
									<td>1만원</td>
								</tr>
								<tr>
									<th class="txt-c--red">월 고정비</th>
									<td class="txt-c--red">1만원</td>
									<td class="txt-c--red"></td>
									<td class="txt-c--red"></td>
								</tr>
								<tr>
									<th class="txt-c--red">전용면적</th>
									<td class="txt-c--red">10㎡(10평)</td>
									<td class="txt-c--red"></td>
									<td class="txt-c--red"></td>
								</tr>
								<tr>
									<th>전용률</th>
									<td>10%</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<th>임대면적</th>
									<td>10㎡(10평)</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<th>층정보</th>
									<td>1층 전체</td>
									<td>1층 전체</td>
									<td>1층 전체</td>
								</tr>
								<tr>
									<th class="txt-c--red">평당임대료</th>
									<td class="txt-c--red">15만원</td>
									<td class="txt-c--red"></td>
									<td class="txt-c--red"></td>
								</tr>
								<tr>
									<th>입주현황</th>
									<td>즉시입주</td>
									<td>즉시입주</td>
									<td>협의</td>
								</tr>
								<tr>
									<th>주차(유료/무료)</th>
									<td>유료1대/무료2대</td>
									<td>유료1대/무료2대</td>
									<td>유료1대/무료2대</td>
								</tr>
								<tr>
									<th>화장실 유형</th>
									<td>개별 냉난방</td>
									<td>중앙 냉난방</td>
									<td>개별 냉난방</td>
								</tr>
								<tr>
									<th>인테리어</th>
									<td>철거완료</td>
									<td>철거완료</td>
									<td>철거완료</td>
								</tr>
								<tr>
									<th>렌트프리</th>
									<td>렌트프리3개월</td>
									<td>렌트프리3개월</td>
									<td>-</td>
								</tr>
								<tr>
									<th class="txt-c--red">주변역/거리</th>
									<td class="txt-c--red">역삼역(2호선) 300m</td>
									<td class="txt-c--red">역삼역(2호선) 300m</td>
									<td class="txt-c--red">역삼역(2호선) 300m</td>
								</tr>
								<tr>
									<th class="txt-c--red">승강기</th>
									<td class="txt-c--red">1대</td>
									<td class="txt-c--red"></td>
									<td class="txt-c--red"></td>
								</tr>
								<tr>
									<th>준공년도/리모델링</th>
									<td>2022.01.01</td>
									<td>2022.01.01</td>
									<td>2022.01.01</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="right">
						<div class="section-tit">서울 강남구</div>
						<div class="map-wrap"></div>
						<div class="table-wrap">
							<div class="txt-right txt-size--sm mb-1">단위:원</div>
							<table class="table type-input">
								<tr>
									<th>NO.</th>
									<th>빌딩이름</th>
									<th>전용면적</th>
									<th>보증금</th>
									<th>월임대료</th>
									<th>관리비</th>
									<th>월고정비</th>
								</tr>
								<tr>
									<td>01</td>
									<td>유진빌딩(지하2~지상6층)</td>
									<td>20평</td>
									<td>60000</td>
									<td>60000</td>
									<td>포함</td>
									<td>60000</td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				-->
			</div>
		</div>
		<div v-if="isPopupShow1" class="popup-wrap">
			<div class="dim" @click="isPopupShow1 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					매매사례등록
					<button type="button" class="btn btn-close" @click="isPopupShow1 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<div class="input-wrap">
						<input
							type="text"
							class="form-control"
							placeholder="물건명, 주소, 소유자, 전소유자, 전화번호"
							v-model="searchInfo.keyword"
							@keyup.enter="getBuildingList(1)"
						/>
						<button type="button" class="btn btn-sm btn-secondary" @click="getBuildingList(1)">검색</button>
					</div>
					<div class="table-wrap mt-3">
						<span class="txt-c--red">※ 검색물건목록</span>
						<table class="table mt-2 click">
							<tr>
								<th>물건번호</th>
								<th>상태</th>
								<th>물건명/주소</th>
								<th>추가</th>
							</tr>
							<tr v-for="b in buildingList" :key="'bubu_' + b.bid">
								<td>{{ b.bid }}</td>
								<td>{{ $ITEM_STATE[b.state] }}</td>
								<td>{{ b.building_name }} / {{ b.jibun_addr }}</td>
								<td>
									<button type="button" class="btn btn-xsm txt-c--blue" @click="btnOnLinkAdd(b.bid)">
										<b-icon-plus-circle />
									</button>
								</td>
							</tr>
						</table>
					</div>
					<ul
						class="pagination b-pagination pagination-sm"
						v-if="buildingPage.pageData != null && buildingPage.pageData.list.length"
					>
						<li class="page-item" v-bind:class="{ disabled: 1 == buildingPage.page }">
							<button type="button" class="page-link" @click="getBuildingList(1)">
								<b-icon-chevron-double-left />
							</button>
						</li>

						<li class="page-item" v-bind:class="{ disabled: buildingPage.pageData.first == null }">
							<button
								type="button"
								class="page-link"
								@click="buildingPage.pageData.first !== null ? getBuildingList(buildingPage.pageData.first) : ''"
							>
								<b-icon-chevron-left />
							</button>
						</li>
						<li
							v-for="pg in buildingPage.pageData.list"
							v-bind:key="'pg_' + pg"
							class="page-item"
							v-bind:class="{ active: buildingPage.pageData.currentPage == pg }"
						>
							<button type="button" class="page-link" @click="getBuildingList(pg)">{{ pg }}</button>
						</li>
						<li class="page-item" v-bind:class="{ disabled: buildingPage.pageData.end == null }">
							<button
								type="button"
								class="page-link"
								@click="buildingPage.pageData.end !== null ? getBuildingList(buildingPage.pageData.end) : ''"
							>
								<b-icon-chevron-right />
							</button>
						</li>

						<li class="page-item" v-bind:class="{ disabled: buildingPage.pageData.totalPage == buildingPage.page }">
							<button type="button" class="page-link" @click="getBuildingList(buildingPage.pageData.totalPage)">
								<b-icon-chevron-double-right />
							</button>
						</li>
					</ul>
					<div class="table-wrap mt-3">
						<span class="txt-c--red">※ 연결물건목록</span>
						<table class="table mt-2 click">
							<tr>
								<th>물건번호</th>
								<th>상태</th>
								<th>물건명/주소</th>
								<th>삭제</th>
							</tr>
							<tr v-for="b in linkList" :key="'bububu_' + b.id">
								<td>{{ b.building_uid }}</td>
								<td>{{ $ITEM_STATE[b.state] }}</td>
								<td>{{ b.building_name }} / {{ b.jibun_addr }}</td>
								<td>
									<button type="button" class="btn btn-xsm txt-c--red" @click="btnOnLinkDel(b.id)">
										<b-icon-trash />
									</button>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow7" class="popup-wrap">
			<div class="dim" @click="isPopupShow7 = false"></div>
			<div class="popup lg">
				<div class="popup-tit">
					물건사진
					<button type="button" class="btn btn-close" @click="isPopupShow7 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<ul class="photo-list">
						<li v-for="num in Array.from({ length: 10 }, (_, i) => i)" class="photo-list--item" :key="'imgl_' + num">
							<label class="file">
								<div class="img">
									<img
										v-if="isMarkItem.veiwSrc[num]"
										:src="isMarkItem.veiwSrc[num]"
										alt=""
										style="width: 100%; height: 100%"
										@click="btnOnImg(isMarkItem, num)"
									/>
								</div>
							</label>
							<div class="text">{{ $IMG_NAME[num] }}</div>
						</li>
					</ul>
					<ul class="photo-list">
						<li
							v-for="num in Array.from({ length: 10 }, (_, i) => i + 10)"
							class="photo-list--item"
							:key="'imgl_' + num"
						>
							<label class="file">
								<div class="img">
									<img
										v-if="isMarkItem.veiwSrc[num]"
										:src="isMarkItem.veiwSrc[num]"
										alt=""
										style="width: 100%; height: 100%"
										@click="btnOnImg(isMarkItem, num)"
									/>
								</div>
							</label>
							<div class="text">{{ $IMG_NAME[num] }}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow8" class="popup-wrap">
			<div class="dim" @click="isPopupShow8 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					사진
					<button type="button" class="btn btn-close" @click="isPopupShow8 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<tr>
							<th>제목</th>
							<td colspan="3">
								<input class="form-control" type="text" placeholder="제목" v-model="imgTemp.title" />
							</td>
						</tr>
						<tr>
							<th>이미지 파일</th>
							<td colspan="3">
								<input type="file" class="" accept="image/*" @change="fileFile" />
							</td>
						</tr>
						<!-- <tr>
							<th>내용</th>
							<td>
								<textarea class="" v-model="imgTemp.more" />
							</td>
						</tr> -->
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-btn btn-sm btn-secondary" @click="isPopupShow8 = false">취소</button>
						<button type="button" class="btn btn-sm btn-primary" @click="imgAddSave">추가</button>
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
			map_1: null,
			marker_1: null,

			map_2: null,
			marker_2: null,
			mapType: null,

			indexList: [],
			capIdList: [],

			opAll: true,
			opAll2: true,
			opList: [
				{ st: true, edit: false, title: 'INTRO', type: 0 },
				{ st: false, edit: false, title: '물건개요', type: 0 },
				{ st: false, edit: false, title: '임대정보', type: 0 },
				{ st: false, edit: false, title: '건축물정보', type: 0 },
				{ st: false, edit: false, title: '건축 내/외부 사진', type: 0 },
				{ st: false, edit: false, title: '지도', type: 0 },

				{ st: false, edit: false, title: '인근매각사례 TYPE A', type: 1 },
				{
					st: false,
					edit: false,
					title: '인근매각사례 TYPE B',
					type: 1,
					data: { moreST: 0, more: '' },
				},
				{ st: false, st2: -1, edit: false, title: '개요 TYPE 3', type: 1 },
				{ st: false, edit: false, title: '인근 VIEW', type: 1 },
				{ st: false, st2: -1, edit: false, title: '주변 사진 TYPE 2', type: 1 },
				{
					st: false,
					edit: false,
					title: '현재 수익률',
					type: 1,
				},
				{ st: false, edit: false, title: '레버리지 수익률 및 필요자금 산출', type: 1 },
				{ st: false, edit: false, title: '예상임대수익 및 MD구성', type: 1 },
				{ st: false, edit: false, title: '대출 비중에 따른 필요자금 분석', type: 1 },
				{ st: false, edit: false, title: '세전/세후 매각차익 분석(법인 기준)', type: 1 },

				{ st: false, edit: false, title: '추가 사진 - 1', type: 1 },
				{ st: false, edit: false, title: '추가 사진 - 2', type: 1 },
				{ st: false, edit: false, title: '추가 사진 - 3', type: 1 },

				{ st: false, edit: false, title: '목차', type: 0 },
			],

			exData: [
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '① + ②', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: '', st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: '예상 임대료', st2: false },
				{ val1: 0, st1: false, val2: '자체관리', st2: false },
				{ val1: 0, st1: false, val2: '자체관리', st2: false },
				{ val1: 0, st1: false, val2: '', st2: false },
				{ val1: 4.6, st1: false, val2: '', st2: false },
				{ val1: 0.9, st1: false, val2: '', st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false },

				{ val1: '', st1: false, val2: '', st2: false }, //설명1	29
				{ val1: '', st1: false, val2: '', st2: false }, //설명2 30
				{ val1: '', st1: false, val2: '', st2: false }, //설명3 31

				{ val1: 0, st1: false, val2: 60, st2: false }, //대출원금 32
				{ val1: 0, st1: false, val2: 0, st2: false }, //리모델링 33
				{ val1: 0, st1: false, val2: 4.1, st2: false }, //이자 34
				{ val1: 0, st1: false, val2: 80, st2: false },
				{ val1: 0, st1: false, val2: 80, st2: false },
				{ val1: 0, st1: false, val2: 4.1, st2: false }, //37 이자
				{ val1: 0, st1: false, val2: 0, st2: false }, //38 대출

				{ val1: 0, st1: false, val2: 4.2, st2: false }, //39 이자
				{ val1: 0, st1: false, val2: 4.3, st2: false }, //40 이자

				{ val1: 0, st1: false, val2: 0, st2: false }, //41 취득세
				{ val1: 0, st1: false, val2: 0, st2: false }, //42
				{ val1: 0, st1: false, val2: 0, st2: false }, //43
				{ val1: 0, st1: false, val2: 0, st2: false }, //44

				{ val1: 0, st1: false, val2: 0, st2: false }, //45 대출원금

				{ val1: 0, st1: false, val2: 0, st2: false }, //46 법인세율
				{ val1: 0, st1: false, val2: 0, st2: false }, //보유기간
				{ val1: 0, st1: false, val2: 0, st2: false }, //48
				{ val1: '', st1: false, val2: 0, st2: false }, //49

				{ val1: ['', '', '', '', '', '', '', ''], st1: false, val2: ['', '', '', '', '', '', '', ''], st2: false }, //50

				{ val1: 0, st1: false, val2: 60, st2: false }, //51	대출비중 - 대출금
				{ val1: 0, st1: false, val2: 80, st2: false }, //52	대출비중 - 대출금
				{ val1: 0, st1: false, val2: 4, st2: false },
				{ val1: 0, st1: false, val2: 4, st2: false },
				{ val1: '', st1: false, val2: 0, st2: false },
				{ val1: 0, st1: false, val2: 0, st2: false }, //56

				{ val1: 0, st1: false, val2: 0, st2: false }, //57
				{ val1: 0, st1: false, val2: 0, st2: false }, //58
				{ val1: 0, st1: false, val2: 0, st2: false }, //59
			],
			exFloorList: [],

			opList_: [
				false, //인트로
				false, //물건개요
				false, //임대정보
				false, //건축물정보
				false, //건축 내/외부 사진
				false, //지도

				true, //사례-개요 TYPE 1
				false,
				false,
				false,
				false,
				false,
				false,
				false,
				false,

				false,
				false,
				false,
			],

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

			mapEx_0: null,
			mapEx_1: null,

			isExId: null,
			exMap: {
				ex_1: {
					type: 'drag',
					dragIndex: null,
					imgData: [],

					map: null,
					markers: [],
				},
				ex_1_ex: {
					type: 'drag',
					dragIndex: null,
					imgData: [],

					map: null,
					markers: [],
				},
				ex_2: {
					type: 'basic',
					dragIndex: null,
					imgData: [],

					map: null,
					markers: [],
				},
				ex_3: {
					type: 'drag',
					dragIndex: null,
					imgData: [],

					map: null,
					markers: [],
				},
				ex_3_ex: {
					type: 'drag',
					dragIndex: null,
					imgData: [],

					map: null,
					markers: [],
					markers2: [],
				},
				ex_4: {
					key: 'ex_4',
					type: 'add',
					dragIndex: null,
					imgData: [],
					imgData2: [],

					map: null,
					markers: [],
					markers2: [],
				},
				ex_5: {
					key: 'ex_5',
					type: 'add',
					dragIndex: null,
					imgData: [],
					imgData2: [],

					map: null,
					markers: [],
					markers2: [],
				},
			},
			exMarkList: [],

			draggingIndex: null,
			images: [
				{ src: 'image1.jpg', top: 50, right: 0 },
				{ src: 'image2.jpg', top: 100, right: 100 },
			],

			dragIndex: null,
			movingOffsetX: null,
			movingOffsetY: null,

			isPopupShow1: false,
			isPopupShow7: false,
			isPopupShow8: false,
			buildingPage: {
				page: 1,
				pageData: null,
				totalCount: null,
				itemSize: 5,
				blockSize: 5,
			},
			buildingList: [],
			linkList: [],
			linkDataList: [],
			isMarkItem: null,
			searchInfo: {
				keyword: '',
			},

			imgList: [
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },

				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
				{ file: null, src: null, fileSrc: null, veiwSrc: null, id: null },
			],

			isItemTemp: null,
			isEventTemp: null,
			imgTemp: {
				title: '',
				imgSrc: '',
			},

			imgPageList: [null, null, null],
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
				this.userInfo = re;
				// if (re) {
				// 	this.$store.dispatch('callSetUserInfo', re);
				// }
			});
		},
		loadMap() {
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
		loadExMap() {
			this.$nextTick(() => {
				const btnOnEx2 = this.btnOnEx2;

				for (let key in this.exMap) {
					const isItem = this.exMap[key];
					isItem.map = new window.naver.maps.Map('map_' + key, {
						center: new window.naver.maps.LatLng(37.5112, 127.0981),
						zoom: 16,
					});

					// isItem.drag
					if (isItem.type == 'drag') {
						new window.naver.maps.Event.addListener(isItem.map, 'dragstart', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'dragend', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'idle', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'zoom_changed', this.updateLine);
					} else if (isItem.type == 'add') {
						new window.naver.maps.Event.addListener(isItem.map, 'dragstart', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'dragend', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'idle', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'zoom_changed', this.updateLine);
						new window.naver.maps.Event.addListener(isItem.map, 'click', function (e) {
							btnOnEx2(e, isItem);
						});
					}
				}

				// this.mapEx_1 = new window.naver.maps.Map('map_ex_1', {
				// 	center: new window.naver.maps.LatLng(37.5112, 127.0981),
				// 	zoom: 16,
				// });

				// this.mapEx_0 = new window.naver.maps.Map('map_ex_0', {
				// 	center: new window.naver.maps.LatLng(37.5112, 127.0981),
				// 	zoom: 16,
				// });

				// new window.naver.maps.Event.addListener(this.mapEx_1, 'dragend', function (pointerEvent) {
				// 	// isDrag = false;
				// 	// 드래그가 끝날 때, bounds_changed 이벤트를 호출
				// 	// naver.maps.Event.trigger(map, 'bounds_changed');

				// 	console.log(pointerEvent);
				// });

				this.$apiGET('/admin/api/ex/get?bid=' + this.bid).then(data => {
					this.linkList = data;

					this.getLinkData();
				});
			});
		},
		async copyChartImg() {
			for (let i = 0; i < this.opList.length; i++) {
				this.opList[i].edit = false;
			}

			for (let i = 0; i < this.exData.length; i++) {
				this.exData[i].st1 = false;
				this.exData[i].st2 = false;
			}

			this.$apiPOST('/admin/api/detail/item/print', { bidList: [this.bid] }).then(() => {});

			await this.$exportPrint(this.capIdList);
		},
		updateIndex() {
			this.indexList = [];
			let idx = 1;
			for (let i = 1; i < this.opList.length; i++) {
				if (this.opList[i].st) {
					this.indexList.push({
						idx: '0' + idx + '. ',
						title: this.opList[i].title,
					});
					idx++;
				}
			}
		},
		getItem() {
			this.$apiGET('/admin/api/detail/item?bid=' + this.bid + '&isRent=false').then(data => {
				if (this.$route.query.st == 'true') {
					data.sell_price = Number(this.$route.query.sell_price);
					data.land_price = Number(this.$route.query.land_price);
					data.land_size_py_price = Number(this.$route.query.land_size_py_price);
					data.building_price = Number(this.$route.query.building_price);
					data.building_price_py_price = Number(this.$route.query.building_price_py_price);
					data.total_size_py_price = Number(this.$route.query.total_size_py_price);
					data.ex_sum_rent_deposit = Number(this.$route.query.ex_sum_rent_deposit);
					data.ex_sum_rent_money = Number(this.$route.query.ex_sum_rent_money);
					data.ex_sum_mgr_fee = Number(this.$route.query.ex_sum_mgr_fee);
					data.ex_sum_mgr_fee_out = Number(this.$route.query.ex_sum_mgr_fee_out);
					data.total_income = Number(this.$route.query.total_income);
					data.total_income_rate = Number(this.$route.query.total_income_rate);
				}

				for (let prop in data) {
					if (data[prop] == null) {
						data[prop] = '';
					}
				}

				data.img = null;

				//썸네일
				for (let i = 0; i < data.imgList.length; i++) {
					if (data.imgList[i]) {
						data.img = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + data.imgList[i];
						break;
					}
				}

				//이미지 리스트
				let imgObjList = [];
				for (let i = 0; i < data.imgList.length; i++) {
					if (data.imgList[i]) {
						imgObjList.push({
							name: this.$IMG_NAME[i],
							img: process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + data.imgList[i],
							st: true,
						});
					}
				}
				data.imgObjList = imgObjList;

				for (let i = 0; i < data.imgList.length; i++) {
					if (data.imgList[i]) {
						this.imgList[i].src = data.imgList[i];
						this.imgList[i].veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + data.imgList[i];
					}
				}

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

				this.exData[51].val1 = this.item.sell_price * this.exData[51].val2 * 0.01;
				this.exData[52].val1 = this.item.sell_price * this.exData[52].val2 * 0.01;

				this.updateIndex();

				setTimeout(
					function () {
						this.loadMap();
						this.loadExMap();
					}.bind(this),
					250,
				);
			});
		},
		updateId() {
			// let data = JSON.parse(JSON.stringify(this.item));
			let data = this.item;

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

				// for (let key in this.exMap) {
				// 	const isItem = this.exMap[key];
				// 	new window.naver.maps.Event.trigger(isItem.map, 'resize');
				// }

				for (let key in this.exMap) {
					const isItem = this.exMap[key];
					new window.naver.maps.Event.trigger(isItem.map, 'resize');

					const bounds = new window.naver.maps.LatLngBounds();
					this.linkDataList.forEach(({ pt }) => {
						bounds.extend(pt);
					});

					isItem.map.fitBounds(bounds);
				}
			});

			this.updateIndex();
		},
		getRent() {
			this.$apiGET('/admin/api/detail/item/rent?bid=' + this.bid).then(data => {
				this.rentList = data;
				let m2 = 0;
				let py = 0;
				let deposit = 0;
				let money = 0;
				let mgr = 0;
				// let rent_ni = 0;

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
					// rent_ni += Number(this.rentList[i].rent_ni);
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

				this.totalData.rent_ni = (Number(this.totalData.money) / Number(this.totalData.py)).toFixed(2);
			});
		},
		getFloor() {
			this.$apiGET('/admin/api/detail/item/floor?bid=' + this.bid).then(data => {
				this.floorList = data;
				let m2 = 0;
				let py = 0;

				for (let i = 0; i < this.floorList.length; i++) {
					m2 += Number(this.floorList[i].area_m2);
					py += Number(this.floorList[i].area_py);

					this.exFloorList.push({
						id: this.floorList[i].building_floor_uid,
						st: false,
						flrNoNm: this.floorList[i].flrNoNm,
						use: '',
						rentPy: this.floorList[i].area_py,
						// pyToPrice: 0,
						deposit: 0,
						money: 0,
						mgrFee: 0,
						rent_ni: 0,
						memo: '',
					});
				}

				this.totalFloorData.m2 = m2.toFixed(2);
				this.totalFloorData.py = py.toFixed(2);
			});
		},
		setAllCheck(type) {
			for (let i = 0; i < this.opList.length; i++) {
				if (this.opList[i]?.st2 == -1) {
					continue;
				}

				if (this.opList[i].type != type) {
					continue;
				}

				this.opList[i].st = type == 0 ? this.opAll : this.opAll2;
			}
			this.updateId();
		},

		// onDrop(event) {
		// 	if (this.draggingIndex !== null) {
		// 		const dropAreaBounds = this.$refs.dropArea.getBoundingClientRect();

		// 		console.log(dropAreaBounds);

		// 		console.log(event);
		// 		const dropX = event.screenX - dropAreaBounds.left; // 드롭 위치의 X 좌표
		// 		const dropY = event.screenY - dropAreaBounds.top; // 드롭 위치의 Y 좌표
		// 		// this.$set(this.images, this.draggingIndex, {
		// 		// 	...this.images[this.draggingIndex],
		// 		// 	left: dropX,
		// 		// 	top: dropY,
		// 		// });

		// 		this.images[this.draggingIndex].left = dropX;
		// 		this.images[this.draggingIndex].top = dropY;
		// 		this.draggingIndex = null; // 드래그 상태 초기화
		// 	}
		// },
		handleDragStart(event, idx, id) {
			// console.log('handleDragStart ', idx, id);
			if (this.$refs['grap_' + id + '_' + idx][0].classList.value.indexOf('grap-ing') == -1) {
				this.$refs['grap_' + id + '_' + idx][0].classList.value =
					this.$refs['grap_' + id + '_' + idx][0].classList.value + ' grap-ing';
			}
			// this.$refs[field].$el.classList.value = this.$refs[field].$el.classList.value + 'my-class'
			// const dragData = this.exMap[id].dragIndex;

			// this.dragIndex = idx;
			this.exMap[id].dragIndex = idx;
			this.movingOffsetX = event.screenX;
			this.movingOffsetY = event.screenY;
			event.dataTransfer.effectAllowed = 'move';
		},
		getMarkerScreenPosition(isItem, key, i) {
			if (!isItem.map.getProjection()) return { x: 0, y: 0 }; // projection이 없으면 0 리턴

			const mm_ = document.getElementById('mk_' + key + '_' + i);

			const mm = mm_.getBoundingClientRect();
			const x = mm.left + mm.width / 2;
			const y = mm.top + mm.height + 6;

			// console.log(mm.getBoundingClientRect());

			// const proj = this.mapEx_1.getProjection();
			// const latlng = marker.getPosition();
			// const point = proj.fromCoordToOffset(latlng);

			const mapContainer = document.getElementById('con_' + key);
			const mapRect = mapContainer.getBoundingClientRect();

			return { x: x - mapRect.left, y: y - mapRect.top };

			// const mapContainer = document.getElementById('map-container');
			// const mapRect = mapContainer.getBoundingClientRect(); // 지도 컨테이너 위치
			// return {
			// 	x: point.x - mapRect.left,
			// 	y: point.y - mapRect.top,
			// };
		},
		updateLine() {
			//////////////////////////////////////////////////////////////////////////////////////////
			// console.log(item.marker.getContainerTopLeft());

			this.$nextTick(() => {
				for (let key in this.exMap) {
					const isItem = this.exMap[key];

					for (let i = 0; i < isItem.imgData.length; i++) {
						if (isItem.imgData[i].imgIdx == null) {
							continue;
						}

						const line = document.getElementById('line_' + key + +i);
						const mapContainer = document.getElementById('con_' + key);

						// const marker = this.linkDataList[i].marker;

						const markerPos = this.getMarkerScreenPosition(isItem, key, i);

						const imgRect = this.$refs['grap_' + key + '_' + i][0].getBoundingClientRect();
						const mapRect = mapContainer.getBoundingClientRect();

						const x1 = markerPos.x;
						const y1 = markerPos.y;
						const x2 = imgRect.left + imgRect.width / 2 - mapRect.left;
						const y2 = imgRect.top + imgRect.height / 2 - mapRect.top;

						const dx = x2 - x1;
						const dy = y2 - y1;
						const length = Math.sqrt(dx * dx + dy * dy);
						const angle = Math.atan2(dy, dx) * (180 / Math.PI);

						line.style.left = `${x1}px`;
						line.style.top = `${y1}px`;
						line.style.width = `${length}px`;
						line.style.transform = `rotate(${angle}deg)`;
					}

					if (isItem.type == 'add') {
						for (let i = 0; i < isItem.imgData2.length; i++) {
							// if (isItem.imgData2[i].imgIdx == null) {
							// 	continue;
							// }

							const line = document.getElementById('line_' + key + +i);
							const mapContainer = document.getElementById('con_' + key);

							// const marker = this.linkDataList[i].marker;

							const markerPos = this.getMarkerScreenPosition(isItem, key, i);

							const imgRect = this.$refs['grap_' + key + '_' + i][0].getBoundingClientRect();
							const mapRect = mapContainer.getBoundingClientRect();

							const x1 = markerPos.x;
							const y1 = markerPos.y;
							const x2 = imgRect.left + imgRect.width / 2 - mapRect.left;
							const y2 = imgRect.top + imgRect.height / 2 - mapRect.top;

							const dx = x2 - x1;
							const dy = y2 - y1;
							const length = Math.sqrt(dx * dx + dy * dy);
							const angle = Math.atan2(dy, dx) * (180 / Math.PI);

							line.style.left = `${x1}px`;
							line.style.top = `${y1}px`;
							line.style.width = `${length}px`;
							line.style.transform = `rotate(${angle}deg)`;
						}
					}
				}
			});

			//////////////////////////////////////////////////////////////////////////////////////////
		},
		handleDrop(event, id) {
			const idx = this.exMap[id].dragIndex;

			this.$refs['grap_' + id + '_' + idx][0].classList.value = 'img-wrap';

			const imgData = this.exMap[id].imgData;

			const x = this.movingOffsetX - event.screenX;
			const y = this.movingOffsetY - event.screenY;
			// this.linkDataList[this.dragIndex].right = this.linkDataList[this.dragIndex].right + x;
			// this.linkDataList[this.dragIndex].top = this.linkDataList[this.dragIndex].top - y;

			imgData[idx].right = imgData[idx].right + x;
			imgData[idx].top = imgData[idx].top - y;

			// this.dragIndex = null;
			this.exMap[id].dragIndex = null;

			this.updateLine();
		},
		handleDrop2(event, id) {
			// console.log(event, id);
			const idx = this.exMap[id].dragIndex;

			this.$refs['grap_' + id + '_' + idx][0].classList.value = 'img-wrap';

			const imgData = this.exMap[id].imgData2;

			const x = this.movingOffsetX - event.screenX;
			const y = this.movingOffsetY - event.screenY;
			// this.linkDataList[this.dragIndex].right = this.linkDataList[this.dragIndex].right + x;
			// this.linkDataList[this.dragIndex].top = this.linkDataList[this.dragIndex].top - y;

			imgData[idx].right = imgData[idx].right + x;
			imgData[idx].top = imgData[idx].top - y;

			// this.dragIndex = null;
			this.exMap[id].dragIndex = null;

			this.updateLine();
		},
		handleDragOver(event) {
			event.preventDefault();
		},
		getBuildingList(pg) {
			this.$apiGET(
				'/admin/api/user/admin/detail/building?page=' +
					(pg - 1) * this.buildingPage.itemSize +
					'&keyword=' +
					this.searchInfo.keyword,
			).then(data => {
				this.buildingList = data.item;

				this.buildingPage.totalCount = data.pageInfo.totalCount;
				this.buildingPage.page = pg;
				this.buildingPage.pageData = this.$pageDataSetting(
					this.buildingPage.totalCount,
					this.buildingPage.itemSize,
					this.buildingPage.blockSize,
					this.buildingPage.page,
				);
			});
		},
		btnOnEx2(event, isItem) {
			this.isEventTemp = event;
			this.isItemTemp = isItem;
			this.imgTemp = {
				title: null,
				imgSrc: null,
				top: 0,
				right: 0,
			};

			this.isPopupShow8 = true;
		},
		async fileFile(e) {
			if (!e.target.files.length) {
				return;
			}
			this.imgTemp.imgSrc = await this.$fileToBase64(e.target.files[0]);
			// this.fileObj = e.target.files[0];
		},
		async fileFile2(e, idx) {
			if (!e.target.files.length) {
				return;
			}
			this.imgPageList[idx] = await this.$fileToBase64(e.target.files[0]);
			// this.fileObj = e.target.files[0];
		},
		imgAddSave() {
			if (!this.imgTemp.title) {
				alert('제목을 입력해 주세요.');
				return;
			}

			if (!this.imgTemp.imgSrc) {
				alert('이미지를 추가해 주세요.');
				return;
			}

			// if (!this.imgTemp.more) {
			// 	this.imgTemp.more = '';
			// } else {
			// 	this.imgTemp.more = this.imgTemp.more.replaceAll(/(\n|\r\n)/g, '<br>');
			// }

			const marker = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(this.isEventTemp.coord.y, this.isEventTemp.coord.x),
				map: this.isItemTemp.map,
			});

			marker.setIcon({
				icon: 'HtmlIcon',
				content: `<span id=${'mk_' + this.isItemTemp.key + '_' + this.isItemTemp.markers2.length} class="pin color-${
					this.isItemTemp.markers2.length + 1
				}"><span class="num">x</span></span>`,
			});

			this.isItemTemp.markers2.push(marker);

			// marker.setIcon({
			// 	icon: 'HtmlIcon',
			// 	content: `<span id=${'mk_' + key + '_' + 0} class="pin color-${'5'}"><span class="num">${'M'}</span></span>`,
			// });

			this.isItemTemp.imgData2.push(this.imgTemp);

			this.updateLine();
			this.isPopupShow8 = false;
		},
		imgDelSave(isItem, idx) {
			isItem.imgData2.splice(idx, 1);
			isItem.markers2[idx].setMap(null);
			isItem.markers2.splice(idx, 1);
		},
		btnOnEx() {
			this.$apiGET('/admin/api/ex/get?bid=' + this.bid).then(data => {
				this.linkList = data;

				this.isPopupShow1 = true;

				this.getLinkData();
			});
		},
		btnOnLinkAdd(bid) {
			this.$apiPOST('/admin/api/ex/add', {
				bid: this.bid,
				building_uid: bid,
			}).then(re => {
				if (re) {
					this.btnOnEx();
					alert('등록 완료');
				}
			});
		},
		btnOnLinkDel(id) {
			this.$apiPOST('/admin/api/ex/del', {
				id: id,
			}).then(re => {
				if (re) {
					this.btnOnEx();
				}
			});
		},
		btnOnMark(idx, id) {
			this.isMarkItem = this.linkDataList[idx]; //???
			this.isExId = id;
			this.isPopupShow7 = true;
		},
		btnOnImg(item, num) {
			// const dragData = this.exMap[this.isExId].dragData;
			const imgData = this.exMap[this.isExId].imgData;

			for (let i = 0; i < imgData.length; i++) {
				if (imgData[i].id == item.building_uid) {
					imgData[i].imgIdx = num;
					break;
				}
			}

			// dragData.imgIdx = num;
			// item.imgIdx = num;
			this.updateLine();
			this.isPopupShow7 = false;
		},
		async getLinkData() {
			const btnOnMark = this.btnOnMark;
			let st = true;

			// for (let i = 0; i < this.linkDataList.length; i++) {
			// 	this.linkDataList[i].marker.setMap(null);
			// }
			this.linkDataList = [];
			this.item.imgIdx = null;
			this.item.right = 0;
			this.item.top = 0;

			this.item.veiwSrc = [];

			for (let x = 0; x < this.item.imgList.length; x++) {
				// const veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + this.item.imgList[x];
				let veiwSrc = null;
				if (this.item.imgList[x] != null) {
					// veiwSrc = 'http://1.234.70.62:3000' + '/users/item/image?id=' + this.item.imgList[x];
					veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + this.item.imgList[x];
				}

				this.item.veiwSrc.push(veiwSrc);
			}

			for (let key in this.exMap) {
				const isItem = this.exMap[key];

				isItem.markers.forEach(marker => {
					marker.setMap(null);
				});

				const marker = new window.naver.maps.Marker({
					position: new window.naver.maps.LatLng(this.item.pt.y, this.item.pt.x),
					map: isItem.map,
				});

				if (isItem.type == 'drag') {
					marker.setIcon({
						icon: 'HtmlIcon',
						content: `<span id=${
							'mk_' + key + '_' + 0
						} class="pin color-${'5'}"><span class="num">${'M'}</span></span>`,
					});

					new window.naver.maps.Event.addListener(marker, 'click', () => {
						const idx = 0;
						btnOnMark(idx, key);
					});
				} else {
					marker.setIcon({
						icon: 'HtmlIcon',
						content: `<span class="pin color-${'5'}"><span class="num">${'M'}</span></span>`,
					});
				}

				isItem.imgData.push({
					id: this.item.building_uid,
					veiwSrc: this.item.veiwSrc,
					imgIdx: null,
					right: 0,
					top: 0,
				});

				isItem.markers.push(marker);

				if (st) {
					st = false;
					// this.item.marker = marker;
					this.linkDataList.push(this.item);
				}
			}

			for (let i = 0; i < this.linkList.length; i++) {
				const item = await this.$apiGET(
					'/admin/api/detail/item?bid=' + this.linkList[i].building_uid + '&isRent=false',
				);

				item.veiwSrc = [];

				for (let x = 0; x < item.imgList.length; x++) {
					// const veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + item.imgList[x];
					let veiwSrc = null;
					if (item.imgList[x] != null) {
						// veiwSrc = 'http://1.234.70.62:3000' + '/users/item/image?id=' + item.imgList[x];
						veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + item.imgList[x];
					}

					item.veiwSrc.push(veiwSrc);
				}

				for (let key in this.exMap) {
					const isItem = this.exMap[key];
					const marker = new window.naver.maps.Marker({
						position: new window.naver.maps.LatLng(item.pt.y, item.pt.x),
						map: isItem.map,
					});

					if (isItem.type == 'drag') {
						marker.setIcon({
							icon: 'HtmlIcon',
							content: `<span id=${'mk_' + key + '_' + +(i + 1)}  class="pin color-${i + 1}"><span class="num">${
								i + 1
							}</span></span>`,
						});

						new window.naver.maps.Event.addListener(marker, 'click', () => {
							const idx = i + 1;
							btnOnMark(idx, key);
						});
					} else {
						marker.setIcon({
							icon: 'HtmlIcon',
							content: `<span  class="pin color-${i + 1}"><span class="num">${i + 1}</span></span>`,
						});
					}

					isItem.markers.push(marker);
					isItem.imgData.push({
						id: item.building_uid,
						veiwSrc: item.veiwSrc,
						imgIdx: null,
						right: 0,
						top: 0,
					});
				}

				item.imgIdx = null;
				item.right = 0;
				item.top = 0;
				// item.marker = marker;

				this.linkDataList.push(item);
			}

			for (let key in this.exMap) {
				const isItem = this.exMap[key];
				new window.naver.maps.Event.trigger(isItem.map, 'resize');

				const bounds = new window.naver.maps.LatLngBounds();
				this.linkDataList.forEach(({ pt }) => {
					bounds.extend(pt);
				});

				isItem.map.fitBounds(bounds);
			}
		},

		flrAddDel(event, idx) {
			if (event.code == 'Delete') {
				this.exFloorList.splice(idx, 1);
			} else if (event.code == 'Insert') {
				this.exFloorList.splice(idx + 1, 0, {
					st: false,
					flrNoNm: '',
					use: '',
					rentPy: 0,
					deposit: 0,
					money: 0,
					mgrFee: 0,
					rent_ni: 0,
					memo: '',
				});
			}
		},

		btnOnDetail(cid, mode) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (mode == 'count') {
				window.open(
					'MapDetail/' + cid + '?idx=' + 1 + '&totalCount=' + 1 + '&idList=' + [cid] + '&mode=' + mode,
					'',
					attr,
				);
			}

			// console.log(openWin);
		},
	},
	imgFile(a, b) {
		console.log(a, b);
	},
};
</script>

<style lang="scss"></style>
