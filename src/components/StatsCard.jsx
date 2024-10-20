const StatCard = ({ number, label, iconColor, IconComponent, colorGradient }) => {
    const style = {
        boxShadow: `-0.5px -1px 0px ${colorGradient[0]}, 0 0px 1px ${colorGradient[1]}`,
        borderRadius: '10px !important',
    };

    return (
        <div className="bg-mobiDarkCloud rounded-md py-6 px-4 w-full flex items-center justify-between" style={style}>
            <div>
                <p className="text-mobiRomanSilver text-xl">{number}</p>
                <p className="text-sm font-semibold">{label}</p>
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