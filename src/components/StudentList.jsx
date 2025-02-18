import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../utils/api";

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(Array.isArray(data.students) ? data.students : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Filter students based on the search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      
      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded"
          placeholder="Search by student name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm as user types
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-red-500">No students found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="border border-gray-300">
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">ID</th>
              <th className="p-2 border border-gray-300">Grade</th>
              <th className="p-2 border border-gray-300">GPA</th>
              <th className="p-2 border border-gray-300">Phone</th>
              <th className="p-2 border border-gray-300">Email</th>
              <th className="p-2 border border-gray-300">Address</th>
              <th className="p-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="text-center border border-gray-300">
                <td className="border-gray-300 p-2">{student.name}</td>
                <td className="border-gray-300 p-2">{student.studentId}</td>
                <td className="border-gray-300 p-2">{student.grade}</td>
                <td className="border-gray-300 p-2">{student.gpa}</td>
                <td className="border-gray-300 p-2">{student.contactInformation?.phoneNo}</td>
                <td className="border-gray-300 p-2">{student.contactInformation?.email}</td>
                <td className="border-gray-300 p-2">{student.contactInformation?.address}</td>
                <td className="border border-gray-300 p-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(student)} // Pass student data to edit component
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
