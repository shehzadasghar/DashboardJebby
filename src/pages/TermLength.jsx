import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowAllTermLength from "../components/showAllTermLength/ShowAllTermLength"
const TermLength = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllTermLength />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllTermLength />
            </div>
        </>
    )
}

export default TermLength