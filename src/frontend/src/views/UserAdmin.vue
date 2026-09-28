<template>
	<div>
		<div class="content">
			<div class="section">
				<div class="section-tit">고객검색</div>
				<div class="search-top">
					<div class="left">
						<label class="input-label">고객명</label>
						<input class="form-control sm" type="text" v-model="searchOptions_.clientName" @keyup.enter="btnSearch" />
						<label class="input-label">연락처</label>
						<input class="form-control sm" type="text" v-model="searchOptions_.clientMobile" @keyup.enter="btnSearch" />
						<label class="input-label">찾는물건금액</label>
						<input
							class="form-control xsm"
							type="number"
							placeholder="억"
							v-model="searchOptions_.clientMoneyS"
							@keyup.enter="btnSearch"
						/>
						<span class="search-top--text">~</span>
						<input
							class="form-control xsm"
							type="number"
							placeholder="억"
							v-model="searchOptions_.clientMoneyE"
							@keyup.enter="btnSearch"
						/>
						<label class="input-label">관리등급</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="st" @change="btnStOption" />
							<span class="checkbox"></span>
							<span class="text">전체</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.clientLevel" :value="'A'" />
							<span class="checkbox"></span>
							<span class="text">A</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.clientLevel" :value="'B'" />
							<span class="checkbox"></span>
							<span class="text">B</span>
						</label>
						<label class="input-checkbox">
							<input type="checkbox" v-model="searchOptions_.clientLevel" :value="'C'" />
							<span class="checkbox"></span>
							<span class="text">C</span>
						</label>
						<label class="input-label">담당자</label>
						<!-- <select class="form-control select sm">
						<option>전체</option>
					</select> -->

						<select v-model="searchOptions_.mId" class="form-control select sm">
							<option value="" selected>전체</option>
							<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
								{{ c.mem_name }} {{ c.mem_rank_name }}
							</option>
						</select>
					</div>
					<div class="right">
						<button type="button" class="btn btn-primary" @click="btnSearch">검색</button>
					</div>
				</div>
			</div>
			<div class="section">
				<div class="tab-btn">
					<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
						고객관리
					</button>
					<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
						미관리
					</button>
					<button type="button" class="btn tab" v-bind:class="{ active: menuType == 3 }" @click="changeMenu(3)">
						부동산
					</button>
					<button type="button" class="btn tab" v-bind:class="{ active: menuType == 4 }" @click="changeMenu(4)">
						블랙리스트
					</button>
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="isRegisterPopupShow = true">신규등록</button>
						<!-- <input class="form-control" type="text" placeholder="연락처" /> -->
						<!-- <button type="button" class="btn btn-sm btn-secondary">검색</button> -->
					</div>
				</div>
				<div class="tab-con">
					<div class="table-wrap">
						<table class="table click">
							<tr>
								<th>번호</th>
								<th>담당자</th>
								<th>관리등급</th>
								<th>고객분류</th>
								<th>고객명</th>
								<th>휴대폰</th>
								<th>찾는물건금액</th>
								<th>보유현금</th>
								<th>찾는위치</th>
								<th>등록일시</th>
								<th>최근상담</th>
							</tr>
							<tr
								v-for="(item, idx) in itemList"
								:key="'useradmin_' + item.client_uid"
								@click="btnOnDetail(item.client_uid, idx)"
							>
								<td>{{ item.client_uid }}</td>
								<td>{{ item.mem_name }} {{ item.mem_rank_name }}</td>
								<td>{{ item.mgr_level }}</td>
								<td>{{ $CLIENT_TYPE[item.client_type] }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.mobile }}</td>
								<td>{{ item.find_money_s }}억 ~ {{ item.find_money_e }}억</td>
								<td>{{ item.having_money }}억</td>
								<td>{{ item.find_area }}</td>
								<td>{{ item.reg_date }}</td>
								<td>{{ item.assign_date == '0000-00-00 00:00' ? '' : item.assign_date }}</td>
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
							<button
								type="button"
								class="page-link"
								@click="pageData.first !== null ? getItemList(pageData.first) : ''"
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
						<button type="button" class="btn btn-sm btn-primary" @click="btnUserAdd">저장</button>
					</div>
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
			idList: [],
			memList: [],
			menuType: 1,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,

			isRegisterPopupShow: false,
			isDetailPopupShow: false,

			st: true,
			searchOptions: {
				clientType: 'manage,contract',
				clientName: '',
				clientMobile: '',
				clientMoneyS: '',
				clientMoneyE: '',
				clientLevel: ['A', 'B', 'C'],
				mId: '',
			},

			searchOptions_: {
				clientType: 'manage,contract',
				clientName: '',
				clientMobile: '',
				clientMoneyS: '',
				clientMoneyE: '',
				clientLevel: ['A', 'B', 'C'],
				mId: '',
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
			},
		};
	},
	updated() {},
	created() {
		if (Object.prototype.hasOwnProperty.call(this.$route.query, 'userId')) {
			this.searchOptions.mId = this.$route.query.userId;
			this.searchOptions_.mId = this.$route.query.userId;
		}

		this.getItemList(1);
		this.getMemList();
	},
	methods: {
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/user/admin?clientType=' +
					this.searchOptions.clientType +
					'&clientName=' +
					this.searchOptions.clientName +
					'&clientMobile=' +
					this.searchOptions.clientMobile +
					'&clientMoneyS=' +
					this.searchOptions.clientMoneyS +
					'&clientMoneyE=' +
					this.searchOptions.clientMoneyE +
					'&clientLevel=' +
					this.searchOptions.clientLevel +
					'&mId=' +
					this.searchOptions.mId +
					'&page=' +
					(pg - 1) * this.itemSize,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);

				// this.getItemIdList();
			});
		},
		getItemIdList() {
			this.$apiGET(
				'/admin/api/user/admin/count?clientType=' +
					this.searchOptions.clientType +
					'&clientName=' +
					this.searchOptions.clientName +
					'&clientMobile=' +
					this.searchOptions.clientMobile +
					'&clientMoneyS=' +
					this.searchOptions.clientMoneyS +
					'&clientMoneyE=' +
					this.searchOptions.clientMoneyE +
					'&clientLevel=' +
					this.searchOptions.clientLevel +
					'&mId=' +
					this.searchOptions.mId,
			).then(data => {
				this.idList = data;
			});
		},
		clearInfo() {
			this.searchOptions = {
				clientType: this.searchOptions.clientType,
				clientName: '',
				clientMobile: '',
				clientMoneyS: '',
				clientMoneyE: '',
				clientLevel: '',
				mId: '',
			};
		},
		changeMenu(menu) {
			if (menu == 1) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.MANAGE + ',' + this.$CLIENT_TYPE.CONTRACT;
			} else if (menu == 2) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.NONE;
			} else if (menu == 3) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.PROPERTY;
			} else if (menu == 4) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.BLACK;
			}

			this.getItemList(1);
			this.menuType = menu;
		},
		btnStOption() {
			if (this.st) {
				this.searchOptions_.clientLevel = ['A', 'B', 'C'];
			} else {
				this.searchOptions_.clientLevel = [];
			}
		},
		btnSearch() {
			this.searchOptions_.clientType = this.searchOptions.clientType;
			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));
			this.getItemList(1);
		},
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		btnUserAdd() {
			this.$apiPOST('/admin/api/user/admin/add', this.addInfo).then(data => {
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
					this.getItemList(this.page);
					this.isRegisterPopupShow = false;
					alert('등록이 완료되었습니다.');
				}
			});
		},
		btnOnDetail(cid, idx) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open(
				'UserDetail/' +
					cid +
					'?clientType=' +
					this.searchOptions.clientType +
					'&clientName=' +
					this.searchOptions.clientName +
					'&clientMobile=' +
					this.searchOptions.clientMobile +
					'&clientMoneyS=' +
					this.searchOptions.clientMoneyS +
					'&clientMoneyE=' +
					this.searchOptions.clientMoneyE +
					'&clientLevel=' +
					this.searchOptions.clientLevel +
					// '&idList=' +
					// this.idList +
					'&mId=' +
					this.searchOptions.mId +
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
