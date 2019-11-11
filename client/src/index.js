const React = require("react");
const ReactDOM = require("react-dom");
import "./index.css";
import App from "./App";
const registerServiceWorker = require("./registerServiceWorker");
const { browserRouter } = require("react-router-dom");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
