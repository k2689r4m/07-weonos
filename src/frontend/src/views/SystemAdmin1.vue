<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">물건코드관리</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					매물종류
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					용도지역
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 3 }" @click="changeMenu(3)">
					건물구조
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 4 }" @click="changeMenu(4)">
					지목
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 5 }" @click="changeMenu(5)">
					주차방식
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 6 }" @click="changeMenu(6)">
					냉/난방
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 7 }" @click="changeMenu(7)">
					작업구분
				</button>
			</div>
			<div class="tab-con">
				<div class="table-wrap">
					<table class="table" v-if="menuType == 1">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="70%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>매물종류</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">매물종류</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 2">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="35%" />
							<col width="35%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>용도지역</th>
							<th>표준코드</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">용도지역</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var2" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 3">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="35%" />
							<col width="35%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>건물구조</th>
							<th>표준코드</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">건물구조</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var2" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 4">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="35%" />
							<col width="35%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>지목</th>
							<th>표준코드</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">지목</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var2" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 5">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="70%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>주차방식</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">주차방식</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 6">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="70%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>냉/난방</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">냉/난방</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
								<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
							</td>
						</tr>
					</table>
					<table class="table" v-else-if="menuType == 7">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="70%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>순서</th>
							<th>번호</th>
							<th>작업구분</th>
							<th>수정</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'setting_' + item.ind_cfg_uid">
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
							<!-- item.editable -->
							<td>
								<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnEdit(idx)">수정</button>
							</td>
						</tr>
						<tr>
							<td colspan="2">작업구분</td>
							<td>
								<input type="text" class="form-control" v-model="addInfo.var1" />
							</td>
							<td>
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
					{{ $BUILDING_INFO[part] }}
					<button type="button" class="btn btn-close" @click="isSettingPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<template v-if="part == 'bd_cate' || part == 'park_type' || part == 'heat_type' || part == 'work_type'">
							<tr>
								<th>{{ $BUILDING_INFO[part] }}</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val1" />
								</td>
							</tr>
						</template>
						<template v-else-if="part == 'use_area' || part == 'structure' || part == 'gmok'">
							<tr>
								<th>{{ $BUILDING_INFO[part] }}</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val1" />
								</td>
							</tr>
							<tr>
								<th>표준코드</th>
								<td>
									<input type="text" class="form-control" v-model="editInfo.val2" />
								</td>
							</tr>
						</template>
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-secondary" @click="isSettingPopupShow = false">취소</button>
						<button type="button" class="btn btn-sm btn-primary" @click="btnOnSave">저장</button>
						<button type="button" class="btn btn-sm btn-danger" @click="btnOnDelete">삭제</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin1',
	components: {},
	data() {
		return {
			itemList: [],
			menuType: 1,
			addInfo: { var1: '', var2: '' },
			part: 'bd_cate',

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
			this.$apiGET('/admin/api/setting?part=' + this.part).then(data => {
				this.itemList = data;
			});
		},
		btnOnOrder(uid_2, uid_1) {
			// uid_1 -> uid_2
			// uid_2 -> uid_1
			this.$apiPOST('/admin/api/mem/code/order', { uid_1, uid_2 }).then(() => {
				this.getItemList();
			});
		},
		changeMenu(menu) {
			this.clearInfo();

			if (menu == 1) {
				this.part = this.$BUILDING_INFO.BD_CATE;
			} else if (menu == 2) {
				this.part = this.$BUILDING_INFO.USE_AREA;
			} else if (menu == 3) {
				this.part = this.$BUILDING_INFO.STRUCTURE;
			} else if (menu == 4) {
				this.part = this.$BUILDING_INFO.GMOK;
			} else if (menu == 5) {
				this.part = this.$BUILDING_INFO.PARK_TYPE;
			} else if (menu == 6) {
				this.part = this.$BUILDING_INFO.HEAT_TYPE;
			} else if (menu == 7) {
				this.part = this.$BUILDING_INFO.WORK_TYPE;
			}

			this.getItemList();
			this.menuType = menu;
		},
		clearInfo() {
			this.addInfo.var1 = '';
			this.addInfo.var2 = '';
		},
		btnOnAdd() {
			this.$apiPOST('/admin/api/setting/add', {
				idx: this.itemList.length + 1,
				var1: this.addInfo.var1,
				var2: this.addInfo.var2,
				part: this.part,
			}).then(() => {
				this.clearInfo();
				this.getItemList();
			});
		},

		btnOnEdit(idx) {
			this.editInfo.id = this.itemList[idx].ind_cfg_uid;
			this.editInfo.val1 = this.itemList[idx].cfg_val1;
			this.editInfo.val2 = this.itemList[idx].cfg_val2;
			this.editInfo.idx = idx;
			this.isSettingPopupShow = true;
		},
		btnOnSave() {
			// if (!confirm('정말로 삭제하시겠습니까?')) {
			// 	return;
			// }

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
	},
};
</script>

<style></style>
