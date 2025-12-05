import React, { useState } from "react";
import Loader from "../loaders/Loader";
import { Link } from "react-router-dom";
import "../../styles/components/Forms/AuthForm.css";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup: signupUser, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupUser(username, email, password);
  };

  const isFormFilled = () => username && email && password;

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2 className="sora">Create Account</h2>
        <p className="auth-subtitle">Join Stockwise to manage your inventory</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outfit"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outfit"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outfit"
              required
            />
          </div>
          <Loader
            title="Create Account"
            isLoading={isLoading && isFormFilled()}
            disabled={isLoading}
            type="submit"
          />
          {error && <div className="error-message">{error}</div>}
        </form>
        <p className="auth-link outfit">
          Already have an account? <Link to="/auth/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
