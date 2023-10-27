import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowOrders from "../components/orders/ShowOrders"
const Orders = () => {
    return (

        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowOrders />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowOrders />
            </div>
        </>
    )
}

export default Orders