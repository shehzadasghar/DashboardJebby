// const config = require('../helpers/config.json');
// export const getAllAdvance = (okdateto, empid,okdatefrom) => {
//     console.log("klkl",okdateto,okdatefrom,empid)
//     return (dispatch) => {
//         var y=`${config['baseUrl']}/advance/getAdvance${okdateto!==""&&okdateto!==null&&okdateto!==undefined?`?to=${okdateto}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${okdatefrom!==null&&okdatefrom!==undefined&&okdatefrom!==""?okdatefrom:new Date().toISOString().substr(0, 10)}&employeeId=${empid==undefined&&empid==null?"":empid}`
//         console.log("uriii",y)
//         fetch(`${config['baseUrl']}/advance/getAdvance${okdateto!==""&&okdateto!==null&&okdateto!==undefined?`?to=${okdateto}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${okdatefrom!==null&&okdatefrom!==undefined&&okdatefrom!==""?okdatefrom:new Date().toISOString().substr(0, 10)}&employeeId=${empid==undefined&&empid==null?"":empid}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
//         }).then(res => res.json()).then((response) => {
//             const alladvance = response

//             console.log("kkkkk", response);
//             dispatch({
//                 type: "GET_ALLADVANCE",
//                 alladvance: alladvance,
//                 alladvanceResponse: "got it",
//                 loading: true
//             });
//         }).catch((error) => {
//             console.log("error", error);
//             dispatch({
//                 type: "GET_ALLADVANCE",
//                 alladvance: {},
//                 alladvanceResponse: null,
//                 loading: true
//             });
//             alert("Please Check Your Internet Connection...")
//         })

//     }


// }