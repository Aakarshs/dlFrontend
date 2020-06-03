import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Dashboard from './components/Dashboard';
import LessonDetails from './components/LessonDetails';
import StudentLessons from './components/StudentLessons';
import Students from './components/Students';
import Error from './components/Error';
import Navigation from './components/Navigation';
import StudentsExercise from './components/StudentsExercise'
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Dashboard} exact/>
             <Route path="/LessonDetails/:exercise_reference" component={LessonDetails}/>
             <Route path="/StudentLessons/:student_id/:course_id" component={StudentLessons}/>
             <Route path="/Students/" component={Students}/>
             <Route path="/StudentsExercise/:exercise_id" component={StudentsExercise}> </Route>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;