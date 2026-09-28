<template>
	<div class="wrap">
		<div class="spinner-border--wrap" v-if="isLoading">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		<div class="content" v-if="item">
			<div class="detail-page">
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
						<div class="bottom">
							{{ item.building_name }}
						</div>
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
						<!-- <input type="text" class="form-control" readonly /> -->
						<!-- 이채은 멀티셀렉트 스타일 필요 -->
						<!-- <SlimSelect v-model="bdCateIdList" multiple :settings="multSettings" :data="multData">
							<option value="3">Option 3</option>
						</SlimSelect> -->

						<SlimSelect v-model="bdCateIdList" multiple :settings="multSettings" :data="multData"> </SlimSelect>
						<label class="label">담당자</label>
						<select class="form-control select" v-model="item.building_mem_uid">
							<option value="">담당자 선택</option>
							<option v-for="m in memList" :key="m.mem_uid" :value="m.mem_uid">
								{{ m.mem_name }} {{ m.mem_rank_name }}
							</option>
						</select>
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
							<button type="button" class="btn btn-sm btn-danger" @click="delItem()"><b-icon-trash-fill /></button>
							<button type="button" class="btn btn-sm btn-secondary" @click="backMenu()">View Mode</button>
							<button type="button" class="btn btn-sm btn-primary" @click="btnSaveItem()">저장</button>
						</div>
					</div>
				</div>
				<div class="detail-page--con">
					<div class="left">
						<div class="con">
							<div class="tit">
								물건정보
								<button type="button" class="btn btn-xxsm btn-secondary" @click="isPopupShow1 = true">연결물건</button>
								<button type="button" class="btn btn-xxsm btn-secondary" @click="isPopupShow5 = true">
									<b-icon-filter-square-fill />
								</button>
							</div>
							<table class="table type-input">
								<colgroup>
									<col width="20%" />
									<col width="30%" />
									<col width="20%" />
									<col width="30%" />
								</colgroup>
								<tr>
									<th>물건명</th>
									<td colspan="3">
										<input type="text" class="form-control" v-model="item.building_name" ref="building_name" />
									</td>
								</tr>
								<tr>
									<th>표출용주소</th>
									<td colspan="3"><input type="text" class="form-control" v-model="item.show_addr" /></td>
								</tr>
								<tr>
									<th>지번주소</th>
									<td colspan="3">{{ item.jibun_addr }}</td>
								</tr>
								<tr>
									<th>도로명주소</th>
									<td colspan="3">
										{{ item.road_addr }}
										<button type="button" class="btn map1" @click.stop="$openNaverMap(item.jibun_addr)"></button>
										<button type="button" class="btn map2" @click.stop="$openDaumMap(item.jibun_addr)"></button>
									</td>
								</tr>
								<tr>
									<th>연결주소</th>
									<td colspan="3">
										<input type="text" class="form-control" readonly v-model="linkAddr" />
										<button type="button" class="btn btn-xxsm btn-secondary" @click="btnOnCreateMap()">추가</button>
									</td>
								</tr>
								<tr>
									<th>주변역</th>
									<td>
										<input type="text" class="form-control" v-model="item.substation" ref="substation" />
									</td>
									<th>거리(M)</th>
									<td>
										<input
											type="number"
											class="form-control"
											v-model="item.substation_distance"
											ref="substation_distance"
										/>
									</td>
								</tr>
								<tr>
									<th>진행상태</th>
									<td>
										<label class="input-checkbox">
											<input type="radio" name="state" value="ready" @change="chgSellStatus()" v-model="sell_status" />
											<span class="checkbox radio"></span>
											<span class="text">준비</span>
										</label>
										<label class="input-checkbox">
											<input type="radio" name="state" value="done" @change="chgSellStatus()" v-model="sell_status" />
											<span class="checkbox radio"></span>
											<span class="text">매물</span>
										</label>
										<label class="input-checkbox">
											<input type="radio" name="state" value="hold" @change="chgSellStatus()" v-model="sell_status" />
											<span class="checkbox radio"></span>
											<span class="text">보류</span>
										</label>
										<label class="input-checkbox">
											<input type="radio" name="state" value="sell" @change="chgSellStatus()" v-model="sell_status" />
											<span class="checkbox radio"></span>
											<span class="text">임대완료</span>
										</label>
									</td>
									<th>상태</th>
									<td>
										<select class="form-control select" v-model="item.chk_status">
											<option value="">선택</option>
											<option value="A">A</option>
											<option value="B">B</option>
											<option value="C">C</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>물건사진</th>
									<td colspan="3">
										<button type="button" class="btn btn-xxsm btn-secondary" @click="isPopupShow7 = true">추가</button>
									</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">
								토지대장
								<button type="button" class="btn icon" @click="btnReload"><b-icon-arrow-repeat /></button>
								<button type="button" class="btn btn-xxsm btn-secondary" @click="goKras">조회</button>
							</div>
							<table class="table type-input">
								<tr>
									<th>지번</th>
									<th>지목</th>
									<th>면적(㎡)</th>
									<th>용도지역</th>
									<th>제한사항</th>
									<th>공시지가(원/㎡)</th>
								</tr>
								<tr :key="'land_' + land.id" v-for="land in landList">
									<td>{{ land.jibun }}</td>
									<td>{{ land.gmok_name }}</td>
									<td>{{ land.size_m2 }}</td>
									<td>{{ land.use_area_name }}</td>
									<td>{{ land.district_code_name }}</td>
									<td>
										{{ $formatMoney(land.public_land_price_m2, $MONEY_FORMAT_TYPE.LOAN) }}

										<template v-if="land.public_land_price_year">
											<br />
											({{ land.public_land_price_year }}년 기준)
										</template>
									</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">토지정보</div>
							<table class="table type-input">
								<colgroup>
									<col width="20%" />
									<col width="30%" />
									<col width="20%" />
									<col width="30%" />
								</colgroup>
								<tr>
									<th>대지면적</th>
									<td colspan="3">
										<input
											type="text"
											class="form-control xsm"
											ref="land_size_p"
											v-model="item.land_size_p"
											@change="item.land_size_m2 = $py_m2_ex(item.land_size_p)"
										/>
										&nbsp;평&nbsp;
										<input
											type="text"
											class="form-control xsm"
											v-model="item.land_size_m2"
											@change="item.land_size_p = $m2_py_ex(item.land_size_m2)"
										/>
										&nbsp;㎡
									</td>
								</tr>
								<tr>
									<th>지목</th>
									<td>
										<select v-model="item.gmok" class="form-control select" ref="gmok">
											<option value="">선택</option>
											<option v-for="c in typeList.gmok" :key="'gmok' + c.ind_cfg_uid" :value="c.ind_cfg_uid">
												{{ c.cfg_val1 }}
											</option>
										</select>
									</td>
									<th>건폐율</th>
									<td>
										<input type="text" class="form-control xsm" v-model="item.bl_ratio" /><span class="text">%</span>
									</td>
								</tr>
								<tr>
									<th>용도지역</th>
									<td colspan="3">
										<select v-model="item.use_area_uid" class="form-control select" ref="use_area_uid">
											<option value="" selected>선택</option>
											<option v-for="c in typeList.use_area" :key="'use_area' + c.ind_cfg_uid" :value="c.ind_cfg_uid">
												{{ c.cfg_val1 }}
											</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>
										공시지가
										<button type="button" class="btn p-0" @click="btnReload"><b-icon-arrow-repeat /></button>
									</th>
									<td>
										<money3 class="form-control sm" v-model="item.public_land_price" v-bind="$MONEY1"></money3>
										<span class="text">만</span>
									</td>
									<th>평단가</th>
									<td>
										<money3 class="form-control sm" v-model="item.public_land_price_py_price" v-bind="$MONEY1"></money3>
										<span class="text">만</span>
									</td>
								</tr>
								<tr>
									<th>도로사항</th>
									<td colspan="3">
										<label class="input-checkbox">
											<input type="checkbox" v-model="item.chk_road_coner" true-value="Y" false-value="N" />
											<span class="checkbox"></span>
											<span class="text">코너</span>
										</label>
										<label class="input-checkbox">
											<input type="checkbox" v-model="item.chk_road_dual" true-value="Y" false-value="N" />
											<span class="checkbox"></span>
											<span class="text">양면</span>
										</label>
										<br />
										<input
											type="text"
											class="form-control sm"
											placeholder="도로명"
											v-model="item.road_name"
											ref="road_name"
										/>
										<br />
										<input
											type="number"
											class="form-control sm"
											placeholder="m"
											v-model="item.roadwide_1"
											ref="roadwide_1"
										/>
										<input
											type="number"
											class="form-control sm"
											placeholder="m"
											v-model="item.roadwide_2"
											ref="roadwide_2"
										/>
										<input
											type="number"
											class="form-control sm"
											placeholder="m"
											v-model="item.roadwide_3"
											ref="roadwide_3"
										/>
										<input
											type="number"
											class="form-control sm"
											placeholder="m"
											v-model="item.roadwide_4"
											ref="roadwide_4"
										/>
									</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tit">건축물정보</div>
							<table class="table type-input">
								<colgroup>
									<col width="20%" />
									<col width="30%" />
									<col width="20%" />
									<col width="30%" />
								</colgroup>
								<tr>
									<th>연면적</th>
									<td colspan="3">
										<input
											type="text"
											class="form-control xsm"
											v-model="item.total_size_p"
											@change="item.total_size_m2 = $py_m2_ex(item.total_size_p)"
										/>
										&nbsp;평&nbsp;
										<input
											type="text"
											class="form-control xsm"
											v-model="item.total_size_m2"
											@change="item.total_size_p = $m2_py_ex(item.total_size_m2)"
										/>
										&nbsp;㎡
									</td>
								</tr>
								<tr>
									<th>건축면적</th>
									<td colspan="3">
										<input
											type="text"
											class="form-control xsm"
											v-model="item.build_size_p"
											@change="item.build_size_m2 = $py_m2_ex(item.build_size_p)"
										/>
										&nbsp;평&nbsp;
										<input
											type="text"
											class="form-control xsm"
											v-model="item.build_size_m2"
											@change="item.build_size_p = $m2_py_ex(item.build_size_m2)"
										/>
										&nbsp;㎡
									</td>
								</tr>
								<tr>
									<th>준공일자</th>
									<td>
										<input class="form-control" type="date" v-model="item.build_date" />
									</td>
									<th>용적률</th>
									<td>
										<input type="number" class="form-control sm" v-model="item.fa_ratio" />
										<span class="text">%</span>
									</td>
								</tr>
								<tr>
									<th>리모델링일자</th>
									<td>
										<input class="form-control" type="date" v-model="item.remodel_date" />
									</td>
									<th>규모(층)</th>
									<td>
										<input type="number" class="form-control xsm" v-model="item.floor_cnt_B" />
										<span class="text">층/</span>
										<input type="number" class="form-control xsm" v-model="item.floor_cnt_F" />
										<span class="text">층</span>
									</td>
								</tr>
								<tr>
									<th>주용도</th>
									<td><input type="text" class="form-control" v-model="item.main_purpose" /></td>
									<th>구조</th>
									<td>
										<select v-model="item.structure_uid" class="form-control select">
											<option value="" selected>선택</option>
											<option
												v-for="c in typeList.structure"
												:key="'struclist_' + c.ind_cfg_uid"
												:value="c.ind_cfg_uid"
											>
												{{ c.cfg_val1 }}
											</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>냉/난방</th>
									<td>
										<select v-model="item.heat_type_uid" class="form-control select">
											<option value="" selected>선택</option>
											<option
												v-for="c in typeList.heat_type"
												:key="'heat_type_' + c.ind_cfg_uid"
												:value="c.ind_cfg_uid"
											>
												{{ c.cfg_val1 }}
											</option>
										</select>
									</td>
									<th>승강기</th>
									<td>
										<input type="number" class="form-control xsm" v-model="item.ev_cnt" />
										<span class="text">대</span>
									</td>
								</tr>
								<tr>
									<th>주차방식</th>
									<td>
										<select v-model="item.park_type_uid" class="form-control select">
											<option value="" selected>선택</option>
											<option v-for="c in typeList.park_type" :key="'park_type' + c.ind_cfg_uid" :value="c.ind_cfg_uid">
												{{ c.cfg_val1 }}
											</option>
										</select>
									</td>
									<th>주차대수</th>
									<td>
										<span class="text">법정</span>
										<input type="number" class="form-control xsm" v-model="item.park_cnt_law" />
										<span class="text">대</span>
										<br />
										<span class="text">실제</span>
										<!-- <input type="number" class="form-control xsm" v-model="item.park_cnt_real" /> -->
										<input type="number" class="form-control xsm" />
										<span class="text">대</span>
									</td>
								</tr>
								<tr>
									<th>건물가격평당</th>
									<td>
										<money3
											class="form-control sm"
											v-model="item.building_price_py_price"
											v-bind="$MONEY1"
											@change="onUpdateData()"
										></money3>
										<span class="text">만</span>
									</td>
									<th>건물가격</th>
									<td>
										<money3
											class="form-control sm"
											v-model="item.building_price"
											v-bind="$MONEY1"
											@change="onUpdateData()"
											readonly
										></money3>
										<span class="text">만</span>
									</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="right type2">
						<div class="con">
							<div class="left">
								<div class="con">
									<div class="tab-btn">
										<button type="button" class="btn tab" v-bind:class="{ active: menu1 == 0 }" @click="menu1 = 0">
											소유자정보
										</button>
										<button type="button" class="btn tab" v-bind:class="{ active: menu1 == 1 }" @click="menu1 = 1">
											전건물주
										</button>
										<button type="button" class="btn tab" v-bind:class="{ active: menu1 == 2 }" @click="menu1 = 2">
											메모
										</button>
									</div>
									<div v-if="menu1 == 0" class="tab-con">
										<table class="table type-input">
											<tr>
												<th>성명</th>
												<td>
													<input type="text" class="form-control" v-model="item.owner_name" ref="owner_name" />
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.owner_home_phone"
															ref="owner_home_phone"
															@keyup="getPhoneMask(item.owner_home_phone, 'owner_home_phone')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.owner_home_phone_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" ref="owner_home_phone" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.owner_office_phone"
															@keyup="getPhoneMask(item.owner_office_phone, 'owner_office_phone')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.owner_office_phone_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.owner_mobile_1"
															@keyup="getPhoneMask(item.owner_mobile_1, 'owner_mobile_1')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.owner_mobile_1_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
										</table>
									</div>
									<div v-else-if="menu1 == 1" class="tab-con">
										<table class="table type-input">
											<tr>
												<th>성명</th>
												<td>
													<input type="text" class="form-control" v-model="item.park_type_name" />
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.pre_owner_home_phone"
															@keyup="getPhoneMask(item.pre_owner_home_phone, 'pre_owner_home_phone')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.pre_owner_home_phone_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" ref="owner_home_phone" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.pre_owner_office_phone"
															@keyup="getPhoneMask(item.pre_owner_office_phone, 'pre_owner_office_phone')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.pre_owner_office_phone_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
											<tr>
												<th>연락처</th>
												<td>
													<template v-if="memType">
														<input
															type="tel"
															class="form-control sm"
															v-model="item.pre_owner_mobile_1"
															@keyup="getPhoneMask(item.pre_owner_mobile_1, 'pre_owner_mobile_1')"
														/>&nbsp;
														<input type="text" class="form-control sm" v-model="item.pre_owner_mobile_1_memo" />
													</template>
													<template v-else>
														<input type="text" class="form-control sm" disabled />&nbsp;
														<input type="text" class="form-control sm" disabled />
													</template>
												</td>
											</tr>
										</table>
									</div>
									<div v-else-if="menu1 == 2" class="tab-con">
										<textarea class="form-control" rows="10" v-model="item.owner_memo"></textarea>
									</div>
								</div>
								<div class="con">
									<div class="tit">금액정보</div>
									<table class="table type-input">
										<tr>
											<th>보증금</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.deposit"
													v-bind="$MONEY1"
													ref="deposit"
													@change="onUpdateData2()"
												></money3>
												<span class="text">만</span>
											</td>
											<th>전용면적</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.net_area_m2"
													v-bind="$MONEY2"
													ref="deposit"
													@change="onUpdateData2()"
												></money3>
												<span class="text">㎡</span>
											</td>
										</tr>
										<tr>
											<th>월임대료</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.monthly_rent"
													v-bind="$MONEY1"
													ref="deposit"
													@change="onUpdateData2()"
												></money3>
												<span class="text">만</span>
											</td>
											<th>전용률</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.ex_rate"
													v-bind="$MONEY2"
													ref="deposit"
													disabled
												></money3>
												<span class="text">%</span>
											</td>
										</tr>
										<tr>
											<th>관리비</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.main_fee"
													v-bind="$MONEY1"
													ref="deposit"
													@change="onUpdateData2()"
												></money3>
												<span class="text">만</span>
											</td>
											<th>월고정비</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.monthly_fixed"
													v-bind="$MONEY1"
													ref="deposit"
												></money3>
												<span class="text">만</span>
											</td>
										</tr>
										<tr>
											<th>층 정보</th>
											<td>
												<input type="text" class="form-control sm" v-model="item.floor_info" />
											</td>
											<th>무료/유료 주차</th>
											<td>
												<input type="text" class="form-control xsm" v-model="item.free_parking" />
												<span class="text">대</span>
												<span class="text"></span>
												<input type="text" class="form-control xsm" v-model="item.fee_paring" />
												<span class="text">대</span>
											</td>
										</tr>
										<tr>
											<th>입주현황</th>
											<td>
												<input type="text" class="form-control sm" v-model="item.in_status" />
											</td>
											<th>화장실유형</th>
											<td>
												<input type="text" class="form-control sm" v-model="item.bathroom_type" />
											</td>
										</tr>
										<tr>
											<th>임대면적</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.rent_area_m2"
													v-bind="$MONEY2"
													ref="deposit"
													@change="onUpdateData2()"
												></money3>
												<span class="text">㎡</span>
											</td>
											<th>평당 임대료</th>
											<td>
												<money3
													class="form-control sm"
													v-model="item.rent_py_price"
													v-bind="$MONEY2"
													ref="deposit"
													disabled
												></money3>
												<span class="text">만</span>
											</td>
										</tr>
										<tr>
											<th>인테리어</th>
											<td>
												<label class="input-checkbox">
													<input type="radio" name="interior" value="need" v-model="item.interior_type" />
													<span class="checkbox radio"></span>
													<span class="text">필요</span>
												</label>
												<label class="input-checkbox">
													<input type="radio" name="interior" value="good" v-model="item.interior_type" />
													<span class="checkbox radio"></span>
													<span class="text">양호</span>
												</label>
												<label class="input-checkbox">
													<input type="radio" name="interior" value="demo" v-model="item.interior_type" />
													<span class="checkbox radio"></span>
													<span class="text">철거완료</span>
												</label>
											</td>
											<th>렌트프리</th>
											<td>
												<label class="input-checkbox">
													<input type="radio" name="rent_free" value="none" v-model="item.rent_free" />
													<span class="checkbox radio"></span>
													<span class="text">협의</span>
												</label>
												<label class="input-checkbox">
													<input type="radio" name="rent_free" value="confer" v-model="item.rent_free" />
													<span class="checkbox radio"></span>
													<span class="text">0개월</span>
												</label>
												<br />
												<label class="input-checkbox">
													<input type="radio" name="rent_free" value="selet" v-model="item.rent_free" />
													<span class="checkbox radio"></span>
												</label>
												<input type="text" class="form-control xsm mt-1" v-model="item.rent_free_month" />
												<span class="text">개월</span>
											</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="right">
								<div class="con">
									<div class="tab-btn">
										<button
											type="button"
											class="btn tab"
											v-bind:class="{ active: menu2 == false }"
											@click="menu2 = false"
										>
											작업내역
										</button>
										<button
											type="button"
											class="btn tab"
											v-bind:class="{ active: menu2 == true }"
											@click="menu2 = true"
										>
											변경내역
										</button>
									</div>
									<div class="tab-con">
										<div v-if="menu2 == false" class="tab-con">
											<div class="input-top">
												<select v-model="searchOptions.type" class="form-control select">
													<option
														v-for="c in clientTypeList"
														:key="'clienttype_' + c.ind_cfg_uid"
														:value="c.ind_cfg_uid"
													>
														{{ c.name }}
													</option>
												</select>
												<input
													type="text"
													class="form-control"
													v-model="searchOptions.keyword"
													@keyup.enter="addClientLog"
												/>
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
														<td>
															<strong>
																{{ $dateToFormat(log.date, 'MM-DD') }}
																<span style="color: #65af7e">{{ $dateToFormat(log.date, 'ddd') }}</span>
																{{ $dateToFormat(log.date, 'hh:mm') }}
															</strong>
														</td>
														<td>{{ log.counsel_type_name }}</td>
														<td>{{ log.mem_name }}</td>
													</tr>
													<tr>
														<td colspan="3">
															{{ log.memo }}
															<button type="button" class="btn icon red" @click="btnClientLogDel(log.client_log_uid)">
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
															<button type="button" class="btn icon red" @click="btnMgrLogDel(log.mgr_log_uid)">
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
						<div class="center type2">
							<div class="con">
								<div class="tab-btn">
									<button type="button" class="btn tab" v-bind:class="{ active: menu3 == 0 }" @click="menu3 = 0">
										임대차내역
									</button>
									<button type="button" class="btn tab" v-bind:class="{ active: menu3 == 1 }" @click="menu3 = 1">
										건축물대장
									</button>
									<button type="button" class="btn tab" v-bind:class="{ active: menu3 == 2 }" @click="menu3 = 2">
										특징
									</button>
								</div>
								<div class="tab-con" v-if="menu3 == 0">
									<table class="table type-input">
										<colgroup>
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="20%" />
											<col width="auto" />
											<col width="auto" />
										</colgroup>
										<tr>
											<th></th>
											<th>층</th>
											<th>임대</th>
											<th>용도</th>
											<th>보증금</th>
											<th>월세</th>
											<th>관리비</th>
											<th>만기</th>
											<th>비고</th>
											<th>제외</th>
											<th>평당임대료</th>
										</tr>
										<draggable v-model="rentList" tag="tbody" item-key="building_rent_uid" @end="onEnd" handle=".ttg">
											<template #item="{ element }">
												<tr>
													<td class="ttg">
														<b-icon-arrows-expand />
													</td>
													<td class="text-center">
														<input
															type="text"
															class="form-control"
															v-model="element.rent_floor"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														/>
													</td>
													<td class="text-center">
														<money3
															class="form-control"
															v-model="element.rent_size_p"
															v-bind="$MONEY2"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														></money3>
													</td>
													<td class="text-center">
														<input
															type="text"
															class="form-control"
															v-model="element.rent_usage"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														/>
													</td>
													<td class="text-center">
														<money3
															class="form-control"
															v-model="element.rent_deposit"
															v-bind="$MONEY1"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														></money3>
													</td>
													<td class="text-center">
														<money3
															class="form-control"
															v-model="element.rent_money"
															v-bind="$MONEY1"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														></money3>
													</td>
													<td class="text-center">
														<money3
															class="form-control"
															v-model="element.mgr_fee"
															v-bind="$MONEY1"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														></money3>
													</td>
													<td class="text-center">
														<input
															type="text"
															class="form-control"
															v-model="element.end_date"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														/>
													</td>
													<td class="text-center">
														<input
															type="text"
															class="form-control"
															v-model="element.memo"
															@change="onUpdateData()"
															@keyup.enter="addFloorTable"
														/>
													</td>
													<td class="text-center">
														<label class="input-checkbox">
															<input
																type="checkbox"
																v-model="element.except_flag"
																true-value="Y"
																false-value="N"
																@change="onUpdateData()"
																@keyup.enter="addFloorTable"
															/>
															<span class="checkbox"></span>
														</label>
													</td>
													<td class="text-center">
														<money3 class="form-control" v-model="element.rent_ni" v-bind="$MONEY2" readonly></money3>
													</td>
												</tr>
											</template>
										</draggable>
									</table>

									<!-- <table class="table type-input">
										<colgroup>
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="auto" />
											<col width="20%" />
											<col width="auto" />
											<col width="auto" />
										</colgroup>
										<tr>
											<th>층</th>
											<th>임대</th>
											<th>용도</th>
											<th>보증금</th>
											<th>월세</th>
											<th>관리비</th>
											<th>만기</th>
											<th>비고</th>
											<th>제외</th>
											<th>평당임대료</th>
										</tr>
										<tr>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center"><input type="text" class="form-control" /></td>
											<td class="text-center">
												<label class="input-checkbox">
													<input type="checkbox" />
													<span class="checkbox"></span>
												</label>
											</td>
											<td class="text-center"><input type="text" class="form-control" /></td>
										</tr>
									</table> -->

									<table class="table type-input mt-5">
										<tr>
											<th rowspan="2">합계</th>
											<th>평</th>
											<th>보증금</th>
											<th>월세</th>
											<th>관리비</th>
											<th rowspan="2">월세+관리비</th>
											<td class="text-center" rowspan="2">{{ $filters.money(totalData.money + totalData.mgr) }}</td>
										</tr>
										<tr>
											<td class="text-center">{{ $filters.money(totalData.py) }}</td>
											<td class="text-center">{{ $filters.money(totalData.deposit) }}</td>
											<td class="text-center">{{ $filters.money(totalData.money) }}</td>
											<td class="text-center">{{ $filters.money(totalData.mgr) }}</td>
										</tr>
									</table>
								</div>
								<div class="tab-con" v-else-if="menu3 == 1">
									<div class="mb-2">
										<button type="button" class="btn btn-xsm btn-secondary m-r--1" @click="isPopupShow3 = true">
											공용면적안분
										</button>
										<button type="button" class="btn btn-xsm btn-secondary" @click="isPopupShow4 = true">
											건폐율/용적률
										</button>
									</div>
									<table class="table type-input">
										<colgroup>
											<col width="10%" />
											<col width="10%" />
											<col width="10%" />
											<col width="20%" />
											<col width="auto" />
											<col width="5%" />
										</colgroup>
										<tr>
											<th>층</th>
											<th>면적</th>
											<th>평수</th>
											<th>주구조</th>
											<th>층별용도</th>
											<th>제외</th>
										</tr>
										<tr :key="'floor_' + floor.building_floor_uid" v-for="floor in floorList">
											<td class="text-center">{{ floor.flrNoNm }}</td>
											<td class="text-center">{{ floor.area_m2 }}</td>
											<td class="text-center">{{ floor.area_py }}</td>
											<td class="text-center">{{ floor.strctCdNm }}</td>
											<td class="text-center">{{ floor.name }}</td>
											<td class="text-center">
												<label class="input-checkbox">
													<input
														type="checkbox"
														v-model="floor.chk_except"
														true-value="Y"
														false-value="N"
														@change="onUpdateFloor(), onUpdateData()"
													/>
													<span class="checkbox"></span>
												</label>
											</td>
										</tr>
									</table>

									<table class="table type-input mt-5">
										<colgroup>
											<col width="20%" />
											<col width="40%" />
											<col width="40%" />
										</colgroup>
										<tr>
											<th rowspan="2">합계</th>
											<th>면적</th>
											<th>평수</th>
										</tr>
										<tr>
											<td class="text-center">{{ floorTotal.m2 }}</td>
											<td class="text-center">{{ floorTotal.py }}</td>
										</tr>
									</table>
								</div>
								<div class="tab-con" v-else-if="menu3 == 2">
									<textarea class="form-control" rows="15" v-model="item.memo"></textarea>
								</div>
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
					연결물건등록
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
								<th>삭제</th>
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
							<tr v-for="(b, idx) in linkList" :key="'bububu_' + b.bid">
								<td>{{ idx + 1 }}</td>
								<td>{{ $ITEM_STATE[b.state] }}</td>
								<td>{{ b.building_name }} / {{ b.jibun_addr }}</td>
								<td>
									<button type="button" class="btn btn-xsm txt-c--red" @click="btnOnLinkDel(b.bid)">
										<b-icon-trash />
									</button>
								</td>
							</tr>
						</table>
					</div>
					<div class="btn-wrap mt-3">
						<button type="button" class="btn btn-md btn-primary" @click="isPopupShow1 = false">확인</button>
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
					<table class="table type-input mb-2">
						<tr>
							<th>신규</th>
							<td>
								<div class="row">
									<div class="col-6">
										<input type="text" class="form-control" v-model="fileName" />
									</div>
									<div class="col-6 d-flex align-items-center pl-0">
										<input type="file" class="" @change="fileFile($event)" />
									</div>
								</div>
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="onFileSave">등록</button>
							</td>
						</tr>
					</table>
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="40%" />
							<col width="40%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>파일명</th>
							<th>다운로드</th>
							<th>삭제</th>
						</tr>
						<tr v-for="(f, idx) in fileList" :key="'fff_' + f.id">
							<td>{{ idx + 1 }}</td>
							<td>
								<input type="text" class="form-control" v-model="f.usr_name" @keyup.enter="saveFileName(f)" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-light" @click="downFile(f.id, f)">
									<b-icon-download />{{ f.org_name }}
								</button>
							</td>
							<td>
								<button type="button" class="btn btn-xsm txt-c--red" @click="delFile(f.id, idx)">
									<b-icon-trash />
								</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow3" class="popup-wrap">
			<div class="dim" @click="isPopupShow3 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					공용면적안분
					<button type="button" class="btn btn-close" @click="isPopupShow3 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con" style="max-height: 900px; overflow: auto">
					<div class="popup-con">
						<table class="table">
							<tr>
								<th>층</th>
								<th>면적</th>
								<th>평수</th>
								<th>선택</th>
								<th>제외</th>
								<th>층별용도</th>
							</tr>
							<tr :key="'floor2_' + floor.building_floor_uid" v-for="floor in floorList">
								<td>{{ floor.flrNoNm }}</td>
								<td>{{ floor.area_m2 }}</td>
								<td>{{ floor.area_py }}</td>
								<td>
									<label class="input-checkbox">
										<input
											v-if="floor.chk_except == 'N'"
											type="checkbox"
											v-model="floor.chk_pa"
											true-value="Y"
											false-value="N"
											@change="onUpdateData"
										/>
										<span v-if="floor.chk_except == 'N'" class="checkbox"></span>
									</label>
								</td>
								<td>
									<label class="input-checkbox">
										<input
											type="checkbox"
											v-model="floor.chk_except"
											true-value="Y"
											false-value="N"
											@change="onUpdateData"
										/>
										<span class="checkbox"></span>
									</label>
								</td>
								<td>{{ floor.name }}</td>
							</tr>
						</table>
						<table class="table type-input mt-5 mb-1">
							<colgroup>
								<col width="15%" />
								<col width="25%" />
								<col width="25%" />
								<col width="10%" />
								<col width="10%" />
								<col width="35%" />
							</colgroup>
							<tr>
								<th>공용면적 합계</th>
								<td>
									<input type="text" class="form-control" v-model="sum_deposit_m2" readonly />
								</td>
								<td>
									<input type="text" class="form-control" v-model="sum_deposit_py" readonly />
								</td>
								<td>{{ chk_cnt }}</td>
								<td></td>
								<td></td>
							</tr>
						</table>
						<table class="table type-input">
							<tr>
								<th rowspan="2">층</th>
								<th rowspan="2">전용(㎡)</th>
								<th rowspan="2">전용(평)</th>
								<th rowspan="2">비율(%)</th>
								<th colspan="2">공용면적안분</th>
								<th rowspan="2">임대평수</th>
							</tr>
							<tr>
								<th>㎡</th>
								<th>평</th>
							</tr>
							<tr v-for="fg in floorGroup" :key="'fg_' + fg.flrNoNm">
								<td>{{ fg.flrNoNm }}</td>
								<td>
									<input type="text" class="form-control" v-model="fg.area_m2" readonly />
								</td>
								<td>
									<input type="text" class="form-control" v-model="fg.area_py" readonly />
								</td>

								<td>
									<input type="text" class="form-control" v-model="fg.pa_rate" readonly />
								</td>
								<td>
									<input type="text" class="form-control" v-model="fg.divide_m2" readonly />
								</td>
								<td>
									<input type="text" class="form-control" v-model="fg.divide_py" readonly />
								</td>
								<td>
									<input type="text" class="form-control" v-model="fg.rent_py" readonly />
								</td>
							</tr>
						</table>
						<div class="btn-wrap mt-3">
							<button type="button" class="btn btn-md btn-secondary" @click="isPopupShow3 = false">취소</button>
							<button type="button" class="btn btn-md btn-primary" @click="btnSaveFloor">저장</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow4" class="popup-wrap">
			<div class="dim" @click="isPopupShow4 = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					건폐율/용적률
					<button type="button" class="btn btn-close" @click="isPopupShow4 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<div class="popup-con">
						<table class="table">
							<tr>
								<th>층</th>
								<th>면적</th>
								<th>평수</th>
								<th>제외</th>
								<th>층별용도</th>
							</tr>
							<tr v-for="tableList2 in 5" :key="tableList2">
								<td>지하1층</td>
								<td>111.74</td>
								<td>33.90</td>
								<td>
									<label v-if="tableList2 === 5" class="input-checkbox">
										<input type="checkbox" />
										<span class="checkbox"></span>
									</label>
								</td>
								<td>일반음식점(일반음식점)</td>
							</tr>
						</table>
						<table class="table mt-3 mb-3">
							<colgroup>
								<col width="20%" />
								<col width="40%" />
								<col width="40%" />
							</colgroup>
							<tr>
								<th>층</th>
								<th>건폐율대상면적</th>
								<th>용적률대상면적</th>
							</tr>
							<tr>
								<td>1층</td>
								<td>265.45</td>
								<td>343.33</td>
							</tr>
						</table>
						<table class="table type-input">
							<tr>
								<th>대지면적</th>
								<td colspan="3">555.55㎡</td>
							</tr>
							<tr>
								<th>최대건폐율대상면적</th>
								<td><input type="text" class="form-control xxsm" readonly />㎡</td>
								<th>건폐율</th>
								<td><input type="text" class="form-control xxsm" readonly />㎡</td>
							</tr>
							<tr>
								<th>용적률대상면적합계</th>
								<td><input type="text" class="form-control xxsm" readonly />㎡</td>
								<th>용적률</th>
								<td><input type="text" class="form-control xxsm" readonly />㎡</td>
							</tr>
						</table>
						<div class="btn-wrap mt-3">
							<button type="button" class="btn btn-md btn-secondary">취소</button>
							<button type="button" class="btn btn-md btn-primary">적용</button>
						</div>
					</div>
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
		<div v-show="isPopupShow6" class="popup-wrap">
			<div class="dim" @click="isPopupShow6 = false"></div>
			<div class="popup md">
				<div class="popup-tit">
					연결주소등록
					<button type="button" class="btn btn-close" @click="isPopupShow6 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<div class="search-top mb-2">
						<div class="left">
							<label class="input-label">주소입력</label>

							<input type="text" class="form-control" placeholder="주소" v-model="adr" @keyup.enter="searchAddress" />
							<button type="button" class="btn btn-primary btn-sm" @click="searchAddress">검색</button>
							<button type="button" class="btn btn-success btn-sm" @click="btnOnCreate">연결주소등록</button>
						</div>
						<div class="right"></div>
					</div>
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
					</table>

					<div class="map sm mt-2"><div id="createMap"></div></div>
					<div class="txt-c--red mt-2 mb-1">※ 연결주소 목록</div>
					<div class="table-wrap" style="max-height: 20vh">
						<table class="table sm">
							<tr class="sticky">
								<th>도로명주소</th>
								<th>지번주소</th>
								<th>삭제</th>
							</tr>
							<tr v-for="addr in addrList" :key="'linkadr_' + addr.id">
								<td>{{ addr.road_addr }}</td>
								<td>{{ addr.jibun_addr }}</td>
								<td>
									<button type="button" class="btn btn-xsm txt-c--red" @click="btnOnDelete(addr.id, addr.land_index)">
										<b-icon-trash />
									</button>
								</td>
							</tr>
						</table>
					</div>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-primary" @click="isPopupShow6 = false">확인</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isPopupShow7" class="popup-wrap">
			<div class="dim" @click="isPopupShow7 = false"></div>
			<div class="popup lg">
				<div class="popup-tit">
					물건사진 업로드
					<button type="button" class="btn btn-close" @click="isPopupShow7 = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<ul class="photo-list">
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 0)" />
								<div class="img">
									<img :src="imgList[0].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[0].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(0)">&times;</button>
							<div class="text">건물외관</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 1)" />
								<div class="img">
									<img :src="imgList[1].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[1].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(1)">&times;</button>
							<div class="text">건물외관측면</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 2)" />
								<div class="img">
									<img :src="imgList[2].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[2].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(2)">&times;</button>
							<div class="text">외부출입계단</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 3)" />
								<div class="img">
									<img :src="imgList[3].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[3].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(3)">&times;</button>
							<div class="text">건물주차장</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 4)" />
								<div class="img">
									<img :src="imgList[4].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[4].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(4)">&times;</button>
							<div class="text">건물 주출입구</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 5)" />
								<div class="img">
									<img :src="imgList[5].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[5].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(5)">&times;</button>
							<div class="text">건물이면출입구</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 6)" />
								<div class="img">
									<img :src="imgList[6].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[6].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(6)">&times;</button>
							<div class="text">건물외부사진1</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 7)" />
								<div class="img">
									<img :src="imgList[7].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[7].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(7)">&times;</button>
							<div class="text">건물외부사진2</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 8)" />
								<div class="img">
									<img :src="imgList[8].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[8].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(8)">&times;</button>
							<div class="text">건물외부사진3</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 9)" />
								<div class="img">
									<img :src="imgList[9].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[9].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(9)">&times;</button>
							<div class="text">건물외부사진4</div>
						</li>
					</ul>
					<ul class="photo-list">
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 10)" />
								<div class="img">
									<img :src="imgList[10].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[10].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(10)">
								&times;
							</button>
							<div class="text">건물내부사진1</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 11)" />
								<div class="img">
									<img :src="imgList[11].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[11].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(11)">
								&times;
							</button>
							<div class="text">건물내부사진2</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 12)" />
								<div class="img">
									<img :src="imgList[12].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[12].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(12)">
								&times;
							</button>
							<div class="text">건물내부사진3</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 13)" />
								<div class="img">
									<img :src="imgList[13].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[13].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(13)">
								&times;
							</button>
							<div class="text">건물내부사진4</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 14)" />
								<div class="img">
									<img :src="imgList[14].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[14].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(14)">
								&times;
							</button>
							<div class="text">건물내부사진5</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 15)" />
								<div class="img">
									<img :src="imgList[15].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[15].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(15)">
								&times;
							</button>
							<div class="text">건물내부사진6</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 16)" />
								<div class="img">
									<img :src="imgList[16].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[16].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(16)">
								&times;
							</button>
							<div class="text">건물내부사진7</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 17)" />
								<div class="img">
									<img :src="imgList[17].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[17].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(17)">
								&times;
							</button>
							<div class="text">건물내부사진8</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 18)" />
								<div class="img">
									<img :src="imgList[18].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[18].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(18)">
								&times;
							</button>
							<div class="text">건물내부사진9</div>
						</li>
						<li class="photo-list--item">
							<label class="file">
								<input type="file" accept="image/*" @change="imgFile($event, 19)" />
								<div class="img">
									<img :src="imgList[19].veiwSrc" alt="" />
								</div>
							</label>
							<button v-if="imgList[19].veiwSrc" type="button" class="btn btn-delete" @click="imgDel(19)">
								&times;
							</button>
							<div class="text">건물내부사진10</div>
						</li>
					</ul>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-primary" @click="onImgSave">파일업로드</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import SlimSelect from '@slim-select/vue';

