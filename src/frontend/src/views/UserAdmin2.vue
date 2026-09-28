<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">고객검색</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">고객명</label>
					<input class="form-control sm" type="text" v-model="searchOptions_.clientName" />
					<label class="input-label">연락처</label>
					<input class="form-control sm" type="text" v-model="searchOptions_.clientMobile" />
					<label class="input-label">찾는물건금액</label>
					<input class="form-control xsm" type="number" placeholder="억" v-model="searchOptions_.clientMoneyS" />
					<span class="search-top--text">~</span>
					<input class="form-control xsm" type="number" placeholder="억" v-model="searchOptions_.clientMoneyE" />
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
					<button type="button" class="btn btn-sm btn-secondary" @click="btnOnSaveBrif">저장</button>
				</div>
			</div>
			<div class="tab-con">
				<div class="table-wrap">
					<table class="table click">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" v-model="brifSt" @change="btnOnAddBrif" />
									<span class="checkbox"></span>
								</label>
							</th>
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
						</tr>
						<tr v-for="item in itemList" :key="'useradmin_' + item.client_uid" @click="btnOnDetail(item.client_uid)">
							<td @click.stop>
								<label class="input-checkbox">
									<input type="checkbox" v-model="item.brifSt" />
									<span class="checkbox"></span>
								</label>
							</td>
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
	</div>
</template>

<script>
export default {
	name: 'UserAdmin',
	components: {},
	data() {
		return {
			itemList: [],
			memList: [],
			menuType: 1,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 50,
			blockSize: 5,

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

			brifSt: false,
			brifList: [],

			bidList: [],
		};
	},
	updated() {},
	created() {
		this.getItemList(1);
		this.getMemList();
		this.bidList = this.$route.query.brifList.split(',');
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
				for (let i = 0; i < data.item.length; i++) {
					data.item[i].brifSt = false;
				}

				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
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
			this.clearInfo();

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
		btnOnDetail(cid) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open('UserDetail/' + cid, '', attr);
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
		btnOnSaveBrif() {
			this.brifList = [];
			let st = false;

			for (let i = 0; i < this.itemList.length; i++) {
				if (this.itemList[i].brifSt) {
					this.brifList.push(this.itemList[i].client_uid);
					st = true;
				}
			}

			if (!st) {
				alert('브리핑 대기 물건 저장 대상 고객을 1명 이상 선택하세요.');
				return;
			}

			this.$apiPOST('/admin/api/user/admin/detail/brief/addList', {
				bidList: this.bidList,
				brifList: this.brifList,
			}).then(() => {
				alert('저장이 완료되었습니다.');
			});
		},
	},
};
</script>

<style></style>
