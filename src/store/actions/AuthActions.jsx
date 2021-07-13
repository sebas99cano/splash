import {auth, firestore} from "../../services/Firebase";
import {authConstants, userConstants} from "../../utils/Constants";

export const signup = (user) => {
    return async (dispatch) => {
        dispatch({type: authConstants.USER_LOGIN_REQUEST})
        auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                loginRegister(data, dispatch, user.firstName, user.lastName);
                loginValidation(data, dispatch, user.firstName, user.lastName);
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
                const name = data.user.displayName.split(" ");
                const firstName = name[0];
                const lastName = name[1];
                loginValidation(data, dispatch, firstName, lastName)
            }).catch((error) => {
            console.log(error)
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: {error: error}
            })
        })
    }
}

export const loginWithGoogle = () => {
    return async dispatch => {
        dispatch({type: authConstants.USER_LOGIN_REQUEST})
        const provider = new auth.GoogleAuthProvider();
        loginWithService(provider, dispatch);
    }
}

export const loginWithGithub = () => {
    return async dispatch => {
        dispatch({type: authConstants.USER_LOGIN_REQUEST})
        const provider = new auth.GithubAuthProvider();
        loginWithService()
        loginWithService(provider, dispatch);
    }
}

export const loginWithFacebook = () => {
    return async dispatch => {
        dispatch({type: authConstants.USER_LOGIN_REQUEST})
        const provider = new auth.FacebookAuthProvider();
        loginWithService(provider, dispatch);
    }
}

const loginWithService = (provider, dispatch) => {
    auth().signInWithPopup(provider).then((data) => {
        let firstName = "Nan";
        let lastName = "Nan";
        if (data.user.displayName !== null) {
            const name = data.user.displayName.split(" ");
            firstName = name[0];
            lastName = name[1];
        }
        loginRegister(data, dispatch, firstName, lastName);
        loginValidation(data, dispatch, firstName, lastName);
    }).catch((error) => {
        console.log(error)
        dispatch({
            type: authConstants.USER_LOGIN_FAILURE,
            payload: {error: error}
        })
    })
}

const loginRegister = (data, dispatch, firstName, lastName) => {

    let photoURL = "https://www.softzone.es/app/uploads/2018/04/guest.png"
    if (data.user.photoURL) {
        photoURL = data.user.photoURL
    }

    auth().currentUser.updateProfile({
        displayName: (firstName + " " + lastName)
    }).then(() => null).catch(error => console.log(error))

    const db = firestore();

    db.collection("users").doc(data.user.uid).set({
        firstName: firstName,
        lastName: lastName,
        uid: data.user.uid,
        photoURL: photoURL,
        timesTamp: new Date(),
        isOnline: true
    }).catch((error) => {
        console.log(error)
        dispatch({
            type: authConstants.USER_LOGIN_FAILURE,
            payload: {error: error}
        })
    })
}

const loginValidation = (data, dispatch, firstName, lastName) => {
    const db = firestore();
    db.collection("users").doc(data.user.uid).update({isOnline: true})
        .then(() => {
            const loggedUser = {
                firstName: firstName,
                lastName: lastName,
                uid: data.user.uid,
                email: data.user.email
            }
            localStorage.setItem('user', JSON.stringify(loggedUser))
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
                dispatch({type: userConstants.GET_REALTIME_USERS_CLEAR})
                dispatch({type: userConstants.GET_REALTIME_MESSAGE_CLEAR})
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