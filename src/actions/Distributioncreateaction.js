const config = require('../helpers/config.json');

export const DistributionCreate = (distributorName, location,CompanyName) => {
    return (dispatch) => {
        dispatch({
            type: "SEARCH_RESET",
            loading: false,
            success: false,
        });
        fetch(`${config['baseUrl']}/distribution/createDistribution`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "distributorName":distributorName,
                 "location":location,
                  "CompanyName":CompanyName
            })
        }).then(res => {
            console.log("res aqib", res)
            if (res.status !== 200) {
                alert("Some thing went wrong...");
            }
            return res.json();
        }).then((response) => {
            console.log("pppppp", response);
            // const sData = response.job;
            dispatch({
                type: "SEARCH_SUCCESS",
                SearchResponse: response,
                loading: true,
                success: true,

            });
            if(response.message=="Distribution Created"){
                window.location = "/dashboard"
                // alert("Successfully Applied..")
            }
            else{
                alert("Something went wrong..")
            }
            // localStorage.setItem("array", JSON.stringify(sData))
            //   window.location = "/search_result"

        }).catch((error) => {
            console.log(error)
            dispatch({
                type: "SEARCH_FAIL",
                SearchResponse: "creation failed",
                loading: true,
                success: false,
                //pageName: PGN.COLORS_PAGE_NAME
            });
            alert("Please Check Your Internet Connection...")
        })
    }
}

