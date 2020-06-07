import React from 'react';
import { authenticate_student } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";


export default class StudentLogin extends React.Component {
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
        authenticate_student(this.state.email, this.state.password).then((data) => {
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
            return <Redirect to='/Students/' />
          }
        return (
            <div>
                <div>Email</div>
                <textarea onChange={e => { this.handleChangeEmail(e.target.value) }} value={this.state.email}></textarea>
                <div value={this.state.password}>Password</div>
                <textarea onChange={e => { this.handleChangePassword(e.target.value) }} value={this.state.password}></textarea>
                <button onClick={() => this.authenticate()}>Login</button>
            </div>
        );
    }
}


