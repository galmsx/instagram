import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom';
import Auth from './components/pages/auth'

function App(){
  var signed = localStorage.getItem("token");

  return (
  <>
  <Auth />
  </>
  );
}


ReactDOM.render(
  <Router><App/></Router>,
  document.getElementById('app')
);