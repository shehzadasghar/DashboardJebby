import React, { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import "./Sidebar.css"
import { Link, NavLink } from "react-router-dom"
import ll from "../../assets/sidebar/Logo.png"
import { connect } from "react-redux";
import { Dropdown, Dropdown1, Dropdown3} from "../../actions/Dropdown";
// import logo from "/static/media/Logo.58a4eb3a.png"
const config = require('../../helpers/config.json')
const SideBar = (props) => {
  //Dropdown
  const [dropdown, setDropdown] = useState(false)
  const [dropdown3, setDropdown3] = useState(false)
  const [isOpen, setIsOpen] = useState(false);


  // const handleLinkClick = (e) => {
  //   e.stopPropagation();
  //   // Perform any other desired actions here
  // }
  const [dropdownCms, setDropdownCms] = useState(false)
  let LocalUserType = localStorage.getItem("userType")
  let LocalAdmin = localStorage.getItem("admin")
  const [categorymanage, setCategoryManage] = useState('')
  const [trafficmanage, setTrafficManage] = useState('')
  const [accountmanage, setAccountManage] = useState('')
  let LocalRoleId = localStorage.getItem('roleId')

  const [navId, setNavId] = useState(true)
  const [headId, setHeadId] = useState(true)
  const [barsId, setBarsId] = useState(true)
  const [logoId, setLogoId] = useState(true)
  const [timesId, setTimesId] = useState(true)
  const Open = () => {
    setNavId(true)
    setHeadId(true)
    setBarsId(true)
    setLogoId(true)
    setTimesId(true)
  }
  const Close = () => {
    setNavId(false)
    setHeadId(false)
    setBarsId(false)
    setLogoId(false)
    setTimesId(false)
  }
  const signOut = () => {
    localStorage.clear()
    window.location = "/"
  }

  useEffect(() => {
    try {
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
        // localStorage.setItem("check traff",trafficmanage)
      }
      )
    } catch (error) {
      console.log("Error", error)
    }

  }, [])
  useEffect(() => {
    dropdownCms === true ? document.body.className = "overflow-y" : document.body.className = "overflow-hidden"
  }, [dropdownCms])
  useEffect(() => {
    dropdown === true ? document.body.className = "overflow-y" : document.body.className = "overflow-hidden"
  }, [dropdown])






  return (
    <>
      <nav id={navId == false ? "navdeactive" : "navactive"} className="d-lg-block d-md-none d-none">
        <div id={headId == false ? "headdeactive" : "headactive"} className="border-bottom" >
          <div className="container-fluid">
            <div className={headId == false ? "row py-3 justify-content-center" : "row py-3"}>
              <div className="col-md-4" id={logoId == false ? "logodeactive" : "logoactive"}><div className="text-center"><img src={ll} className="img-fluid" /></div></div>
              <div className={headId == false ? "col-md-8 d-flex align-self-center justify-content-center p-0" : "col-md-8 d-flex align-self-center justify-content-end"}>
                <span onClick={() => Open()} id={barsId == false ? "barsdeactive" : "barsactive"}>
                  <svg width={24} height={24} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h18" />
                    <path d="M3 6h18" />
                    <path d="M3 18h18" />
                  </svg>
                </span>
                <span onClick={() => Close()} id={timesId == false ? "timesdeactive" : "timesactive"}>
                  <svg width={24} height={24} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </span>
              </div>
            </div>
          </div>



          {/* <i className="fa fa-bars" onClick={() => Open()} id={barsId == false ? "barsdeactive" : "barsactive"} /> */}
          {/* <div id="va">Code Routing</div> */}
          {/* <i className="fa fa-times" onClick={() => Close()} id={timesId == false ? "timesdeactive" : "timesactive"} /> */}

        </div>
        <ul className="sidebar-ul  ">
          {LocalAdmin === "admin" || (LocalUserType === "user" && trafficmanage === 1) ?
            <>
              <li className='nav-item'>
                <NavLink
                  onClick={() => {
                    props.Dropdown(false)
                    props.Dropdown1(false)
                  }}
                  className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/dashboard'>
                  <span className="icon me-3">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                      <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                    </svg>
                  </span>
                  Dashboard
                </NavLink>
              </li>
              <div 
              onClick={() => {
                setDropdownCms(!dropdownCms)
                props.Dropdown1(!props.dropdownReducer.open_close1)
              }} 
              className={props.dropdownReducer.open_close1 === true ? "dropdown-button-cms rotate box-shadow cursor" : "dropdown-button-cms box-shadow cursor"}>
                <Link className={props.dropdownReducer.open_close1 === false ? "nav-link box-shadow cms-m w-100" : "nav-link box-shadow cms-m w-100"} to='/termsandconditions'  aria-expanded="false">
                  <span className='icon me-3'>
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 4.5h-9.75V6H21V4.5Z" />
                      <path d="M21 18h-9.75v1.5H21V18Z" />
                      <path d="M12.75 11.25H3v1.5h9.75v-1.5Z" />
                      <path d="M5.25 8.25a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                      <path d="M5.25 21.75a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                      <path d="M18.75 15a3 3 0 1 1 0-5.999 3 3 0 0 1 0 5.999Zm0-4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                    </svg>
                  </span>
                  CMS
                  <span className="float-end chevron cms">
                    <svg width={25} height={25} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </Link>
              </div>
              <div className={props.dropdownReducer.open_close1 === true ? "dropdown-container-cms pre-scrollable" : "dropdown-container-cms d-none"}>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/termsandconditions' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </span>
                  Terms And Conditions
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/privacy' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                      <path d="M12 16v-4" />
                      <path d="M12 8h.01" />
                    </svg>
                  </span>Manage Privacy Policy
                </NavLink>
                {/* <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/aboutapp' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
                      <path d="M12 18h.01" />
                    </svg>
                  </span>
                  About App
                </NavLink> */}
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/termLength' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.4 19.2s1.2 0 1.2-1.2-1.2-4.8-6-4.8-6 3.6-6 4.8c0 1.2 1.2 1.2 1.2 1.2h9.6ZM10.827 18a.298.298 0 0 1-.027-.005c.002-.317.2-1.236.912-2.064.663-.776 1.827-1.531 3.888-1.531 2.06 0 3.225.756 3.888 1.531.712.828.91 1.749.912 2.064l-.01.002a.309.309 0 0 1-.016.003h-9.547Zm4.773-7.2a2.4 2.4 0 1 0 0-4.802 2.4 2.4 0 0 0 0 4.802Zm3.6-2.4a3.599 3.599 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Zm-8.476 5.136a7.048 7.048 0 0 0-1.476-.297 8.843 8.843 0 0 0-.848-.04c-4.8 0-6 3.6-6 4.8 0 .801.4 1.2 1.2 1.2h5.06A2.686 2.686 0 0 1 8.4 18c0-1.211.453-2.45 1.308-3.484a6.35 6.35 0 0 1 1.016-.98Zm-2.42.864A6.592 6.592 0 0 0 7.2 18H3.6c0-.312.197-1.236.912-2.069.654-.763 1.79-1.507 3.792-1.53V14.4ZM4.2 9a3.6 3.6 0 1 1 7.2 0 3.6 3.6 0 0 1-7.2 0Zm3.6-2.4a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z" />
                    </svg>
                  </span>
                  Copyright Policy
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/rentalagreement' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14.64a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
                      <path d="M2.4 7.44a1.2 1.2 0 0 1 1.2-1.2h16.8a1.2 1.2 0 0 1 1.2 1.2v9.6a1.2 1.2 0 0 1-1.2 1.2H3.6a1.2 1.2 0 0 1-1.2-1.2v-9.6Zm3.6 0a2.4 2.4 0 0 1-2.4 2.4v4.8a2.4 2.4 0 0 1 2.4 2.4h12a2.4 2.4 0 0 1 2.4-2.4v-4.8a2.4 2.4 0 0 1-2.4-2.4H6Z" />
                    </svg>
                  </span>
                  Rental Agreement
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/usagepolicy' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.76 20.32a.736.736 0 0 0 .12-.03 2.64 2.64 0 0 0 .353-.142 7.467 7.467 0 0 0 1.072-.64 12.873 12.873 0 0 0 2.744-2.679c1.833-2.396 3.369-6.037 2.704-11.025a.576.576 0 0 0-.394-.468 72.88 72.88 0 0 0-3.404-1.026c-1.332-.362-2.557-.63-3.195-.63v16.64ZM8.247 3.072c1.302-.354 2.685-.672 3.513-.672.828 0 2.212.318 3.514.672 1.332.36 2.675.786 3.464 1.044a1.85 1.85 0 0 1 1.253 1.515c.715 5.372-.944 9.354-2.958 11.988a14.133 14.133 0 0 1-3.02 2.943 8.594 8.594 0 0 1-1.258.75c-.336.159-.697.288-.995.288-.297 0-.657-.13-.994-.288a8.583 8.583 0 0 1-1.258-.75 14.133 14.133 0 0 1-3.02-2.943C4.474 14.985 2.814 11.003 3.53 5.63a1.848 1.848 0 0 1 1.252-1.515 74.944 74.944 0 0 1 3.465-1.044Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Usage Policy & Limitations
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/insurance' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M11.477 4.712c-3.573 0-6.685 2.045-7.584 4.95h-.66a1.2 1.2 0 0 0-1.18 1.406l.304 1.752a1.8 1.8 0 0 0 1.773 1.492h.316c.36.616.826 1.174 1.374 1.658l-.875 2.973a.6.6 0 0 0 .576.769h2.4a.6.6 0 0 0 .565-.398l.579-1.622c.762.208 1.572.32 2.413.32.848 0 1.666-.113 2.434-.326l.651 1.647a.599.599 0 0 0 .558.379h2.4a.6.6 0 0 0 .574-.774l-.913-3.007c1.31-1.177 2.138-2.78 2.138-4.569a5.51 5.51 0 0 0-.024-.517c.313-.132.61-.32.846-.533.378.368.978.368.978-.5 0 .268-.6.268-.553-.031.05-.097.087-.2.108-.306a.839.839 0 0 0-.243-.774.696.696 0 0 0-.848-.118.882.882 0 0 0-.45.675c-.029.291.098.576.384.784-.1.069-.203.13-.31.184-.641-3.197-3.941-5.514-7.731-5.514Zm8.607 4.651a.675.675 0 0 1-.117.252.9.9 0 0 1-.053-.03c-.175-.108-.188-.21-.182-.267a.285.285 0 0 1 .14-.208c.059-.032.096-.025.136.014a.242.242 0 0 1 .076.24Zm-10.798-.78a7.936 7.936 0 0 1 2.19-.303c.8 0 1.564.116 2.272.327a.6.6 0 1 0 .344-1.15 9.12 9.12 0 0 0-2.615-.377c-.88 0-1.73.123-2.523.35a.6.6 0 0 0 .332 1.154ZM7.92 10.38a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Insurance & Indemnification
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/transport' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4 6.597a1.8 1.8 0 0 1 1.8-1.8H15a1.8 1.8 0 0 1 1.8 1.8v1.8h1.224a1.8 1.8 0 0 1 1.404.675l1.777 2.22a1.8 1.8 0 0 1 .395 1.126v2.579a1.8 1.8 0 0 1-1.8 1.8h-.6a2.4 2.4 0 0 1-4.8 0h-6a2.4 2.4 0 1 1-4.797-.102A1.8 1.8 0 0 1 2.4 14.997v-8.4Zm1.553 8.947a2.399 2.399 0 0 1 4.126.053h6.643c.211-.365.514-.667.878-.878V6.597a.6.6 0 0 0-.6-.6H4.2a.6.6 0 0 0-.6.6v8.4a.6.6 0 0 0 .353.547ZM16.8 14.397a2.4 2.4 0 0 1 2.079 1.2h.921a.6.6 0 0 0 .6-.6v-2.58a.6.6 0 0 0-.132-.374l-1.776-2.22a.6.6 0 0 0-.468-.226H16.8v4.8ZM6 15.597a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm10.8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
                    </svg>
                  </span>
                  Transport & Installation Policy
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/maintenance' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 16.2a.6.6 0 0 1 .6-.6H6a.6.6 0 0 1 .6.6v2.4a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6v-2.4Zm4.8-3.6a.6.6 0 0 1 .6-.6h2.4a.6.6 0 0 1 .6.6v6a.6.6 0 0 1-.6.6H8.4a.6.6 0 0 1-.6-.6v-6ZM12.6 9a.6.6 0 0 1 .6-.6h2.4a.6.6 0 0 1 .6.6v9.6a.6.6 0 0 1-.6.6h-2.4a.6.6 0 0 1-.6-.6V9Zm4.8-3.6a.6.6 0 0 1 .6-.6h2.4a.6.6 0 0 1 .6.6v13.2a.6.6 0 0 1-.6.6H18a.6.6 0 0 1-.6-.6V5.4Z" />
                    </svg>
                  </span>
                  Maintenance & Warranties
                </NavLink>
                <NavLink style={{ width: '100%' }} className="dropdown-item nav-link box-shadow mb-3" to='/termination' >
                  <span className="icon me-2">
                    <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.08 17.4a.6.6 0 0 0 .6.6h9.6a.6.6 0 0 0 .6-.6V6.6a.6.6 0 0 0-.6-.6h-9.6a.6.6 0 0 0-.6.6V9a.6.6 0 1 1-1.2 0V6.6a1.8 1.8 0 0 1 1.8-1.8h9.6a1.8 1.8 0 0 1 1.8 1.8v10.8a1.8 1.8 0 0 1-1.8 1.8h-9.6a1.8 1.8 0 0 1-1.8-1.8V15a.6.6 0 1 1 1.2 0v2.4Z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M3.054 12.424a.6.6 0 0 1 0-.85l3.6-3.6a.6.6 0 1 1 .85.85L4.927 11.4H15.48a.6.6 0 1 1 0 1.2H4.927l2.577 2.575a.6.6 0 1 1-.85.85l-3.6-3.6Z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Termination

                </NavLink>
              </div>

            </> : ""
          }

          {/* ROLE MANAGEMENT */}
          {LocalAdmin === "admin" || (LocalUserType === "user" && accountmanage === 1) ?
            <>
              <li className='nav-item '>
                <NavLink
                  onClick={() => {
                    props.Dropdown(false)
                    props.Dropdown1(false)
                  }}
                  className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/roles' >
                  <span className="icon me-3">
                    <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                    </svg>
                  </span>
                  Roles

                </NavLink>
              </li>
            </> : ""
          }

          {
            LocalAdmin === "admin" ?
              <>
                <li className='nav-item '>
                  <NavLink
                    onClick={() => {
                      props.Dropdown(false)
                      props.Dropdown1(false)
                    }}
                    className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/userform' >
                    <span className="icon me-3">
                      <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                      </svg>
                    </span>
                    Sub admin

                  </NavLink>
                </li>
                <li className='nav-item '>
                  <NavLink
                    onClick={() => {
                      props.Dropdown(false)
                      props.Dropdown1(false)
                    }}
                    className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/products' >
                    <span className="icon me-3">
                      <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                      </svg>
                    </span>
                    Products

                  </NavLink>
                </li>
              </>
              : ""
          }
          {/* Category Manager */}

          {
            LocalAdmin === "admin" || (LocalUserType === "user" && categorymanage === 1) ?
              <>

                {/* <div className="dropdown">                                                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expande d="false">                                                                             Dropdown button                                                                   </button>
                  <div className="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenuButton">
                    <NavLink style={{ width: '90%' }} className="nav-link box-shadow mb-3 ms-3" to='/category' >
                      <span className="icon me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4z" /><circle cx="17" cy="17" r="3" /></g></svg>
                      </span>
                      Main Category

                    </NavLink>
                    <NavLink style={{ width: '90%' }} className="dropdown-item nav-link box-shadow mb-3 ms-3" to='/subcategory' >
                      <span className="icon me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zm-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2zm-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM9 2H3a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zM8 26a2 2 0 1 1-2-2a2.002 2.002 0 0 1 2 2zM3 10V4h6l.002 6z" /></svg>
                      </span>
                      Sub Category
                    </NavLink>
                    <NavLink style={{ width: '90%' }} className="dropdown-item nav-link box-shadow mb-3 ms-3" to='/featuredcategory' >
                      <span className="icon me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zm-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2zm-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM9 2H3a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zM8 26a2 2 0 1 1-2-2a2.002 2.002 0 0 1 2 2zM3 10V4h6l.002 6z" /></svg>
                      </span>
                      Featured Category

                    </NavLink>
                  </div>


                </div> */}
                <li className="nav-item">
                  <div onClick={() => {
                    setDropdown(!dropdown)
                    props.Dropdown(!dropdown)
                  }} className={props.dropdownReducer.open_close && dropdown == true ? `${headId == false ? "nav-link box-shadow dropdown-button rotate cursor" : "nav-link box-shadow dropdown-button rotate cursor w-100"} ` : `${headId == false ? "nav-link box-shadow dropdown-button cursor" : "nav-link box-shadow dropdown-button cursor w-100"}`} aria-expanded="false">
                    <span className="icon me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m6.76 6l.45.89L7.76 8H12v5H4V6h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8V6h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55zM6.76 19l.45.89l.55 1.11H12v5H4v-7h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8v-7h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55z" /></svg>
                    </span>
                    Categories
                    <span className="float-end chevron cat">
                      <svg width={25} height={25} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                  <div className={props.dropdownReducer.open_close && dropdown === true ? "dropdown-container open pre-scrollable-cat overflow-x-hidden" : "dropdown-container d-none"}>
                    <ul>
                      <li className="list-none"> <NavLink className="nav-link box-shadow" to='/category' >
                        <span className="icon me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4z" /><circle cx="17" cy="17" r="3" /></g></svg>
                        </span>
                        Main Category
                      </NavLink></li>
                      <li className="list-none"><NavLink className="dropdown-item nav-link box-shadow" to='/subcategory' >
                        <span className="icon me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zm-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2zm-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM9 2H3a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zM8 26a2 2 0 1 1-2-2a2.002 2.002 0 0 1 2 2zM3 10V4h6l.002 6z" /></svg>
                        </span>
                        Sub Category
                      </NavLink></li>
                      <li className="list-none">
                        <NavLink className="dropdown-item nav-link box-shadow" to='/featuredcategory' >
                          <span className="icon me-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 10h-5v2h5v6h-7v2h3v2.142a4 4 0 1 0 2 0V20h2a2.003 2.003 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zm-1 16a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM19 6h-5v2h5v6h-7v2h3v6.142a4 4 0 1 0 2 0V16h2a2.002 2.002 0 0 0 2-2V8a2.002 2.002 0 0 0-2-2zm-1 20a2 2 0 1 1-2-2a2.003 2.003 0 0 1 2 2zM9 2H3a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h2v10.142a4 4 0 1 0 2 0V12h2a2.002 2.002 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2zM8 26a2 2 0 1 1-2-2a2.002 2.002 0 0 1 2 2zM3 10V4h6l.002 6z" /></svg>
                          </span>
                          Featured Category
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>

              </>
              : ""
          }
















{/* <li  className="nav-item">
                  <div onClick={() => {
                    setDropdown3(!dropdown3)
                    props.Dropdown(!dropdown3)
                    setDropdown(false)
                  }} 
                  className={props.dropdownReducer.open_close && dropdown3  == true ? `${headId == false ? "nav-link box-shadow dropdown-button rotate cursor" : "nav-link box-shadow dropdown-button rotate cursor w-100"} ` : `${headId == false ? "nav-link box-shadow dropdown-button cursor" : "nav-link box-shadow dropdown-button cursor w-100"}`} 
                  aria-expanded="false">
                    <span className="icon me-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m6.76 6l.45.89L7.76 8H12v5H4V6h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8V6h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55zM6.76 19l.45.89l.55 1.11H12v5H4v-7h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8v-7h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55z" /></svg>
                    </span>
                    Security Deposit
                    <span className="float-end chevron cat">
                      <svg width={25} height={25} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                  <div className={props.dropdownReducer.open_close && dropdown3  === true ? "dropdown-container open pre-scrollable-cat overflow-x-hidden" : "dropdown-container d-none"}>
                    <ul>
                      <li className="list-none"> <NavLink className="nav-link box-shadow" to='/returnproduct' >
                        <span className="icon me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4z" /><circle cx="17" cy="17" r="3" /></g></svg>
                        </span>
                        Return Product
                      </NavLink></li>
                      
                    </ul>
                  </div>
                </li> */}




















{/* <li className='nav-item'>
            <NavLink onClick={() => {
              props.Dropdown(false)
              props.Dropdown1(false)
            }} className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/securitydeposit'>
              <span className="icon me-3">
              <svg width={19} height={19} fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                      </svg>
              </span>
              Security Deposit
            </NavLink>
          </li> */}










<li className='nav-item'>
            <NavLink onClick={() => {
              props.Dropdown(false)
              props.Dropdown1(false)
            }} className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/jebbyfeesorsalestax'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
              Jebby Fees Or Sales Tax
            </NavLink>
          </li>

          <li className='nav-item'>
            <NavLink onClick={() => {
              props.Dropdown(false)
              props.Dropdown1(false)
            }} className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/returnproduct'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
              Return Product
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink onClick={() => {
              props.Dropdown(false)
              props.Dropdown1(false)
            }} className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/orders'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
              Orders
            </NavLink>
          </li>





          <li className='nav-item '>
            <NavLink
              onClick={() => {
                props.Dropdown(false)
                props.Dropdown1(false)
              }}
              className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/vendors'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                  <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                </svg>
              </span>
              Vendors
            </NavLink>
          </li>


          <li className='nav-item '>
            <NavLink
              onClick={() => {
                props.Dropdown(false)
                props.Dropdown1(false)
              }}
              className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/userlisting'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                  <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                </svg>
              </span>
              User Listing
            </NavLink>
          </li>

          <li className='nav-item '>
            <NavLink
              onClick={() => {
                props.Dropdown(false)
                props.Dropdown1(false)
              }}
              className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/feedback'>
              <span className="icon me-3">
                <svg width={19} height={19} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                  <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                </svg>
              </span>
              FeedBack
            </NavLink>
          </li>

          {
            LocalAdmin === "admin" || LocalUserType === "user" ?
              <>
                <li className='nav-item '>
                  <NavLink
                    onClick={() => {
                      props.Dropdown(false)
                      props.Dropdown1(false)
                    }}
                    className={headId == false ? "nav-link box-shadow" : "nav-link box-shadow w-100"} to='/notification'>
                    <span className="icon me-3">
                      <svg width={19} height={19} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                      </svg>
                    </span>
                    Send Notification
                  </NavLink>
                </li>
                <li className='nav-item border-top'>
                  <button style={{ background: "transparent" }} onClick={signOut} className={headId == false ? "nav-link box-shadow  text-start logout-nav" : "nav-link box-shadow  text-start logout-nav w-100"} >
                    <span className="icon me-3">
                      <svg width={19} height={19} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <path d="m16 17 5-5-5-5" />
                        <path d="M21 12H9" />
                      </svg>
                    </span>
                    Log Out
                  </button>
                </li>
              </>
              : ""
          }



        </ul>
      </nav>





      {/* Responsive */}
      <div className="container-fluid bg d-lg-none d-md-block d-block">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <Link to='/dashboard'>
                  <img src={ll} height={"50px"} width={"70px"} alt="" srcset="" />

                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
                  <ul className="navbar-nav navul mb-2 mb-lg-0 ml-lg-5 ml-md-0 ml-0 mt-4" style={{ height: "150px", overflowY: "auto" }}>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/dashboard"><i className="fa fa-tachometer" />Dashboard</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/termsandconditions"><i className="fas fa-weight"></i>Terms And Conditions</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/privacy"><i className="fas fa-weight"></i>Manage Privacy Policy</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/aboutapp"><i className="fas fa-weight"></i>About App</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/termLength"><i className="far fa-window-maximize"></i>Term Length</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/rentalagreement"><i className="fab fa-product-hunt"></i>Rental Agreement</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/usagepolicy"><i className="fas fa-warehouse"></i>Usage Policy & Limitations</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/insurance"><i className="fas fa-funnel-dollar"></i>Insurance & Indemnification</Link>
                    </li>
                    {/* <li className="nav-item dropdown mr-2">
                                  <Link style={{color:"black !important"}} to="/distribution"><i className="fa fa-cog" />Distribution</Link>
                                  </li> */}
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/transport"><i className="fas fa-recycle"></i> Transport & Installation Policy</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/maintenance"><i className="fad fa-money-check-edit"></i>Maintenance & Warranties</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/termination"><i className="fas fa-genderless"></i>Termination</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/roles"><i className="fas fa-users"></i>Roles</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/userform"><i className="fas fa-users"></i>Sub admin</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/products"><i className="fas fa-users"></i>Products</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/category"><i className="fas fa-users"></i>Main Category</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/subcategory"><i className="fas fa-users"></i>Sub Category</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/featuredcategory"><i className="fas fa-users"></i>Featured Category</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/orders"><i className="fas fa-users"></i>Orders</Link>
                    </li>
                    <li className="nav-item dropdown mr-2">
                      <Link style={{ color: "black !important" }} to="/vendors"><i className="fas fa-users"></i>Vendors</Link>
                    </li>
                    
                    <li className="nav-item dropdown mr-2">
                      <a onClick={() => signOut()}><i className="fas fa-user"></i>Log Out</a>
                    </li>

                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  dropdownReducer: state.dropdownReducer,
});
const mapDispatchToProps = (dispatch) => ({
  Dropdown: (bool) =>
    dispatch(Dropdown(bool)),
  Dropdown1: (bool) =>
    dispatch(Dropdown1(bool)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);