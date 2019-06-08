import React from "react";
import { Link } from "react-router-dom";
class UserInf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      subs: [],
      subTo: [],
      subscribed: false
    };
    this.sub = this.sub.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.describe = this.describe.bind(this);
  }
  sub(){
    if(this.state.subscribed) this.describe();
    else this.subscribe();
  }
  subscribe(){
    fetch(`/user/${this.props.id}/subscribe`,{
      method : 'POST',
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
    .then(res=>{
      if(res.ok) this.componentDidMount();
    });
  }
  describe(){
    fetch(`/user/${this.props.id}/subscribe`,{
      method : 'DELETE',
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
    .then(res=>{
      if(res.ok) this.componentDidMount();
    });
  }
  render() {
    var onDelete = this.props.onDelete;
    var withSubs = this.props.withSubs;
    return (
      <div className="user-info">
        <div className={this.props.big ? "big" : ""}>
          <Link to={`/user/${this.props.id}`} className="user-link">
            <span>
              <i class="fas fa-user" />
              <strong> {this.state.login}</strong>
            </span>
          </Link>
          <span>subscr: {this.state.subs.length}</span>
          <span>subscribedTo: {this.state.subTo.length}</span>
          {this.props.time ? <span>Date: {this.props.time}</span> : ""}
          {onDelete ? <i class="fas fa-trash-alt" onClick={onDelete} /> : ""}
          {withSubs ? (
            <div className="sub-button" onClick={this.sub}>
              {this.state.subscribed ? "unSubscribe" : "Subscribe"}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  componentDidMount() {
    fetch(`/user/${this.props.id}`)
      .then(res => {
        if (!res.ok) throw Error();
        return res.json();
      })
      .then(res =>
        this.setState({
          login: res.login,
          subs: res.subscribersId,
          subTo: res.subscribedToId,
          subscribed: res.subscribersId.includes(this.props.curUsId)
        })
      )
      .catch(e => console.log(e));
  }
}
export default UserInf;
