<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">검색</div>
			<div class="search-top">
				<div class="left">
					<label class="input-label">지원자명</label>
					<input class="form-control md" type="text" />
					<label class="input-label">지원자연락처</label>
					<input class="form-control md" type="text" />
				</div>
				<div class="right">
					<button type="button" class="btn btn-primary">검색</button>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">입사지원현황</div>
			<div class="table-wrap">
				<table class="table click">
					<tr>
						<th>번호</th>
						<th>지원일시</th>
						<th>성명</th>
						<th>연락처</th>
						<th>이력서</th>
						<th>자기소개</th>
						<th>삭제</th>
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
					<button type="button" class="page-link">2</button>
				</li>
				<li class="page-item">
					<button type="button" class="page-link">3</button>
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
</template>

<script>
export default {
	name: 'SystemAdmin13',
	components: {},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style></style>
