const config = require('../helpers/config.json');
export const getAllRoles = () => {
    return (dispatch) => {
        fetch(`${config['baseUrl']}/roles/getRoles`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "jwt_token": localStorage.getItem("token"), },
        }).then(res => res.json()).then((response) => {
            const allroles = response

            console.log("kkkkk", response);
            dispatch({
                type: "GET_ALLRoles",
                allroles: allroles,
                allrolesResponse: "got it",
                loading: true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_ALLRoles",
                allroles: {},
                allrolesResponse: null,
                loading: true
            });
            alert("Please Check Your Internet Connection...")
        })

    }


}