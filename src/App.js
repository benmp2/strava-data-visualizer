import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import './App.css';
// import StravaAuthButton from './components/auth/StravaAuthButton';
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";



function App() {
  return (
      <Router>
        <div className="App">
          <header> Strava authentication! </header>
           <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/> 
              <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
