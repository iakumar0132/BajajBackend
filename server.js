require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Function to process input data
function processData(data) {
  let numbers = data.filter((item) => /^\d+$/.test(item));
  let alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));
  let highestAlphabet = alphabets.length ? [alphabets.sort().reverse()[0]] : [];
  return { numbers, alphabets, highestAlphabet };
}

// GET endpoint (Returns operation code)
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint (Processes input JSON)
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) throw new Error("Invalid input format");

    const { numbers, alphabets, highestAlphabet } = processData(data);

    res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  } catch (error) {
    res.status(400).json({ is_success: false, message: "Invalid JSON format" });
  }
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
