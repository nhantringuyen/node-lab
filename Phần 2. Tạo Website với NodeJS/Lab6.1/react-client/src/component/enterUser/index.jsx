import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnterUser() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add user");
        return res.json();
      })
      .then(() => {
        setUsername("");
        navigate("/users"); // ➡️ chuyển hướng về /users
      })
      .catch((err) => alert("Lỗi thêm user: " + err.message));
  };

  return (
    <div>
      <h2>Enter User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default EnterUser;
