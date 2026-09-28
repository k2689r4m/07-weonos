<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원상세정보</div>
			<div class="row">
				<div class="col-5">
					<div class="section-tit sub">
						기본정보
						<div class="right">
							<label class="input-checkbox">
								<input type="checkbox" v-model="item.ip_free" true-value="Y" false-value="N" />
								<span class="checkbox"></span>
								<span class="text">IP제한해제</span>
							</label>
						</div>
					</div>
					<div class="table-wrap">
						<table class="table type-input">
							<colgroup>
								<col width="220px" />
								<col width="110px" />
								<col width="auto" />
							</colgroup>
							<tr>
								<th>프로필사진</th>
								<th>직원구분</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio1" v-model="item.mem_type" value="master" />
										<span class="checkbox radio"></span>
										<span class="text">관리자</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio1" v-model="item.mem_type" value="admin" />
										<span class="checkbox radio"></span>
										<span class="text">직원</span>
									</label>
								</td>
							</tr>
							<tr>
								<td rowspan="9">
									<span class="txt-c--orange">* 권장사이즈 W180 X H220</span>
									<input type="file" class="form-control mt-2" />
								</td>
								<th>이름/직책</th>
								<td>
									<input type="text" class="form-control xsm" v-model="item.mem_name" />
									<select class="form-control xsm select" v-model="item.mem_rank_uid">
										<option value="" selected>선택</option>
										<option :value="t.ind_cfg_uid" :key="'level_' + t.ind_cfg_uid" v-for="t in levelList">
											{{ t.cfg_val1 }}
										</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>아이디</th>
								<td>
									<input
										type="text"
										class="form-control xsm m-r--1"
										:disabled="Number($route.params.id) || pwCheck"
										v-model="item.mem_id"
									/>
									<button
										v-if="!Number($route.params.id) && !pwCheck"
										class="btn btn-xsm btn-secondary"
										@click="btnOnCheck"
									>
										중복확인
									</button>
								</td>
							</tr>
							<tr>
								<th>비밀번호</th>
								<td>
									<template v-if="Number($route.params.id)">
										<template v-if="pwMode">
											<input type="password" class="form-control xsm" v-model="pw1" placeholder="비밀번호 입력" />
											<input type="password" class="form-control xsm" v-model="pw2" placeholder="비밀번호 확인" />
										</template>
										<label class="input-checkbox">
											<input type="checkbox" v-model="pwMode" />
											<span class="checkbox"></span>

											<span class="text">변경</span>
										</label>
									</template>
									<template v-else>
										<input type="password" class="form-control xsm" v-model="pw1" placeholder="비밀번호 입력" />
										<input type="password" class="form-control xsm" v-model="pw2" placeholder="비밀번호 확인" />
									</template>
								</td>
							</tr>
							<tr>
								<th>휴대폰</th>
								<td>
									<select class="form-control xxsm select" v-model="item.mobile1" @change="changeMobile">
										<option>선택</option>
										<option value="010">010</option>
										<option value="011">011</option>
										<option value="013">013</option>
										<option value="016">016</option>
										<option value="017">017</option>
										<option value="018">018</option>
										<option value="019">019</option>
									</select>
									<input type="text" class="form-control xxsm" v-model="item.mobile2" @change="changeMobile" />
									<input type="text" class="form-control xxsm" v-model="item.mobile3" @change="changeMobile" />
								</td>
							</tr>
							<tr>
								<th>회사전화</th>
								<td>
									<select class="form-control xxsm select" v-model="item.office1">
										<option>선택</option>
										<option value="02">서울 02</option>
										<option value="031">경기 031</option>
										<option value="032">인천 032</option>
										<option value="033">강원 033</option>
										<option value="041">충남 041</option>
										<option value="042">대전 042</option>
										<option value="043">충북 043</option>
										<option value="044">세종 044</option>
										<option value="051">부산 051</option>
										<option value="052">울산 052</option>
										<option value="053">대구 053</option>
										<option value="054">경북 054</option>
										<option value="055">경남 055</option>
										<option value="061">전남 061</option>
										<option value="062">광주 062</option>
										<option value="063">전북 063</option>
										<option value="064">제주 064</option>
										<option value="070">070</option>
									</select>
									<input type="text" class="form-control xxsm" v-model="item.office2" @change="changeOffice" />
									<input type="text" class="form-control xxsm" v-model="item.office3" @change="changeOffice" />
								</td>
							</tr>
							<tr>
								<th>부서/팀</th>
								<td>
									<select class="form-control xsm select" v-model="item.team_uid" @change="item.team_cate_uid = null">
										<option :value="null">선택</option>
										<option :value="t.ind_cfg_uid" :key="'level_' + t.ind_cfg_uid" v-for="t in teamList">
											{{ t.cfg_val1 }}
										</option>
									</select>
									<select class="form-control xsm select" v-model="item.team_cate_uid">
										<option :value="null">선택</option>
										<template v-for="t in cateList" :key="'level_' + t.ind_cfg_uid">
											<option :value="t.ind_cfg_uid" v-if="t.refTeamId == item.team_uid">
												{{ t.cfg_val1 }}
											</option>
										</template>
									</select>
								</td>
							</tr>
							<tr>
								<th>자격증</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio2" v-model="item.license_flag" value="Y" />
										<span class="checkbox radio"></span>
										<span class="text">유</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio2" v-model="item.license_flag" value="N" />
										<span class="checkbox radio"></span>
										<span class="text">무</span>
									</label>
								</td>
							</tr>
							<tr>
								<th>중개보조원등록</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio3" v-model="item.sub_broker_flag" value="Y" />
										<span class="checkbox radio"></span>
										<span class="text">유</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio3" v-model="item.sub_broker_flag" value="N" />
										<span class="checkbox radio"></span>
										<span class="text">무</span>
									</label>
								</td>
							</tr>
							<tr>
								<th>매수고객자동할당</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio4" v-model="item.auto_buyer_assign" value="Y" />
										<span class="checkbox radio"></span>
										<span class="text">자동할당</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio4" v-model="item.auto_buyer_assign" value="N" />
										<span class="checkbox radio"></span>
										<span class="text">할당안함</span>
									</label>
								</td>
							</tr>
							<tr>
								<th colspan="2">전문분야</th>
								<td>
									<label class="input-checkbox" v-for="t in expertList" :key="'exp_' + t.ind_cfg_uid">
										<input type="checkbox" :value="t.ind_cfg_uid" v-model="item.expert_part" />
										<span class="checkbox"></span>
										<span class="text">{{ t.cfg_val1 }}</span>
									</label>
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="col-5">
					<div class="section-tit sub">상세정보</div>
					<div class="table-wrap">
						<table class="table type-input">
							<colgroup>
								<col width="110px" />
								<col width="auto" />
							</colgroup>
							<tr>
								<th>주민등록번호</th>
								<td>
									<input type="text" class="form-control xsm" v-model="item.no1" />
									<input type="text" class="form-control xsm" v-model="item.no2" />
								</td>
							</tr>
							<tr>
								<th>채용구분</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio5" value="S" v-model="item.hire_type" />
										<span class="checkbox radio"></span>
										<span class="text">정규직</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio5" value="T" v-model="item.hire_type" />
										<span class="checkbox radio"></span>
										<span class="text">계약직</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio5" value="P" v-model="item.hire_type" />
										<span class="checkbox radio"></span>
										<span class="text">파트타임</span>
									</label>
								</td>
							</tr>
							<tr>
								<th>재직상태</th>
								<td>
									<label class="input-checkbox">
										<input type="radio" name="radio6" value="Y" v-model="item.hire_status" />
										<span class="checkbox radio"></span>
										<span class="text">재직</span>
									</label>
									<label class="input-checkbox">
										<input type="radio" name="radio6" value="N" v-model="item.hire_status" />
										<span class="checkbox radio"></span>
										<span class="text">퇴사</span>
									</label>
								</td>
							</tr>
							<tr>
								<th>입사일/퇴사일</th>
								<td>
									<input type="date" class="form-control xsm" v-model="item.work_sdate" />
								</td>
							</tr>
							<tr>
								<th>E-mail</th>
								<td>
									<input type="text" class="form-control xsm" v-model="item.email1" @change="changeEmail" />
									@
									<input type="text" class="form-control xsm" v-model="item.email2" @change="changeEmail" />
									<select class="form-control select xsm" @change="changeEmailEtc($event)">
										<option value="">직접입력</option>
										<option value="naver.com">네이버</option>
										<option value="hanmail.net">한메일</option>
										<option value="daum.net">다음</option>
										<option value="nate.com">네이트</option>
										<option value="paran.com">파란</option>
										<option value="gmail.com">지메일(미국)</option>
										<option value="yahoo.co.kr">야후(한국)</option>
										<option value="yahoo.com">야후(미국)</option>
										<option value="lycos.co.kr">라이코스(한국)</option>
										<option value="hitel.net">하이텔</option>
										<option value="empal.com">엠팔</option>
										<option value="kornet.net">코넷</option>
										<option value="korea.com">코리아</option>
										<option value="freechal.com">프리첼</option>
										<option value="dreamwiz.com">드림위즈</option>
										<option value="unitel.co.kr">유니텔</option>
										<option value="chollian.net">천리안</option>
										<option value="hananet.net">하나넷</option>
										<option value="hanafos.com">하나포스</option>
										<option value="hanmir.com">한미르</option>
										<option value="hotmail.com">핫메일(미국)</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>계좌번호</th>
								<td>
									<select class="form-control select xsm" v-model="item.pay_bank_code">
										<option value="">은행선택</option>
										<option value="004">국민은행</option>
										<option value="039">경남은행</option>
										<option value="034">광주은행</option>
										<option value="003">기업은행</option>
										<option value="011">농협</option>
										<option value="055">도이치은행</option>
										<option value="031">대구은행</option>
										<option value="032">부산은행</option>
										<option value="002">산업은행</option>
										<option value="050">상호저축은행</option>
										<option value="045">새마을금고</option>
										<option value="007">수협중앙</option>
										<option value="048">신용협동조합</option>
										<option value="088">신한은행</option>
										<option value="020">우리은행</option>
										<option value="071">우체국</option>
										<option value="005">외환은행</option>
										<option value="037">전북은행</option>
										<option value="035">제주은행</option>
										<option value="081">하나은행</option>
										<option value="027">한국씨티은행</option>
										<option value="054">홍콩상하이</option>
										<option value="023">SC제일은행</option>
										<option value="060">BOA(뱅크오브)</option>
										<option value="090">카카오뱅크</option>
										<option value="209">동양종합증권</option>
										<option value="218">현대증권</option>
										<option value="230">미래에셋증권</option>
										<option value="238">대우증권</option>
										<option value="240">삼성증권</option>
										<option value="243">한국투자증권</option>
										<option value="247">우리투자증권</option>
										<option value="261">교보증권</option>
										<option value="262">하이투자증권</option>
										<option value="263">HMC투자증권</option>
										<option value="265">이트레이드증권</option>
										<option value="266">SK증권</option>
										<option value="267">대신증권</option>
										<option value="269">한화증권</option>
										<option value="270">하나대투증권</option>
										<option value="278">신한금융투자</option>
										<option value="279">동부증권</option>
										<option value="280">유진투자증권</option>
										<option value="287">메리츠증권</option>
										<option value="289">NH투자증권</option>
										<option value="291">신영증권</option>
										<option value="292">LIG투자증권</option>
										<option value="290">부국증권</option>
									</select>
									<input type="text" class="form-control xsm" placeholder="계좌번호" v-model="item.pay_bank_no" />
									<input type="text" class="form-control xsm" placeholder="예금주" v-model="item.pay_bank_owner" />
								</td>
							</tr>
							<tr>
								<th>메모</th>
								<td>
									<textarea class="form-control textarea" rows="5" v-model="item.memo"></textarea>
								</td>
							</tr>
							<!-- <tr>
								<th>알림톡 우선순위</th>
								<td>
									<input type="number" class="form-control xsm" v-model="item.ata_level" />
								</td>
							</tr> -->
						</table>
					</div>
				</div>
				<div class="col-2">
					<div class="table-wrap">
						<table class="table type-input">
							<tr>
								<th>권한제어</th>
								<td></td>
							</tr>
							<tr>
								<th>매물담당변경</th>
								<td>
									<select class="form-control select">
										<option>선택</option>
									</select>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn btn-md btn-secondary" @click="btnOnBack">취소</button>
				<template v-if="Number($route.params.id)">
					<button type="button" class="btn btn-md btn-primary" @click="btnOnUpdate">저장</button>
					<button type="button" class="btn btn-md btn-danger" @click="btnOnDelete">삭제</button>
				</template>
				<template v-else>
					<button v-if="pwCheck" type="button" class="btn btn-md btn-primary" @click="btnOnAdd">저장</button>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin9',
	components: {},
	data() {
		return {
			item: {
				mem_type: '', //직원구분
				ip_free: 'N', //ip제한
				mem_name: '', //이름
				mem_rank_uid: '', //직책
				mem_id: '', //유저 아이디
				mem_mobile: '', //휴대폰
				mobile1: '',
				mobile2: '',
				mobile3: '',
				mem_phone: '', //회사전화
				office1: '',
				office2: '',
				office3: '',
				team_uid: '', //부서 아이디
				team_cate_uid: '', //팀 아이디
				license_flag: 'N', //자격증
				sub_broker_flag: 'N', //중개보조원등록
				auto_buyer_assign: 'N', //매수고객자동할당
				expert_part: [], //전문분야
				mem_no: '', //주민번호
				no1: '',
				no2: '',
				hire_type: 'S', //채용구분
				hire_status: 'Y', //재직상태
				work_sdate: '', //입사일
				work_edate: '', //퇴사일
				mem_email: '', //이메일
				email1: '',
				email2: '',
				pay_bank_code: '', //은행 코드
				pay_bank_no: '', //계좌
				pay_bank_owner: '', //예금주
				memo: '',
				mid: null, //직원아이디
				pw: '',
				ata_level: null,
			},
			teamList: [],
			cateList: [],
			expertList: [],
			levelList: [],
			pwMode: false,
			pw1: '',
			pw2: '',
			pwCheck: false,
		};
	},
	created() {
		this.getItem();
		this.getLevelList();
		this.getTeamList();
	},
	methods: {
		btnOnBack() {
			this.$router.go(-1);
		},
		btnOnUpdate() {
			if (!confirm('저장하시겠습니까?')) {
				return;
			}

			if (this.pwMode) {
				if (!this.checkPw()) {
					return;
				}

				this.item.pw = this.pw1;
			}

			this.item.mid = this.$route.params.id;
			this.item.pwMode = this.pwMode;

			this.$apiPOST('/admin/api/mem/item', this.item).then(re => {
				if (re) {
					alert('저장되었습니다.');
				}
			});
		},
		btnOnDelete() {
			if (!confirm('삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/api/mem/item/delete', { mid: this.$route.params.id }).then(re => {
				if (re) {
					alert('삭제되었습니다.');
					this.$router.go(-1);
				}
			});
		},
		btnOnAdd() {
			if (!confirm('저장하시겠습니까?')) {
				return;
			}

			if (!this.checkPw()) {
				return;
			}

			this.item.pw = this.pw1;

			this.item.mid = this.$route.params.id;

			this.$apiPOST('/admin/api/mem/item/add', this.item).then(re => {
				if (re) {
					alert('저장되었습니다.');
					this.btnOnBack();
				}
			});
		},
		btnOnCheck() {
			if (this.item.mem_id.length < 6) {
				alert('아이디를 6자 이상으로 입력하세요.');
				return;
			}

			this.$apiGET('/admin/api/mem/item/check?mid=' + this.item.mem_id).then(data => {
				if (!data) {
					this.pwCheck = true;
					alert('사용할 수 있는 아이디입니다.');
				} else {
					alert('중복된 아이디가 있습니다.');
				}
			});
		},
		getItem() {
			if (this.$route.params.id == 0) {
				return;
			}

			this.item.mid = this.$route.params.id;

			this.$apiGET('/admin/api/mem/item?mid=' + this.item.mid).then(data => {
				if (data.mem_mobile) {
					const mobile = data.mem_mobile.split('-');
					data.mobile1 = mobile[0];
					data.mobile2 = mobile[1];
					data.mobile3 = mobile[2];
				}

				if (data.mem_phone) {
					const office = data.mem_phone.split('-');
					data.office1 = office[0];
					data.office2 = office[1];
					data.office3 = office[2];
				}

				if (data.mem_no) {
					const no = data.mem_no.split('-');
					data.no1 = no[0];
					data.no2 = no[1];
				}

				if (data.mem_email) {
					const email = data.mem_email.split('@');
					data.email1 = email[0];
					data.email2 = email[1];
				}

				if (data.expert_part) {
					const expert_part = data.expert_part.split(',');
					data.expert_part = expert_part;
				} else {
					data.expert_part = [];
				}

				if (data.work_sdate || data.work_sdate == '0000-00-00') {
					data.work_sdate = '';
				}

				if (data.work_edate || data.work_edate == '0000-00-00') {
					data.work_edate = '';
				}

				this.item = data;
			});
		},
		getLevelList() {
			this.$apiGET('/admin/api/mem/level').then(data => {
				this.levelList = data;
			});
		},
		getTeamList() {
			this.$apiGET('/admin/api/mem/code?part=team').then(data => {
				this.teamList = data;
			});
			this.$apiGET('/admin/api/mem/code?part=team_cate').then(data => {
				this.cateList = data;
			});
			this.$apiGET('/admin/api/mem/code?part=expert_part').then(data => {
				this.expertList = data;
			});
		},
		changeMobile() {
			this.item.mem_mobile = this.item.mobile1 + '-' + this.item.mobile2 + '-' + this.item.mobile3;
		},
		changeOffice() {
			this.item.mem_phone = this.item.office1 + '-' + this.item.office2 + '-' + this.item.office3;
		},
		changeEmail() {
			this.item.mem_email = this.item.email1 + '@' + this.item.email2;
		},
		changeEmailEtc(event) {
			if (event.target.value != '') {
				this.item.email2 = event.target.value;
				this.changeEmail();
			} else {
				this.item.email2 = '';
				this.changeEmail();
			}
		},
		checkPw() {
			if (this.pw1.length < 10) {
				alert('비밀번호는 최소 10자 이상 입력하세요');
				return false;
			} else if (this.pw1 != this.pw2) {
				alert('입력한 비밀번호가 일치하지 않습니다.');
				return false;
			} else {
				return true;
			}
		},
	},
};
</script>
