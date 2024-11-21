import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const SubscriptionAnalysis = () => {
    const data = {
        labels: ['Individual', 'Organisation'],
        datasets: [
            {
                data: [40, 60], // Percentages for Individual and Organisation
                backgroundColor: ['#3A53F7', '#E773F9'], // Custom colors
                borderWidth: 0, // Remove border
                cutout: '70%', // Make it a donut shape
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
        },
    };

    return (
        <>
            <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
                <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Subscription Analysis</h3>
                </div>
                <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
                    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                        {/* SVG Donut Chart */}
                        <svg width="300" height="300" viewBox="0 0 42 42" className="donut-chart">
                            {/* First Segment (Individual - 40%) */}
                            <circle
                                className="donut-segment"
                                cx="21"
                                cy="21"
                                r="15.91549431"
                                fill="transparent"
                                stroke="rgba(198, 0, 249, 1)"
                                strokeWidth="6"
                                strokeDasharray="38 60"
                                strokeDashoffset="18"
                            ></circle>

                            {/* Background Circle (Organisation - 60%) */}
                            <circle
                                className="donut-segment"
                                cx="21"
                                cy="21"
                                r="15.91549431"
                                fill="transparent"
                                stroke="rgba(34, 197, 94, 1)"
                                strokeWidth="6"
                                strokeDasharray="28 70"
                                strokeDashoffset="48"
                            ></circle>


                            <circle
                                className="donut-segment"
                                cx="21"
                                cy="21"
                                r="15.91549431"
                                fill="transparent"
                                stroke="rgba(37, 99, 235, 1)"
                                strokeWidth="6"
                                strokeDasharray="28 70"
                                strokeDashoffset="77"
                            ></circle>
                        </svg>

                        {/* Center text */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '16px',
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            <div>60%</div>
                            <div>(Organisation)</div>
                        </div>
                    </div>
                </div></div>
            {/*<div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Event Analysis</h3>
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
                                <path d="M4.87769 6.34473L8.97329 10.4403L13.0689 6.34473" stroke="#AEB9E1" strokeWidth="1.3652" stroke-linecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
                <div className='p-3' style={{ position: 'relative', width: '300px', height: '300px' }}>
                    <Doughnut data={data} options={options} />
                </div>
            </div>
    </div>*/}

        </>
    );
};

export default SubscriptionAnalysis;
