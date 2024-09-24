import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './src/App';
import reportWebVitals from './src/reportWebVitals';
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submissions
app.post("/api/save", (req, res) => {
  const { name, email, phone, dob } = req.body;

  // Validate and save the data here (e.g., save to a database)

  console.log("Data received:", { name, email, phone, dob });

  // Respond with a success message
  res.status(200).json({ message: "Form data saved successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
