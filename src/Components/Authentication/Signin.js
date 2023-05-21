import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [visibility, setVisibility] = useState({
    password: false,
  });

  const [formSubmission, setFormSubmission] = useState(false);

  const [error, setError] = useState({
    usernameError: "",
    passwordError: "",
    loginError: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formFields = ["username", "password"];
    let isValid = true;
    formFields.forEach((field) => {
      isValid = validateField(field) && isValid;
    });
    if (isValid) setFormSubmission(true);
    else setFormSubmission(false);

    await axios
      .post("http://localhost:8081/api/users/login", {
        name: userData.username,
        password: userData.password,
        email: "",
        role: "",
      })
      .then((response) => {
        // handle the response
        console.log(response.data);
        if (response.data.success == true) {
          axios
            .get(
              `http://localhost:8081/api/users/username/${userData.username}`
              )
              .then((resp) => {
                console.log(resp.data);
                window.localStorage.setItem("isAuthenticated", true);
                console.log("Authenticated");
                let result = resp.data;
                let uid = resp.data.id;
                let un = resp.data.name;
                let up = resp.data.email;
                let rl = resp.data.role;
                let obj = JSON.stringify({
                  id: uid,
                  username: un,
                  useremail: up,
                  role: rl,
                });
                
                window.localStorage.setItem("userdata", obj);
              });
              navigate("/");
              setFormSubmission(true);
              setUserData({
                username: "",
                password: "",
              });
              window.location.reload(false);
            } else {
              alert(response.data.message);
              setFormSubmission(false);
          return formSubmission;
        }
      })
      .catch((error) => {
        // handle the error
        console.log(error);
      });

    return formSubmission;
  };

  const handleBlur = (e) => {
    const name = e.target.name;
    validateField(name);
    return;
  };

  const toggleVisibility = () => {
    if (visibility.password === true)
      setVisibility({
        password: false,
      });
    else
      setVisibility({
        password: true,
      });
  };

  const validateField = (name) => {
    let isValid = false;
    if (name === "username") isValid = validateUserName();
    else if (name === "password") isValid = validatePassword();
    return isValid;
  };

  const validateUserName = () => {
    let userNameError = "";
    const value = userData.username;
    if (value.trim() === "") userNameError = "User Name is required";
    setError({ usernameError: userNameError });
    return userNameError === "";
  };

  const validatePassword = () => {
    let passError = "";
    const value = userData.password;
    if (value.trim() === "") passError = "Password is required";
    setError({ passwordError: passError });
    return passError === "";
  };

  return (
    <>
      {formSubmission ? (
        <div className="details">
          <h2>Login Successful!</h2>
          <div>User Name: {userData.username}</div>
          <div>Email Address: {userData.email}</div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
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
                {visibility.password === false && (
                  <BsEye color="#777" size="1rem" />
                )}
              </span>
            </div>
            {error.passwordError && (
              <div className="errorMsg">{error.passwordError}</div>
            )}
            {error.loginError && (
              <div className="errorMsg">{error.loginError}</div>
            )}
            <button className="btn-reg" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signin;
