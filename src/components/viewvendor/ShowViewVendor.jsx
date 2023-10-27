


import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
// Import Swiper React components
const config = require("../../helpers/config.json")
// Slider


const ShowViewVendor = () => {
  // States
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  // console.log(search)
  const [data, setdata] = useState({});
  useEffect(() => {
    fetch(`${config['baseUrl']}/getAllProductByVendorId/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      let temp = []
      temp = res
      setdata({ ...temp })
      // console.log("data", data.data[0].id)
    })
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="row my-5">
          <div className="col-md-10 text-right">
            <NavLink className='btn btn-outline-warning' to='/vendors'>
              Go Back
            </NavLink>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          {
            (data.data) && (data.data).length > 0 ? (data.data).map((item) => {
              return (
                <div className="col-md-4" >
                  <div className="card">
                    {
                      (data.images) && (data.images).length > 0 ? (data.images).filter(data => data.product_id === item.id).map((item) => {
                        return (
                          <>
                            <img src={`${config['baseUrl']}${item.path}`} alt="sds" className='img-fluid card-img-top'/>
                          </>
                        )
                      }) : "No Data!!"
                    }
                    <div className="card-body">
                      <h3 className="card-title">
                        {item.name}
                      </h3>
                      <span>
                        {item.price}
                      </span>
                      <p className="card-text">
                        {item.specifications}
                      </p>
                      {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                </div>
              )
            }) : ""
          }
        </div>
      </div >
    </>
  )
}

export default ShowViewVendor