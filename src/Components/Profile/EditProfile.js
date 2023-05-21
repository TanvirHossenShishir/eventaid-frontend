import axios from "axios";
import React, { useState, useEffect } from "react";
import "./viewProfile.css";
import "./editProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
    oldpassword: "",
    newpassword: "",
  });

  // const [items, setItems] = useState([]);

  useEffect(() => {
    const formdata = JSON.parse(localStorage.getItem("formData"));
    if (formdata) {
      setFormData(formdata);
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
    return;
  };

  const handleSubmit = async () => {
    console.log("after save change: ", formData);
    let obj = JSON.stringify({
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      oldpassword: formData.oldpassword,
      newpassword: formData.newpassword,
    });
    window.localStorage.setItem("formData", obj);

    const userId = JSON.parse(window.localStorage.getItem("userdata")).id; // replace with the actual user ID
    await axios
      .post(`http://localhost:8081/api/personalInfo/${userId}`, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: JSON.parse(window.localStorage.getItem("userdata")).useremail,
        gender: formData.gender,
        phone: formData.phone,
        address: formData.address,
      })
      .then((response) => {
        console.log(response.data);
        // do something with the response
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
  };

  return (
    <div className="edit-profile-container">
      <label className="view-prof-title">EDIT PROFILE</label>

      <label className="info-title">BASIC INFORMATION</label>

      <input
        className="info-row"
        type="text"
        placeholder="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="text"
        placeholder="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="text"
        placeholder="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        autoComplete="off"
      />

      <label className="info-title">CONTACT INFORMATION</label>

      <input
        className="info-row"
        type="tel"
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="text"
        placeholder="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="email"
        placeholder="E-mail"
        name="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="off"
      />

      {/* <label className="info-title">SECURITY INFORMATION</label>
      <input
        className="info-row"
        type="password"
        placeholder="Old Password"
        name="oldpassword"
        value={formData.oldpassword}
        onChange={handleChange}
        autoComplete="off"
      />
      <input
        className="info-row"
        type="password"
        placeholder="New Password (optional)"
        name="newpassword"
        value={formData.newpassword}
        onChange={handleChange}
        autoComplete="off"
      /> */}
      <div className="save-changes-section">
        <button className="save-changes-btn" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
