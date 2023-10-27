import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowUsage from "../components/usage/ShowUsage"
const UsagePolicy = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowUsage />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowUsage />
            </div>
        </>

    )
}

export default UsagePolicy