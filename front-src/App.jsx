import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/pages/auth";
import TokenGetter from "./tools/TokenGetter";

function App() {
  var signed = localStorage.getItem("token");
  if (signed) return (
  <h1>signed</h1>
  );
  else
    return (
      <div>
        <Switch>
          <Route path="/auth/:token" component={TokenGetter} />
          <Route path="/" component={Auth} />
        </Switch>
      </div>
    );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
