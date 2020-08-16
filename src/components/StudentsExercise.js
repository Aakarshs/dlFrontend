import React from 'react';
import { get_lesson_exercise_from_course, get_student_answers, post_answer, submitForGrading, save_answer, upload_file, retrieve_file, save_answer_upload } from "./Apis";
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
         student_answers: "",
         exercise_submitted: false,
         options_selected: [],
         notes: "",
         save_status: "0",
         save_status_array: [],
         selectedFile: { name: "no file uploaded" },
         fileData: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.saveAnswer = this.saveAnswer.bind(this);
   }

   componentWillMount(props) {
      get_lesson_exercise_from_course(this.state.course_id, this.state.original_lesson_reference)
         .then(data => {
            this.setState({ student_data: data, save_status_array: Array(this.state.student_data.length).fill("0") }, () => this.getAnswers()
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
      this.setState({ data_loaded: false }) //To reload data and give it some time to get data from the backend. 
      if (this.state.student_data.length > this.state.question_to_render + 1) {
         this.setState({
            question_to_render: this.state.question_to_render + 1,
         }, () => this.getAnswers())
      }
      else {
         alert("This was the last question.")
      }
   }

   goToPreviousQuestion() {
      if (this.state.question_to_render > 0) {
         this.setState({
            question_to_render: this.state.question_to_render - 1,
         }, () => this.getAnswers())
      }
      else {
         alert("No questions before this!")
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


   //=============================Question Renderers===================================//

   renderQuestion() {
      if (this.state.student_data[this.state.question_to_render].type == "mutliple_choice") {
         return (this.renderMultipleChoice(this.state.student_data[this.state.question_to_render]))
      }
      else if (this.state.student_data[this.state.question_to_render].type == "video") {
         return (this.renderVideo(this.state.student_data[this.state.question_to_render]))
      }
      else if (this.state.student_data[this.state.question_to_render].type == "upload_answer") {
         return (this.renderUpload(this.state.student_data[this.state.question_to_render]))
      }
   }

   renderMultipleChoice(data) {
      return (
         <div className={'multiple-choice-container'}>
            <div className={'multiple-choice-inner-container'}>
               <div className={'multiple-choice-question'}>{data.question_text} </div>
               <div> {data.options.map(item => {
                  if (this.state.options_selected !== undefined) {
                     if (this.state.options_selected.includes(item)) {
                        return (<div onClick={() => { this.selectOptionHelper(item) }} className={'multiple-choice-options'}>{item}</div>)
                     }
                     else {
                        return (<div onClick={() => { this.selectOptionHelper(item) }} className={'multiple-choice-options-selected'}>{item}</div>)
                     }
                  }
               })}
               </div>
            </div>
            <textarea rows={200} columns={400} className={'notes'} onChange={(e) => this.updateNotes(e)} value={this.state.notes} />
         </div>
      )
   }

   renderUpload(data) {
      return (
         <div className={'multiple-choice-container'}>
            <div className={'upload-choice-inner-container'}>
               <div className={'multiple-choice-question'}>{data.question_text} </div>
            </div>
           
            <div className={'upload-panel'}>
                  <label for="upload-photo">Upload File</label>
                  <input className="input-button" onChange={this.onFileChange} type="file" id="upload-photo" />
                  <div>{this.renderUploadButton()}</div>
               </div>
          
            <textarea rows={200} columns={400} className={'notes'} onChange={(e) => this.updateNotes(e)} value={this.state.notes} />

         </div>
      )
   }

   renderVideo(data) {
      return (
         <div className={'video-exercise'}>
            <div className={'frame-container'}>
               <iframe className={'iframe'} src='https://www.youtube.com/embed/E7wJTI-1dvQ' />
               <div className={'notes-container'}>
                  <textarea rows={200} columns={400} onChange={(e) => this.updateNotes(e)} className={'notes'} value={this.state.notes} />
               </div>
            </div>
            {data.question_text}
         </div>
      )
   }

   //-------------------------------------------------------

   updateNotes(e) {
      this.setState({ notes: e.target.value })
   }

   renderUploadButton() {
      if (this.state.filename == "") {
         return (<div></div>)
      }
      else {
         return (
            <a target="_blank" href={"http://127.0.0.1:5000/retrieve_file/" + this.state.filename} download>Download Previously Uploaded File</a>
         )
      }
   }

   //------------- File Handlers -----------------//
   onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] },() => this.saveAnswerUpload());
   };

   handleFile() {
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      data.append('filename', this.state.selectedFile.name);
      return data
   }
   //--------------------------------------------//

   handleSubmit(event) {
      post_answer(this.state.student_exercises_reference, this.state.student_data[this.state.question_to_render].question_id);
      event.preventDefault();
   }

   saveAnswer(event) {
      save_answer(this.state.student_exercises_reference, this.state.question_to_render, this.state.notes, this.state.options_selected).then((data) => {
         var save_status_array = this.state.save_status_array
         save_status_array[this.state.question_to_render] = data
         return (this.setState({ save_status: data, save_status_array: save_status_array }))
      });
      event.preventDefault();
   }

   saveAnswerUpload() {
      save_answer_upload(this.state.student_exercises_reference, this.state.question_to_render, this.state.notes, this.state.selectedFile.name, this.handleFile()).then((data) => {
         var save_status_array = this.state.save_status_array
         save_status_array[this.state.question_to_render] = data
         return (this.setState({ save_status: data, save_status_array: save_status_array, }, 
            ()=>{ 
               //if upload sucessfull, update filename and show an alert.
               if (save_status_array[this.state.question_to_render] == "1") {
               this.setState({filename: this.state.selectedFile.name})
               alert("File has been sucessfully uploaded.")
         }}))
      });
   }

   submitForGrading() {
      submitForGrading(this.state.course_id, this.state.student_id, this.state.original_lesson_reference, this.state.student_exercises_reference)
         .then((data) => {
            this.setState({ exercise_submitted: data })
         })
   }

   renderMeter() { }

   renderSaveStatus() {
      if (this.state.save_status_array[this.state.question_to_render] == "1") {
         return (<div className={'exercise-button-saved'}>Saved</div>)
      }
      else {
         return (
            <div className={'exercise-button'} onClick={this.saveAnswer}>Save Progress</div>
         )
      }
   }


   render() {
      if (this.state.exercise_submitted == "2") {
         return <Redirect to={'/Students/' + this.state.student_id} />
      }
      if (this.state.data_loaded) {
         return (
            <div>
               {/* ---- Nav Panel ---- */}
               <div className={'nav-panel'}>
                  <NavLink className={'nav-button'} to={"/Students/" + this.state.student_id}>Home</NavLink>
                  <div className={'nav-button'}> Q & A </div>
               </div>
               {/* ---------------- */}
               <div className={'exercise-background'}> </div>
               <div className={'heading'}>Exercises</div>
               <div className={'canvas-container'}>
                  <div className={"question-meter"}>{this.state.question_to_render + 1} of {this.state.student_data.length}</div>
                  <div className={"question-container"}>{this.renderQuestion()}</div>
                  {/*<div className={'question-container'}>{this.renderAnswer()}</div>*/}
                  <div className={"exercise-nav-panel"}>
                     <div className={'exercise-button'} onClick={() => { this.goToPreviousQuestion() }}> Previous Question </div>
                     <div className={'exercise-button'} onClick={() => { this.goToNextQuestion() }}> Next Question </div>
                     <div>{this.renderSaveStatus()}</div>
                     <div className={'exercise-button'} onClick={() => { this.submitForGrading() }}>Submit For Grading</div>
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


