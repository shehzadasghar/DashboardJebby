import React, { useState, useEffect, forwardRef } from 'react'
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
const config = require('../../helpers/config.json')

const ShowAllFeedBack = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`${config.baseUrl}/getFeedback`, {
          method: "GET",
          headers: { 'content-type': 'application/json' },
        })
          .then(res => res.json())
          .then(res => {
            setData(res.data)
          })
          .catch(err => console.log(err));
      }, []);
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <h1>FeedBack Forms</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                data ?
                                    <>
                                        <TableContainer component={Paper} className="table table-bordered p-0">
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="start">Id</TableCell>
                                                        <TableCell align="start">Full Name</TableCell>
                                                        <TableCell align="start">Email</TableCell>
                                                        <TableCell align="start">Message</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
        {data && data.length > 0 ? data.map((feedback) => (
          <TableRow key={feedback.id}>
            <TableCell>{feedback.id}</TableCell>
            <TableCell>{feedback.name}</TableCell>
            <TableCell>{feedback.email}</TableCell>
            <TableCell>
              <NavLink to={`/viewmessage/${feedback.id}`} className='btn btn-outline-primary'>
                View Message
              </NavLink>
            </TableCell>
          </TableRow>
        )) : null}
      </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </> : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress />
                                    </Box>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ShowAllFeedBack