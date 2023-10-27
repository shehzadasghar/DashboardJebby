const initState = {
    allemployee: [],
    allemployeeResponse: null,
    loading: false

}

const allemployeeReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLEMPLOYEE') {
        return {
            ...state,
            allemployee: action.allemployee,
            allemployeeResponse: action.allemployeeResponse,
            loading: action.loading
        }
    }


    return state;
}
export default allemployeeReducer;