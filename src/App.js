import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Favorites from "./pages/favorites/Favorites";
import Nav from "./components/nav/Nav";
function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
