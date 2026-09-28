<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">약관설정</div>
			<div class="tab-btn">
				<button type="button" class="btn tab active">이용약관</button>
				<button type="button" class="btn tab">이용안내</button>
				<button type="button" class="btn tab">개인정보처리방침</button>
				<button type="button" class="btn tab">개인정보수집 및 이용동의</button>
			</div>
			<div class="tab-con">
				<textarea class="form-control" rows="20"></textarea>
				<div class="btn-wrap">
					<button type="button" class="btn btn-primary">저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin4',
	components: {},
	data() {
		return {};
	},
	methods: {},
};
</script>

<style></style>
