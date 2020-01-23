import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Nav from './components/nav'
import Login from './components/login'
import Register from './components/register'
import Home from './components/home'
import TestData from './components/testData'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/testdata" component={TestData} />
      </Router>
    </div>
  );
}

export default App;
