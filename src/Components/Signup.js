import React, { useState } from "react";
import { auth, provider } from "../Firebase/Configure";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CSS/Signup.css"; // Import the CSS file for styling

const SignUp = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const userDetails = userCredential.user;
        console.log(userDetails);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/home");
  };

  return (
    <div className="signup-container">
      <button className="google-signup-button" onClick={SignInWithGoogle}>
        Continue with Google
      </button>
      <form className="signup-form">
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="signup-button"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
