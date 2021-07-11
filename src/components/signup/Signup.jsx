import {Link} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {signup} from "../../store/actions/AuthActions";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');

    const dispatch = useDispatch();

    const registerUser = (event) => {
        event.preventDefault();
        const user = {firstName, lastName, email, password}
        dispatch(signup(user))
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">
                    <form className="mt-5 py-5 px-5"
                          onSubmit={registerUser}
                          autoComplete="off">
                        <h1>Sign Up to <Link className="title ml-2" to="/">V-Game Blog</Link></h1>
                        <p className="lead">Fill in the form below to create an account.</p>
                        <div className="form-group">
                            <input className="form-control"
                                   placeholder="First Name"
                                   name="firstname"
                                   type="text"
                                   value={firstName}
                                   onChange={(event) => setFirstname(event.target.value)}
                                   required={true}
                                   autoComplete="off"
                                   minLength={3}
                                   maxLength={40}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   placeholder="Last Name"
                                   name="lastname"
                                   type="text"
                                   value={lastName}
                                   onChange={(event) => setLastname(event.target.value)}
                                   required={true}
                                   minLength={3}
                                   maxLength={40}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   placeholder="Email"
                                   name="email"
                                   type="email"
                                   value={email}
                                   onChange={(event) => setEmail(event.target.value)}
                                   required={true}
                                   autoComplete="off"
                                   minLength={15}
                                   maxLength={40}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control"
                                   placeholder="Password"
                                   name="password"
                                   value={password}
                                   onChange={(event) => setPassword(event.target.value)}
                                   type="password"
                                   required={true}
                                   minLength={8}
                                   maxLength={20}/>
                        </div>
                        <div className="form-group">
                            {/*error validation*/}
                            <button className="btn btn-dark px-5" type="submit">Sign up <i
                                className="bi bi-person-circle"/></button>
                        </div>
                        <br/>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup