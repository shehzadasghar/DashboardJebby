import React from "react"
import ShowSubCategory from "../components/subcategory/ShowSubCategory"
import SideBar from "../components/sidebar/Sidebar"


const SubCategory = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowSubCategory />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowSubCategory />
            </div>
        </>
    )
}
export default SubCategory