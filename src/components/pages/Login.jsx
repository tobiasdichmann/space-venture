import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "../styles/login.scss";

// IMPORT CONTEXT SO THAT IT'S POSSIBLE FOR LOGIN
import { LoginContext } from "../../context/LoginContext";

const Login = () => {
  const { signIn, user } = useContext(LoginContext);

  if (user) {
    // Send the user to the login page
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault(); // Avoid reload on submit
    signIn(e.target.username.value, e.target.password.value);
  };

  return (
    <div id="login">
      <div id="loginContainer">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
