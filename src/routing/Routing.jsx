import React, { useState, useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import TermsAndPolicy from "../pages/TermsAndPolicy";
import Privacy from "../pages/Privacy";
import HomePage from "../pages/Home";
import Roles from "../pages/Roles";
import AboutApp from "../pages/AboutApp";
import LoginFrom from "../pages/Loginfrom";
import TermLength from "../pages/TermLength";
import Rental from "../pages/Rental";
import UsagePolicy from "../pages/UsagePolicy";
import Insurance from "../pages/Insurance";
import Transport from "../pages/Transport";
import Maintenance from "../pages/Maintenance";
import Termination from "../pages/Termination";
import User from "../pages/User";
import Products from "../pages/Products";
import Category from "../pages/Category";
import ReturnProduct from "../pages/returnproduct";
import SecurityDeposit from "../pages/securitydeposit";
import SubCategory from "../pages/SubCategory";
import Featuredcategory from "../pages/Featuredcategory";
import Error from "../pages/Error"
import Orders from "../pages/Orders";
import JebbyFeesOrSalesTax from "../pages/jeebyfeesorsalestax";
import ViewVendors from "../pages/ViewVendors";
import ViewMessage from "../pages/viewmessage";
import Vendors from "../pages/Vendors";
import UserListing from "../pages/UserListing";
import Home from '../pages/Home'
import Notification from "../pages/Notification";
import ShowAllFeedBack from "../pages/feedback";
const config = require('../helpers/config.json')

const Routing = () => {
    let LocalUserType = localStorage.getItem("userType")
    let LocalAdmin = localStorage.getItem("admin")
    const [categorymanage, setCategoryManage] = useState('')
    const [trafficmanage, setTrafficManage] = useState('')
    const [accountmanage, setAccountManage] = useState('')
    let LocalRoleId = localStorage.getItem('roleId')
    useEffect(() => {
        fetch(`${config['baseUrl']}/getRolesById/${LocalRoleId}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            return res.json();
        }).then((res) => {
            if (res.data && res.data.length > 0) {
                setCategoryManage(res.data[0].category_manage)
                setTrafficManage(res.data[0].traffic_manage)
                setAccountManage(res.data[0].account_manage)
            }
        }
        )
    }, [])
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        localStorage.getItem("token") === null ?
                            <Route path='/' element={<LoginFrom />} />
                            :
                            <>
                                {
                                    // &&
                                    LocalAdmin || (LocalUserType === "user" && trafficmanage === 1) ? <>
                                        {/* <Route path='/vendors' element={<Vendors />} /> */}
                                        <Route path="/notification" element={<Notification />} />
                                        <Route path='/' element={<Home />} />
                                        <Route path='/dashboard' element={<Home />} />
                                        <Route path='/' element={<TermsAndPolicy />} />
                                        <Route path='/termsandconditions' element={<TermsAndPolicy />} />
                                        <Route path='/privacy' element={<Privacy />} />
                                        <Route path='/aboutapp' element={<AboutApp />} />
                                        <Route path='/insurance' element={<Insurance />} />
                                        <Route path='/maintenance' element={<Maintenance />} />
                                        <Route path='/rentalagreement' element={<Rental />} />
                                        <Route path='/termLength' element={<TermLength />} />
                                        <Route path='/termination' element={<Termination />} />
                                        <Route path='/transport' element={<Transport />} />
                                        <Route path='/usagepolicy' element={<UsagePolicy />} />
                                        <Route path='/orders' element={<Orders />} />
                                        <Route path='/jebbyfeesorsalestax' element={<JebbyFeesOrSalesTax />} />
                                        <Route path="/viewvendor" element={<ViewVendors />} />
                                        <Route path="/viewmessage" element={<ViewMessage />} />
                                        <Route path="/viewmessage/:id" element={<ViewMessage />} />
                                        <Route path='/vendors' element={<Vendors />} />
                                        <Route path='/userlisting' element={<UserListing />} />
                                        <Route path='/feedback' element={<ShowAllFeedBack />} />

                                        <Route path="/*" element={<Error />} />
                                    </>
                                        : ""
                                }
                                {
                                    LocalAdmin || (LocalUserType === "user" && categorymanage === 1) ?
                                        <>
                                            <Route path='/' element={<Category />} />
                                            <Route path='/category' element={<Category />} />
                                            <Route path='/returnproduct' element={<ReturnProduct />} />
                                            <Route path='/securitydeposit' element={<SecurityDeposit />} />
                                            <Route path='/subcategory' element={<SubCategory />} />
                                            <Route path="/featuredcategory" element={<Featuredcategory />} />
                                            <Route path="/*" element={<Error />} />
                                        </>
                                        : ""
                                }
                                {
                                    LocalAdmin || (LocalUserType === "user" && accountmanage === 1) ?
                                        <>
                                            <Route path='/' element={<Roles />} />
                                            <Route path='/roles' element={<Roles />} />
                                            <Route path="/*" element={<Error />} />
                                        </>
                                        : ""
                                }
                                {
                                    LocalAdmin === "admin" ?
                                        <>
                                            <Route path='/userform' element={<User />} />
                                            <Route path='/products' element={<Products />} />
                                            <Route path="/*" element={<Error />} />
                                        </>
                                        : ""
                                }
                            </>
                    }
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Routing;

