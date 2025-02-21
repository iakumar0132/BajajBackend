require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({ origin: "*", methods: "GET,POST", allowedHeaders: "Content-Type" })
);
app.use(express.json());

const USER_ID = "Anshu";
const EMAIL = "iakumar0132@gmail.com";
const ROLL_NUMBER = "22BCS10150";

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

    if (!data || !Array.isArray(data)) {
      throw new Error("Invalid JSON format: 'data' must be an array");
    }

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
    console.error("Error:", error.message);
    res.status(400).json({ is_success: false, message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
