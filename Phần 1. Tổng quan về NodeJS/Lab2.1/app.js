const http = require("http");

const users = []; // Mảng toàn cục lưu tên người dùng

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  // Trang chủ với form
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body>");
    res.write('<form action="/add-user" method="POST">');
    res.write('<input type="text" name="username">');
    res.write('<button type="submit">Send</button>');
    res.write("</form>");
    res.write("</body></html>");
    return res.end();
  }

  // Route để thêm người dùng
  if (url === "/add-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      if (username) {
        users.push(decodeURIComponent(username));
        console.log("Add user:", decodeURIComponent(username));
      }

      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
    return;
  }

  // Hiển thị danh sách người dùng
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>List user</title></head><body>");
    res.write("<ul>");
    users.forEach((user) => {
      res.write(`<li>${user}</li>`);
    });
    res.write("</ul>");
    // res.write('<a href="/">Quay lại trang chủ</a>');
    res.write("</body></html>");
    return res.end();
  }

  // 404 nếu không khớp route nào
  res.setHeader("Content-Type", "text/html");
  res.write("<html><head><title>404</title></head><body>");
  res.write("<h1>404 - Không tìm thấy trang</h1>");
  res.write("</body></html>");
  res.end();
});

server.listen(3000, () => {
  console.log("Server đang chạy tại http://localhost:3000");
});
