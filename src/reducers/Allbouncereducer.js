const initState = {
    allbounce: {},
    allbounceResponse: null,
    loading: false

}

const allbounceReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLBOUNCE') {
        return {
            ...state,
            allbounce: action.allbounce,
            allbounceResponse: action.allbounceResponse,
            loading: action.loading
        }
    }


    return state;
}
export default allbounceReducer;