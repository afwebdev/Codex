import React from "react";

function Login(props) {
  return (
    <div>
      <form>
        <input type="text" name="email" placeholder="email"></input>
        <input type="password" name="password" placeholder="password"></input>
        <button onClick={props.test}></button>
      </form>
    </div>
  );
}

export default Login;
