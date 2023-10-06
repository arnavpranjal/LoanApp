import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
