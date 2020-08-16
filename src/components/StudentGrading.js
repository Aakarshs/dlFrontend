import React from 'react';
import { get_lesson_exercise_from_course, get_student_answers, post_answer, submitFinalGrades, save_grade } from "./Apis";
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import '../styles/StudentsExercise.css';

export default class StudentsExercise extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         student_data: "",
         data_loaded: false,
         student_id: props.match.params.student_id,
         course_id: props.match.params.course_id,
         original_lesson_reference: props.match.params.original_lesson_reference,
         student_exercises_reference: props.match.params.student_exercises_reference,
         question_to_render: 0,
         teacher_id: props.match.params.teacher_id,
         student_answers: "",
         exercise_submitted: false,
         options_selected: [],
         notes: "",
         save_status_array: [],
         grade: 0,
         filename: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.saveGrade = this.saveGrade.bind(this);
   }

   componentWillMount(props) {
      get_lesson_exercise_from_course(this.state.course_id, this.state.original_lesson_reference)
         .then(data => {
            this.setState({ student_data: data }, () => this.getAnswers()
            )
         }
         )
   }

   getAnswers = () => {
      return get_student_answers(this.state.student_exercises_reference, this.state.student_data[this.state.question_to_render].question_id, this.state.question_to_render)
         .then(data => {
            return this.setState({ student_answers: data, data_loaded: true }, () => {
               this.setState({
                  options_selected: this.state.student_answers.option_selected,
                  grade: this.state.student_answers.grade,
                  notes: this.state.student_answers.notes,
                  filename: this.state.student_answers.filename
               })
            })
         }
         )
   }

   renderCourseDetails() {
      return this.state.student_data.map((item, index) => {
         return (
            <div>
               <div>{item.course_id}</div>
               <div>{item.lesson_details.map((item) => { return (<div>{item.lesson_name}</div>) })}</div>
            </div>
         )
      })
   }

   goToNextQuestion() {
      this.setState({
         question_to_render: this.state.question_to_render + 1,

      }, () => this.getAnswers())
   }

   goToPreviousQuestion() {
      this.setState({
         question_to_render: this.state.question_to_render - 1,
      }, () => this.getAnswers())
   }

   renderQuestion() {
      if (this.state.student_data[this.state.question_to_render].type == "mutliple_choice") {
         return (this.renderMultipleChoice(this.state.student_data[this.state.question_to_render]))
      }
      else if (this.state.student_data[this.state.question_to_render].type == "video") {
         return (this.renderVideo(this.state.student_data[this.state.question_to_render]))
      }
      else if (this.state.student_data[this.state.question_to_render].type == "upload_answer") {
         return (this.renderUploadAnswer(this.state.student_data[this.state.question_to_render]))
      }
   }

   selectOptionHelper(item) {
      var options_selected = this.state.options_selected;
      if (!options_selected.includes(item)) {
         options_selected.push(item)
      }
      else {
         options_selected = options_selected.filter(e => e !== item);
      }
      this.setState({ options_selected: options_selected })
   }

   renderMultipleChoice(data) {
      return (
         <div className={'multiple-choice-container'}>
            <div className={'multiple-choice-inner-container'}>
               <div className={'multiple-choice-question'}>{data.question_text} </div>
               <div> {data.options.map(item => {
                  if (this.state.options_selected.includes(item)) {
                     return (<div className={'multiple-choice-options'}>{item}</div>)
                  }
                  else {
                     return (<div className={'multiple-choice-options-selected'}>{item}</div>)
                  }
               })}
               </div>
            </div>
         </div>
      )
   }

   updateNotes(e) {
      this.setState({ notes: e.target.value })
   }

   renderVideo(data) {
      return (
         <div className={'video-exercise'}>
            <div className={'frame-container'}>
               <iframe className={'iframe'} src='https://www.youtube.com/embed/E7wJTI-1dvQ' />
            </div>
            {data.question_text}
         </div>
      )
   }

   renderUploadAnswer(data) {
      return (
         <div>
            <div className={'upload-question-canvas'}>{data.question_text}</div>
            <div> <a target="_blank" className={'download-uploaded-file-button'} href={"http://127.0.0.1:5000/retrieve_file/" + this.state.filename} download>Download solution Uploaded by Student</a> </div>
         </div>
      )
   }

   handleSubmit(event) {
      post_answer(this.state.student_exercises_reference, this.state.student_data[this.state.question_to_render].question_id);
      event.preventDefault();
   }

   saveGrade(event) {
      save_grade(this.state.student_exercises_reference, this.state.question_to_render, this.state.grade).then((data) => {
         var save_status_array = this.state.save_status_array
         save_status_array[this.state.question_to_render] = data
         return (this.setState({ save_status: data, save_status_array: save_status_array }))
      });
      event.preventDefault();
   }

   submitForGrading() {
      submitFinalGrades(this.state.course_id, this.state.student_id, this.state.original_lesson_reference, this.state.student_exercises_reference)
         .then((data) => {
            this.setState({ exercise_submitted: data })
         }
         )
   }

   renderMeter() { }

   renderSaveStatus() {
      if (this.state.save_status_array[this.state.question_to_render] == "1") {
         return (<div className={'exercise-button-saved'}>Saved</div>)
      }
      else {
         return (
            <div className={'exercise-button'} onClick={this.saveGrade}>Save Grade</div>
         )
      }
   }

   updateGrade(e) {
      this.setState({ grade: e.target.value })
   }

   render() {
      if (this.state.exercise_submitted == "1") {
         return <Redirect to={'/Dashboard/' + this.state.teacher_id} />
      }
      if (this.state.data_loaded) {
         console.log(this.state.student_answers)
         return (
            <div>
               {/* ---- Nav Panel ---- */}
               <div className={'nav-panel'}>
                  <NavLink className={'nav-button'} to={'/Dashboard/' + this.state.teacher_id}>Home</NavLink>
                  <div className={'nav-button'}> Q & A </div>
               </div>
               {/* ------------------ */}
               <div className={'exercise-background'}> </div>
               <div className={'grading-heading'}>Exercises</div>

               <div className={'canvas-container'}>
                  <div className={"question-meter"}>{this.state.question_to_render + 1} of {this.state.student_data.length}</div>
                  <div className={"how-to-grade-description"}>Input the grade in the text area below and click on SAVE GRADE button below to save the grade.</div>
                  <textarea rows="1" className={'grade-textarea'} value={this.state.grade} onChange={(e) => { this.updateGrade(e) }} />

                  <div className={"question-container"}>{this.renderQuestion()}</div>
                  {/*<div className={'question-container'}>{this.renderAnswer()}</div>*/}
                  <div className={"exercise-nav-panel"}>
                     <div className={'exercise-button'} onClick={() => { this.goToPreviousQuestion() }}> Previous Question </div>
                     <div className={'exercise-button'} onClick={() => { this.goToNextQuestion() }}> Next Question </div>
                     <div>{this.renderSaveStatus()}</div>
                     <div className={'exercise-button'} onClick={() => { this.submitForGrading() }}>Submit Grades</div>
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


