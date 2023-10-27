import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowCategory from "../components/category/ShowCategory"
const Category = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar state={true} />
                <ShowCategory />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowCategory />
            </div>
        </>
    )
}

export default Category