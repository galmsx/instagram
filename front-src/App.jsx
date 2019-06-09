import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/pages/auth";
import TokenGetter from "./tools/TokenGetter";
import Header from './components/Header';
import Feed from './components/pages/feed';
import Userpage from './components/pages/userpage';
import Search from './components/pages/search';

function App() {
  var signed = localStorage.getItem("token");
  if (signed) return (
    <>
  <Header />
  <Switch>
  <Route path="/" component={Feed} exact/>
  <Route path="/user/:id" component={Userpage} exact/>
  <Route path="/search/:qu" component={Search} />
  </Switch>
  </>
  );
  else
    return (
      <>
        <Header />
        <Switch>
          <Route path="/auth/:token" component={TokenGetter} />
          <Route path="/user/:id" component={Userpage} exact/>
          <Route path="/search/:qu" component={Search} />
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
