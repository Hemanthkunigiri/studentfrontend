import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("accessToken", res.data.accessToken);
      alert("Login successful! Redirecting to home...");
      navigate("/home"); // Navigate to home on successful login
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          alert(data.message || "Invalid email or password. Please try again.");
        } else if (status === 401) {
          alert("Unauthorized access. Please check your credentials.");
        } else if (status === 403) {
          alert("Access denied. Contact support.");
        } else if (status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } else {
        alert("Network error. Please check your internet connection.");
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
    <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input type="email" name="email" placeholder="Email" className="block w-full p-2 mb-2 border" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" className="block w-full p-2 mb-4 border" onChange={handleChange} required />
      <button type="submit" className="w-full bg-blue-500 text-white py-2">Login</button>
      <p className="mt-2 text-center">
        Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>Sign up</span>
      </p>
    </form>
  </div>
  );
}

