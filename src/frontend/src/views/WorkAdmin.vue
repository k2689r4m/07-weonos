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
						<span class="text">작업중</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchInfo.st" :value="'N'" />
						<span class="checkbox radio"></span>
						<span class="text">작업가능</span>
					</label>
					<label class="input-label">물건명</label>
					<input class="form-control sm" type="text" v-model="searchInfo.bName" @keyup.enter="getItemList(1)" />
					<label class="input-label">주소</label>
					<input class="form-control sm" type="text" v-model="searchInfo.addr" @keyup.enter="getItemList(1)" />

					<label class="input-label">작업자</label>
					<select v-model="searchInfo.mid" class="form-control select sm">
						<option value="">전체</option>
						<option v-for="c in memList" :key="'w_m_' + c.ind_cfg_uid" :value="c.mem_uid">
							{{ c.mem_name }} {{ c.mem_rank_name }}
						</option>
					</select>
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
						<th>용도지역</th>
						<th>대지(평)</th>
						<th>연면적(평)</th>
						<th>매매가(만)</th>
						<th>보증금</th>
						<th>월임대료</th>
						<th>연수익률</th>
						<th>작업자</th>
						<th>작업상태</th>
						<th>작업기한</th>
						<th>
							잔여일자
							<button type="button" class="btn sort">
								<b-icon-sort-down />
								<!-- <b-icon-sort-down-alt /> -->
							</button>
						</th>
					</tr>
					<tr v-for="item in itemList" :key="item.building_working_log_uid" @click="btnOnDetail(item.building_uid)">
						<td>{{ $ITEM_STATE[item.sell_status] }}</td>
						<td>{{ item.building_uid }}</td>
						<td>{{ item.building_name }}</td>
						<td>{{ item.jibun_addr }}<br />{{ item.road_addr }}</td>
						<td>{{ item.use_area_name }}</td>
						<td>{{ item.land_size_p }}</td>
						<td>{{ item.total_size_p }}</td>
						<td>{{ $formatMoney(item.sell_price, $MONEY_FORMAT_TYPE.MUCH) }}</td>
						<td>{{ item.ex_sum_rent_deposit }}</td>
						<td>{{ $formatMoney(item.ex_sum_rent_money, $MONEY_FORMAT_TYPE.LOAN) }}</td>
						<td>{{ item.total_income_rate }}%</td>
						<td>{{ item.workinng_mem_name }}</td>
						<td>
							<span v-if="item.working_flag == 'Y'" class="txt-c--red">작업진행</span>
							<span v-else class="txt-c--blue">작업완료</span>
						</td>
						<td>{{ $dateFormat(item.working_sdate) }} ~ {{ $dateFormat(item.working_edate) }}</td>
						<td>{{ $dateSub(item.working_edate) }}</td>
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
	name: 'WorkAdmin',
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
		this.getMemList();
		this.getItemList(1);
	},
	methods: {
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/working?page=' +
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

			window.open('MapDetail/' + cid, '', attr);
		},
	},
};
</script>

<style></style>
