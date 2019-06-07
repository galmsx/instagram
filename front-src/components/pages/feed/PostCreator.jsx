import React from "react";

class PostCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.postPhoto = this.postPhoto.bind(this);
  }
  postPhoto(ev) {
    ev.preventDefault();
    var data = new FormData();
    data.append("Photo", this.Photo.files[0]);
    data.append("Caption", this.Caption.value);
    fetch("/posts", {
      headers: new Headers({ authorization: localStorage.getItem("token") }),
      method: "POST",
      body: data
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText);
      })
      .then(() => this.props.unactiviser())
      .catch(e => this.setState({ error: e.message }));
  }
  render() {
    if (!this.props.isActive)
      return (
        <div className="creator-unactive" onClick={this.props.activiser}>
          <strong>
            <i class="far fa-plus-square" />
          </strong>{" "}
          <span> create new post!</span>
        </div>
      );
    else
      return (
        <form className="creator" onSubmit={this.postPhoto}>
          <div className="eee-design first-d">eEee DesIgn!</div>
          <div className="eee-design sec-d">K a E f !</div>
          <label htmlFor="photofile:">Photo:</label>
          <input
            accept="image/*"
            type="file"
            id="photofile"
            required
            ref={ref => (this.Photo = ref)}
          />
          <label htmlFor="descr">Caption:</label>
          <div className="eee-design">{this.state.error}</div>
          <textarea
            id="descr"
            cols="30"
            rows="5"
            minLength="0"
            maxLength="230"
            placeholder="You can use #hashtag here"
            ref={ref => (this.Caption = ref)}
          />
          <input type="submit" value="Post" className="post-post" />
        </form>
      );
  }
}
export default PostCreator;
