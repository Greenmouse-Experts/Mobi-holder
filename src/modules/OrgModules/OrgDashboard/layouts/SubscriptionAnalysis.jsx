import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const SubscriptionAnalysis = ({ subscribers, plans }) => {
    // Process subscription data
    const subscriptionData = useMemo(() => {
        const planCounts = {};
        const orgCounts = {};
        let totalSubscribers = 0;

        subscribers.forEach(subscriber => {
            const plan = subscriber.plan;
            planCounts[plan.name] = (planCounts[plan.name] || 0) + 1;
            
            const orgId = subscriber.organizationId;
            orgCounts[orgId] = (orgCounts[orgId] || 0) + 1;
            totalSubscribers++;
        });

        return { planCounts, orgCounts, totalSubscribers };
    }, [subscribers]);

    const data = {
        labels: Object.keys(subscriptionData.planCounts),
        datasets: [
            {
                data: Object.values(subscriptionData.planCounts),
                backgroundColor: ['#3A53F7', '#E773F9', '#22C55E', '#FACC15'], // Colors for different plans
                borderWidth: 0,
                cutout: '70%',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                enabled: true,
            },
        },
    };


    return (
        <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Subscription Analysis</h3>
            </div>
            <div className="py-1 rounded-lg border border-mobiBorderTable px-3">
                <div className="p-3 flex justify-center">
                    <Doughnut data={data} options={options} />
                </div>
                <div className="mt-1 text-center">
                    <p className="font-bold text-base">Total Subscribers: {subscriptionData.totalSubscribers}</p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionAnalysis;
