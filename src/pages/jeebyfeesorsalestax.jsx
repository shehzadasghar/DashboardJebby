import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowOrders from "../components/orders/ShowOrders"
import Showjebbyfees from "../components/orders/showjeebyfees"

const JebbyFeesOrSalesTax = () => {
    return (

        <>
             <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <Showjebbyfees />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <Showjebbyfees />
            </div>
        </>
    )
}

export default JebbyFeesOrSalesTax