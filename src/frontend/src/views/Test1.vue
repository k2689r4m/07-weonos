<template>
	<div class="content">
		<textarea rows="10" v-model="addInfo"></textarea>
		<button @click="upup">go</button>
	</div>
</template>

<script>
export default {
	name: 'Test1',
	components: {},
	data() {
		return {
			addInfo: '',
			st: false,
		};
	},
	created() {
		this.$loadScript(
			'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
				process.env.VUE_APP_NAVER_API_ID +
				'&submodules=geocoder',
		)
			.then(() => {})
			.catch(() => {});
		window.btnOnCreate = this.btnOnCreate;
	},
	updated() {},
	methods: {
		async upup() {
			let addInfo = JSON.parse(this.addInfo);

			for (let i = 0; i < addInfo.length; i++) {
				this.st = true;

				if (!addInfo[i].building_name) {
					addInfo[i].building_name = addInfo[i].jibun_addr;
				}

				let name = addInfo[i].owner_name.split('\n');
				addInfo[i].owner_name = name[0];

				let phone = addInfo[i].owner_home_phone.split('\n');
				addInfo[i].owner_home_phone = phone[0];

				this.searchAddress(addInfo[i]);

				while (this.st == true) {
					await this.sleep(1);
				}
			}
		},
		sleep(sec) {
			return new Promise(resolve => setTimeout(resolve, sec * 1000));
		},
		searchAddress(addInfo) {
			window.naver.maps.Service.geocode({ address: addInfo.jibun_addr }, function (status, re) {
				if (status === window.naver.maps.Service.Status.ERROR) {
					// alert('Something wrong!');
					this.st == false;
					return;
				}
				if (!re.result.total) {
					console.log(addInfo.building_name + '   ' + addInfo.jibun_addr + '  ::  검색결과가 없음');
					// alert('검색결과가 없습니다.');
					this.st == false;
					return;
				}

				let item = re.v2.addresses[0];

				if (item.jibunAddress.indexOf(item.addressElements[6].longName) != -1) {
					let str = item.jibunAddress.split(' ');

					for (let i = 0; i < str.length; i++) {
						if (str[i] == item.addressElements[6].longName) {
							str.splice(i, 1);

							item.jibunAddress = str.join(' ');
						}
					}
				}

				if (item.roadAddress.indexOf(item.addressElements[6].longName) != -1) {
					let str = item.roadAddress.split(' ');

					for (let i = 0; i < str.length; i++) {
						if (str[i] == item.addressElements[6].longName) {
							str.splice(i, 1);

							item.roadAddress = str.join(' ');
						}
					}
				}

				if (item.roadAddress) {
					item.roadAddress += '(' + item.addressElements[2].longName + ')';
				}

				addInfo.jibunAddress = item.jibunAddress;
				addInfo.roadAddress = item.roadAddress;
				addInfo.zonecode = item.addressElements[8].longName == '' ? 0 : Number(item.addressElements[8].longName);
				addInfo.point = { x: item.x, y: item.y };

				window.btnOnCreate(addInfo);
			});
		},
		btnOnCreate(addInfo) {
			this.$apiPOST('/admin/api/create/building222', {
				zonecode: addInfo.zonecode,
				road_addr: addInfo.roadAddress,
				jibun_addr: addInfo.jibunAddress,
				lat: addInfo.point.y,
				lng: addInfo.point.x,
				name: addInfo.building_name,
				item: addInfo,
			}).then(re => {
				if (re == false) {
					console.log(addInfo.building_name + ' :: ' + '등록실패');
					this.st = false;
					return;
				}

				console.log(addInfo.building_name + ' :: ' + '등록완료');
				this.st = false;
			});
		},
	},
};
</script>

<style></style>
