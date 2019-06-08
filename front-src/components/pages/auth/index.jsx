import React from "react";
import Toggler from "./Toggler";
import sha256 from "sha256";
const {redirect_uri,client_id} = require('../../../../config.json').Google;

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      login: "",
      pass: "",
      warning: "",
      email: ""
    };
    this.setLogin = this.setLogin.bind(this);
    this.changeHandle = this.changeHandle.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }
  setLogin(value) {
    this.setState({ isLogin: value });
  }
  changeHandle(ev) {
    if (ev.target.id == "login") {
      this.setState({ login: ev.target.value });
    } else if (ev.target.id == "pass") {
      this.setState({ pass: ev.target.value });
    } else {
      this.setState({ email: ev.target.value });
    }
  }
  submitHandle(ev){
    ev.preventDefault();
    if (this.state.isLogin) this.login();
    else this.register();
  }
  login(){
    const login = this.state.login;
    const password = sha256(this.state.pass);
    fetch('/auth/login',{
      method : "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({login,password})
    })
    .then(res=>res.json())
    .then(res=>{
      if(!res.token) this.setState({warning : res.message});
      else{
        localStorage.setItem("token",res.token);
        location.reload();
      }
    })
  }
  register(){
    const login = this.state.login;
    const email = this.state.email;
    const password = sha256(this.state.pass);
    fetch('/auth/register',{
      method : "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({login,email,password})
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res);
      if(!res.token) this.setState({warning : res.message});
      else{
        localStorage.setItem("token",res.token);
        location.reload();
      }
    })
  }

  render() {
    let pass = this.state.pass;
    let login = this.state.login;
    let email = this.state.email;
    let isLogin = this.state.isLogin;
    let warning = this.state.warning;
    return (
        <>
      <div className="auth">
        <Toggler isLogin={isLogin} setLogin={this.setLogin} />
        <form className="auth-form" onSubmit={this.submitHandle}>
          {!isLogin ? (
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="text"
                id="email"
                value={email}
                onChange={this.changeHandle}
                pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                required
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <label htmlFor="login">Login:</label>
            <br />
            <input
              type="text"
              id="login"
              value={login}
              onChange={this.changeHandle}
              pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{3,20}$"
              required
            />
          </div>
          <div>
            <label htmlFor="pass"> Password:</label>
            <br />
            <input
              type="password"
              id="pass"
              value={pass}
              onChange={this.changeHandle}
              required
              pattern="^[a-zA-Z0-9-_\.]{3,20}$"
            />
            <br/>
            <h6>4-20 characters or numbers.</h6>
          </div>
          <h5>{warning}</h5>
          <input type="submit" value={isLogin ? "Sign In" : "Sign Up"} />
        </form>
      </div>
      <a href="" className="auth-social">
          <div>by Twitter</div>
      </a>
      <a href={`https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirect_uri}&response_type=code&client_id=${client_id}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile`} title="Войти через Google" className="auth-social">
          <div>by Google</div>
</a>
      </>
    );
  }
}
export default Auth;
