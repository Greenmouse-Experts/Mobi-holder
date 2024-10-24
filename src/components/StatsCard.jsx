const StatCard = ({ number, label, iconColor, IconComponent, colorGradient, cronTop, cronTopIcon }) => {
    let style = null;
    if (colorGradient) {
        style = {
            boxShadow: `-0.5px -1px 0px ${colorGradient[0]}, 0 0px 1px ${colorGradient[1]}`,
            borderRadius: '10px !important',
        };
    }

    return (
        <div className="bg-mobiDarkCloud rounded-md shadow-md py-6 px-4 w-full flex items-center justify-between" style={style}>
            <div className="flex flex-col gap-3">
                <span className={`${cronTop ? 'text-sm text-[rgba(174,185,225,1)] font-semibold' : 'text-mobiRomanSilver text-xl'} flex gap-1`}>
                    { cronTopIcon } {cronTop ? label : number}
                </span>
                <span className={`${cronTop ? 'text-xl' : 'text-sm font-semibold'} flex gap-2`}>{cronTop ? number : label}
                    {cronTop ? <span className="flex w-auto flex-col justify-center py-1 px-3 text-xs rounded-md shadow-xs" style={{ backgroundColor: 'rgba(5, 193, 104, 0.2)' }}>
                        28.4%
                    </span>
                        :
                        <></>
                    }
                </span>
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