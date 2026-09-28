<template>
	<div class="wrap">
		<div class="content" v-if="item">
			<div class="detail-page">
				<div class="detail-page--top">
					<div class="left">
						<div class="state">
							<span class="date">{{ $dateFormat(item.reg_date) }}</span>
							<span class="date">No. {{ item.client_uid }}</span>
							<p class="name">{{ $CLIENT_TYPE[item.client_type] }}</p>
						</div>
					</div>
					<div class="info">
						<div class="top">
							<button type="button" class="btn btn-sm btn-secondary">{{ item.mgr_level }}</button>
						</div>
					</div>
					<div class="input-box">
						<label class="label">고객명</label>
						<input type="text" class="form-control" :value="item.name" disabled />
						<label class="label">담당자</label>
						<input type="text" class="form-control" :value="item.mgr_mem_name" disabled />
						<label class="label">등록일시</label>
						<input type="date" class="form-control" :value="$dateFormat(item.reg_date)" disabled />
					</div>
					<div class="page">
						<button type="button" class="btn first" @click="getTotal('first')"><b-icon-chevron-double-left /></button>
						<button type="button" class="btn prev" @click="getTotal('prev')"><b-icon-chevron-left /></button>
						<input type="text" class="form-control" v-model="searchInfoData.idx" @keyup.enter="getTotal('sel_idx')" />
						&nbsp;&nbsp;/&nbsp;&nbsp;
						<input
							type="text"
							class="form-control"
							v-model="searchInfoData.totalCount"
							disabled
							style="background-color: white"
						/>
						<button type="button" class="btn next" @click="getTotal('next')"><b-icon-chevron-right /></button>
						<button type="button" class="btn last" @click="getTotal('last')"><b-icon-chevron-double-right /></button>
					</div>
					<div class="right"><button class="btn btn-sm btn-danger" @click.stop="btnUserDelete()">삭제</button></div>
				</div>
				<div class="detail-page--con">
					<div class="left m-r--2">
						<div class="con">
							<div class="tit">
								매수고객정보
								<button type="button" class="btn icon" @click="isRegisterPopupShow = true"><b-icon-pencil /></button>
							</div>
							<table class="table type-input">
								<colgroup>
									<col width="15%" />
									<col width="35%" />
									<col width="15%" />
									<col width="35%" />
								</colgroup>
								<tr>
									<th>고객명/고객분류</th>
									<td>{{ item.name }}/{{ $CLIENT_TYPE[item.client_type] }}</td>
									<th>보증금</th>
									<td>{{ item.deposit }}</td>
								</tr>
								<tr>
									<th>연락처1</th>
									<td>
										{{ item.mobile }} <template v-if="item.mobile_memo">/ {{ item.mobile_memo }}</template>
									</td>
									<th>월고정비</th>
									<td>{{ item.monthly_fixed }}</td>
								</tr>
								<tr>
									<th>연락처2</th>
									<td>
										{{ item.mobile2 }} <template v-if="item.mobile2_memo">/ {{ item.mobile2_memo }}</template>
									</td>
									<th>찾는물건위치</th>
									<td>{{ item.find_area }}</td>
								</tr>
								<tr>
									<th>E-mail</th>
									<td>{{ item.email }}</td>
									<th>필요면적</th>
									<td>
										{{ item.req_area_m2 }}㎡ / {{ item.req_area_py }}py
										<template v-if="item.client_type == $CLIENT_TYPE.LESSEE">
											~ {{ item.req_area_m2_E }}㎡ / {{ item.req_area_py_E }}py
										</template>
									</td>
								</tr>
								<tr>
									<th>관리메모</th>
									<td colspan="3">
										<div class="text" v-html="item.memo?.split('\n').join('<br />')"></div>
									</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: logMode == false }"
									@click="logMode = false"
								>
									상담이력
								</button>
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: logMode == true }"
									@click="logMode = true"
								>
									변경내역
								</button>
							</div>
							<template v-if="logMode == false">
								<div class="input-top">
									<select class="form-control select" v-model="counselInfo.id">
										<option :value="t.ind_cfg_uid" :key="'ccc_' + t.ind_cfg_uid" v-for="t in counselTypeList">
											{{ t.cfg_val1 }}
										</option>
									</select>
									<input
										type="text"
										class="form-control"
										placeholder="상담내용을 입력하고 엔터를 누르시면 저장됩니다"
										v-model="counselInfo.data"
										@keyup.enter="btnSaveCounsel()"
									/>
								</div>
								<table class="table">
									<tr>
										<th>번호</th>
										<th>상담일자</th>
										<th>상담자</th>
										<th>상담구분</th>
										<th width="50%">상담내용</th>
									</tr>
									<tr v-for="(item, idx) in counselList" :key="item.mgr_log_uid">
										<td>{{ idx + 1 }}</td>
										<td>{{ item.rDate }}</td>
										<td>{{ item.mem_name }} {{ item.mem_rank_name }}</td>
										<td>{{ item.counsel_type_name }}</td>
										<td>
											<div class="txt-left">{{ item.memo }}</div>
										</td>
									</tr>
								</table>
							</template>
							<template v-else>
								<table class="table">
									<tr>
										<th>번호</th>
										<th>변경일자</th>
										<th>처리자</th>
										<th>변경구분</th>
										<th width="50%">변경내용</th>
									</tr>
									<tr v-for="(item, idx) in chgList" :key="item.mgr_log_uid">
										<td>{{ idx + 1 }}</td>
										<td>{{ item.mDate }}</td>
										<td>{{ item.mem_name }} {{ item.mem_rank_name }}</td>
										<td>{{ $CLIENT_LOG_TYPE[item.sub_type_key] }}</td>
										<td>
											<div class="txt-left">{{ item.memo }}</div>
										</td>
									</tr>
								</table>
							</template>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button type="button" class="btn tab active">투어관리</button>
							</div>
							<table class="table" v-if="!tourMode">
								<tr>
									<th>물건번호</th>
									<th>물건명</th>
									<th>주소</th>
									<th>Date</th>
									<th>층정보</th>
									<th>Any</th>
									<th>픽업</th>
									<th>수정</th>
									<th>취소</th>
									<th>수정/삭제</th>
								</tr>
								<tr
									v-for="(tour, idx) in tourList"
									:key="'tour_' + tour.id"
									@click="btnOnDetail(tour.bid, idx, 'count')"
								>
									<td>{{ tour.bid }}</td>
									<td>{{ tour.building_name }}</td>
									<td>{{ tour.jibun_addr }}</td>
									<td>{{ $dateFormat(tour.date) }}</td>
									<td>{{ tour.floor_info }}</td>
									<td>{{ tour.any }}</td>
									<td>{{ tour.pickup }}</td>
									<td>{{ tour.stEdite }}</td>
									<td>{{ tour.stCancel }}</td>
									<td>
										<button type="button" class="btn icon type2" @click.stop="tourMode = !tourMode">
											<b-icon-pencil-square />
										</button>
										<button type="button" class="btn icon type2 red" @click.stop="btnOnDeleteTour(tour.id)">
											<b-icon-trash />
										</button>
									</td>
								</tr>
							</table>
							<table class="table" v-else>
								<tr>
									<th>물건번호</th>
									<th>물건명</th>
									<th>주소</th>
									<th>Date</th>
									<th>층정보</th>
									<th>Any</th>
									<th>픽업</th>
									<th>수정</th>
									<th>취소</th>
									<th>저장</th>
								</tr>
								<tr v-for="tour in tourListEdit" :key="'tour1_' + tour.id">
									<td>{{ tour.bid }}</td>
									<td>{{ tour.building_name }}</td>
									<td>{{ tour.jibun_addr }}</td>
									<td>
										<input class="form-control xsm" type="date" v-model="tour.date" />
									</td>
									<td>
										{{ tour.floor_info }}
									</td>
									<td>
										<select v-model="tour.any" class="form-control select">
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									<td>
										<select v-model="tour.pickup" class="form-control select">
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									<td>
										<select v-model="tour.stEdite" class="form-control select">
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									<td>
										<select v-model="tour.stCancel" class="form-control select">
											<option value="Y">Y</option>
											<option value="N">N</option>
										</select>
									</td>
									<td>
										<button type="button" class="btn icon type2" @click="btnOnEditTour">
											<b-icon-pencil-square />
										</button>
									</td>
								</tr>
							</table>
						</div>
						<div class="con">
							<div class="tab-btn">
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: briefMode == 'ready' }"
									@click="briefMode = 'ready'"
								>
									브리핑대기
								</button>
								<button
									type="button"
									class="btn tab"
									v-bind:class="{ active: briefMode == 'done' }"
									@click="briefMode = 'done'"
								>
									브리핑완료
								</button>
								<div class="right">
									<button type="button" class="btn btn-sm btn-secondary" @click="btnOnATA">알림톡</button>&nbsp;
									<button type="button" class="btn btn-sm btn-secondary" @click="btnOnPrint">연쇄출력</button>
								</div>
							</div>
							<table class="table" v-if="briefMode == 'ready'">
								<tr>
									<th>상태</th>
									<th>물건번호</th>
									<th>물건명</th>
									<th>주소</th>
									<th>보증금(만)</th>
									<th>월고정비</th>
									<th>완료/출력</th>
									<th>
										<label class="input-checkbox">
											<input type="checkbox" v-model="printSt" @change="setPrintAllSt" />
											<span class="checkbox"></span>
										</label>
									</th>
								</tr>
								<template v-for="item in briefList" :key="'cde_' + item.client_building_link_uid">
									<template v-if="item.brief_status == briefMode">
										<tr @click="btnOnDetail(item.building_uid, null, 'brief')">
											<td>{{ $ITEM_STATE[item.sell_status] }}</td>
											<td>{{ item.building_uid }}</td>
											<td>{{ item.building_name }}</td>
											<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>
											<td>
												{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.MUCH) }}
											</td>
											<td>{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.MUCH) }}</td>
											<td>
												<button type="button" class="btn icon type2 yellow" @click.stop="item.state = !item.state">
													<b-icon-eye />
												</button>
												<button type="button" class="btn icon type2"><b-icon-printer /></button>
												<button
													type="button"
													class="btn icon type2 red"
													@click.stop="btnDeleteBrief(item.client_building_link_uid)"
												>
													<b-icon-trash />
												</button>
											</td>
											<td>
												<label class="input-checkbox" @click.stop>
													<input type="checkbox" v-model="item.printSt" />
													<span class="checkbox"></span>
												</label>
											</td>
										</tr>
										<tr v-if="item.state">
											<td colspan="4"></td>
											<td>브리핑금액(월고정비)</td>
											<td colspan="2">
												<input
													type="number"
													class="form-control"
													v-model="item.brief_price"
													@keyup.enter="btnSaveBrief(item)"
												/>
												<span class="text">만원</span>
											</td>
											<td>
												<button type="button" class="btn btn-xxsm btn-red" @click="item.state = false">취소</button>
											</td>
										</tr>
									</template>
								</template>
							</table>
							<table class="table" v-else>
								<tr>
									<th>상태</th>
									<th>물건번호</th>
									<th>물건명</th>
									<th>주소</th>
									<th>월고정비</th>
									<th>브리핑금액</th>
									<th>출력</th>
									<th>
										<label class="input-checkbox">
											<input type="checkbox" v-model="printSt" @change="setPrintAllSt" />
											<span class="checkbox"></span>
										</label>
									</th>
								</tr>
								<template v-for="item in briefList" :key="'cde_' + item.client_building_link_uid">
									<template v-if="item.brief_status == briefMode">
										<tr @click="btnOnDetail(item.building_uid, null, 'brief')">
											<td>{{ $ITEM_STATE[item.sell_status] }}</td>
											<td>{{ item.building_uid }}</td>
											<td>{{ item.building_name }}</td>
											<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>
											<td>
												<span class="txt-c--red">{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.MUCH) }}</span>
											</td>
											<td>
												<span class="txt-c--red">{{ $formatMoney(item.brief_price, $MONEY_FORMAT_TYPE.MUCH) }}</span>
											</td>
											<td>
												<button type="button" class="btn icon type2"><b-icon-printer /></button>
											</td>
										</tr>
									</template>
								</template>
							</table>
						</div>
					</div>
					<div class="right">
						<div class="con">
							<div class="input-top">
								<label class="input-label">검색키워드</label>
								<input
									type="text"
									class="form-control"
									placeholder="물건명, 주소, 소유자, 전소유자, 전화번호"
									v-model="searchInfo.keyword"
								/>
								<label class="input-label">매물상태</label>
								<label class="input-checkbox">
									<input type="checkbox" v-model="searchInfo.st" @change="btnStOption" />
									<span class="checkbox"></span>
									<span class="text">전체</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" v-model="searchInfo.st_" :value="'ready'" />
									<span class="checkbox"></span>
									<span class="text">준비</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" v-model="searchInfo.st_" :value="'done'" />
									<span class="checkbox"></span>
									<span class="text">매물</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" v-model="searchInfo.st_" :value="'hold'" />
									<span class="checkbox"></span>
									<span class="text">보류</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" v-model="searchInfo.st_" :value="'sell'" />
									<span class="checkbox"></span>
									<span class="text">임대완료</span>
								</label>
								<button type="button" class="btn btn-xsm btn-secondary" @click="getBuildingList(1)">검색</button>
							</div>
							<table class="table">
								<tr>
									<th>브리핑</th>
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
									v-for="(item, idx) in buildingList"
									:key="'dbid_' + item.bid"
									@click="btnOnDetail(item.bid, idx, 'user_total')"
								>
									<td @click.stop>
										<label class="input-checkbox">
											<input type="checkbox" v-model="addBriefList2" :value="item.bid" />
											<span class="checkbox"></span>
										</label>
									</td>
									<td>{{ $ITEM_STATE[item.state] }}</td>
									<td>{{ item.bid }}</td>
									<td>{{ item.building_name }}</td>
									<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>

									<td>{{ item.rent_area_py }} / {{ item.net_area_py }}</td>
									<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.MUCH) }}</td>
									<td>{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.MUCH) }}</td>
									<td>{{ item.substation }}</td>
								</tr>
							</table>
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

							<div class="btn-wrap m-3 mb-2">
								<button type="button" class="btn btn-sm btn-secondary" @click="btnAddBrief2">
									브리핑대기 물건저장
								</button>
							</div>
						</div>
						<div class="con">
							<div class="tit">최근물건</div>
							<table class="table">
								<tr>
									<th>브리핑</th>
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
									v-for="(item, idx) in countList"
									:key="'de_' + item.building_view_log_uid"
									@click="btnOnDetail(item.building_uid, idx, 'user_count')"
								>
									<td @click.stop>
										<label class="input-checkbox">
											<input type="checkbox" v-model="addBriefList" :value="item.building_uid" />
											<span class="checkbox"></span>
										</label>
									</td>
									<td>{{ $ITEM_STATE[item.sell_status] }}</td>
									<td>{{ item.building_uid }}</td>
									<td>{{ item.building_name }}</td>
									<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>

									<td>{{ item.rent_area_py }} / {{ item.net_area_py }}</td>
									<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.MUCH) }}</td>
									<td>{{ $formatMoney(item.monthly_fixed, $MONEY_FORMAT_TYPE.MUCH) }}</td>
									<td>{{ item.substation }}</td>
								</tr>
							</table>

							<ul
								class="pagination b-pagination pagination-sm"
								v-if="countPage.pageData != null && countPage.pageData.list.length"
							>
								<li class="page-item" v-bind:class="{ disabled: 1 == countPage.page }">
									<button type="button" class="page-link" @click="getCountList(1)">
										<b-icon-chevron-double-left />
									</button>
								</li>

								<li class="page-item" v-bind:class="{ disabled: countPage.pageData.first == null }">
									<button
										type="button"
										class="page-link"
										@click="countPage.pageData.first !== null ? getCountList(countPage.pageData.first) : ''"
									>
										<b-icon-chevron-left />
									</button>
								</li>
								<li
									v-for="pg in countPage.pageData.list"
									v-bind:key="'pg_' + pg"
									class="page-item"
									v-bind:class="{ active: countPage.pageData.currentPage == pg }"
								>
									<button type="button" class="page-link" @click="getCountList(pg)">{{ pg }}</button>
								</li>
								<li class="page-item" v-bind:class="{ disabled: countPage.pageData.end == null }">
									<button
										type="button"
										class="page-link"
										@click="countPage.pageData.end !== null ? getCountList(countPage.pageData.end) : ''"
									>
										<b-icon-chevron-right />
									</button>
								</li>

								<li class="page-item" v-bind:class="{ disabled: countPage.pageData.totalPage == countPage.page }">
									<button type="button" class="page-link" @click="getCountList(countPage.pageData.totalPage)">
										<b-icon-chevron-double-right />
									</button>
								</li>
							</ul>

							<div class="btn-wrap m-3 mb-2">
								<button type="button" class="btn btn-sm btn-secondary" @click="btnAddBrief">브리핑대기 물건저장</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="isRegisterPopupShow" class="popup-wrap">
		<div class="dim" @click="isRegisterPopupShow = false"></div>
		<div class="popup sm">
			<div class="popup-tit">
				임대차고객정보
				<button type="button" class="btn btn-close" @click="isRegisterPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<tr>
						<th>담당자</th>
						<td>
							<select v-model="addInfo.mgrUid" class="form-control select">
								<option value="" selected>전체</option>
								<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
									{{ c.mem_name }} {{ c.mem_rank_name }}
								</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>고객구분</th>
						<td>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'lessee'" />
								<span class="checkbox radio"></span>
								<span class="text">임차인</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'landlord'" />
								<span class="checkbox radio"></span>
								<span class="text">임대인</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'black'" />
								<span class="checkbox radio"></span>
								<span class="text">블랙</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'contract'" />
								<span class="checkbox radio"></span>
								<span class="text">계약</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>관리등급</th>
						<td>
							<label class="input-checkbox">
								<input type="radio" name="radio2" v-model="addInfo.mgrLevel" :value="'A'" />
								<span class="checkbox radio"></span>
								<span class="text">A</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio2" v-model="addInfo.mgrLevel" :value="'B'" />
								<span class="checkbox radio"></span>
								<span class="text">B</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio2" v-model="addInfo.mgrLevel" :value="'C'" />
								<span class="checkbox radio"></span>
								<span class="text">C</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>고객명</th>
						<td>
							<div class="form-wrap">
								<input class="form-control" type="text" v-model="addInfo.clientName" />
							</div>
						</td>
					</tr>
					<tr>
						<th>연락처1</th>
						<td>
							<div class="form-wrap">
								<!-- <input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile1" /> -->

								<input
									type="tel"
									class="form-control"
									placeholder="연락처"
									v-model="addInfo.clientMobile1"
									@keyup="getPhoneMask(addInfo.clientMobile1, 'clientMobile1')"
								/>

								<input class="form-control" type="text" placeholder="메모" v-model="addInfo.clientMobileMemo1" />
							</div>
						</td>
					</tr>
					<tr>
						<th>연락처2</th>
						<td>
							<div class="form-wrap">
								<!-- <input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile2" /> -->
								<input
									type="tel"
									class="form-control"
									placeholder="연락처"
									v-model="addInfo.clientMobile2"
									@keyup="getPhoneMask(addInfo.clientMobile2, 'clientMobile2')"
								/>
								<input class="form-control" type="text" placeholder="메모" v-model="addInfo.clientMobileMemo2" />
							</div>
						</td>
					</tr>
					<tr>
						<th>이메일</th>
						<td>
							<div class="form-wrap">
								<input class="form-control" type="email" v-model="addInfo.clientEmail" />
							</div>
						</td>
					</tr>
					<template v-if="addInfo.clientType == 'lessee'">
						<tr>
							<th>회사이름</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.company" />
								</div>
							</td>
						</tr>
						<tr>
							<th>평수</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.req_area_py" />
									<span class="form-text">PY ~ </span>
									<input class="form-control" type="number" v-model="addInfo.req_area_py_E" />
									<span class="form-text">PY</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>선호위치</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.findArea" />
								</div>
							</td>
						</tr>
						<tr>
							<th>월 임대료</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.monthly_rent" />
									<span class="form-text">만 ~ </span>
									<input class="form-control" type="number" v-model="addInfo.monthly_rent_E" />
									<span class="form-text">만</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>사옥 매입고려</th>
							<td>
								<label class="input-checkbox">
									<input type="radio" name="radio5" v-model="addInfo.officeSt" :value="'Y'" />
									<span class="checkbox radio"></span>
									<span class="text">예</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" name="radio5" v-model="addInfo.officeSt" :value="'N'" />
									<span class="checkbox radio"></span>
									<span class="text">아니로</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>선호하는 조건</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.likePick" />
								</div>
							</td>
						</tr>
						<tr>
							<th>추가로 원하는 조건</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.conditions" />
								</div>
							</td>
						</tr>
						<tr>
							<th>입주예정 시기</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="date" v-model="addInfo.inDate" />
								</div>
							</td>
						</tr>
						<tr>
							<th>업종</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.sector" />
								</div>
							</td>
						</tr>
						<tr>
							<th>인테리어 시공 고려</th>
							<td>
								<label class="input-checkbox">
									<input type="radio" name="radio3" v-model="addInfo.interior" :value="'Y'" />
									<span class="checkbox radio"></span>
									<span class="text">예</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" name="radio3" v-model="addInfo.interior" :value="'N'" />
									<span class="checkbox radio"></span>
									<span class="text">아니로</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>알게 된 경로</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.route" />
								</div>
							</td>
						</tr>
					</template>
					<template v-else-if="addInfo.clientType == 'landlord'">
						<tr>
							<th>보증금</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.deposit" />
									<span class="form-text">만원</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>월세/관리비</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.monthly_rent" />
									<span class="form-text">만원</span>
									<input class="form-control" type="number" v-model="addInfo.main_fee" />
									<span class="form-text">만원</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>주소</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.addr" />
								</div>
							</td>
						</tr>
						<tr>
							<th>면적(㎡)</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.rent_area_m2" />
									<span class="form-text">계약</span>
									<input class="form-control" type="number" v-model="addInfo.net_area_m2" />
									<span class="form-text">전용</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>계약만기일</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="date" v-model="addInfo.end_date" />
								</div>
							</td>
						</tr>
						<tr>
							<th>월고정비</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.monthly_fixed" />
									<span class="form-text">만원</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>필요 면적</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="number" v-model="addInfo.req_area_py" />
									<span class="form-text">PY</span>
								</div>
							</td>
						</tr>
						<tr>
							<th>찾는위치</th>
							<td>
								<div class="form-wrap">
									<input class="form-control" type="text" v-model="addInfo.findArea" />
								</div>
							</td>
						</tr>
						<tr>
							<th>관리메모</th>
							<td>
								<div class="form-wrap">
									<textarea class="form-control" v-model="addInfo.clientMemo"></textarea>
								</div>
							</td>
						</tr>
					</template>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-secondary" @click="isRegisterPopupShow = false">취소</button>
					<button type="button" class="btn btn-sm btn-primary" @click="btnUserUpdate()">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'LeaseUserDetail',
	props: {
		cid: { type: Number },
	},
	components: {},
	created() {
		this.id = this.$route.params.id;

		this.searchInfoData = this.$route.query;

		this.init();
	},
	data() {
		return {
			item: null,
			isRegisterPopupShow: false,
			memList: [],
			buildingList: [],
			countList: [],
			briefList: [],
			addBriefList: [],
			addBriefList2: [],
			counselList: [],
			chgList: [],
			counselTypeList: [],
			tourList: [],
			tourListEdit: [],
			briefMode: 'ready',
			logMode: false,
			tourMode: false,

			printSt: false,

			counselInfo: {
				id: null,
				data: '',
			},

			addInfo: {
				mgrUid: '',
				clientType: '', //고객구분
				mgrLevel: '',

				deposit: 0, //보증금,
				monthly_rent: 0, //월세
				main_fee: 0, //관리비
				rent_area_m2: 0, //계약면적
				net_area_m2: 0, //전용면적
				end_date: '', //계약만기일
				monthly_fixed: 0, //월고정비
				req_area_py: 0, //필요면적
				addr: '', //주소

				clientName: '', //고객명
				clientMobile1: '', //연락처
				clientMobile2: '', //연락처
				clientMobileMemo1: '', //연락처
				clientMobileMemo2: '', //연락처
				clientEmail: '', //이메일
				clientMemo: '', //메모

				findArea: '', //찾는위치

				company: '',
				officeSt: '',
				likePick: '',
				conditions: '',
				inDate: '',
				sector: '',
				interior: '',
				route: '',

				req_area_py_E: 0,
				monthly_rent_E: 0,

				cid: null,
			},

			searchInfo: {
				st: false,
				st_: [],
				keyword: '',
			},

			countPage: {
				page: 1,
				pageData: null,
				totalCount: null,
				itemSize: 5,
				blockSize: 5,
			},

			buildingPage: {
				page: 1,
				pageData: null,
				totalCount: null,
				itemSize: 5,
				blockSize: 5,
			},

			searchInfoData: null,
		};
	},
	methods: {
		init() {
			this.getItem();
			this.getMemList();
			this.getCountList(1);
			this.getBuildingList(1);
			this.getBriefList();
			this.getCounselList();
			this.getCounselTypeList();
		},
		getItem() {
			this.$apiGET('/admin/api/user/admin/detail2?cid=' + this.id).then(data => {
				this.item = data;

				this.addInfo.mgrUid = data.mgr_mem_uid;
				this.addInfo.clientType = data.client_type;
				this.addInfo.mgrLevel = data.mgr_level;
				this.addInfo.deposit = data.deposit;
				this.addInfo.monthly_rent = data.monthly_rent;
				this.addInfo.main_fee = data.main_fee;
				this.addInfo.rent_area_m2 = data.rent_area_m2;
				this.addInfo.net_area_m2 = data.net_area_m2;

				this.addInfo.monthly_fixed = data.monthly_fixed;
				this.addInfo.req_area_py = data.req_area_py;
				this.addInfo.addr = data.addr;
				this.addInfo.clientName = data.name;
				this.addInfo.clientMobile1 = data.mobile;
				this.addInfo.clientMobile2 = data.mobile2;
				this.addInfo.clientMobileMemo1 = data.mobile_memo;
				this.addInfo.clientMobileMemo2 = data.mobile2_memo;
				this.addInfo.clientEmail = data.email;
				this.addInfo.clientMemo = data.memo;
				this.addInfo.findArea = data.find_area;
				this.addInfo.company = data.company;
				this.addInfo.officeSt = data.officeSt;
				this.addInfo.likePick = data.likePick;
				this.addInfo.conditions = data.conditions;

				this.addInfo.inDate = this.$dateFormat(data.inDate);
				this.addInfo.end_date = this.$dateFormat(data.end_date);

				this.addInfo.sector = data.sector;
				this.addInfo.interior = data.interior;
				this.addInfo.route = data.route;

				this.addInfo.req_area_py_E = data.req_area_py_E;
				this.addInfo.monthly_rent_E = data.monthly_rent_E;

				this.getTourList();
			});
		},
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		getTourList() {
			this.$apiGET('/admin/api/tour/get?userId=' + this.item.userId).then(data => {
				for (let i = 0; i < data.length; i++) {
					data[i].date = this.$dateFormat(data[i].date);
				}

				this.tourList = JSON.parse(JSON.stringify(data));
				this.tourListEdit = JSON.parse(JSON.stringify(data));
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
		getCountList(pg) {
			this.$apiGET('/admin/api/user/admin/detail/count2?page=' + (pg - 1) * this.countPage.itemSize).then(data => {
				this.countList = data.item;

				this.countPage.totalCount = data.pageInfo.totalCount;
				this.countPage.page = pg;
				this.countPage.pageData = this.$pageDataSetting(
					this.countPage.totalCount,
					this.countPage.itemSize,
					this.countPage.blockSize,
					this.countPage.page,
				);
			});
		},
		getBriefList() {
			this.$apiGET('/admin/api/user/admin/detail/brief2?cid=' + this.id).then(data => {
				for (let i = 0; i < data.length; i++) {
					data[i].printSt = false;
					data[i].state = false;
				}
				this.briefList = data;
			});
		},
		getCounselList() {
			this.counselList = [];
			this.chgList = [];
			this.$apiGET('/admin/api/user/admin/detail/counsel2?cid=' + this.id).then(data => {
				for (let i = 0; i < data.length; i++) {
					if (data[i].log_type == 'counsel') {
						this.counselList.push(data[i]);
					} else if (data[i].log_type == 'chg_info') {
						this.chgList.push(data[i]);
					}
				}
			});
		},
		getCounselTypeList() {
			this.$apiGET('/admin/api/user/admin/detail/counsel/type').then(data => {
				this.counselTypeList = data;

				if (this.counselTypeList.length) {
					this.counselInfo.id = this.counselTypeList[0].ind_cfg_uid;
				}
			});
		},
		btnAddBrief() {
			for (let i = 0; i < this.addBriefList.length; i++) {
				this.$apiPOST('/admin/api/user/admin/detail/brief2/add', {
					cid: this.id,
					bid: this.addBriefList[i],
				}).then(() => {
					this.addBriefList = [];
					this.getBriefList();
				});
			}
			alert('저장이 완료되었습니다.');
		},
		btnAddBrief2() {
			for (let i = 0; i < this.addBriefList2.length; i++) {
				this.$apiPOST('/admin/api/user/admin/detail/brief2/add', {
					cid: this.id,
					bid: this.addBriefList2[i],
				}).then(() => {
					this.addBriefList2 = [];
					this.getBriefList();
				});
			}
			alert('저장이 완료되었습니다.');
		},
		btnSaveBrief(item) {
			this.$apiPOST('/admin/api/user/admin/detail/brief2/done', {
				lid: item.client_building_link_uid,
				price: item.brief_price * 10000,
			}).then(() => {
				this.getBriefList();
				alert('저장이 완료되었습니다.');
			});
		},
		btnDeleteBrief(id) {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/api/user/admin/detail/brief2/delete', {
				lid: id,
			}).then(() => {
				this.getBriefList();
			});
		},
		btnSaveCounsel() {
			this.$apiPOST('/admin/api/user/admin/detail/counsel2/add', {
				cid: this.id,
				subId: this.counselInfo.id,
				memo: this.counselInfo.data,
			}).then(() => {
				this.counselInfo.data = '';
				this.getCounselList();
			});
		},
		btnUserUpdate() {
			this.addInfo.cid = this.id;

			this.$apiPOST('/admin/api/user/admin/detail/counsel2/update', this.addInfo).then(data => {
				if (!data) {
					return;
				} else if (data.error) {
					const err = data.info;

					alert(
						'[' +
							this.$CLIENT_TYPE[err.client_type] +
							']\n[' +
							err.mgr_mem_name +
							'] 의 [' +
							err.name +
							'] 고객으로 이미 등록 되어있습니다.',
					);
				} else {
					this.getItem();
					this.getCounselList();
					this.isRegisterPopupShow = false;
					alert('저장이 완료되었습니다.');
				}
			});
		},
		btnStOption() {
			if (this.searchInfo.st) {
				this.searchInfo.st_ = ['sell', 'ready', 'hold', 'done'];
			} else {
				this.searchInfo.st_ = [];
			}
		},
		btnUserDelete() {
			if (!confirm('정말로 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {
				return;
			}
			this.$apiPOST('/admin/api/user/admin/delete2', { cid: this.id, userId: this.item.userId }).then(() => {
				window.open('', '_self').close();
			});
		},
		setPrintAllSt() {
			for (let i = 0; i < this.briefList.length; i++) {
				this.briefList[i].printSt = this.printSt;
			}
		},
		btnOnPrint() {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			let printIdList = [];

			for (let i = 0; i < this.briefList.length; i++) {
				if (this.briefList[i].printSt) {
					printIdList.push(this.briefList[i].building_uid);
				}
			}

			window.open('/RentPrintPage2?bid=' + printIdList, '', attr);
		},
		getTotal(act_type) {
			switch (act_type) {
				case 'first': //  맨처음      : idx = 1로 변경한다.
					if (this.searchInfoData.idx == 1) {
						alert('처음입니다.');
						return;
					}
					this.searchInfoData.idx = 1;
					break;
				case 'prev': //  이전        : 현재 idx = idx - 1 로 변경한다.
					if (this.searchInfoData.idx == 1) {
						alert('처음입니다.');
						return;
					}
					this.searchInfoData.idx--;
					break;
				case 'next': //  다음        : 현재 idx = idx + 1 로 변경한다.
					if (this.searchInfoData.idx == this.searchInfoData.totalCount) {
						alert('마지막입니다.');
						return;
					}
					this.searchInfoData.idx++;
					break;
				case 'last': //  마지막      : 현재 idx = 마지막으로 변경한다.
					if (this.searchInfoData.idx == this.searchInfoData.totalCount) {
						alert('마지막입니다.');
						return;
					}
					this.searchInfoData.idx = this.searchInfoData.totalCount;
					break;
			}

			this.$apiGET(
				'/admin/api/user/admin/count2?clientType=' +
					this.searchInfoData.clientType +
					'&clientName=' +
					this.searchInfoData.clientName +
					'&clientMobile=' +
					this.searchInfoData.clientMobile +
					'&monthly_rent_S=' +
					this.searchInfoData.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchInfoData.monthly_rent_E +
					'&clientLevel=' +
					this.searchInfoData.clientLevel +
					'&mId=' +
					this.searchInfoData.mId +
					'&findArea=' +
					this.searchInfoData.findArea +
					'&page=' +
					(this.searchInfoData.idx - 1),
			).then(data => {
				this.id = data.client_uid;
				this.init();
				this.$router.push({ path: '/LeaseUserDetail/' + this.id, query: this.searchInfoData });
			});
		},
		btnOnDetail(cid, idx, mode) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (mode == 'user_total') {
				window.open(
					'/LeaseMapDetail/' +
						cid +
						'?st=' +
						this.searchInfo.st_ +
						'&keyword=' +
						this.searchInfo.keyword +
						'&idx=' +
						(idx + 1 + (this.buildingPage.page - 1) * this.buildingPage.itemSize) +
						'&totalCount=' +
						this.buildingPage.totalCount +
						'&mode=' +
						mode,
					'',
					attr,
				);
			} else if (mode == 'user_count') {
				window.open(
					'/LeaseMapDetail/' +
						cid +
						'?idx=' +
						(idx + 1 + (this.countPage.page - 1) * this.countPage.itemSize) +
						'&totalCount=' +
						this.countPage.totalCount +
						'&mode=' +
						mode,
					'',
					attr,
				);
			} else if (mode == 'count') {
				let idList = [];
				let idx_ = 0;

				for (let i = 0; i < this.tourList.length; i++) {
					idList.push(this.tourList[i].bid);
				}

				idList = idList.filter((arr, index, callback) => index === callback.findIndex(t => t === arr));

				for (let i = 0; i < idList.length; i++) {
					if (idList[i] == cid) {
						idx_ = i;
						break;
					}
				}

				window.open(
					'/LeaseMapDetail/' +
						cid +
						'?idx=' +
						(idx_ + 1) +
						'&totalCount=' +
						idList.length +
						'&idList=' +
						idList +
						'&mode=' +
						mode,
					'',
					attr,
				);
			} else if (mode == 'brief') {
				let idList = [];
				let idx_ = 0;
				for (let i = 0; i < this.briefList.length; i++) {
					if (this.briefList[i].brief_status == this.briefMode) {
						idList.push(this.briefList[i].building_uid);
					}
				}

				for (let i = 0; i < idList.length; i++) {
					if (idList[i] == cid) {
						idx_ = i;
						break;
					}
				}

				window.open(
					'/LeaseMapDetail/' +
						cid +
						'?idx=' +
						(idx_ + 1) +
						'&totalCount=' +
						idList.length +
						'&idList=' +
						idList +
						'&mode=' +
						'count',
					'',
					attr,
				);
			}

			// console.log(openWin);
		},
		btnOnEditTour() {
			if (!confirm('정말로 저장하시겠습니까?')) {
				this.tourListEdit = JSON.parse(JSON.stringify(this.tourList));
				this.tourMode = false;
				return;
			}

			this.$apiPOST('/admin/api/tour/update', { tourList: this.tourListEdit }).then(() => {
				this.$router.go(this.$router.currentRoute);
			});
		},
		btnOnDeleteTour(id) {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/api/tour/delete', { id: id }).then(() => {
				this.$router.go(this.$router.currentRoute);
			});
		},
		btnOnATA() {
			if (!this.item.mgr_mem_name) {
				alert('담당자를 지정해 주세요.');
				return;
			}

			if (!this.item.mem_mobile) {
				alert('담당자 휴대폰 번호가 없습니다.');
				return;
			}

			if (!this.item.name) {
				alert('고객명이 존재하지 않습니다.');
				return;
			}

			if (!this.item.mobile) {
				alert('연락처가 존재하지 않습니다.');
				return;
			}

			this.$apiGET('/admin/api/ata/user/get?cid=' + this.id).then(re => {
				if (!confirm(`${re.idx}차 제안서 알림톡을 보내시겠습니까?`)) {
					return;
				}

				this.$apiPOST('/admin/api/ata/user/add', {
					cid: this.id,
					username: this.item.name,
					phone: this.item.mobile.replace(/-/g, ''),
					mem_phone: this.item.mem_mobile,
					mem_name: this.item.mgr_mem_name,
				}).then(() => {});
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

			this.addInfo[cur] = res;
		},
	},
};
</script>
