
export const Dropdown = (bool) => {
    return (dispatch) => {

        dispatch({
            type: "GET_OPEN",
            open_close: bool
        });
    }
}



export const Dropdown1 = (bool) => {
    return (dispatch) => {

        dispatch({
            type: "GET_OPEN1",
            open_close1: bool
        });
    }
}

