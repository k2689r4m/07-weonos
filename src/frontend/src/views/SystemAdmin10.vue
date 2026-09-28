<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원코드관리</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					직급
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					부서
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 3 }" @click="changeMenu(3)">
					팀
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 4 }" @click="changeMenu(4)">
					전문분야
				</button>
			</div>
			<div class="tab-con">
				<div class="table-wrap">
					<table class="table" v-if="menuType == 1">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="25%" />
							<col width="25%" />
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>직급</th>
							<th>관리 고객 제한수량</th>
							<th>미관리 고객 오픈</th>
							<th>사용횟수</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'codeList_' + item.ind_cfg_uid">
							<td>
								<button
									type="button"
									class="btn sort"
									v-if="idx != 0"
									@click="btnOnOrder(itemList[idx - 1].ind_cfg_uid, item.ind_cfg_uid)"
								>
									<b-icon-arrow-up />
								</button>
								<button
									type="button"
									class="btn sort"
									v-if="idx + 1 != itemList.length"
									@click="btnOnOrder(item.ind_cfg_uid, itemList[idx + 1].ind_cfg_uid)"
								>
									<b-icon-arrow-down />
								</button>
							</td>
							<td>{{ idx + 1 }}</td>
							<td>{{ item.cfg_val1 }}</td>
							<td>{{ item.cfg_val2 }}</td>
							<td>
								<label class="input-checkbox">
									<input
										type="checkbox"
										:checked="item.cfg_val4 == 'Y'"
										@click="btnOnCheck(item.ind_cfg_uid, item.cfg_val4)"
									/>
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ item.use_count }}</td>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">직급</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.name" />
							</td>
							<td>
								<input type="number" class="form-control" v-model="addInfo.cnt" />
							</td>
							<td colspan="3">
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 2">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="25%" />
							<col width="25%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>부서</th>
							<th>사용횟수</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'codeList_' + item.ind_cfg_uid">
							<td>
								<button
									type="button"
									class="btn sort"
									v-if="idx != 0"
									@click="btnOnOrder(itemList[idx - 1].ind_cfg_uid, item.ind_cfg_uid)"
								>
									<b-icon-arrow-up />
								</button>
								<button
									type="button"
									class="btn sort"
									v-if="idx + 1 != itemList.length"
									@click="btnOnOrder(item.ind_cfg_uid, itemList[idx + 1].ind_cfg_uid)"
								>
									<b-icon-arrow-down />
								</button>
							</td>
							<td>{{ idx + 1 }}</td>
							<td>{{ item.cfg_val1 }}</td>
							<td>{{ item.use_count }}</td>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">부서</td>
							<td colspan="2">
								<input type="text" class="form-control" v-model="addInfo.name" />
							</td>
							<td colspan="3">
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 3">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="25%" />
							<col width="25%" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>부서</th>
							<th>팀</th>
							<th>사용횟수</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'codeList_' + item.ind_cfg_uid">
							<td>
								<button
									type="button"
									class="btn sort"
									v-if="idx != 0"
									@click="btnOnOrder(itemList[idx - 1].ind_cfg_uid, item.ind_cfg_uid)"
								>
									<b-icon-arrow-up />
								</button>
								<button
									type="button"
									class="btn sort"
									v-if="idx + 1 != itemList.length"
									@click="btnOnOrder(item.ind_cfg_uid, itemList[idx + 1].ind_cfg_uid)"
								>
									<b-icon-arrow-down />
								</button>
							</td>
							<td>{{ idx + 1 }}</td>
							<td>{{ item.cfg_part3 }}</td>
							<td>{{ item.cfg_val1 }}</td>
							<td>{{ item.use_count }}</td>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">팀</td>
							<td>
								<select v-model="addInfo.teamId" class="form-control sm select">
									<option value="" selected>선택</option>
									<option :value="t.id" :key="'team_' + t.id" v-for="t in teamList">{{ t.name }}</option>
								</select>
							</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.name" />
							</td>
							<td colspan="3">
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 4">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="25%" />
							<col width="25%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>전문분야</th>
							<th>사용횟수</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'codeList_' + item.ind_cfg_uid">
							<td>
								<button
									type="button"
									class="btn sort"
									v-if="idx != 0"
									@click="btnOnOrder(itemList[idx - 1].ind_cfg_uid, item.ind_cfg_uid)"
								>
									<b-icon-arrow-up />
								</button>
								<button
									type="button"
									class="btn sort"
									v-if="idx + 1 != itemList.length"
									@click="btnOnOrder(item.ind_cfg_uid, itemList[idx + 1].ind_cfg_uid)"
								>
									<b-icon-arrow-down />
								</button>
							</td>
							<td>{{ idx + 1 }}</td>
							<td>{{ item.cfg_val1 }}</td>
							<td>{{ item.use_count }}</td>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">전문분야</td>
							<td colspan="2">
								<input type="text" class="form-control" v-model="addInfo.name" />
							</td>
							<td colspan="3">
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<div v-if="isSettingPopupShow" class="popup-wrap">
			<div class="dim" @click="isSettingPopupShow = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					{{ $COM_INFO[part] }}
					<button type="button" class="btn btn-close" @click="isSettingPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<template v-if="part == 'team' || part == 'expert_part'">
							<tr>
								<th>{{ $COM_INFO[part] }}</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val1" />
								</td>
							</tr>
						</template>
						<template v-else-if="part == 'mem_rank'">
							<tr>
								<th>{{ $COM_INFO[part] }}</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val1" />
								</td>
							</tr>
							<tr>
								<th>관리고객제한수량</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val2" />
								</td>
							</tr>
						</template>
						<template v-else-if="part == 'team_cate'">
							<tr>
								<th>부서</th>
								<td>
									<!-- <input type="text" class="form-control" v-model="editInfo.val1" /> -->
									<select v-model="editInfo.val1" class="form-control select">
										<option value="" selected>선택</option>
										<option :value="t.id" :key="'team_' + t.id" v-for="t in teamList">{{ t.name }}</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>팀</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val2" />
								</td>
							</tr>

							<!-- <td>{{ item.cfg_part3 }}</td>
							<td>{{ item.cfg_val1 }}</td> -->
						</template>
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-secondary" @click="isSettingPopupShow = false">취소</button>
						<button v-if="part == 'team_cate'" type="button" class="btn btn-sm btn-primary" @click="btnOnSave2">
							저장
						</button>
						<button v-else type="button" class="btn btn-sm btn-primary" @click="btnOnSave">저장</button>
						<button type="button" class="btn btn-sm btn-danger" @click="btnOnDelete">삭제</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin10',
	components: {},
	data() {
		return {
			part: 'mem_rank',
			itemList: [],
			teamList: [],
			addInfo: { name: '', cnt: 0, teamId: '' },
			menuType: 1,

			editInfo: { val1: '', val2: '', id: null, idx: null },
			isSettingPopupShow: false,
		};
	},
	created() {
		this.getItemList();
	},
	computed: {},
	methods: {
		getItemList() {
			this.$apiGET('/admin/api/mem/code?part=' + this.part).then(data => {
				this.itemList = data;
			});
		},
		getTeamList() {
			this.$apiGET('/admin/api/map/team').then(data => {
				this.teamList = data;
			});
		},
		btnOnCheck(uid, st) {
			console.log(uid, st);
			if (st == 'Y') {
				st = 'N';
			} else {
				st = 'Y';
			}

			this.$apiPOST('/admin/api/mem/code/flag', { st, uid }).then(() => {
				this.getItemList();
			});
		},
		btnOnOrder(uid_2, uid_1) {
			// uid_1 -> uid_2
			// uid_2 -> uid_1
			this.$apiPOST('/admin/api/mem/code/order', { uid_1, uid_2 }).then(() => {
				this.getItemList();
			});
		},
		btnOnAdd() {
			this.$apiPOST('/admin/api/mem/code/add', {
				idx: this.itemList.length + 1,
				name: this.addInfo.name,
				cnt: this.addInfo.cnt,
				part: this.part,
				teamId: this.addInfo.teamId,
			}).then(() => {
				this.clearInfo();
				this.getItemList();
			});
		},
		changeMenu(menu) {
			if (menu == 1) {
				this.part = this.$COM_INFO.MEM_RANK;
			} else if (menu == 2) {
				this.part = this.$COM_INFO.TEAM;
			} else if (menu == 3) {
				this.getTeamList();
				this.part = this.$COM_INFO.TEAM_CATE;
			} else if (menu == 4) {
				this.part = this.$COM_INFO.EXPERT_PART;
			}

			this.getItemList();
			this.menuType = menu;
		},
		clearInfo() {
			this.addInfo.name = '';
			this.addInfo.cnt = 0;
			this.addInfo.teamId = '';
		},
		btnOnEdit(idx) {
			if (this.part == 'team_cate') {
				this.editInfo.val1 = this.itemList[idx].refTeamId;
				this.editInfo.val2 = this.itemList[idx].cfg_val1;
			} else {
				this.editInfo.val1 = this.itemList[idx].cfg_val1;
				this.editInfo.val2 = this.itemList[idx].cfg_val2;
			}

			this.editInfo.id = this.itemList[idx].ind_cfg_uid;
			this.editInfo.idx = idx;
			this.isSettingPopupShow = true;
		},
		btnOnSave() {
			this.$apiPOST('/admin/api/setting/update', {
				val1: this.editInfo.val1,
				val2: this.editInfo.val2,
				id: this.editInfo.id,
				st: 1,
			}).then(() => {
				this.getItemList();
				alert('저장되었습니다.');
			});

			this.isSettingPopupShow = false;
		},
		btnOnSave2() {
			this.$apiPOST('/admin/api/setting/update2', {
				val1: this.editInfo.val1,
				val2: this.editInfo.val2,
				id: this.editInfo.id,
			}).then(() => {
				this.getItemList();
				alert('저장되었습니다.');
			});

			this.isSettingPopupShow = false;
		},
		btnOnDelete() {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/api/setting/delete', {
				id: this.editInfo.id,
			}).then(() => {
				this.itemList.splice(this.editInfo.idx, 1);
				this.updateIdx();
				this.isSettingPopupShow = false;
				alert('삭제되었습니다.');
			});
		},
		updateIdx() {
			for (let i = 0; i < this.itemList.length; i++) {
				this.$apiPOST('/admin/api/setting/idx', {
					id: this.itemList[i].ind_cfg_uid,
					idx: i + 1,
				}).then(() => {
					this.getItemList();
				});
			}
		},
		//////    /mem/code/info ,, /mem/code/del
	},
};
</script>

<style></style>
