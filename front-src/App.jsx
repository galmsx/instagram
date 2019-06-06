import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/pages/auth";
import TokenGetter from "./tools/TokenGetter";
import Header from './components/Header';
import Feed from './components/pages/feed';

function App() {
  var signed = localStorage.getItem("token");
  if (signed) return (
    <>
  <Header />
  <Switch>
  <Route path="/" component={Feed} exact/>
  </Switch>
  </>
  );
  else
    return (
      <>
        <Header />
        <Switch>
          <Route path="/auth/:token" component={TokenGetter} />
          <Route path="/" component={Auth} />
        </Switch>
      </>
    );
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("app")
);
