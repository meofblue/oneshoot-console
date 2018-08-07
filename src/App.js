import React from "react";
import {HashRouter as Router, Route, Link} from "react-router-dom";

import List from "./list";
import Collection from "./collection"
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Link to="./list">List</Link>
            <br/>
            <Link to="./collection">collection</Link>
            <Route path="/list" component={List}/>
            <Route path="/collection" component={Collection}/>
          </div>
        </Router>
      </div>
    );
  };
}

export default App;