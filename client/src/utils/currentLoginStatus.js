import Axios from "axios";
import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { promises } from "dns";

export default {
  checkStatus: () => {
    const token = Cookie.get("token");
    if (token) {
      // console.log(token);
      let decodedJWTToken = jwtDecode(token);
      let user_id = decodedJWTToken._id;
      // console.log(user_id);
      //Do a call for userInfo using token.
      return Axios.get(`/api/users/${user_id}`);
    } else {
      return Promise.reject("User Is not logged in.");
    }
  },
  login: () => {},
  logout: () => {}
};
