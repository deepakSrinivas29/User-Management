import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Route path="/" exact component={UserList} />
    </Router>
  );
}

export default App;
