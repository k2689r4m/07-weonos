<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">소유자정보확인</div>
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					매매
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					임대
				</button>
			</div>
			<div class="table-wrap">
				<table class="table click">
					<tr>
						<th>번호</th>
						<th>일시</th>
						<th>구분</th>
						<th>내용</th>
						<th>작업자</th>
						<th>물건명</th>
						<th>주소</th>
					</tr>
					<tr v-for="item in itemList" :key="'owner_' + item.client_log_uid">
						<td>{{ item.client_log_uid }}</td>
						<td>{{ item.reg_date }}</td>
						<td></td>
						<td>{{ item.memo }}</td>
						<td>{{ item.mem_name }}</td>
						<td>{{ item.building_name }}</td>
						<td>{{ item.jibun_addr }}</td>
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
	name: 'SystemAdmin7',
	components: {},
	data() {
		return {
			itemList: [],

			menuType: 1,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 50,
			blockSize: 5,
		};
	},
	created() {
		this.getItemList(1);
	},
	methods: {
		changeMenu(menu) {
			this.itemList = [];

			this.page = 1;
			this.pageData = null;
			this.totalCount = null;

			this.menuType = menu;
			this.getItemList(1);
		},
		getItemList(pg) {
			this.$apiGET('/admin/api/oper/owner/log?page=' + (pg - 1) * this.itemSize + '&mode=' + this.menuType).then(
				data => {
					this.itemList = data.item;

					this.totalCount = data.pageInfo.totalCount;
					this.page = pg;
					this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
				},
			);
		},
	},
};
</script>

<style></style>
