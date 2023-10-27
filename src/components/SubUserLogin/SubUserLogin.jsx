import React, { useState, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import "./SubUserLogin.css"
const config = require('../../helpers/config.json');
const SubUserLogin = () => {
    const [load, setload] = useState(false)
    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(false)
    const [errorText, seterrorText] = useState("")
    const Login = async () => {
        await fetch(`${config['baseUrl']}/logInnSubUser`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "email": userName,
                "password": password
            })
        }).then(res => {
            return res.json();
        }).then(async res => {
            if (res.token !== undefined && res.token !== null && res.token !== "") {
                localStorage.setItem("token", res.token)
                localStorage.setItem('roleId', res.user[0].role_id)
                localStorage.setItem('userType', 'user')
                window.location.reload(true)
                console.log("Login!!", res)
                window.location = "/termsandconditions"
            }
            else {
                seterrorText(res.message);
                seterror(true)
            }

        }).catch(error => console.log("error", error))
    }
    return (
        <>

            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-lg-4 col-md-12" />
                    <div className="col-lg-4 col-md-12">

                        <div className="wrapper">
                            <div id="formContent" className='shadow'>
                                <div className="py-4 first d-flex justify-content-center flex-column  align-items-center">
                                    <img src="data:image/png;base64,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" height="40px" width="40px" id="icon" alt="User Icon" className="mt-2" />
                                    <h2 className="ml-2 font-weight-bold">Sub Admin Login</h2>
                                </div>

                                <div style={{ display: "flex !important", justifyContent: "center !important" }}>
                                    {/* <input type="text" onChange={(e) => setdistributorCompany(e.target.value)} id="login" className="fadeIn second  mb-3" name="login" placeholder="Distributor Company" /> */}
                                    <input type="text" onChange={(e) => setuserName(e.target.value)} id="login" className="fadeIn second form-control mb-3" name="login" placeholder="Username" />
                                    <input
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                Login();
                                            }
                                        }}

                                        type="password" onChange={(e) => setpassword(e.target.value)} id="password" className="fadeIn third  form-control" name="login" placeholder="Password" />
                                    {
                                        error === true ? <Stack sx={{ width: '100%', alignItems: "center" }} className="mt-3" spacing={2}>
                                            <Alert variant="filled" severity="error">
                                                {errorText}
                                            </Alert></Stack> : ""
                                    }
                                    <input type="submit" onClick={() => Login()} className="my-4" Value="Login" />
                                </div>

                                {/* <div id="formFooter" className="py-3">
                                    <p>You Dont't have an Account?<Link className='hovver' to="/registration">Register Here</Link></p>
                                    <a className="underlineHover" href="#">Forgot Password?</a>
                                </div> */}
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-12" />
                </div>
                {load == false ? (
                    <></>
                ) : ""}

            </div>

        </>

    )
}

export default SubUserLogin