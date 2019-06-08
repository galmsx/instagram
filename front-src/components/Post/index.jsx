import React from "react";
import UserInf from "../UserInf";
import Likes from "./Likes";
import Subscr from "./Subscr";
import Comments from "./Comments";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    fetch(`/posts/${this.props.id}`, {
      method: "DELETE",
      headers: new Headers({ authorization: localStorage.getItem("token") })
    }).then(res => {
      if (res.ok) this.props.onDelete();
    });
  }
  render() {
    var curUsId = this.props.curUsId;
    var userId = this.props.userId;
    var postId = this.props.id;
    return (
      <div className="post-wrapper">
        <UserInf
          id={userId}
          onDelete={userId == curUsId ? this.onDelete : false}
          time={this.props.date.slice(0, -14)}
          big={1}
        />
        <img src={`/photos/${this.props.photo}`} alt="" />
        <Likes postId={postId} curUsId={curUsId} />
        <Subscr
          postId={postId}
          text={this.props.caption}
          changable={userId == curUsId}
        />
        <Comments postId={postId} curUsId={curUsId} />
      </div>
    );
  }
}
export default Post;
