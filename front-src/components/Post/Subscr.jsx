import React from "react";

class Subscr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      editor: false
    };
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onEdit() {
    this.area.disabled = false;
    this.setState({ editor: true });
  }
  onSubmit(ev) {
    ev.preventDefault();
    var body = JSON.stringify({ caption: this.area.value });
    var headers = new Headers({ authorization: localStorage.getItem("token") });
    headers.append("Accept", "application/json, text/plain, */*");
    headers.append("Content-Type", "application/json");
    fetch(`/posts/${this.props.postId}`, {
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
    var changable = this.props.changable;
    return (
      <form className="caption" onSubmit={this.onSubmit}>
        <textarea
        maxLength="240"
          id=""
          cols="30"
          rows="2"
          disabled
          ref={ref => (this.area = ref)}
        >
          {this.state.text}
        </textarea>
        {this.state.editor ? <input type="submit" value="Save" /> : ""}
        {changable ? <i class="fas fa-edit" onClick={this.onEdit} /> : ""}
      </form>
    );
  }
}

export default Subscr;
