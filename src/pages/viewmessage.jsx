import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowViewMessage from "../components/viewmessage/showviewmessage"
const ViewMessage = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowViewMessage />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowViewMessage />
            </div>
        </>
    )
}

export default ViewMessage