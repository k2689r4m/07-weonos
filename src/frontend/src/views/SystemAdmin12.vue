<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원검색</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">재직상태</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="mode" :value="''" />
						<span class="checkbox radio"></span>
						<span class="text">전체</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="mode" :value="'Y'" />
						<span class="checkbox radio"></span>
						<span class="text">재직</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="mode" :value="'N'" />
						<span class="checkbox radio"></span>
						<span class="text">퇴사</span>
					</label>
				</div>
				<div class="right">
					<button type="button" class="btn btn-primary" @click="getItemList()">검색</button>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">직원별 관리통계</div>
			<div class="table-wrap">
				<table class="table click">
					<tr>
						<th rowspan="2">번호</th>
						<th rowspan="2">성명/직급</th>
						<th rowspan="2">재직상태</th>
						<th class="bg-blue" colspan="5">물건</th>
						<th colspan="6">매수고객</th>
					</tr>
					<tr>
						<th class="bg-blue">준비</th>
						<th class="bg-blue">매물</th>
						<th class="bg-blue">보류</th>
						<th class="bg-blue">매각</th>
						<th class="bg-blue">합계</th>
						<th>관리</th>
						<th>미관리</th>
						<th>부동산</th>
						<th>블랙</th>
						<th>계약</th>
						<th>합계</th>
					</tr>
					<tr v-for="(item, idx) in itemList" :key="'avg_' + item.mem_uid">
						<td>{{ idx + 1 }}</td>
						<td>{{ item.mem_name }} {{ item.mem_rank_name }}</td>
						<td>{{ $HIRE_STATUS[item.hire_status] }}</td>
						<td>{{ item.ready }}</td>
						<td>{{ item.done }}</td>
						<td>{{ item.hold }}</td>
						<td>{{ item.sell }}</td>
						<td class="bg-yellow">{{ item.ready + item.done + item.hold + item.sell }}</td>
						<td>{{ item.manage }}</td>
						<td>{{ item.none }}</td>
						<td>{{ item.property }}</td>
						<td>{{ item.black }}</td>
						<td>{{ item.contract }}</td>
						<td class="bg-yellow">{{ item.manage + item.none + item.property + item.black + item.contract }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin12',
	components: {},
	data() {
		return {
			itemList: [],
			avgList1: [],
			avgList2: [],
			mode: '',
		};
	},
	created() {
		this.getItemList();
	},
	computed: {},
	methods: {
		getItemList() {
			this.$apiGET('/admin/api/mem/avg1?mode=' + this.mode).then(data => {
				this.itemList = data;

				for (let i = 0; i < this.itemList.length; i++) {
					this.itemList[i].ready = 0;
					this.itemList[i].hold = 0;
					this.itemList[i].done = 0;
					this.itemList[i].sell = 0;

					this.itemList[i].manage = 0;
					this.itemList[i].none = 0;
					this.itemList[i].property = 0;
					this.itemList[i].black = 0;
					this.itemList[i].contract = 0;
				}

				this.$apiGET('/admin/api/mem/avg2').then(data => {
					this.avgList1 = data;

					for (let i = 0; i < this.itemList.length; i++) {
						for (let ii = 0; ii < this.avgList1.length; ii++) {
							if (this.itemList[i].mem_uid == this.avgList1[ii].building_mem_uid) {
								this.itemList[i][this.avgList1[ii].sell_status] = this.avgList1[ii].CNT;
							}
						}
					}

					this.$apiGET('/admin/api/mem/avg3').then(data => {
						this.avgList2 = data;

						for (let i = 0; i < this.itemList.length; i++) {
							for (let ii = 0; ii < this.avgList2.length; ii++) {
								if (this.itemList[i].mem_uid == this.avgList2[ii].mgr_mem_uid) {
									this.itemList[i][this.avgList2[ii].client_type] = this.avgList2[ii].CNT;
								}
							}
						}
					});
				});
			});
		},
	},
};
</script>

<style></style>
