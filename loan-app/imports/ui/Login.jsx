import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        alert('Login Failed. Check your email and password.');
      } else {
        // Redirect or do something on successful login
      }
    });
  };

  return (
    <div>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;