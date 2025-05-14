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
        <div className={`rounded-lg p-4 ${transparentBg ? '' : 'bg-mobiGrey'} w-full`}>
            <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <div className=''>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <h3 className="text-lg font-semibold">{subTitle}</h3>
                </div>
                <div className='flex justify-end gap-3'>
                    {search !== undefined && (
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search..."
                            className="px-3 py-1.5 border border-gray-600 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                    )}
                    {tableBtn}</div>
            </div>

            <div className="overflow-auto">
                <table className="w-full table-auto border-separate border-spacing-y-3">
                    <thead>
                        <tr className="text-left bg-transparent">
                            {hasNumber && <th className="px-3 py-2 text-sm font-bold">#</th>}
                            {tableHeader?.map((header, index) => (
                                <th key={index} className="px-3 py-2 text-sm font-bold">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>

            <div className="flex justify-end mt-4">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="px-4 pt-1">{currentPage} / {totalPages}</span>
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
