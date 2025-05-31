import React from 'react';

const Table = ({
    title,
    subTitle,
    filter,
    exportData,
    handleExportDataClick,
    sortFunc,
    tableBtn,
    transparentBg,
    children,
    tableHeader,
    hasNumber,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    search,
    onSearchChange,
}) => {
    return (
        <div className={`rounded-xl p-6 ${transparentBg ? '' : 'bS-overlay shadow'} w-full`}>
            <div className="flex flex-col md:flex-row justify-between w-full items-start md:items-center gap-4 mb-6">
                <div className='w-full flex flex-col gap-1'>
                    <h2 className="md:text-2xl text-xl font-semibold text-gray-500">{title}</h2>
                    {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
                </div>
                <div className="flex flex-wrap justify-end w-full gap-3 items-center">
                    {search !== undefined && (
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search..."
                            className="px-4 py-2 border border-gray-300 rounded-md bS-overlay focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    )}
                    {tableBtn}
                </div>
            </div>

            <div className="overflow-auto">
                <table className="w-full table-auto border-collapse text-sm">
                    <thead className="bg-gray-300">
                        <tr>
                            {hasNumber && (
                                <th className="text-left px-4 py-3 font-medium text-gray-700">#</th>
                            )}
                            {tableHeader?.map((header, idx) => (
                                <th key={idx} className="text-left px-4 py-3 font-medium text-gray-700">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 montserrat">{children}</tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-sm montserrat">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm montserrat hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm montserrat hover:bg-gray-100 disabled:opacity-50"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
