import React, { useEffect } from "react";
import { Button, Form, Input, Select, Card, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { createUser, getUser, updateUser } from "../../utils/user.util";

const { Option } = Select;

const UserAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (params.userId) {
      getUser(params.userId).then((data) => {
        form.setFieldsValue({
          name: data.name || "",
          age: data.age || 0,
          email: data.email || "",
          role: data.role || "user",
        });
      });
    } else {
      form.resetFields();
    }
  }, [params.userId, form]);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      if (!params.userId) {
        await createUser(values);
      } else {
        await updateUser(params.userId, values);
      }
      navigate("/admin/users");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={<h1>{params.userId ? "Edit User" : "Add User"}</h1>}
      >
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            name="age"
            label="Age"
            rules={[
              { required: true, message: "Please input your age!" },
              {
                type: "number",
                min: 1,
                message: "Age must be a positive number!",
              },
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "The input is not a valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select a role!" }]}
          >
            <Select placeholder="Select a role">
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserAdd;
