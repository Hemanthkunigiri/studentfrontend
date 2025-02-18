import React, { useState } from "react";
import { createStudent } from "../utils/api";

const StudentForm = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: "",
    studentId: "",
    grade: "",
    gpa: "",
    attendance: { present: 0, absent: 0, late: 0 },
    contactInformation: { phoneNo: "", email: "", address: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setStudent((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setStudent((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStudent(student);
      onStudentAdded();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold">Add Student</h2>

      {["name", "studentId", "grade", "gpa"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={student[field] || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ))}

      {["present", "absent", "late"].map((field) => (
        <input
          key={field}
          type="number"
          name={`attendance.${field}`}
          placeholder={`Attendance ${field}`}
          value={student.attendance[field] || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ))}

      {["phoneNo", "email", "address"].map((field) => (
        <input
          key={field}
          type="text"
          name={`contactInformation.${field}`}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={student.contactInformation[field] || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      ))}

      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;
