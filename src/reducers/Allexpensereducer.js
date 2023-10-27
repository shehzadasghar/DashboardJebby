const initState = {
    allexpense: {},
    allexpenseResponse: null,
    loading: false

}

const allexpenseReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLEXPENSE') {
        return {
            ...state,
            allexpense: action.allexpense,
            allexpenseResponse: action.allexpenseResponse,
            loading: action.loading
        }
    }


    return state;
}
export default allexpenseReducer;