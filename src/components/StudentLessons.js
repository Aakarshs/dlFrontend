import React from 'react';
import { get_student_details, get_student_details_by_course } from "./Apis";
import { NavLink } from 'react-router-dom';

export default class StudentLessons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student_id: props.match.params.student_id,
            course_id: props.match.params.course_id,
            student_data: "",
            data_loaded: false
        };
    }

    componentWillMount(props) {
        console.log(this.state.student_id, this.state.course_id)
        get_student_details_by_course(this.state.student_id, this.state.course_id).then(data => {
            this.setState({ student_data: data, data_loaded: true })
        })
    }

    renderStudentLessons() {
        if (this.state.student_data != "0") {
            return (
                this.state.student_data.lesson_details.map(item => {
                    return ( 
                        <NavLink to={"/LessonDetails/" + item.student_exercises_reference + "/" + item.original_lesson_reference + "/" + this.state.course_id }>{item.lesson_name}</NavLink>
                    )
                })
            )}
        else {
            return (<div>Student has not attempted this yet</div>)
        }

    }

    render() {
        if (this.state.data_loaded) {
            console.log("=======")
            console.log(this.state.student_data)
            console.log("=======")
            return (
                <div>
                    <div>Lessons</div>
                    <div>{this.renderStudentLessons()}</div>
                </div>
            );
        }
        else {
            return (
                <div>loading</div>
            )}
    }
}


/*
teacher -> prepare_lessons -> all_lessons_in_course -> see_document/click_on_lesson
student -> courses_enrolled_in -> lessons_available_to_take
*/