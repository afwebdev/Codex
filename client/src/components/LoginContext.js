import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    user_username: null,
    user_firstName: null,
    user_lastName: null,
    user_id: null,
    user_country: null
  });
  return (
    <LoginContext.Provider value={[userStatus, setUserStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
};
