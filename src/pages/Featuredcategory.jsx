import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import FeaturedCategory from "../components/featuredcategory/FeaturedCategory"
const Featuredcategory = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <FeaturedCategory />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <FeaturedCategory />
            </div>
        </>
    )
}

export default Featuredcategory