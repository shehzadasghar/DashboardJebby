import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import '../category/ShowCategory.css'
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

const ShowSecurityDeposit = () => {
    const [Edit, setEdit] = useState(false);
    const handleOpenEdit = () => setEdit(true);
    const handleCloseEdit = () => setEdit(false);
    const [Create, setCreate] = useState(false);
    const handleOpenCreate = () => { setCreate(true) };
    const handleCloseCreate = () => { setCreate(false) };
    const [image, setImage] = useState('');
    const [categoryName, setCategoryName] = useState();
    const [data, setdata] = useState(null)
    const [file, setfile] = useState("");
    const [name, setname] = useState("");
    const [ids, setids] = useState(null);
    const [featured, setfeatured] = useState();
    // Create Category
    const CreateCategory = () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("name", categoryName)
        axios.post(`${config['baseUrl']}/categoryInsert`, formData)
            .then((res => {
                if (res.length > 0) {
                    window.location.reload(true);
                }

            }))
            .catch((error => {
                console.log("error", error)
            }))
    }
    // Delete Category
    const deleteCategory = async (id) => {
        await fetch(`${config['baseUrl']}/categoryDelete`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "id": id
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.message === "delete") {
                window.location.reload(false)
            }
        }).catch(error => {
            console.log("error", error)
        })
    }
    // Get Category
    useEffect(() => {
        fetch(`${config['baseUrl']}/categoryGet`, {
            headers: { "Content-Type": "application/json" }
        }).then((res => {
            return res.json();
        })).then(res => {
            if (res.data && res.data.length > 0) {
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
    // Update Category
    const UpdateCategory = (id) => {

        fetch(`${config['baseUrl']}/categoryGetById/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" },
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data.length > 0) {
                setname(res.data[0].name)
                setfile(res.data[0].image)
                setids(res.data[0].id)
                handleOpenEdit(true)
            }
        })
    }
    const editCategory = async () => {

        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", name)
        formData.append("id", ids)
        axios.post(`${config['baseUrl']}/categoryUpdate`, formData)
            .then((res => {
                window.location.reload(true);

            }))
            .catch((error => {
                console.log("error", error)
            }))
    }
    // Adding Feature Category
    const AddFeature = (id) => {
        fetch(`${config['baseUrl']}/featuredCategoriesInsert`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "category_id": id
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            console.log(res.message)
            window.location.reload(true)

        }).catch(err => console.log("error", err))
    }
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
                        <div className="col-md-6">
                            <h1>Security Deposit</h1>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                            <Button className="text-center" variant="outlined" onClick={handleOpenCreate}>
                                Create Category
                            </Button>
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
                                                    <TableCell align="center">Category</TableCell>
                                                    <TableCell align="center">Delete</TableCell>
                                                    <TableCell align="center">Edit</TableCell>
                                                    <TableCell align="center">Featured</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    data && data.length > 0 ? data.map((data) => {
                                                        return (
                                                            <TableRow
                                                                key={data.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    <img src={`${config['baseUrl']}${data.image}`} alt="" className='img-fluid img-thumbnail' width={50} height={50} />
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    {data.name}
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    <i style={{ cursor: "pointer" }} onClick={(e) => { deleteCategory(data.id) }} className='fa fa-trash m-0 text-danger'></i>
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    <i style={{ cursor: "pointer" }} onClick={() => {
                                                                        UpdateCategory(data.id)
                                                                    }} className='fa fa-edit m-0 text-warning'></i>
                                                                    <Modal
                                                                        open={Edit}
                                                                        onClose={handleCloseEdit}
                                                                    // UpdateCategory
                                                                    >
                                                                        <Box sx={style}
                                                                        >
                                                                            <div className="container-fluid">
                                                                                <div className="row">
                                                                                    <div className="col-md-8"><h3>Edit Category</h3></div>
                                                                                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                                                                                        <span onClick={handleCloseEdit} className='cross cursor'>
                                                                                            <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                                                            </svg>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="row pt-3">
                                                                                    <div className="col-md-12">
                                                                                        <div className="replace-img text-center">
                                                                                            <img src={`${config['baseUrl']}${file}`} alt="" className='img-fluid img-thumbnail' width={150} height={150} />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12 pt-3">
                                                                                        <div className="form-group">
                                                                                            <input onChange={(e) => setfile(e.target.files[0])} className='form-control' type="file" accept="image/*" id="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <input onChange={(e) => setname(e.target.value)} placeholder='Category' defaultValue={name} className='form-control' type="text" id="" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <Button
                                                                                            onClick={() => editCategory()}
                                                                                            className="text-center" variant="outlined" >
                                                                                            Edit Category
                                                                                        </Button>
                                                                                    </div>

                                                                                </div>
                                                                            </div>

                                                                        </Box>
                                                                    </Modal>
                                                                </TableCell>
                                                                <TableCell align='center' className='vertical-align-middle'>
                                                                    {
                                                                        data.status === 0 ?
                                                                            <Button onClick={() => AddFeature(data.id)} variant="contained" color="primary">Add to Featured</Button>
                                                                            :
                                                                            <Button onClick={() => DeleteFeature(data.id)} variant="contained" color="error">Remove from featured</Button>
                                                                    }
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

                            <div className="text-center">

                                <Modal
                                    open={Create}
                                    onClose={handleCloseCreate}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className="row">
                                            <div className="col-md-8"><h3>Create Category</h3></div>
                                            <div className="col-md-4 d-flex align-items-center justify-content-end">
                                                <span onClick={handleCloseCreate} className='cross cursor'>
                                                    <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row pt-4">
                                            <div className="col-md-12">
                                                <div className="role-input form-group">
                                                    <label className='m-0'>Category Name</label>
                                                    <input placeholder='Enter Category Name' type="text" onChange={(e) => setCategoryName(e.target.value)} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="role-input form-group">
                                                    <input type="file" accept='image/*' onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outlined" onClick={() => CreateCategory()}>Add Category</Button>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowSecurityDeposit