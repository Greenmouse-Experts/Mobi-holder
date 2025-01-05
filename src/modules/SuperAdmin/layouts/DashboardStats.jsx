import { Link } from "react-router-dom";
import StatCard from "../../../components/StatsCard";

const DashboardStats = ({ statsData, cronTop }) => {
    return (
        <div className="flex w-full lg:flex-row md:flex-row flex-col gap-4">
            {statsData.map((statData) => (
                <>
                    <Link to={statData.link} className="w-full flex">
                        <StatCard
                            cronTop={cronTop}
                            cronTopIcon={statData.cronTopIcon}
                            cronAnalytics={statData.cronAnalytics}
                            number={statData.value}
                            label={statData.label}
                            iconColor={statData.iconColor}
                            IconComponent={statData.icon}
                        />
                    </Link>
                </>
            ))}
        </div>
    );
};

export default DashboardStats;