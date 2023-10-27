import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowAllUserListing from "../components/userlisting/ShowAllUserListing"
const UserListing = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllUserListing />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllUserListing />
            </div>
        </>
    )
}

export default UserListing