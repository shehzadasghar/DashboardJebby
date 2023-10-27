import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowUser from "../components/user/ShowUser"
const User = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowUser />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowUser />
            </div>
        </>
    )
}

export default User