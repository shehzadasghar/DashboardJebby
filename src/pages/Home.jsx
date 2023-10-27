import React from "react"
import Dashboard from "../components/dashboard/Dashboard"
import SideBar from "../components/sidebar/Sidebar"


const HomePage = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <Dashboard />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <Dashboard />
            </div>
        </>
    )
}
export default HomePage