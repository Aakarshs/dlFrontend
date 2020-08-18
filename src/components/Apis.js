import axios from "axios";

var backendUrl = "https://digitalleaders-backend.herokuapp.com";
//var teacher_id = "5ebc8992a3f643f9ea3a68f2"

export const get_student_fullname = (student_id) => {
  return axios
    .get(backendUrl + "/get_student_fullname/" + student_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
};

export const get_student_from_teacher = (teacher_id) => {
  return axios
    .get(backendUrl + "/get_student_from_teacher/" + teacher_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
};

export const get_student_details = (student_id) => {
  return axios
    .get(backendUrl + "/get_student_details_all/" + student_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}


export const get_students_by_course = (course_id) => {
  return axios
    .get(backendUrl + "/get_students_by_course/" + course_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_student_details_by_course = (student_id, course_id) => {
  return axios
    .get(backendUrl + "/get_student_details_by_course/" + student_id + "/" + course_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_teacher_courses = (teacher_id) => {
  return axios
    .get(backendUrl + "/get_teacher_courses/" + teacher_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}


export const get_student_exercises_by_exercise_reference = (exercise_reference) => {
  return axios
    .get(backendUrl + "/get_student_exercises_by_exercise_reference/" + exercise_reference)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const update_grade = (lesson_id) => {
  return axios
    .get(backendUrl + "/get_student_exercises_by_lesson_id/" + lesson_id)
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
    .get(backendUrl + "/get_lesson_by_reference/" + student_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}


export const get_student_lesson_by_reference = (student_id, original_lesson_reference) => {
  return axios
    .get(backendUrl + "/get_student_lesson_by_reference/" + student_id + "/" + original_lesson_reference)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_lesson_exercise_from_course = (course_id, lesson_id) => {
  return axios
    .get(backendUrl + "/get_lesson_from_course/" + course_id + "/" + lesson_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_student_answers = (student_exercise_id, question_id, student_id) => {
  return axios
    .get(backendUrl + "/get_student_answers/" + student_exercise_id + "/" + question_id + "/" + student_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_student_answers_from_teacher = (student_exercise_id, question_id, student_id) => {
  return axios
    .get(backendUrl + "/get_student_answers_from_teacher/" + student_exercise_id + "/" + question_id + "/" + student_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const get_lesson_from_course_for_prepare = (course_id) => {
  return axios
    .get(backendUrl + "/get_lesson_from_course_for_prepare/" + course_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const authenticate_teacher = (email_input, password_input) => {
  return axios
    .post(backendUrl + "/authenticate_teacher/", {
      Email: email_input,
      Password: password_input
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const authenticate_student = (email_input, password_input) => {
  return axios
    .post(backendUrl + "/authenticate_student/", {
      Email: email_input,
      Password: password_input
    })
    .then(response => {
        return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const post_answer = (exercise_id, question_id) => {
  return axios
    .post(backendUrl + "/post_answer/" + exercise_id + "/" + question_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const save_answer_upload = (exercise_id, index, notes, filename, file) => {
  upload_file(file);
  return axios
    .post(backendUrl + "/save_answer_upload/" + exercise_id + "/" + index, {
      notes: notes,
      filename: filename,
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const upload_file = (file) => {
  return axios
    .post(backendUrl + "/upload_file/", file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const save_answer = (exercise_id, index, notes, option_selected) => {
  return axios
    .post(backendUrl + "/save_answer/" + exercise_id + "/" + index, {
      notes: notes,
      option_selected: option_selected
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const save_grade = (exercise_id, index, grade) => {
  return axios
    .post(backendUrl + "/save_grade/" + exercise_id + "/" + index, {
      grade: grade,
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const create_student_profile = (teachers_id, fullname, email) => {
  return axios
    .post(backendUrl + "/create_student_profile/", {
      teachers_id: teachers_id,
      fullname: fullname,
      email: email,
    })
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const submitForGrading = (course_id, student_id, original_lesson_reference, student_exercises_reference) => {
  return axios
    .post(backendUrl + "/submitForGrading/" + course_id + "/" + student_id + "/" + original_lesson_reference + "/" + student_exercises_reference)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const submitFinalGrades = (course_id, student_id, original_lesson_reference, student_exercises_reference) => {
  return axios
    .post(backendUrl + "/submit_final_grades/" + course_id + "/" + student_id + "/" + original_lesson_reference + "/" + student_exercises_reference)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const show_dash_board = (teacher_id) => {
  return axios
    .get(backendUrl + "/show_dash_board/" + teacher_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const retrieve_file = (filename) => {
  return axios
    .post(backendUrl + "/retrieve_file/"+filename)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}

export const update_access_rights = (course_id,lesson_id,teacher_id) => {
  return axios
    .post(backendUrl + "/update_access_rights/"+course_id + "/" +lesson_id + "/" + teacher_id)
    .then(response => {
      return (response.data) //Return data if the function call was successful.
    }).catch(error => {
      console.log(error.response) //Log the error on the console if there was an error.
    });
}