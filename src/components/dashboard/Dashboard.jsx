import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRealtimeUsers} from "../../store/actions/UserActions";

const Dashboard = () => {

    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let unsubscribe;

    useEffect(() => {
        unsubscribe = dispatch(getRealtimeUsers(auth.uid)).then(unsubscribe => {
            return unsubscribe;
        }).catch(error => {
            console.log(error)
        })
    }, []);

    //component will unmount
    useEffect(() => {
        return () => {
            //clear
            unsubscribe.then(f => f()).catch(error => console.log(error));
        };
    }, []);


    console.log(user.users)

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 text-center">
                    <h1>Users</h1>
                    {user.users.length ?
                        user.users.map(userSelected => {
                            return (
                                <UserSummary key={userSelected.uid} userSelected={userSelected}/>
                            )
                        }) : null}
                </div>
                <div className="col-md-8">
                    <h1>Work in progress</h1>
                </div>
            </div>
        </div>
    )
}

const UserSummary = (props) => {
    const {userSelected} = props;

    return (
        <div className="card mb-3" key={userSelected.uid}>
            <div className="row no-gutters">
                <div className="col-md-3">
                    <img src="http://mymbs.co.id/public/upload/image/user/user.png" className="card-img m-2" alt="..."/>
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