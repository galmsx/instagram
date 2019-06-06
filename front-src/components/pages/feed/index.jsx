import React from "react";
import PostCreator from "./PostCreator";
import { timer } from "rxjs";
class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorActive: false
    };
    this.activiser = this.activiser.bind(this);
    this.unactiviser = this.unactiviser.bind(this);
  }
  activiser() {
    this.setState({ isCreatorActive: true });
  }
  unactiviser() {
    this.setState({ isCreatorActive: false });
  }

  render() {
    return (
      <main>
        <PostCreator
          isActive={this.state.isCreatorActive}
          activiser={this.activiser}
          unactiviser={this.unactiviser}
        />
      </main>
    );
  }
}
export default Feed;
