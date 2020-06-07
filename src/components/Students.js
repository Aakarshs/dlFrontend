import React from 'react';
import { get_lesson_by_reference,get_student_lesson_by_reference } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";

export default class Students extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         student_id: '5ebd84c99369f4644c4c3f44',
         course_id: "",
         toExercises: false,
         lesson_reference:"",
         student_exercises_reference:"",
         original_lesson_reference:""
      };
   }

   componentWillMount(props) {
      get_lesson_by_reference(this.state.student_id)
         .then(data => {
            this.setState({ student_data: data, data_loaded: true })
         })
   }

   findStudentLessonIdBy(original_lesson_reference,course_id){
      get_student_lesson_by_reference(this.state.student_id,original_lesson_reference).then(data=>{
         this.setState({lesson_reference:data[0],exercise_reference:data[1],toExercises:true,course_id:course_id,original_lesson_reference:original_lesson_reference})
      })
    
   }

   renderCourseDetailsNew() {
      return (this.state.student_data.map((item,index) => {
         return (<div>
            {item.course_id}
            {item.lesson_data.map((item) => {
               return (
                   <div onClick={()=>{this.findStudentLessonIdBy(item.lesson_id,this.state.student_data[index].course_id)}}>{item.lesson_title} </div>
                )
            })}

         </div>)
      }

      )
      )
   }


   render() {
      if (this.state.toExercises) {
         var redirectLink = '/StudentsExercise/' + this.state.course_id + "/" + this.state.original_lesson_reference + "/" + this.state.exercise_reference
         return <Redirect to = {redirectLink}/>
       }
      if (this.state.data_loaded) {
         console.log("===================")
         console.log(this.state.student_data)
         console.log("===================")
         return (
            <div>
               {this.renderCourseDetailsNew()}
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


