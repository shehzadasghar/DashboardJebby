import React, { useState, useRef, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import './FeaturedCategory.css'
const config = require("../../helpers/config.json")
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const FeaturedCategory = () => {
    const [data, setdata] = useState(null)
    useEffect(() => {
        fetch(`${config['baseUrl']}/categoryGet`, {
            headers: { "Content-Type": "application/json" }
        }).then((res => {
            return res.json();
        })).then(res => {
            if (res.data && res.data.length > 0) {
                console.log(res.data)
                let temp = []
                temp = res.data
                setdata([...temp])
                console.log(res.data, "status")
            }
            else {
                console.log("res", res)
            }

        })
    }, []);
    // Delete Featured Category
    const DeleteFeature = (id) => {
        fetch(`${config['baseUrl']}/featuredCategoriesDelete`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "id": id
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res.message)
            window.location.reload(true)

        }).catch(err => console.log("error", err))
    }
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <h1>Featured Categories</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {data ?
                                <>
                                    <TableContainer component={Paper} className="table table-bordered p-0">
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center">Image</TableCell>
                                                    <TableCell align="center">Featured Category Name</TableCell>
                                                    <TableCell align="center">Remove Featured Catergory</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    data && data.length > 0 ? data.filter(data => data.status == 1).map((data) => {
                                                        return (
                                                            <TableRow
                                                                key={data.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align='center'>
                                                                    <img src={`${config['baseUrl']}${data.image}`} alt="" className='img-fluid img-thumbnail' width={50} height={50}/>
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    {data.name}
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    <Button onClick={() => DeleteFeature(data.id)} variant="contained" color="error">Remove from featured</Button>
                                                                </TableCell>


                                                            </TableRow>
                                                        )
                                                    })
                                                        : ""
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

export default FeaturedCategory