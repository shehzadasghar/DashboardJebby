import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowAllVendors from "../components/vendors/ShowAllVendors"
const Vendors = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllVendors />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllVendors />
            </div>
        </>
    )
}

export default Vendors