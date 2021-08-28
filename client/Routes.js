import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Appv2 from "./Appv2";
import Login from "./components/Login";
/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path="/" component={App} />
            {/* <Redirect to="/login" /> */}
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

/**
 * CONTAINER
 */

export default Routes;
