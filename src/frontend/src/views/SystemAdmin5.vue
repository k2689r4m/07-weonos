<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">접속차단관리</div>
			<div class="table-wrap">
				<table class="table type-input" v-if="setList.length">
					<tr>
						<th>IP차단</th>
						<td colspan="3">
							<label class="input-checkbox">
								<input type="checkbox" v-model="this.setList[0].cfg_val1" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">IP차단 활성화</span>
							</label>
						</td>
						<td>※ IP차단을 활성화하는 경우, 아래 접속허용IP에서만 물건상세정보화면을 조회할 수 있습니다.</td>
					</tr>
					<tr>
						<th>접속시간제한</th>
						<td>
							<select class="form-control select sm type2" v-model="this.setList[1].cfg_int_val1">
								<option v-for="i in (0, 24)" :key="'op_' + i" :value="i - 1">{{ i - 1 }}</option>
							</select>
							<span class="text">~</span>
							<select class="form-control select sm type2" v-model="this.setList[1].cfg_int_val2">
								<option v-for="i in (0, 24)" :key="'op_' + i" :value="i - 1">{{ i - 1 }}</option>
							</select>
						</td>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" v-model="this.setList[1].cfg_val1" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">접속시간제한 활성화</span>
							</label>
						</td>
						<td>
							<button type="button" class="btn btn-xsm btn-secondary" @click="btnOnUpdate">저장</button>
						</td>
						<td>※ 접속시간제한을 활성화하는 경우, '관리자' 권한자 이외에는 설정한 시간내에 접속이 불가합니다.</td>
					</tr>
				</table>
			</div>
			<div class="section-tit mt-3">접속허용IP</div>
			<div class="table-wrap">
				<table class="table">
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
						<th>명칭</th>
						<th>IP</th>
						<th>수정</th>
					</tr>
					<tr v-for="(item, idx) in itemList" :key="'ipl_' + item.ind_cfg_uid">
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
						<td colspan="2">접속차단설정</td>
						<td>
							<input type="text" class="form-control" v-model="addInfo.val1" />
						</td>
						<td>
							<input type="text" class="form-control" v-model="addInfo.val2" />
						</td>
						<td>
							<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 설정팝업공통 -->
		<div v-if="isSettingPopupShow" class="popup-wrap">
			<div class="dim" @click="isSettingPopupShow = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					접속차단설정
					<button type="button" class="btn btn-close" @click="isSettingPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<tr>
							<th>명칭</th>
							<td>
								<input type="text" class="form-control" v-model="editInfo.val1" />
							</td>
						</tr>
						<tr>
							<th>IP</th>
							<td>
								<input type="text" class="form-control" v-model="editInfo.val2" />
							</td>
						</tr>
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
	name: 'SystemAdmin5',
	components: {},
	data() {
		return {
			itemList: [],
			setList: [],
			addInfo: { val1: '', val2: '' },
			editInfo: { val1: '', val2: '', id: null, idx: null },
			isSettingPopupShow: false,
		};
	},
	created() {
		this.getItemList();
		this.getSetList();
	},
	methods: {
		getItemList() {
			this.$apiGET('/admin/api/setting/ip').then(data => {
				this.itemList = data;
			});
		},
		getSetList() {
			this.$apiGET('/admin/api/setting/ip/set').then(data => {
				this.setList = data;
			});
		},
		btnOnOrder(uid_2, uid_1) {
			// uid_1 -> uid_2
			// uid_2 -> uid_1
			this.$apiPOST('/admin/api/mem/code/order', { uid_1, uid_2 }).then(() => {
				this.getItemList();
			});
		},
		async btnOnUpdate() {
			await this.$apiPOST('/admin/api/setting/ip/set/update', {
				uid1: this.setList[0].ind_cfg_uid,
				val1: this.setList[0].cfg_val1,

				uid2: this.setList[1].ind_cfg_uid,
				val2: this.setList[1].cfg_val1,
				val3: this.setList[1].cfg_int_val1,
				val4: this.setList[1].cfg_int_val2,
			});

			alert('저장되었습니다.');
		},
		clearInfo() {
			this.addInfo.val1 = '';
			this.addInfo.val2 = '';
		},
		btnOnAdd() {
			this.$apiPOST('/admin/api/setting/ip/add', {
				idx: this.itemList.length + 1,
				val1: this.addInfo.val1,
				val2: this.addInfo.val2,
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
