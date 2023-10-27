const initState = {
    SearchResponse: null,
    loading:true,
    success:true
}

const DistributionCreateReducer = (state = initState, action) => {
    if (action.type === 'GET_SEARCH') {
        return {
            ...state,
            SearchResponse: action.SearchResponse,
            loading:action.loading,
            success:action.success,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'SEARCH_RESET') {
        return {
            ...state,
            SearchResponse: null,
            loading:action.loading,
            success:action.success,

        }
    }
    else if (action.type === 'SEARCH_SUCCESS') {
        return {
            ...state,
            SearchResponse: action.SearchResponse,
            loading:action.loading,
            success:action.success,
        }
    }
    else if (action.type === 'SEARCHL_FAIL') {
        return {
            ...state,
            SearchResponse: action.SearchResponse,
            loading:action.loading,
            success:action.success,
        }
    }

    return state;
}
export default DistributionCreateReducer;