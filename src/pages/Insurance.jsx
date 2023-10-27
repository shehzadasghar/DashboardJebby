import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowInsurance from "../components/insurance/ShowInsurance"
const Insurance = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowInsurance />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowInsurance />
            </div>
        </>

    )
}

export default Insurance