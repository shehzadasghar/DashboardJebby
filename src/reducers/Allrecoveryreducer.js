const initState = {
    allrecovery: {},
    allrecoveryResponse: null,
    loading: false

}

const allrecoveryReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLRECOVERY') {
        return {
            ...state,
            allrecovery: action.allrecovery,
            allrecoveryResponse: action.allrecoveryResponse,
            loading: action.loading
        }
    }


    return state;
}
export default allrecoveryReducer;