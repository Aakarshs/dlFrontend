import React from 'react';
import { get_lesson_from_course_for_prepare,update_lesson_visibility } from "./Apis";
import { NavLink } from 'react-router-dom';

export default class Prepare extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         course_id: props.match.params.course_id,
         lessons:"",
         teacher_email:props.match.params.teacher_email,
      };
   }

   componentWillMount(props) {
    get_lesson_from_course_for_prepare(this.state.course_id).then(data=>{
        return (this.setState({lessons:data,data_loaded:true}))
    })
   }

   renderLesson(){
       return (this.state.lessons.map(item=>{
       return (<div>
           {item.lesson_title}
           <div>Go to lesson plan</div>
           <div onClick={update_lesson_visibility('5ebc8152c3f42f33a3d98bea','5ebc8152c3f42f33a3d98be0')}>Make available to students</div>
           <div>Look at questions</div>
           <div>-----</div>
           </div>)

           }
       ))
   }


   render() {
      if (this.state.data_loaded) {
        console.log(this.state.lessons)

         return (
            <div>
                {this.renderLesson()}
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


