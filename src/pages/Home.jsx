import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"; // Import axiosInstance

import axios from "axios"; // Import axios for making HTTP requests
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import StudentEdit from "../components/StudentEdit";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [view, setView] = useState("read");
  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState([]); // State for student list
  const navigate = useNavigate();

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get(`/students`);
      setStudents(response.data.students); // Set the student list
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Delete all students
  const deleteAllStudents = async () => {
    try {
      await axiosInstance.delete("/students"); // Use axiosInstance for correct baseURL
      setStudents([]); // Clear student list in UI
      alert("All students deleted successfully!"); // Success message
    } catch (error) {
      console.error("Error deleting students:", error);
      alert(`Failed to delete students. Error: ${error.response?.data?.message || error.message}`);
    }
  };
  ;

  // Fetch students on initial load
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Student Management
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => {
            setView("add");
            setEditingStudent(null);
          }}
        >
          Add Student
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setView("read")}
        >
          Read Students
        </button>
        
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/upload")}
        >
          Upload File
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={deleteAllStudents}
        >
          Delete All Students
        </button>
        <Logout />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {view === "add" && (
          <StudentForm
            onStudentAdded={() => {
              setView("read");
              fetchStudents();
            }}
          />
        )}
        {view === "edit" && editingStudent ? (
          <StudentEdit
            student={editingStudent}
            onUpdate={() => {
              setEditingStudent(null);
              setView("read");
              fetchStudents();
            }}
          />
        ) : (
          view === "read" && (
            <StudentList
              students={students}
              onEdit={(student) => {
                setEditingStudent(student);
                setView("edit");
              }}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
