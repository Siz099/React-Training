import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
// import UserRow from "./UserRow";
// import UserHeader from "./UserHeader";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // Initialize with an empty array

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  useEffect(() => {
    setUsers([
      { id: 1, name: "John Doe", email: "abc@gmail.com", age: 25 },
      { id: 2, name: "John Doe", email: "abc@gmail.com", age: 20 },
      { id: 3, name: "John Doe", email: "abc@gmail.com", age: 22 },
      { id: 4, name: "John Doe", email: "abc@gmail.com", age: 26 },
      { id: 5, name: "John Doe", email: "abc@gmail.com", age: 28 },
    ]);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
  ];

  return (
    <div className="users">
      <h1>{props.title}</h1>
      <p>List of registered users:</p>
      <button onClick={handleAddUser}>Add User</button>
      <Table dataSource={users} columns={columns} />;
      {/* <table id="users">
        <thead>
          <UserHeader />
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} row={user} />
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Users;
