import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login, loginWithFacebook, loginWithGithub, loginWithGoogle} from "../../store/actions/AuthActions";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const loginUser = (event) => {
        event.preventDefault();
        const user = {email, password}
        dispatch(login(user));
    }

    const loginWithGoogleUser = (event) => {
        event.preventDefault();
        dispatch(loginWithGoogle());
    }

    const loginWithGithubUser = (event) => {
        event.preventDefault();
        dispatch(loginWithGithub());
    }
    const loginWithFacebookUser = (event) => {
        event.preventDefault();
        dispatch(loginWithFacebook());
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className={"col-md-3"}/>
                <div className="col-md-6">
                    <form className="py-5 px-5 content-align-center" autoComplete="off" onSubmit={loginUser}>
                        <h1 className={"m-5"}>Log In to <Link className="title ml-2" to="/"> ! ! Splash App <i
                            className="bi bi-controller"/></Link></h1>
                        <button className="btn btn-danger mr-2" type="button" onClick={loginWithGoogleUser}>
                            Google <i className="bi bi-google"/>
                        </button>
                        <button className="btn btn-dark mr-2" type="button" onClick={loginWithGithubUser}>
                            GitHub <i className="bi bi-github"/>
                        </button>
                        <button className="btn btn-primary mr-2" type="button" onClick={loginWithFacebookUser}>
                            Facebook <i className="bi bi-facebook"/>
                        </button>
                        <p className="lead m-3">OR</p>
                        <hr/>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                type="email"
                                onChange={(event) => setEmail(event.target.value)}
                                value={email}
                                required={true}
                                minLength={15}
                                maxLength={40}/>
                        </div>
                        <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                type="password"
                                required={true}
                                minLength={8}
                                maxLength={20}/>
                        </div>
                        <div className="form-group">
                            {
                                //error validation
                            }
                            <button className="btn btn-success px-5" type="submit">Login <i
                                className="bi bi-box-arrow-right"/>
                            </button>
                        </div>
                        <hr/>
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login