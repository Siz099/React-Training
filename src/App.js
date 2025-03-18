import "./App.css";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/user/Users";
import Settings from "./pages/Settings";
import AddUser from "./pages/user/AddUser";
import UserDetails from "./pages/user/UserDetails";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* This is the main Layout route */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes inside Layout */}
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/users" element={<Users title="Users" />} />
          <Route path="admin/settings" element={<Settings />} />
          <Route path="admin/add-user" element={<AddUser />} />
          <Route path="admin/user/edit/:userId" element={<AddUser />} />
          <Route path="/admin/user/details/:userId" element={<UserDetails />} />
        </Route>

        {/* Login route outside Layout */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
