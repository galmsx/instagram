import React from "react";

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    };
    this.likeHandler = this.likeHandler.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
  }
  likeHandler(){
      if(this.state.likes.includes(this.props.curUsId)) this.unlike();
      else this.like();
  }
  like(){
    fetch(`/posts/${this.props.postId}/likes`,{
        method : "POST",
        headers: new Headers({ authorization: localStorage.getItem("token") })
    })
    .then(_=>this.componentDidMount());
  }
  unlike(){
    fetch(`/posts/${this.props.postId}/likes`,{
        method : "DELETE",
        headers: new Headers({ authorization: localStorage.getItem("token") })
    })
    .then(_=>this.componentDidMount());
  }
  render() {
    return (
      <div className="likes">
          <div  onClick={this.likeHandler}>
          {this.state.likes.includes(this.props.curUsId) ? (
          <i class="fas fa-heart" />
        ) : (
          <i class="far fa-heart" />
        )} <span>: {this.state.likes.length}</span>
          </div>
      </div>
    );
  }
  componentDidMount() {
    fetch(`/posts/${this.props.postId}/likes`)
      .then(res => {
        if (!res.ok) throw Error();
        return res.json();
      })
      .then(res => this.setState({ likes: res.usersId }))
      .catch(e => console.log(e));
  }
}
export default Likes;
