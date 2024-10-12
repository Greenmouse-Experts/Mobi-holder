const StatCard = ({ number, label, iconColor, IconComponent, colorGradient }) => {
    const style = {
        boxShadow: `-0.5px -1px 0px ${colorGradient[0]}, 0 1px 1px ${colorGradient[1]}`,
        borderRadius: '10px !important',
    };

    return (
        <div className="bg-mobiDarkCloud rounded-md py-6 px-4 w-full flex items-center justify-between" style={style}>
            <div>
                <p className="text-white text-xl font-semibold">{number}</p>
                <p className="text-gray-400 text-sm">{label}</p>
            </div>
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}
            >
                {IconComponent}
            </div>
        </div>
    );
};

export default StatCard