// LoginPopup.jsx
import React, { useState } from "react";
import axios from "axios";

const LoginPopup = ({ isOpen, onClose, closeSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;
  const isAuthenticated =
    !!localStorage.getItem("accessToken") ||
    !!localStorage.getItem("refreshToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_DOMAIN_API}/login`,
        { username, password }
      );

      console.log("Login successful:", response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      setUsername("");
      setPassword("");
      window.location.reload();
      closeSignup();
      onClose();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    !isAuthenticated && (
      <div className="popup-overlay">
        <div className="popup-content">
          <div>
            <h2>Login</h2>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default LoginPopup;
