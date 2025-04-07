import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeContext } from '../../../../context/ThemeContext';
import { useMemo } from 'react';

// Register components in ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




function generateChartData(members) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Generate labels for January to December
    const labels = Array.from({ length: 12 }, (_, i) =>
        new Date(currentYear, i).toLocaleString('default', { month: 'short' })
    );

    // Initialize counts for each month
    const memberCountPerMonth = Array(12).fill(0);

    // Count members joined per month in the current year
    members.forEach((member) => {
        const joinedDate = new Date(member.dateJoined);
        const joinedMonth = joinedDate.getMonth();
        const joinedYear = joinedDate.getFullYear();

        if (joinedYear === currentYear) {
            memberCountPerMonth[joinedMonth]++;
        }
    });

    // Chart data
    return {
        labels,
        datasets: [
            {
                label: 'Newly Added Members',
                data: memberCountPerMonth,
                backgroundColor: 'rgba(198, 0, 249, 1)',
                borderRadius: 5,
                barThickness: 6,
            },
        ],
    };

}




    export default function MembersAnalysis({ members }) {

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


        const data = useMemo(() => generateChartData(members), [members]);


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

