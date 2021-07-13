import {userConstants} from "../../utils/Constants";
import {firestore} from "../../services/Firebase";

export const getRealtimeUsers = (uid) => {

    return async dispatch => {
        dispatch({type: userConstants.GET_REALTIME_USERS_REQUEST});

        const db = firestore();
        return db.collection("users").onSnapshot((querySnapshot) => {
            const users = [];
            querySnapshot.forEach(function (doc) {
                if (doc.data().uid !== uid) {
                    users.push(doc.data());
                }
            })
            dispatch({
                type: userConstants.GET_REALTIME_USERS_SUCCESS,
                payload: {users: users}
            })
        });
    }
}

export const sendMessage = (message) => {
    return async dispatch => {
        dispatch({type: userConstants.SEND_MESSAGE_REQUEST});
        const db = firestore();
        db.collection("conversations").add({
            ...message,
            timesTamp: new Date(),
            view: false
        }).then((data) => {
            console.log(data)
            dispatch({type: userConstants.SEND_MESSAGE_SUCCESS});
        }).catch(error => {
            dispatch({
                type: userConstants.SEND_MESSAGE_FAILURE,
                payload: {error}
            });
            console.log(error)
        })
    }
}

export const getRealtimeMessage = (user) => {
    return async dispatch => {
        dispatch({type: userConstants.GET_REALTIME_MESSAGE_REQUEST})
        const db = firestore();
        let conversations = [];
        console.log(user)
        return (db.collection("conversations").where('sender_uid', 'in', [user.sender_uid, user.receiver_uid])
                .orderBy('timesTamp', 'asc')
                .onSnapshot((querySnapshot) => {
                    conversations = [];
                    querySnapshot.forEach((doc) => {
                        if ((doc.data().sender_uid === user.sender_uid && doc.data().receiver_uid === user.receiver_uid) ||
                            (doc.data().sender_uid === user.receiver_uid && doc.data().receiver_uid === user.sender_uid)) {
                            conversations.push(doc.data());
                        }
                    })
                    if (conversations.length > 0) {
                        console.log("dispatch")
                        console.log("user "+user.receiver_uid)
                        dispatch({
                            type: userConstants.GET_REALTIME_MESSAGE_SUCCESS,
                            payload: {conversations}
                        })
                    } else {
                        dispatch({
                            type: userConstants.GET_REALTIME_MESSAGE_FAILURE
                        })
                    }
                })
        )
    }
}