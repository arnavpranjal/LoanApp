import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  let navigate = useNavigate();
 
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
    <div class = "centering" >
    <div class="login-container">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
     
      <button onClick={()=>navigate("/signup")}>Sign up</button> 
    </div>
    </div>
  );
};

export default Login;