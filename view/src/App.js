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
            <label>
              $25
            </label>
            <form action="/pay" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="DQGWUB6LCRJTS" />
              <input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
              <img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
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
