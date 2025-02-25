import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Import axiosInstance

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
  setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const response = await axiosInstance.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Server response:", response.data);
      if (response.data.success) {
        alert(`Success: ${response.data.message}`);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Error: ${error.response?.data?.message || "File upload failed"}`);
    }
  };
  
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      setStudents(response.data);
      navigate("/home"); // Navigate after fetching data
    } catch (error) {
      console.error("Error fetching students:", error);
      alert(`Failed to fetch students: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
        Upload & Display Student Data
      </h1>

      {/* File Upload Section */}
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md w-full sm:w-auto"
        />
        <div className="flex gap-4">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload File
          </button>
          <button
            onClick={fetchStudents}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Fetch Students
          </button>
        </div>
      </div>
    </div>
  );
}
