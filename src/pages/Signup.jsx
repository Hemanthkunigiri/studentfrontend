import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Data:", formData); // Debugging

      const res = await axiosInstance.post("/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data); // Debugging

      if (res.status === 201) {
        navigate("/"); // Redirect to login after successful signup
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input type="text" name="name" placeholder="Name" className="block w-full p-2 mb-2 border" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="block w-full p-2 mb-2 border" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="block w-full p-2 mb-4 border" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-500 text-white py-2">Signup</button>
        <p className="mt-2 text-center">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}
