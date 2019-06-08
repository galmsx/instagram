import React from "react";
import PostCreator from "./PostCreator";
import PostList from "../../PostList";
import base64url from "base64url";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.token = JSON.parse(
      base64url.decode((localStorage.getItem("token") || "").split(".")[1])
    );
    this.state = {
      isCreatorActive: false,
      posts: []
    };
    this.count = 0;
    this.limit = 15;
    this.offset = 0;
    this.activiser = this.activiser.bind(this);
    this.unactiviser = this.unactiviser.bind(this);
  }
  activiser() {
    this.setState({ isCreatorActive: true });
  }
  unactiviser() {
    this.setState({ isCreatorActive: false });
    this.componentDidMount();
  }

  render() {
    return (
      <main>
        <PostCreator
          isActive={this.state.isCreatorActive}
          activiser={this.activiser}
          unactiviser={this.unactiviser}
        />
        <PostList
          posts={this.state.posts}
          curUsId={this.token.id || null}
          onDelete={() => this.componentDidMount()}
        />
        <h1>пагинация есть , но пока не на клиенте</h1>
      </main>
    );
  }
  componentDidMount() {
    fetch(`/user/feed?limit=${this.limit}`, {
      headers: new Headers({ authorization: localStorage.getItem("token") })
    })
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
export default Feed;
