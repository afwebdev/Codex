import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    username: "",
    user_firstName: "",
    user_lastName: "",
    user_id: ""
  });
  return (
    <LoginContext.Provider value={[userStatus, setUserStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
};
