import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import BorrowerDashboard from './BorrowerDashboard.jsx';
import LenderDashboard from './LenderDashboard.jsx';
export const App = () => (
  <Router>
  <Routes>
  <Route exact path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/borrower" element={<BorrowerDashboard />} />
  <Route path="/lender" element={<LenderDashboard />} />
  </Routes>
</Router>


/* <div>
  <h1>Loan App</h1>
</div> */
);
