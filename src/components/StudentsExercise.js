import React from 'react';
import { get_exercise_by_reference } from "./Apis";

export default class StudentsExercise extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         student_id:'5ebd84cc9369f4644c4c3f46',
      };
   }

   componentWillMount(props) {    
       //get lessons per course enrolled in.
       get_lesson_by_reference(this.state.student_id)
       .then(data => {
           this.setState({ student_data: data, data_loaded:true })
       })
   }

   renderCourseDetails(){
      return this.state.student_data.map((item, index) => {
         return (
             <div>
                 <div>{item.course_id}</div>
         <div>{item.lesson_details.map((item)=>{return (<div>{item.lesson_name}</div>)})}</div>
             </div>
         )}
     )
 }

   render() {
      if (this.state.data_loaded) {
         return (
            <div>Student Exercises</div>
         );
      }
      else {
         return (
            <div>loading</div>
         )
      }
   }
}


