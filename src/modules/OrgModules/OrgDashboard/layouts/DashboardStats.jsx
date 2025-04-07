import StatCard from "../../../../components/StatsCard";
import cards from "../../../../assets/cards.svg";
import organisation from "../../../../assets/organisation.svg";
import subscriptions from "../../../../assets/subscriptions.svg";
import calendar from "../../../../assets/calendar.svg";

const DashboardStats = ({members, subscriptionData, eventsData}) => {
    return (
        <div className="flex w-full lg:flex-row md:flex-row flex-col gap-4">
            <StatCard
                cronTop
                number={members.length}
                label="Total Members"
                iconColor="bg-mobiOrange"
                IconComponent={<img src={cards} alt="ID Cards" style={{ width: '22px' }} />}
                colorGradient={['rgba(239, 149, 107, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={members.filter(member => member.status === 'active').length}
                label="Active Members"
                iconColor="bg-mobiSkyCloud"
                IconComponent={<img src={organisation} alt="Organisations" style={{ width: '20px' }} />}
                colorGradient={['rgba(107, 155, 239, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={subscriptionData}
                label="Total Subscriptions"
                iconColor="bg-mobiSubPurple"
                IconComponent={<img src={subscriptions} alt="Subscriptions" style={{ width: '20px' }} />}
                colorGradient={['rgba(239, 107, 228, 1)', 'rgba(52, 59, 79, 1)']}
            />
            <StatCard
                cronTop
                number={eventsData.length}
                label="Upcoming Events"
                iconColor="bg-mobiLightGreen"
                IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
                colorGradient={['rgba(107, 239, 215, 1)', 'rgba(52, 59, 79, 1)']}
            />
        </div>
    );
};

export default DashboardStats;