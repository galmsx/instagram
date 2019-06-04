import React from "react";

function Toggler({ isLogin, setLogin }) {
  return (
    <div>
      <div
        className={isLogin ? "register" : "register l-active"}
        onClick={() => setLogin(false)}
      >
        <span>Register</span>
      </div>
      <div
        className={isLogin ? "login l-active " : "login"}
        onClick={() => setLogin(true)}
      >
        <span>Login</span>
      </div>
    </div>
  );
}
export default Toggler;
