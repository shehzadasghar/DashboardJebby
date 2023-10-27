import React, { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './ShowAllTermLength.css'

const config = require("../../helpers/config.json")
const ShowAllTermLength = () => {
    const [data, setdata] = useState('');
    const [check, setcheck] = useState(null)
    useEffect(() => {
        fetch(`${config['baseUrl']}/getTermLength`, {
            method: 'GET',
            headers: { 'content-type': 'application' }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data && res.data.length > 0) {
                setdata(res.data[0].description)
                setcheck(res.data)
            }
        })
    }, []);
    const Update = () => {
        if (data == '') {
            alert("Enter Team Length!")
        }
        else {
            const submit = { description: data }
            fetch(`${config['baseUrl']}/termLengthInsertAndUpdate`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(submit)
            }).then(res => {
                return res.json()
            }).then(res => {
                window.location.reload(true)
            })
        }

    }
    const handleChange = (event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
        setdata(data);
      };
    return (
        <>
            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-4 px-5 mt-5">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h1>Copyright Policy</h1>
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
                            //     onKeyPress={(e) => {
                            //         if (e.key === "Enter") {
                            //             Update();
                            //         }
                            //         else if (e.key === "Shift + Enter") {
                            //             alert(e.key)
                            //         }
                            //     }}
                            //     name="" onChange={(e) => setdata(e.target.value)} className='form-control' id="" cols="30" rows="10" value={data}></textarea>
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
    )
}

export default ShowAllTermLength