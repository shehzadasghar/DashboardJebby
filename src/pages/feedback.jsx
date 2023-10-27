import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowAllFeedBack from '../components/feedback/showallfeedback'
const Feedback = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar />
                <ShowAllFeedBack />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowAllFeedBack />
            </div>
        </>
    )
}

export default Feedback