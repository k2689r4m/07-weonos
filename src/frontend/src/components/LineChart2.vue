<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, BarElement, CategoryScale, LinearScale } from 'chart.js';
import cs from 'chartjs-plugin-datalabels';

ChartJS.register(Title, BarElement, CategoryScale, LinearScale, cs);

export default {
	name: 'BarChart',
	components: { Bar },
	props: {
		chartData: {
			type: Object,
			required: true,
		},
	},
	created() {},
	mounted() {},
	watch: {},
	data() {
		return {
			chartOptions: {
				indexAxis: 'y',
				responsive: false,
				plugins: {
					datalabels: {
						color: '#ffffff',
						font: {
							weight: 'bold',
							size: 11,
						},
						formatter: (val, context) => {
							return context.dataset.label + ' ' + val + '%';
						},
					},
				},
				tooltips: {
					enabled: false,
				},

				scales: {
					x: {
						min: 0,
						max: 100,
						ticks: {
							source: 'labels',
							callback: function () {
								return '';
							},
							stepSize: 50,
							display: true,
							color: 'red',
							beginAtZero: true,
						},

						grid: {
							lineWidth: 2,
						},

						display: true,
					},
					y: {
						display: false,
					},
				},
				maintainAspectRatio: false,
				animation: {
					duration: 0,
				},
			},
		};
	},
};
</script>
