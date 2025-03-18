import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserAdd = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [roleError, setRoleError] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/users/${userId}`)
        .then(function (response) {
          const user = response.data;
          setName(user.name);
          setEmail(user.email);
          setAge(user.age);
          setRole(user.role);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [userId]);

  const validate = () => {
    let isValid = true;
    setNameError("");
    setEmailError("");
    setAgeError("");
    setRoleError("");

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (age <= 0) {
      setAgeError("Age must be greater than 0");
      isValid = false;
    }
    if (!role) {
      setRoleError("Role is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      const user = { name, email, age, role };
      try {
        if (userId) {
          await axios.patch(`http://localhost:4000/users/${userId}`, user);
          alert("User updated successfully!");
        } else {
          await axios.post("http://localhost:4000/users", user);
          alert("User added successfully!");
        }
        navigate("/admin/users");
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }
  };

  return (
    <div>
      <h1>{userId ? "Edit" : "Add"} User</h1>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <small style={{ color: "red" }}>{nameError}</small>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <small style={{ color: "red" }}>{emailError}</small>}
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
          {ageError && <small style={{ color: "red" }}>{ageError}</small>}
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">--Select Role---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {roleError && <small style={{ color: "red" }}>{roleError}</small>}
        </div>
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserAdd;
