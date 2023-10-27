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
import '../products/ShowProducts.css'
import Rating from '@mui/material/Rating';
import Orders from '../../pages/Orders';
const config = require("../../helpers/config.json")
const ShowReturnProduct = () => {
    const [value, setValue] = useState(2.5)
    const [data, setData] = useState(null);
    const [images, setImages] = useState([])
    const [filterValue, setFilterValue] = useState('')
    const [reviews, setReviews] = useState([])
    const [category, setCategory] = useState([])
    const [vendor, setVendor] = useState([])
    const [order, setOrder] = useState(null)
    const [productData, setProductData] = useState([])







    
  






    // useEffect(() => {
    //     fetch(`${config['baseUrl']}/getAllOrders`, {
    //         method: 'GET',
    //         headers: { "Content-Type": "application/json" },
    //     }).then((res) => {
    //         return res.json();
    //     }).then((res) => {
    //         if (res.status === 200) {
    //             var temp = []
    //             temp = res.data
    //             setData([...temp])
    //             var temp2 = []
    //             temp2 = res.images
    //             setImages([...temp2])
    //             var temp3 = []
    //             temp3 = res.reviews
    //             setReviews([...temp3])
    //             console.log(temp3)
    //         }
    //     }).catch(error => console.log("Error", error))
    // }, [])



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
                console.log(temp)
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
            }
        })
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
        })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setVendor([...res.data]);
            console.log("data", res.data)
          }
        })
        .catch(error => console.log("Error", error));
      }, []);




      const postrole = async (item) => {

        const payload = {
          payment_id: item.deposit_payment_id,
          amount: item.sucurity_deposit
        };

        await fetch(`${config['baseUrl']}/PyaByStripeChargeBackSecurityDeposit`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(result => {
            return result.json();
        }).then(res => {
            if (res.status == 200) {
                window.location.reload(false)
            }
            else {
                console.log(res.message)
            }
        })
    }




    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-6">
                            <h1 className='text-start'>Return Product</h1>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                            <div className="input-group">
                                <input type="text" className="form-control text-start" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} placeholder="Search products" />
                            </div>
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
                                                    <TableCell align="center">Payback Security Deposit</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
      {order && order.length > 0 ? (
        order.map((item) => {
          if (item.retrurn == 2) {
            return (
              <TableRow key={item.id}>
                <TableCell align='center' className='vertical-align-middle'>
                  <img src={`${config['baseUrl']}${productData.length > 0 ? productData.filter(data => data.id === item.product_id)[0]?.image : ""}`} className='img-fluid img-thumbnail' alt="Product image" width={80} height={80} />
                  <br />
                  {productData.length > 0 ? productData.filter(data => data.id === item.product_id)[0]?.name : ""}
                  <br />
                </TableCell>


                <TableCell align='left' className='vertical-align-middle'>
                  {vendor.length > 0 ? vendor.filter(vendor => vendor.id === (item.vendor_id || null)).map((vendor) => (
                    <React.Fragment key={vendor.id}>
                      {vendor.full_name}
                      <br />
                      {vendor.email}
                    </React.Fragment>
                  )) : "No vendor data available"}
                </TableCell>


                <TableCell align='center' className='vertical-align-middle'>
                  {category.length > 0 ? category.filter(category => category.id === item.cateory_id).map((category) => (
                    <React.Fragment key={category.id}>
                      {category.name}
                    </React.Fragment>
                  )) : ""}
                </TableCell>
                <TableCell align="center" className='vertical-align-middle'>
                  {item.name}
                  <br />
                  {item.email}
                </TableCell>
                <TableCell align="center" className='vertical-align-middle'>
                  <b>From</b> ({item.rent_start})
                  <br />
                  <b>To</b> ({item.original_return})
                </TableCell>
                <TableCell>
                <button onClick={(e) => postrole(item)} className='btn btn-primary'>
        Payback Security Deposit
      </button>               </TableCell>
              </TableRow>
            );
          } else {
            // Return null for rows that don't match the condition
            return null;
          }
        })
      ) : (
        <TableRow>
          <TableCell colSpan={5}>No data available</TableCell>
        </TableRow>
      )}
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

export default ShowReturnProduct