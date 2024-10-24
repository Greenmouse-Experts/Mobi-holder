import StatCard from "../../../../components/StatsCard";
import organisation from "../../../../assets/organisation.svg";
import calendar from "../../../../assets/calendar.svg";
import subscriptions from "../../../../assets/subscriptions.svg";
import users from "../../../../assets/users.svg";
import usersSmall from "../../../../assets/users-small.svg";
import plusSign from "../../../../assets/plus-sign.svg";
import star from "../../../../assets/star.svg";

const DashboardStats = () => {
    return (
        <div className="flex w-full lg:flex-row md:flex-row flex-col gap-4">
            <StatCard
                cronTop
                cronTopIcon={<img src={ usersSmall } />}
                number={3023}
                label="Total Users"
                iconColor="bg-mobiOrange"
                IconComponent={<img src={users} alt="Users" style={{ width: '22px' }} />}
            />
            <StatCard
                cronTop
                cronTopIcon={<img src={usersSmall} />}
                number={407}
                label="Total Subscriptions"
                iconColor="bg-mobiSubPurple"
                IconComponent={<img src={subscriptions} alt="Subscriptions" style={{ width: '20px' }} />}
            />
            <StatCard
                cronTop
                cronTopIcon={<img src={plusSign} />}
                number={139}
                label="Total Organisations"
                iconColor="bg-mobiSkyCloud"
                IconComponent={<img src={organisation} alt="Organisations" style={{ width: '20px' }} />}
            />
            <StatCard
                cronTop
                cronTopIcon={<img src={star} />}
                number={329}
                label="Total Event"
                iconColor="bg-mobiLightGreen"
                IconComponent={<img src={calendar} alt="Events" style={{ width: '20px' }} />}
            />
        </div>
    );
};

export default DashboardStats;