import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const UserDetails = () => {
  let { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/users/${userId}`,
          {
            signal: controller.signal,
          }
        );
        setUser(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError("Failed to fetch user details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => controller.abort(); // Cleanup on unmount
  }, [userId]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user found.</div>;

  return (
    <div>
      <h1>User Details</h1>
      <div>Full Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>Email: {user.email}</div>
      <div>Role: {user.role}</div>
    </div>
  );
};

export default UserDetails;
