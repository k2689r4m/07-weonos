<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원검색</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">재직상태</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchOptions_.st" :value="''" />
						<span class="checkbox radio"></span>
						<span class="text">전체</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchOptions_.st" :value="'Y'" />
						<span class="checkbox radio"></span>
						<span class="text">재직</span>
					</label>
					<label class="input-checkbox">
						<input type="radio" name="radio1" v-model="searchOptions_.st" :value="'N'" />
						<span class="checkbox radio"></span>
						<span class="text">퇴사</span>
					</label>
					<label class="input-label">직원명</label>
					<input class="form-control md" type="text" v-model="searchOptions_.uName" />
					<label class="input-label">연락처</label>
					<input class="form-control md" type="text" v-model="searchOptions_.mobile" />
				</div>
				<div class="right">
					<button type="button" class="btn btn-primary" @click="btnSearch()">검색</button>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">
				직원목록
				<div class="right">
					<router-link
						type="button"
						class="btn btn-sm btn-secondary"
						:to="{ name: 'SystemAdmin9Detail', params: { id: 0 } }"
					>
						신규등록
					</router-link>
				</div>
			</div>
			<div class="table-wrap">
				<table class="table">
					<tr>
						<th>번호</th>
						<th>프로필사진</th>
						<th>구분</th>
						<th>성명/직급</th>
						<th>휴대폰 / 자택주소 / 계좌번호</th>
						<th>등록 / 수정일시</th>
						<th>최종접속일시</th>
						<th>정보수정</th>
					</tr>
					<tr v-for="(m, idx) in memList" :key="'mem_' + m.mem_uid">
						<td>{{ idx + 1 }}</td>
						<td>
							<button type="button" class="btn">
								<b-icon-file-person />
							</button>
						</td>
						<td>{{ $MEM_TYPE[m.mem_type] }}</td>
						<td>
							<template v-if="m.team_name">{{ m.team_name }}<br /></template>
							{{ m.mem_name }} {{ m.mem_rank_name }}<br />
							<span v-bind:class="{ 'txt-c--blue': m.hire_status == 'Y', 'txt-c--red': m.hire_status == 'N' }">
								{{ $HIRE_STATUS[m.hire_status] }}
							</span>
						</td>
						<td>
							{{ m.mem_mobile }}<br />
							-
						</td>
						<td>
							{{ m.reg_date }}
							<template v-if="m.mod_date"> <br />{{ m.mod_date }} </template>
						</td>
						<td>{{ m.log_date }}</td>
						<td>
							<router-link
								type="button"
								class="btn btn-xsm btn-secondary"
								:to="{ name: 'SystemAdmin9Detail', params: { id: m.mem_uid } }"
							>
								정보수정
							</router-link>
						</td>
					</tr>
				</table>
			</div>
			<ul class="pagination b-pagination pagination-sm" v-if="pageData != null && pageData.list.length">
				<li class="page-item" v-bind:class="{ disabled: 1 == page }">
					<button type="button" class="page-link" @click="getMemList(1)">
						<b-icon-chevron-double-left />
					</button>
				</li>

				<li class="page-item" v-bind:class="{ disabled: pageData.first == null }">
					<button type="button" class="page-link" @click="pageData.first !== null ? getMemList(pageData.first) : ''">
						<b-icon-chevron-left />
					</button>
				</li>
				<li
					v-for="pg in pageData.list"
					v-bind:key="'pg_' + pg"
					class="page-item"
					v-bind:class="{ active: pageData.currentPage == pg }"
				>
					<button type="button" class="page-link" @click="getMemList(pg)">{{ pg }}</button>
				</li>
				<li class="page-item" v-bind:class="{ disabled: pageData.end == null }">
					<button type="button" class="page-link" @click="pageData.end !== null ? getMemList(pageData.end) : ''">
						<b-icon-chevron-right />
					</button>
				</li>

				<li class="page-item" v-bind:class="{ disabled: pageData.totalPage == page }">
					<button type="button" class="page-link" @click="getMemList(pageData.totalPage)">
						<b-icon-chevron-double-right />
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin9',
	components: {},
	data() {
		return {
			memList: [],

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 20,
			blockSize: 5,

			searchOptions: {
				st: '',
				uName: '',
				mobile: '',
			},
			searchOptions_: {
				st: '',
				uName: '',
				mobile: '',
			},
		};
	},
	created() {
		this.getMemList(1);
	},
	methods: {
		getMemList(pg) {
			this.$apiGET(
				'/admin/api/mem?' +
					'page=' +
					(pg - 1) * this.itemSize +
					'&st=' +
					this.searchOptions.st +
					'&uName=' +
					this.searchOptions.uName +
					'&mobile=' +
					this.searchOptions.mobile,
			).then(data => {
				this.memList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		btnSearch() {
			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));
			this.page = 1;
			this.getMemList(this.page);
		},
	},
};
</script>
