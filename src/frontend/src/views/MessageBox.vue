<template>
	<div class="content">
		<div class="section">
			<div class="tab-btn">
				<button type="button" class="btn tab active">받은쪽지함</button>
				<button type="button" class="btn tab">보낸쪽지함</button>
			</div>
			<div class="tab-con">
				<div class="search-top">
					<div class="left">
						<label class="input-label">보낸사람</label>
						<select class="form-control select sm">
							<option>전체</option>
						</select>
						<label class="input-label">검색</label>
						<select class="form-control select sm">
							<option>제목</option>
						</select>
						<input type="text" class="form-control" />
					</div>
					<div class="right">
						<button type="button" class="btn btn-primary">검색</button>
					</div>
				</div>
				<div class="section-tit">
					받은쪽지목록
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="isSendPopupShow = true">쪽지보내기</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table click">
						<tr>
							<th>번호</th>
							<th>중요</th>
							<th width="50%">제목</th>
							<th>첨부파일</th>
							<th>보낸사람</th>
							<th>보낸일시</th>
							<th>열람일시</th>
							<th>상세</th>
						</tr>
						<tr @click="isDetailPopupShow = true">
							<td>1</td>
							<td>
								<span class="txt-c--orange">
									<b-icon-star />
								</span>
							</td>
							<td>쪽지 제목입니다.</td>
							<td></td>
							<td>윤준서 매니저</td>
							<td>12-15 금 11:01</td>
							<td>12-15 금 11:01</td>
							<td>
								<button type="button" class="btn btn-xxsm btn-light">보기</button>
							</td>
						</tr>
					</table>
				</div>
				<ul class="pagination b-pagination pagination-sm">
					<li class="page-item disabled">
						<span class="page-link"><b-icon-chevron-double-left /></span>
					</li>
					<li class="page-item disabled">
						<span class="page-link"><b-icon-chevron-left /></span>
					</li>
					<li class="page-item active">
						<button type="button" class="page-link">1</button>
					</li>
					<li class="page-item">
						<button type="button" class="page-link"><b-icon-chevron-right /></button>
					</li>
					<li class="page-item">
						<button type="button" class="page-link"><b-icon-chevron-double-right /></button>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="isSendPopupShow" class="popup-wrap">
			<div class="dim" @click="isSendPopupShow = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					쪽지보내기
					<button type="button" class="btn btn-close" @click="isSendPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<tr>
							<th>수신자</th>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="checkbox"></span>
									<span class="text">관리자대표</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="checkbox"></span>
									<span class="text">김수향매니저</span>
								</label>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="checkbox"></span>
									<span class="text">김은정매니저</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>제목</th>
							<td>
								<input type="text" class="form-control" />
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
								<textarea class="form-control textarea" rows="10"></textarea>
							</td>
						</tr>
						<tr>
							<th>파일</th>
							<td>
								<input type="file" class="form-control" />
								<input type="file" class="form-control mt-1" />
								<input type="file" class="form-control mt-1" />
							</td>
						</tr>
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-secondary">취소</button>
						<button type="button" class="btn btn-sm btn-primary">보내기</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isDetailPopupShow" class="popup-wrap">
			<div class="dim" @click="isDetailPopupShow = false"></div>
			<div class="popup sm">
				<div class="popup-tit">
					쪽지내용보기
					<button type="button" class="btn btn-close" @click="isDetailPopupShow = false"><b-icon-x-lg /></button>
				</div>
				<div class="popup-con">
					<table class="table type-input">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<tr>
							<th>보낸사람</th>
							<td>윤준서 매니저(12-12 금 11:11)</td>
						</tr>
						<tr>
							<th>받는사람</th>
							<td>윤준서 매니저(12-12 금 11:11)</td>
						</tr>
						<tr>
							<th>제목</th>
							<td>쪽지 제목입니다.</td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
								쪽지내용 <br />
								쪽지
							</td>
						</tr>
						<tr>
							<th>연결링크</th>
							<td>
								<button type="button" class="btn btn-xsm btn-secondary">
									<b-icon-link45deg />
									&nbsp;창성동 근성빌딩 110
								</button>
							</td>
						</tr>
					</table>
					<div class="btn-wrap">
						<button type="button" class="btn btn-sm btn-danger">삭제</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WorkAdmin',
	components: {},
	data() {
		return {
			isSendPopupShow: false,
			isDetailPopupShow: false,
		};
	},
};
</script>

<style></style>
