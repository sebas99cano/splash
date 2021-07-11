import {combineReducers} from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";

const reducer = combineReducers({
    user:userReducer,
    auth:authReducer,
})
export default reducer