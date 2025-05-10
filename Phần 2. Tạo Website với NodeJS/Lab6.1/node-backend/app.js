const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// Lấy danh sách users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Thêm user mới
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (name && name.trim() !== "") {
    users.push(name.trim());
    res.status(201).json({ message: "User added successfully" });
  } else {
    res.status(400).json({ error: "Invalid user name" });
  }
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
