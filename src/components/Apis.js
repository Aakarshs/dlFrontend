import axios from "axios";

var backendUrl = "http://127.0.0.1:5000";
var teacher_id = "5ebc8992a3f643f9ea3a68f2"


export const get_student_from_teacher = () => {
    return axios
      .get(backendUrl + "/get_student_from_teacher/"+teacher_id)
      .then(response => { 
        return (response.data) //Return data if the function call was successful.
      }).catch(error => {
        console.log(error.response) //Log the error on the console if there was an error.
      });
  };

  export const get_student_details = (student_id) => {
    return axios
    .get(backendUrl + "/get_student_details_all/"+student_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }


  export const get_students_by_course = (course_id) => {
    return axios
    .get(backendUrl + "/get_students_by_course/"+course_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }

  export const get_student_details_by_course = (student_id,course_id) => {
    return axios
    .get(backendUrl + "/get_student_details_by_course/"+student_id+"/"+course_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }

  export const get_teacher_courses = () => {
    return axios
    .get(backendUrl + "/get_teacher_courses/"+teacher_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }


  export const get_student_exercises_by_exercise_reference = (exercise_reference) => {
    return axios
    .get(backendUrl + "/get_student_exercises_by_exercise_reference/"+exercise_reference)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }


  export const update_grade = (lesson_id) => {
    return axios
    .get(backendUrl + "/get_student_exercises_by_lesson_id/"+lesson_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }


  //=========================//
  //Student APIS//



  export const get_lesson_by_reference = (student_id) => {
    return axios
    .get(backendUrl + "/get_lesson_by_reference/"+student_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }


  export const get_exercise_by_reference = (exercise_id) => {
    return axios
    .get(backendUrl + "/get_exercise_by_reference/"+exercise_id)
    .then(response => { 
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
  }

  

  