import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Revenue',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        // y1: {
        //     type: 'linear',
        //     display: true,
        //     position: 'right',
        //     grid: {
        //         drawOnChartArea: false,
        //     },
        // },
    },
};
export { options };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'New Jersey',
            data: [15, 2, 34, 45, 56, 63,122],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
        },
        {
            label: 'New York',
            data: [12, 4, 34, 66, 2, 33, 78],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
        },
    ],
};

export default function App() {
    return <Line options={options} data={data} height={149}/>;
}
