import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("accessToken"); // Ensure token is removed
      navigate("/"); // Redirect to login page after clearing the token
    } catch (error) {
      console.error("Logout failed", error);
      alert("Logout failed"); // Debugging message
    }
  };
  

  return <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>;
}
