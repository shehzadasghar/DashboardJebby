const initState = {
    alldailysales: {},
    alldailysalesreport: {},
    alldailysalesResponse: null,
    alldailysalesreportResponse: null,
    loading: false

}

const alldailysalesReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLDAILYSALES') {
        return {
            ...state,
            alldailysales: action.alldailysales,
            alldailysalesResponse: action.alldailysalesResponse,
            loading: action.loading
        }
    }
   else if (action.type === 'GET_ALLDAILYSALES_REPORT') {
        return {
            ...state,
            alldailysalesreport: action.alldailysalesreport,
            alldailysalesreportResponse: action.alldailysalesreportResponse,
            loading: action.loading
        }
    }


    return state;
}
export default alldailysalesReducer;