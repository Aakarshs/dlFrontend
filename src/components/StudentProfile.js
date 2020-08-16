import React from 'react';
import { get_student_details, get_student_details_by_course } from "./Apis";
import { NavLink } from 'react-router-dom';

export default class StudentProfile extends React.Component {
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

  
    render() {
        if (this.state.data_loaded) {
            return (
                <div>
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