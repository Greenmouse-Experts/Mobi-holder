import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import organisation from "../../../../assets/organisation.svg";
import subscriptions from "../../../../assets/subscriptions.svg";
import calendar from "../../../../assets/calendar.svg";

const DashboardStats = () => {
    return (
        <div className="flex w-full lg:flex-row md:flex-row flex-col gap-4">
            <StatCard
                cronTop
                number={12}
                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                    28.4%
                </span>}
                label="Total Members"
                iconColor="bg-mobiOrange"
                IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px' }} />}
                colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={21}
                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                    28.4%
                </span>}
                label="Active Members"
                iconColor="bg-mobiSkyCloud"
                IconComponent={<img src={organisation} alt="Organisations" style={{ width: '20px' }} />}
                colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={16}
                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                    28.4%
                </span>}
                label="Total Subscriptions"
                iconColor="bg-mobiSubPurple"
                IconComponent={<img src={subscriptions} alt="Subscriptions" style={{ width: '20px' }} />}
                colorGradient={['rgba(239, 107, 228, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={16}
                cronAnalytics={<span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                    28.4%
                </span>}
                label="Upcoming Events"
                iconColor="bg-mobiLightGreen"
                IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
                colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
            />
        </div>
    );
};

export default DashboardStats;