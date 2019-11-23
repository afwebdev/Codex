import axios from "axios";

export default {
  //Sign IN/UP
  //userInfo passed here is an object.
  signUp: function(userInfo) {
    return axios.post("/api/users", userInfo);
  },
  //userLogin passed here is an object.
  signIn: function(userLogin) {
    return axios.post("/auth/signin", userLogin);
  },
  signOut: function() {
    return axios.get("/auth/signout");
  },
  //Questions
  //category passed here is an object
  getQuestions: function(category) {
    console.log("API UTILS CAT->", category);
    return axios.get("/api/questions", {
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        category
      }
    });
  },

  // Post an answer
  postAnswer: function(answer) {
    return axios.post("/api/answers", answer);
  },
  // Answers Page. On component mount get answers for that question.
  getQuestionAnswers: function(questionID) {
    return axios.get(`/api/question/${questionID}`);
  },

  // Answers Page. Post a reply to an answer
  postReply: function(comment) {
    return axios.post("/api/comment", comment);
  },

  getQuestionByUser: function(user) {
    return axios.get("/api/questions", user);
  },
  getAnswersByUser: function(user) {
    return axios.get("/api/answers", user);
  }

  // getUserInfo: function(userId) {
  //   return axios.get("/api/users", {
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     params: {
  //       userId
  //     }
  //   });
  // }
};
