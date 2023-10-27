import React from "react"
import ShowAllAboutApp from "../components/showAllAboutApp/ShowAllAboutApp"
import SideBar from "../components/sidebar/Sidebar"


const AboutApp = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllAboutApp />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllAboutApp />
            </div>
        </>
    )
}
export default AboutApp