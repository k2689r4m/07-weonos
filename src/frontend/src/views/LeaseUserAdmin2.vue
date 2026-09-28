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
					<input class="form-control xsm" type="number" placeholder="만" v-model="searchOptions_.monthly_rent_S" />
					<span class="search-top--text">~</span>
					<input class="form-control xsm" type="number" placeholder="만" v-model="searchOptions_.monthly_rent_E" />
					<label class="input-label">찾는물건위치</label>
					<input class="form-control sm" type="text" v-model="searchOptions_.findArea" />
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
				</div>
				<div class="right">
					<button type="button" class="btn btn-primary" @click="btnSearch">검색</button>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					임차인
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					임대인
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 3 }" @click="changeMenu(3)">
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
							<th>보증금</th>
							<th>월고정비</th>
							<th>필요 면적</th>
							<th>찾는위치</th>
							<th>등록일시</th>
							<th>최근상담</th>
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
							<td>{{ item.deposit }}</td>
							<td>{{ item.monthly_fixed }}</td>
							<td>{{ item.req_area_py }}</td>
							<td>{{ item.findArea }}</td>
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

			isRegisterPopupShow: false,
			isDetailPopupShow: false,

			st: true,
			searchOptions: {
				clientType: 'lessee',
				clientName: '',
				clientMobile: '',
				clientLevel: ['A', 'B', 'C'],
				mId: '',
				monthly_rent_S: '',
				monthly_rent_E: '',
				findArea: '',
			},

			searchOptions_: {
				clientType: 'lessee',
				clientName: '',
				clientMobile: '',
				clientLevel: ['A', 'B', 'C'],
				mId: '',
				monthly_rent_S: '',
				monthly_rent_E: '',
				findArea: '',
			},

			addInfo: {
				mgrUid: '',
				clientType: 'lessee', //고객구분
				mgrLevel: 'C', //관리등급

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
			},

			brifSt: false,
			brifList: [],

			bidList: [],
		};
	},
	created() {
		this.getItemList(1);
		this.getMemList();
		this.bidList = this.$route.query.brifList.split(',');
	},
	methods: {
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/user/admin2?clientType=' +
					this.searchOptions.clientType +
					'&clientName=' +
					this.searchOptions.clientName +
					'&clientMobile=' +
					this.searchOptions.clientMobile +
					'&monthly_rent_S=' +
					this.searchOptions.monthly_rent_S +
					'&monthly_rent_E=' +
					this.searchOptions.monthly_rent_E +
					'&clientLevel=' +
					this.searchOptions.clientLevel +
					'&mId=' +
					this.searchOptions.mId +
					'&findArea=' +
					this.searchOptions.findArea +
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
				clientLevel: ['A', 'B', 'C'],
				mId: '',
				monthly_rent_S: '',
				monthly_rent_E: '',
				findArea: '',
			};
		},
		changeMenu(menu) {
			this.clearInfo();

			if (menu == 1) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.LESSEE;
			} else if (menu == 2) {
				this.searchOptions.clientType = this.$CLIENT_TYPE.LANDLORD;
			} else if (menu == 3) {
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
		btnUserAdd() {
			this.$apiPOST('/admin/api/user/admin/add2', this.addInfo).then(data => {
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
					this.getItemList(this.page);
					this.isRegisterPopupShow = false;
					alert('등록이 완료되었습니다.');
				}
			});
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

			window.open('LeaseUserDetail/' + cid, '', attr);
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

			this.$apiPOST('/admin/api/user/admin/detail/brief2/addList', {
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
