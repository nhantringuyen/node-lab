import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EnterUser from "./component/enterUser";
import Users from "./component/Users";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Enter User</Link> | <Link to="/users">Users</Link>
        </nav>

        <Routes>
          <Route path="/" element={<EnterUser />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
