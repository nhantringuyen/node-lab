const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const users = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // phục vụ file tĩnh

// Route "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Route xử lý POST
app.post("/add-user", (req, res) => {
  const username = req.body.username;
  if (username) {
    users.push(username);
    console.log("Add user:", username);
  }
  res.redirect("/users");
});

// Route "/users"
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "users.html"));
});

// Route 404
app.use((req, res) => {
  res.status(404).send(`<h1>404 - Không tìm thấy trang</h1>`);
});

// Server start
app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
