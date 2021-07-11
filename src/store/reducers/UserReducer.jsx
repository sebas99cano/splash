import {userConstants} from "../../utils/Constants";

const initState = {
    users: [],
    loadingUsers: false,
    error: null
}

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case userConstants.GET_REALTIME_USERS_REQUEST:
            state={
                ...state,
                loadingUsers: true,
            }
            break;
        case userConstants.GET_REALTIME_USERS_SUCCESS:
            state={
                ...state,
                users:action.payload.users,
                loadingUsers: false,
            }
            break;
        case userConstants.GET_REALTIME_USERS_FAILURE:
            state = {
                ...state,
                loadingUsers: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}

export default userReducer