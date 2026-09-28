<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">매수고객코드관리</div>
			<div class="table-wrap">
				<table class="table">
					<colgroup>
						<col width="10%" />
						<col width="10%" />
						<col width="60%" />
						<col width="10%" />
						<col width="10%" />
					</colgroup>
					<tr>
						<th>순서</th>
						<th>번호</th>
						<th>상담구분</th>
						<th>사용횟수</th>
						<th>수정</th>
					</tr>
					<tr v-for="(item, idx) in itemList" :key="'cli_' + item.ind_cfg_uid">
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
						<td>{{ item.CNT }}</td>
						<td>
							<button type="button" class="btn btn-xsm btn-secondary">수정</button>
						</td>
					</tr>
					<tr>
						<td colspan="2">상담구분</td>
						<td>
							<input type="text" class="form-control" v-model="addInfo.var1" />
						</td>
						<td colspan="2">
							<button type="button" class="btn btn-xsm btn-primary" @click="btnOnAdd">추가</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin2',
	data() {
		return {
			itemList: [],
			menuType: 1,
			addInfo: { var1: '' },
			part: 'bd_cate',
		};
	},
	created() {
		this.getItemList();
	},
	computed: {},
	methods: {
		getItemList() {
			this.$apiGET('/admin/api/setting/client').then(data => {
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
		clearInfo() {
			this.addInfo.var1 = '';
			this.addInfo.var2 = '';
		},
		btnOnAdd() {
			this.$apiPOST('/admin/api/setting/client/add', {
				idx: this.itemList.length + 1,
				var1: this.addInfo.var1,
			}).then(() => {
				this.clearInfo();
				this.getItemList();
			});
		},
	},
};
</script>

<style></style>
