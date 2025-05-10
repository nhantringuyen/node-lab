const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const users = []; // Mảng lưu người dùng

// Middleware để parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route mặc định "/"
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Home</title></head>
      <body>
        <p>The Middleware that handles just /</p>
        <form action="/add-user" method="POST">
          <input type="text" name="username" />
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
});

// Route để xử lý POST add-user
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
  const userList = users.map((user) => `<li>${user}</li>`).join("");
  res.send(`
    <html>
      <head><title>Users</title></head>
      <body>
        <p>The Middleware that handles just /users</p>
        <ul>${userList}</ul>
        <a href="/">Quay lại trang chủ</a>
      </body>
    </html>
  `);
});

// Route 404
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head><title>404</title></head>
      <body>
        <h1>404 - Không tìm thấy trang</h1>
      </body>
    </html>
  `);
});

// Khởi động server
app.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
