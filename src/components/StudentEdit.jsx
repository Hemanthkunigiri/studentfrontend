import React, { useState, useEffect } from "react";
import { updateStudent } from "../utils/api";

const StudentEdit = ({ student, onUpdate }) => {
  const [updatedStudent, setUpdatedStudent] = useState(student || {});

  useEffect(() => {
    if (student) {
      setUpdatedStudent(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!updatedStudent._id) {
      console.error("Student ID is missing. Cannot update.");
      return;
    }

    try {
      const response = await updateStudent(updatedStudent._id, updatedStudent);
      onUpdate(response);
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold">Edit Student</h2>

      {["name", "studentId","email", "admissionNumber", "phoneNo", "address"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={updatedStudent[field] || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ))}

      <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">
        Update Student
      </button>
    </form>
  );
};

export default StudentEdit;
