import {authConstants} from "../../utils/Constants";

const initState = {
    firstName: '',
    lastName: '',
    email: '',
    uid: '',
    authenticated: false,
    authenticating: false,
    error: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConstants.USER_LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.USER_LOGIN_SUCCESS:
            state = {
                ...state,
                ...action.payload.user,
                authenticated: true,
                authenticating: false
            }
            break;
        case authConstants.USER_LOGIN_FAILURE:
            state = {
                ...state,
                authenticated: false,
                authenticating: false,
                error: action.payload.error
            }
            break;
        case authConstants.USER_LOGOUT_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.USER_LOGOUT_SUCCESS:
            state = {
                ...initState
            };
            break;
        case authConstants.USER_LOGOUT_FAILURE:
            state = {
                ...state,
                authenticated: true,
                authenticating: false,
                error: action.payload.error
            }
            break;
        default:
            break;
    }
    return state;
}

export default authReducer