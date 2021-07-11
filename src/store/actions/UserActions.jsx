import {userConstants} from "../../utils/Constants";
import {firestore} from "../../services/Firebase";

export const getRealtimeUsers = (uid) => {

    return async dispatch => {
        dispatch({type: userConstants.GET_REALTIME_USERS_REQUEST});

        const db = firestore();
        const unsubscribe = db.collection("users").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function (doc){
                if(doc.data().uid !== uid){
                    users.push(doc.data());
                }
            })
            dispatch({
                type: userConstants.GET_REALTIME_USERS_SUCCESS,
                payload: {users: users}
            })
        });

        return unsubscribe;

    }
}