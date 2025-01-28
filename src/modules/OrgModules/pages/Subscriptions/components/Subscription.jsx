import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeContext } from '../../../../../context/ThemeContext';
import { useMemo } from 'react';




function generateChartData(subscribers) {
    const currentDate = new Date();

    // Generate labels for the next 6 months starting from the current month
    const labels = [];
    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
        labels.push(date.toLocaleString('default', { month: 'short', year: 'numeric' }));
    }

    // Count subscribers joined in each of the next 6 months
    const subscriberCountPerMonth = Array(6).fill(0);

    subscribers.forEach((subscriber) => {
        const joinedDate = new Date(subscriber.createdAt);
        const joinedMonth = joinedDate.getMonth();
        const joinedYear = joinedDate.getFullYear();

        for (let i = 0; i < 12; i++) {
            const labelDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i);
            const labelMonth = labelDate.getMonth();
            const labelYear = labelDate.getFullYear();

            if (joinedMonth === labelMonth && joinedYear === labelYear) {
                subscriberCountPerMonth[i]++;
            }
        }
    });

    // Chart data
    return {
        labels,
        datasets: [
            {
                label: 'Newly Added subscribers',
                data: subscriberCountPerMonth,
                backgroundColor: 'rgba(198, 0, 249, 1)', // Purple color for the bars
                borderRadius: 5,
                barThickness: 6,
            },
        ],
    };
}








// Register components in ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Subscription({ subscribers }) {

    const { theme } = useContext(ThemeContext);

    const options = {
        responsive: true,
        animation: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: theme === 'dark' ? 'rgba(174, 185, 225, 1)' : 'rgba(96, 101, 116, 1)',
                },
                grid: {
                    drawTicks: true,
                    tickBorderDash: [20, 5],
                },
            },
            y: {
                ticks: {
                    color: theme === 'dark' ? 'rgba(174, 185, 225, 1)' : 'rgba(96, 101, 116, 1)',
                    beginAtZero: true,
                    stepSize: 1, // Ensure Y-axis ticks increment by 1
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(174, 185, 225, 1)' : 'rgba(96, 101, 116, 1)'
                    // display: false
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


    const data = useMemo(() => generateChartData(subscribers), [subscribers]);


    return (
        <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
            <p className="text-mobiTable font-[500px] mb-4">Today</p>
            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Subscriptions</h3>
                {/*<div className="flex space-x-2">
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
                                <path d="M4.87769 6.34473L8.97329 10.4403L13.0689 6.34473" stroke="#AEB9E1" strokeWidth="1.3652" stroke-linecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>*/}
            </div>
            <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
                <div className='chartColor' style={{ width: '100%', minHeight: '300px' }}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

