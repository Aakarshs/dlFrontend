import React from 'react';
import { authenticate_teacher } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";


export default class TeacherLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            toDashboard: false
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
                this.setState(() => ({ toDashboard: true }))
            }
            else {
                alert("incorrect username and password")
            }
        })
    }

    render() {
        if (this.state.toDashboard) {
            return <Redirect to='/Dashboard' />
        }
        return (
            <div>
                <NavLink to={"/StudentLogin/"}>Student Login</NavLink>
                <NavLink to={"/TeacherLogin/"}>Teacher Login</NavLink>
            </div>
        );
    }
}


