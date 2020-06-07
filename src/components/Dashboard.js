import React from 'react';
import { get_students_by_course, get_teacher_courses } from "./Apis";
import { NavLink } from 'react-router-dom';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            student_data: [],
            teacher_courses: "",
            data_loaded: false,
        };
    }

    componentWillMount() {
        get_teacher_courses()
            .then(data => {
                this.setState({ teacher_courses: data })
            })
            .then(() => { this.sortByCourse() })
    }

    sortByCourse() {
        for (var course_id of this.state.teacher_courses) {
            get_students_by_course(course_id)
                .then(data => {
                    var new_student_data = this.state.student_data
                    new_student_data.push(data)
                    this.setState({ student_data: new_student_data, data_loaded: true })
                })
        }
    }

    render_students() {
        return this.state.student_data.map((item, index) => {
            return (
                <div>
                    <div>{this.state.teacher_courses[index]}</div>
                    {item.map(item => { return (<NavLink to={"/StudentLessons/" + item._id + "/" + this.state.teacher_courses[index]}>{item.fullname}</NavLink>) })}
                </div>
            )
        }
        )
    }

    renderPreparePanel() {
        return this.state.teacher_courses.map(item => {
            return (
            <div>
                <NavLink to={"/Prepare"+"/"+item}>{item}</NavLink>
            </div>
        )})
    }
    render() {
        if (this.state.data_loaded) {
            console.log(this.state.student_data)
            return (
                <div>
                    <NavLink to={"/Students/"}>Student Dash</NavLink>
                    <h1>Home</h1>
                    <div>{this.render_students()} </div>
                    <p>Home page body content</p>
                    <div>Add Students</div>
                    <div>Prepare</div>
                    <div>{this.renderPreparePanel()}</div>
                    <div></div>
                </div>
            );
        }
        else {
            return (
                <div>loading</div>
            )
        }
    }
}



