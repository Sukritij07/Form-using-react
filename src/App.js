import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[1-9][0-9]{9}$/.test(phone);
  };

  const validateDOB = (dob) => {
    return /^\d{2}-\d{2}-\d{4}$/.test(dob);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!formData.name || !validateName(formData.name)) {
      validationErrors.name =
        "Name is required and should not contain special characters.";
    }
    if (!formData.email || !validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email.";
    }
    if (!formData.phone || !validatePhone(formData.phone)) {
      validationErrors.phone =
        "Phone must be a 10-digit number and should not start with 0.";
    }
    if (!formData.dob || !validateDOB(formData.dob)) {
      validationErrors.dob = "Date of Birth should be in DD-MM-YYYY format.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});

      try {
        const response = await axios.post(
          "https://localhost:3000/api/save",
          formData
        );
        console.log(response.data);
        alert("Data submitted successfully");
      } catch (error) {
        console.error("There was an error submitting the form!", error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="App">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
        </div>

        <div>
          <label>Date of Birth (DD-MM-YYYY):</label>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span style={{ color: "red" }}>{errors.dob}</span>}
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
