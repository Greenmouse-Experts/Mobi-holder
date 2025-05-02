import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserAnalysis = ({ individuals, organisations }) => {
  const total = individuals + organisations;
  const individualPercent = individuals ? ((individuals / total) * 100).toFixed(0) : 0;
  const organisationPercent = organisations ? ((organisations / total) * 100).toFixed(0) : 0;

  const isOrganisationMajority = organisations > individuals;

  const majorityType = isOrganisationMajority ? 'Organisation' : 'Individual';
  const minorityType = isOrganisationMajority ? 'Individual' : 'Organisation';

  const majorityPercent = isOrganisationMajority ? organisationPercent : individualPercent;
  const minorityPercent = isOrganisationMajority ? individualPercent : organisationPercent;

  const data = {
    labels: ['Individual', 'Organisation'],
    datasets: [
      {
        data: [individuals, organisations],
        backgroundColor: ['#3A53F7', '#E773F9'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="md:px-5 px-2 py-7 md:rounded-lg border border-mobiBorderFray bg-mobiSearchDark">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">User Analysis</h3>
      </div>

      <div className="py-1 mt-5 rounded-lg border border-mobiBorderTable px-3">
        <div className="relative" style={{ width: '300px', height: '300px' }}>
          <Doughnut data={data} options={options} />

          {/* Center Text */}
          <div
            className="absolute top-1/2 left-1/2 font-bold text-center"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <div className="text-xl">{majorityPercent}%</div>
            <div className="text-sm mb-2">({majorityType})</div>

            <div className="text-base font-semibold">{minorityPercent}%</div>
            <div className="text-xs">({minorityType})</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalysis;
