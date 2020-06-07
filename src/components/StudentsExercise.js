import React from 'react';
import { get_lesson_exercise_from_course, get_student_answers, post_answer } from "./Apis";
import { NavLink } from 'react-router-dom';
 

export default class StudentsExercise extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         student_data: "",
         data_loaded: false,
         student_id: '5ebd84cc9369f4644c4c3f46',
         course_id: props.match.params.course_id,
         original_lesson_reference: props.match.params.original_lesson_reference,
         student_exercises_reference: props.match.params.student_exercises_reference,
         question_to_render: 0,
         student_answers: ""
      };

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   componentWillMount(props) {
      get_lesson_exercise_from_course(this.state.course_id, this.state.original_lesson_reference)
         .then(data => {
            this.setState({ student_data: data }, () => this.getAnswers()
            )
         })
   }

   renderCourseDetails() {
      return this.state.student_data.map((item, index) => {
         return (
            <div>
               <div>{item.course_id}</div>
               <div>{item.lesson_details.map((item) => { return (<div>{item.lesson_name}</div>) })}</div>
            </div>
         )
      }
      )
   }

   goToNextQuestion() {
      this.setState({ question_to_render: this.state.question_to_render + 1 }, () => this.getAnswers())
   }

   getAnswers = () => {
      return get_student_answers(this.state.student_exercises_reference, this.state.student_data[this.state.question_to_render].question_id)
         .then(data => {
            return this.setState({ student_answers: data, data_loaded: true }, () => {
            })
         })
   }

   renderQuestion() {
      if (this.state.student_data[this.state.question_to_render].type == "mutliple_choice") {
         return (this.renderMultipleChoice(this.state.student_data[this.state.question_to_render]))
      }
      else if (this.state.student_data[this.state.question_to_render].type == "video") {
      }
   }

   renderAnswer() {
      if (this.state.student_answers == "0") {
         return (<div>Question not attempted, choose an answer. </div>)
      }
      else {
         return (<div>{this.state.student_answers.notes}</div>)
      }
   }


   renderMultipleChoice(data) {
      return (
         <div>
            {data.question_text}
            <div> {data.options.map(item => { return (<div>{item}</div>) })}</div>
         </div>
      )
   }

   renderVideo(data) {

   }

 
   handleSubmit(event) {
      post_answer(this.state.student_exercises_reference, this.state.student_data[this.state.question_to_render].question_id);

       event.preventDefault();
    }

   render() {
      if (this.state.data_loaded) {
         console.log("~~~~~~~~~~~~~~~")
         console.log(this.state.student_data)
         console.log("~~~~~~~~~~~~~~~")
         return (
            <div>
               <div>Student Exercises</div>
               <div>{this.state.question_to_render + 1}</div>
         of
               <div>{this.state.student_data.length}</div>
               <div>{this.renderQuestion()}</div>
               <div>{this.renderAnswer()}</div>
               <div onClick={() => { this.goToNextQuestion() }}> Next Question </div>
                <form onSubmit={this.handleSubmit}>
                        <input type="submit" value="Submit" />
                        </form>
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


