<template>
	<Bar :data="chartData" :options="chartOptions" />
</template>
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, BarElement, CategoryScale, LinearScale, Colors } from 'chart.js';
import cs from 'chartjs-plugin-datalabels';

ChartJS.register(Title, BarElement, CategoryScale, LinearScale, cs, Colors);

export default {
	name: 'BarChart',
	components: { Bar },
	props: {
		chartData: {
			type: Object,
			required: true,
		},
	},
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
							stepSize: 100,
							display: true,
							callback: function () {
								return '';
							},
						},

						stacked: true,
						display: true,

						grid: {
							drawBorder: false,
							lineWidth: 2,
						},
					},
					y: {
						stacked: true,

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
