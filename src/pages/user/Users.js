import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table, Space } from "antd";
import axios from "axios";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setUsers(response.data);
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/admin/user/edit/${record.id}`}>Edit</NavLink>
          <button type="button">Delete</button>
        </Space>
      ),
    },
  ];

  return (
    <div className="users">
      <h1>{props.title}</h1>
      <p>List of registered users:</p>
      <button onClick={handleAddUser}>Add User</button>
      <Table dataSource={users} columns={columns} rowKey="id" />
    </div>
  );
};

export default Users;
