import React from 'react';
import { get_lesson_by_reference } from "./Apis";
import { NavLink } from 'react-router-dom';

export default class Students extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         student_id: '5ebd84cc9369f4644c4c3f46',
      };
   }

   componentWillMount(props) {
      //get lessons per course enrolled in.
      get_lesson_by_reference(this.state.student_id)
         .then(data => {
            this.setState({ student_data: data, data_loaded: true })
         })
   }

   renderCourseDetails() {
      return this.state.student_data.map((item, index) => {
         return (
            <div>
               <div>{item.course_id}</div>
               <div>{item.lesson_details.map((item) => {
                  return (
                     <div>
                        <NavLink to={"/StudentsExercise/" + item.original_lesson_reference}>{item.lesson_name}</NavLink>
                        </div>
                                        )
               })}</div>
            </div>
         )
      }
      )
   }



   render() {
      if (this.state.data_loaded) {
         return (
            <div>
               {this.renderCourseDetails()}
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


