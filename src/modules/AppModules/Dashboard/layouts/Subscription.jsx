import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeContext } from '../../../../context/ThemeContext';

// Register components in ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Subscription({ subscriptions }) {
    const { theme } = useContext(ThemeContext);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        processSubscriptionData();
    }, [subscriptions, currentYear]);

    const processSubscriptionData = () => {
        // Initialize monthly counts
        const monthlyCounts = Array(12).fill(0);

        // Filter subscriptions for the current year
        const currentYearSubs = subscriptions.filter(sub => {
            const subDate = new Date(sub.subscribedAt);
            return subDate.getFullYear() === currentYear;
        });

        // Count subscriptions per month
        currentYearSubs.forEach(sub => {
            const subDate = new Date(sub.subscribedAt);
            const month = subDate.getMonth(); // 0-11
            monthlyCounts[month]++;
        });

        // Prepare chart data
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Subscriptions',
                    data: monthlyCounts,
                    backgroundColor: 'rgba(198, 0, 249, 1)',
                    borderRadius: 5,
                    barThickness: 6
                },
            ]
        });
    };

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
                    precision: 0
                },
                grid: {
                    color: theme === 'dark' ? 'rgba(174, 185, 225, 1)' : 'rgba(96, 101, 116, 1)'
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
                callbacks: {
                    label: function (context) {
                        return `${context.parsed.y} subscription${context.parsed.y !== 1 ? 's' : ''}`;
                    }
                }
            },
        },
    };

    const handleYearChange = (increment) => {
        setCurrentYear(prev => prev + increment);
    };

    return (
        <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
            <p className="text-mobiTable font-[500px] mb-4">Today</p>
            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Subscriptions</h3>
                <div className="flex space-x-2">
                    <button
                        className="px-2 py-2 flex gap-2 rounded-md"
                        style={{ backgroundColor: 'rgba(10, 19, 48, 1)' }}
                        onClick={() => handleYearChange(-1)}
                    >
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 10.5L5 7.5L8.5 4.5" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="px-2 py-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(10, 19, 48, 1)' }}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.921631" y="1.76648" width="12.3818" height="12.4521" rx="1.3652" stroke="#AEB9E1" strokeWidth="1.09216" />
                            <path d="M0.921631 5.92786H13.3034V12.8523C13.3034 13.6063 12.6922 14.2175 11.9382 14.2175H2.28683C1.53285 14.2175 0.921631 13.6063 0.921631 12.8523V5.92786Z" fill="#AEB9E1" stroke="#AEB9E1" stroke-width="1.09216" />
                            <path d="M10.5474 0.566528V2.82414" stroke="#AEB9E1" stroke-width="1.09216" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.7749 0.566528V2.82414" stroke="#AEB9E1" stroke-width="1.09216" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className='text-xs text-white'>{currentYear}</p>
                    </button>
                    <button
                        className="px-2 py-2 flex gap-2 rounded-md"
                        style={{ backgroundColor: 'rgba(10, 19, 48, 1)' }}
                        onClick={() => handleYearChange(1)}
                    >
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.5 10.5L9 7.5L5.5 4.5" stroke="#AEB9E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
                <div className='chartColor' style={{ width: '100%', minHeight: '300px' }}>
                    {chartData.datasets.length > 0 ? (
                        <Bar options={options} data={chartData} />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No subscription data available for {currentYear}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};