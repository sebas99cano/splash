import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInUser} from "../store/actions/AuthActions";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Home from "./home/Home";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import NotFoundPage from "./NotFoundPage";
import Dashboard from "./dashboard/Dashboard";
import Publications from "./publications/publications";



export const App = () =>{

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!auth.authenticated){
            dispatch(isLoggedInUser())
        }
    },[])

    return auth.authenticating === true ? (
        <div className="container">
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6 text-center">
                    <br/><br/><br/>
                    <div className="spinner-border text-success" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Router>
            <Header/>
            <br/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <PrivateRoute exact path="/dashboard" authenticated={auth.authenticated} component={Dashboard}/>
                <PrivateRoute exact path="/publications" authenticated={auth.authenticated} component={Publications}/>
                <PublicRoute exact path="/signup" authenticated={auth.authenticated} component={Signup}/>
                <PublicRoute exact path="/login" authenticated={auth.authenticated} component={Login}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
            <Footer/>
        </Router>
    );
}

function PrivateRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{pathname: "/login", state: {from: props.location}}}
                    />
                )
            }
        />
    );
}

function PublicRoute({component: Component, authenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === false ? <Component {...props} /> : <Redirect to="/"/>
            }
        />
    );
}
