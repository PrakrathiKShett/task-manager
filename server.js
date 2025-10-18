const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend running!");
});

// Connect MongoDB (replace with your DB)
mongoose.connect("mongodb://localhost:27017/taskmanager", {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
