import {combineReducers} from "redux";
import userReducer from "./UserReducer";
import authReducer from "./AuthReducer";
import publicationsReducer from "./PublicationsReducer";

const reducer = combineReducers({
    user:userReducer,
    auth:authReducer,
    publication:publicationsReducer,
})
export default reducer