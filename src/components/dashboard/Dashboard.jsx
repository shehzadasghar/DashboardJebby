
import React, { useState, useEffect } from "react"
import { Menu, Button, Text } from '@mantine/core';
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';
import "./Dashboard.css"
import burger from "../../assets/dashboard/OADjlP.png"
import Charts from "./piechart"
import { Link } from 'react-router-dom'
const config = require("../../helpers/config.json")

const Dashboard = (props) => {
  const [vendor, setVendor] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [order, setOrder] = useState([])
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch(`${config['baseUrl']}/getAllVendors`, {
      method: "GET",
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.data.length > 0) {
        let temp = []
        temp = res.data
        setVendor([...temp])
      }
    })
  }, [])
  useEffect(() => {
    fetch(`${config['baseUrl']}/getProducts`, {
      method: "GET",
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.data.length > 0) {
        let temp = []
        temp = res.data
        setProduct([...temp])
      }
    })
  }, [])
  useEffect(() => {
    fetch(`${config['baseUrl']}/categoryGet`, {
      method: "GET",
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.data.length > 0) {
        let temp = []
        temp = res.data
        setCategory([...temp])
      }
    })
  }, [])
  useEffect(() => {
    fetch(`${config['baseUrl']}/getAllOrders`, {
      method: "GET",
      headers: { "content-type": "application/json" }
    }).then(res => {
      return res.json();
    }).then(res => {
      if (res.data.length > 0) {
        let temp = []
        temp = res.data
        setOrder([...temp])
      }
    })
  }, [])


  const fetchNotifications = () => {
    fetch(`${config['baseUrl']}/getAllNotificationsForAdmin`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          setNotifications(data.data);
        }
      })
      .catch((error) => console.error('Error fetching notifications:', error));
  };

  useEffect(() => {
    // Fetch notifications initially
    fetchNotifications();

    // Auto-hit API every 3 seconds
    const intervalId = setInterval(fetchNotifications, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  
  const receivedNotifications = notifications.filter((notification) => notification.name === 'received');



  return (
    <>
      <div className="container-fluid overflow-scroll height-100vh">


<div className="text-end">
<Menu shadow="md" width={200}>
      <Menu.Target>
        <Button className="set-btn-1">
          <svg
            width={19}
            height={19}
            fill="none"
            stroke="CurrentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {receivedNotifications.length > 0 && <span className="notification-count">{receivedNotifications.length}</span>}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {receivedNotifications.length > 0 ? (
          receivedNotifications.map((notification) => (
            <Link to="/returnproduct"><Menu.Item key={notification.id}>{notification.description}</Menu.Item></Link>
            
          ))
        ) : (
          <p>No notifications available</p>
        )}
      </Menu.Dropdown>
    </Menu>
</div>


        <div className="row pt-5">
          <div className="col-md-3">
            <div className="shadow rounded">
              <div className="row pt-3">
                <div className="col-md-6 text-center">
                  <h3 className="font-weight-bolder dashboardRecordCards">
                    {vendor.length}
                  </h3>
                  <p className="fontSize-15px">Vendors</p>
                </div>
                <div className="col-md-6 text-center">
                  <div className="icon">
                    <svg width={60} height={60} fill="#0b2782" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                      <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                    </svg>
                  </div>
                </div>
                <div className="col-md-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="rounded-bottom">
                    <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow rounded">
              <div className="row pt-3">
                <div className="col-md-6 text-center">
                  <h3 className="font-weight-bolder dashboardRecordCards">
                    {product.length}
                  </h3>
                  <p className="fontSize-15px">Products</p>
                </div>
                <div className="col-md-6 text-center">
                  <div className="icon">
                    <svg width={60} height={60} fill="none" stroke="#0b2782" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                    </svg>
                  </div>
                </div>
                <div className="col-md-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="rounded-bottom">
                    <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow rounded">
              <div className="row pt-3">
                <div className="col-md-6 text-center">
                  <h3 className="font-weight-bolder dashboardRecordCards">
                    {category.length}
                  </h3>
                  <p className="fontSize-15px">Categories</p>
                </div>
                <div className="col-md-6 text-center">
                  <div className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="#0b2782" d="m6.76 6l.45.89L7.76 8H12v5H4V6h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8V6h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55zM6.76 19l.45.89l.55 1.11H12v5H4v-7h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8v-7h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55z" /></svg>
                  </div>
                </div>
                <div className="col-md-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="rounded-bottom">
                    <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="shadow rounded">
              <div className="row pt-3">
                <div className="col-md-6 text-center">
                  <h3 className="font-weight-bolder dashboardRecordCards">
                    {order.length}
                  </h3>
                  <p className="fontSize-15px">Orders</p>
                </div>
                <div className="col-md-6 text-center">
                  <div className="icon">
                    <svg width={60} height={60} fill="none" stroke="#0b2782" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                      <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                  </div>
                </div>
                <div className="col-md-12">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="rounded-bottom">
                    <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-md-3 pb-lg-0 pb-md-0 pb-4">
            <div className="small-box bg-white">
              <div className="inner py-1">
                <div className="row" style={{ position: 'relative', top: '12px' }}>
                  <div className="col-md-4 col-4">
                    <h3 className="ml-5 font-weight-bolder dashboardRecordCards">
                      {vendor.length}
                    </h3>
                  </div>
                  <div className="col-md-4 col-5" />
                  <div className="col-md-4 col-3">
                    <div className="icon con">
                      <svg width={60} height={60} fill="#0b2782" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 11h-3V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6a1 1 0 0 0-1-1ZM5 19a1 1 0 0 1-1-1V5h12v13c0 .351.061.688.171 1H5Zm15-1a1 1 0 0 1-2 0v-5h2v5Z" />
                        <path d="M6 7h8v2H6V7Zm0 4h8v2H6v-2Zm5 4h3v2h-3v-2Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="ml-4 pera">Vendors</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                </path>
              </svg>
            </div>
          </div> */}
          {/* <div className="col-md-3  pb-lg-0 pb-md-0 pb-4 ">
            <div className="small-box bg-white">
              <div className="inner py-1">
                <div className="row" style={{ position: 'relative', top: '12px' }}>
                  <div className="col-md-4 col-4">
                    <h3 className="ml-5 font-weight-bolder dashboardRecordCards">
                      {product.length}
                    </h3>
                  </div>
                  <div className="col-md-4 col-5" />
                  <div className="col-md-4 col-3">
                    <div className="icon con">
                      <svg width={60} height={60} fill="none" stroke="#0b2782" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <path d="M12 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="ml-4 pera">Products</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                </path>
              </svg>
            </div>
          </div> */}
          {/* <div className="col-md-3  pb-lg-0 pb-md-0 pb-4 ">
            <div className="small-box bg-white">
              <div className="inner py-1">
                <div className="row" style={{ position: 'relative', top: '12px' }}>
                  <div className="col-md-4 col-4">
                    <h3 className="ml-5 font-weight-bolder dashboardRecordCards">
                      {category.length}
                    </h3>
                  </div>
                  <div className="col-md-4 col-5" />
                  <div className="col-md-4 col-3">
                    <div className="icon con">
                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="#0b2782" d="m6.76 6l.45.89L7.76 8H12v5H4V6h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8V6h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55zM6.76 19l.45.89l.55 1.11H12v5H4v-7h2.76m.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55zm15.38 2l.45.89l.55 1.11H28v5h-8v-7h2.76m.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55z" /></svg>
                    </div>
                  </div>
                </div>
                <p className="ml-4 pera">Categories</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                </path>
              </svg>
            </div>
          </div> */}
          {/* <div className="col-md-3  pb-lg-0 pb-md-0 pb-4 ">
            <div className="small-box bg-white">
              <div className="inner py-1">
                <div className="row" style={{ position: 'relative', top: '12px' }}>
                  <div className="col-md-4 col-4">
                    <h3 className="ml-5 font-weight-bolder dashboardRecordCards">
                      {order.length}
                    </h3>
                  </div>
                  <div className="col-md-4 col-5" />
                  <div className="col-md-4 col-3">
                    <div className="icon con">
                      <svg width={60} height={60} fill="none" stroke="#0b2782" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                        <path d="M20 20a1 1 0 1 0 0 2 1 1 0 1 0 0-2z" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="ml-4 pera">Orders</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#0b2782" fillOpacity={1} d="M0,256L6.2,266.7C12.3,277,25,299,37,272C49.2,245,62,171,74,133.3C86.2,96,98,96,111,128C123.1,160,135,224,148,250.7C160,277,172,267,185,229.3C196.9,192,209,128,222,106.7C233.8,85,246,107,258,106.7C270.8,107,283,85,295,69.3C307.7,53,320,43,332,64C344.6,85,357,139,369,170.7C381.5,203,394,213,406,202.7C418.5,192,431,160,443,128C455.4,96,468,64,480,90.7C492.3,117,505,203,517,240C529.2,277,542,267,554,240C566.2,213,578,171,591,154.7C603.1,139,615,149,628,165.3C640,181,652,203,665,224C676.9,245,689,267,702,266.7C713.8,267,726,245,738,245.3C750.8,245,763,267,775,266.7C787.7,267,800,245,812,245.3C824.6,245,837,267,849,272C861.5,277,874,267,886,266.7C898.5,267,911,277,923,240C935.4,203,948,117,960,85.3C972.3,53,985,75,997,101.3C1009.2,128,1022,160,1034,170.7C1046.2,181,1058,171,1071,160C1083.1,149,1095,139,1108,122.7C1120,107,1132,85,1145,117.3C1156.9,149,1169,235,1182,272C1193.8,309,1206,299,1218,250.7C1230.8,203,1243,117,1255,80C1267.7,43,1280,53,1292,96C1304.6,139,1317,213,1329,213.3C1341.5,213,1354,139,1366,128C1378.5,117,1391,171,1403,170.7C1415.4,171,1428,117,1434,90.7L1440,64L1440,320L1433.8,320C1427.7,320,1415,320,1403,320C1390.8,320,1378,320,1366,320C1353.8,320,1342,320,1329,320C1316.9,320,1305,320,1292,320C1280,320,1268,320,1255,320C1243.1,320,1231,320,1218,320C1206.2,320,1194,320,1182,320C1169.2,320,1157,320,1145,320C1132.3,320,1120,320,1108,320C1095.4,320,1083,320,1071,320C1058.5,320,1046,320,1034,320C1021.5,320,1009,320,997,320C984.6,320,972,320,960,320C947.7,320,935,320,923,320C910.8,320,898,320,886,320C873.8,320,862,320,849,320C836.9,320,825,320,812,320C800,320,788,320,775,320C763.1,320,751,320,738,320C726.2,320,714,320,702,320C689.2,320,677,320,665,320C652.3,320,640,320,628,320C615.4,320,603,320,591,320C578.5,320,566,320,554,320C541.5,320,529,320,517,320C504.6,320,492,320,480,320C467.7,320,455,320,443,320C430.8,320,418,320,406,320C393.8,320,382,320,369,320C356.9,320,345,320,332,320C320,320,308,320,295,320C283.1,320,271,320,258,320C246.2,320,234,320,222,320C209.2,320,197,320,185,320C172.3,320,160,320,148,320C135.4,320,123,320,111,320C98.5,320,86,320,74,320C61.5,320,49,320,37,320C24.6,320,12,320,6,320L0,320Z">
                </path>
              </svg>
            </div>
          </div> */}
        </div>

        <div className="row py-5">
          <div className="col-12 col-lg-7 col-md-12 mb-lg-0 mb-0 mb-md-5">
            <div className="row ml-md-0 ml-lg-0 ml-0 mr-md-0 mr-lg-0 mr-0">
              <div className="col-md-12 shadow bg-white rounded">
                <div className="row py-4">
                  <div className="col-md-12 d-flex py-2 align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-link ml-3"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                    <h3 className="ml-3">
                      Quick Links
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/dashboard"><i className="fa fa-tachometer mr-0 py-2" />Dashboard</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/termsandconditions"><i className="fas fa-weight mr-0 py-2"></i>Terms & Conditions</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/privacy"><i className="fas fa-weight mr-0 py-2"></i>Privacy Policy</Link>
                  </div>
                </div>
                <div className="row py-4">
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/aboutapp"><i className="fas fa-weight mr-0 py-2"></i>About App</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/termLength"><i className="far fa-window-maximize mr-0 py-2"></i>Term Length</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/rentalagreement"><i className="fab fa-product-hunt mr-0 py-2"></i>Rental Agreement</Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/orders"><i className="fas fa-users mr-0 py-2"></i>Orders</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/vendors"><i className="fas fa-users mr-0 py-2"></i>Vendors</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/subcategory"><i className="fas fa-users mr-0 py-2"></i>Sub Category</Link>
                  </div>
                </div>
                <div className="row py-4">
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/featuredcategory"><i className="fas fa-users mr-0 py-2"></i>Featured Category</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/termination"><i className="fas fa-genderless mr-0 py-2"></i>Termination</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/roles"><i className="fas fa-users mr-0 py-2"></i>Roles</Link>
                  </div>
                </div>
                <div className="row pb-4">
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/userform"><i className="fas fa-users mr-0 py-2"></i>Sub admin</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/products"><i className="fas fa-users mr-0 py-2"></i>Products</Link>
                  </div>
                  <div className="col-md-4 mb-lg-0 mb-md-0 mb-3">
                    <Link className="text-white btn btn-block purpleGradient fontSize-15px" to="/category"><i className="fas fa-user mr-0 py-2s"></i>Main Category</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 col-md-12 mt-5 mt-lg-0 mt-md-0" >
            <div className="row">
              <div className="col-md-12 bg-white shadow rounded">
                <div className="row py-4">
                  <div className="col-md-12 d-flex py-2 align-items-center">
                    <svg width={24} height={24} fill="none" stroke="CurrentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect width={14} height={20} x={5} y={2} rx={2} ry={2} />
                      <path d="M12 18h.01" />
                    </svg>
                    <h3 className="ml-3">
                      Android / iOS Devices
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Charts />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


       



      </div>
    </>
  )
}
export default Dashboard