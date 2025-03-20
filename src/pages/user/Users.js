import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Space, Table, Button, Card } from "antd";
import { getUsers } from "../../utils/user.util";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Correct state initialization

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response); // ✅ Corrected function name
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
          <NavLink to={`/admin/user/edit/${record.id}`}>
            <EditOutlined />
          </NavLink>
          <DeleteOutlined onClick={() => alert("hello")} />
        </Space>
      ),
    },
  ];

  return (
    <div className="v-col users">
      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        title={<h1>{props.title}</h1>}
        extra={
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
        }
      >
        <Table columns={columns} dataSource={users} rowKey="id" />{" "}
      </Card>
    </div>
  );
};

export default Users;
