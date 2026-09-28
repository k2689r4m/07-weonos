<template>
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
						placeholder="만"
						v-model="searchOptions_.monthly_rent_S"
						@keyup.enter="btnSearch"
					/>
					<span class="search-top--text">~</span>
					<input
						class="form-control xsm"
						type="number"
						placeholder="만"
						v-model="searchOptions_.monthly_rent_E"
						@keyup.enter="btnSearch"
					/>
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
					임차인
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					임대인
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 3 }" @click="changeMenu(3)">
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
							<th>보증금</th>
							<th>월고정비</th>
							<th>필요 면적</th>
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
								<input
									type="tel"
									class="form-control"
									placeholder="연락처"
									v-model="addInfo.clientMobile1"
									@keyup="getPhoneMask(addInfo.clientMobile1, 'clientMobile1')"
								/>
								<!-- <input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile1" /> -->
								<input class="form-control" type="text" placeholder="메모" v-model="addInfo.clientMobileMemo1" />
							</div>
						</td>
					</tr>
					<tr>
						<th>연락처2</th>
						<td>
							<div class="form-wrap">
								<input
									type="tel"
									class="form-control"
									placeholder="연락처"
									v-model="addInfo.clientMobile2"
									@keyup="getPhoneMask(addInfo.clientMobile2, 'clientMobile2')"
								/>
								<!-- <input class="form-control" type="text" placeholder="연락처" v-model="addInfo.clientMobile2" /> -->
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
									<!-- <input class="form-control" type="number" v-model="addInfo.req_area_py" />
									<span class="form-text">PY</span> -->
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
									<!-- <input class="form-control" type="number" v-model="addInfo.monthly_rent" />
									<span class="form-text">만원</span> -->
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
									<input type="radio" name="radio3" v-model="addInfo.officeSt" :value="'Y'" />
									<span class="checkbox radio"></span>
									<span class="text">예</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" name="radio3" v-model="addInfo.officeSt" :value="'N'" />
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
									<input type="radio" name="radio4" v-model="addInfo.interior" :value="'Y'" />
									<span class="checkbox radio"></span>
									<span class="text">예</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" name="radio4" v-model="addInfo.interior" :value="'N'" />
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
					<button type="button" class="btn btn-sm btn-primary" @click="btnUserAdd">저장</button>
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

				req_area_py_E: 0,
				monthly_rent_E: 0,
			},
		};
	},
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
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		btnOnDetail(cid, idx) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			window.open(
				'LeaseUserDetail/' +
					cid +
					'?clientType=' +
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
					'&idx=' +
					(idx + 1 + (this.page - 1) * this.itemSize) +
					'&totalCount=' +
					this.totalCount,
				'',
				attr,
			);
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

<style></style>
