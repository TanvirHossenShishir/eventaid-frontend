import React, { useState, useEffect } from "react";
import "./viewUsers.css";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userId = JSON.parse(window.localStorage.getItem("userdata")).id;
    axios
      .get("http://localhost:8081/api/users/all")
      .then((response) => {
        console.log(response.data)
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="view-users-cont">
      <label className="view-users-title">USER LIST</label>
      <div className="users-list">
        {users &&
          users.map((user) => (
            <div className="user-container">
              <div className="user-sec">
                <div className="user-attribute ">Username: </div>
                <div className="user-info">{user.name}</div>
              </div>
              <div className="user-sec">
                <div className="user-attribute ">Email: </div>
                <div className="user-info">{user.email}</div>
              </div>
              <div className="user-sec">
                <div className="user-attribute ">Role: </div>
                <div className="user-info capitalize">{user.role}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewUsers;
