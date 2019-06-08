import React from "react";
import CommentList from "./CommentList";
import CommentCreator from "./CommentCreator";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  render() {
    return (
      <>
        {this.props.curUsId ? (
          <CommentCreator
            postId={this.props.postId}
            onCreate={() => this.componentDidMount()}
          />
        ) : (
          <div className="comment-creator"><h1>Comments</h1></div>
        )}
        <CommentList
          comments={this.state.comments}
          curUsId={this.props.curUsId}
          onUpdate={() => this.componentDidMount()}
        />
      </>
    );
  }
  componentDidMount() {
    fetch(`/posts/${this.props.postId}/comments`)
      .then(res => {
        if (!res.ok) throw Error();
        return res.json();
      })
      .then(res => this.setState({ comments: res.comments }))
      .catch(e => {});
  }
}
export default Comments;
