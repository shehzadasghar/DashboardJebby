import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowProducts from "../components/products/ShowProducts"
const Products = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowProducts />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowProducts />
            </div>
        </>
    )
}

export default Products