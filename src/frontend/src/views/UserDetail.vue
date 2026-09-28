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
									<td colspan="3">{{ item.name }}/{{ $CLIENT_TYPE[item.client_type] }}</td>
								</tr>
								<tr>
									<th>연락처1</th>
									<td>
										{{ item.mobile }} <template v-if="item.mobile_memo">/ {{ item.mobile_memo }}</template>
									</td>
									<th>찾는물건금액</th>
									<td>{{ item.find_money_s }}억 ~ {{ item.find_money_e }}억</td>
								</tr>
								<tr>
									<th>연락처2</th>
									<td>
										{{ item.mobile2 }} <template v-if="item.mobile2_memo">/ {{ item.mobile2_memo }}</template>
									</td>
									<th>보유현금</th>
									<td>{{ item.having_money }}억</td>
								</tr>
								<tr>
									<th>E-mail</th>
									<td>{{ item.email }}</td>
									<th>찾는물건위치</th>
									<td>{{ item.find_area }}</td>
								</tr>
								<tr>
									<th>관리메모</th>
									<td colspan="3">
										<div class="text" v-html="item.memo.split('\n').join('<br />')"></div>
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
									<button type="button" class="btn btn-sm btn-secondary" @click="btnOnPrint">연쇄출력추가</button>
								</div>
							</div>
							<table class="table" v-if="briefMode == 'ready'">
								<tr>
									<th>상태</th>
									<th>물건번호</th>
									<th>물건명</th>
									<th>주소</th>
									<th>매매금액</th>
									<th>수익률</th>
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
												<span class="txt-c--red">{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.MUCH) }}</span>
											</td>
											<td>{{ item.earning_rate }}%</td>
											<td @click.stop>
												<button type="button" class="btn icon type2 yellow" @click="item.state = !item.state">
													<b-icon-eye />
												</button>
												<button type="button" class="btn icon type2"><b-icon-printer /></button>
												<button
													type="button"
													class="btn icon type2 red"
													@click="btnDeleteBrief(item.client_building_link_uid)"
												>
													<b-icon-trash />
												</button>
											</td>
											<td @click.stop>
												<label class="input-checkbox">
													<input type="checkbox" v-model="item.printSt" />
													<span class="checkbox"></span>
												</label>
											</td>
										</tr>
										<tr v-if="item.state">
											<td colspan="4"></td>
											<td>브리핑금액</td>
											<td colspan="2">
												<input
													type="number"
													class="form-control"
													v-model="item.brief_price"
													@keyup.enter="btnSaveBrief(item)"
												/>
												<span class="text">억</span>
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
									<th>매매금액</th>
									<th>브리핑금액</th>
									<th>수익률</th>
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
												<span class="txt-c--red">{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.MUCH) }}</span>
											</td>
											<td>
												<span class="txt-c--red">{{ $formatMoney(item.brief_price, $MONEY_FORMAT_TYPE.MUCH) }}</span>
											</td>
											<td>{{ item.earning_rate }}%</td>
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
									<span class="text">매각</span>
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
									<th>용도지역</th>
									<th>
										대지면적
										<button type="button" class="btn sort">
											<b-icon-sort-down />
											<!-- <b-icon-sort-down-alt /> -->
										</button>
									</th>
									<th>
										연면적
										<button type="button" class="btn sort">
											<b-icon-sort-down />
											<!-- <b-icon-sort-down-alt /> -->
										</button>
									</th>
									<th>
										매매금액
										<button type="button" class="btn sort">
											<b-icon-sort-down />
											<!-- <b-icon-sort-down-alt /> -->
										</button>
									</th>
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
									<td>{{ item.use_area_name }}</td>
									<td>{{ item.land_size_p }}<br />{{ item.land_size_m2 }}</td>
									<td>{{ item.total_size_p }}<br />{{ item.total_size_m2 }}</td>
									<td>{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.MUCH) }}</td>
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
									<th>용도지역</th>
									<th>대지면적</th>
									<th>연면적</th>
									<th>매매금액</th>
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
									<td>{{ item.use_area_name }}</td>
									<td>{{ item.land_size_p }}<br />{{ item.land_size_m2 }}</td>
									<td>{{ item.total_size_p }}<br />{{ item.total_size_m2 }}</td>
									<td>{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.MUCH) }}</td>
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
				매수고객정보
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
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'manage'" />
								<span class="checkbox radio"></span>
								<span class="text">관리</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'none'" />
								<span class="checkbox radio"></span>
								<span class="text">미관리</span>
							</label>
							<label class="input-checkbox">
								<input type="radio" name="radio1" v-model="addInfo.clientType" :value="'property'" />
								<span class="checkbox radio"></span>
								<span class="text">부동산</span>
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
								<input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile1" />
								<input class="form-control" type="text" placeholder="메모" v-model="addInfo.clientMobileMemo1" />
							</div>
						</td>
					</tr>
					<tr>
						<th>연락처2</th>
						<td>
							<div class="form-wrap">
								<input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile2" />
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
					<tr>
						<th>찾는물건금액</th>
						<td>
							<div class="form-wrap">
								<input class="form-control" type="number" v-model="addInfo.findMoneyS" />
								<span class="form-text">억 ~ </span>
								<input class="form-control" type="number" v-model="addInfo.findMoneyE" />
								<span class="form-text">억</span>
							</div>
						</td>
					</tr>
					<tr>
						<th>보유현금</th>
						<td>
							<div class="form-wrap">
								<input class="form-control" type="number" v-model="addInfo.havingMoney" />
								<span class="form-text">억</span>
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
	name: 'UserDetail',
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
			id: null,
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
			briefMode: 'ready',
			logMode: false,

			printSt: false,

			counselInfo: {
				id: null,
				data: '',
			},

			addInfo: {
				mgrUid: '',
				mgrLevel: 'C',
				clientType: '',
				clientName: '',
				clientMobile1: '',
				clientMobile2: '',
				clientMobileMemo1: '',
				clientMobileMemo2: '',
				clientEmail: '',
				clientMemo: '',
				findMoneyS: 0,
				findMoneyE: 0,
				havingMoney: 0,
				findArea: '',
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
			this.$apiGET('/admin/api/user/admin/detail?cid=' + this.id).then(data => {
				this.item = data;

				this.addInfo.mgrUid = data.mgr_mem_uid;
				this.addInfo.mgrLevel = data.mgr_level;
				this.addInfo.clientType = data.client_type;
				this.addInfo.clientName = data.name;

				this.addInfo.clientMobile1 = data.mobile;
				this.addInfo.clientMobile2 = data.mobile2;

				this.addInfo.clientMobileMemo1 = data.mobile_memo;
				this.addInfo.clientMobileMemo2 = data.mobile2_memo;

				this.addInfo.clientEmail = data.email;
				this.addInfo.clientMemo = data.memo;

				this.addInfo.findMoneyS = data.find_money_s;
				this.addInfo.findMoneyE = data.find_money_e;
				this.addInfo.havingMoney = data.having_money;
				this.addInfo.findArea = data.find_area;
			});
		},
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		getBuildingList(pg) {
			this.$apiGET(
				'/admin/api/user/admin/detail/building?page=' +
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
			this.$apiGET('/admin/api/user/admin/detail/count?page=' + (pg - 1) * this.countPage.itemSize).then(data => {
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
			this.$apiGET('/admin/api/user/admin/detail/brief?cid=' + this.id).then(data => {
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
			this.$apiGET('/admin/api/user/admin/detail/counsel?cid=' + this.id).then(data => {
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
				this.$apiPOST('/admin/api/user/admin/detail/brief/add', {
					cid: this.id,
					bid: this.addBriefList[i],
				}).then(() => {
					this.addBriefList = [];
					this.getBriefList();
					alert('저장이 완료되었습니다.');
				});
			}
		},
		btnAddBrief2() {
			for (let i = 0; i < this.addBriefList2.length; i++) {
				this.$apiPOST('/admin/api/user/admin/detail/brief/add', {
					cid: this.id,
					bid: this.addBriefList2[i],
				}).then(() => {
					this.addBriefList2 = [];
					this.getBriefList();
					alert('저장이 완료되었습니다.');
				});
			}
		},
		btnSaveBrief(item) {
			this.$apiPOST('/admin/api/user/admin/detail/brief/done', {
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

			this.$apiPOST('/admin/api/user/admin/detail/brief/delete', {
				lid: id,
			}).then(() => {
				this.getBriefList();
			});
		},
		btnSaveCounsel() {
			this.$apiPOST('/admin/api/user/admin/detail/counsel/add', {
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

			this.$apiPOST('/admin/api/user/admin/detail/counsel/update', this.addInfo).then(data => {
				if (data.error) {
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
			this.$apiPOST('/admin/api/user/admin/delete', { cid: this.id }).then(() => {
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

			window.open('/PrintPage2?bid=' + printIdList, '', attr);
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
				'/admin/api/user/admin/count?clientType=' +
					this.searchInfoData.clientType +
					'&clientName=' +
					this.searchInfoData.clientName +
					'&clientMobile=' +
					this.searchInfoData.clientMobile +
					'&clientMoneyS=' +
					this.searchInfoData.clientMoneyS +
					'&clientMoneyE=' +
					this.searchInfoData.clientMoneyE +
					'&clientLevel=' +
					this.searchInfoData.clientLevel +
					'&mId=' +
					this.searchInfoData.mId +
					'&page=' +
					(this.searchInfoData.idx - 1),
			).then(data => {
				this.id = data.client_uid;
				this.init();
				this.$router.push({ path: '/UserDetail/' + this.id, query: this.searchInfoData });
			});
		},
		btnOnDetail(cid, idx, mode) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (mode == 'user_total') {
				window.open(
					'/MapDetail/' +
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
					'/MapDetail/' +
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
					'/MapDetail/' +
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
	},
};
</script>
