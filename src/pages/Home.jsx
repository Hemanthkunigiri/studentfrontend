import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import StudentList from "../components/StudentList";
import StudentForm from "../components/StudentForm";
import StudentEdit from "../components/StudentEdit";
import Logout from "./Logout";

const Home = () => {
  const [view, setView] = useState("read");
  const [editingStudent, setEditingStudent] = useState(null);
  const [reloadList, setReloadList] = useState(false);
  const [students, setStudents] = useState([]); // State for student list

  const triggerReload = () => setReloadList((prev) => !prev);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`/students`);
      setStudents(response.data.students); // Set the student list
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Fetch students on reload or initial load
  useEffect(() => {
    fetchStudents();
  }, [reloadList]);

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
        <Logout />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {view === "add" && (
          <StudentForm
            onStudentAdded={() => {
              setView("read");
              triggerReload();
            }}
          />
        )}
        {view === "edit" && editingStudent ? (
          <StudentEdit
            student={editingStudent}
            onUpdate={(updatedStudent) => {
              setEditingStudent(null); // Reset editing state
              setView("read"); // Return to read mode
              setReloadList((prev) => !prev); // Force list refresh
            }}
          />
        ) : (
          view === "read" && (
            <StudentList
              students={students} // Pass the students fetched from the backend
              onEdit={(student) => {
                setEditingStudent(student);
                setView("edit");
              }}
              reload={reloadList}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
