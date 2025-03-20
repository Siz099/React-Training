import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { UserContext } from "../context/user.context";

const { Header: AntHeader, Content, Footer: AntFooter, Sider } = Layout;

const LayoutComponent = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { _user } = useContext(UserContext);

  // Authentication check
  useEffect(() => {
    const isLogin = localStorage.getItem("is_login");
    if (isLogin !== "1") {
      navigate("/login");
    }
  }, [navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogoutClick = () => {
    localStorage.setItem("is_login", 0);
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",

      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/admin/settings"),
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => handleLogoutClick(),
    },
  ];

  return (
    <>
      <AntHeader style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            padding: 0,
          }}
        />
      </AntHeader>

      <div className="v-row main-wrapper">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ color: "#ffffff", padding: 30 }}>{_user?.email}</div>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Sider>

        <div className="v-col main-body">
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </div>
      </div>

      <AntFooter style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </AntFooter>
    </>
  );
};

export default LayoutComponent;
