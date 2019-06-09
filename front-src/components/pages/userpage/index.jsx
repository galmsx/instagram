import React from "react";
import { withRouter } from "react-router-dom";
import PostList from "../../PostList";
import base64url from "base64url";
import UserInf from "../../UserInf";

class Userpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    this.id = this.props.match.params.id;
    this.limit = 20;
    
    if (localStorage.getItem("token")) {
      this.token = JSON.parse(
        base64url.decode((localStorage.getItem("token") || "").split(".")[1])
      );
    } else this.token = {};
  }

  render() {
    console.log(this.props.match.params.id);
    return (
      <main>
        <UserInf
          id={this.id}
          withSubs = {(this.token.id && this.token.id != this.id) ? true : false}
          curUsId = {this.token.id || null}
          big={1}
        />
        <PostList
          posts={this.state.posts}
          curUsId={this.token.id || null}
          onDelete={() => this.componentDidMount()}
        />
      </main>
    );
  }
  componentDidMount() {
    fetch(`/user/${this.id}/posts?limit=${this.limit}`)
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(res => {
        this.count = res.meta.count;
        this.setState({ posts: res.posts });
      })
      .catch(e => console.log(e.message));
  }
}
export default withRouter(Userpage);
