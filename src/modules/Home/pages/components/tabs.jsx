const Tabs = ({ categories = [], activeTab, onTabChange }) => {
    return (
        <div className="md:border-b-4 border-gray-200">
            <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 justify-center md:justify-between md:space-x-8 overflow-x-auto">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onTabChange(category.name)}
                        className={`flex items-center md:text-lg text-base font-medium pb-2 px-6 whitespace-nowrap ${
                            activeTab === category.name
                                ? 'text-mobiBlue border-b-4 border-mobiBlue'
                                : 'text-black hover:text-gray-800'
                        }`}
                    >
                        {category.name}
                        {category.faqs?.length > 0 && (
                            <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                                {category.faqs.length}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;