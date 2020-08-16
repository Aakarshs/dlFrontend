import React from 'react';
import { authenticate_teacher, authenticate_student } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import '../styles/TeacherLogin.css';


export default class StudentLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            toDashboard: false,
            teacher_id:""
        };
    }

    componentWillMount(props) {

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
                this.setState(() => ({ toDashboard: true, teacher_id: data }))
            }
            else {
                alert("incorrect username and password")
            }
        })
    }

    render() {
        if (this.state.toDashboard) {
            return <Redirect to={'/Dashboard/' + this.state.teacher_id} />
        }
        return (
            <div>
                <div className="login-container">
                    <div className="inner-container-login">
                        <div className="inner-container-elements">
                            <div className="text-description">
                                <div className="company-name">Digital Leaders</div>
                                <div>Welcome back, Sign in to your account.</div>
                            </div>
                            <textarea rows="1" className="login-textarea" placeholder="Email" onChange={e => { this.handleChangeEmail(e.target.value) }} value={this.state.email}></textarea>
                            <textarea rows="1" className="login-textarea" placeholder="Password" onChange={e => { this.handleChangePassword(e.target.value) }} value={this.state.password}></textarea>
                            <button className="login-button" onClick={() => this.authenticate()}>Login</button>
                        </div>
                    </div>
                    <div className="login-artwork"></div>
                </div>

            </div>
        );
    }
}


