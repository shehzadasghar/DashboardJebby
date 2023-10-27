import React, { useState, useRef, useEffect } from 'react'
import axios from "axios"
import io from 'socket.io-client'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './sendNotification.css'
const config = require("../../helpers/config.json")
const SendNotification = () => {
    const [message, setsendMessage] = useState("")
    const [notification, setnotification] = useState([])
    const sendMessage = () => {
        setsendMessage("")
        fetch(`${config['baseUrl']}/SendAdminNotification`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                "notification": message,
                "name": "admin"
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.message === "Notification Sent") {
                console.log(res.message)
            }
            else {
                console.log("Error")
            }
        }).catch(err => console.log(err, "error"))
    }
    useEffect(() => {
        fetch(`${config['baseUrl']}/getAllNotificationsForAdmin`, {
            method: "GET",
            headers: { "content-type": "application/json" }
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.data.length > 0) {
                let temp = []
                temp = res.data
                setnotification([...temp])
            }
            else {
                console.log("Error")
            }
        }).catch(err => console.log(err, "error"))

    }, [notification])
    return (

        <>


            <div className="container-fluid bg-white overflow-scroll height-100vh">
                <div className="col-md-12 aera py-4 px-5 mt-5">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <h1>Send Notifications</h1>
                        </div>
                    </div>

                    <input
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                sendMessage()
                            }
                        }}
                        onChange={(e) => setsendMessage(e.target.value)} value={message} placeholder="Send message" type="text" className="form-control" />
                    <div className="row">
                        <div className="col-md-12 mt-3 text-end">
                            <button onClick={() => sendMessage()} className='btn btn-primary py-2 px-5'>Send</button>
                        </div>

                    </div>
                    <hr />
                    <div className="col-md-12 mb-2 text-center px-0">
                        <h1>All Notifications</h1>
                    </div>
                    {
                        notification.length > 0 ? notification.map((notification) => {
                            return (
                                <div className="row text-center ">
                                    <div className="col-md-12 mb-2">
                                        <div className="live-alerts-box">
                                            {notification.description}
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>

                    }

                </div>
            </div>
        </>
    )
}

export default SendNotification