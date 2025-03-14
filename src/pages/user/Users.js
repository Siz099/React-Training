import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Fixed useState declaration

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUsers(response.data); // Updating state correctly
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => (
        <NavLink to={`/admin/user/details/${item.id}`}>{item.name}</NavLink>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="users">
      <h1>{props.title}</h1>
      <p>List of registered users:</p>
      <button onClick={handleAddUser}>Add User</button>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default Users;
