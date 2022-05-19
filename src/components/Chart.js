import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	registerables
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import ChartStreaming from "chartjs-plugin-streaming";
import { har } from "../service/model";

ChartJS.register(
	...registerables,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartStreaming
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Line Chart",
		},
		streaming: {
			duration: 20000,
		},
	},
	scales: {
		x: {
			type: "realtime",
			// Change options only for THIS AXIS
			realtime: {
				duration: 20000,
				refresh: 1000,
				delay: 1000,
				onRefresh: (chart) => {
					// query your data source and get the array of {x: timestamp, y: value} objects
					let data = { x: Date.now(), y: har.result };

					// append the new data array to the existing chart data
					chart.data.datasets[0].data.push(data);
					chart.update("quiet");
				},
			},
		},
	},
};

export const data = {
	datasets: [
		{
			label: "Dataset 1",
			data: [],
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
	],
};

export function RealTimeChart() {
	return <Chart type="line" options={options} data={data} />;
}
