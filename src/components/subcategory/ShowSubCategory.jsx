import React, { useState, useEffect } from 'react'
import Axios from 'axios'
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
import './ShowSubCategory.css'
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
const ShowSubCategory = () => {
    // States
    const [Create, setCreate] = useState(false);
    const handleOpenCreate = () => { setCreate(true) };
    const handleCloseCreate = () => { setCreate(false) };
    const [Edit, setEdit] = useState(false);
    const handleOpenEdit = () => { setEdit(true) };
    const handleCloseEdit = () => { setEdit(false) };
    const [subCategoryImage, setsubCategoryImage] = useState('');
    const [subCategoryName, setsubCategoryName] = useState('');
    const [data, setdata] = useState(null);
    const [ids, setids] = useState(null)
    const [name, setname] = useState([]);
    const [CatId, setCatId] = useState('');
    const [Cats, setCats] = useState([])
    const [file, setfile] = useState("")
    const [editSelect, seteiditSelect] = useState(null);
    const [subId, setsubId] = useState([])

    // Create Sub Category
    const CreateSubCategory = () => {
        const formData = new FormData();
        formData.append("file", subCategoryImage)
        formData.append("name", subCategoryName)
        formData.append("category_id", CatId)
        Axios.post(`${config['baseUrl']}/subCategoryInsert`, formData)
            .then(res => {
                window.location.reload(true);
                console.log("res", res)
            }).catch(error => {
                console.log("error", error)
            })
    }
    // Get Sub Category
    useEffect(() => {
        fetch(`${config['baseUrl']}/subCategoryGet`, {
            method: "GET",
            headers: { "content-type": "application" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data && res.data.length > 0) {
                let temp = []
                temp = res.data
                setdata([...temp])
            }
            else {
                console.log("No data")
            }

        })

    }, []);
    useEffect(() => {
        fetch(`${config['baseUrl']}/categoryGet`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            return res.json()
        }).then(res => {
            var temp = []
            temp = res.data
            setCats([...temp])
        })
    }, [])
    // Delete Category
    const DeleteSubCategory = async (id) => {
        await fetch(`${config['baseUrl']}/subCategoryDelete`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "id": id
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log("delete")
            window.location.reload(true)
        })
    }
    // Edit Category

    const GetSubCategoryEdit = (id) => {
        fetch(`${config['baseUrl']}/subCategoryGetById/${id}`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.status === 200) {
                setname(res.data[0].name)
                setfile(res.data[0].image)
                seteiditSelect(res.data[0].id)
                handleOpenEdit(id)
            }
            else {
            }
        })

    }
    const EditCategory = () => {
        const formData = new FormData();
        formData.append("file", file)
        formData.append("name", name)
        formData.append("id", editSelect)
        Axios.post(`${config['baseUrl']}/subCategoryUpdate`, formData)
            .then(res => {
                window.location.reload(true)
            })
            .catch(error => console.log(error))
    }
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-6">
                            <h1>Sub Categories</h1>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                            <Button className="text-center" variant="outlined" onClick={() => { handleOpenCreate() }}>
                                Create Sub Category
                            </Button>
                        </div>
                    </div>
                    {
                        data ?
                            <>
                                <TableContainer component={Paper} className="table table-bordered p-0">
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Image</TableCell>
                                                <TableCell align="center">Sub Category</TableCell>
                                                <TableCell align="center"> Category</TableCell>
                                                <TableCell align="center">Delete</TableCell>
                                                <TableCell align="center">Edit</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data && data.length > 0 ? data.map((data) => {
                                                    return (
                                                        <TableRow
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                <img src={`${config['baseUrl']}${data.image}`} alt="" className="img-fluid img-thumbnail" width={50} height={50} />
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                {data.name}
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                {data.name}
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                <i onClick={(e) => { DeleteSubCategory(data.id) }} style={{ cursor: "pointer" }} className='fa fa-trash m-0 text-danger'></i>
                                                            </TableCell>
                                                            <TableCell align='center' className='vertical-align-middle'>
                                                                <i onClick={() => {
                                                                    GetSubCategoryEdit(data.id)
                                                                    handleOpenEdit()
                                                                }} style={{ cursor: "pointer" }} className='fa fa-edit m-0 text-warning'></i>
                                                                <Modal
                                                                    open={Edit}
                                                                    onClose={handleCloseEdit}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-md-10">
                                                                                    <h3>Edit Sub Category</h3>
                                                                                </div>
                                                                                <div className="col-md-2 d-flex align-items-center justify-content-end">
                                                                                    <span onClick={handleCloseEdit} className='cross cursor'>
                                                                                        <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row pt-3">
                                                                                <div className="col-md-12 text-center">
                                                                                    <div className="form-group">
                                                                                        <img src={`${config['baseUrl']}${file}`} className="img-fluid img-thumbnail" alt="" width={150} height={150} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <div className="role-input form-group">
                                                                                        <input onChange={(e) => setfile(e.target.files[0])} type="file" accept='image/*' className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <div className="role-input form-group">
                                                                                        <label className='m-0'>Enter Sub Category Name</label>
                                                                                        <input
                                                                                            value={name}
                                                                                            onChange={(e) => setname(e.target.value)}
                                                                                            placeholder='Enter Category Name' type="text" className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <div className="role-input form-group">
                                                                                        <label className='m-0'>Select Parent Category</label>
                                                                                        <select onChange={(e) => { setsubId(e.target.value) }} name="" id="" className='form-control'>
                                                                                            {
                                                                                                Cats && Cats.length > 0 ? Cats.filter(data => data.id === setsubId).map(data => (
                                                                                                    <option value={data.id}>{data.name}</option>
                                                                                                )) : <option value="">Select</option>
                                                                                            }
                                                                                            {
                                                                                                Cats && Cats.length > 0 ? Cats.map(data => (
                                                                                                    data.id === setCats ? "" :
                                                                                                        <option value={data.id}>{data.name}</option>
                                                                                                )) : ""
                                                                                            }
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-12">
                                                                                    <Button variant="outlined" onClick={() => EditCategory()}>Update Sub Category</Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Box>
                                                                </Modal>
                                                            </TableCell>
                                                        </TableRow>
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

                    <div className="text-center">

                        <Modal
                            open={Create}
                            onClose={handleCloseCreate}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="row">
                                    <div className="col-md-10">
                                        <h3>Add Sub Category</h3>
                                    </div>
                                    <div className="col-md-2 d-flex align-items-center justify-content-end">
                                        <span onClick={handleCloseCreate} className='cross cursor'>
                                            <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    <div className="col-md-12">
                                        <div className="role-input form-group">
                                            <input
                                                onChange={(e) => setsubCategoryImage(e.target.files[0])}
                                                type="file" accept='image/*' className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="role-input form-group">
                                            <label className='m-0'>Enter Category Name</label>
                                            <input
                                                onChange={(e) => setsubCategoryName(e.target.value)}
                                                placeholder='Enter Category Name' type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="role-input form-group">
                                            <label className='m-0'>Select Parent Category</label>
                                            <select onChange={(e) => { setCatId(null); setCatId(e.target.value) }} name="" id="" className='form-control'>
                                                {
                                                    Cats && Cats.length > 0 ? Cats.filter(data => data.id === CatId).map(data => (
                                                        <option value={data.id}>{data.name}</option>
                                                    )) : <option value="">Select</option>
                                                }
                                                {
                                                    Cats && Cats.length > 0 ? Cats.map(data => (
                                                        data.id === setCats ? "" :
                                                            <option value={data.id}>{data.name}</option>
                                                    )) : ""
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <Button variant="outlined" onClick={() => CreateSubCategory()}>Add Sub Category</Button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ShowSubCategory