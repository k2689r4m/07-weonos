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
								<!-- {{ op.st }} -->
								<input type="checkbox" v-model="op.st" @change="updateId" :disabled="!opList[4] || isLastChecked(op)" />
								<span class="checkbox"></span>
							</label>
						</div>
						<div class="name">{{ op.name }}</div>
					</li>
				</ul>
				<!-- <img :src="this.img" /> -->
				<div class="btn-wrap">
					<button v-if="lodingST" type="button" class="btn btn-sm btn-secondary">로딩중</button>
					<button v-else type="button" class="btn btn-sm btn-secondary" @click="copyChartImg">출력</button>
				</div>
			</div>
			<div class="print-right" id="main_print">
				<!-- 1. 인트로 -->
				<div v-if="opList[0]" id="capture_1" name="capture" class="print-section cover">
					<div class="tit">
						<!-- <div class="top">Information Memorandum</div> -->
						<div class="middle">{{ item.building_name }}</div>
						<!-- <input type="text" class="text-center middle" value="(C)방이동 삼정빌딩" /> -->
						<div class="bottom">{{ item.show_addr }}</div>
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
				<div v-if="opList[1]" id="capture_2" name="capture" class="print-section flex">
					<div class="print-tit">PROPERTY OVERVIEW</div>
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
										<td>{{ item.show_addr }}</td>
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
				<div v-if="opList[2]" id="capture_3" name="capture" class="print-section">
					<div class="print-tit">STACKING PLAN</div>
					<!-- <div class="chart-wrap">
						<div class="tit">임대율100%</div>
						<LineChart2 v-if="rentRateSt" :chartData="rentRate" width="1008" height="40"></LineChart2>
					</div>
					<div class="chart-wrap">
						<div class="tit">임차업종 비중</div>
						<LineChart v-if="rentRateListSt" :chartData="rentRateList" width="1008" height="40"></LineChart>
					</div> -->
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
								<tr
									:key="'rent_' + rent.building_rent_uid"
									v-for="rent in rentList"
									:class="{ 'row-gray': rent.except_flag === 'Y' }"
								>
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
						<div v-for="(i, ii) in pic" :key="idx + '_' + ii + '_' + 'pic'">
							<div v-if="(ii = 0)" class="left">
								<div class="section-tit" style="border-bottom: none !important">{{ i.name }}</div>
								<div class="img-wrap">
									<img :src="i.img" alt="" style="width: 540px; height: 650px" />
								</div>
							</div>
							<div v-else class="right">
								<div class="section-tit" style="border-bottom: none !important">{{ i.name }}</div>
								<div class="img-wrap">
									<img :src="i.img" alt="" style="width: 540px; height: 650px" />
								</div>
							</div>
						</div>
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
	</div>
</template>

<script>
/* eslint-disable */
// import LineChart from '../components/LineChart.vue';
// import LineChart2 from '../components/LineChart2.vue';


export default {
	name: 'PrintPage',
	components: {
		// LineChart,
		// LineChart2,
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

			lodingST: false,
		};
	},
	created() {
		// let style = document.getElementById('__print_style__');

		// style = document.createElement('style');
		// style.id = '__print_style__';
		// style.innerHTML = printCss;
		// document.head.appendChild(style);

		this.bid = this.$route.query.bid;

		if(!localStorage.getItem('pdf')){
			this.$loadScript(
				'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
					process.env.VUE_APP_NAVER_API_ID +
					'&submodules=panorama',
			)
			.then(() => {})
			.catch(() => {});	
		}

		this.init();
	},
	mounted() {},
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
		async copyChartImg() {
			this.lodingST = true;
			this.$apiPOST('/admin/api/detail/item/print', { bidList: [this.bid] }).then(() => {});

			// this.capIdList.push('zxzx');

			// this.$apiGET(`/users/pdf?url=${window.location.href}`).then(() => {});
			// await this.$exportPrint(this.capIdList);

			let imgObjList_ = [];
			for (let i = 0; i < this.item.imgObjList.length; i++) {
				imgObjList_.push(this.item.imgObjList[i].st);
			}

			let capIdList_ = [];

			const idList = document.getElementsByName('capture');
			for (let i = 0; i < idList.length; i++) {
				if(idList[i].id == 'capture_5' && !this.opList[5]){
					continue;
				}
				capIdList_.push(idList[i].id);
			}

			this.$apiPDF('/admin/api/pdf', {
				url: window.location.href,
				idList: capIdList_,
				name: this.item.building_name,
				stroage: { pdf:'ON', opList: this.opList, imgObjList: imgObjList_ },
			}).then(() => {
				this.lodingST = false;
			});
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
						// let localST = true;
						// if (localStorage.getItem('imgObjList')) {
						// 	const imgObjList_ = localStorage.getItem('imgObjList').split(',');
						// 	localST = imgObjList_[i];
						// }

						imgObjList.push({
							name: this.$IMG_NAME[i],
							img: process.env.VUE_APP_HOST_FRONT + '/users/item/image?id=' + data.imgList[i],
							st: true,
						});
					}
				}

				const localImgList = localStorage.getItem('imgObjList');
				if(localImgList){
					const localImgList_ = localImgList.split(',');
					for (let i = 0; i < imgObjList.length; i ++) {
						imgObjList[i].st = localImgList_[i] == 'true' ? true : false;
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

					if (localStorage.getItem('opList')) {
						const opList_ = localStorage.getItem('opList').split(',');
						this.opList = opList_;
					}

					if (localStorage.getItem('pdf')) {
						this.updateId();
					}
				});
				setTimeout(
					function () {
						if(!localStorage.getItem('pdf')){
							this.loadMap();
						}
					}.bind(this),
					250,
				);
			});
		},
		updateId() {
			let data = JSON.parse(JSON.stringify(this.item));

			// opList[4]

			//이미지 리스트
			let imgObjList = [];
			// let allSTCheck = false;
			for (let i = 0; i < data.imgObjList.length; i++) {
				if (data.imgObjList[i].st) {
					imgObjList.push(data.imgObjList[i]);
					// allSTCheck = true;
				}
			}

			// if(!allSTCheck){
			// 	console.log('모든 이미지가 제거됨');
			// 	this.opList[4] = false;
			// }

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

			window.__VUE_READY__ = true;
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

					if(this.rentList[i].except_flag != 'Y'){
						deposit += Number(this.rentList[i].rent_deposit);
						money += Number(this.rentList[i].rent_money);
						mgr += Number(this.rentList[i].mgr_fee);
					}
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
		isLastChecked(op) {
			const checked = this.item.imgObjList.filter(o => o.st);
			return checked.length === 1 && checked[0] === op;
  		},
	},
};
</script>

<style scoped></style>
