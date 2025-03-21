import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { checkLogin } from "../../utils/user.util";
import { UserContext } from "../../context/user.context";
import { showErrorToast, showSuccessToast } from "../../utils/toastify.util";

const Login = () => {
  const navigate = useNavigate();
  const [message] = useState("");
  const { _setUser } = useContext(UserContext);

  const onFinish = (values) => {
    checkLogin(values.username, values.password).then((data) => {
      if (data === null) {
        showErrorToast("Login Failed");
      } else {
        showSuccessToast("Login successful");
        _setUser(data);
        localStorage.setItem("is_login", 1);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/admin/users");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Form
        name="login-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {message && (
          <p style={{ color: "red", textAlign: "center" }}>{message}</p>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
