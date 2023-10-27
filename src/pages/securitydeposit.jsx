import React from 'react'
import SideBar from "../components/sidebar/Sidebar"
import ShowSecurityDeposit from "../components/securitydeposit/showsecuritydeposit"
const SecurityDeposit = () => {
    return (
        <>
            <div className="d-lg-flex d-md-none d-none">
                <SideBar state={true} />
                <ShowSecurityDeposit />
            </div>
            <div className="d-lg-none d-md-block d-block">
                <SideBar />
                <ShowSecurityDeposit />
            </div>
        </>
    )
}

export default SecurityDeposit