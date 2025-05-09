import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

function Table({
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
    onPageChange
}) {
    const [updatedTableHeader, setUpdatedTableHeader] = useState(tableHeader);

    useEffect(() => {
        setUpdatedTableHeader(hasNumber ? ["#", ...tableHeader] : tableHeader);
    }, [hasNumber, tableHeader]);

    return (
        <div className={`md:px-5 px-3 py-7 w-full md:rounded-lg ${transparentBg ? 'bg-transparent' : 'bg-mobiSearchDark border border-mobiBorderFray'}`}>
            <p className="text-mobiTable font-[500px] mb-4">{title}</p>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h3 className="text-lg font-semibold">{subTitle}</h3>
                <div className="flex space-x-2">
                    {filter && (
                        <Menu placement="left">
                            <MenuHandler>
                                <button className="bg-gray-700 px-2 py-1 rounded-md">
                                    <svg width="20" height="10" viewBox="0 0 24 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.125 0H22.875C23.1734 0 23.4595 0.108129 23.6705 0.300601C23.8815 0.493072 24 0.75412 24 1.02632C24 1.29851 23.8815 1.55956 23.6705 1.75203C23.4595 1.9445 23.1734 2.05263 22.875 2.05263H1.125C0.826631 2.05263 0.540483 1.9445 0.329505 1.75203C0.118526 1.55956 0 1.29851 0 1.02632C0 0.75412 0.118526 0.493072 0.329505 0.300601C0.540483 0.108129 0.826631 0 1.125 0ZM4.5 6.5C4.5 6.2278 4.61853 5.96676 4.8295 5.77429C5.04048 5.58181 5.32663 5.47368 5.625 5.47368H18.375C18.6734 5.47368 18.9595 5.58181 19.1705 5.77429C19.3815 5.96676 19.5 6.2278 19.5 6.5C19.5 6.7722 19.3815 7.03324 19.1705 7.22571C18.9595 7.41819 18.6734 7.52632 18.375 7.52632H5.625C5.32663 7.52632 5.04048 7.41819 4.8295 7.22571C4.61853 7.03324 4.5 6.7722 4.5 6.5ZM9 11.9737C9 11.7015 9.11853 11.4404 9.3295 11.248C9.54048 11.0555 9.82663 10.9474 10.125 10.9474H13.875C14.1734 10.9474 14.4595 11.0555 14.6705 11.248C14.8815 11.4404 15 11.7015 15 11.9737C15 12.2459 14.8815 12.5069 14.6705 12.6994C14.4595 12.8919 14.1734 13 13.875 13H10.125C9.82663 13 9.54048 12.8919 9.3295 12.6994C9.11853 12.5069 9 12.2459 9 11.9737Z" fill="white" />
                                    </svg>
                                </button>
                            </MenuHandler>
                            <MenuList>
                                <p className="mb-2 !text-black montserrat font-bold text-sm">Sort By:</p>
                                <MenuItem><span onClick={() => sortFunc("name", "ASC")}>Name: A - Z</span></MenuItem>
                                <MenuItem><span onClick={() => sortFunc("name", "DESC")}>Name: Z - A</span></MenuItem>
                                <MenuItem><span onClick={() => sortFunc("date", "ASC")}>Date: Oldest to Newest</span></MenuItem>
                                <MenuItem><span onClick={() => sortFunc("date", "DESC")}>Date: Newest to Oldest</span></MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                    {exportData && (
                        <button onClick={handleExportDataClick} className="px-2 py-2 flex gap-2 rounded-md bg-[#0A1330]">
                            <span className="text-xs text-white">Export data</span>
                            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.86279 1.19531V14.8064" stroke="white" stroke-width="1.63333" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.29333 9.23633L6.86152 14.8045L12.4297 9.23633" stroke="white" stroke-width="1.63333" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    )}
                    {tableBtn}
                </div>
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block border w-full py-1 md:mt-7 mt-3 rounded-lg border-mobiBorderTable">
                <table className="table-auto w-full text-mobiSkyBlue">
                    <thead>
                        <tr>
                            {updatedTableHeader.map((header, index) => (
                                <th key={index} className="px-3 text-left py-3">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden space-y-4 mt-4">
                {React.Children.map(children, (row, rowIndex) => {
                    if (!React.isValidElement(row) || row.type !== 'tr') return null;

                    const cells = React.Children.toArray(row.props.children).filter(Boolean);

                    return (
                        <div
                            key={rowIndex}
                            className="bg-mobiDarkCloud rounded-md p-3 border border-mobiBorderTable"
                        >
                            {cells.map((cell, colIndex) => {
                                if (!React.isValidElement(cell) || cell.type !== 'td') return null;
                                return (
                                    <div key={colIndex} className="flex justify-between py-3 border-b border-mobiBorderTable last:border-b-0">
                                        <span className="text-xs font-medium text-gray-400">
                                            {updatedTableHeader[colIndex]}
                                        </span>
                                        <span className="text-sm">{cell.props.children}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 mt-5">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="outlined" size="sm">Previous</Button>
                        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="outlined" size="sm">Next</Button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <p className="text-sm">
                            Page <span className="font-medium">{currentPage}</span> of{" "}
                            <span className="font-medium">{totalPages}</span>
                        </p>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} variant="text" size="sm">&lt;</Button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button key={i + 1} onClick={() => onPageChange(i + 1)} variant={currentPage === i + 1 ? "filled" : "text"} size="sm" className="mx-1">{i + 1}</Button>
                            ))}
                            <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} variant="text" size="sm">&gt;</Button>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Table;
