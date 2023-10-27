import React from "react"
import SideBar from "../components/sidebar/Sidebar"
import ShowAllRoles from '../components/Roles/ShowAllRoles'


const Roles = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllRoles />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllRoles />
            </div>
        </>
    )
}
export default Roles