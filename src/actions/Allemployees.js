const config = require('../helpers/config.json');
export const getAllEmployee = () => {
    return (dispatch) => {
        fetch(`${config['baseUrl']}/employees/getEmployees`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const allemployee = response

            // console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLEMPLOYEE",
                allemployee: allemployee,
                allemployeeResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLEMPLOYEE",
                allemployee: [],
                allemployeeResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}