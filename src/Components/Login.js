import React, { useState } from "react";
import { provider, auth } from "../Firebase/Configure";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css"; // Import the CSS file for styling

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    navigate("/home");
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, mail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="login-container">
      <button className="google-login-button" onClick={SignInWithGoogle}>
        Continue with Google
      </button>
      <form className="login-form">
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
        <button type="submit" className="login-button" onClick={handleLogIn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
