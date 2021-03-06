import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../store/actions/AuthActions";


const Header = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logoutUser = (event) => {
        event.preventDefault();
        dispatch(logout(auth.uid))
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand mr-3 btn btn-outline-secondary" to={"/"}>Splash App <i className="bi bi-controller"/></Link>
                {auth.authenticated ?
                    <div className="navbar-nav">
                        <button className="nav-item nav-link mr-3 btn btn-outline-secondary"
                        >Welcome - {(auth.firstName + " " + auth.lastName)} <i className="bi bi-person-circle"/>
                        </button>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary"
                              to={"/dashboard"}>Dashboard <i className="bi bi-star-half"/></Link>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary"
                              to={"/publications"}>Publications <i className="bi bi-clipboard"/></Link>
                        <button className="nav-item nav-link mr-3 btn btn-outline-secondary"
                                onClick={(logoutUser)}>Logout <i className="bi bi-door-open-fill"/>
                        </button>
                    </div> :
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/login"}>
                            Log In <i className="bi bi-box-arrow-right"/></Link>
                        <Link className="nav-item nav-link mr-3 btn btn-outline-secondary" to={"/signup"}>
                            Sign Up <i className="bi bi-person-circle"/></Link>
                    </div>}
            </div>
        </nav>
    )
}

export default Header