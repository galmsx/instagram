import React from "react";
import UserInf from "../../UserInf";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      editor: false
    };
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onDelete() {
    var headers = new Headers({ authorization: localStorage.getItem("token") });
    fetch(`/posts/comments/${this.props.id}`, {
        method: "DELETE",
        headers
      })
      .then(res=>{
          if(res.ok) this.props.onUpdate();
      })
  }
  onEdit() {
    this.area.disabled = false;
    this.setState({ editor: true });
  }
  onSubmit(ev) {
    ev.preventDefault();
    var body = JSON.stringify({ text: this.area.value });
    var headers = new Headers({ authorization: localStorage.getItem("token") });
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    fetch(`/posts/comments/${this.props.id}`, {
      method: "PUT",
      body,
      headers
    }).then(res => {
      if (res.ok) {
        this.area.disabled = true;
        this.setState({ editor: false });
      }
    });
  }
  render() {
    return (
      <div className="comment-item">
        <UserInf
          id={this.props.userId}
          onDelete={this.props.editable ? this.onDelete : false}
          time={this.props.date.slice(0, -14)}
        />
        <form className="comment-text" onSubmit={this.onSubmit}>
          <textarea
            cols="30"
            rows="2"
            maxLength="240"
            ref={ref => (this.area = ref)}
            disabled
          >
            {this.state.text}
          </textarea>
          {this.state.editor ? <input type="submit" value="Save" /> : ""}
          {this.props.editable ? (
            <i class="fas fa-edit" onClick={this.onEdit} />
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

export default Comment;
