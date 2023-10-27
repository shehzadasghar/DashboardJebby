import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowRental from "../components/rental/ShowRental"
const Rental = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowRental />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowRental />
            </div>
        </>

    )
}

export default Rental