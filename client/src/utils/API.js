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
  //Questions
  //category passed here is an object
  getQuestions: function(category) {
    //Nothing here.
    console.log("API UTILS CAT->", category);
    return axios.get("/api/questions", category);
  }
};
