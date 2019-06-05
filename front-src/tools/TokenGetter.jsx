import React from "react";
import { withRouter } from "react-router-dom";

function TokenGetter({ match }) {
  localStorage.setItem("token", match.params.token);
  location.replace("/");
  return <div />;
}
export default withRouter(TokenGetter);
