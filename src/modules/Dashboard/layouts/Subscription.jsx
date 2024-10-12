import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components in ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
                color: 'white',
            },
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                color: 'white',
                beginAtZero: true,
                callback: (value) => `${value / 1000}K`, // Adjust tick values for 'K' format
            },
            grid: {
                borderDash: [8, 4],
                color: 'rgba(255, 255, 255, 0.2)',
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            bodyColor: '#000',
            titleColor: '#000',
        },
    },
};

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Monthly Sales',
            data: [20000, 45000, 35000, 60000, 70000, 15000, 30000, 10000, 5000, 40000, 20000, 30000],
            backgroundColor: 'rgba(198, 0, 249, 1)', // Purple color for the bars
            borderRadius: 5,
        },
    ],
};

export default function Subscription() {
    return (
        <div className="text-white px-5 py-7 rounded-lg border-gray-900 border">
            <p className="text-mobiSkyBlue font-[500px] mb-4">Today</p>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Subscriptions</h3>
                <div className="flex space-x-2">
                    <button className="px-2 py-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(10, 19, 48, 1)' }}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.921631" y="1.76648" width="12.3818" height="12.4521" rx="1.3652" stroke="#AEB9E1" strokeWidth="1.09216" />
                            <path d="M0.921631 5.92786H13.3034V12.8523C13.3034 13.6063 12.6922 14.2175 11.9382 14.2175H2.28683C1.53285 14.2175 0.921631 13.6063 0.921631 12.8523V5.92786Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-width="1.09216" />
                            <path d="M10.5474 0.566528V2.82414" stroke="#AEB9E1" stroke-width="1.09216" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.7749 0.566528V2.82414" stroke="#AEB9E1" stroke-width="1.09216" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className='text-xs text-white'>Jan 2024 - Dec 2024</p>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.8">
                                <path d="M4.87769 6.34473L8.97329 10.4403L13.0689 6.34473" stroke="#AEB9E1" stroke-width="1.3652" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="py-1 mt-7 rounded-lg">
                <div style={{ width: '100%', minHeight: '300px', borderRadius: '10px' }}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

