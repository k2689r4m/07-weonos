<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">작업검색</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">작업상태</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchInfo.st" :value="''" />
						<span class="checkbox radio"></span>
						<span class="text">전체</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchInfo.st" :value="'Y'" />
						<span class="checkbox radio"></span>
						<span class="text">작업진행</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchInfo.st" :value="'N'" />
						<span class="checkbox radio"></span>
						<span class="text">작업종료</span>
					</label>
					<label class="input-label">물건명</label>
					<input class="form-control sm" type="text" v-model="searchInfo.bName" @keyup.enter="getItemList(1)" />
					<label class="input-label">주소</label>
					<input class="form-control sm" type="text" v-model="searchInfo.addr" @keyup.enter="getItemList(1)" />
				</div>
				<div class="right">
					<button type="button" class="btn btn-primary" @click="getItemList(1)">검색</button>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">
				작업목록
				<span class="sub">검색결과 : {{ totalCount }}건</span>
			</div>
			<div class="table-wrap">
				<table class="table click">
					<tr>
						<th>상태</th>
						<th>물건번호</th>
						<th>물건명</th>
						<th>주소</th>
						<th>층수/규모</th>
						<th>계약/전용(평)</th>
						<th>보증금(만)</th>
						<th>임대료(만)</th>
						<th>관리비(만)</th>
						<th>작업자</th>
						<th>작업상태</th>
						<th>작업기한</th>
						<th>잔여일자</th>
					</tr>
					<tr v-for="item in itemList" :key="item.building_working_log_uid" @click="btnOnDetail(item.building_uid)">
						<td>{{ $ITEM_STATE[item.sell_status] }}</td>
						<td>{{ item.building_uid }}</td>
						<td>{{ item.building_name }}</td>
						<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>
						<td>{{ item.floor_info }}</td>
						<td>{{ item.rent_area_py }}/{{ item.net_area_py }}</td>
						<td>{{ $formatMoney(item.deposit, $MONEY_FORMAT_TYPE.MUCH) }}</td>
						<td>{{ $formatMoney(item.monthly_rent, $MONEY_FORMAT_TYPE.MUCH) }}</td>
						<td>{{ $formatMoney(item.main_fee, $MONEY_FORMAT_TYPE.MUCH) }}</td>
						<td>{{ item.workinng_mem_name }}</td>
						<td>
							<span v-if="item.working_flag == 'Y'" class="txt-c--red">작업진행</span>
							<span v-else class="txt-c--blue">작업완료</span>
						</td>
						<td>{{ $dateFormat(item.sdate) }} ~ {{ $dateFormat(item.edate) }}</td>
						<td>{{ $dateSub(item.edate) }}</td>
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
	name: 'LeaseAdmin',
	components: {},
	data() {
		return {
			memList: [],
			itemList: [],

			searchInfo: {
				st: 'Y',
				bName: '',
				addr: '',
				mid: '',
			},

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
	methods: {
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/working2?page=' +
					(pg - 1) * this.itemSize +
					'&st=' +
					this.searchInfo.st +
					'&bName=' +
					this.searchInfo.bName +
					'&addr=' +
					this.searchInfo.addr +
					'&mid=' +
					this.searchInfo.mid,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		btnOnDetail(cid) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';
			window.open('LeaseMapDetail/' + cid, '', attr);
		},
	},
};
</script>

<style></style>
