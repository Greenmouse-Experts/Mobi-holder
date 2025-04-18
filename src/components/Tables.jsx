import { Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

function Table({ title, subTitle, filter, exportData, handleExportDataClick, sortFunc, tableBtn, transparentBg, children, tableHeader, hasNumber,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
}) {
    const [updatedTableHeader, setUpdatedTableHeader] = useState(tableHeader);

    useEffect(() => {
        if (hasNumber) {
            setUpdatedTableHeader(["#", ...tableHeader]);
        } else {
            setUpdatedTableHeader(tableHeader);
        }
    }, [hasNumber, tableHeader]);

    return (
        <div className={`md:px-5 px-3 py-7 w-full md:rounded-lg ${transparentBg ? 'bg-transparent' : 'bg-mobiSearchDark border border-mobiBorderFray'}`}>
            <p className="text-mobiTable font-[500px] mb-4">{title}</p>
            <div className="flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{subTitle}</h3>
                <div className="flex space-x-2">
                    {filter && (
                        <Menu placement="left">
                            <MenuHandler>
                                <button className="bg-gray-700 px-2 py-1 rounded-md">
                                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.75 0H15.25C15.4489 0 15.6397 0.0790175 15.7803 0.21967C15.921 0.360322 16 0.551088 16 0.75C16 0.948912 15.921 1.13968 15.7803 1.28033C15.6397 1.42098 15.4489 1.5 15.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790176 1.13968 0 0.948912 0 0.75C0 0.551088 0.0790176 0.360322 0.21967 0.21967C0.360322 0.0790175 0.551088 0 0.75 0ZM3 4.75C3 4.55109 3.07902 4.36032 3.21967 4.21967C3.36032 4.07902 3.55109 4 3.75 4H12.25C12.4489 4 12.6397 4.07902 12.7803 4.21967C12.921 4.36032 13 4.55109 13 4.75C13 4.94891 12.921 5.13968 12.7803 5.28033C12.6397 5.42098 12.4489 5.5 12.25 5.5H3.75C3.55109 5.5 3.36032 5.42098 3.21967 5.28033C3.07902 5.13968 3 4.94891 3 4.75ZM6 8.75C6 8.55109 6.07902 8.36032 6.21967 8.21967C6.36032 8.07902 6.55109 8 6.75 8H9.25C9.44891 8 9.63968 8.07902 9.78033 8.21967C9.92098 8.36032 10 8.55109 10 8.75C10 8.94891 9.92098 9.13968 9.78033 9.28033C9.63968 9.42098 9.44891 9.5 9.25 9.5H6.75C6.55109 9.5 6.36032 9.42098 6.21967 9.28033C6.07902 9.13968 6 8.94891 6 8.75Z" fill="white" />
                                    </svg>
                                </button>
                            </MenuHandler>
                            <MenuList>
                                <p className="mb-2 !text-black montserrat font-bold text-sm">Sort By:</p>

                                <MenuItem className="flex flex-col gap-3">
                                    <span className="cursor-pointer" onClick={() => sortFunc("name", "ASC")}>
                                        Name: A - Z
                                    </span>
                                </MenuItem>
                                <MenuItem className="flex flex-col gap-3">
                                    <span className="cursor-pointer" onClick={() => sortFunc("name", "DESC")}>
                                        Name: Z - A
                                    </span>
                                </MenuItem>

                                {/* Add sorting by date */}
                                <MenuItem className="flex flex-col gap-3">
                                    <span className="cursor-pointer" onClick={() => sortFunc("date", "ASC")}>
                                        Date: Oldest to Newest
                                    </span>
                                </MenuItem>
                                <MenuItem className="flex flex-col gap-3">
                                    <span className="cursor-pointer" onClick={() => sortFunc("date", "DESC")}>
                                        Date: Newest to Oldest
                                    </span>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                    {exportData && (
                        <button onClick={handleExportDataClick} className="px-2 py-2 flex gap-2 rounded-md" style={{ backgroundColor: 'rgba(10, 19, 48, 1)' }}>
                            <span className="text-xs text-white">Export data</span>
                            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00122 1V11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M0.909424 6.9082L5.00033 10.9991L9.09124 6.9082" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                    {tableBtn}
                </div>
            </div>

            <div className="overflow-x-auto border w-full py-1 md:mt-7 mt-3 rounded-lg border-mobiBorderTable">
                <table className="table-auto table-responsive w-full text-mobiSkyBlue">
                    {updatedTableHeader && (
                        <thead>
                            <tr>
                                {updatedTableHeader.map((header, index) => (
                                    <th className="px-3 text-left py-2" key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {children}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <Button
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outlined"
                                size="sm"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                variant="outlined"
                                size="sm"
                                className="ml-3"
                            >
                                Next
                            </Button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <p className="text-sm">
                                Page <span className="font-medium">{currentPage}</span> of{" "}
                                <span className="font-medium">{totalPages}</span>
                            </p>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <Button
                                        onClick={() => onPageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        variant="text"
                                        size="sm"
                                    >
                                        &lt;
                                    </Button>
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <Button
                                            key={i + 1}
                                            onClick={() => onPageChange(i + 1)}
                                            variant={currentPage === i + 1 ? "filled" : "text"}
                                            size="sm"
                                            className="mx-1"
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        onClick={() => onPageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        variant="text"
                                        size="sm"
                                    >
                                        &gt;
                                    </Button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Table;
