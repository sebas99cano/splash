import {auth, firestore} from "../../services/Firebase";
import {authConstants} from "../../utils/Constants";

export const signup = (user) => {
    return async (dispatch) => {

        dispatch({type: authConstants.USER_LOGIN_REQUEST})

        const db = firestore();
        auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                const name = `${user.firstName} ${user.lastName}`;
                auth().currentUser.updateProfile({
                    displayName: name
                }).then(() => {
                    db.collection("users")
                        .doc(data.user.uid).set({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        uid: data.user.uid,
                        timesTamp: new Date(),
                        isOnline: true
                    }).then(() => {
                        const loggedUser = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            uid: data.user.uid,
                            email: user.email
                        }
                        localStorage.setItem('user', JSON.stringify(loggedUser));
                        console.log("user logged in successfully ... !");
                        dispatch({
                            type: authConstants.USER_LOGIN_SUCCESS,
                            payload: {user: loggedUser}
                        })
                    }).catch((error) => {
                        console.log(error)
                        dispatch({
                            type: authConstants.USER_LOGIN_FAILURE,
                            payload: {error: error}
                        })
                    })
                })
            }).catch((error) => {
            console.log(error);
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: {error: error}
            })
        })
    }
}

export const login = (user) => {
    return async dispatch => {
        dispatch({type: authConstants.USER_LOGIN_REQUEST})
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {

                const db = firestore();
                db.collection("users").doc(data.user.uid).update({
                    isOnline: true
                }).then(() => {

                    const name = data.user.displayName.split(" ");
                    const firstName = name[0];
                    const lastName = name[1];
                    const loggedUser = {
                        firstName,
                        lastName,
                        uid: data.user.uid,
                        email: data.user.email
                    }
                    localStorage.setItem('user', JSON.stringify(loggedUser))
                    console.log("user logged in successfully ... !");
                    dispatch({
                        type: authConstants.USER_LOGIN_SUCCESS,
                        payload: {user: loggedUser}
                    })

                }).catch((error) => {
                    console.log(error)
                    dispatch({
                        type: authConstants.USER_LOGIN_FAILURE,
                        payload: {error: error}
                    })
                })

            }).catch((error) => {
            console.log(error)
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: {error: error}
            })
        })
    }
}

export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        if (user) {
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {user: user}
            })
        } else {
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: {error: "Login again please"}
            })
        }
    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({type: authConstants.USER_LOGOUT_REQUEST})
        const db = firestore();
        db.collection("users").doc(uid).update({
            isOnline: false
        }).then(() => {
            auth().signOut().then(() => {
                localStorage.clear();
                dispatch({type: authConstants.USER_LOGOUT_SUCCESS})
            }).catch((error) => {
                console.log(error)
                dispatch({
                    type: authConstants.USER_LOGOUT_FAILURE,
                    payload: {error: error}
                })
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}