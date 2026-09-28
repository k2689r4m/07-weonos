<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">쪽지함</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">보낸/받는사람</label>
					<select v-model="searchOptions_.memUid" class="form-control select sm">
						<option value="" selected>전체</option>
						<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
							{{ c.mem_name }} {{ c.mem_rank_name }}
						</option>
					</select>

					<label class="input-label">검색 </label>
					<select v-model="searchOptions_.mode" class="form-control select sm">
						<option value="title" selected>제목</option>
						<option value="memo" selected>내용</option>
					</select>

					<input class="form-control" type="text" v-model="searchOptions_.keyword" @keyup.enter="btnSearch" />

					<button type="button" class="btn search" @click="btnSearch"><b-icon-search /></button>
				</div>
				<div class="right"></div>
			</div>
		</div>
		<div class="section">
			<div class="tab-btn">
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 1 }" @click="changeMenu(1)">
					받은쪽지함
				</button>
				<button type="button" class="btn tab" v-bind:class="{ active: menuType == 2 }" @click="changeMenu(2)">
					보낸쪽지함
				</button>

				<div class="right">
					<button type="button" class="btn btn-sm btn-secondary" @click="isRegisterPopupShow = true">쪽지보내기</button>
				</div>
			</div>
			<div class="tab-con">
				<div class="table-wrap">
					<table v-if="searchOptions.postMode == 'recv'" class="table click">
						<colgroup>
							<col width="10%" />
							<col width="5%" />
							<col width="55%" />

							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>중요</th>
							<th>제목</th>

							<th>보낸사람</th>
							<th>보낸일시</th>

							<th>열람일시</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'postreg_' + item.post_uid" @click="btnOnPostDetail(idx)">
							<td>{{ item.post_uid }}</td>
							<td @click.stop="btnOnStar(item)">
								<template v-if="item.star_flag == 'Y'">
									<b-icon-star-fill />
								</template>
								<template v-else>
									<b-icon-star />
								</template>
							</td>
							<td>{{ item.title }}</td>
							<td>{{ item.reg_mem_name }} {{ item.reg_mem_rank_name }}</td>
							<td>{{ $datetimeFormat(item.reg_date) }}</td>
							<td>{{ $datetimeFormat(item.recv_date) }}</td>
						</tr>
					</table>
					<table v-else-if="searchOptions.postMode == 'reg'" class="table click">
						<colgroup>
							<col width="10%" />
							<col width="60%" />

							<col width="10%" />
							<col width="10%" />
							<col width="10%" />
						</colgroup>
						<tr>
							<th>번호</th>
							<th>제목</th>

							<th>받는사람</th>
							<th>보낸일시</th>

							<th>열람일시</th>
						</tr>
						<tr v-for="(item, idx) in itemList" :key="'postreg_' + item.post_uid" @click="isId = idx">
							<td>{{ item.post_uid }}</td>
							<td>{{ item.title }}</td>
							<td>{{ item.recv_mem_name }} {{ item.recv_mem_rank_name }}</td>
							<td>{{ $datetimeFormat(item.reg_date) }}</td>
							<td>{{ $datetimeFormat(item.recv_date) }}</td>
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
	</div>
	<div v-if="isId !== false" class="popup-wrap">
		<div class="dim" @click="isId = false"></div>
		<div class="popup sm">
			<div class="popup-tit">
				쪽지내용보기
				<button type="button" class="btn btn-close" @click="isId = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<colgroup>
						<col width="100px" />
						<col width="auto" />
					</colgroup>
					<tr>
						<th>보낸사람</th>
						<td>
							{{ itemList[isId].reg_mem_name }} {{ itemList[isId].reg_mem_rank_name }} ({{
								$datetimeFormat(itemList[isId].reg_date)
							}})
						</td>
					</tr>
					<tr>
						<th>받는사람</th>
						<td>
							{{ itemList[isId].recv_mem_name }} {{ itemList[isId].recv_mem_rank_name }} ({{
								$datetimeFormat(itemList[isId].recv_date)
							}})
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td>
							{{ itemList[isId].title }}
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<div class="text-pre" v-html="itemList[isId].memo.replace('\n', '<br />')"></div>
						</td>
					</tr>
					<tr>
						<th>연결링크</th>
						<td>
							<button
								v-if="itemList[isId].link_uid"
								type="button"
								class="btn btn-xsm btn-secondary"
								@click="btnOnDetail(itemList[isId].link_uid, itemList[isId].link_type)"
							>
								<b-icon-link-45deg />{{ itemList[isId].link_type == 'building' ? '매매' : '임대' }}
								{{ itemList[isId].building_name }}
							</button>
						</td>
					</tr>
					<tr v-if="itemList[isId].files.length >= 1">
						<th :rowspan="itemList[isId].files.length">파일</th>
						<td>
							<button type="button" class="btn btn-xsm btn-light" @click="downFile(itemList[isId].files[0])">
								<b-icon-download />{{ itemList[isId].files[0].org_name }}
							</button>
						</td>
					</tr>
					<tr v-if="itemList[isId].files.length >= 2">
						<td>
							<button type="button" class="btn btn-xsm btn-light" @click="downFile(itemList[isId].files[1])">
								<b-icon-download />{{ itemList[isId].files[1].org_name }}
							</button>
						</td>
					</tr>
					<tr v-if="itemList[isId].files.length >= 3">
						<td>
							<button type="button" class="btn btn-xsm btn-light" @click="downFile(itemList[isId].files[2])">
								<b-icon-download />{{ itemList[isId].files[2].org_name }}
							</button>
						</td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-secondary" @click="isId = false">취소</button>
					<button type="button" class="btn btn-sm btn-success" @click="btnOnDelete(itemList[isId])">삭제</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="isRegisterPopupShow" class="popup-wrap">
		<div class="dim" @click="isRegisterPopupShow = false"></div>
		<div class="popup sm">
			<div class="popup-tit">
				쪽지보내기
				<button type="button" class="btn btn-close" @click="isRegisterPopupShow = false"><b-icon-x-lg /></button>
			</div>
			<div class="popup-con">
				<table class="table type-input">
					<tr>
						<th>수신자</th>
						<td>
							<label v-for="(item, idx) in postInfo.memList" :key="'ttpye' + idx" class="input-checkbox">
								<input type="checkbox" v-model="item.st" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">{{ item.mem_name }} {{ item.mem_rank_name }}</span>
							</label>
						</td>
					</tr>
					<tr>
						<th>제목</th>
						<td>
							<input class="form-control" type="text" v-model="postInfo.title" />
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td>
							<textarea class="form-control textarea" rows="7" v-model="postInfo.memo"></textarea>
						</td>
					</tr>
					<tr>
						<th rowspan="3">파일</th>
						<td>
							<div class="col-6 d-flex align-items-center pl-0">
								<input type="file" class="" @change="fileFile($event, 1)" />
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="col-6 d-flex align-items-center pl-0">
								<input type="file" class="" @change="fileFile($event, 2)" />
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class="col-6 d-flex align-items-center pl-0">
								<input type="file" class="" @change="fileFile($event, 3)" />
							</div>
						</td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-secondary" @click="isRegisterPopupShow = false">취소</button>
					<button type="button" class="btn btn-sm btn-success" @click="btnOnPost">보내기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserAdmin',
	components: {},
	data() {
		return {
			itemList: [],
			memList: [],
			menuType: 1,

			page: 1,
			pageData: null,
			totalCount: null,
			itemSize: 50,
			blockSize: 5,

			isRegisterPopupShow: false,
			isId: false,

			st: true,
			searchOptions: {
				postMode: 'recv', //recv
				memUid: '',
				mode: 'title',
				keyword: '',
			},

			searchOptions_: {
				postMode: 'recv', //recv
				memUid: '',
				mode: 'title',
				keyword: '',
			},

			postInfo: {
				title: '',
				memo: '',
				memList: [],

				fileObj: [],
				fileObj1: null,
				fileObj2: null,
				fileObj3: null,
			},
		};
	},
	updated() {},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.getItemList(1);
			this.getMemList();
		},
		getItemList(pg) {
			this.$apiGET(
				'/admin/api/post/get?type=' +
					this.searchOptions.postMode +
					'&recvMid=' +
					this.searchOptions.memUid +
					'&mode=' +
					this.searchOptions.mode +
					'&keyword=' +
					this.searchOptions.keyword +
					'&page=' +
					(pg - 1) * this.itemSize,
			).then(data => {
				this.itemList = data.item;

				this.totalCount = data.pageInfo.totalCount;
				this.page = pg;
				this.pageData = this.$pageDataSetting(this.totalCount, this.itemSize, this.blockSize, this.page);
			});
		},
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;

				for (let i = 0; i < data.length; i++) {
					if (this.$store.getters.getUserInfo.mem_uid == data[i].mem_uid) {
						data.splice(i, 1);
					}
				}

				for (let i = 0; i < data.length; i++) {
					data[i].st = 'N';
				}

				this.postInfo.memList = data;
			});
		},

		fileFile(e, idx) {
			if (!e.target.files.length) {
				return;
			}

			if (idx == 1) {
				this.postInfo.fileObj1 = e.target.files[0];
			} else if (idx == 2) {
				this.postInfo.fileObj2 = e.target.files[0];
			} else if (idx == 3) {
				this.postInfo.fileObj3 = e.target.files[0];
			}
		},
		clearInfo() {
			this.searchOptions_ = {
				postMode: 'recv', //recv
				memUid: '',
				mode: 'title',
				keyword: '',
			};
		},
		changeMenu(menu) {
			if (menu == 1) {
				this.searchOptions.postMode = 'recv';
				this.searchOptions_.postMode = 'recv';
			} else if (menu == 2) {
				this.searchOptions.postMode = 'reg';
				this.searchOptions_.postMode = 'reg';
			}

			this.getItemList(1);
			this.menuType = menu;
		},
		btnSearch() {
			this.searchOptions = JSON.parse(JSON.stringify(this.searchOptions_));
			this.getItemList(1);
		},
		btnOnStar(item) {
			let flag = null;

			if (item.star_flag == 'Y') {
				flag = 'N';
			} else if (item.star_flag == 'N') {
				flag = 'Y';
			}

			this.$apiPOST('/admin/api/post/star', { pid: item.post_uid, flag: flag }).then(() => {
				this.getItemList(this.page);
			});
		},
		btnOnDelete(item) {
			this.$apiPOST('/admin/api/post/delete', { pid: item.post_uid, postMode: this.searchOptions.postMode }).then(
				() => {
					this.isId = false;
					this.getItemList(this.page);
				},
			);
		},
		btnOnPost() {
			this.postInfo.fileObj = [];
			if (this.postInfo.fileObj1) {
				this.postInfo.fileObj.push(this.postInfo.fileObj1);
			}

			if (this.postInfo.fileObj2) {
				this.postInfo.fileObj.push(this.postInfo.fileObj2);
			}

			if (this.postInfo.fileObj3) {
				this.postInfo.fileObj.push(this.postInfo.fileObj3);
			}

			let memList_ = [];
			for (let i = 0; i < this.postInfo.memList.length; i++) {
				if (this.postInfo.memList[i].st == 'Y') {
					memList_.push(this.postInfo.memList[i].mem_uid);
				}
			}

			const sendPostInfo = {
				title: this.postInfo.title,
				memo: this.postInfo.memo,
				memList: memList_,
				fileObj: this.postInfo.fileObj,
			};

			this.$apiPOST_ADD('/admin/api/post/add', sendPostInfo).then(re => {
				if (re) {
					alert('전송 완료');

					this.$router.go(this.$router.currentRoute);
				}
			});
		},
		downFile(item) {
			this.$apiDOWN('/admin/api/post/file/get?id=' + item.id).then(re => {
				const url = window.URL.createObjectURL(new Blob([re]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', item.org_name); //or any other extension
				document.body.appendChild(link);
				link.click();
			});
		},
		btnOnDetail(id, type) {
			let w = window.screen.availWidth;
			let h = window.screen.availHeight;

			let attr = 'width=' + w + ', height=' + h + ', resizable=no, status=no';

			if (type == 'building') {
				window.open('MapDetail/' + id, '', attr);
			} else if (type == 'rent_building') {
				window.open('LeaseMapDetail/' + id, '', attr);
			}
		},
		btnOnPostDetail(idx) {
			if (this.itemList[idx].recv_flag == 'N') {
				this.$apiPOST('/admin/api/post/recv', { pid: this.itemList[idx].post_uid }).then(() => {
					this.getItemList(this.page);
					this.isId = idx;
				});
			} else {
				this.isId = idx;
			}
		},
	},
};
</script>

<style></style>
