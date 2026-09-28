<template>
	<div class="content">
		<div v-if="loadSt" class="print-wrap">
			<div class="print-left">
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
							<td>비교</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[2]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>물건개요</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[3]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>임대정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[4]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축물정보</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[5]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>건축 내/외부 사진</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="opList[6]" @change="updateId" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>지도</td>
						</tr>
					</table>
				</div>
				<div class="section-tit mt-4 select">
					사진 선택/제외
					<select class="form-control select sm" v-model="isBid">
						<option v-for="i in bidList" :key="'ooopp_' + i" :value="i">{{ itemList[i].item.building_name }}</option>
					</select>
				</div>
				<ul class="table-list">
					<li class="table-list--item" v-for="(op, idx) in itemList[isBid].item.imgObjList" :key="'opp_' + idx">
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
						<div class="middle">매입 제안서</div>
						<!-- <input type="text" class="text-center middle" value="(C)방이동 삼정빌딩" /> -->
					</div>
					<!-- <ol class="list">
						<li v-for="(i, idx) in indexList" :key="'index__' + idx" class="list-item">
							<span class="num">{{ i.idx }}</span> {{ i.name }}
						</li>
					</ol> -->
					<div class="logo"></div>
					<!-- <div class="bottom-text">
						본 Teaser는 WE'ONUS 가 제공하는 자료입니다.<br />
						본 Teaser는 자산의 계략적인 정보, 위치 등을 포함하고 있습니다.<br />
						본 건과 관련하여 궁금하신 사항이 있으실 경우에는<br />
						담당자에게 연락 부탁드립니다.
					</div> -->
				</div>
				<template v-if="opList[1]">
					<div
						v-for="(ilist, idx) in itemGroup"
						name="capture"
						:id="'capture_' + idx"
						:key="'capture_' + idx"
						class="print-section flex2-1"
					>
						<div class="print-tit">COMPARABLE(비교)</div>
						<div class="left">
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
										<th>{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.building_name : '' }}</th>
										<th>{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.building_name : '' }}</th>
										<th>{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.building_name : '' }}</th>
									</tr>
									<tr>
										<th>사진</th>
										<td class="img">
											<img :src="ilist.idList[0] ? itemList[ilist.idList[0]].item.img : null" />
										</td>
										<td class="img">
											<img :src="ilist.idList[1] ? itemList[ilist.idList[1]].item.img : null" />
										</td>
										<td class="img">
											<img :src="ilist.idList[2] ? itemList[ilist.idList[2]].item.img : null" />
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">소재지</th>
										<td class="txt-c--red">{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.jibun_addr : '' }}</td>
										<td class="txt-c--red">{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.jibun_addr : '' }}</td>
										<td class="txt-c--red">{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.jibun_addr : '' }}</td>
									</tr>
									<tr>
										<th class="txt-c--red">매매금액</th>
										<td class="txt-c--red">
											{{
												ilist.idList[0]
													? $formatMoney(itemList[ilist.idList[0]].item.sell_price, $MONEY_FORMAT_TYPE.LOAN)
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[1]
													? $formatMoney(itemList[ilist.idList[1]].item.sell_price, $MONEY_FORMAT_TYPE.LOAN)
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[2]
													? $formatMoney(itemList[ilist.idList[2]].item.sell_price, $MONEY_FORMAT_TYPE.LOAN)
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">대지면적</th>

										<td class="txt-c--red">
											{{
												ilist.idList[0]
													? itemList[ilist.idList[0]].item.land_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[0]].item.land_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[1]
													? itemList[ilist.idList[1]].item.land_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[1]].item.land_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[2]
													? itemList[ilist.idList[2]].item.land_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[2]].item.land_size_p +
													  '평)'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>연면적</th>
										<td>
											{{
												ilist.idList[0]
													? itemList[ilist.idList[0]].item.total_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[0]].item.total_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[1]
													? itemList[ilist.idList[1]].item.total_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[1]].item.total_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[2]
													? itemList[ilist.idList[2]].item.total_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[2]].item.total_size_p +
													  '평)'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>건축면적</th>
										<td>
											{{
												ilist.idList[0]
													? itemList[ilist.idList[0]].item.build_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[0]].item.build_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[1]
													? itemList[ilist.idList[1]].item.build_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[1]].item.build_size_p +
													  '평)'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[2]
													? itemList[ilist.idList[2]].item.build_size_m2 +
													  '㎡(' +
													  itemList[ilist.idList[2]].item.build_size_p +
													  '평)'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">평단가</th>
										<td class="txt-c--red">
											{{
												ilist.idList[0]
													? $filters.money(itemList[ilist.idList[0]].item.land_size_py_price) + '만원'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[1]
													? $filters.money(itemList[ilist.idList[1]].item.land_size_py_price) + '만원'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[2]
													? $filters.money(itemList[ilist.idList[2]].item.land_size_py_price) + '만원'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>용도지역</th>
										<td>{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.cfg_val1 : '' }}</td>
										<td>{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.cfg_val1 : '' }}</td>
										<td>{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.cfg_val1 : '' }}</td>
									</tr>
									<tr>
										<th>준공년도 /<br />리모델링</th>
										<td>
											{{ ilist.idList[0] ? $dateFormat2(itemList[ilist.idList[0]].item.build_date) : '' }}
											{{
												ilist.idList[0] && itemList[ilist.idList[0]].item.remodel_date
													? ' / ' + $dateFormat2(itemList[ilist.idList[0]].item.remodel_date)
													: ''
											}}
										</td>
										<td>
											{{ ilist.idList[1] ? $dateFormat2(itemList[ilist.idList[1]].item.build_date) : '' }}
											{{
												ilist.idList[1] && itemList[ilist.idList[1]].item.remodel_date
													? ' / ' + $dateFormat2(itemList[ilist.idList[1]].item.remodel_date)
													: ''
											}}
										</td>
										<td>
											{{ ilist.idList[2] ? $dateFormat2(itemList[ilist.idList[2]].item.build_date) : '' }}
											{{
												ilist.idList[2] && itemList[ilist.idList[2]].item.remodel_date
													? ' / ' + $dateFormat2(itemList[ilist.idList[2]].item.remodel_date)
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th class="txt-c--red">건페율/용적률</th>
										<td class="txt-c--red">
											{{
												ilist.idList[0]
													? itemList[ilist.idList[0]].item.bl_ratio +
													  '%/' +
													  itemList[ilist.idList[0]].item.fa_ratio +
													  '%'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[1]
													? itemList[ilist.idList[1]].item.bl_ratio +
													  '%/' +
													  itemList[ilist.idList[1]].item.fa_ratio +
													  '%'
													: ''
											}}
										</td>
										<td class="txt-c--red">
											{{
												ilist.idList[2]
													? itemList[ilist.idList[2]].item.bl_ratio +
													  '%/' +
													  itemList[ilist.idList[2]].item.fa_ratio +
													  '%'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>규모</th>
										<td>
											{{
												ilist.idList[0]
													? $getFloorString(
															itemList[ilist.idList[0]].item.floor_cnt_B,
															itemList[ilist.idList[0]].item.floor_cnt_F,
													  )
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[1]
													? $getFloorString(
															itemList[ilist.idList[1]].item.floor_cnt_B,
															itemList[ilist.idList[1]].item.floor_cnt_F,
													  )
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[2]
													? $getFloorString(
															itemList[ilist.idList[2]].item.floor_cnt_B,
															itemList[ilist.idList[2]].item.floor_cnt_F,
													  )
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>주용도</th>
										<td>
											{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.main_purpose : '' }}
										</td>
										<td>
											{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.main_purpose : '' }}
										</td>
										<td>
											{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.main_purpose : '' }}
										</td>
									</tr>
									<tr>
										<th>엘리베이터</th>
										<td>
											{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.ev_cnt + '대' : '' }}
										</td>
										<td>
											{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.ev_cnt + '대' : '' }}
										</td>
										<td>
											{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.ev_cnt + '대' : '' }}
										</td>
									</tr>
									<tr>
										<th>주차대수</th>
										<td>
											{{
												ilist.idList[0]
													? itemList[ilist.idList[0]].item.park_type_name +
													  ' / 법정' +
													  itemList[ilist.idList[0]].item.park_cnt_law +
													  '대'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[1]
													? itemList[ilist.idList[1]].item.park_type_name +
													  ' / 법정' +
													  itemList[ilist.idList[1]].item.park_cnt_law +
													  '대'
													: ''
											}}
										</td>
										<td>
											{{
												ilist.idList[2]
													? itemList[ilist.idList[2]].item.park_type_name +
													  ' / 법정' +
													  itemList[ilist.idList[2]].item.park_cnt_law +
													  '대'
													: ''
											}}
										</td>
									</tr>
									<tr>
										<th>역</th>
										<td>{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.substation : '' }}</td>
										<td>{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.substation : '' }}</td>
										<td>{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.substation : '' }}</td>
									</tr>
									<tr>
										<th>역과의 거리</th>
										<td>{{ ilist.idList[0] ? itemList[ilist.idList[0]].item.substation_distance + 'm' : '' }}</td>
										<td>{{ ilist.idList[1] ? itemList[ilist.idList[1]].item.substation_distance + 'm' : '' }}</td>
										<td>{{ ilist.idList[2] ? itemList[ilist.idList[2]].item.substation_distance + 'm' : '' }}</td>
									</tr>
								</table>
							</div>
						</div>
						<div class="right">
							<!-- <div class="section-tit">서울 강남구</div> -->
							<!-- <div class="section-tit"></div> -->
							<div class="map-wrap">
								<div :id="ilist.mapIdName"></div>
							</div>
							<div class="table-wrap">
								<div class="txt-right txt-size--sm mb-1 mt-1">단위:원</div>
								<table class="table type-input">
									<tr>
										<th>NO.</th>
										<th>빌딩이름</th>
										<th>금액(대지평당금액)</th>
										<th>대지평수/연면적</th>
										<th>임대료</th>
										<th>수익률</th>
									</tr>
									<tr v-for="(ii, idx) in ilist.idList" :key="'mta_idx_' + idx">
										<!-- itemList[ilist.idList[1]].item.land_size_m2 -->
										<td>0{{ idx + 1 }}</td>
										<td>
											{{ itemList[ilist.idList[idx]].item.building_name }}<br />
											{{
												$getFloorString(
													itemList[ilist.idList[idx]].item.floor_cnt_B,
													itemList[ilist.idList[idx]].item.floor_cnt_F,
												)
											}}
										</td>
										<td>
											{{ $formatMoney(itemList[ilist.idList[idx]].item.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}<br />
											(평당
											{{
												$filters.money(
													(
														itemList[ilist.idList[idx]].item.sell_price / itemList[ilist.idList[idx]].item.land_size_p
													).toFixed(2),
												)
											}}만원)
										</td>
										<td>
											{{ itemList[ilist.idList[idx]].item.land_size_p }}평 /
											{{ itemList[ilist.idList[idx]].item.total_size_p }}평
										</td>
										<td>{{ $filters.money(itemList[ilist.idList[idx]].item.ex_sum_rent_money) }}만원</td>
										<td>{{ itemList[ilist.idList[idx]].item.earning_rate }}%</td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</template>
				<template v-for="i in bidList" :key="'capture_item_x_' + i">
					<!-- 2. 물건개요 -->
					<div
						v-if="opList[2]"
						:id="'capture_item_2_' + i"
						:key="'capture_item_2_' + i"
						name="capture"
						class="print-section flex"
					>
						<div class="print-tit">PROPERTY OVERVIEW - {{ itemList[i].item.building_name }}</div>
						<div class="left">
							<div class="bottom">
								<div class="sub">{{ itemList[i].item.building_name }}</div>
								<div class="table-wrap">
									<table class="table text-left type-input">
										<colgroup>
											<col width="30%" />
											<col width="70%" />
										</colgroup>
										<tr>
											<th>소재지</th>
											<td>{{ itemList[i].item.jibun_addr }}</td>
										</tr>
										<tr>
											<th class="txt-c--red" style="font-size: 13px">매매금액</th>
											<td class="txt-c--red" style="font-size: 13px">
												{{ $formatMoney(itemList[i].item.sell_price, $MONEY_FORMAT_TYPE.LOAN) }}
											</td>
										</tr>

										<tr>
											<th>건물가격</th>
											<td>
												<span class="float-start p-0">
													{{ $formatMoney(itemList[i].item.building_price, $MONEY_FORMAT_TYPE.LOAN) }}
												</span>
												<span class="float-end p-0"
													>[평당:{{
														$formatMoney(itemList[i].item.building_price_py_price, $MONEY_FORMAT_TYPE.LOAN)
													}}]</span
												>
											</td>
										</tr>

										<tr>
											<th class="txt-c--red">대지면적</th>
											<td class="txt-c--red">
												<span class="float-start p-0">
													{{ itemList[i].item.land_size_m2 }}㎡({{ itemList[i].item.land_size_p }}평)
												</span>
												<span class="float-end p-0"
													>[평당:{{ $formatMoney(itemList[i].item.land_size_py_price, $MONEY_FORMAT_TYPE.LOAN) }}]</span
												>
											</td>
										</tr>
										<tr>
											<th>공시지가</th>
											<td>
												<span class="float-start p-0">
													{{ $formatMoney(itemList[i].item.public_land_price, $MONEY_FORMAT_TYPE.LOAN) }}
												</span>
												<span class="float-end p-0"
													>[평당:{{
														$formatMoney(itemList[i].item.public_land_price_py_price, $MONEY_FORMAT_TYPE.LOAN)
													}}]</span
												>
											</td>
										</tr>
										<tr>
											<th>용도지역</th>
											<td>{{ itemList[i].item.cfg_val1 }}</td>
										</tr>
										<tr>
											<th class="txt-c--red">준공년도 / 리모델링</th>
											<td class="txt-c--red">
												{{
													$dateKorFormat(itemList[i].item.build_date) +
													' / ' +
													$dateKorFormat(itemList[i].item.remodel_date)
												}}
											</td>
										</tr>
										<tr>
											<th class="txt-c--red">연면적</th>
											<td class="txt-c--red">
												<span class="float-start p-0">
													{{ itemList[i].item.total_size_m2 }}㎡({{ itemList[i].item.total_size_p }}평)
												</span>
												<span class="float-end p-0"
													>[평당:{{
														$formatMoney(itemList[i].item.total_size_py_price, $MONEY_FORMAT_TYPE.LOAN)
													}}만원]</span
												>
											</td>
										</tr>
										<tr>
											<th>건축면적</th>
											<td>
												<span class="float-start p-0">
													{{ itemList[i].item.build_size_m2 }}㎡({{ itemList[i].item.build_size_p }}평)
												</span>
												<span class="float-end p-0"
													>[평당:{{
														$formatMoney(
															Math.floor(itemList[i].item.sell_price / itemList[i].item.build_size_p),
															$MONEY_FORMAT_TYPE.LOAN,
														)
													}}만원]</span
												>
											</td>
										</tr>
										<tr>
											<th>건페율 / 용적률</th>
											<td>{{ itemList[i].item.bl_ratio }}%/{{ itemList[i].item.fa_ratio }}%</td>
										</tr>
										<tr>
											<th class="txt-c--red">규모</th>
											<td class="txt-c--red">
												{{ $getFloorString(itemList[i].item.floor_cnt_B, itemList[i].item.floor_cnt_F) }}
											</td>
										</tr>
										<tr>
											<th>주용도</th>
											<td>{{ itemList[i].item.main_purpose }}</td>
										</tr>
										<tr>
											<th class="txt-c--red">보증금 / 월세</th>
											<td class="txt-c--red">
												{{ $formatMoney(itemList[i].item.ex_sum_rent_deposit, $MONEY_FORMAT_TYPE.LOAN) }} /
												{{ $formatMoney(itemList[i].item.ex_sum_rent_money, $MONEY_FORMAT_TYPE.LOAN) }}
											</td>
										</tr>
										<tr>
											<th class="txt-c--red">수익률</th>
											<td class="txt-c--red">{{ itemList[i].item.total_income_rate }}%</td>
										</tr>
										<tr>
											<th>엘리베이터</th>
											<td>{{ itemList[i].item.ev_cnt }}대</td>
										</tr>
										<tr>
											<th>주차대수</th>
											<td>
												<template v-if="itemList[i].item.park_type_name">
													{{ itemList[i].item.park_type_name }} /
												</template>
												법정 : {{ itemList[i].item.park_cnt_law }}대
											</td>
										</tr>
									</table>
								</div>
								<div class="section-tit mt-4" style="margin-bottom: 0px">특징</div>
								<ul class="dot-list box-line">
									<div v-html="itemList[i].item.memo.split('\n').join('<br />')"></div>
								</ul>
							</div>
						</div>
						<div class="right ms-2">
							<div class="img-wrap">
								<img :src="itemList[i].item.img" alt="" style="width: 560px; height: 690px" />
							</div>
						</div>
					</div>
					<!-- 3. 임대정보 -->
					<div
						v-if="opList[3]"
						:id="'capture_item_3_' + i"
						:key="'capture_item_3_' + i"
						name="capture"
						class="print-section"
					>
						<div class="print-tit">STACKING PLAN - {{ itemList[i].item.building_name }}</div>
						<div class="chart-wrap">
							<div class="tit">임대율100%</div>
							<LineChart2
								v-if="itemList[i].rentRateSt"
								:chartData="itemList[i].rentRate"
								width="1008"
								height="40"
							></LineChart2>
						</div>
						<div class="chart-wrap">
							<div class="tit">임차업종 비중</div>
							<LineChart
								v-if="itemList[i].rentRateListSt"
								:chartData="itemList[i].rentRateList"
								width="1008"
								height="40"
							></LineChart>
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
									<tr :key="'rent_' + rent.building_rent_uid" v-for="rent in itemList[i].rentList">
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
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.m2) }}</td>
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.py) }}</td>
										<td class="bg-blue"></td>
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.deposit) }}</td>
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.money) }}</td>
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.mgr) }}</td>
										<td class="bg-blue">{{ $filters.money(itemList[i].totalData.rent_ni) }}</td>
										<td class="bg-blue"></td>
									</tr>
								</tbody>
							</table>
						</div>
						<div class="table-text">* 임대차계약서 상 임대면적의 총합과 건축물대장 상 연면적이 다소 차이가 있음</div>
					</div>
					<!-- 4. 건축물정보 -->
					<div
						v-if="opList[4]"
						:id="'capture_item_4_' + i"
						:key="'capture_item_4_' + i"
						name="capture"
						class="print-section"
					>
						<div class="print-tit">BUILDING REGISTER - {{ itemList[i].item.building_name }}</div>
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
									<tr :key="'floor_' + floor.building_floor_uid" v-for="floor in itemList[i].floorList">
										<td>{{ floor.flrNoNm }}</td>
										<td>{{ floor.area_m2 }}</td>
										<td>{{ floor.area_py }}</td>
										<td>{{ floor.name }}</td>
									</tr>
									<tr>
										<td class="bg-blue">합계</td>
										<td class="bg-blue">{{ itemList[i].totalFloorData.m2 }}</td>
										<td class="bg-blue">{{ itemList[i].totalFloorData.py }}</td>
										<td class="bg-blue"></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<!-- 5. 건물 내/외부 (사진 여러개)-->
					<template v-if="opList[5]">
						<div
							v-for="(pic, idx) in itemList[i].item.imgObj"
							:id="'picture_' + itemList[i].item.building_uid + '_' + idx"
							:key="'picture_' + itemList[i].item.building_uid + '_' + idx"
							class="print-section flex"
							name="capture"
						>
							<div class="print-tit">PHOTO - {{ itemList[i].item.building_name }}</div>
							<template v-for="(l, ll) in pic" :key="idx + '_' + ll + '_' + 'pic_' + itemList[i].item.building_uid">
								<div v-if="(ll = 0)" class="left">
									<div class="section-tit">{{ l.name }}</div>
									<div class="img-wrap">
										<img :src="l.img" alt="" style="width: 540px; height: 650px" />
									</div>
								</div>
								<div v-else class="right">
									<div class="section-tit">{{ l.name }}</div>
									<div class="img-wrap">
										<img :src="l.img" alt="" style="width: 540px; height: 650px" />
									</div>
								</div>
							</template>
						</div>
					</template>
					<!-- 6. 지도 -->
					<div v-show="opList[6]" :id="'capture_item_6_' + i" name="capture" class="print-section flex">
						<div class="left">
							<div class="print-tit">MAP - {{ itemList[i].item.building_name }}</div>
							<div :id="'map_1_' + i"></div>
						</div>
						<div class="right">
							<div class="print-tit">MAP - {{ itemList[i].item.building_name }}</div>
							<div :id="'map_2_' + i"></div>
						</div>
					</div>
					<!-- 7. end -->
					<div v-if="i == bidList[bidList.length - 1]" name="capture" id="capture_99" class="print-section cover end">
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
							본 Teaser는 본 건 투자를 위한 기본적인 정보를 제공할 목적으로 작성되었습니다. Teaser의 세부적인 내용은
							추후 진행사항에 따라 수정되거나 변경될 수 있고, WEONUS 는 내용에 대해 어떠한 책임도 부담하지 않습니다.<br />
							또한 Teaser에서 제공한 정보는 어떠한 제약의 근거로 사용될 수 없습니다. Teaser의 어떠한 부분도 매도자 및
							WEONUS의 사전 동의 없이 외부에 복사, 인용, 재배포 및 유통될 수 없습니다.
						</div>
					</div>
				</template>

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
import LineChart from '../components/LineChart.vue';
import LineChart2 from '../components/LineChart2.vue';

