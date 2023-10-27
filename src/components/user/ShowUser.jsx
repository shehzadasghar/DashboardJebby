import React, { useState, useEffect, forwardRef } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import './ShowUser.css'
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
const ShowUser = () => {
    const [open3, setOpen3] = useState(false);

    const handleClick3 = () => {
        setOpen3(true);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen3(false);
    };


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setopen2] = useState(false);
    const handleOpen2 = () => { setopen2(true); console.log("Open...") }
    const handleClose2 = () => { setopen2(false); console.log("Closing...") }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setroles] = useState([])
    const [data, setdata] = useState(null);
    const [GetData, setGetData] = useState([]);
    const [GetDataId, setGetDataId] = useState("");
    // console.log(data)
    const Getdata = async (id) => {
        console.log(id)
        await fetch(`${config['baseUrl']}/subUserGetById/${id}`, {
            headers: { "content-type": "application/json" },
        }).then(res => {
            return res.json()
        }).then(res => {
            var temp = res.data
            if (temp.length > 0) {
                setGetData([...temp])
                setName(temp[0].name)
                setEmail(temp[0].email)
                setRoleId(temp[0].role_id)
                handleOpen2(id)
            }
        })

    }

    useEffect(() => {
        fetch(`${config['baseUrl']}/getRoles`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },
        }).then(res => {
            return res.json()
        }).then(res => {
            var temp = []
            temp = res.data
            setroles([...temp])

        })
    }, [])
    const DeleteUser = async (id) => {
        await fetch(`${config['baseUrl']}/subUserDelete`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "id": id
            })
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
    const CreateUser = async () => {
        if (name == '') {
            alert("enter name")
        }
        else if (email == '') {
            alert("enter email")
        }
        else if (password == '') {
            alert("enter password")
        }
        else if (roleId == '') {
            alert("enter role")
        }
        else {
            await fetch(`${config['baseUrl']}/subUserCreate`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": password,
                    "role_id": roleId
                })
            }).then(result => {
                return result.json();
            }).then(res => {
                if (res.status == 200) {
                    console.log("User Created created", res)
                    window.location.reload(false)
                }
                else {
                    console.log(res.message)
                }
            })
        }
    }

    useEffect(() => {

        fetch(`${config['baseUrl']}/subUserGet`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },

        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data && res.data.length > 0) {
                var temp = []
                temp = res.data
                setdata([...temp])
                // console.log(data)
            }
            // console.log(res.data)
        })
    }, [])
    const [ids, setids] = useState(null)
    const [roleIds, setRoleIds] = useState(null)
    const [updatearray, setupdatearray] = useState([])

    const UpdateUser = async () => {
        if (name == '') {
            alert("Enter name")
        }
        if (email == '') {
            alert("Enter email")
        }
        if (roleId == null) {
            alert("Enter role")
        }
        else if (password == '') {
            alert("Enter password")
        }
        else {
            await fetch(`${config['baseUrl']}/subUserUpdate`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    "name": name == "" ? updatearray[0].name : name,
                    "email": email == "" ? updatearray[0].email : email,
                    "password": password,
                    "role_id": roleIds == null ? roleId : roleIds,
                    "id": ids
                })
            }).then(result => {
                return result.json();
            }).then(res => {
                if (res.status == 200) {
                    console.log("role updated")
                    window.location.reload(false)
                }
                else {
                    console.log(res.message)
                }
            })
        }
    }
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-6">
                            <h1>Sub Admin</h1>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-end">
                            <Button variant="outlined" className='my-3' onClick={handleOpen}>Create Sub Admin</Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                data ?
                                    <>
                                        <TableContainer component={Paper} className="table table-bordered">
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">Name</TableCell>
                                                        <TableCell align="center">Email</TableCell>
                                                        {/* <TableCell align="right">Role Name</TableCell> */}
                                                        <TableCell align="center">Delete</TableCell>
                                                        <TableCell align="center">Edit</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data && data.length > 0 ? data.map((data) => (
                                                        <TableRow
                                                            key={data.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell align='left' className='vertical-align-middle'>
                                                                {data.name}
                                                            </TableCell>
                                                            <TableCell align="center" className='vertical-align-middle'>{data.email}</TableCell>
                                                            {/* FOR ID TO NAME CONVERSION */}
                                                            {/* <TableCell align="right">{
                                                                        roles && roles.length > 0 ? roles.filter(dataa => dataa.id == data.role_id).map(data => (

                                                                            <option >{data.name}</option>
                                                                        )) : ""
                                                                    }</TableCell> */}

                                                            {/* ENDS HERE */}
                                                            <TableCell align="center"><i style={{ cursor: "pointer" }} className='fa fa-trash m-0 text-danger' onClick={(e) => DeleteUser(data.id)}></i></TableCell>
                                                            <TableCell align="center">
                                                                <i style={{ cursor: "pointer" }} onClick={(id) => {
                                                                    setids(data.id)
                                                                    Getdata(data.id)

                                                                }} className='fa fa-edit m-0 text-warning'></i>
                                                                <Modal
                                                                    // Edit Modal
                                                                    open={open2}
                                                                    onClose={handleClose2}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div className="row">
                                                                            <div className="col-md-10">
                                                                                <h3>Edit Sub Admin</h3>
                                                                            </div>
                                                                            <div className="col-md-2 d-flex align-items-center justify-content-end">
                                                                                <span onClick={handleClose2} className='cross cursor'>
                                                                                    <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                                                    </svg>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row pt-4">
                                                                            <div className="col-md-12">
                                                                                <div className="role-input form-group">
                                                                                    <label className='m-0'>Enter Name</label>
                                                                                    <input defaultValue={name} type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="role-input form-group">
                                                                                    <label className='m-0'>Enter Email ID</label>
                                                                                    <input defaultValue={email} type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="role-input form-group">
                                                                                    <label className='m-0'>Enter Password</label>
                                                                                    <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="role-input form-group">
                                                                                    <label className='m-0'>Enter Role</label>
                                                                                    <select onChange={(e) => {
                                                                                        setRoleIds(null)
                                                                                        setRoleId(e.target.value)
                                                                                    }} name="" id="" className='form-control'>
                                                                                        {
                                                                                            roles && roles.length > 0 ? roles.filter(data => data.id === roleId).map(data => (
                                                                                                <option value={data.id}>{data.name}</option>
                                                                                            )) : <option value="">Select</option>
                                                                                        }
                                                                                        {
                                                                                            roles && roles.length > 0 ? roles.map(data => (
                                                                                                data.id === roleIds ? "" :
                                                                                                    <option value={data.id}>{data.name}</option>
                                                                                            )) : ""
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <Button
                                                                            onClick={() => {
                                                                                UpdateUser()
                                                                                handleClick3()
                                                                            }

                                                                            }
                                                                            variant="outlined" >
                                                                            Update Sub Admin
                                                                        </Button>
                                                                    </Box>
                                                                </Modal>

                                                            </TableCell>
                                                        </TableRow>
                                                    ))
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

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="row">
                                <div className="col-md-10">
                                    <h3>Create Sub Admin</h3>
                                </div>
                                <div className="col-md-2">
                                    <span onClick={handleClose} className='cross cursor'>
                                        <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="row pt-4">
                                <div className="col-md-12">
                                    <div className="role-input form-group">
                                        <label className='m-0'>Enter Username</label>
                                        <input placeholder='Enter Username' name='from_name' type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="role-input form-group">
                                        <label className='m-0'>Enter Email</label>
                                        <input placeholder='Enter Email' name='user_email' type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="role-input form-group">
                                        <label className='m-0'>Enter Password</label>
                                        <input placeholder='Enter Password' name='password' type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="role-input form-group">
                                        <label className='m-0'>Select Role</label>
                                        <select onChange={(e) => setRoleId(e.target.value)} name="" id="" className='form-control'>
                                            <option value="">Select</option>
                                            {
                                                roles && roles.length > 0 ? roles.map(data => (
                                                    <option value={data.id}>{data.name}</option>
                                                )) : ""
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outlined" onClick={() => { CreateUser() }}>Add User</Button>
                        </Box>
                    </Modal>

                </div>
            </div>
        </>
    )
}

export default ShowUser