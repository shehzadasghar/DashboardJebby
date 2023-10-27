
import React, { useState, useEffect } from 'react';
import "./Showallroles.css"
import { Link } from "react-router-dom"
import Modal from "react-modal";
import { getAllRoles } from "../../actions/Allrolesaction"
import { connect } from "react-redux"
const config = require('../../helpers/config.json');

const ShowAllRoles = (props) => {
  const [load, setload] = useState(false)
  const [RolemodalIsOpen, setRoleModalIsOpen] = useState(false);
  useEffect(() => {
    loadGetRoles()
  }, []);
  const loadGetRoles = async () => {
    await props.getAllRoles()
    return null;
  }
  const [roleName, setroleName] = useState("")
  const createrole = async () => {
    if (roleName == "") {
      alert("enter role name...")
    }
    else {
      setload(true)
      await fetch(`${config['baseUrl']}/roles/createRole`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token") },
        body: JSON.stringify({
          "roleName": roleName,
          "distributionId": localStorage.getItem("disid")
        })
      })
        .then(res => {
          console.log("res aqib", res)
          if (res.status !== 200) {
            alert("Some thing went wrong...");
          }
          return res.json();
        })
        .then((response) => {
          console.log("pppppp", response);
          if (response.message == "New Role Created") {
            window.location = "/roles"
          }
          else {
            alert("Something went wrong..")
          }
          setload(false)
        }).catch((error) => {
          console.log(error)
          alert("Please Check Your Internet Connection...")
          setload(false)
        })
    }
  }
  var date = new Date()

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <h1>All Roles</h1>
          </div>
          <div className="col-md-6 text-lg-right text-md-right mt-2">
            <button className='border-0 rounded py-2 px-5  btnorderbookersub' onClick={() => setRoleModalIsOpen(true)} >Add New Role</button>
          </div>
        </div>
        <div className='bg-white rounded shadow-lg p-lg-5 p-3 my-3'>
          <table className='table border-0 table-responsive w-100' style={{ overflow: "auto", maxHeight: "500px" }}>
            <thead className='border-0 table-secondary'>
              <th style={{ border: "1px solid black" }}>Date & Time</th>
              <th style={{ border: "1px solid black" }}>Role Name</th>
            </thead>
            {
              props.allrolesReducer.allroles && props.allrolesReducer.allroles.roles && props.allrolesReducer.allroles.roles.length > 0 ? props.allrolesReducer.allroles.roles.map(value => (
                <tr>
                  <td style={{ border: "1px solid black" }}>{`${value.createdAt !== null && value.createdAt !== undefined && value.createdAt !== "" ? `${value.createdAt.split("T")[0]} ${value.createdAt.split("T")[1].split(".")[0]}` : ""}`}</td>
                  <td style={{ border: "1px solid black" }}>{`${value.roleName !== null && value.roleName !== undefined && value.roleName !== "" ? value.roleName : ""}`}</td>
                </tr>

              )) : "No Roles"
            }


          </table>
        </div>
      </div>
      <Modal
        isOpen={RolemodalIsOpen}
        onRequestClose={() => setRoleModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: "1",
          },
          content: {
            position: "absolute",
            margin: "0 auto",
            width: "350px",
            height: "267px",
            top: "100px",
            left: "0",
            right: "0",
            bottom: "100px",
            border: "1px solid #ccc",
            background: "#fff",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
            boxShadow: "0 0 5px 5px #f2f2f2",
            borderRadius: "20px",
            background: "#fff",
            border: "1px solid #fff",
          },
        }}
      >
        <div className="row">
          <div className="col-md-12 text-center">
            <h3><strong>Add Role</strong></h3>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <label htmlFor=""><strong>Role Name</strong></label>
            <input type="text"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  createrole();
                }
              }}
              placeholder='Role Name' onChange={e => setroleName(e.target.value.toString())} className='form-control w-100' />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button className='border-0 rounded py-2 px-5  btnorderbookersub' onClick={() => createrole()} ><strong>Add</strong></button>
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  allrolesReducer: state.allrolesReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllRoles: () => dispatch(getAllRoles()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAllRoles);