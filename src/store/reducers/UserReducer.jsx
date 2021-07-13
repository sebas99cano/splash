import {userConstants} from "../../utils/Constants";

const initState = {
    users: [],
    loadingUsers: false,
    error: null,
    conversations: [],
    loadingConversations: false,
    sendingMessage: false
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
        case userConstants.GET_REALTIME_USERS_CLEAR:
            state = {
                ...initState
            }
            break;
        case userConstants.SEND_MESSAGE_REQUEST:
            state={
                ...state,
                sendingMessage: true
            }
            break;
        case userConstants.SEND_MESSAGE_SUCCESS:
            state={
                ...state,
                sendingMessage: false
            }
            break;
        case userConstants.SEND_MESSAGE_FAILURE:
            state={
                ...state,
                sendingMessage: false,
                error: action.payload.error
            }
            break;
        case userConstants.GET_REALTIME_MESSAGE_REQUEST:
            state = {
                ...state,
                loadingConversations: true
            }
            break;
        case userConstants.GET_REALTIME_MESSAGE_SUCCESS:
            state={
                ...state,
                conversations: action.payload.conversations,
                loadingConversations: false
            }
            break;
        case userConstants.GET_REALTIME_MESSAGE_FAILURE:
            state={
                ...state,
                conversations: [],
                loadingConversations: false
            }
            break;
        case userConstants.GET_REALTIME_MESSAGE_CLEAR:
            state = {
                ...initState
            }
            break;
        default:
            break;
    }
    return state;
}

export default userReducer