


import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../viewmessage/showviewmessage.css'
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


const ShowViewMessage = () => {
    // States
    //   const search = useLocation().search;
    //   const id = new URLSearchParams(search).get("id");
    // console.log(search)


    const [feedback, setFeedback] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        fetch(`${config.baseUrl}/getFeedback`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        })
            .then(res => res.json())
            .then(res => {
                setFeedback(res.data)
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!feedback) return <div className="container-fluid bg-white overflow-scroll height-100vh">
    <div className="col-md-12 aera py-5 px-5 my-5"><div>Loading...</div>
    </div>
    </div>;
    return (
        <>
            {/* <div className="container-fluid">
        <div className="row my-5">
          <div className="col-md-10 text-right">
            <NavLink className='btn btn-outline-warning' to='/feedback'>
              Go Back
            </NavLink>
          </div>
          <div className="col-md-2"></div>
        </div>



        <div>
      <h1>Feedback Details</h1>
      {feedback.length > 0 ? feedback.filter((filter)=>(filter.id == id)).map(data =>
       <>
        <p>ID: {data.id}</p>
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Message: {data.comments}</p>
       </>
      ):""}
            
    </div>



      </div > */}



            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row my-5">
                        <div className="col-md-10 text-right">
                            <NavLink className='btn btn-outline-warning' to='/feedback'>
                                Go Back
                            </NavLink>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <h1>Feedback Details</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">


                            <>
                                <div component={Paper} className="table  p-0">
                                    <div sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <>
                                            {feedback.length > 0 ? feedback.filter((filter) => (filter.id == id)).map(data =>
                                                <>
                                                    <div className='set-div-1'>
                                                        <div><h5>Name:</h5><p> {data.name}</p></div>
                                                        <div><h5>Email:</h5><p> {data.email}</p></div>
                                                        <div><h5>Message:</h5><p> {data.comments}</p></div>
                                                    </div>
                                                </>
                                            ) : ""}
                                        </>

                                    </div>
                                </div>

                            </>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default ShowViewMessage