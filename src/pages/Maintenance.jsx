import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowMaintenance from "../components/maintenance/ShowMaintenance"
const Maintenance = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowMaintenance />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowMaintenance />
            </div>
        </>
    )
}

export default Maintenance