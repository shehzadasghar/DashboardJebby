import React, { useState, useEffect, forwardRef } from 'react'
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
const config = require('../../helpers/config.json')

const ShowAllVendors = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [dataPerPage] = useState(10);


    const [data, setdata] = useState(null);
    useEffect(() => {
        fetch(`${config['baseUrl']}/getAllVendors`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            return res.json()
        }).then(res => {
            var temp = []
            temp = res.data
            setdata([...temp])
        })
    }, [])


    const DeleteVendor = async (id) => {
        await fetch(`${config['baseUrl']}/VendorDelete`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "id": id,
                "role":1
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log("delete")
            window.location.reload(true)
            alert(res.message)
        })
    }


    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = data && data.slice(indexOfFirstData, indexOfLastData);

    const pageNumbers = Math.ceil((data && data.length) / dataPerPage);
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };


    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <h1>Vendors</h1>
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
                                                        <TableCell align="center">Sr No</TableCell>
                                                        <TableCell align="center">Full Name</TableCell>
                                                        <TableCell align="center">Email</TableCell>
                                                        <TableCell align="center">Vendor's Products</TableCell>
                                                        <TableCell align="center">Delete</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {currentData && currentData.length > 0 ? currentData.map((data, index) => (
                                                        <TableRow
                                                            key={data.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                {data.full_name}
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                {data.email}
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                <NavLink to={`/viewvendor?id=${data.id}`} className='btn btn-outline-primary'>
                                                                    View Vendor
                                                                </NavLink>
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                            <Button onClick={(e) => { DeleteVendor(data.id) }}  variant="outlined" color="error">
                                                                    Delete
                                                            </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                   )) : ""}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                        <Pagination
                                        count={pageNumbers}
                                        page={currentPage}
                                        variant="outlined" shape="rounded"
                                        onChange={handleChangePage}
                                        color="primary"
                                        className="mt-3"
                                    />

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
export default ShowAllVendors