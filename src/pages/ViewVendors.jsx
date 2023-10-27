import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowViewVendor from "../components/viewvendor/ShowViewVendor"
const ViewVendors = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowViewVendor />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowViewVendor />
            </div>
        </>
    )
}

export default ViewVendors