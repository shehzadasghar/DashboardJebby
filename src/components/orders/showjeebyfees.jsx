import React, { useState, useEffect, forwardRef } from 'react'
import './ShowOrders.css'
import { isDisabled } from '@testing-library/user-event/dist/utils';
const config = require('../helpers/helper.json');


const Showjebbyfees = () => {



    const [sales_tax, setsalestax] = useState("")
    const [jebby_fees, setjebbyfees] = useState("")
    const [id, setpkgid] = useState("")
    const [UpdateState, setUpdateState] = useState()



    const [data, setdata] = useState([])
    useEffect(() => {
        // ${config['baseUrl']}
        fetch(`${config['baseUrl']}/GetValues`, {
            method: "GET",
            headers: { 'content-type': 'application/json' }
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            var temp = res.data
            setdata([...temp])
        })
    }, [])


    const CreatePackage = async () => {
        await fetch(`${config['baseUrl']}/CreateValues`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "sales_tax": sales_tax,
                "jebby_fees": jebby_fees
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res.message == "created") {
                window.location.reload(false)
            }
            else {
                alert("failed")
            }
        })
    }

    const UpdatePackage = async () => {
        await fetch(`${config['baseUrl']}/UpdateValues`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                "sales_tax": sales_tax == "" ? UpdateState.sales_tax : sales_tax,
                "jebby_fees": jebby_fees == "" ? UpdateState.jebby_fees : jebby_fees,
                "id": id
            })
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log(res)
            if (res.message == "updated") {
                window.location.reload(false)
            }
            else {
                alert("failed")
            }
        })
    }




    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-5 px-5 my-5">
                    <div className="row pb-3">
                        <div className="col-md-12">
                            <div className='set-div-1'>
                                <h1>Jebby Fees Or Sale Tax</h1>
                                {data.length > 0 ? <></>:<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                    Create
                                </button>}
                                
                            </div>




                            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Create Jebby Fees Or Sale Tax</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input onChange={(e) => setsalestax(e.target.value)} type="number" placeholder='Jebby Fees'/>
                                            <input onChange={(e) => setjebbyfees(e.target.value)} type="number" placeholder='Sale Tax'/>

                                            <button onClick={() => CreatePackage()} className="btn btn-primary">Create</button>

                                        </div>

                                    </div>
                                </div>
                            </div>



                            <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Update Jebby Fees Or Sale Tax</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <input defaultValue={UpdateState ? UpdateState.sales_tax : ""} onChange={(e) => setsalestax(e.target.value)} placeholder='Jebby Fees' type="number" />
                                            <input defaultValue={UpdateState ? UpdateState.jebby_fees : ""} onChange={(e) => setjebbyfees(e.target.value)} placeholder='Sale Tax' type="number" />

                                            <button onClick={() => UpdatePackage()} className="btn btn-primary">Update</button>

                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div classNameName="row">
                        <div classNameName="col-md-12 ">

                            {
                                data && data.length > 0 ? data.map(data => (
                                    <>
                                        <div className="row set-row-1">
                                            <div className="col-lg-5 col-md-5 col-sm-12 col-12"><div><h3>Sales Tax</h3>{data.sales_tax}</div></div>
                                            <div className="col-lg-5 col-md-5 col-sm-12 col-12"><div><h3>Jebby Fees</h3>{data.jebby_fees}</div></div>
                                            <div className="col-lg-2 col-md-2 col-sm-12 col-12"><div><button onClick={() => {
                                                setpkgid(data.id)
                                                setUpdateState(data)
                                            }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1" >update</button></div></div>
                                        </div>
                                    </>
                                )) : "data not found"
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Showjebbyfees