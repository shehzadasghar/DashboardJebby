const config = require('../helpers/config.json');
export const getAllExpense = (date2,todate) => {
    var nnn1=new Date().toISOString().substr(0, 10).split("-")[0]
    var nnn2=new Date().toISOString().substr(0, 10).split("-")[1]
    var nnn3=new Date().getDate()-1
    var nnn4=nnn3>9?nnn3:"0"+nnn3
    return (dispatch) => {
        fetch(`${config['baseUrl']}/expenses/getExpense${todate!==""&&todate!==null&&todate!==undefined?`?to=${todate}`:`?to=${new Date().toISOString().substr(0, 10)}`}&from=${date2!==null&&date2!==undefined&&date2!==""?date2:nnn1+"-"+nnn2+"-"+nnn4}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const allexpense = response

            console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLEXPENSE",
                allexpense: allexpense,
                allexpenseResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLEXPENSE",
                allexpense: {},
                allexpenseResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}