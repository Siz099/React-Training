import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [roleError, setRoleError] = useState("");

  const validate = () => {
    let isValid = true;
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
      const savingData = { name, email, age, role };
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(savingData),
        });
        if (response.ok) {
          alert('User added successfully!');
          navigate('/admin/users');
        } else {
          alert('Failed to add user.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <small>{nameError}</small>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <small>{emailError}</small>}
        </div>
        <div>
          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          {ageError && <small>{ageError}</small>}
        </div>
        <div>
          <label>Role</label>
          <select onChange={(e) => setRole(e.target.value)}>
            <option value="">--Select Role---</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {roleError && <small>{roleError}</small>}
        </div>
        <button type="button" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default UserAdd;