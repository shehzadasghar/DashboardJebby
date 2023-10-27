import React from 'react'
import SendNotification from '../components/notification/SendNotification'
import SideBar from "../components/sidebar/Sidebar"
const Notification = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <SendNotification />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <SendNotification />
            </div>
        </>
    )
}

export default Notification