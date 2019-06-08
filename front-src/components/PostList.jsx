import React from "react";
import Post from "./Post";

function PostList({ posts, curUsId,onDelete }) {
  return (
    <>
      {posts.map(p => (
        <Post
          key={p.id}
          curUsId={curUsId}
          id={p.id}
          userId={p.userId}
          caption={p.caption}
          date={p.createdAt}
          photo={p.photo}
          onDelete = {onDelete}
        />
      ))}
    </>
  );
}
export default PostList;
