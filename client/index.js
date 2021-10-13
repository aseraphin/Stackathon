import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import TrendingPlaylist from "./components/TrendingPlaylist";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={TrendingPlaylist} />
        <Route path="/discover" component={App} exact />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
);
