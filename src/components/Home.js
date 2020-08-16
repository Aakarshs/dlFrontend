import React from 'react';
import { authenticate_teacher } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import '../styles/Home.css';

export default class TeacherLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            toDashboard: false
        };
    }

    handleChangeEmail(e) {
        this.setState({ email: e })

    }

    handleChangePassword(e) {
        this.setState({ password: e })
    }

    authenticate() {
        authenticate_teacher(this.state.email, this.state.password).then((data) => {
            if (data != "0") {
                this.setState(() => ({ toDashboard: true }))
            }
            else {
                alert("incorrect username and password")
            }
        })
    }

    render() {
        if (this.state.toDashboard) { return <Redirect to='/Dashboard' /> }
        return (
            <div>
                <div className={'home-background'}></div>
            <div className="home-outer-container">
                <div className={'home-main-title'}>Digital Leaders</div>
                <div className="home-container">
                    <NavLink className="login-card" to={"/TeacherLogin/"}><div className="card-text">Teacher Login</div></NavLink>
                    <NavLink className="login-card" to={"/StudentLogin/"}><div className="card-text">Student Login</div></NavLink>
                </div>
            </div>
            </div>
        );
    }
}


