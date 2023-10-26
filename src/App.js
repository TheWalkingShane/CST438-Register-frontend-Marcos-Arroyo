import React from 'react';
import './App.css';
import Login from './components/Login';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/student" component={StudentHome} />
          <Route path="/schedule" component={ShowSchedule} />
          <Route path="/admin" component={AdminHome} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>        
    </div>
  );
}

export default App;
