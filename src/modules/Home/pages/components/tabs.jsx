import { useState } from 'react';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = ['General', 'Privacy', 'Events', 'Support', 'ID Management', 'Profile'];

    return (
        <div className="md:border-b-4 border-gray-200">
            <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 justify-center md:justify-between md:space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`md:text-lg text-base font-medium pb-2 px-6 ${activeTab === tab
                            ? 'text-mobiBlue border-b-4 border-mobiBlue'
                            : 'text-black hover:text-gray-800'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
