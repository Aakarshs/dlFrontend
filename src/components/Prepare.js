import React from 'react';
import { get_lesson_from_course_for_prepare, update_access_rights } from "./Apis";
import { NavLink } from 'react-router-dom';
import '../styles/Prepare.css';


export default class Prepare extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         course_id: props.match.params.course_id,
         lessons: "",
         teacher_id: props.match.params.teacher_id,
         access_right_update_success: ""
      };
   }

   componentWillMount(props) {
      get_lesson_from_course_for_prepare(this.state.course_id).then(data => {
         return (this.setState({ lessons: data, data_loaded: true }))
      })
   }

   renderAccessRightsIndicator(access_rights_list) {
      if (access_rights_list.includes(this.state.teacher_id) || this.state.access_right_update_success == "1") {
         return (<div>Students have access</div>)
      }
      else {
         return (<div>Students do not have acesss</div>)
      }
   }

   getUpdatedAccessRights(){
      get_lesson_from_course_for_prepare(this.state.course_id).then(data => {
         return (this.setState({ lessons: data, data_loaded: true }))
      })
   }

   renderLesson() {
      return (this.state.lessons.map(item => {
         return (<div className={'lesson'}>
            <div className={'prepare-lesson-title'}>{item.lesson_title} </div>
            <div className={'access-right-notifier'}>{this.renderAccessRightsIndicator(item.access_rights)}</div>
            <div className={'lesson-button-container'}>
               <div className={'lesson-button'}>Go to lesson plan</div>
              
               <div className={'lesson-button'} onClick={()=>
                  update_access_rights(this.state.course_id, item.lesson_id, this.state.teacher_id).then(() => {
                     this.getUpdatedAccessRights()
                  })}>Click here to toggle access</div>
               <div className={'lesson-button'}>Look at questions</div>
            </div>
         </div>
         )
      }
      ))
   }

   render() {
      if (this.state.data_loaded) {
         console.log(this.state.access_right_update_success)

         return (
            <div>
                   {/* ---- Nav Panel ---- */}
                   <div className={'nav-panel'}>
                  <NavLink className={'nav-button'} to={"/Dashboard/"+this.state.teacher_id}>Home</NavLink>
                  <div className={'nav-button'}> Q & A </div>
               </div>
               {/* ---------------- */}
               <div className={'prepare-title'}>Prepare</div>
            <div className={'prepare-background'}></div>

            <div className={'all-lesson-prepare'}>
               {this.renderLesson()}
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


