const initState = {
    allroles: {},
    allrolesResponse: null,
    loading: false

}

const allrolesReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLRoles') {
        return {
            ...state,
            allroles: action.allroles,
            allrolesResponse: action.allrolesResponse,
            loading: action.loading
        }
    }


    return state;
}
export default allrolesReducer;