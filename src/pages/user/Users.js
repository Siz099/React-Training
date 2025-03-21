import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Space, Table, Button, Card, Modal } from "antd";
import { getUsers, deleteUser } from "../../utils/user.util";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      showErrorToast("Failed to load users");
    }
  };

  const handleAddUser = () => {
    navigate("/admin/add-user");
  };

  const showModal = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setOpen(true);
  };

  const deleteData = async () => {
    if (!deleteId) return;

    try {
      await deleteUser(deleteId);
      showSuccessToast("User deleted successfully");
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast("Failed to delete user");
    } finally {
      setOpen(false);
    }
  };

  const hideModal = () => {
    setOpen(false);
  };

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
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => showModal(record.id, record.name)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="v-col users">
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={<h1>{props.title}</h1>}
        extra={
          <Button type="primary" onClick={handleAddUser}>
            Add User
          </Button>
        }
      >
        <Table columns={columns} dataSource={users} rowKey="id" />
      </Card>

      <Modal
        title={`Are you sure you want to delete "${deleteName}"?`}
        open={open}
        onOk={deleteData}
        onCancel={hideModal}
        okText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Users;
