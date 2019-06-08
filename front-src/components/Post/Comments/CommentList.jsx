import React from "react";
import Comment from "./Comment";

function CommentList({ comments, curUsId ,onUpdate}) {
  return (
    <div className="comm-list">
      {comments.map(c => (
        <Comment 
        key = {c.id}
        id = {c.id}
        text = {c.text}
        login = {c.login}
        userId = {c.userId}
        date = {c.createdAt}
        postId = {c.postId}
        editable ={(c.userId == curUsId)}
        onUpdate = {onUpdate}
        />
      ))}
    </div>
  );
}
export default CommentList;
