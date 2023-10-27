import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import './ShowProducts.css'
import Rating from '@mui/material/Rating';
const config = require("../../helpers/config.json")
const ShowProducts = () => {
    const [value, setValue] = useState(2.5)
    const [data, setData] = useState(null);
    const [images, setImages] = useState([])
    const [filterValue, setFilterValue] = useState('')
    const [reviews, setReviews] = useState([])
    const [category, setCategory] = useState([])
    const [vendor, setVendor] = useState([])

    useEffect(() => {
        fetch(`${config['baseUrl']}/getProducts`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status === 200) {
                var temp = []
                temp = res.data
                setData([...temp])
                var temp2 = []
                temp2 = res.images
                setImages([...temp2])
                var temp3 = []
                temp3 = res.reviews
                setReviews([...temp3])
                console.log(temp3)
            }
        }).catch(error => console.log("Error", error))
    }, [])
    useEffect(() => {
        fetch(`${config['baseUrl']}/categoryGet`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status === 200) {
                var temp = []
                temp = res.data
                setCategory([...temp])
            }
        }).catch(error => console.log("Error", error))
    }, [])
    useEffect(() => {
        fetch(`${config['baseUrl']}/getAllVendors`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            return res.json();
        }).then((res) => {
            if (res.status === 200) {
                var temp = []
                temp = res.data
                setVendor([...temp])
            }
        }).catch(error => console.log("Error", error))
    }, [])

    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-6">
                            <h1 className='text-start'>All Products</h1>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                            <div className="input-group">
                                <input type="text" className="form-control text-start" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder="Search products" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {data ?
                            <>
                                <TableContainer component={Paper} className="table table-bordered p-0">
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left">Vendor name</TableCell>
                                                <TableCell align="center">Product image</TableCell>
                                                <TableCell align="center">Product name</TableCell>
                                                <TableCell align="center">Product category</TableCell>
                                                <TableCell align="center">Product price</TableCell>
                                                <TableCell align="center">Product rating</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data && data.length > 0 ? data.filter((data => data.name.toLowerCase().includes(filterValue.toLowerCase()))).map((data) => {
                                                    return (
                                                        <>
                                                            <TableRow

                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align='left' className='vertical-align-middle'>
                                                                    {
                                                                        vendor.length > 0 ? vendor.filter(vendor => vendor.id === data.user_id).map((vendor) => {
                                                                            return (
                                                                                <>
                                                                                    {vendor.full_name}
                                                                                    <br />
                                                                                    {vendor.email}
                                                                                </>
                                                                            )
                                                                        }) : ""
                                                                    }
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    {/* <img src={`${config['baseUrl']}${images.length > 0 ? images.filter(images => images.product_id === data.id)[0].path : ""}`} className='logo-img' alt="sds" /> */}
                                                                    <img src={`${config['baseUrl']}${data.image}`} className='img-fluid img-thumbnail' alt="" width={80} height={80} />
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    {data.name}
                                                                </TableCell>
                                                                <TableCell align="center" className='vertical-align-middle'>
                                                                    {category.filter(category => category.id === data.category_id).map((cat) => { return cat.name })}
                                                                </TableCell>
                                                                <TableCell align="center" className='vertical-align-middle'>
                                                                    ${data.price}
                                                                </TableCell>
                                                                <TableCell align="center" className='vertical-align-middle'>
                                                                    <Rating name="half-rating-read" defaultValue={data.stars / data.length} precision={0.5} readOnly />
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
        </>
    )
}

export default ShowProducts