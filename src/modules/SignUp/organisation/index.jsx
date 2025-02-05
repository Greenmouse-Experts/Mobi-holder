import React, { useState } from "react";
import OrgInfoSetUp from "./orgInfoSetUp";
import OrgAdminSetUp from "./orgAdminSetUp";

export default function OrganisationSignUp() {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePaginate = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }

    const reversePaginate = () => {
        setCurrentPage(prevPage => prevPage - 1);
    }

    return (
        <>
            {
                currentPage === 1 ?
                    <OrgInfoSetUp moveNext={handlePaginate} />
                    :
                    <OrgAdminSetUp moveBack={reversePaginate} />
            }
        </>
    )
}