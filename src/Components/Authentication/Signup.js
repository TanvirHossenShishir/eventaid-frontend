import axios from "axios";
import "./register.css";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "", // new field for role selection
  });

  const [visibility, setVisibility] = useState({
    password: false,
    repeatPassword: false,
  });

  const [error, setError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatPasswordError: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        if (!value.trim()) {
          setError((prevError) => ({
            ...prevError,
            usernameError: "Username is required",
          }));
        } else {
          setError((prevError) => ({
            ...prevError,
            usernameError: "",
          }));
        }
        break;
      case "email":
        if (!value.trim()) {
          setError((prevError) => ({
            ...prevError,
            emailError: "Email is required",
          }));
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          setError((prevError) => ({
            ...prevError,
            emailError: "Email is invalid",
          }));
        } else {
          setError((prevError) => ({
            ...prevError,
            emailError: "",
          }));
        }
        break;
      case "password":
        if (!value.trim()) {
          setError((prevError) => ({
            ...prevError,
            passwordError: "Password is required",
          }));
        } else if (value.trim().length < 6) {
          setError((prevError) => ({
            ...prevError,
            passwordError: "Password must be at least 6 characters long",
          }));
        } else {
          setError((prevError) => ({
            ...prevError,
            passwordError: "",
          }));
        }
        break;
      case "repeatPassword":
        if (!value.trim()) {
          setError((prevError) => ({
            ...prevError,
            repeatPasswordError: "Please confirm password",
          }));
        } else if (value !== userData.password) {
          setError((prevError) => ({
            ...prevError,
            repeatPasswordError: "Passwords do not match",
          }));
        } else {
          setError((prevError) => ({
            ...prevError,
            repeatPasswordError: "",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle form submission
    await axios
      .post("http://localhost:8081/api/users/register", {
        name: userData.username,
        password: userData.password,
        email: userData.email,
        role: userData.role,
      })
      .then((response) => {
        // handle the response
        console.log(response.data.success);
        if (response.data.success === true)
        setUserData({
          username: "",
          email: "",
          password: "",
          repeatPassword: "",
          role: "", // new field for role selection
        });
      })
      .catch((error) => {
        // handle the error
        console.log(error);
        alert(error);
      });
  };

  const toggleVisibility = (e) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      password: !prevVisibility.password,
    }));
  };

  const toggleRVisibility = (e) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      repeatPassword: !prevVisibility.repeatPassword,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User Name"
        name="username"
        id="reg-user"
        value={userData.username}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {error.usernameError && (
        <div className="errorMsg">{error.usernameError}</div>
      )}
      <input
        required
        type="email"
        placeholder="Email Address"
        name="email"
        id="reg-email"
        value={userData.email}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {error.emailError && <div className="errorMsg">{error.emailError}</div>}
      <div id="pass-wrapper">
        <input
          type={visibility.password ? "text" : "password"}
          placeholder="Password"
          name="password"
          id="reg-pass"
          value={userData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <span id="icn-eye" onClick={toggleVisibility}>
          {visibility.password === true && (
            <BsEye color="#ED6A5E" size="1rem" />
          )}
          {visibility.password === false && <BsEye color="#777" size="1rem" />}
        </span>
      </div>
      {error.passwordError && (
        <div className="errorMsg">{error.passwordError}</div>
      )}
      <div id="pass-wrapper">
        <input
          required
          type={visibility.repeatPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="repeatPassword"
          id="reg-c-pass"
          value={userData.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="off"
        />
        <span id="icn-eye" onClick={toggleRVisibility}>
          {visibility.repeatPassword === true && (
            <BsEye color="#ED6A5E" size="1rem" />
          )}
          {visibility.repeatPassword === false && (
            <BsEye color="#777" size="1rem" />
          )}
        </span>
      </div>
      {error.repeatPasswordError && (
        <div className="errorMsg">{error.repeatPasswordError}</div>
      )}
      <div className="role-selection">
        <label className="role-text">Select Role:</label>
        <select
          required
          id="role"
          name="role"
          value={userData.role}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" selected disabled hidden>
            Select...
          </option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
      </div>

      <button className="btn-reg">REGISTER</button>
    </form>
  );
};

export default Signup;
