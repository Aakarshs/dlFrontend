import React from 'react';
import { get_lesson_by_reference, get_student_lesson_by_reference } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import '../styles/StudentDetails.css';

export default class StudentDetails extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         student_id: props.match.params.student_id,
         teacher_id: props.match.params.teacher_id,
         course_id: "",
         toExercises: false,
         lesson_reference: "",
         student_exercises_reference: "",
         original_lesson_reference: "",
         teacher_id: ""
      };
   }

   componentWillMount(props) {
      get_lesson_by_reference(this.state.student_id)
         .then(data => {
            this.setState({ student_data: data, data_loaded: true, teacher_id: data[0].teacher_id })
         })
   }

   findStudentLessonIdBy(original_lesson_reference, course_id) {
      get_student_lesson_by_reference(this.state.student_id, original_lesson_reference).then(data => {
         this.setState({ lesson_reference: data[0], exercise_reference: data[1], toExercises: true, course_id: course_id, original_lesson_reference: original_lesson_reference })
      })
   }

   renderCourseDetailsNew() {
      return (this.state.student_data.map((item, index) => {
         return (<div className={"student-details-courses"}>
            <div className={"course_name"}> {item.course_name} </div>
            {item.lesson_data.map((item) => {
               if (!item.access_rights.includes(this.state.teacher_id)) {
                  return (
                     <div className={'student-not-accessible'}>
                        <div className={'student-detail-lesson-title'}>{item.lesson_title} </div>
                        <div className={'status-not-accessible'}>Not accessible to student</div>
                     </div>)
               }
               else {
                  return (
                     <div onClick={() => { this.findStudentLessonIdBy(item.lesson_id, this.state.student_data[index].course_id) }} className={'student-container'}>
                        <div className={'student-detail-lesson-title'}> {item.lesson_title} </div>
                        {this.renderGrade(item.status,item.grade)}
                     </div>
                  )
               }
            })}
         </div>
         )
      }))
   }

   renderGrade(status,grade){
      if (status == "graded"){
      return (
      <div className={'status-container'}>
         <div className={'status'}>{status}</div>
         <div className={'grade'}>{grade} %</div>
      </div>
      )}
      else if (status == "0"){
        return (<div className={'status'}>Not Started</div>)
      }
      else{
         return (<div className={'status'}>{status}</div>)
      }
   }

   render() {
      console.log(this.state.student_data)
      if (this.state.toExercises) {
         var redirectLink = '/StudentGrading/' + this.state.course_id + "/" + this.state.original_lesson_reference + "/" + this.state.exercise_reference + "/" + this.state.student_id + "/" + this.state.teacher_id
         return <Redirect to={redirectLink} />
      }
      if (this.state.data_loaded) {
         return (
            <div className={'main-background-course-details'}>

               {/* ---- Nav Panel ---- */}
               <div className={'nav-panel'}>
                  <NavLink className={'nav-button'} to={"/Dashboard/" + this.state.teacher_id}>Home</NavLink>
                  <div className={'nav-button'}> Q & A </div>
               </div>
               {/* ---------------- */}

               <div className={'background-course-details'}>
               </div>
               <div className={""}>
                  <div className={"course-container"}>
                     <div className={"heading"}>Details</div>
                     <div className={"course-details"}>{this.renderCourseDetailsNew()}</div>
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


