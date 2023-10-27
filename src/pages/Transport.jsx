import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowTransport from "../components/transport/ShowTransport"
const Rental = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowTransport />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowTransport />
            </div>
        </>

    )
}

export default Rental