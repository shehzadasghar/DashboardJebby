import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowReturnProduct from "../components/returnproduct/showreturnproduct"
const ReturnProduct = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar state={true} />
                <ShowReturnProduct />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowReturnProduct />
            </div>
        </>
    )
}

export default ReturnProduct