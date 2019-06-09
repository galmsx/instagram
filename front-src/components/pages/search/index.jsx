import React from "react";
import { withRouter } from "react-router-dom";
import PostList from "../../PostList";
import UserList from "./UserList";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      query: this.props.match.params.qu
    };
  }
  render() {
    var posts = this.state.posts;
    var users = this.state.users;
    var query = this.state.query;
    return (
      <main>
        {!posts.length && !users.length ? (
          <h1>Nothing found..</h1>
        ) : (
          <h1>Found by: "{query}"</h1>
        )}
        {users.length ? <h1 className="ent">Users:</h1> : ""}
        <UserList users={users} />

        {posts.length ? <h1 className="ent">Posts:</h1> : ""}
        <PostList posts={posts} />
      </main>
    );
  }

  componentDidMount() {
    fetch(`/search?query=${this.state.query}`)
      .then(res => {
        if (!res.ok) throw Error();
        return res.json();
      })
      .then(res => this.setState({ posts: res.posts, users: res.users }))
      .catch(e => {});
  }
}
export default withRouter(Search);
