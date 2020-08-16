import React from 'react';
import { get_students_by_course, get_teacher_courses, get_student_from_teacher, show_dash_board, create_student_profile, upload_file } from "./Apis";
import { NavLink } from 'react-router-dom';
import '../styles/Dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            student_data: [],
            dashboard_data: "",
            data_loaded: false,
            teacher_id: props.match.params.teacher_id,
            student_list: '',
            teacher_courses: "",
            show_modal: false,
            newStudentEmail: "",
            newStudentFullname: ""
        };
    }

    componentWillMount() {
        show_dash_board(this.state.teacher_id)
            .then(data => {
                this.setState({ dashboard_data: data }, () => {
                })
            }).then(() => {
                get_teacher_courses(this.state.teacher_id).then(data => {
                    this.setState({ teacher_courses: data })
                })
            })
            .then(() => {
                get_student_from_teacher(this.state.teacher_id).then(dataa => {
                    this.setState({ student_list: dataa, data_loaded: true })
                })
            })
    }

    renderSubmittedStudents(data) {
        return <div className={'dashboard-inner-container'}> {data.map(course_data => {
            if (course_data.status == "grade-pending") {
                return (<NavLink className={'dashboard-student-name'} to={'/StudentGrading/' + course_data.course_id + "/" + course_data.original_lesson_reference + "/" + course_data.student_exercises_reference + "/" + course_data.student_id + "/" + this.state.teacher_id}>
                    {course_data.student_name}</NavLink>)
            }
            else {
                return (
                    <div><NavLink className={'dashboard-student-name-graded'} to={'/StudentGrading/' + course_data.course_id + "/" + course_data.original_lesson_reference + "/" + course_data.student_exercises_reference + "/" + course_data.student_id + "/" + this.state.teacher_id}>
                        <div>{course_data.student_name}</div>
                        <div className={"dash-graded-tag"}> Graded </div>
                    </NavLink>
                    </div>
                )
            }
        })}
        </div>
    }

    render_students() {
        var courses = Object.keys(this.state.dashboard_data[0])
        return (<div className={'dashboard-container'}>{
            courses.map(item => {
                return (
                    <div className={'dashboard-outer-container'} >
                        <div className={'course-name-dash'}>{item}</div>
                        <div>{this.renderSubmittedStudents(this.state.dashboard_data[0][item])}</div>
                    </div>
                )
            })
        } </div>)
    }

    showAllStudents() {
        return this.state.student_list.map(item => {
            if (item !== undefined) {
                return (
                    <div className={'dashboard-student-name'}>
                        <NavLink to={"/StudentDetails" + "/" + item.student_id + "/" + this.state.teacher_id}>{item.fullname}</NavLink>
                    </div>

                )
            }
        })
    }

    renderPreparePanel() {
        return this.state.teacher_courses.map(item => {
            return (
                <div className={"prepare-panel-courses"}>
                    <NavLink to={"/Prepare" + "/" + item.course_id + "/" + this.state.teacher_id}>{item.course_name}</NavLink>
                </div>
            )
        })
    }

    //--------------------Modal Functions----------------------//
    toggleStudentsModal() {
        this.setState({ show_modal: !this.state.show_modal })
        //create_student_profile(this.state.teacher_id,"Aakarsh Sinha", "aakarshs@outlook.com")
    }

    handleNewStudentFullname(e) {
        this.setState({ newStudentFullname: e.target.value })
    }

    handleNewStudentEmail(e) {
        this.setState({ newStudentEmail: e.target.value })
    }

    renderModal() {
        if (this.state.show_modal == true) {
            return (
                <div className={"add-student-modal"}>
                    <div onClick={() => { this.toggleStudentsModal() }} className={"cancel-button"}>close</div>
                    <div className={'add-student-form'}>
                        <div className={'modal-description'}>Add a student to the database.</div>
                        <div className={'modal-textarea-container'}>
                            <div className={'modal-textarea-description'}> Student Fullname </div>
                            <textarea className={'modal-textarea'} rows="1" onChange={(e) => { this.handleNewStudentFullname(e) }} value={this.state.newStudentFullname} />
                        </div>
                        <div className={'modal-textarea-container'}>
                            <div className={'modal-textarea-description'}> Student Email </div>
                            <textarea className={'modal-textarea'} rows="1" onChange={(e) => { this.handleNewStudentEmail(e) }} value={this.state.newStudentEmail} />
                        </div>
                        <div className={'add-student-button'} onClick={() => { this.addStudent() }}> Add Student </div>
                    </div>
                </div>
            )
        }
    }

    addStudent() {
        create_student_profile(this.state.teacher_id, this.state.newStudentFullname, this.state.newStudentEmail).then((data) => {
            if (data == "1") {
                alert("Student sucesfully added.");
                this.toggleStudentsModal();
            }
            else {
                alert("Error occured, please try again.");
                this.toggleStudentsModal();
            }
        })
    }
    //-----------------------------------------------//

    render() {
        if (this.state.data_loaded) {
            return (
                <div>
                    {/* ---- Nav Panel ---- */}
                    <div className={'dash-nav-panel'}>
                        <NavLink className={'dash-nav-button'} to={"/"}>Logout</NavLink>
                        <div className={'dash-nav-button'}> Q & A </div>
                    </div>
                    {/* ---------------- */}
                    <div className={'background'}></div>

                    <div className={'inner-container'}>
                        <div className={'dash-headings'}>
                            <div className={'dash-main-heading'}>Teacher Dashboard</div>
                            <div className={'dash-sub-heading'}>Recent Submissions</div>
                        </div>


                        <div >{this.render_students()} </div>
                        <div>{this.renderModal()} </div>
                        <div>
                            <div className={'dash-sub-content-heading'}>All Students</div>
                            <div className={'student-list-container'}>{this.showAllStudents()}</div>
                        </div>
                        <div className={'dash-sub-content-heading'}>Other Actions</div>
                        <div className="other-actions-container">
                            <div onClick={() => { this.toggleStudentsModal() }} className={'add-students-button'}>Add Students</div>
                            <div className={'prepare-for-course-container'}>
                                <div>Prepare for course</div>
                                <div>{this.renderPreparePanel()}</div>
                            </div>
                        </div>

                    </div>
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