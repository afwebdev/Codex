import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";

import "./App.css";

//Component Imports
import Login from "./components/Login";

class App extends Component {
  test(e) {
    e.preventDefault();
    console.log("HEY");
  }

  render() {
    return (
      <div className="App">
        <h1>APP</h1>
        <Route exact path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
