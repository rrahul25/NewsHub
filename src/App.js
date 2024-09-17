import './App.css';
import Navbar from './Components/Navbar';
import React, { Component } from 'react';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 6;
  apiKey= "63037d4960ba49cb881d6fbadfc1f773"

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="general" />
            </Route>
            <Route path="/business">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="business" />
            </Route>
            <Route path="/entertainment">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="entertainment" />
            </Route>
            <Route path="/health">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="health" />
            </Route>
            <Route path="/science">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="science" />
            </Route>
            <Route path="/sports">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="sports" />
            </Route>
            <Route path="/technology">
              <News apiKey={this.apiKey} pageSize={this.pageSize} country="us" category="technology" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}