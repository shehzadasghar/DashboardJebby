import React, { useState, useEffect, useRef } from 'react';
import "./ShowAllRoles.css"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import 'rsuite/dist/rsuite.min.css'
const config = require('../../helpers/config.json');

const ShowAllRoles = () => {


    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        console.log(open, "Open")
    }
    const handleClose = () => { setOpen(false) };
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [roleName, setRoleName] = useState('');
    const [roleId, setroleId] = useState(null)
    const [categorymanage, setCategoryManage] = useState('')
    const [trafficmanage, setTrafficManage] = useState('')
    const [accountmanage, setAccountManage] = useState('')
    const LocalUserType = localStorage.getItem("userType")
    const LocalRoleId = localStorage.getItem("roleId");
    const [count, setCount] = useState(0)

    const handleOpen2 = (id) => {
        fetch(`${config['baseUrl']}/getRolesById/${id}`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },

        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data && res.data.length > 0) {
                setRoleName(res.data[0].name)
                setChecked(res.data[0].category_manage == 1 ? true : false)
                setChecked2(res.data[0].traffic_manage == 1 ? true : false)
                setChecked3(res.data[0].account_manage == 1 ? true : false)
            }
            console.log(res.data)
        })
        setOpen2(true)
    };
    const handleClose2 = () => {
        setRoleName('')
        setChecked(false)
        setChecked2(false)
        setChecked3(false)
        setOpen2(false)
    };
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

    // console.log(LocalUserType,LocalRoleId,categorymanage,trafficmanage)
    const handleChange = (event) => {
        setChecked(event.target.checked);
        // console.log(checked)
    };
    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
        // console.log(checked2)
    };
    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
        // console.log(checked3)
    };

    //GET ROLE BY ID
    useEffect(() => {
        fetch(`${config['baseUrl']}/getRolesById/${LocalRoleId}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(res => {
            return res.json();
        }).then((res) => {
            setCategoryManage(res.data[0].category_manage)
            setTrafficManage(res.data[0].traffic_manage)
            setAccountManage(res.data[0].account_manage)
        }
        ).catch(error => console.log("error", error))
    }, [])

    const CreateRole = async () => {
        if (roleName == '') {
            alert("enter role name....")
        }
        else {
            await fetch(`${config['baseUrl']}/roleInsert`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    "name": roleName,
                    "category_manage": checked == false ? 0 : 1,
                    "traffic_manage": checked2 == false ? 0 : 1,
                    "account_manage": checked3 == false ? 0 : 1,
                })
            }).then(result => {
                return result.json();
            }).then(res => {
                if (res.message === 'role has been created') {
                    // console.log("role created")
                    window.location.reload(false)
                }
                else {
                    console.log(res.message)
                }
            })
        }
    }

    const UpdateRole = async () => {

        if (roleName == '') {
            alert("enter role name....")
        }
        else {
            await fetch(`${config['baseUrl']}/roleUpdate`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    "name": roleName,
                    "category_manage": checked == false ? 0 : 1,
                    "traffic_manage": checked2 == false ? 0 : 1,
                    "account_manage": checked3 == false ? 0 : 1,
                    "id": roleId
                })
            }).then(result => {
                return result.json();
            }).then(res => {
                if (res.status == 200) {
                    // console.log("role created")
                    window.location.reload(false)
                }
                else {
                    console.log(res.message)
                }
            })
        }
    }
    const [data, setdata] = useState(null);
    useEffect(() => {

        fetch(`${config['baseUrl']}/getRoles`, {
            method: "GET",
            headers: { 'content-type': 'application/json' },

        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data && res.data.length > 0) {
                var temp = []
                temp = res.data
                setdata([...temp])
            }
            // console.log(res.data)
        })

    }, [])
    const deleterole = async (id) => {
        await fetch(`${config['baseUrl']}/roleDelete`, {
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
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="container-fluid aera py-5 px-5 my-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row pb-3">
                                <div className="col-md-6">
                                    <h1>Roles</h1>
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-end">
                                    <Button variant="outlined" onClick={() => handleOpen()}>Create New Role</Button>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <div className="container-fluid">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        <h3>Create Role</h3>
                                                    </div>
                                                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                                                        <span onClick={handleClose} className='cross cursor'>
                                                            <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row pt-4">
                                                    <div className="col-md-12">
                                                        <div className="role-input">
                                                            <label className='m-0'>Enter Role Name</label>
                                                            <input placeholder='Enter Role Name' type="text" onChange={(e) => setRoleName(e.target.value)} className="form-control" />
                                                            <FormGroup className='pt-4'>
                                                                <FormControlLabel control={<Checkbox
                                                                    // checked={!checked}
                                                                    onChange={(e) => handleChange(e)}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />} label="Category Manage" />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <FormControlLabel control={<Checkbox
                                                                    onChange={handleChange2}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />} label="Traffic Manage" />
                                                            </FormGroup>
                                                            <FormGroup className='pb-4'>
                                                                <FormControlLabel control={<Checkbox
                                                                    onChange={handleChange3}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />} label="Account Manage" />
                                                            </FormGroup>
                                                            {
                                                                checked === true || checked2 === true || checked3 === true ?
                                                                    <Button variant="outlined" onClick={() => CreateRole()}>Add Role</Button> : <Button variant="outlined" disabled>
                                                                        Add Role
                                                                    </Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </Modal>
                                </div>
                            </div>
                            {
                                data ?
                                    <>
                                        {/* {
                                    categorymanage===1? */}
                                        <TableContainer component={Paper} className="table table-bordered">
                                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Role Name</TableCell>
                                                        <TableCell align="center">Permissions</TableCell>

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
                                                            <TableCell component="th" scope="row">
                                                                {data.name}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                {data.category_manage === 1 ? "  Category Manage " : ""}
                                                                {data.category_manage === 1 && (data.traffic_manage === 1 || data.account_manage === 1) ? "," : ""}
                                                                {data.traffic_manage === 1 ? "  Traffic Manage " || "  " : ""}
                                                                {data.traffic_manage === 1 && data.account_manage === 1 ? "," : " "}
                                                                {data.account_manage === 1 ? "  Account Manage " : ""}
                                                            </TableCell>


                                                            <TableCell align="center"><i style={{ cursor: "pointer" }} className='fa fa-trash m-0 text-danger' onClick={(e) => deleterole(data.id)}></i></TableCell>


                                                            {/* EDIT */}
                                                            <TableCell align="center">
                                                                <i style={{ cursor: "pointer" }} onClick={(e) => {
                                                                    handleOpen2(data.id)
                                                                    setroleId(data.id)
                                                                }} className='fa fa-edit m-0 text-warning'></i>
                                                                <Modal
                                                                    open={open2}
                                                                    onClose={handleClose2}
                                                                    aria-labelledby="modal-modal-title"
                                                                    aria-describedby="modal-modal-description"
                                                                >
                                                                    <Box sx={style}>
                                                                        <div className="container">
                                                                            <div className="row">
                                                                                <div className="col-md-8">
                                                                                    <h3>Edit Role</h3>
                                                                                </div>
                                                                                <div className="col-md-4 d-flex align-items-center justify-content-end">
                                                                                    <span onClick={handleClose2} className='cross cursor'>
                                                                                        <svg width={40} height={40} fill="CurrentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M7.496 7.495a.6.6 0 0 1 .85 0l3.174 3.176 3.176-3.176a.6.6 0 0 1 .85.85l-3.177 3.174 3.176 3.176a.603.603 0 0 1 0 .85.6.6 0 0 1-.85 0l-3.175-3.177-3.175 3.176a.6.6 0 1 1-.85-.85l3.177-3.175-3.176-3.175a.6.6 0 0 1 0-.85Z" />
                                                                                        </svg>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row pt-4">
                                                                                <div className="col-md-12">
                                                                                    <div className="role-input">
                                                                                        <label >Enter Role Name</label>
                                                                                        <input defaultValue={roleName} type="text" onChange={(e) => setRoleName(e.target.value)} className="form-control" />
                                                                                        <FormGroup className='pt-4'>
                                                                                            <FormControlLabel control={<Checkbox
                                                                                                checked={checked}
                                                                                                onChange={(e) => handleChange(e)}
                                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                            />} label="Category Manage" />
                                                                                        </FormGroup>
                                                                                        <FormGroup>
                                                                                            <FormControlLabel control={<Checkbox
                                                                                                onChange={handleChange2}
                                                                                                checked={checked2}
                                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                            />} label="Traffic Manage" />
                                                                                        </FormGroup>
                                                                                        <FormGroup className='pb-4'>
                                                                                            <FormControlLabel control={<Checkbox
                                                                                                onChange={handleChange3}
                                                                                                checked={checked3}
                                                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                                            />} label="Account Manage" />
                                                                                        </FormGroup>
                                                                                        {
                                                                                            checked === true || checked2 === true || checked3 === true ?
                                                                                                <Button variant="outlined" onClick={() => UpdateRole()}>Add Role</Button> : <Button variant="outlined" disabled>
                                                                                                    Edit Role
                                                                                                </Button>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
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
                                        {/* :""
                                } */}


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

export default ShowAllRoles