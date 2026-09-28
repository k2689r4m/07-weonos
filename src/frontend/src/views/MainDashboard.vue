<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">주요통계</div>
			<div class="status-wrap">
				<div class="status-tit"><b-icon-bar-chart-fill />&nbsp;전체현황</div>
				<div class="status">
					<div class="status-card">
						<div class="tit">매매 전체 물건 현황</div>
						<div class="num">{{ totalData.total_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'all' } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">임대 전체 물건 현황</div>
						<div class="num">{{ totalData.total_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'all' } }"
						>
							더보기
						</router-link>
					</div> -->
					<div class="status-card">
						<div class="tit">매매 매물 등록 현황</div>
						<div class="num">{{ totalData.done_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'done' } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">임대 매물 등록 현황</div>
						<div class="num">{{ totalData.done_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'done' } }"
						>
							더보기
						</router-link>
					</div> -->
					<div class="status-card">
						<div class="tit">이번주 매매 등록 매물</div>
						<div class="num">{{ totalData.week_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'week', s: $dateWeekFormat().s, e: $dateWeekFormat().e } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">이번주 임대 등록 매물</div>
						<div class="num">{{ totalData.week_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'week', s: $dateWeekFormat().s, e: $dateWeekFormat().e } }"
						>
							더보기
						</router-link>
					</div> -->
					<div class="status-card">
						<div class="tit">오늘 매매 등록 매물</div>
						<div class="num">{{ totalData.now_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'week', s: $dateNowFormat().s, e: $dateNowFormat().e } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">오늘 임대 등록 매물</div>
						<div class="num">{{ totalData.now_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'week', s: $dateNowFormat().s, e: $dateNowFormat().e } }"
						>
							더보기
						</router-link>
					</div> -->
				</div>
				<div class="status-tit"><b-icon-bar-chart-fill />&nbsp;개별현황</div>
				<div class="status">
					<div class="status-card">
						<div class="tit">매매 누적 매물 현황</div>
						<div class="num">{{ totalData.user_total_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'all', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">임대 누적 매물 현황</div>
						<div class="num">{{ totalData.user_total_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'all', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div> -->

					<div class="status-card">
						<div class="tit">매매 등록 매물 현황</div>
						<div class="num">{{ totalData.user_done_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/TotalSearch', query: { mode: 'done', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">임대 등록 매물 현황</div>
						<div class="num">{{ totalData.user_done_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseSearch', query: { mode: 'done', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div> -->

					<div class="status-card">
						<div class="tit">이번주 매매 등록 매물</div>
						<div class="num">{{ totalData.user_week_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{
								path: '/TotalSearch',
								query: {
									mode: 'week',
									s: $dateWeekFormat().s,
									e: $dateWeekFormat().e,
									userId: $store.getters.getUserInfo.mem_uid,
								},
							}"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">이번주 임대 등록 매물</div>
						<div class="num">{{ totalData.user_week_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{
								path: '/LeaseSearch',
								query: {
									mode: 'week',
									s: $dateWeekFormat().s,
									e: $dateWeekFormat().e,
									userId: $store.getters.getUserInfo.mem_uid,
								},
							}"
						>
							더보기
						</router-link>
					</div> -->

					<div class="status-card">
						<div class="tit">오늘 매매 등록 매물</div>
						<div class="num">{{ totalData.user_now_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{
								path: '/TotalSearch',
								query: {
									mode: 'week',
									s: $dateNowFormat().s,
									e: $dateNowFormat().e,
									userId: $store.getters.getUserInfo.mem_uid,
								},
							}"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">오늘 임대 등록 매물</div>
						<div class="num">{{ totalData.user_now_rent_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{
								path: '/LeaseSearch',
								query: {
									mode: 'week',
									s: $dateNowFormat().s,
									e: $dateNowFormat().e,
									userId: $store.getters.getUserInfo.mem_uid,
								},
							}"
						>
							더보기
						</router-link>
					</div> -->

					<div class="status-card">
						<div class="tit">매매 관리고객 현황</div>
						<div class="num">{{ totalData.user_client_count }}</div>

						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/UserAdmin', query: { mode: 'all', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div>
					<!-- <div class="status-card">
						<div class="tit">임대 관리고객 현황</div>
						<div class="num">{{ totalData.user_rent_client_count }}</div>
						<router-link
							type="button"
							class="btn btn btn-secondary btn-sm"
							:to="{ path: '/LeaseUserAdmin', query: { mode: 'all', userId: $store.getters.getUserInfo.mem_uid } }"
						>
							더보기
						</router-link>
					</div> -->
				</div>
			</div>
		</div>
		<div class="section-wrap">
			<div class="section">
				<div class="section-tit">최근열람목록</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
							<col width="30%" />
							<col width="50%" />
						</colgroup>
						<tr>
							<th>분류</th>
							<th>상태</th>
							<th>물건번호</th>
							<th>물건명</th>
							<th>주소</th>
						</tr>
						<tr
							v-for="(item, idx) in viewList"
							:key="'view__' + idx"
							@click="btnOnDetail('building', item.type, item.building_uid)"
						>
							<td>{{ item.type }}</td>
							<td>{{ $ITEM_STATE[item.sell_status] }}</td>
							<td>{{ item.building_uid }}</td>
							<td>{{ item.building_name }}</td>
							<td>{{ item.jibun_addr }} {{ item.road_addr }}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="section" v-if="$store.getters.getGuest">
				<div class="section-tit">최근등록매물</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
							<col width="30%" />
							<col width="50%" />
						</colgroup>
						<tr>
							<th>분류</th>
							<th>상태</th>
							<th>물건번호</th>
							<th>물건명</th>
							<th>주소</th>
						</tr>
						<tr
							v-for="(item, idx) in orderList"
							:key="'view__' + idx"
							@click="btnOnDetail('building', item.type, item.building_uid)"
						>
							<td>{{ item.type }}</td>
							<td>{{ $ITEM_STATE[item.sell_status] }}</td>
							<td>{{ item.building_uid }}</td>
							<td>{{ item.building_name }}</td>
							<td>{{ item.jibun_addr }} {{ item.road_addr }}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="section" v-if="!$store.getters.getGuest">
				<div class="section-tit">최근고객상담내역</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="20%" />
							<col width="15%" />
							<col width="20%" />
						</colgroup>
						<tr>
							<th>분류</th>
							<th>일시</th>
							<th>고객명</th>
							<th>연락처</th>
							<th>상담구분</th>
							<th>상담내용</th>
						</tr>
						<tr
							v-for="(item, idx) in clientList"
							:key="'work__' + idx"
							@click="btnOnDetail('client', item.type, item.client_uid)"
						>
							<td>{{ item.type }}</td>
							<td>{{ $datetimeFormat(item.view_datetime) }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.mobile }}</td>
							<td>{{ item.counsel_type_name }}</td>
							<td>{{ item.memo }}</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="section" v-if="!$store.getters.getGuest">
				<div class="section-tit">최근물건상담내역</div>
				<div class="table-wrap">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="15%" />
							<col width="75%" />
						</colgroup>
						<tr>
							<th>분류</th>
							<th>일시</th>
							<th>물건명/주소/상담내역</th>
						</tr>
						<tr
							v-for="(item, idx) in workList"
							:key="'work__' + idx"
							@click="btnOnDetail('building', item.type, item.building_uid)"
						>
							<td>{{ item.type }}</td>
							<td>{{ $datetimeFormat(item.view_datetime) }}<br />{{ item.counsel_type_name }}</td>
							<td>{{ item.building_name }} / {{ item.jibun_addr }} / {{ item.memo }}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainDashboard',
	components: {},
	data() {
		return {
			totalData: {
				total_count: 0,
				total_rent_count: 0,
				done_count: 0,
				done_rent_count: 0,
				week_count: 0,
				week_rent_count: 0,
				now_count: 0,
				now_rent_count: 0,
				user_total_count: 0,
				user_total_rent_count: 0,
				user_done_count: 0,
				user_done_rent_count: 0,
				user_week_count: 0,
				user_week_rent_count: 0,
				user_now_count: 0,
				user_now_rent_count: 0,
				user_client_count: 0,
				user_rent_client_count: 0,
			},

			orderList: [],
			viewList: [],
			workList: [],
			clientList: [],
		};
	},
	mounted() {},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.getTotal();
			this.getCount();
			this.getWork();
			this.getClient();
			this.getOrder();
		},
		getTotal() {
			this.$apiGET('/admin/api/total/item').then(re => {
				this.totalData = re;
			});
		},
		getCount() {
			this.$apiGET('/admin/api/total/view').then(re => {
				this.viewList = re;
			});
		},
		getWork() {
			this.$apiGET('/admin/api/total/work').then(re => {
				this.workList = re;
			});
		},
		getOrder() {
			this.$apiGET('/admin/api/total/order').then(re => {
				this.orderList = re;
			});
		},
		getClient() {
			this.$apiGET('/admin/api/total/client').then(re => {
				this.clientList = re;
			});
		},
		btnOnDetail(route, type, id) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;
			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			let route_ = '';
			if (type == '매매') {
				if (route == 'building') {
					route_ = 'MapDetail';
				} else if (route == 'client') {
					route_ = 'UserDetail';
				}
			} else if (type == '임대') {
				if (route == 'building') {
					route_ = 'LeaseMapDetail';
				} else if (route == 'client') {
					route_ = 'LeaseUserDetail';
				}
			}

			window.open(route_ + '/' + id, '', attr);
		},
	},
};
</script>

<style></style>
