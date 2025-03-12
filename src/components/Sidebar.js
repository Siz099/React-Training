import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { DashboardOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('is_login', 0);
    navigate('/login');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowModal(false);
  };

  // Menu item configuration
  const items = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <NavLink to="/admin/dashboard">Dashboard</NavLink>
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <NavLink to="/admin/users">Users</NavLink>
    },
    {
      key: '3',
      icon: <SettingOutlined />,
      label: <NavLink to="/admin/settings">Settings</NavLink>
    },
    {
      key: '4',
      icon: <LogoutOutlined />,
      label: (
        <button className="sidebar-link logout-btn" onClick={() => setShowModal(true)}>
          Logout
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="v-col sidebar">
        <Menu theme="dark" mode="inline" items={items} />
      </div>

      {/* Logout Confirmation Modal using Ant Design */}
      <Modal
        title="Confirm Logout"
        visible={showModal}
        onOk={handleConfirmLogout}
        onCancel={handleCancel}
        okText="Sign Out"
        cancelText="Cancel"
      >
        <p>Are you sure you want to sign out?</p>
      </Modal>
    </>
  );
};

export default Sidebar;
