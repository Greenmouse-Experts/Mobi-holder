import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeContext } from '../../../../context/ThemeContext';

// Register components in ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MembersAnalysis() {

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
                    callback: (value) => `${value / 1000}K`, // Adjust tick values for 'K' format
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

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [10000, 15000, 15000, 20000, 30000, 15000],
                backgroundColor: 'rgba(198, 0, 249, 1)', // Purple color for the bars
                borderRadius: 5,
                barThickness: 6
            },
            {
                label: "Monthly Sales (Dataset 2)",
                data: [2000, 4500, 3500, 6000, 7000, 1500],
                backgroundColor: "rgba(0, 123, 255, 1)", // Blue color for the bars
                borderRadius: 5,
                barThickness: 6,
            },
        ],
    };

    return (
        <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
            <p className="text-mobiTable font-[500px] mb-4">Today</p>
            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Members Analysis</h3>
            </div>
            <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
                <div className='chartColor' style={{ width: '100%', height: '240px' }}>
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>
    );
};

