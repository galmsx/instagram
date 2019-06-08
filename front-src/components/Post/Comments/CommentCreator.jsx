import React from "react";

class CommentCreator extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
  }

  send(ev) {
    ev.preventDefault();
    var body = JSON.stringify({ text: this.area.value });
    var headers = new Headers({ authorization: localStorage.getItem("token") });
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    fetch(`/posts/${this.props.postId}/comments`, {
      method: "POST",
      body,
      headers
    }).then(res => {
      if (res.ok) {
        this.area.value = "";
        this.props.onCreate();
      }
    });
  }
  render() {
    return (
      <form className="comment-creator" onSubmit={this.send}>
        <textarea
          ref={ref => (this.area = ref)}
          placeholder='"@username" - to mention user'
          maxLength="200"
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}
export default CommentCreator;
