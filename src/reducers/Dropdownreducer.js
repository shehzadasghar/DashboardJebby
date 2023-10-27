const initState = {
    open_close: false,
    open_close1: false
}

const dropdownReducer = (state = initState, action) => {
    if (action.type === 'GET_OPEN') {
        return {
            ...state,
            open_close: action.open_close
        }
    }
    if (action.type === 'GET_OPEN1') {
        return {
            ...state,
            open_close1: action.open_close1
        }
    }


    return state;
}
export default dropdownReducer;