<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원접속기록</div>
			<div class="table-wrap">
				<table class="table click">
					<tr>
						<th>번호</th>
						<th>성명/직급</th>
						<th>부서</th>
						<th>휴대폰</th>
						<th>접속일시</th>
						<th>접속기기</th>
						<th>접속IP</th>
						<th>비고</th>
					</tr>
					<tr v-for="item in itemList" :key="'memlog_' + item.mem_log_uid">
						<td>{{ item.mem_log_uid }}</td>
						<td>{{ item.mem_name }} {{ item.mem_rank_name }}</td>
						<td>{{ item.team_name }}</td>
						<td>{{ item.mem_mobile }}</td>
						<td>{{ item.date }}</td>
						<td>{{ item.machine }}</td>
						<td>{{ item.log_ip }}</td>
						<td></td>
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
</template>

<script>
export default {
	name: 'SystemAdmin11',
	components: {},
	data() {
		return {
			itemList: [],

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,
		};
	},
	created() {
		this.getItemList(1);
	},
	computed: {},
	methods: {
		getItemList(pg) {
			this.$apiGET('/admin/api/mem/log?page=' + (pg - 1) * this.itemSize).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
	},
};
</script>

<style></style>
