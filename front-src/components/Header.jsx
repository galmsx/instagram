import React from "react";
import { Link, NavLink } from "react-router-dom";
import base64url from "base64url";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    this.searchHandle = this.searchHandle.bind(this);
  }
  searchHandle(ev) {
    ev.preventDefault();
    console.log(this.state.searchValue);
  }
  render() {
    var signed = localStorage.getItem("token");
    if (signed) {
      signed = JSON.parse(base64url.decode(signed.split(".")[1]));
      var login = signed.login;
      var id = signed.id;
    }
    return (
      <header>
        <nav>
          <Link to={"/"}>
            <strong>
              <i class="fab fa-instagram" />
              <span> Cali4gram</span>
            </strong>
          </Link>
          <form onSubmit={this.searchHandle}>
            <input
              type="text"
              placeholder="search"
              value={this.state.searchValue}
              onChange={e => this.setState({ searchValue: e.target.value })}
            />
          </form>
          {signed ? (
            <div className="kek">
              <Link to={`/user/${id}`} className="big-l">
                <strong>
                  <i class="far fa-user" />
                </strong>
              </Link>
              <i
                class="fas fa-sign-out-alt"
                onClick={_ => {
                  localStorage.removeItem("token");
                  location.replace('/');
                }}
              />
            </div>
          ) : (
            <Link to={"/"}>
              <strong>
                <i class="fas fa-sign-in-alt" />
              </strong>
              <span> Sign In</span>
            </Link>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;
