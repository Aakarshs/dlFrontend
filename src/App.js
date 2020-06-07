import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Dashboard from './components/Dashboard';
import LessonDetails from './components/LessonDetails';
import StudentLessons from './components/StudentLessons';
import Students from './components/Students';
import Error from './components/Error';
import Navigation from './components/Navigation';
import StudentsExercise from './components/StudentsExercise'
import Prepare from './components/Prepare'
import TeacherLogin from './components/TeacherLogin'
import StudentLogin from './components/StudentLogin'
import Home from './components/Home'
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/TeacherLogin" component={TeacherLogin}/>
            <Route path="/StudentLogin" component={StudentLogin}/>
             <Route path="/Dashboard" component={Dashboard}/>
             <Route path="/LessonDetails/:exercise_reference/:original_lesson_reference/:course_id" component={LessonDetails}/>
             <Route path="/StudentLessons/:student_id/:course_id" component={StudentLessons}/>
             <Route path="/Students/" component={Students}/>
             <Route path="/StudentsExercise/:course_id/:original_lesson_reference/:student_exercises_reference" component={StudentsExercise}/>
             <Route path="/Prepare/:course_id/:teacher_email" component={Prepare}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;