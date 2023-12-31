import React, { useState } from "react";

import SimpleSchema from "simpl-schema";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  let navigate = useNavigate();
  const handleSignup = () => {
    new SimpleSchema({
      email: {
        type: String,
        regEx: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      },
      password: String,
      role: { type: String, allowedValues: ["admin", "borrower", "lender"] },
    }).validate({ email, password, role });

    Accounts.createUser({ email, password, profile: { role } }, (err) => {
      if (err) {
        alert(err.reason);
        console.error(err);
      } else {
        alert("Successful");
        const userRole = Meteor.user().profile.role;
        switch (userRole) {
          case "admin":
            navigate("/admin");
            break;
          case "borrower":
            navigate("/borrower");
            break;
          case "lender":
            navigate("/lender");
            break;
          default:
            console.error("Invalid role or role not retrieved");
        }
        console.log("succesful");
      }
    });
  };

  return (
    <div class="centering">
      <div class="login-container">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            Select your role
          </option>
          <option value="admin">Admin</option>
          <option value="borrower">Borrower</option>
          <option value="lender">Lender</option>
        </select>
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={() => navigate(-1)}>Go Back </button>
      </div>
    </div>
  );
};

export default Signup;