export default {
	name: 'PrintPage2',
	components: {
		LineChart,
		LineChart2,
	},
	data() {
		return {
			loadSt: false,
			bid: null,
			bidList: null,

			indexList: [],
			capIdList: [],

			opAll: true,
			opList: [true, true, true, true, true, true, true, true],

			item: null,
			itemList: [],
			itemGroup: [],

			isBid: null,

			userInfo: {},
		};
	},
	created() {
		this.bidList = this.$route.query.bid.split(',');

		for (let i = 0; i < this.bidList.length; i++) {
			this.bid = this.bidList[i];

			if (i == 0) {
				this.isBid = this.bid;
			}

			let dataObject = {
				id: this.bid,
				item: [],
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

				map_1: null,
				marker_1: null,
				map_2: null,
				marker_2: null,
				mapType: null,
			};

			this.itemList[this.bid] = dataObject;
		}

		this.$loadScript(
			'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
				process.env.VUE_APP_NAVER_API_ID +
				'&submodules=panorama',
		)
			.then(() => {})
			.catch(() => {});

		this.init();
	},
	computed: {},
	updated() {},
	methods: {
		async init() {
			await this.getItem();
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
		loadMap(item, id) {
			this.itemList[id].map_1 = new window.naver.maps.Map('map_1_' + id, {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 16,
			});
			this.itemList[id].map_1.setCenter({ lat: item.pt.y, lng: item.pt.x });
			this.itemList[id].map_1.setSize({ width: '550px', height: '690px' });
			this.itemList[id].marker_1 = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(item.pt.y, item.pt.x),
				map: this.itemList[id].map_1,
			});

			this.itemList[id].mapType = new window.naver.maps.CadastralLayer();

			this.itemList[id].map_2 = new window.naver.maps.Map('map_2_' + id, {
				center: new window.naver.maps.LatLng(37.5112, 127.0981),
				zoom: 18,
			});

			this.itemList[id].mapType.setMap(this.itemList[id].map_2);

			this.itemList[id].map_2.setCenter({ lat: item.pt.y, lng: item.pt.x });
			this.itemList[id].map_2.setSize({ width: '550px', height: '690px' });
			this.itemList[id].marker_2 = new window.naver.maps.Marker({
				position: new window.naver.maps.LatLng(item.pt.y, item.pt.x),
				map: this.itemList[id].map_2,
			});
		},
		mainLoadMap(isItem) {
			let max = 0;
			let pt = { x: 0, y: 0 };
			for (let i = 0; i < isItem.idList.length; i++) {
				const pt1 = this.itemList[isItem.idList[i]].item.pt;
				pt.x += pt1.x;
				pt.y += pt1.y;
				if (isItem.idList.length > 0) {
					for (let ii = 1; ii < isItem.idList.length; ii++) {
						const pt2 = this.itemList[isItem.idList[ii]].item.pt;

						const dis = this.calDist(pt1.y, pt1.x, pt2.y, pt2.x);

						if (max < dis) {
							max = dis;
						}
					}
				} else {
					max = 100;
				}
			}

			let zoomLevel = null;
			if (max >= 50000) {
				zoomLevel = 8;
			} else if (30000 <= max && max < 50000) {
				zoomLevel = 9;
			} else if (20000 <= max && max < 30000) {
				zoomLevel = 10;
			} else if (10000 <= max && max < 20000) {
				zoomLevel = 11;
			} else if (5000 <= max && max < 10000) {
				zoomLevel = 12;
			} else if (3000 <= max && max < 5000) {
				zoomLevel = 13;
			} else if (1000 <= max && max < 3000) {
				zoomLevel = 14;
			} else if (500 <= max && max < 1000) {
				zoomLevel = 15;
			} else {
				zoomLevel = 16;
			}

			isItem.map = new window.naver.maps.Map(isItem.mapIdName, {
				center: new window.naver.maps.LatLng(pt.y / isItem.idList.length, pt.x / isItem.idList.length),
				zoom: zoomLevel,
			});

			for (let i = 0; i < isItem.idList.length; i++) {
				const pt = this.itemList[isItem.idList[i]].item.pt;

				let marker = new window.naver.maps.Marker({
					position: new window.naver.maps.LatLng(pt.y, pt.x),
					map: isItem.map,
				});

				marker.setIcon({
					icon: 'HtmlIcon',
					content: `<span class="pin color-${i + 1}"><span class="num">${i + 1}</span></span>`,
				});

				isItem.markerList.push(marker);
			}

			// isItem.map.setCenter({ lat: this.item.pt.y, lng: this.item.pt.x });
			isItem.map.setSize({ width: '550px', height: '500px' });
		},
		calDist(lat1, lon1, lat2, lon2) {
			let EARTH_R = 6371000.0;
			let rad = Math.PI / 180;
			let radLat1 = rad * lat1;
			let radLat2 = rad * lat2;
			let radDist = rad * (lon1 - lon2);

			let distance = Math.sin(radLat1) * Math.sin(radLat2);
			distance = distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
			let ret = EARTH_R * Math.acos(distance);

			return Math.round(ret); // 미터 단위
		},
		async copyChartImg() {
			this.$apiPOST('/admin/api/detail/item/print', { bidList: this.bidList }).then(() => {});
			console.log(this.capIdList);
			await this.$exportPrint(this.capIdList);
		},
		async getItem() {
			for (let i = 0; i < this.bidList.length; i++) {
				const bid = this.bidList[i];

				const data = await this.$apiGET('/admin/api/detail/item?bid=' + bid + '&isRent=false');

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

				let imgObj = [];
				for (let i = 0; i < imgObjList.length; i += 2) {
					imgObj.push(imgObjList.slice(i, i + 2));
				}

				data.imgObj = imgObj;

				this.itemList[bid].item = data;
			}

			this.itemGroup = [];
			for (let i = 0; i < this.bidList.length; i += 3) {
				this.itemGroup.push({
					idList: this.bidList.slice(i, i + 3),
					domIdName: 'capdom_' + i,
					mapIdName: 'mainMap_' + i,
					map: null,
					markerList: [],
				});
			}

			this.capIdList = [];

			this.indexList = [];
			let idx = 1;
			for (let i = 1; i < this.opList.length; i++) {
				if (this.opList[i]) {
					if (i == 1) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '비교',
						});
					} else if (i == 2) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '물건개요',
						});
					} else if (i == 3) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '임대정보',
						});
					} else if (i == 4) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '건축물정보',
						});
					} else if (i == 5) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '건축 내/외부 사진',
						});
					} else if (i == 6) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: '지도',
						});
					} else if (i == 7) {
						this.indexList.push({
							idx: '0' + idx + '. ',
							name: 'END',
						});
					}
					idx++;
				}
			}

			this.loadSt = true;

			this.$nextTick(() => {
				const idList = document.getElementsByName('capture');

				console.log(idList[0]);

				for (let i = 0; i < idList.length; i++) {
					this.capIdList.push(idList[i].id);
				}
			});

			setTimeout(
				function () {
					for (let i = 0; i < this.itemGroup.length; i++) {
						this.mainLoadMap(this.itemGroup[i]);
					}

					for (let i = 0; i < this.bidList.length; i++) {
						const id = this.bidList[i];
						this.loadMap(this.itemList[id].item, this.itemList[id].item.building_uid);
					}
				}.bind(this),
				250,
			);
		},
		updateId() {
			for (let i = 0; i < this.bidList.length; i++) {
				const bid = this.bidList[i];

				let data = JSON.parse(JSON.stringify(this.itemList[bid].item));

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

				this.itemList[bid].item.imgObj = imgObj;
			}

			this.$nextTick(() => {
				this.indexList = [];
				let idx = 1;
				for (let i = 1; i < this.opList.length; i++) {
					if (this.opList[i]) {
						if (i == 1) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '비교',
							});
						} else if (i == 2) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '물건개요',
							});
						} else if (i == 3) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '임대정보',
							});
						} else if (i == 4) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '건축물정보',
							});
						} else if (i == 5) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '건축 내/외부 사진',
							});
						} else if (i == 6) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: '지도',
							});
						} else if (i == 7) {
							this.indexList.push({
								idx: '0' + idx + '. ',
								name: 'END',
							});
						}
						idx++;
					}
				}

				this.capIdList = [];
				const idList = document.getElementsByName('capture');
				for (let i = 0; i < idList.length; i++) {
					this.capIdList.push(idList[i].id);
				}

				if (this.opList[1]) {
					for (let i = 0; i < this.itemGroup.length; i++) {
						this.mainLoadMap(this.itemGroup[i]);
					}
				}
			});
		},
		getRent() {
			for (let i = 0; i < this.bidList.length; i++) {
				const bid = this.bidList[i];
				this.$apiGET('/admin/api/detail/item/rent?bid=' + bid).then(data => {
					let m2 = 0;
					let py = 0;
					let deposit = 0;
					let money = 0;
					let mgr = 0;

					let cnt = data.length;
					let sumCnt = 0;

					for (let i = 0; i < data.length; i++) {
						if (data[i].rent_money) {
							sumCnt++;
						}

						// if (data[i].except_flag != 'Y') {
						m2 += Number(data[i].rent_size_m2);
						py += Number(data[i].rent_size_p);
						deposit += Number(data[i].rent_deposit);
						money += Number(data[i].rent_money);
						mgr += Number(data[i].mgr_fee);
						// }
					}

					if (cnt) {
						this.itemList[bid].rentRate.datasets[0].data[0] = Number(((sumCnt / cnt) * 10 * 10).toFixed(2));
					} else {
						this.itemList[bid].rentRate.datasets[0].data[0] = 0;
					}

					const rentGroup = this.$groupBy(data, 'rent_usage');
					for (let prop in rentGroup) {
						const curCnt = rentGroup[prop].length;
						this.itemList[bid].rentRateList.datasets.push({
							label: prop,
							data: [Number(((curCnt / cnt) * 100).toFixed(2))],
						});
					}

					this.itemList[bid].rentRateSt = true;
					this.itemList[bid].rentRateListSt = true;

					this.itemList[bid].rentList = data;
					this.itemList[bid].totalData.m2 = m2.toFixed(2);
					this.itemList[bid].totalData.py = py.toFixed(2);
					this.itemList[bid].totalData.deposit = deposit;
					this.itemList[bid].totalData.money = money;
					this.itemList[bid].totalData.mgr = mgr;
					this.itemList[bid].totalData.rent_ni = (
						Number(this.itemList[bid].totalData.money) / Number(this.itemList[bid].totalData.py)
					).toFixed(2);
				});
			}
		},
		getFloor() {
			for (let i = 0; i < this.bidList.length; i++) {
				const bid = this.bidList[i];

				this.$apiGET('/admin/api/detail/item/floor?bid=' + bid).then(data => {
					let m2 = 0;
					let py = 0;

					for (let i = 0; i < data.length; i++) {
						m2 += Number(data[i].area_m2);
						py += Number(data[i].area_py);
					}

					this.itemList[bid].floorList = data;
					this.itemList[bid].totalFloorData.m2 = m2.toFixed(2);
					this.itemList[bid].totalFloorData.py = py.toFixed(2);
				});
			}
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
