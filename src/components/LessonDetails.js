import React from 'react';
import { get_student_exercises_by_exercise_reference, get_lesson_exercise_from_course } from "./Apis";

export default class LessonDetails extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         exercise_reference: props.match.params.exercise_reference,
         course_id: props.match.params.course_id,
         original_lesson_reference: props.match.params.original_lesson_reference,
         student_id: props.match.params.student_id,
         student_id: props.match.params.student_id,
         student_data: "",
         data_loaded: false,
         original_lesson: ""
      };
   }

   componentWillMount(props) {
      console.log(this.state.lesson_id, this.state.student_id)
      get_student_exercises_by_exercise_reference(this.state.exercise_reference).then(data => {
         this.setState({ student_data: data, })
      })
      get_lesson_exercise_from_course(this.state.course_id, this.state.original_lesson_reference).then(data => {
         this.setState({ original_lesson: data, data_loaded: true  })
      })
   }

   renderLessonDetails() {
      return (
         this.state.student_data.details.map((item, index) => {
            return (
               <div>
                  <textarea>{item.grade}</textarea>
                  <div>{item.notes}</div>
               </div>
            )
         })
      )
   }

   renderOriginalLesson() {
      return (
         this.state.original_lesson.map(item => {
            return (<div>{item.question_text}</div>)
         })
      )
   }


   render() {
      if (this.state.data_loaded) {
         console.log("4234234324")
         console.log(this.state.original_lesson)
         console.log("3453454")
         return (
            <div>
               <div>{this.renderLessonDetails()}</div>
               <div>{this.renderOriginalLesson()}</div>
               <button>Submit</button>
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


