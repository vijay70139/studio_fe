import React, { useState } from "react";
import axios from "axios";
import LoginPopup from "./LoginPopup";

const SignupForm = ({ closeSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successSignup, setSuccessSignup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLoginPopupClose = () => setSuccessSignup(false);
  const isAuthenticated =
    !!localStorage.getItem("accessToken") ||
    !!localStorage.getItem("refreshToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_USER_DOMAIN_API}/signup`,
          formData
        );
        console.log("Signup successful:", response.data);

        setSuccessMessage("Signup successful! You can now log in.");
        setFormData({ username: "", password: "" }); // Reset form
        setErrors({});
        setSuccessSignup(true);
      } catch (error) {
        // Handle errors from the server
        const errorMsg =
          error.response?.data?.message || "Signup failed. Please try again.";
        setErrors({ api: errorMsg });
      }
    }
  };

  return !successSignup && !isAuthenticated ? (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "input-error" : ""}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        {errors.api && <p className="error-message">{errors.api}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  ) : (
    successSignup && (
      <LoginPopup
        isOpen={successSignup}
        onClose={handleLoginPopupClose}
        closeSignup={closeSignup}
      />
    )
  );
};

export default SignupForm;
