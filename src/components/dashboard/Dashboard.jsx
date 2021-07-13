import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeMessage, getRealtimeUsers, sendMessage} from "../../store/actions/UserActions";

const Dashboard = () => {

    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [receiverUid, setReceiverUid] = useState(null);

    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let unsubscribeUsers

    useEffect(() => {
        unsubscribeUsers = dispatch(getRealtimeUsers(auth.uid)).then(unsubscribeUsers => unsubscribeUsers)
            .catch(error => console.log(error))

    }, []);

    //component will unmount
    useEffect(() => {
        return () => {
            //clear
            unsubscribeUsers.then(f => f()).catch(error => console.log(error));
        };
    }, []);

    const initChat = (user) => {
        setChatStarted(true)
        setChatUser(`${user.firstName} ${user.lastName}`);
        setReceiverUid(user.uid);

        dispatch(getRealtimeMessage({sender_uid: auth.uid, receiver_uid: user.uid}))

        //dispatch(clearRealtimeMessage());

        /*unsubscribeMessage = dispatch(getRealtimeMessage({sender_uid: auth.uid, receiver_uid: user.uid}))
            .then(unsubscribeMessage=>{
                    setReceiverUid(user.uid)
                    setChatUser(`${user.firstName} ${user.lastName}`)
            }).
        catch((error) => console.log(error))*/

    }

    const submitMessage = () => {

        const messageObject = {
            content: message,
            receiver_uid: receiverUid,
            sender_uid: auth.uid
        }
        if (message !== "") {
            dispatch(sendMessage(messageObject)).then(() => {
                    setMessage("")
                    dispatch(getRealtimeMessage({sender_uid: auth.uid, receiver_uid: receiverUid}))
                }
            )
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-center border border-radius rounded border-secondary p-2">
                    <h3 className={"m-2"}>User list</h3>
                    {(user.loadingUsers) ?

                        <div className="spinner-border text-success" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>

                        : (user.users.length ?
                            user.users.map(userSelected => {
                                return (
                                    <UserSummary
                                        onClick={initChat}
                                        key={userSelected.uid}
                                        userSelected={userSelected}/>
                                )
                            }) : null)}
                </div>
                <div className="col-md-8 p-2">
                    <h3 className={"p-3"}>{(chatStarted) ? chatUser : "chat with someone"}</h3>

                    <div className={"chat-area"} id={"chat"}>

                        {user.loadingConversations ?
                            <div className="spinner-border text-success text-center" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                            : ((chatStarted) ? user.conversations.map(conversation => {
                                    return (
                                        <p key={conversation.timesTamp}
                                           className={"chat-bubble " + (auth.uid === conversation.sender_uid ? "current-user" : "")}>
                                            {conversation.content}
                                        </p>
                                    )
                                })

                                : null)}
                    </div>
                    {chatStarted ?
                        <div className="input-group p-3">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Typing..."
                                   value={message}
                                   onChange={event => setMessage(event.target.value)}
                                   required={true}
                                   minLength={1}/>
                            <div className="input-group-append">
                                <button onClick={submitMessage} className="btn btn-outline-primary"
                                        type="button">Send <i className="bi bi-mailbox"/></button>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

const UserSummary = (props) => {
    const {userSelected, onClick} = props;

    return (
        <div onClick={() => onClick(userSelected)} className="card mb-3" key={userSelected.uid}>
            <div className="row no-gutters">
                <div className="col-md-3">
                    <img src={userSelected.photoURL} className="card-img m-2" alt="..."/>
                </div>
                <div className="col-md-9">
                    <div className="card-body text-left">
                        <h5 className="card-title">{(userSelected.firstName + " " + userSelected.lastName)}</h5>
                        {userSelected.isOnline ?
                            <button type="button" className="btn btn-success" disabled={true}>
                                <i className="bi bi-lightbulb-fill"/> online
                            </button>
                            : <button type="button" className="btn btn-danger" disabled={true}>
                                <i className="bi bi-lightbulb-fill"/> offline
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard