import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  const handleSignup = () => {
    new SimpleSchema({
      email: { type: String, regEx: SimpleSchema.RegEx.Email },
      password: String,
    }).validate({ email, password });

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        alert('Signup Failed.');
      } else {
        // Redirect or do something on successful signup
      }
    });
  };

  return (
    <div class="centering">
    <div class="login-container">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
      <button onClick={()=>navigate(-1)}>Go Back Home</button> 
    </div>
    </div>
  );
};

export default Signup;
