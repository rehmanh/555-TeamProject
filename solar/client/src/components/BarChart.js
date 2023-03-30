import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Total Requests and Completed Throughout The Year',
        },
    },
};
export { options };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Requests',
            data: [12,2,1,23,12,42,42],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Completed',
            data: [12,2,1,23,12,42,42],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function App() {
    return <Bar options={options} data={data} height={312}/>;
}