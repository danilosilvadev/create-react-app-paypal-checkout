import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    const Index = () => (
      <div className="App">
        <header className="App-header">
          <h1>Paypal</h1>
          <form action='/pay' method='post'>
            <label>
              $25
            </label>
            <br />
            <input type='submit' value='Buy' />
          </form>
        </header>
      </div>
    );

    return (
      <Router>
        <Route path="/" exact component={Index} />
      </Router>
    );
  }
}

export default App;
