const config = require('../helpers/config.json');
// export const getAllDailySales = (date2, empid,todate) => {
//     return (dispatch) => {
//         var uri =`${config['baseUrl']}/sales/getSales${todate!==""&&todate!==null&&todate!==undefined?`?to=${todate}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${date2!==null&&date2!==undefined&&date2!==""?date2:new Date().toISOString().substr(0, 10)}&employeeId=${empid==undefined&&empid==null?"":empid}`
//         console.log("urll",uri)
//         fetch(`${config['baseUrl']}/sales/getSales${todate!==""&&todate!==null&&todate!==undefined?`?to=${todate}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${date2!==null&&date2!==undefined&&date2!==""?date2:new Date().toISOString().substr(0, 10)}&employeeId=${empid==undefined&&empid==null?"":empid}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
//         }).then(res => res.json()).then((response) => {
//             const alldailysales = response

//             console.log("salesss", response);
//             dispatch({
//                 type: "GET_ALLDAILYSALES",
//                 alldailysales: alldailysales,
//                 alldailysalesResponse: "got it",
//                 loading: true
//             });
//         }).catch((error) => {
//             console.log("error", error);
//             dispatch({
//                 type: "GET_ALLDAILYSALES",
//                 alldailysales: {},
//                 alldailysalesResponse: null,
//                 loading: true
//             });
//             alert("Please Check Your Internet Connection...")
//         })

//     }


// }


export const getAllDailySalesReport = (date2, empid,todate) => {
    return (dispatch) => {
        fetch(`${config['baseUrl']}/report${todate!==""&&todate!==null&&todate!==undefined?`?to=${todate}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${date2!==null&&date2!==undefined&&date2!==""?date2:new Date().toISOString().substr(0, 10)}&employeeId=${empid==undefined&&empid==null?"":empid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const alldailysalesreport = response

            console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLDAILYSALES_REPORT",
                alldailysalesreport: alldailysalesreport,
                alldailysalesreportResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLDAILYSALES_REPORT",
                alldailysalesreport: {},
                alldailysalesreportResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}


export const getAllDailySalesEdit = (date2) => {
    return (dispatch) => {
        fetch(`${config['baseUrl']}/sales/getSales?from=${date2}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const alldailysales = response

            console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLDAILYSALES",
                alldailysales: alldailysales,
                alldailysalesResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLDAILYSALES",
                alldailysales: {},
                alldailysalesResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}




export const getAllDailySalesReportEdit = (date2) => {
    return (dispatch) => {
        fetch(`${config['baseUrl']}/report?from=${date2}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const alldailysalesreport = response

            console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLDAILYSALES_REPORT",
                alldailysalesreport: alldailysalesreport,
                alldailysalesreportResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLDAILYSALES_REPORT",
                alldailysalesreport: {},
                alldailysalesreportResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}