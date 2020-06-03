import React from 'react';
import { get_student_exercises_by_exercise_reference, get_student_details_by_course } from "./Apis";

export default class LessonDetails extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         exercise_reference: props.match.params.exercise_reference,
         student_id: props.match.params.student_id,
         student_data: "",
         data_loaded: false
      };
   }

   componentWillMount(props) {
      console.log(this.state.lesson_id, this.state.student_id)
      get_student_exercises_by_exercise_reference(this.state.exercise_reference).then(data => {
         this.setState({ student_data: data, data_loaded: true })
      })
   }

   renderLessonDetails() {
      return (
         this.state.student_data.details.map((item,index) => {
            return (
               <div>
                  <textarea>{item.grade}</textarea>
                  <div>{item.notes}</div>
               </div>
            )
         })
      )
   }


   render() {
      if (this.state.data_loaded) {
         console.log(this.state.student_data)
         return (
            <div>
               <div>{this.state.student_data.lesson_name}</div>
               <div>{this.renderLessonDetails()}</div>
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


