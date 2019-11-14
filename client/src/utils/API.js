import axios from "axios";

export default {
  signUp: function(userInfo) {
    return axios.post("/api/users", userInfo);
  },
  signIn: function(userLogin) {
    return axios.post("/auth/signin/", userLogin);
  }
};
