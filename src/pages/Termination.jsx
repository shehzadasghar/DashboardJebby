import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowTermination from "../components/termination/ShowTermination"
const Termination = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowTermination />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowTermination />
            </div>
        </>
    )
}

export default Termination