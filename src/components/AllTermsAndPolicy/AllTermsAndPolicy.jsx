import React, { useState, useEffect, useRef } from 'react';
import "./AllTermsAndPolicy.css"
import Modal from "react-modal";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'rsuite/dist/rsuite.min.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const config = require('../../helpers/config.json');

const AllTermsAndPolicy = () => {
  const [data, setdata] = useState('');

  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setdata(data);
  };
  const [check, setcheck] = useState(null)
  const [description, setdescription] = useState("");

  useEffect(() => {
    fetch(`${config['baseUrl']}/getTermsAndConditions`, {
      method: "GET",
      headers: { 'content-type': 'application/json' }
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.data && res.data.length > 0) {
        setdata(res.data[0].description)
        setcheck(res.data)
      }
    })


  }, [])
  const Update = () => {
    const submit = { description: data }
    fetch(`${config['baseUrl']}/termsAndConditionInsertAndUpdate`, {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(submit)
    }).then(res => {
      return res.json()
    }).then(res => {
      window.location.reload(true)
      console.log(`Updated terms and conditions`)
    })
  }
  return (
    <>
      <div className="container-fluid bg-white overflow-scroll height-100vh">
        <div className="col-md-12 aera py-4 px-5 mt-5">
          <div className="row">
            <div className="col-md-12 mb-2">
              <h1>Terms and Conditions</h1>
            </div>
          </div>
          {
            check ?

            <CKEditor
      editor={ClassicEditor}
      data={data}
      onReady={(editor) => {
        console.log('CKEditor5 React Component is ready to use!', editor);
      }}
      onChange={handleChange}
    />
              // <textarea
              //   onKeyPress={(e) => {
              //     if (e.key === "Enter") {
              //       Update();
              //     }
              //     else if (e.key === "Shift + Enter") {
              //       alert(e.key)
              //     }
              //   }}
              //   name="" onChange={(e) => setdata(e.target.value)} className='form-control' id="" cols="30" rows="10" value={data}></textarea>
              : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </Box>
          }







          <div className="row">
            <div className="col-md-12 mt-3 text-end">
              <button
                onClick={Update}
                className='btn btn-primary py-2 px-5'>Update</button>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default AllTermsAndPolicy