import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    username: null,
    user_firstName: null,
    user_lastName: null,
    user_id: null
  });
  return (
    <LoginContext.Provider value={[userStatus, setUserStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
};
