import "./App.css";
import React, { useState } from "react";
import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/user/Users";
import Settings from "./pages/Settings";
import AddUser from "./pages/user/AddUser";
import UserDetails from "./pages/user/UserDetails";
import Login from "./pages/auth/Login";
import Layout from "./components/Layout";
import { UserContext } from "./context/user.context";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [_user, _setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  return (
    <UserContext.Provider value={{ _user, _setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="admin/dashboard" element={<Dashboard />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/settings" element={<Settings />} />
            <Route path="admin/add-user" element={<AddUser />} />
            <Route path="admin/user/edit/:userId" element={<AddUser />} />
            <Route
              path="admin/user/details/:userId"
              element={<UserDetails />}
            />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </UserContext.Provider>
  );
};

export default App;
