export default storeUserStatus = user => {
  let { _id, username, user_firstName, user_lastName, user_email } = user;
  //fix the state to store everything.
  setUserStatus(prevState => ({
    loggedIn: true,
    prevState
  }));
  history.push("/");
};
