import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add name state
  const [profileImage, setProfileImage] = useState(null); // Add profileImage state
  const [address, setAddress] = useState(""); // Add address state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address); // Append the address
      if (profileImage) {
        formData.append("profileImage", profileImage); // Append the image file
      }

      await axios.post("http://localhost:5000/api/users/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type
        },
      });

      // Redirect to the login page after successful signup
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Handle address input
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="file"
          onChange={handleImageChange} // Handle file input
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
