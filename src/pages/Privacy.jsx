import React from "react"
import SideBar from "../components/sidebar/Sidebar"
import ShowAllprivacy from '../components/showallprivacy/ShowAllprivacy'


const Privacy = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllprivacy />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllprivacy />
            </div>
        </>
    )
}
export default Privacy