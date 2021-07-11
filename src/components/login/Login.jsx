import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../store/actions/AuthActions";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const loginUser = (event) => {
        event.preventDefault();
        const user = {email, password}
        dispatch(login(user));
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className={"col-md-3"}/>
                <div className="col-md-6">
                    <form className="py-5 px-5 content-align-center" autoComplete="off" onSubmit={loginUser}>
                        <h1 className={"m-5"}>Login to<Link className="title ml-2" to="/">V-Game Blog</Link></h1>
                        <button className="btn btn-dark mr-2" type="button">
                            Sign in with Google <i className="bi bi-google"/>
                        </button>
                        <button className="btn btn-dark mr-2" type="button">
                            Sign in with GitHub <i className="bi bi-github"/>
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
                            <button className="btn btn-dark px-5" type="submit">Login <i
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