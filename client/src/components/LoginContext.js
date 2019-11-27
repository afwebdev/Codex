import React, { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    user: {
      username: "",
      user_firstName: "",
      user_lastName: "",
      user_id: "",
      user_country: "",
      dex: 0
    }
  });
  return (
    <LoginContext.Provider value={[userStatus, setUserStatus]}>
      {props.children}
    </LoginContext.Provider>
  );
};
