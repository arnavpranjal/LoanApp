import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export const App = () => (
  <Router>
  <Routes>
  <Route exact path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
    
  </Routes>
</Router>


/* <div>
  <h1>Loan App</h1>
</div> */
);
