import React, { useState, useEffect, forwardRef } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './ShowOrders.css'
const config = require("../../helpers/config.json")
const ShowOrders = () => {
    const [order, setOrder] = useState(null)
    const [productData, setProductData] = useState([])
    const [vendor, setVendor] = useState([])
    const [category, setcategory] = useState([])
    useEffect(() => {
        fetch(`${config['baseUrl']}/getAllOrders`, {
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data.length > 0) {
                let temp = []
                temp = res.data
                setOrder([...temp])
                console.log(order, "orders")
            }
        })
    }, [])
    useEffect(() => {
        fetch(`${config['baseUrl']}/getProducts`, {
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data.length > 0) {
                let temp = []
                temp = res.data
                setProductData([...temp])
                console.log(productData, "productdata")
            }
        })
    }, [])
    useEffect(() => {
        fetch(`${config['baseUrl']}/categoryGet`, {
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.status === 200) {
                let temp = []
                temp = res.data
                setcategory([...temp])
                console.log("category", temp)
            }
        })
    }, [])
    useEffect(() => {
        fetch(`${config['baseUrl']}/getAllVendors`, {
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.status === 200) {
                let temp = []
                temp = res.data
                setVendor([...temp])
                console.log("Vendor", temp)
            }
        })
    }, [])
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <h1>Orders</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 ">
                            {order ?
                                <>
                                    <TableContainer component={Paper} className="table table-bordered p-0">
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Product Details</TableCell>
                                                    <TableCell align="center">Vendor Name</TableCell>
                                                    <TableCell align="center">Product Category</TableCell>
                                                    <TableCell align="center">Username & Email</TableCell>
                                                    <TableCell align="center">Duration</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    order && order.length > 0 ? order.map((item) => {
                                                       
                                                        return (
                                                            <>
                                                                <TableRow
                                                                    key={item.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell align='center' className='vertical-align-middle'>
                                                                        <>
                                                                            {<img src={`${config['baseUrl']}${productData.length > 0 ? productData.filter(data => data.id == item.product_id)[0]?.image : ""}`} className='img-fluid img-thumbnail' alt="Product image" width={80} height={80} />}
                                                                            <br />
                                                                        </>
                                                                        <>{productData.length > 0 ? productData.filter(data => data.id == item.product_id)[0]?.name : ""} <br /></>
                                                                    </TableCell>

                                                                    <TableCell align='center' className='vertical-align-middle'>
                                                                        <>
                                                                            {
                                                                                vendor.length > 0 ? vendor.filter(vendor => vendor.id === item.user_id).map((vendor) => {
                                                                                    return (
                                                                                        <>
                                                                                            {vendor.full_name}
                                                                                            <br />
                                                                                            {vendor.email}
                                                                                        </>
                                                                                    )
                                                                                }) : ""
                                                                            }
                                                                        </>
                                                                    </TableCell>
                                                                    <TableCell align='center' className='vertical-align-middle'>
                                                                        {
                                                                            category.length > 0 ? category.filter(category => category.id === item.cateory_id).map((category) => {
                                                                                return (
                                                                                    <>
                                                                                        {category.name}
                                                                                    </>
                                                                                )
                                                                            }) : ""
                                                                        }
                                                                    </TableCell>
                                                                    <TableCell align="center" className='vertical-align-middle'>
                                                                        {item.name}
                                                                        <br />
                                                                        {item.email}
                                                                    </TableCell>
                                                                    <TableCell align="center" className='vertical-align-middle'>
                                                                        <b>From</b>  ( {item.rent_start})
                                                                        <br />
                                                                        <b>To</b>  ({item.original_return})
                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        )
                                                    }) : ""
                                                }
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

export default ShowOrders