<template>
	<div class="lnb-exist">
		<div class="lnb-wrap">
			<div class="lnb-tit"><b-icon-gear-fill />시스템관리</div>
			<ul class="lnb-list">
				<li class="lnb-list--item">
					<button
						type="button"
						class="btn tit"
						v-bind:class="{
							active:
								currentRouteName == 'SystemAdmin1' ||
								currentRouteName == 'SystemAdmin2' ||
								currentRouteName == 'SystemAdmin3' ||
								currentRouteName == 'SystemAdmin4' ||
								currentRouteName == 'SystemAdmin5',
							fold: menuSt1,
						}"
						@click="menuSt1 = !menuSt1"
					>
						설정
					</button>
					<div class="con">
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin1' }"
						>
							물건코드관리
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin2"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin2' }"
						>
							매수고객코드관리
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin3"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin3' }"
						>
							기타설정
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin4"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin4' }"
						>
							약관설정
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin5"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin5' }"
						>
							접속차단관리
						</router-link>
					</div>
				</li>
				<li class="lnb-list--item">
					<button
						type="button"
						class="btn tit"
						v-bind:class="{
							active:
								currentRouteName == 'SystemAdmin6' ||
								currentRouteName == 'SystemAdmin7' ||
								currentRouteName == 'SystemAdmin8',
							fold: menuSt2,
						}"
						@click="menuSt2 = !menuSt2"
					>
						물건관리
					</button>
					<div class="con">
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin6"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin6' }"
						>
							작업/변경내역
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin7"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin7' }"
						>
							소유자정보확인
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin8"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin8' }"
						>
							누적매물현황
						</router-link>
					</div>
				</li>
				<li class="lnb-list--item">
					<button
						type="button"
						class="btn tit"
						v-bind:class="{
							active:
								currentRouteName == 'SystemAdmin9' ||
								currentRouteName == 'SystemAdmin10' ||
								currentRouteName == 'SystemAdmin11' ||
								currentRouteName == 'SystemAdmin12',
							fold: menuSt3,
						}"
						@click="menuSt3 = !menuSt3"
					>
						직원관리
					</button>
					<div class="con">
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin9"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin9' }"
						>
							직원현황
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin10"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin10' }"
						>
							직원코드관리
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin11"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin11' }"
						>
							직원접속기록
						</router-link>
						<router-link
							type="button"
							class="btn menu"
							to="/SystemAdmin/SystemAdmin12"
							v-bind:class="{ active: currentRouteName == 'SystemAdmin12' }"
						>
							관리통계
						</router-link>
					</div>
				</li>
				<li class="lnb-list--item">
					<router-link
						type="button"
						class="btn tit only"
						to="/SystemAdmin/SystemAdmin13"
						v-bind:class="{ active: currentRouteName == 'SystemAdmin13' }"
					>
						입사지원관리
					</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'SystemAdmin',
	components: {},
	computed: {
		currentRouteName() {
			return this.$route.name;
		},
	},
	data() {
		return {
			menuSt1: true,
			menuSt2: false,
			menuSt3: false,
		};
	},
	methods: {
		// onClickToggleFold(st) {
		// 	if (st == 1) {
		// 		this.menuSt1 = !this.menuSt1;
		// 	} else if (st == 2) {
		// 		this.menuSt2 = !this.menuSt2;
		// 	} else if (st == 3) {
		// 		this.menuSt2 = !this.menuSt3;
		// 	}
		// },
	},
};
</script>

<style></style>