export default {
	name: 'MapSearch',
	components: { draggable, SlimSelect },
	data() {
		return {
			bid: null,
			item: null,
			memList: [],
			landList: [],
			rentList: [],
			floorList: [],
			floorTotal: { m2: 0, py: 0 },
			floorGroup: [],
			bdCateIdList: [],
			sell_status: null,

			isLoading: false,

			building_done_log_flag: false,
			building_hold_log_flag: false,

			multData: [],
			multSettings: {
				placeholderText: '매물종류',
				searchText: '결과 없음',
				searchPlaceholder: '검색',
			},

			sum_deposit_py: 0,
			sum_deposit_m2: 0,
			chk_cnt: 0,

			menu1: 0,
			menu2: 0,
			menu3: 0,

			dragging: false,

			typeList: {
				structure: [],
				gmok: [],
				heat_type: [],
				park_type: [],
				use_area: [],
				bd_cate: [],
			},

			isPopupShow1: false,
			isPopupShow2: false,
			isPopupShow3: false,
			isPopupShow4: false,
			isPopupShow5: false,
			isPopupShow6: false,
			isPopupShow7: false,

			mgrLogList: [],
			clientLogList: [],
			clientTypeList: [],
			viewObj: {},

			searchOptions: {
				type: '',
				keyword: '',
			},

			totalData: {
				py: 0,
				deposit: 0,
				money: 0,
				mgr: 0,
			},

			memType: false,

			file_1: null,
			fileObj: null,
			fileName: '',
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
			fileList: [],

			map: null,
			marker: null,
			mapType: null,
			adr: '',
			roadAddress: '',
			jibunAddress: '',
			zonecode: null,

			addrList: [],
			linkAddr: null,

			searchInfo: {
				st: false,
				st_: [],
				keyword: '',
			},
			buildingPage: {
				page: 1,
				pageData: null,
				totalCount: null,
				itemSize: 5,
				blockSize: 5,
			},
			buildingList: [],
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
	updated() {},
	created() {
		this.init();
	},
	methods: {
		init() {
			window.resultAddress2 = this.resultAddress2;

			this.bid = this.$route.params.id;
			this.getItem();
			this.getMgrLog();
			this.getClientLog();
			this.getClientType();
			this.getLand();
			this.getMem();
			this.getView();
			this.getFileList();

			this.getAddrList();

			for (let prop in this.typeList) {
				this.getType(prop);
			}
		},
		getItem() {
			this.$apiGET('/admin/api/detail/item?bid=' + this.bid + '&isRent=true').then(data => {
				for (let prop in data) {
					if (data[prop] == null) {
						data[prop] = '';
					}
				}
				data.build_date = this.$dateFormat(data.build_date);
				data.remodel_date = this.$dateFormat(data.remodel_date);
				data.bd_cate_uid = data.bd_cate_uid.split(',');
				this.item = data;

				for (let i = 0; i < this.item.imgList.length; i++) {
					if (this.item.imgList[i]) {
						this.imgList[i].src = this.item.imgList[i];
						this.imgList[i].veiwSrc = process.env.VUE_APP_HOST_FRONT + '/users/item/image2?id=' + this.item.imgList[i];
					}
				}

				this.sell_status = this.item.sell_status;

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
				this.getRent();
			});
		},
		getMem() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		getLand() {
			this.$apiGET('/admin/api/detail/item/edit/land2?bid=' + this.bid).then(data => {
				this.landList = data;
			});
		},
		getType(part) {
			this.$apiGET('/admin/api/setting?part=' + part).then(data => {
				this.strucList = data;

				this.typeList[part] = data;

				if (part == 'bd_cate') {
					this.$apiGET('/admin/api/cate2/get?bid=' + this.bid).then(data => {
						this.multData = [];

						for (let i = 0; i < this.typeList[part].length; i++) {
							this.multData.push({
								text: this.typeList[part][i].cfg_val1,
								value: this.typeList[part][i].ind_cfg_uid.toString(),
								selected: data.find(d => {
									if (d == this.typeList[part][i].ind_cfg_uid.toString()) {
										return true;
									} else {
										return false;
									}
								}),
							});
						}
					});
				}
			});
		},
		getRent() {
			this.$apiGET('/admin/api/detail/item/rent2?bid=' + this.bid).then(data => {
				if (data.length) {
					this.rentList = data;
				} else {
					this.addFloorTable();
				}

				this.getFloor();
			});
		},
		getFloor() {
			this.$apiGET('/admin/api/detail/item/floor2?bid=' + this.bid).then(data => {
				this.floorList = data;

				this.onUpdateData();
				this.onUpdateFloor();
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
		onEnd() {
			for (let i = 0; i < this.rentList.length; i++) {
				this.rentList[i].rent_index = i + 1;
			}
		},
		onUpdateFloor() {
			let m2 = 0;
			let py = 0;

			for (let i = 0; i < this.floorList.length; i++) {
				if (this.floorList[i].chk_except != 'Y') {
					m2 += this.floorList[i].area_m2;
					py += this.floorList[i].area_py;
				}
			}

			this.floorTotal.m2 = m2.toFixed(2);
			this.floorTotal.py = py.toFixed(2);
		},
		onUpdateData() {
			let py = 0;
			let deposit = 0;
			let money = 0;
			let mgr = 0;

			for (let i = 0; i < this.rentList.length; i++) {
				if (this.rentList[i].except_flag != 'Y') {
					py += Number(this.rentList[i].rent_size_p);
					deposit += Number(this.rentList[i].rent_deposit);
					money += Number(this.rentList[i].rent_money);
					mgr += Number(this.rentList[i].mgr_fee);

					if (this.rentList[i].rent_size_p > 0 && this.rentList[i].rent_money > 0) {
						this.rentList[i].rent_ni = (this.rentList[i].rent_money / this.rentList[i].rent_size_p).toFixed(2);
					} else {
						this.rentList[i].rent_ni = 0;
					}
				}
			}

			this.item.ex_sum_rent_deposit = deposit;
			this.item.ex_sum_rent_money = money;
			this.item.ex_sum_mgr_fee = mgr;

			this.totalData.py = py.toFixed(2);
			this.totalData.deposit = deposit;
			this.totalData.money = money;
			this.totalData.mgr = mgr;

			// let totEarn = mgr + money;

			let mgrEarn = this.item.ex_sum_mgr_fee - this.item.ex_sum_mgr_fee_out;
			let totEarn = this.item.ex_sum_rent_money + mgrEarn;

			let rateEarn = 0;
			let monthRateEarn = 0;

			if (totEarn > 0) {
				rateEarn = ((totEarn * 12) / (this.item.sell_price - this.item.ex_sum_rent_deposit)) * 100;
				monthRateEarn = (totEarn / (this.item.sell_price - this.item.ex_sum_rent_deposit)) * 100;
			}

			//////// 연면적평단가
			this.item.total_income =
				this.item.ex_sum_rent_money * 1 + this.item.ex_sum_mgr_fee * 1 - this.item.ex_sum_mgr_fee_out * 1;

			this.item.total_income_rate = Number(
				(((this.item.total_income * 12) / (this.item.sell_price - this.item.ex_sum_rent_deposit)) * 100).toFixed(2),
			);

			this.item.earning_rate = (Math.round(rateEarn * 100) / 100).toFixed(2);
			this.item.earning_month_rate = Math.round(monthRateEarn * 1000) / 1000;

			let total_size_p = this.item.total_size_m2 * this.$M2_PY_EX;
			let total_size_py_price = 0;

			if (this.item.sell_price > 0 && total_size_p > 0) {
				total_size_py_price = Math.round(this.item.sell_price / total_size_p);
			}

			this.item.total_size_py_price = total_size_py_price;

			/////// 토지평단가

			this.item.building_price = Math.round(this.item.building_price_py_price * total_size_p);

			let land_price = 0;

			if (this.item.sell_price > 0) {
				land_price = this.item.sell_price - this.item.building_price;
			}

			this.item.land_price = land_price;

			if (this.item.land_size_p > 0) {
				this.item.land_size_py_price = Math.round(this.item.land_price / this.item.land_size_p);
			}

			this.calcFloor();
		},
		onUpdateData2() {
			// this.item.monthly_fixed = Number(this.item.monthly_rent) + Number(this.item.main_fee);

			const rent_area_py = Number((this.item.rent_area_m2 * 0.3025).toFixed(2));
			this.item.rent_py_price = Number((this.item.monthly_rent / rent_area_py).toFixed(2));

			this.item.ex_rate = Number((this.item.net_area_m2 / this.item.rent_area_m2).toFixed(2)) * 100;
		},
		addFloorTable() {
			this.rentList.push({
				building_rent_uid: null,
				end_date: '',
				except_flag: 'N',
				memo: '',
				mgr_fee: '0',
				rent_deposit: 0,
				rent_floor: '',
				rent_index: this.rentList.length + 1,
				rent_money: 0,
				rent_ni: 0,
				rent_size_p: 0,
				rent_usage: '',
			});
		},
		calcFloor() {
			let result = [];
			let sum_deposit_py = 0;
			let sum_deposit_m2 = 0;
			let sum_total_m2 = 0;
			let chk_cnt = 0;

			this.floorList.reduce(function (res, value) {
				if (value.chk_except == 'N') {
					if (value.chk_pa == 'N') {
						if (!res[value.flrNoNm]) {
							res[value.flrNoNm] = {
								flrNoNm: value.flrNoNm,
								area_m2: 0,
								area_py: 0,

								pa_rate: 0,
								divide_m2: 0,
								divide_py: 0,
								rent_py: 0,
							};
							result.push(res[value.flrNoNm]);
						}
						res[value.flrNoNm].area_m2 += value.area_m2;
						res[value.flrNoNm].area_py += value.area_py;
						sum_total_m2 += value.area_m2;
					} else {
						sum_deposit_py += value.area_py;
						sum_deposit_m2 += value.area_m2;
						chk_cnt++;
					}
				}

				return res;
			}, {});

			for (let i = 0; i < result.length; i++) {
				const rate = (result[i].area_m2 / sum_total_m2) * 100;
				result[i].pa_rate = Math.round(rate * 1000) / 1000;

				const divide_m2 = (rate / 100) * sum_deposit_m2;
				const divide_py = divide_m2 * this.$M2_PY_EX;

				result[i].area_m2 = Math.round(result[i].area_m2 * 1000) / 1000;
				result[i].area_py = Math.round(result[i].area_py * 1000) / 1000;
				result[i].divide_m2 = Math.round(divide_m2 * 1000) / 1000;
				result[i].divide_py = Math.round(divide_py * 1000) / 1000;
				result[i].rent_py = Math.round((result[i].area_py * 1 + result[i].divide_py * 1) * 1000) / 1000;
			}

			this.floorGroup = result;
			this.sum_deposit_m2 = sum_deposit_m2.toFixed(2);
			this.sum_deposit_py = sum_deposit_py.toFixed(2);
			this.chk_cnt = chk_cnt;
		},
		backMenu() {
			this.$router.go(-1);
		},
		btnSaveFloor() {
			if (
				!confirm('공용면적안분 결과를 임대차내역에 등록하시겠습니까?\n\n기존에 등록된 공용면적안분 결과는 삭제됩니다.')
			) {
				return;
			}

			this.$apiPOST('/admin/api/detail/item/floor/edit2', {
				floorList: this.floorList,
				floorGroup: this.floorGroup,
				bid: this.bid,
			}).then(() => {
				this.btnSaveItem();
			});
		},
		btnSaveItem() {
			if (
				this.item.roadwide_1 > 32767 ||
				this.item.roadwide_2 > 32767 ||
				this.item.roadwide_3 > 32767 ||
				this.item.roadwide_4 > 32767
			) {
				alert('도로 범위 오버');
				return;
			}

			this.onUpdateData();
			this.onUpdateFloor();

			this.$apiPOST('/admin/api/detail/item/save2', {
				item: this.item,
				rent: this.rentList,
				cate: this.bdCateIdList.map(Number),
			}).then(() => {
				alert('저장 완료');
				this.$router.go(this.$router.currentRoute);
			});
		},
		btnReload() {
			if (
				!confirm(
					'표제부, 공시지가, 층별정보를 업데이트 하시겠습니까?\n\n업데이트후 화면이 새로고침되므로 수정중인 데이터가 유실될 수 있습니다.\n\n업데이트전에 수정중인 데이터는 저장하시기 바랍니다.',
				)
			) {
				return;
			}
			this.isLoading = true;
			this.$apiPOST('/admin/api/detail/item/reload2', { bid: this.bid }).then(re => {
				this.isLoading = false;
				if (re) {
					this.$router.go(this.$router.currentRoute);
				} else {
					alert('API Server ERROR 잠시후 다시 시도해주세요.');
				}
			});
		},
		async chkDoneLog() {
			const re = await this.$apiGET('/admin/api/log/done2?bid=' + this.bid);
			if (!re.length) {
				return true;
			} else {
				return false;
			}
		},
		async chgSellStatus() {
			this.onUpdateData();
			this.onUpdateFloor();

			const oldStatus = this.item.sell_status;
			const newStatus = this.sell_status;
			const name = this.$ITEM_STATE2[newStatus];
			this.building_done_log_flag = false;
			this.building_hold_log_flag = false;

			let msg = '[ ' + name + ' ] 상태로 전환하시겠습니까?';

			if (oldStatus == 'ready') {
				if (!confirm(msg)) {
					this.sell_status = oldStatus;
					return;
				}

				if (newStatus == 'done') {
					// if (confirm('누적 매물 개수에 반영하시겠습니까?') == true) {
					// 	if (await this.chkDoneLog()) {
					// 		this.building_done_log_flag = true;
					// 	} else {
					// 		this.sell_status = oldStatus;
					// 		alert('정보를 불러오는중 문제가 발생하였습니다. 잠시후에 다시 시도하시기 바랍니다.');
					// 		return;
					// 	}
					// }
				}
			} else if (oldStatus == 'done') {
				if (newStatus == 'ready') {
					this.sell_status = oldStatus;
					msg = '[ ' + name + ' ] 상태로 전환하실 수 없습니다.';
					alert(msg);
					return;
				}
			} else if (oldStatus == 'hold') {
				if (newStatus == 'ready') {
					this.sell_status = oldStatus;
					msg = '[ ' + name + ' ] 상태로 전환하실 수 없습니다.';
					alert(msg);
					return;
				}
			} else if (oldStatus == 'sell') {
				this.sell_status = oldStatus;
				msg = '[ ' + name + ' ] 상태로 전환하실 수 없습니다.';
				alert(msg);
				return;
			} else {
				if (!confirm(msg)) {
					this.sell_status = oldStatus;
					return;
				}
			}

			if (newStatus == 'done') {
				if (!this.item.building_name.length) {
					this.sell_status = oldStatus;
					alert('물건명을 입력하세요.');
					this.$refs.building_name.focus();
					return;
				}
				if (!this.item.substation.length) {
					this.sell_status = oldStatus;
					alert('주변역을 입력하세요.');
					this.$refs.substation.focus();
					return;
				}
				if (!this.item.substation_distance) {
					this.sell_status = oldStatus;
					alert('주변역과의 거리(M)을 입력하세요.');
					this.$refs.substation_distance.focus();
					return;
				}
				if (!this.item.land_size_p) {
					this.sell_status = oldStatus;
					alert('대지면적을 입력하세요.');
					this.$refs.land_size_p.focus();
					return;
				}
				if (!this.item.gmok) {
					this.sell_status = oldStatus;
					alert('지목을 선택하세요.');
					this.$refs.gmok.focus();
					return;
				}
				if (!this.item.use_area_uid) {
					this.sell_status = oldStatus;
					alert('용도지역을 선택하세요.');
					this.$refs.use_area_uid.focus();
					return;
				}
				if (!this.item.road_name) {
					this.sell_status = oldStatus;
					alert('도로명을 입력하세요.');
					this.$refs.road_name.focus();
					return;
				}
				if (!this.item.roadwide_1 && !this.item.roadwide_2 && !this.item.roadwide_3 && !this.item.roadwide_4) {
					this.sell_status = oldStatus;
					alert('도로사항을 1개이상 입력하세요.');
					this.$refs.roadwide_1.focus();
					return;
				}
				if (!this.item.owner_home_phone && !this.item.owner_office_phone && !this.owner_mobile_1) {
					this.sell_status = oldStatus;

					alert('연락처를 1개이상 입력하세요.');
					this.$refs.owner_home_phone.focus();
					return;
				}
				if (!this.item.owner_name) {
					this.sell_status = oldStatus;
					alert('소유자정보의 성명을 입력하세요.');
					this.$refs.owner_name.focus();
					return;
				}
				// if (this.item.ins_price == 0) {
				// 	this.sell_status = oldStatus;
				// 	alert('금액정보의 입금가를 입력하세요.');
				// 	// this.$refs.ins_price.focus();
				// 	return;
				// }
				// if (this.item.sell_price == 0) {
				// 	this.sell_status = oldStatus;
				// 	alert('금액정보의 매매희망가를 입력하세요.');
				// 	// this.$refs.ins_price.focus();
				// 	return;
				// }
			}

			if (!confirm(msg)) {
				this.sell_status = oldStatus;
				return;
			}
			if (oldStatus == 'done' && newStatus == 'hold' && this.building_done_log_flag) {
				if (confirm('누적 매물 개수에서 차감하시겠습니까?') == true) {
					this.building_hold_log_flag = true;
				}
			}

			this.item.sell_status = newStatus;
			//////////////////////////////////
			// 저장 call fun
			//////////////////////////////////
			this.btnSaveItem();
			//////////////////////////////////
		},
		imgDel(idx) {
			if (this.imgList[idx].src) {
				this.imgList[idx].id = this.imgList[idx].src;
			}

			this.imgList[idx].file = null;
			this.imgList[idx].src = null;
			this.imgList[idx].fileSrc = null;
			this.imgList[idx].veiwSrc = null;
		},
		async imgFile(e, idx) {
			if (!e.target.files.length) {
				return;
			}

			let { file, base64 } = await this.$imgResize(e.target.files[0]);

			if (!file.type.match('image/.*')) {
				alert('이미지 확장자만 업로드 가능합니다.');
				return;
			}

			this.imgList[idx].file = file;
			this.imgList[idx].fileSrc = base64;
			this.imgList[idx].veiwSrc = base64;

			// let file = e.target.files[0];

			// const reader = new FileReader();
			// reader.onload = e => {
			// 	this.imgList[idx].fileSrc = e.target.result;
			// 	this.imgList[idx].veiwSrc = e.target.result;
			// };

			// reader.readAsDataURL(file);
		},
		onImgSave() {
			let delImgList = [];
			for (let i = 0; i < this.imgList.length; i++) {
				if (this.imgList[i].id) {
					delImgList.push({ bid: this.bid, id: this.imgList[i].id, idx: i });
				}
			}

			if (delImgList.length) {
				this.$apiPOST('/admin/api/up/img2/del', { delImgList: delImgList }).then(() => {});
			}

			this.$apiIMG('/admin/api/up/img2', this.bid, this.imgList).then(re => {
				if (re) {
					alert('이미지 저장 완료');
					this.$router.go(this.$router.currentRoute);
				}
			});
		},

		async fileFile(e) {
			if (!e.target.files.length) {
				return;
			}

			this.fileObj = e.target.files[0];
		},
		onFileSave() {
			if (!this.fileName.length) {
				alert('파일명을 입력해 주세요.');
				return;
			}

			if (!this.fileObj) {
				alert('파일을 첨부해 주세요.');
				return;
			}

			this.$apiFILE('/admin/api/up/file2', this.bid, this.fileObj, this.fileName).then(re => {
				if (re) {
					alert('저장 완료');
					this.$router.go(this.$router.currentRoute);
				}
			});
		},
		getFileList() {
			this.$apiGET('/admin/api/up/file2?bid=' + this.bid).then(re => {
				this.fileList = re;
			});
		},
		saveFileName(f) {
			if (!f.usr_name.length) {
				alert('파일명을 입력해 주세요.');
				return;
			}

			this.$apiPOST('/admin/api/up/file/update2', { id: f.id, name: f.usr_name }).then(() => {});
		},
		delFile(id, idx) {
			this.$apiPOST('/admin/api/up/file/delete2', { id: id }).then(() => {
				this.fileList.splice(idx, 1);
			});
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
		delItem() {
			if (confirm('선택한 물건을 삭제하시겠습니까?') == true) {
				this.$apiPOST('/admin/api/detail/item/delete2', { bid: this.bid }).then(() => {
					window.close();
				});
			}
		},
		goKras() {
			var link =
				'http://kras.seoul.go.kr/land_info/info/baseInfo/baseInfo.do?service=baseInfo&landcode=' +
				this.item.pnu_code +
				'&gblDivName=baseInfo&scale=0&gyujae=0&label_type=false#t01-tab';
			window.open(link);
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
		btnOnPrint() {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('/RentPrintPage?bid=' + this.bid, '', attr);
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

					this.isPopupShow6 = true;
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

				window.resultAddress2(re.v2.addresses[0]);
			});
		},
		resultAddress2(item) {
			this.marker?.setMap(null);
			this.jibunAddress = '';
			this.roadAddress = '';
			this.zonecode = null;

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
		},
		btnOnCreate() {
			if (!this.adr.length) {
				alert('주소를 입력하세요.');
				return;
			}

			if (!confirm('연결주소를 등록하시겠습니까?')) {
				return;
			}

			this.isLoading = true;
			this.$apiPOST('/admin/api/detail/item/link/add2', {
				bid: this.bid,
				road_addr: this.roadAddress,
				jibun_addr: this.jibunAddress,
				lat: this.point.y,
				lng: this.point.x,
			}).then(re => {
				this.isLoading = false;
				if (re) {
					this.$router.go(this.$router.currentRoute);
				} else {
					alert('API Server ERROR 잠시후 다시 시도해주세요.');
				}
			});
		},
		btnOnDelete(id, idx) {
			this.isLoading = true;
			this.$apiPOST('/admin/api/detail/item/link/delete2', {
				id: id,
				idx: idx,
				bid: this.bid,
			}).then(re => {
				this.isLoading = false;
				if (re) {
					this.$router.go(this.$router.currentRoute);
				} else {
					alert('API Server ERROR 잠시후 다시 시도해주세요.');
				}
			});
		},
		getAddrList() {
			this.$apiGET('/admin/api/detail/item/edit/land2?bid=' + this.bid).then(data => {
				let jinbun_addr = '';

				this.addrList = JSON.parse(JSON.stringify(data));

				for (let i = 0; i < data.length; i++) {
					if (data[i].land_index == 1) {
						this.addrList.splice(i, 1);
						break;
					}
				}

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

				this.linkAddr = jinbun_addr;
			});
		},

		btnOnLinkAdd(bid) {
			this.$apiPOST('/admin/api/detail/item/link/b/add2', {
				bid: bid,
				ref_bid: this.bid,
			}).then(re => {
				if (re) {
					this.getList();
					alert('등록 완료');
				}
			});
		},
		btnOnLinkDel(bid) {
			this.$apiPOST('/admin/api/detail/item/link/b/delete2', {
				bid: bid,
				ref_bid: this.bid,
			}).then(re => {
				if (re) {
					this.getList();
				}
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
		getBuildingList(pg) {
			this.$apiGET(
				'/admin/api/user/admin/detail/building2?page=' +
					(pg - 1) * this.buildingPage.itemSize +
					'&keyword=' +
					this.searchInfo.keyword +
					'&st=' +
					this.searchInfo.st_,
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
		getPhoneMask(phoneNumber, cur) {
			if (!phoneNumber) return phoneNumber;
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

			let res = '';
			if (phoneNumber.length < 3) {
				res = phoneNumber;
			} else {
				if (phoneNumber.substr(0, 2) == '02') {
					if (phoneNumber.length <= 5) {
						//02-123-5678
						res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3);
					} else if (phoneNumber.length > 5 && phoneNumber.length <= 9) {
						//02-123-5678
						res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 3) + '-' + phoneNumber.substr(5);
					} else if (phoneNumber.length > 9) {
						//02-1234-5678
						res = phoneNumber.substr(0, 2) + '-' + phoneNumber.substr(2, 4) + '-' + phoneNumber.substr(6);
					}
				} else {
					if (phoneNumber.length < 8) {
						res = phoneNumber;
					} else if (phoneNumber.length == 8) {
						res = phoneNumber.substr(0, 4) + '-' + phoneNumber.substr(4);
					} else if (phoneNumber.length == 9) {
						res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
					} else if (phoneNumber.length == 10) {
						res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6);
					} else if (phoneNumber.length > 10) {
						//010-1234-5678
						res = phoneNumber.substr(0, 3) + '-' + phoneNumber.substr(3, 4) + '-' + phoneNumber.substr(7);
					}
				}
			}

			this.item[cur] = res;
		},
	},
};
</script>

<style lang="scss"></style>
