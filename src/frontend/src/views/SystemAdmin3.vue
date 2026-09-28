<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">기타설정</div>
			<div class="table-wrap">
				<table class="table type-input" v-if="itemList.length">
					<tr>
						<th>구분</th>
						<th>설정값</th>
						<th>비고내용</th>
					</tr>
					<tr>
						<td>소유자정보확인 1일제한건수</td>
						<td>
							<input type="number" class="form-control" v-model="itemList[0].cfg_val1" />
						</td>
						<td></td>
					</tr>
					<tr>
						<td>물건정보 수정제한 설정</td>
						<td>
							<label class="input-checkbox">
								<input type="checkbox" v-model="itemList[1].cfg_val1" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">수정제한해제</span>
							</label>
						</td>
						<td>※ 체크하시면 전체사용자가 모든 물건정보를 수정할수 있습니다</td>
					</tr>
					<tr>
						<td>쪽지수신자설정</td>
						<td colspan="2">
							<label class="input-label">매도의뢰등록</label>
							<select v-model="itemList[2].cfg_val1" class="form-control select sm">
								<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
									{{ c.mem_name }} {{ c.mem_rank_name }}
								</option>
							</select>
							<label class="input-label">매수의뢰등록</label>
							<select v-model="itemList[3].cfg_val1" class="form-control select sm">
								<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
									{{ c.mem_name }} {{ c.mem_rank_name }}
								</option>
							</select>
							<label class="input-label">신규회원가입</label>
							<select v-model="itemList[4].cfg_val1" class="form-control select sm">
								<option v-for="c in memList" :key="'clienttype_' + c.ind_cfg_uid" :value="c.mem_uid">
									{{ c.mem_name }} {{ c.mem_rank_name }}
								</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>직원고객열람</td>
						<td colspan="2">
							<label class="input-checkbox">
								<input type="checkbox" v-model="itemList[5].cfg_val1" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">매매고객</span>
							</label>

							<label class="input-checkbox">
								<input type="checkbox" v-model="itemList[6].cfg_val1" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">임대고객</span>
							</label>
						</td>
					</tr>
				</table>
			</div>
			<div class="btn-wrap">
				<!-- <button type="button" class="btn btn-btn btn-secondary">취소</button> -->
				<button type="button" class="btn btn-primary" @click="btnOnUpdate">저장</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin3',
	components: {},
	data() {
		return {
			itemList: [],
			memList: [],
		};
	},
	created() {
		this.getItemList();
		this.getMemList();
	},
	methods: {
		getItemList() {
			this.$apiGET('/admin/api/setting/etc').then(data => {
				this.itemList = data;
			});
		},
		getMemList() {
			this.$apiGET('/admin/api/setting/etc/mem').then(data => {
				this.memList = data;
			});
		},
		async btnOnUpdate() {
			for (let i = 0; i < this.itemList.length; i++) {
				await this.$apiPOST('/admin/api/setting/etc/update', {
					uid: this.itemList[i].ind_cfg_uid,
					val: this.itemList[i].cfg_val1,
				});
			}
			alert('저장되었습니다.');
		},
	},
};
</script>

<style></style>
