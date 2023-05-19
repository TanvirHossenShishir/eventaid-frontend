import React, { useState, useEffect } from "react";
import "./viewProfile.css";
import Avatar from "@mui/material/Avatar";
import { HiUpload } from "react-icons/hi";

const ViewProfile = ({ handleEditProfile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [perviewFile, setpreviewFile] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const changeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleEditClick = () => {
    handleEditProfile(true);
  }
 
  return (
    <div className="view-profile-container">
      <div className="profile-sidebar">
        <label className="view-prof-title">MY PROFILE</label>

        <label className="info-title">BASIC INFORMATION</label>

        <label className="info-row">
          <span className="info-attribute">First Name:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).firstname}
          </span>
        </label>
        <label className="info-row">
          <span className="info-attribute">Last Name:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).lastname}
          </span>
        </label>
        <label className="info-row">
          <span className="info-attribute">Gender:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).gender}
          </span>
        </label>
        <label className="info-title">CONTACT INFORMATION</label>

        <label className="info-row">
          <span className="info-attribute">Phone:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).phone}
          </span>
        </label>
        <label className="info-row">
          <span className="info-attribute">Address:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).address}
          </span>
        </label>
        <label className="info-row">
          <span className="info-attribute">E-mail:</span>
          <span className="info-value">
            {window.localStorage.getItem("formData") &&
              JSON.parse(window.localStorage.getItem("formData")).email}
          </span>
        </label>
      </div>

      <div className="profile-sidebar profile-pic-margin">
        <Avatar
          alt="Remy Sharp"
          src={fileDataURL}
          sx={{ width: 200, height: 200 }}
        />

        <button className="profile-upload-btn">
          <label htmlFor="fileInput">Upload Picture</label>
          <input
            id="fileInput"
            type="file"
            required
            onChange={changeHandler}
            style={{ display: "none" }}
          />
        </button>

        <button className="profile-upload-btn" onClick={handleEditClick}>Edit Profile</button>
      </div>
    </div>
  );
};

export default ViewProfile;
